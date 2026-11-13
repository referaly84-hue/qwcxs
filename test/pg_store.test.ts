/* Тест слоя хранения PostgreSQL. Запуск:
     TEST_DATABASE_URL=postgresql://user:pass@localhost:5432/testdb node --test test/pg_store.test.ts
   ВНИМАНИЕ: таблицы в этой БД будут очищены. Без TEST_DATABASE_URL тест пропускается. */
import test from 'node:test';
import assert from 'node:assert/strict';

const URL = process.env.TEST_DATABASE_URL;
if (URL) process.env.DATABASE_URL = URL;

const S = URL ? await import('../pg_store.ts') : null;
const run = URL ? test : test.skip;
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const sampleDb = () => ({
  settings: { season: '2026/27', keys: { gemini: 'x' }, adminCode: '2580' },
  comps: [{ id: 'rpl', name: 'РПЛ' }],
  teams: [{ id: 't1', name: 'Зенит', comp: 'rpl', city: 'СПб' }, { id: 't2', name: 'Спартак', comp: 'rpl', city: 'Москва' }, { id: 't3', name: 'ЦСКА', comp: 'rpl' }],
  players: [{ id: 'p1', name: 'Иван', teamId: 't1', pos: 'ЦП', bio: 'a\u0000b' }],
  squads: { t1: ['p1'] }, lineups: {}, tactics: {},
  fixtures: [{ id: 'f1', season: '2026/27', comp: 'rpl', status: 'scheduled', home: 't1', away: 't2', date: '2026-11-15' }],
  llmlog: [{ ts: 111, task: 'a' }, { ts: 222, task: 'b' }],
  referees: [{ id: 'r1', name: 'Судья' }, { id: 'r1', name: 'Дубль id' }],
  cupState2026: null,
  nationalTeam: { name: 'Россия', list: [1, 2, 3] },
  dailyWeather: { 'Москва_2026-11-15': { temp: 3 } },
  _savedAt: 1000,
});

run('pg_store: полный цикл', async () => {
  const s = S!;
  assert.equal(await s.pgInit(), true);
  // чистим
  const c = new (await import('pg')).default.Client({ connectionString: URL });
  await c.connect();
  const tables = (await c.query(`SELECT tablename FROM pg_tables WHERE schemaname='public'`)).rows.map((r: any) => r.tablename);
  for (const t of tables) await c.query(`TRUNCATE ${t}`);
  assert.equal(await s.pgHasData(), false);

  // импорт
  const db = sampleDb();
  const r = await s.pgImportAll({
    db, source: 'test',
    matches: [['f1', { events: [{ m: 1, t: 'гол' }], ctx: {} }]],
    codes: { admin: '2580', clubs: { 'Зенит': 'AAAA-1111' } },
    sessions: { tok1: { role: 'admin', at: 5 } },
  });
  assert.equal(r.matches, 1); assert.equal(r.codes, 1); assert.equal(r.sessions, 1);
  assert.equal(await s.pgHasData(), true);

  // чтение обратно: порядок, словари, null, \u0000, дубли id, llmlog без id
  const back = await s.pgLoadState();
  assert.deepEqual(back.teams.map((t: any) => t.id), ['t1', 't2', 't3']);
  assert.equal(back.players[0].bio, 'ab');
  assert.deepEqual(back.squads, { t1: ['p1'] });
  assert.equal(back.cupState2026, null);
  assert.deepEqual(back.nationalTeam.list, [1, 2, 3]);
  assert.equal(back.referees.length, 2);
  assert.equal(back.llmlog.length, 2);
  assert.equal(back.settings.keys.gemini, 'x');
  assert.equal(back.dailyWeather['Москва_2026-11-15'].temp, 3);
  assert.equal(back._savedAt, 1000);

  // колонки для SQL
  const q1 = await c.query(`SELECT name, comp FROM teams WHERE id='t1'`);
  assert.deepEqual(q1.rows[0], { name: 'Зенит', comp: 'rpl' });
  const q2 = await c.query(`SELECT team_id FROM players WHERE id='p1'`);
  assert.equal(q2.rows[0].team_id, 't1');

  // дифф: меняем одну команду, добавляем и удаляем
  let cur: any = back;
  cur.teams[1].city = 'Питер';
  cur.teams.splice(2, 1);                       // удалили t3
  cur.fixtures.push({ id: 'f2', season: '2026/27', comp: 'rpl', status: 'scheduled', home: 't2', away: 't1' });
  cur.teams.unshift({ id: 't0', name: 'Новый', comp: 'rpl' }); // сдвиг порядка
  cur.settings.season = '2027/28';
  cur._savedAt = 2000;
  s.pgQueueState(() => cur);
  await s.pgFlush(() => cur);
  const re = await s.pgLoadState();
  assert.deepEqual(re.teams.map((t: any) => t.id), ['t0', 't1', 't2']);
  assert.equal(re.teams[2].city, 'Питер');
  assert.equal(re.fixtures.length, 2);
  assert.equal(re.settings.season, '2027/28');
  assert.equal(re._savedAt, 2000);
  assert.equal((await c.query(`SELECT count(*)::int n FROM teams`)).rows[0].n, 3);

  // отсутствующий ключ коллекции — таблицу не трогаем
  delete cur.players;
  await s.pgFlush(() => cur);
  assert.equal((await c.query(`SELECT count(*)::int n FROM players`)).rows[0].n, 1);
  // пустой массив — очищает
  cur.players = [];
  await s.pgFlush(() => cur);
  assert.equal((await c.query(`SELECT count(*)::int n FROM players`)).rows[0].n, 0);

  // матчи
  s.pgQueueMatch('f2', () => ({ events: [], ctx: { a: 1 } }));
  await s.pgFlush(() => cur);
  const ms = await s.pgLoadMatches();
  assert.deepEqual([...ms.keys()].sort(), ['f1', 'f2']);
  await s.pgDeleteMatch('f1');
  assert.equal((await s.pgLoadMatches()).size, 1);
  s.pgQueueMatch('f3', () => ({ x: 1 }));
  await s.pgDeleteMatch('f3'); // отложенная запись отменяется
  await sleep(2300);
  assert.equal((await s.pgLoadMatches()).has('f3'), false);
  await s.pgDeleteAllMatches();
  assert.equal((await s.pgLoadMatches()).size, 0);

  // сессии и коды
  s.pgSaveSession('tok2', { role: 'club', teamId: 't1', at: 9 });
  await sleep(300);
  assert.deepEqual(Object.keys(await s.pgLoadSessions()).sort(), ['tok1', 'tok2']);
  s.pgDeleteSession('tok1');
  await sleep(300);
  assert.deepEqual(Object.keys(await s.pgLoadSessions()), ['tok2']);
  const codes = await s.pgLoadCodes();
  assert.equal(codes.admin, '2580');
  assert.equal(codes.clubs['Зенит'], 'AAAA-1111');
  s.pgSyncCodes({ admin: '2580', clubs: { 'Зенит': 'AAAA-1111', 'Спартак': 'BBBB-2222' } });
  await sleep(300);
  assert.equal((await s.pgLoadCodes()).clubs['Спартак'], 'BBBB-2222');

  await c.end();
  await s.pgClose();
});
