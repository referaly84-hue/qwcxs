/* ───────── Сбор старых данных для переноса в PostgreSQL ─────────
   Источники (берётся всё, что найдётся):
     • data/db.json, data/matches/*.json, club_codes.json — локальные файлы
     • Firestore (appState, matches, clubCodes, auth, sessions) — если есть ключ сервисного аккаунта
   Если в Firestore база новее локальной (так и бывает на хостинге, где файлы сбрасываются) — берётся она.
   Firestore этим кодом только ЧИТАЕТСЯ, ничего в нём не меняется и не удаляется.                      */
import fs from 'fs';
import os from 'os';
import path from 'path';
import type { LegacyData, CodeReg } from './pg_store.ts';

function readJson(file: string): any | null {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return null; }
}

function readMatchDir(dir: string): Map<string, any> {
  const out = new Map<string, any>();
  let files: string[] = [];
  try { files = fs.readdirSync(dir); } catch { return out; }
  for (const f of files) {
    if (!f.endsWith('.json')) continue;
    const m = readJson(path.join(dir, f));
    if (m) out.set(f.slice(0, -5), m);
  }
  return out;
}

export async function collectLegacy(opts: { dataDir: string; codesFile: string; useFirestore?: boolean; useFiles?: boolean }): Promise<LegacyData | null> {
  const useFiles = opts.useFiles !== false;
  const useFs = opts.useFirestore !== false && process.env.MIGRATE_FIRESTORE !== '0';

  // 1. локальные файлы
  const localDb = useFiles ? readJson(path.join(opts.dataDir, 'db.json')) : null;
  const localMatches = useFiles ? readMatchDir(path.join(opts.dataDir, 'matches')) : new Map<string, any>();
  const localCodesRaw = useFiles ? readJson(opts.codesFile) : null;
  const localCodes: CodeReg = {
    admin: localCodesRaw?.admin,
    clubs: (localCodesRaw?.clubs && typeof localCodesRaw.clubs === 'object') ? localCodesRaw.clubs : {},
  };

  // 2. Firestore
  let remoteDb: any = null;
  let remoteMatches = new Map<string, any>();
  let remoteCodes: CodeReg = { clubs: {} };
  let remoteSessions: Record<string, any> = {};
  let remoteAt = 0;
  if (useFs) {
    try {
      const fb = await import('./firebase_auth.ts');
      const snap = await fb.fbInit({ clubs: {} }); // пустой seed — в Firestore ничего не пишется
      if (snap) {
        remoteCodes = { admin: snap.admin, clubs: snap.clubs || {} };
        remoteSessions = snap.sessions || {};
        const st = await fb.fbLoadState();
        if (st) { try { remoteDb = JSON.parse(st.json); remoteAt = st.savedAt || remoteDb?._savedAt || 0; } catch { /* битая база */ } }
        const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'virt-matches-'));
        try {
          await fb.fbRestoreMatches(tmp);
          remoteMatches = readMatchDir(tmp);
        } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
      }
    } catch (e: any) {
      console.error('Миграция: Firestore недоступен, беру только локальные файлы:', e.message);
    }
  }

  if (!localDb && !remoteDb) return null;

  const localAt = Number(localDb?._savedAt) || 0;
  const useRemote = !!remoteDb && (!localDb || remoteAt > localAt);
  const db = useRemote ? remoteDb : localDb;

  // матчи: приоритет у источника, откуда взята база
  const matches = new Map<string, any>();
  const first = useRemote ? remoteMatches : localMatches;
  const second = useRemote ? localMatches : remoteMatches;
  for (const [id, m] of second) matches.set(id, m);
  for (const [id, m] of first) matches.set(id, m);

  // коды: Firestore (если есть) поверх локального файла
  const codes: CodeReg = {
    admin: remoteCodes.admin || localCodes.admin,
    clubs: { ...localCodes.clubs, ...remoteCodes.clubs },
  };

  const parts: string[] = [];
  parts.push(useRemote ? `Firestore (база от ${new Date(remoteAt).toISOString()})` : 'локальный data/db.json');
  if (useRemote && localDb) parts.push('локальный db.json старше облачного — не использован');
  const sessions = Object.keys(remoteSessions).length ? remoteSessions : ((db?.sessions && typeof db.sessions === 'object') ? db.sessions : {});
  return { db, matches, codes, sessions, source: parts.join('; ') };
}
