/* Ручной перенос базы в PostgreSQL (то же самое сервер делает сам при первом запуске на пустой базе).

   Запуск:
     DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require" npm run migrate:pg
   Ключи:
     --force           перезаписать данные в PostgreSQL, даже если они там уже есть
     --files-only      брать только локальные файлы (data/db.json, data/matches, club_codes.json)
     --firestore-only  брать только Firestore (нужен firebase-service-account.json или FIREBASE_SERVICE_ACCOUNT*)
   Firestore только читается — ничего в нём не меняется и не удаляется. */
import path from 'path';
import { fileURLToPath } from 'url';
import { pgInit, pgHasData, pgImportAll, pgClose } from '../pg_store.ts';
import { collectLegacy } from '../pg_migrate.ts';

try { const d: any = await import('dotenv'); (d.default || d).config(); (d.default || d).config({ path: '.env.local' }); } catch { /* dotenv необязателен */ }

const args = new Set(process.argv.slice(2));
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = process.env.DATA_DIR || path.join(root, 'data');
const CODES_FILE = process.env.CODES_FILE || path.join(root, 'club_codes.json');

if (!(await pgInit())) {
  console.error('Не задан DATABASE_URL (строка подключения к PostgreSQL).');
  process.exit(1);
}
try {
  if ((await pgHasData()) && !args.has('--force')) {
    console.error('В PostgreSQL уже есть данные. Чтобы перезаписать их, добавьте --force.');
    process.exit(2);
  }
  console.log('Читаю старые данные…');
  const legacy = await collectLegacy({
    dataDir: DATA_DIR,
    codesFile: CODES_FILE,
    useFiles: !args.has('--firestore-only'),
    useFirestore: !args.has('--files-only'),
  });
  if (!legacy) {
    console.error('Старых данных не найдено (нет ни data/db.json, ни доступного Firestore).');
    process.exit(3);
  }
  console.log('Источник базы:', legacy.source);
  const res = await pgImportAll(legacy);
  console.log('\nПеренесено в PostgreSQL:');
  for (const [t, n] of Object.entries(res.rows).sort()) console.log(`  ${t.padEnd(22)} ${n}`);
  console.log(`  ${'matches'.padEnd(22)} ${res.matches}`);
  console.log(`  ${'club_codes'.padEnd(22)} ${res.codes}`);
  console.log(`  ${'sessions'.padEnd(22)} ${res.sessions}`);
  console.log('\nГотово. Теперь запускайте сервер с тем же DATABASE_URL.');
} finally {
  await pgClose();
}
process.exit(0);
