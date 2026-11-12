// @ts-nocheck
/* ───────── Firebase (Firestore): коды входа и сессии ─────────
   Хранит ТОЛЬКО авторизацию:
     auth/admin            -> { code }
     clubCodes/<id клуба>  -> { name, code }
     sessions/<токен>      -> { role, teamId?, teamName?, code?, at }
   Остальная база по-прежнему в data/db.json.
   Если Firebase не настроен — модуль выключен, сервер работает по-старому (club_codes.json). */
import fs from 'fs';

/* ВСТАВЬТЕ СЮДА содержимое JSON сервисного аккаунта (или задайте переменную окружения
   FIREBASE_SERVICE_ACCOUNT / FIREBASE_SERVICE_ACCOUNT_FILE). Пусто = Firebase выключен. */
export const FIREBASE_HARDCODED: { serviceAccount: any | null } = {
  serviceAccount: null,
};

let fs_db: any = null;
export let fbActive = false;

function readServiceAccount(): any | null {
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    if (process.env.FIREBASE_SERVICE_ACCOUNT_FILE) return JSON.parse(fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_FILE, 'utf8'));
    if (FIREBASE_HARDCODED.serviceAccount) return FIREBASE_HARDCODED.serviceAccount;
    if (fs.existsSync('./firebase-service-account.json')) return JSON.parse(fs.readFileSync('./firebase-service-account.json', 'utf8'));
  } catch (e: any) {
    console.error('Firebase: не удалось прочитать ключ сервисного аккаунта:', e.message);
  }
  return null;
}

const clubId = (name: string) => encodeURIComponent(String(name)).replace(/\./g, '%2E') || '_';

export type AuthSnapshot = { admin?: string; clubs: Record<string, string>; sessions: Record<string, any> };
const synced = { admin: undefined as string | undefined, clubs: new Map<string, string>() };

/** Подключается к Firestore и читает коды + сессии. Возвращает null, если Firebase не настроен/недоступен. */
export async function fbInit(seed: { admin?: string; clubs: Record<string, string> }): Promise<AuthSnapshot | null> {
  const sa = readServiceAccount();
  if (!sa) { console.log('Firebase: ключ не задан — коды хранятся в club_codes.json'); return null; }
  try {
    const { initializeApp, cert, getApps } = await import('firebase-admin/app');
    const { getFirestore } = await import('firebase-admin/firestore');
    if (!getApps().length) initializeApp({ credential: cert(sa) });
    fs_db = getFirestore();

    const [adminDoc, clubSnap, sessSnap] = await Promise.all([
      fs_db.collection('auth').doc('admin').get(),
      fs_db.collection('clubCodes').get(),
      fs_db.collection('sessions').get(),
    ]);

    const snap: AuthSnapshot = { admin: adminDoc.exists ? adminDoc.data().code : undefined, clubs: {}, sessions: {} };
    clubSnap.forEach((d: any) => { const v = d.data(); if (v?.name && v?.code) snap.clubs[v.name] = v.code; });
    sessSnap.forEach((d: any) => { snap.sessions[d.id] = d.data(); });

    // Первый запуск: Firestore пуст — переносим существующие коды из club_codes.json
    if (!snap.admin && !Object.keys(snap.clubs).length && (seed.admin || Object.keys(seed.clubs).length)) {
      snap.admin = seed.admin;
      snap.clubs = { ...seed.clubs };
      await writeAll(snap);
      console.log(`Firebase: перенесено кодов клубов: ${Object.keys(snap.clubs).length}`);
    }
    synced.admin = snap.admin;
    for (const [n, c] of Object.entries(snap.clubs)) synced.clubs.set(n, c);
    fbActive = true;
    console.log(`Firebase: подключено (клубов: ${Object.keys(snap.clubs).length}, сессий: ${Object.keys(snap.sessions).length})`);
    return snap;
  } catch (e: any) {
    console.error('Firebase: не удалось подключиться, работаю с club_codes.json:', e.message);
    fs_db = null; fbActive = false;
    return null;
  }
}

async function writeAll(snap: { admin?: string; clubs: Record<string, string> }) {
  const entries = Object.entries(snap.clubs);
  for (let i = 0; i < entries.length; i += 400) {
    const b = fs_db.batch();
    for (const [name, code] of entries.slice(i, i + 400)) b.set(fs_db.collection('clubCodes').doc(clubId(name)), { name, code });
    if (i === 0 && snap.admin) b.set(fs_db.collection('auth').doc('admin'), { code: snap.admin });
    await b.commit();
  }
  if (!entries.length && snap.admin) await fs_db.collection('auth').doc('admin').set({ code: snap.admin });
}

/** Записывает в Firestore только изменившиеся коды. */
export function fbSyncCodes(reg: { admin?: string; clubs: Record<string, string> }) {
  if (!fbActive) return;
  const changed: Record<string, string> = {};
  for (const [n, c] of Object.entries(reg.clubs)) if (synced.clubs.get(n) !== c) changed[n] = c;
  const adminChanged = reg.admin && reg.admin !== synced.admin;
  if (!Object.keys(changed).length && !adminChanged) return;
  for (const [n, c] of Object.entries(changed)) synced.clubs.set(n, c);
  if (adminChanged) synced.admin = reg.admin;
  writeAll({ admin: adminChanged ? reg.admin : undefined, clubs: changed })
    .catch((e: any) => console.error('Firebase: запись кодов:', e.message));
}

export function fbSaveSession(token: string, s: any) {
  if (!fbActive) return;
  fs_db.collection('sessions').doc(token).set(JSON.parse(JSON.stringify(s)))
    .catch((e: any) => console.error('Firebase: запись сессии:', e.message));
}

export function fbDeleteSession(token: string) {
  if (!fbActive) return;
  fs_db.collection('sessions').doc(token).delete()
    .catch((e: any) => console.error('Firebase: удаление сессии:', e.message));
}

/* ───────── Полная база и матчи в Firestore ─────────
   Раньше в Firestore хранились только коды и сессии, а вся остальная база (заявки, составы, игроки, трансферы…)
   лежала лишь в data/db.json. На хостинге с эфемерной файловой системой (AI Studio / Cloud Run / Render и т.п.)
   этот файл сбрасывается при каждом перезапуске — отсюда пропажа заявок.
   Теперь база дополнительно хранится в Firestore (gzip + base64, нарезка на куски по ~900 КБ):
     appState/meta        -> { savedAt, chunks, hash }
     appState/chunk_<n>   -> { data }
     matches/<id матча>   -> { data }  (gzip + base64 одного матча) */
import zlib from 'zlib';
import crypto from 'crypto';
import path from 'path';

const CHUNK = 900_000;
let stateTimer: NodeJS.Timeout | null = null;
let pendingState: (() => string) | null = null;
let lastStateHash = '';
const matchTimers = new Map<string, NodeJS.Timeout>();
const pendingMatches = new Map<string, () => string>();

/** Читает базу из Firestore. null — если Firebase выключен или базы там ещё нет. */
export async function fbLoadState(): Promise<{ savedAt: number; json: string } | null> {
  if (!fbActive) return null;
  try {
    const metaDoc = await fs_db.collection('appState').doc('meta').get();
    if (!metaDoc.exists) return null;
    const meta = metaDoc.data();
    const parts: string[] = [];
    for (let i = 0; i < meta.chunks; i++) {
      const d = await fs_db.collection('appState').doc('chunk_' + i).get();
      if (!d.exists) throw new Error('нет куска ' + i);
      parts.push(d.data().data);
    }
    const json = zlib.gunzipSync(Buffer.from(parts.join(''), 'base64')).toString('utf8');
    lastStateHash = meta.hash || '';
    console.log(`Firebase: база восстановлена из облака (${(json.length / 1024).toFixed(0)} КБ)`);
    return { savedAt: Number(meta.savedAt) || 0, json };
  } catch (e: any) {
    console.error('Firebase: не удалось прочитать базу:', e.message);
    return null;
  }
}

async function writeState(json: string, savedAt: number) {
  const hash = crypto.createHash('md5').update(json).digest('hex');
  if (hash === lastStateHash) return;
  const b64 = zlib.gzipSync(Buffer.from(json, 'utf8')).toString('base64');
  const n = Math.ceil(b64.length / CHUNK);
  const oldMeta = await fs_db.collection('appState').doc('meta').get();
  const oldN = oldMeta.exists ? (oldMeta.data().chunks || 0) : 0;
  // сначала куски, потом meta — так meta всегда указывает на целую базу
  for (let i = 0; i < n; i++) await fs_db.collection('appState').doc('chunk_' + i).set({ data: b64.slice(i * CHUNK, (i + 1) * CHUNK) });
  await fs_db.collection('appState').doc('meta').set({ savedAt, chunks: n, hash });
  for (let i = n; i < oldN; i++) await fs_db.collection('appState').doc('chunk_' + i).delete().catch(() => {});
  lastStateHash = hash;
}

/** Откладывает запись базы в облако (не чаще раза в ~8 секунд). */
export function fbQueueState(getJson: () => string) {
  if (!fbActive) return;
  pendingState = getJson;
  if (stateTimer) return;
  stateTimer = setTimeout(async () => {
    stateTimer = null;
    const g = pendingState; pendingState = null;
    if (!g) return;
    try { await writeState(g(), Date.now()); } catch (e: any) { console.error('Firebase: запись базы:', e.message); }
  }, 8000);
}

export function fbQueueMatch(id: string, getJson: () => string) {
  if (!fbActive) return;
  pendingMatches.set(id, getJson);
  if (matchTimers.has(id)) return;
  matchTimers.set(id, setTimeout(async () => {
    matchTimers.delete(id);
    const g = pendingMatches.get(id); pendingMatches.delete(id);
    if (!g) return;
    try {
      const b64 = zlib.gzipSync(Buffer.from(g(), 'utf8')).toString('base64');
      if (b64.length > CHUNK) { console.error(`Firebase: матч ${id} слишком большой для Firestore`); return; }
      await fs_db.collection('matches').doc(id).set({ data: b64 });
    } catch (e: any) { console.error('Firebase: запись матча:', e.message); }
  }, 8000));
}

/** Докачивает из Firestore матчи, которых нет на диске (после пересоздания контейнера). */
export async function fbRestoreMatches(dir: string) {
  if (!fbActive) return;
  try {
    const snap = await fs_db.collection('matches').get();
    let n = 0;
    snap.forEach((d: any) => {
      const f = path.join(dir, d.id + '.json');
      if (fs.existsSync(f)) return;
      try { fs.writeFileSync(f, zlib.gunzipSync(Buffer.from(d.data().data, 'base64'))); n++; } catch {}
    });
    if (n) console.log(`Firebase: восстановлено матчей: ${n}`);
  } catch (e: any) { console.error('Firebase: восстановление матчей:', e.message); }
}

/** Немедленно дописывает в облако всё отложенное (при остановке сервера). */
export async function fbFlush(getJson?: () => string) {
  if (!fbActive) return;
  try {
    if (stateTimer) { clearTimeout(stateTimer); stateTimer = null; }
    const g = getJson || pendingState; pendingState = null;
    if (g) await writeState(g(), Date.now());
    for (const [id, t] of matchTimers) { clearTimeout(t); matchTimers.delete(id); }
    for (const [id, g2] of pendingMatches) {
      pendingMatches.delete(id);
      const b64 = zlib.gzipSync(Buffer.from(g2(), 'utf8')).toString('base64');
      if (b64.length <= CHUNK) await fs_db.collection('matches').doc(id).set({ data: b64 });
    }
  } catch (e: any) { console.error('Firebase: финальная запись:', e.message); }
}
