import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { getTeamLogo, PRESET_LOGOS, generateDynamicLogo, getTeamColors, COMPETITION_LOGOS } from '../src/logos.ts';

test('every RPL team (season 2026/2027) has an authentic official SVG logo', () => {
  const rplTeams = [
    'Зенит', 'Краснодар', 'Локомотив', 'Спартак', 'ЦСКА',
    'Балтика', 'Динамо Москва', 'Рубин', 'Ахмат', 'Ростов',
    'Крылья Советов', 'Оренбург', 'Акрон', 'Динамо Махачкала',
    'Родина', 'Факел'
  ];

  for (const name of rplTeams) {
    const logoUrl = getTeamLogo(name);
    assert.ok(logoUrl.startsWith('/assets/aistudio/'), `Logo for ${name} must reference official uploaded SVG asset: ${logoUrl}`);
    assert.ok(logoUrl.endsWith('.svg'), `Logo for ${name} must be an SVG file`);

    const diskPath = path.join(process.cwd(), 'public', logoUrl.replace(/^\//, ''));
    assert.ok(fs.existsSync(diskPath), `Official file ${diskPath} must exist on disk`);
    const svgContent = fs.readFileSync(diskPath, 'utf8');
    assert.ok(svgContent.includes('<svg'), `Official file for ${name} must contain <svg tag`);
  }
});

test('CSKA uses authentic PFC CSKA vector crest', () => {
  const cskaLogo = getTeamLogo('ЦСКА');
  assert.equal(cskaLogo, '/assets/aistudio/PFC_CSKA_9a6b044d.svg');
  const diskPath = path.join(process.cwd(), 'public', cskaLogo.replace(/^\//, ''));
  assert.ok(fs.existsSync(diskPath));
});

test('newly added Second League and Media League clubs resolve to authentic uploaded logos', () => {
  const newTeams = [
    { name: 'Алания', file: 'alania-big_ca72efaa.png' },
    { name: 'Амкал', file: 'amkal-big_9fc643af.png' },
    { name: '2Drots', file: '2drots-big-768x768_24a6f01f.png' },
    { name: 'Тюмень', file: 'tyumen-big-2023_361d20f9.png' },
    { name: 'Динамо Владивосток', file: 'dynamo-vladivostok-logo-145x100_35048b53.png' },
    { name: 'Динамо Ставрополь', file: 'dynamo-stavropol-logo-145x100_e57697c6.png' },
    { name: 'Динамо Вологда', file: 'dynamo-vologda-logo-145x100_d7f12918.png' },
    { name: 'Динамо СПб', file: 'dynamo-saint-petersburg-logo-145x100_9b445321.png' },
    { name: 'Дружба Майкоп', file: 'druzhba-maykop-big-768x635_e7d80d49.png' },
    { name: 'Машук-КМВ', file: 'mashuk-kmv-big-2023_b9aad6d1.png' },
    { name: 'Нарт Черкесск', file: 'nart-big-768x768_da8dae81.png' },
    { name: 'Севастополь', file: 'sevastopol-big-768x768_a839f7ec.png' },
    { name: 'Спартак-Нальчик', file: 'spartak-nalchik-big_b44c2e71.png' },
    { name: 'Салют Белгород', file: 'salyut-belgorod-logo-145x100_eda88427.png' },
    { name: 'Сатурн', file: 'saturn-logo-145x100_52d01930.png' },
    { name: 'СКА Ростов', file: 'ska-rostov-on-don-big-2024_5888a199.png' },
    { name: 'Иркутск', file: 'irkutsk-big_32a733f0.png' },
    { name: 'Динамо Киров', file: 'dynamo-kirov-logo-145x100_635140b3.png' },
    { name: 'Сибирь', file: 'sibir-logo-145x100_32fa3466.png' },
    { name: 'Калуга', file: 'kaluga-logo-145x100_9361352d.png' },
    { name: 'Торпедо Миасс', file: 'torpedo-miass-logo-145x100_2882b291.png' },
    { name: 'Волгарь', file: 'volgar-logo-145x100_5d3f5dfd.png' },
    { name: 'Победа Хасавюрт', file: 'pobeda-logo-145x100_c17677cd.png' },
    { name: 'Астрахань', file: 'astrakhan-logo-2024-145x100_cbd49f65.png' },
    { name: 'Рубин Ялта', file: 'rubin-yalta-logo-145x100_3fed7b5f.png' },
    { name: 'Ангушт', file: 'angusht-logo-145x100_65e74e2b.png' },
    { name: 'Муром', file: 'murom-logo-145x100_6cc929e1.png' },
    { name: 'Балтика-БФУ', file: 'baltika-bfu-logo-145x100_7ed174fe.png' },
    { name: 'Луки-Энергия', file: 'luki-energiya-logo-145x100_8ab65adb.png' },
    { name: 'Космос Долгопрудный', file: 'kosmos-logo-145x100_de30adcf.png' },
    { name: 'Авангард Курск', file: 'avangard-kursk-logo-145x100_5e78c799.png' },
    { name: 'Спартак Тамбов', file: 'spartak-tambov-logo-2023-145x100_cbb80c10.png' },
    { name: 'Зенит Пенза', file: 'zenit-penza-logo-145x100_7015bb97.png' },
    { name: 'Волна', file: 'volna-logo-145x100_517e32ba.png' },
    { name: 'Динамо Барнаул', file: 'dynamo-barnaul-logo-2022-145x100_5ea90613.png' },
    { name: 'Ижевск', file: 'zenit-izhevsk-logo-145x100_912c7ca9.png' },
    { name: 'Знамя Труда', file: 'znamya-truda-logo-2023-145x100_18414f3c.png' },
    { name: 'Тосно', file: 'tosno-logo-145x100_0a915235.png' },
    { name: 'Армавир', file: 'armavir-logo-145x100_c9472b14.png' },
    { name: 'Кубань Холдинг', file: 'kuban-holding-logo-145x100_a8d8b782.png' },
    { name: 'Броуки (Brokeboys)', file: 'Brokeboys_lightmode_4834bb47.png' },
    { name: 'ФК 10', file: '30549813_47b25a7b.jpg' },
    { name: 'СиндЕкат', file: 'i_d0be2178.webp' },
    { name: 'Банка', file: 'Team_BANKA_lightmode_658cabb4.png' },
    { name: 'Lit Energy', file: 'original_e9317d9e.png' },
    { name: 'Prime Squad', file: 'original__2__f34350ab.png' },
    { name: 'Народная Команда', file: '1713435283593698984_492496b6.png' },
    { name: 'Матч ТВ', file: 'original__1__0c5942f0.png' },
    { name: 'Fight Nights', file: '20250710185733_Fight_Nights_lightmode_ed417a13.png' },
    { name: 'Эгриси', file: 'f14322dd6495d94f39ec68f33cf52_b5ba6e96.webp' },
    { name: 'Чисто Питер', file: 'original__3__dab66e2c.png' },
    { name: 'Rocket Team', file: '1713523892825857620_cf3b7ed4.png' },
    { name: 'Спартак Владикавказ', file: 'fk-spartak-alaniya-vladikavkaz-2003-logo-png_seeklogo-538369_59af4f86.png' }
  ];

  for (const t of newTeams) {
    const logoUrl = getTeamLogo(t.name);
    assert.equal(logoUrl, `/assets/aistudio/${t.file}`, `Logo for ${t.name} must resolve to ${t.file}`);
    const diskPath = path.join(process.cwd(), 'public', logoUrl.replace(/^\//, ''));
    assert.ok(fs.existsSync(diskPath), `Asset file ${diskPath} must exist on disk`);
  }
});

test('every First League team (18 teams) has an authentic official SVG logo', () => {
  const fnlTeams = [
    'Арсенал Тула', 'Велес', 'Волга Ульяновск', 'Енисей', 'КАМАЗ',
    'Ленинградец', 'Нефтехимик', 'Пари НН', 'Ротор', 'СКА-Хабаровск',
    'Сочи', 'Спартак Кострома', 'Текстильщик', 'Торпедо Москва',
    'Урал', 'Уфа', 'Челябинск', 'Шинник'
  ];

  for (const name of fnlTeams) {
    const logoUrl = getTeamLogo(name);
    assert.ok(logoUrl.startsWith('/assets/aistudio/russia_'), `Logo for ${name} must reference official uploaded SVG asset: ${logoUrl}`);
    const diskPath = path.join(process.cwd(), 'public', logoUrl.replace(/^\//, ''));
    assert.ok(fs.existsSync(diskPath), `Official file ${diskPath} must exist on disk`);
  }
});

test('satellite and reserve clubs resolve to parent club official crests', () => {
  assert.ok(getTeamLogo('Ростов-2').includes('russia_rostov'));
  assert.ok(getTeamLogo('Зенит-2').includes('russia_zenit'));
  assert.ok(getTeamLogo('Спартак-2').includes('russia_spartak'));
  assert.ok(getTeamLogo('Енисей-2').includes('russia_yenisey'));
  assert.ok(getTeamLogo('Крылья Советов-2').includes('russia_krylya'));
});

test('competition logos dictionary contains RPL, Supercup, FNL, Cup, 2LA, 2LB, and Media League emblems', () => {
  const comps = ['rpl', 'supercup', 'fnl', 'cup', '2la', '2lb', 'media'];
  for (const c of comps) {
    assert.ok(COMPETITION_LOGOS[c], `Competition ${c} must have an emblem`);
    const diskPath = path.join(process.cwd(), 'public', COMPETITION_LOGOS[c].replace(/^\//, ''));
    assert.ok(fs.existsSync(diskPath), `Emblem file ${diskPath} for ${c} must exist`);
    const content = fs.readFileSync(diskPath, 'utf8');
    assert.ok(content.includes('<svg'), `Emblem for ${c} must be valid SVG`);
  }
});

test('dynamic generator creates deterministic, valid SVG badge for custom clubs', () => {
  const logo1 = generateDynamicLogo('Шериф Тирасполь');
  const logo2 = generateDynamicLogo('Шериф Тирасполь');
  assert.equal(logo1, logo2, 'Dynamic logo generation must be deterministic');
  assert.ok(logo1.startsWith('data:image/svg+xml;utf8,'));
  assert.ok(decodeURIComponent(logo1).includes('ШТ'), 'Initials of Шериф Тирасполь should be present');

  const logoCustom = getTeamLogo('Мой Кастомный Клуб 2026');
  assert.ok(logoCustom.startsWith('data:image/svg+xml;utf8,'));
});

test('custom logo overrides default preset when provided', () => {
  const custom = 'https://example.com/custom-logo.png';
  const logo = getTeamLogo('Спартак', custom);
  assert.equal(logo, custom);
});

test('team colors resolver returns matching color palette', () => {
  const zenColors = getTeamColors('Зенит');
  assert.equal(zenColors.primary, '#00a3e0');

  const spaColors = getTeamColors('Спартак');
  assert.equal(spaColors.primary, '#e11d27');
});

test('Zvezda SPb resolves to dedicated vector crest', () => {
  const zvezdaLogo = getTeamLogo('Звезда');
  assert.equal(zvezdaLogo, '/logos/zvezda-spb.svg');
  const diskPath = path.join(process.cwd(), 'public', zvezdaLogo.replace(/^\//, ''));
  assert.ok(fs.existsSync(diskPath));
});

test('official league transition regulations and table zones match reform specifications', async () => {
  const { LEAGUE_REGULATIONS, getTeamZoneClass } = await import('../src/rules.ts');
  
  assert.equal(LEAGUE_REGULATIONS.rpl.totalTeams, 16);
  assert.equal(LEAGUE_REGULATIONS.fnl.totalTeams, 18);
  assert.equal(LEAGUE_REGULATIONS['2la_gold'].totalTeams, 10);
  assert.equal(LEAGUE_REGULATIONS['2la_silver'].totalTeams, 10);

  // RPL zones: 1 gold, 13-14 playoff (стыки), 15-16 bad (прямой вылет)
  assert.equal(getTeamZoneClass('rpl', 1, 16).zoneClass, 'zone-gold');
  assert.equal(getTeamZoneClass('rpl', 2, 16).zoneClass, '');
  assert.equal(getTeamZoneClass('rpl', 13, 16).zoneClass, 'zone-playoff');
  assert.equal(getTeamZoneClass('rpl', 14, 16).zoneClass, 'zone-playoff');
  assert.equal(getTeamZoneClass('rpl', 15, 16).zoneClass, 'zone-bad');
  assert.equal(getTeamZoneClass('rpl', 16, 16).zoneClass, 'zone-bad');

  // FNL zones: 1-2 top, 3-4 playoff, 17-18 bad
  assert.equal(getTeamZoneClass('fnl', 1, 18).zoneClass, 'zone-top');
  assert.equal(getTeamZoneClass('fnl', 2, 18).zoneClass, 'zone-top');
  assert.equal(getTeamZoneClass('fnl', 3, 18).zoneClass, 'zone-playoff');
  assert.equal(getTeamZoneClass('fnl', 4, 18).zoneClass, 'zone-playoff');
  assert.equal(getTeamZoneClass('fnl', 17, 18).zoneClass, 'zone-bad');
  assert.equal(getTeamZoneClass('fnl', 18, 18).zoneClass, 'zone-bad');

  // 2LA Gold: 1-2 top, 3 playoff, 7-10 bad (вылет в Серебро)
  assert.equal(getTeamZoneClass('2la_gold', 1, 10).zoneClass, 'zone-top');
  assert.equal(getTeamZoneClass('2la_gold', 3, 10).zoneClass, 'zone-playoff');
  assert.equal(getTeamZoneClass('2la_gold', 7, 10).zoneClass, 'zone-bad');

  // 2LA Silver: 1-4 top (выход в Золото), 7-10 bad (вылет в 2ЛБ)
  assert.equal(getTeamZoneClass('2la_silver', 1, 10).zoneClass, 'zone-top');
  assert.equal(getTeamZoneClass('2la_silver', 4, 10).zoneClass, 'zone-top');
  assert.equal(getTeamZoneClass('2la_silver', 7, 10).zoneClass, 'zone-bad');

  // 2LB: 1 top (выход в Серебро)
  assert.equal(getTeamZoneClass('2lb_1', 1, 16).zoneClass, 'zone-top');
});

test('Russian national team resolves to uploaded official SVG crest', () => {
  const rusLogo = getTeamLogo('Сборная России');
  assert.equal(rusLogo, '/assets/aistudio/russia_russia-national-team.football-logos.cc_2a5e3ddc.svg');
  const diskPath = path.join(process.cwd(), 'public', rusLogo.replace(/^\//, ''));
  assert.ok(fs.existsSync(diskPath), `Official file ${diskPath} must exist on disk`);
  const content = fs.readFileSync(diskPath, 'utf8');
  assert.ok(content.includes('<svg'), 'Official logo must be valid SVG');
});

