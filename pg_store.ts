/* ───────── PostgreSQL — единственное хранилище базы «Вирт РПЛ» ─────────
   Раньше: data/db.json (+ копия в Firestore), матчи — файлы data/matches/*.json, коды — club_codes.json.
   Теперь всё лежит в PostgreSQL. Сервер по-прежнему держит базу в памяти (объект `db`), а сюда
   записываются ТОЛЬКО изменившиеся строки (дифф по хэшу), поэтому запись быстрая даже на большой базе.

   Подключение (любой вариант):
     • переменная окружения DATABASE_URL="postgresql://user:pass@host:5432/dbname?sslmode=require"
     • или впишите строку в PG_HARDCODED.url ниже
   Таблицы создаются автоматически при первом запуске.

   Схема:
     settings(key, value)            — настройки (ключи Gemini, коды, расписание и т.д.)
     kv(key, value)                  — прочие верхнеуровневые значения (cupState2026, nationalTeam…)
     teams / players / fixtures / transfers / referees / assistants / staff / …
                                      — коллекции: id, pos (порядок), data jsonb + удобные колонки для SQL
     squads / lineups / tactics / cup / staff_discipline / daily_weather / city_climates
                                      — словари: key, data jsonb
     matches(id, data)               — полный ход каждого матча
     sessions(token, data, at)       — сессии входа
     club_codes(name, code)          — постоянные коды клубов; код админа — в meta('admin_code')
     meta(key, value)                — служебное (savedAt, происхождение данных)                     */
import pg from 'pg';
import crypto from 'crypto';

/** ВСТАВЬТЕ СЮДА строку подключения (или задайте DATABASE_URL). Пусто = PostgreSQL выключен. */
export const PG_HARDCODED: { url: string } = { url: 'postgresql://neondb_owner:npg_yU5dcF4VLoAI@ep-restless-dew-babvncvj-pooler.c-8.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require' };

export let pgActive = false;
let pool: pg.Pool | null = null;

const md5 = (s: string) => crypto.createHash('md5').update(s).digest('hex');
/** jsonb не принимает символ \u0000 — вычищаем. */
const clean = (json: string) => (json.includes('\\u0000') ? json.replace(/\\u0000/g, '') : json);
const jstr = (v: any) => clean(JSON.stringify(v === undefined ? null : v));

/* ───────── описание таблиц ───────── */
type Arr = { key: string; table: string; cols?: string[] };
const gen = (col: string, field: string) => `${col} text GENERATED ALWAYS AS (data->>'${field}') STORED`;

const ARRAYS: Arr[] = [
  { key: 'comps', table: 'comps', cols: [gen('name', 'name'), gen('type', 'type')] },
  { key: 'teams', table: 'teams', cols: [gen('name', 'name'), gen('comp', 'comp'), gen('city', 'city')] },
  { key: 'players', table: 'players', cols: [gen('name', 'name'), gen('team_id', 'teamId'), gen('position', 'pos')] },
  { key: 'fixtures', table: 'fixtures', cols: [gen('season', 'season'), gen('comp', 'comp'), gen('status', 'status'), gen('home', 'home'), gen('away', 'away'), gen('match_date', 'date')] },
  { key: 'derbies', table: 'derbies' },
  { key: 'transfers', table: 'transfers', cols: [gen('player_id', 'pid'), gen('from_team', 'from'), gen('to_team', 'to'), gen('type', 'type')] },
  { key: 'llmlog', table: 'llmlog' },
  { key: 'tournaments', table: 'tournaments' },
  { key: 'transferRequests', table: 'transfer_requests', cols: [gen('status', 'status')] },
  { key: 'referees', table: 'referees', cols: [gen('name', 'name')] },
  { key: 'assistants', table: 'assistants', cols: [gen('name', 'name')] },
  { key: 'internationalBreaks', table: 'international_breaks' },
  { key: 'coaches', table: 'coaches', cols: [gen('name', 'name')] },
  { key: 'staff', table: 'staff', cols: [gen('name', 'name'), gen('team_id', 'teamId')] },
  { key: 'budgetHistory', table: 'budget_history', cols: [gen('team_id', 'teamId')] },
  { key: 'foreignOffers', table: 'foreign_offers', cols: [gen('status', 'status')] },
  { key: 'staffOffers', table: 'staff_offers', cols: [gen('status', 'status')] },
  { key: 'staffRoles', table: 'staff_roles' },
  { key: 'friendlyRequests', table: 'friendly_requests', cols: [gen('status', 'status')] },
  { key: 'insiderPosts', table: 'insider_posts' },
  { key: 'eskCases', table: 'esk_cases' },
];
type Dict = { key: string; table: string };
const DICTS: Dict[] = [
  { key: 'squads', table: 'squads' },
  { key: 'lineups', table: 'lineups' },
  { key: 'tactics', table: 'tactics' },
  { key: 'cup', table: 'cup' },
  { key: 'staffDiscipline', table: 'staff_discipline' },
  { key: 'dailyWeather', table: 'daily_weather' },
  { key: 'cityClimates', table: 'city_climates' },
];
const HANDLED = new Set<string>([...ARRAYS.map(a => a.key), ...DICTS.map(d => d.key), 'settings', 'sessions', '_savedAt']);

/* ───────── подключение и схема ───────── */
function connConfig(): pg.PoolConfig | null {
  const raw = String(process.env.DATABASE_URL || process.env.POSTGRES_URL || PG_HARDCODED.url || '').trim();
  if (!raw) return null;
  let cs = raw;
  let ssl: any = false;
  try {
    const u = new URL(raw);
    const mode = u.searchParams.get('sslmode');
    if (mode && mode !== 'disable') ssl = { rejectUnauthorized: false };
    u.searchParams.delete('sslmode');
    u.searchParams.delete('uselibpqcompat');
    cs = u.toString();
  } catch { /* оставляем строку как есть */ }
  if (process.env.PGSSL === '1') ssl = { rejectUnauthorized: false };
  if (process.env.PGSSL === '0') ssl = false;
  return { connectionString: cs, ssl, max: 5, idleTimeoutMillis: 30_000, connectionTimeoutMillis: 15_000 };
}

export const pgConfigured = () => !!connConfig();

async function q(text: string, params?: any[]) {
  return pool!.query(text, params);
}

async function createSchema() {
  const ddl: string[] = [
    `CREATE TABLE IF NOT EXISTS meta (key text PRIMARY KEY, value jsonb NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS settings (key text PRIMARY KEY, value jsonb NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS kv (key text PRIMARY KEY, value jsonb NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS matches (id text PRIMARY KEY, data jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now())`,
    `CREATE TABLE IF NOT EXISTS sessions (token text PRIMARY KEY, data jsonb NOT NULL, at bigint NOT NULL DEFAULT 0)`,
    `CREATE TABLE IF NOT EXISTS club_codes (name text PRIMARY KEY, code text NOT NULL)`,
  ];
  for (const a of ARRAYS) {
    ddl.push(`CREATE TABLE IF NOT EXISTS ${a.table} (id text PRIMARY KEY, pos integer NOT NULL, data jsonb NOT NULL${a.cols ? ', ' + a.cols.join(', ') : ''})`);
    ddl.push(`CREATE INDEX IF NOT EXISTS ${a.table}_pos_idx ON ${a.table} (pos)`);
  }
  for (const d of DICTS) ddl.push(`CREATE TABLE IF NOT EXISTS ${d.table} (key text PRIMARY KEY, data jsonb NOT NULL)`);
  ddl.push(`CREATE INDEX IF NOT EXISTS fixtures_season_idx ON fixtures (season, comp)`);
  ddl.push(`CREATE INDEX IF NOT EXISTS players_team_idx ON players (team_id)`);
  ddl.push(`CREATE INDEX IF NOT EXISTS transfers_player_idx ON transfers (player_id)`);
  const c = await pool!.connect();
  try {
    await c.query('SELECT pg_advisory_lock(7788001)'); // два инстанса не должны создавать схему одновременно
    for (const s of ddl) await c.query(s);
    await c.query('SELECT pg_advisory_unlock(7788001)');
  } finally { c.release(); }
}

/** Подключается к PostgreSQL и создаёт таблицы. false — строка подключения не задана. Если задана, но БД недоступна — бросает ошибку. */
export async function pgInit(): Promise<boolean> {
  const cfg = connConfig();
  if (!cfg) { pgActive = false; return false; }
  pool = new pg.Pool(cfg);
  pool.on('error', (e: any) => console.error('PostgreSQL (пул):', e.message));
  await q('SELECT 1');
  await createSchema();
  pgActive = true;
  return true;
}

export async function pgClose() {
  try { await pool?.end(); } catch { /* ignore */ }
  pool = null; pgActive = false;
}

/* ───────── состояние: строки и дифф ───────── */
type RowSet = Map<string, { pos: number; json: string; h: string }>;
type Rows = Map<string, RowSet>; // table -> key -> row

const lastSynced: Rows = new Map(); // что, по нашим данным, уже лежит в PostgreSQL

function rowsOf(db: any): Rows {
  const out: Rows = new Map();
  const put = (table: string, key: string, pos: number, v: any) => {
    let s = out.get(table);
    if (!s) { s = new Map(); out.set(table, s); }
    let k = key;
    if (s.has(k)) k = `${key}#${pos}`; // защита от дублей id
    const json = jstr(v);
    s.set(k, { pos, json, h: md5(pos + '|' + json) });
  };
  for (const a of ARRAYS) {
    const arr = db?.[a.key];
    if (arr === undefined) continue; // ключа нет — таблицу не трогаем
    out.set(a.table, new Map());
    if (!Array.isArray(arr)) continue;
    arr.forEach((it: any, i: number) => put(a.table, String(it?.id ?? it?.ts ?? 'i' + i), i, it));
  }
  for (const d of DICTS) {
    const o = db?.[d.key];
    if (o === undefined) continue;
    out.set(d.table, new Map());
    if (o && typeof o === 'object' && !Array.isArray(o)) for (const [k, v] of Object.entries(o)) put(d.table, k, 0, v);
  }
  if (db?.settings && typeof db.settings === 'object') {
    out.set('settings', new Map());
    for (const [k, v] of Object.entries(db.settings)) put('settings', k, 0, v);
  }
  out.set('kv', new Map());
  for (const [k, v] of Object.entries(db || {})) {
    if (HANDLED.has(k) || v === undefined) continue;
    put('kv', k, 0, v);
  }
  return out;
}

const isArrTable = (t: string) => ARRAYS.some(a => a.table === t);
const CHUNK_ROWS = 400;

async function upsertRows(c: pg.PoolClient, table: string, rows: { key: string; pos: number; json: string }[]) {
  for (let i = 0; i < rows.length; i += CHUNK_ROWS) {
    const part = rows.slice(i, i + CHUNK_ROWS);
    const keys = part.map(r => r.key), datas = part.map(r => r.json);
    if (isArrTable(table)) {
      await c.query(
        `INSERT INTO ${table} (id, pos, data) SELECT u.id, u.pos, u.data::jsonb FROM unnest($1::text[], $2::int[], $3::text[]) AS u(id, pos, data)
         ON CONFLICT (id) DO UPDATE SET pos = EXCLUDED.pos, data = EXCLUDED.data`,
        [keys, part.map(r => r.pos), datas]);
    } else if (table === 'settings' || table === 'kv') {
      await c.query(
        `INSERT INTO ${table} (key, value) SELECT u.key, u.data::jsonb FROM unnest($1::text[], $2::text[]) AS u(key, data)
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
        [keys, datas]);
    } else {
      await c.query(
        `INSERT INTO ${table} (key, data) SELECT u.key, u.data::jsonb FROM unnest($1::text[], $2::text[]) AS u(key, data)
         ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data`,
        [keys, datas]);
    }
  }
}

async function deleteKeys(c: pg.PoolClient, table: string, keys: string[]) {
  const col = isArrTable(table) ? 'id' : 'key';
  for (let i = 0; i < keys.length; i += 1000) {
    await c.query(`DELETE FROM ${table} WHERE ${col} = ANY($1::text[])`, [keys.slice(i, i + 1000)]);
  }
}

/** Записывает в PostgreSQL только то, что изменилось с прошлой записи. Всё — одной транзакцией. */
async function syncState(db: any, force = false): Promise<{ upserts: number; deletes: number }> {
  const cur = rowsOf(db); // синхронно, чтобы база не «поплыла» во время записи
  const savedAt = Number(db?._savedAt) || Date.now();
  const plan: { table: string; up: { key: string; pos: number; json: string }[]; del: string[] }[] = [];
  let ups = 0, dels = 0;
  for (const [table, rows] of cur) {
    const prev = force ? new Map() : (lastSynced.get(table) || new Map());
    const up: { key: string; pos: number; json: string }[] = [];
    for (const [k, r] of rows) if (prev.get(k)?.h !== r.h) up.push({ key: k, pos: r.pos, json: r.json });
    const del: string[] = [];
    if (!force) for (const k of prev.keys()) if (!rows.has(k)) del.push(k);
    if (up.length || del.length) plan.push({ table, up, del });
    ups += up.length; dels += del.length;
  }
  if (force) {
    // при полном импорте чистим таблицы, чтобы не осталось старых строк
    for (const [table] of cur) plan.unshift({ table, up: [], del: ['*'] });
  }
  if (!plan.length && !force) return { upserts: 0, deletes: 0 };
  const c = await pool!.connect();
  try {
    await c.query('BEGIN');
    for (const p of plan) {
      if (p.del[0] === '*' && p.del.length === 1) { await c.query(`DELETE FROM ${p.table}`); continue; }
      if (p.del.length) await deleteKeys(c, p.table, p.del);
      if (p.up.length) await upsertRows(c, p.table, p.up);
    }
    await c.query(`INSERT INTO meta (key, value) VALUES ('saved_at', $1::jsonb) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`, [String(savedAt)]);
    await c.query(`INSERT INTO meta (key, value) VALUES ('initialized', 'true'::jsonb) ON CONFLICT (key) DO NOTHING`);
    await c.query('COMMIT');
  } catch (e) {
    await c.query('ROLLBACK').catch(() => {});
    throw e;
  } finally { c.release(); }
  for (const [table, rows] of cur) lastSynced.set(table, rows);
  return { upserts: ups, deletes: dels };
}

/* ───────── загрузка ───────── */
async function selectAll(table: string) {
  return (await q(isArrTable(table) ? `SELECT id AS k, pos, data AS v FROM ${table} ORDER BY pos, id` : (table === 'settings' || table === 'kv') ? `SELECT key AS k, 0 AS pos, value AS v FROM ${table}` : `SELECT key AS k, 0 AS pos, data AS v FROM ${table}`)).rows;
}

export async function pgHasData(): Promise<boolean> {
  const r = await q(`SELECT 1 FROM meta WHERE key = 'initialized'`);
  return r.rowCount! > 0;
}

/** Читает всю базу из PostgreSQL в объект `db` (в том же виде, как раньше лежал db.json). */
export async function pgLoadState(): Promise<any> {
  const db: any = {};
  for (const a of ARRAYS) db[a.key] = (await selectAll(a.table)).map((r: any) => r.v);
  for (const d of DICTS) {
    const o: any = {};
    for (const r of await selectAll(d.table)) o[r.k] = r.v;
    db[d.key] = o;
  }
  db.settings = {};
  for (const r of await selectAll('settings')) db.settings[r.k] = r.v;
  for (const r of await selectAll('kv')) db[r.k] = r.v;
  const m = await q(`SELECT value FROM meta WHERE key = 'saved_at'`);
  db._savedAt = m.rowCount ? Number(m.rows[0].value) || 0 : 0;
  lastSynced.clear();
  for (const [t, rows] of rowsOf(db)) lastSynced.set(t, rows);
  return db;
}

export async function pgLoadMatches(): Promise<Map<string, any>> {
  const out = new Map<string, any>();
  const r = await q(`SELECT id, data FROM matches`);
  for (const row of r.rows) out.set(row.id, row.data);
  return out;
}

export async function pgLoadSessions(): Promise<Record<string, any>> {
  const out: Record<string, any> = {};
  const r = await q(`SELECT token, data FROM sessions`);
  for (const row of r.rows) out[row.token] = row.data;
  return out;
}

/* ───────── отложенная запись состояния ───────── */
let stateTimer: NodeJS.Timeout | null = null;
let getDb: (() => any) | null = null;
let stateRunning: Promise<void> | null = null;
let stateDirty = false;
const STATE_DELAY_MS = 1500;

async function runState() {
  if (!getDb) return;
  stateDirty = false;
  try {
    const r = await syncState(getDb());
    if (r.upserts || r.deletes) { /* тихо: запись идёт часто */ }
  } catch (e: any) {
    console.error('PostgreSQL: запись базы не удалась, повторю:', e.message);
    stateDirty = true;
  }
  if (stateDirty) { stateDirty = false; schedule(5000); }
}
function schedule(ms: number) {
  if (stateTimer) return;
  stateTimer = setTimeout(() => {
    stateTimer = null;
    const go = async () => { stateRunning = runState().finally(() => { stateRunning = null; }); await stateRunning; };
    if (stateRunning) stateRunning.then(go); else go();
  }, ms);
}

/** Откладывает запись базы (не чаще раза в ~1.5 с). Пишутся только изменившиеся строки. */
export function pgQueueState(get: () => any) {
  if (!pgActive) return;
  getDb = get;
  schedule(STATE_DELAY_MS);
}

/* ───────── матчи ───────── */
const matchTimers = new Map<string, NodeJS.Timeout>();
const pendingMatches = new Map<string, () => any>();

async function writeMatch(id: string, m: any) {
  await q(
    `INSERT INTO matches (id, data, updated_at) VALUES ($1, $2::jsonb, now()) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
    [id, jstr(m)]);
}

export function pgQueueMatch(id: string, get: () => any) {
  if (!pgActive) return;
  pendingMatches.set(id, get);
  if (matchTimers.has(id)) return;
  matchTimers.set(id, setTimeout(async () => {
    matchTimers.delete(id);
    const g = pendingMatches.get(id); pendingMatches.delete(id);
    if (!g) return;
    try { await writeMatch(id, g()); }
    catch (e: any) {
      console.error('PostgreSQL: запись матча', id, e.message, '— повторю');
      if (!pendingMatches.has(id)) { pendingMatches.set(id, g); matchTimers.set(id, setTimeout(() => { matchTimers.delete(id); pgQueueMatch(id, g); }, 5000)); }
    }
  }, 2000));
}

export async function pgDeleteMatch(id: string) {
  if (!pgActive) return;
  const t = matchTimers.get(id); if (t) clearTimeout(t);
  matchTimers.delete(id); pendingMatches.delete(id);
  try { await q(`DELETE FROM matches WHERE id = $1`, [id]); } catch (e: any) { console.error('PostgreSQL: удаление матча:', e.message); }
}

export async function pgDeleteAllMatches() {
  if (!pgActive) return;
  for (const t of matchTimers.values()) clearTimeout(t);
  matchTimers.clear(); pendingMatches.clear();
  try { await q(`DELETE FROM matches`); } catch (e: any) { console.error('PostgreSQL: очистка матчей:', e.message); }
}

/* ───────── сессии ───────── */
export function pgSaveSession(token: string, s: any) {
  if (!pgActive) return;
  q(`INSERT INTO sessions (token, data, at) VALUES ($1, $2::jsonb, $3) ON CONFLICT (token) DO UPDATE SET data = EXCLUDED.data, at = EXCLUDED.at`,
    [token, jstr(s), Number(s?.at) || Date.now()])
    .catch((e: any) => console.error('PostgreSQL: запись сессии:', e.message));
}
export function pgDeleteSession(token: string) {
  if (!pgActive) return;
  q(`DELETE FROM sessions WHERE token = $1`, [token]).catch((e: any) => console.error('PostgreSQL: удаление сессии:', e.message));
}

/* ───────── коды входа ───────── */
export type CodeReg = { admin?: string; clubs: Record<string, string> };
const syncedCodes = { admin: undefined as string | undefined, clubs: new Map<string, string>() };

export async function pgLoadCodes(): Promise<CodeReg> {
  const reg: CodeReg = { clubs: {} };
  const a = await q(`SELECT value FROM meta WHERE key = 'admin_code'`);
  if (a.rowCount) reg.admin = String(a.rows[0].value);
  const r = await q(`SELECT name, code FROM club_codes`);
  for (const row of r.rows) reg.clubs[row.name] = row.code;
  syncedCodes.admin = reg.admin;
  syncedCodes.clubs = new Map(Object.entries(reg.clubs));
  return reg;
}

async function writeCodes(admin: string | undefined, clubs: Record<string, string>) {
  const names = Object.keys(clubs);
  for (let i = 0; i < names.length; i += CHUNK_ROWS) {
    const part = names.slice(i, i + CHUNK_ROWS);
    await q(`INSERT INTO club_codes (name, code) SELECT * FROM unnest($1::text[], $2::text[]) ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code`,
      [part, part.map(n => clubs[n])]);
  }
  if (admin) await q(`INSERT INTO meta (key, value) VALUES ('admin_code', $1::jsonb) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`, [JSON.stringify(admin)]);
}

/** Записывает в PostgreSQL только изменившиеся коды. */
export function pgSyncCodes(reg: CodeReg) {
  if (!pgActive) return;
  const changed: Record<string, string> = {};
  for (const [n, c] of Object.entries(reg.clubs)) if (syncedCodes.clubs.get(n) !== c) changed[n] = c;
  const adminChanged = !!reg.admin && reg.admin !== syncedCodes.admin;
  if (!Object.keys(changed).length && !adminChanged) return;
  for (const [n, c] of Object.entries(changed)) syncedCodes.clubs.set(n, c);
  if (adminChanged) syncedCodes.admin = reg.admin;
  writeCodes(adminChanged ? reg.admin : undefined, changed).catch((e: any) => console.error('PostgreSQL: запись кодов:', e.message));
}

/* ───────── полный импорт (миграция) ───────── */
export type LegacyData = {
  db: any;
  matches: Iterable<[string, any]>;
  codes: CodeReg;
  sessions: Record<string, any>;
  source: string;
};

/** Полностью заменяет содержимое PostgreSQL переданными данными. Используется миграцией. */
export async function pgImportAll(d: LegacyData): Promise<{ rows: Record<string, number>; matches: number; codes: number; sessions: number }> {
  d.db._savedAt = Number(d.db._savedAt) || Date.now();
  await syncState(d.db, true);
  let nm = 0;
  const c = await pool!.connect();
  try {
    await c.query('BEGIN');
    await c.query('DELETE FROM matches');
    await c.query('DELETE FROM sessions');
    await c.query('DELETE FROM club_codes');
    await c.query('COMMIT');
  } catch (e) { await c.query('ROLLBACK').catch(() => {}); throw e; } finally { c.release(); }
  for (const [id, m] of d.matches) { await writeMatch(id, m); nm++; }
  for (const [tok, s] of Object.entries(d.sessions || {})) {
    await q(`INSERT INTO sessions (token, data, at) VALUES ($1, $2::jsonb, $3) ON CONFLICT (token) DO UPDATE SET data = EXCLUDED.data`, [tok, jstr(s), Number((s as any)?.at) || 0]);
  }
  await writeCodes(d.codes?.admin, d.codes?.clubs || {});
  await q(`INSERT INTO meta (key, value) VALUES ('imported_from', $1::jsonb) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`, [JSON.stringify({ source: d.source, at: new Date().toISOString() })]);
  const rows: Record<string, number> = {};
  for (const [t, s] of rowsOf(d.db)) rows[t] = s.size;
  return { rows, matches: nm, codes: Object.keys(d.codes?.clubs || {}).length, sessions: Object.keys(d.sessions || {}).length };
}

/** Немедленно дописывает всё отложенное (при остановке сервера). */
export async function pgFlush(get?: () => any) {
  if (!pgActive) return;
  try {
    if (stateTimer) { clearTimeout(stateTimer); stateTimer = null; }
    if (stateRunning) await stateRunning;
    const g = get || getDb;
    if (g) await syncState(g());
    for (const t of matchTimers.values()) clearTimeout(t);
    matchTimers.clear();
    for (const [id, g2] of [...pendingMatches]) { pendingMatches.delete(id); await writeMatch(id, g2()); }
  } catch (e: any) { console.error('PostgreSQL: финальная запись:', e.message); }
}
