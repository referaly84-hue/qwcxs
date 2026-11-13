import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

process.env.NODE_ENV = 'test';

const { SYS_DEFAULT, app, db, isAutoFx, normalizeEvents, realAt, runAutoStartTick } = await import('../server.ts');

test('SYS_DEFAULT provides Section 0/10 JSON schema and canonical event types', () => {
  assert.ok(SYS_DEFAULT.includes('РАЗДЕЛ 0') && SYS_DEFAULT.includes('РАЗДЕЛ 10'));
  assert.ok(SYS_DEFAULT.includes('commentator_intro') && SYS_DEFAULT.includes('lineup'));
});

test('normalizeEvents maps LLM event synonyms and missing prematch minutes without throwing', () => {
  const ctx = {
    names: { p1: 'Иван Иванов', p2: 'Пётр Петров' },
    pidSide: { p1: 'home', p2: 'away' },
    lineup: { home: { starters: ['p1'], bench: [] }, away: { starters: ['p2'], bench: [] } },
    coaches: { home: { staff: [] }, away: { staff: [] } },
    sides: { home: { id: 'h' }, away: { id: 'a' } },
  };
  const raw = [
    { type: 'prematch_lineups', team: 'none', text: 'Объявлены стартовые составы.' },
    { min: 0, type: 'prematch_atmosphere', team: 'none', text: 'Стадион заполнен.' },
    { minute: -2, type: 'prematch_referee_check', team: 'none', text: 'Судьи проверяют сетку.' },
    { min: 1, type: 'kickoff', team: 'home', players: ['Иван Иванов'], text: 'Стартовый свисток!' },
    { time: '12:34', type: 'throw_in', team: 'home', players: ['Иван Иванов'], text: 'Вбрасывание из-за боковой.' },
    { min: '25', type: 'aerial', team: 'away', players: ['Пётр Петров'], text: 'Выиграл верх.' },
    { min: '45+2\'', type: 'goal', team: 'home', players: ['Иван Иванов'], text: 'Гол в раздевалку!' },
  ];
  const out = normalizeEvents(raw, 1, 45, ctx, []);
  assert.equal(out.find((e: any) => e.text.includes('составы'))?.type, 'lineup');
  assert.equal(out.find((e: any) => e.text.includes('заполнен'))?.type, 'crowd');
  assert.equal(out.find((e: any) => e.text.includes('сетку'))?.type, 'commentator_intro');
  assert.equal(out.find((e: any) => e.text.includes('Вбрасывание'))?.type, 'pass');
  assert.equal(out.find((e: any) => e.text.includes('верх'))?.type, 'duel');
  assert.equal(out.find((e: any) => e.type === 'goal')?.min, 47);
  assert.ok(out.some((e: any) => e.type === 'halftime'));
});

function mskDateAndTime(ms: number) {
  const msk = new Date(ms + 3 * 3600 * 1000);
  const yyyy = msk.getUTCFullYear();
  const mm = String(msk.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(msk.getUTCDate()).padStart(2, '0');
  const hh = String(msk.getUTCHours()).padStart(2, '0');
  const mi = String(msk.getUTCMinutes()).padStart(2, '0');
  const ss = String(msk.getUTCSeconds()).padStart(2, '0');
  return { realDate: `${yyyy}-${mm}-${dd}`, realTime: `${hh}:${mi}:${ss}` };
}

test('realAt parses MSK date/time including unpadded hours and seconds without NaN', () => {
  const d1 = realAt({ realDate: '2026-11-12', realTime: '9:05' });
  assert.equal(d1.toISOString(), '2026-11-12T06:05:00.000Z');

  const d2 = realAt({ realDate: '2026-11-12', realTime: '19:30:45' });
  assert.equal(d2.toISOString(), '2026-11-12T16:30:45.000Z');

  const d3 = realAt({ realDate: 'invalid', realTime: 'invalid' });
  assert.ok(Number.isFinite(d3.getTime()));
});

test('isAutoFx enables RPL, Cup, Supercup, Playoff, and Friendly matches', () => {
  for (const comp of ['rpl', 'cup', 'supercup', 'playoff', 'playoff_rpl_fnl', 'friendly_match']) {
    assert.equal(isAutoFx({ comp }), true, `Expected ${comp} to be auto-start enabled`);
  }
  for (const comp of ['fnl', '2la_gold', '2lb_1', 'media']) {
    assert.equal(isAutoFx({ comp }), false, `Expected ${comp} to be manual-only`);
  }
});

test('scheduled RPL and friendly matches auto-start at MSK kickoff without manual lineups', async () => {
  const dbPath = path.join(process.cwd(), 'data', 'db.json');
  const backupRaw = fs.readFileSync(dbPath, 'utf8');
  const rplTeams = db.teams.filter((t: any) => t.comp === 'rpl');
  assert.ok(rplTeams.length >= 4);

  const testIds = ['test_auto_rpl_1', 'test_auto_fr_2'];
  const prevAuto = db.settings.auto;
  const prevTechDefeat = db.settings.techDefeat;
  const prevSecPerMin = db.settings.secPerMin;
  const prevBreakSec = db.settings.breakSec;

  const srv = app.listen(0);
  const addr = srv.address() as any;
  const baseUrl = `http://127.0.0.1:${addr.port}`;

  try {
    db.settings.auto = true;
    db.settings.techDefeat = false;
    db.settings.secPerMin = 0.01;
    db.settings.breakSec = 0.01;

    const kickoff1 = mskDateAndTime(Date.now() + 1800);
    const futureFar = mskDateAndTime(Date.now() + 3600_000);

    db.fixtures.push(
      {
        id: testIds[0],
        season: db.settings.season,
        comp: 'rpl',
        round: 99,
        date: '2026-11-12',
        time: '19:00',
        realDate: kickoff1.realDate,
        realTime: kickoff1.realTime,
        home: rplTeams[0].id,
        away: rplTeams[1].id,
        status: 'scheduled',
        hg: null,
        ag: null,
        pos: 0,
      },
      {
        id: testIds[1],
        season: db.settings.season,
        comp: 'friendly_match',
        round: 1,
        date: '2026-11-12',
        time: '18:00',
        realDate: futureFar.realDate,
        realTime: futureFar.realTime,
        home: rplTeams[2].id,
        away: rplTeams[3].id,
        status: 'scheduled',
        noAuto: true,
        err: 'old error',
        hg: null,
        ag: null,
        pos: 0,
      }
    );

    // Reschedule the friendly match via admin endpoint to 2s from now and ensure noAuto/err clear & auto-start triggers
    const kickoff2 = mskDateAndTime(Date.now() + 2000);
    const adminCode = process.env.ADMIN_CODE || db.settings.adminCode || '2580';
    const resp = await fetch(`${baseUrl}/api/admin/fixture`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-code': adminCode,
      },
      body: JSON.stringify({
        id: testIds[1],
        realDate: kickoff2.realDate,
        realTime: kickoff2.realTime,
      }),
    });
    const body = await resp.json() as any;
    assert.equal(body.ok, 1);

    const f2 = db.fixtures.find((x: any) => x.id === testIds[1]);
    assert.equal(f2.noAuto, false);
    assert.equal(f2.err, '');

    runAutoStartTick();

    // Poll up to 8 seconds for both matches to auto-start and finish ('done')
    const deadline = Date.now() + 8000;
    let f1Done = false;
    let f2Done = false;
    while (Date.now() < deadline) {
      const f1 = db.fixtures.find((x: any) => x.id === testIds[0]);
      const fx2 = db.fixtures.find((x: any) => x.id === testIds[1]);
      f1Done = f1 && f1.status === 'done' && !f1.tech;
      f2Done = fx2 && fx2.status === 'done' && !fx2.tech;
      if (f1Done && f2Done) break;
      await new Promise((r) => setTimeout(r, 150));
    }

    assert.ok(f1Done, 'RPL match should auto-start and finish without tech defeat');
    assert.ok(f2Done, 'Rescheduled friendly match should auto-start and finish');
  } finally {
    srv.closeAllConnections?.();
    srv.close();
    db.fixtures = db.fixtures.filter((x: any) => !testIds.includes(x.id));
    db.settings.auto = prevAuto;
    db.settings.techDefeat = prevTechDefeat;
    db.settings.secPerMin = prevSecPerMin;
    db.settings.breakSec = prevBreakSec;
    for (const id of testIds) {
      try {
        fs.unlinkSync(path.join(process.cwd(), 'data', 'matches', `${id}.json`));
      } catch {}
    }
    fs.writeFileSync(dbPath, backupRaw, 'utf8');
  }
});
