import test from 'node:test';
import assert from 'node:assert/strict';
import { parseSquads, matchClub, runImport, parseDate } from '../src/squad_import.ts';

const TXT = `Вот пояснение до первого клуба.

Шинник Ярославль:
66, Никита Янович, Вратарь, 23 (28 марта 2003 г.), Россия
19, Ярослав Арбузов, Атак. полузащитник, 22 (12 янв. 2004 г.), Россия, Украина
—, Гонсалу Мигел, Правый защитник, 23 (06 мая 2003 г.), Португалия
Тренерский штаб:
Главный тренер — Денис Бояринцев, 48, Россия
Массажист — Иван Иванов, 40, Россия

Сатурн Раменское
1, Тимофей Минкин, Вратарь, 17 (12 марта 2009 г.), Россия

2DROTS:
Дмитрий Ершов (ЕРШОВ) — Вратарь
`;
const teams = [{ id: 'a', name: 'Шинник', comp: 'fnl' }, { id: 'b', name: 'Сатурн Раменское', comp: '2lb_3' }, { id: 'c', name: '2Drots', comp: 'media' }];

test('parseDate', () => { assert.equal(parseDate('01 сент. 2002 г.'), '2002-09-01'); assert.equal(parseDate('28 марта 2003 г.'), '2003-03-28'); });
test('parse: клубы без двоеточия, медиа, штаб', () => {
  const r = parseSquads(TXT);
  assert.deepEqual(r.clubs.map(c => c.name), ['Шинник Ярославль', 'Сатурн Раменское', '2DROTS']);
  assert.equal(r.clubs[0].players.length, 3);
  assert.equal(r.clubs[0].players[1].nations.join(), 'Россия,Украина');
  assert.equal(r.clubs[0].players[2].num, null);
  assert.equal(r.clubs[0].staff.length, 2);
  assert.equal(r.clubs[0].staff[1].role, null);
  assert.equal(r.clubs[2].players[0].nick, 'ЕРШОВ');
});
test('match: Шинник Ярославль → Шинник', () => { assert.equal(matchClub('Шинник Ярославль', teams).teamId, 'a'); });
test('import: идемпотентность и режим replace', () => {
  let n = 0; const uid = () => String(++n);
  const db: any = { teams, players: [], squads: {}, staff: [] };
  const o = { uid, roleTitle: (r: string) => r };
  const dry = runImport(db, parseSquads(TXT), { ...o, dry: true });
  assert.equal(dry.totals.added, 5); assert.equal(db.players.length, 0);
  runImport(db, parseSquads(TXT), o);
  assert.equal(db.players.length, 5); assert.equal(db.staff.length, 1);
  const again = runImport(db, parseSquads(TXT), o);
  assert.equal(again.totals.added, 0); assert.equal(again.totals.updated, 0); assert.equal(db.players.length, 5);
  const less = TXT.replace('66, Никита Янович, Вратарь, 23 (28 марта 2003 г.), Россия\n', '');
  const r = runImport(db, parseSquads(less), { ...o, replace: true });
  assert.equal(r.totals.removed, 1);
  assert.equal(db.players.find((p: any) => p.name === 'Никита Янович').teamId, null);
});
