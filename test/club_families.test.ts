import test from 'node:test';
import assert from 'node:assert/strict';
import { CLUB_FAMILIES, familyNamesOf } from '../src/club_families.ts';

test('Спартак и Спартак-2 — одна семья в обе стороны', () => {
  assert.deepEqual(familyNamesOf('Спартак'), ['Спартак', 'Спартак-2']);
  assert.deepEqual(familyNamesOf('Спартак-2'), ['Спартак', 'Спартак-2']);
});

test('у Балтики и Родины в семье по три и больше команд', () => {
  assert.ok(familyNamesOf('Балтика').includes('Балтика-БФУ') && familyNamesOf('Балтика').includes('Балтика-2'));
  for (const n of ['Родина-2', 'Родина-3']) assert.ok(familyNamesOf(n).includes('Родина'));
  assert.equal(new Set(familyNamesOf('Родина-3')).size, familyNamesOf('Родина-3').length);
});

test('однофамильцы не связываются между собой', () => {
  for (const n of ['Зенит Пенза', 'Рубин Ялта', 'Спартак Кострома', 'Спартак-Нальчик', 'Спартак Тамбов', 'Динамо Брянск']) {
    assert.deepEqual(familyNamesOf(n), [n]);
  }
  assert.ok(!familyNamesOf('Зенит').includes('Зенит Пенза'));
});

test('ни одна команда не состоит в двух семьях сразу', () => {
  const seen = new Map<string, string>();
  for (const [parent, kids] of Object.entries(CLUB_FAMILIES)) {
    for (const n of [parent, ...kids]) {
      assert.ok(!seen.has(n), `${n} уже в семье ${seen.get(n)}`);
      seen.set(n, parent);
    }
  }
});

test('все названия семей существуют в списках команд сервера', async () => {
  const fs = await import('node:fs');
  const src = fs.readFileSync('server.ts', 'utf8');
  for (const [parent, kids] of Object.entries(CLUB_FAMILIES)) {
    for (const n of [parent, ...kids]) assert.ok(src.includes(`'${n}'`), `в server.ts нет команды «${n}»`);
  }
});

test('в штабе есть роль «тренер по стандартам», а обязательные роли заданы в server.ts', async () => {
  const { STAFF_ROLES } = await import('../src/coaches.ts');
  assert.ok((STAFF_ROLES as any).set_pieces?.title);
  const fs = await import('node:fs');
  const src = fs.readFileSync('server.ts', 'utf8');
  const m = src.match(/const REQUIRED_STAFF_ROLES = \[([^\]]*)\]/);
  assert.ok(m);
  const roles = m![1].split(',').map(x => x.trim().replace(/'/g, ''));
  assert.deepEqual(roles.sort(), ['assistant', 'doctor', 'fitness', 'gk', 'head', 'set_pieces']);
});
