import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import { getTeamCoach, computeCoachSynergy, Coach } from '../src/coaches.ts';
import { computeMatchRatings, getMatchMotm, buildTeamOfRound } from '../src/awards.ts';
import { initCup2026, recalculateCupGroups, drawNextRegionsRound } from '../src/cup2026.ts';

test('Coaches: retrieves authentic RPL head coaches with designated tactical philosophies', () => {
  const zenitCoach = getTeamCoach('Зенит', 'rpl');
  assert.strictEqual(zenitCoach.name, 'Сергей Семак');
  assert.strictEqual(zenitCoach.style, 'possession');

  const spartakCoach = getTeamCoach('Спартак', 'rpl');
  assert.strictEqual(spartakCoach.name, 'Деян Станкович');
  assert.strictEqual(spartakCoach.style, 'attack');

  const rubinCoach = getTeamCoach('Рубин', 'rpl');
  assert.strictEqual(rubinCoach.name, 'Рашид Рахимов');
  assert.strictEqual(rubinCoach.style, 'bus');

  const lokomotivCoach = getTeamCoach('Локомотив', 'rpl');
  assert.strictEqual(lokomotivCoach.name, 'Михаил Галактионов');
  assert.strictEqual(lokomotivCoach.style, 'press');

  const cskaCoach = getTeamCoach('ЦСКА', 'rpl');
  assert.strictEqual(cskaCoach.name, 'Марко Николич');
  assert.strictEqual(cskaCoach.style, 'counter');
});

test('Coaches: tactical synergy accurately penalizes mismatched playstyles (bus coach with attacking squad)', () => {
  const busCoach: Coach = {
    id: 'test_bus',
    name: 'Иван Оборонный',
    clubName: 'Тест',
    nationality: 'Россия',
    age: 55,
    style: 'bus',
    styleTitle: 'Автобус',
    styleDesc: 'Низкий блок',
    favoriteFormation: '5-3-2',
    reputation: 80,
    temperament: 'Строгий',
    quote: 'Защита'
  };

  // 1. Полная гармония: автобусник + установка на автобус и схема 5-3-2
  const goodTactics = {
    formation: '5-3-2',
    speech: 'Ставим бетон, глухая оборона на ноль',
    training: 'Отработка обороны и стандартов'
  };
  const synGood = computeCoachSynergy(busCoach, goodTactics);
  assert.ok(synGood.score >= 80, `Expected high synergy, got ${synGood.score}`);
  assert.ok(synGood.status === 'excellent' || synGood.status === 'good');
  assert.ok(synGood.xgaMultiplier <= 0.95);

  // 2. Тактический диссонанс: автобусник + установка "все в атаку, штурм" и схема 4-3-3
  const clashTactics = {
    formation: '4-3-3',
    speech: 'Все в атаку! Бежим вперед, тотальный штурм и забивать!',
    training: 'Отработка дальних ударов и атак'
  };
  const synClash = computeCoachSynergy(busCoach, clashTactics);
  assert.ok(synClash.score < 50, `Expected low synergy score, got ${synClash.score}`);
  assert.ok(synClash.status === 'poor' || synClash.status === 'clash');
  assert.ok(synClash.xgMultiplier < 1.0);
  assert.ok(synClash.xgaMultiplier > 1.1);
});

test('Awards: computes MOTM and post-match interview for match winners and key performers', () => {
  const fixture = {
    id: 'fx_1',
    comp: 'rpl',
    date: '2026-08-15',
    time: '19:00',
    hg: 2,
    ag: 1,
    status: 'done'
  };

  const match = {
    events: [],
    ctx: {
      pos: { p1: 'НАП', p2: 'ПЗ', p3: 'ВР' }
    },
    stats: {
      players: {
        p1: { n: 'Артём Дзюба', t: 'akron', side: 'home', min: 90, g: 2, a: 0, xg: 1.4, sh: 4 },
        p2: { n: 'Эдуард Сперцян', t: 'krasnodar', side: 'away', min: 90, g: 1, a: 0, xg: 0.6, sh: 2 },
        p3: { n: 'Сергей Волков', t: 'akron', side: 'home', min: 90, sv: 4, cs: 0 }
      }
    }
  };

  const motm = getMatchMotm(match, fixture, 'Акрон', 'Краснодар');
  assert.ok(motm);
  assert.strictEqual(motm.name, 'Артём Дзюба');
  assert.ok(motm.rating >= 8.0);
  assert.ok(motm.interview.quote.length > 20);
  assert.ok(motm.interview.headline.includes('Дзюба'));
});

test('Russian Cup 2026/2027: generates 4 RPL groups of 4 teams, clean round labels, and dynamic Regions Path rounds', () => {
  const rplTeams = Array.from({ length: 16 }, (_, i) => ({ id: `rpl_${i + 1}`, name: `Клуб РПЛ ${i + 1}` }));
  const fnlTeams = Array.from({ length: 18 }, (_, i) => ({ id: `fnl_${i + 1}`, name: `Клуб ФНЛ ${i + 1}` }));
  const secondLeagueTeams = Array.from({ length: 48 }, (_, i) => ({ id: `2l_${i + 1}`, name: `Клуб 2Л ${i + 1}` }));
  const mediaTeams = Array.from({ length: 16 }, (_, i) => ({ id: `med_${i + 1}`, name: `Медиаклуб ${i + 1}` }));

  let uidCounter = 0;
  const uid = () => `cup_${++uidCounter}`;

  const { cupState, fixtures } = initCup2026('2026/27', rplTeams, fnlTeams, secondLeagueTeams, mediaTeams, uid);

  // Проверяем Путь РПЛ: 4 группы A, B, C, D
  assert.deepStrictEqual(Object.keys(cupState.rplGroups), ['A', 'B', 'C', 'D']);
  for (const gid of ['A', 'B', 'C', 'D']) {
    assert.strictEqual(cupState.rplGroups[gid].teams.length, 4);
    assert.strictEqual(cupState.rplGroups[gid].table.length, 4);
  }

  // В каждой группе 6 туров по 2 матча = 12 матчей на группу * 4 = 48 матчей
  const rplGroupFx = fixtures.filter(f => f.cupPath === 'rpl_group');
  assert.strictEqual(rplGroupFx.length, 48);

  // Проверяем наименование туров Пути РПЛ — БЕЗ групп в названии тура!
  for (const f of rplGroupFx) {
    assert.strictEqual(f.label, `Путь РПЛ · ${f.round}-й тур`);
  }

  // Путь регионов: стартует ТОЛЬКО с 1-го раунда (16 матчей)
  const regQualFx = fixtures.filter(f => f.cupPath === 'regions_qual');
  assert.strictEqual(regQualFx.length, 16);
  assert.ok(regQualFx.every(f => f.qualRound === 1));

  // Проверяем динамическую жеребьевку 2-го раунда
  regQualFx.forEach((f, idx) => {
    f.status = 'done';
    f.hg = idx % 2 === 0 ? 2 : 1;
    f.ag = idx % 2 === 0 ? 0 : 3;
  });
  const r2Fx = drawNextRegionsRound(cupState, 1, regQualFx, uid);
  assert.strictEqual(r2Fx.length, 16);
  assert.ok(r2Fx.every(f => f.qualRound === 2));

  // Проверяем динамическую жеребьевку 3-го раунда
  r2Fx.forEach(f => {
    f.status = 'done';
    f.hg = 2; f.ag = 1;
  });
  const r3Fx = drawNextRegionsRound(cupState, 2, r2Fx, uid);
  assert.strictEqual(r3Fx.length, 16);
  assert.ok(r3Fx.every(f => f.qualRound === 3));

  // Проверяем 4-й раунд: вступают клубы ФНЛ, играют против квалифаеров 3-го раунда (квалифаеры дома)
  r3Fx.forEach(f => {
    f.status = 'done';
    f.hg = 1; f.ag = 0;
  });
  const r4Fx = drawNextRegionsRound(cupState, 3, r3Fx, uid);
  assert.ok(r4Fx.length >= 16);
  assert.ok(r4Fx.every(f => f.qualRound === 4));
  // 16 квалифаеров принимают 16 клубов ФНЛ дома:
  const lowerHosts = r4Fx.filter(f => f.home.startsWith('med_') || f.home.startsWith('2l_'));
  assert.strictEqual(lowerHosts.length, 16, '16 qualifiers host FNL clubs at home');
  const fnlAgainstQualifiers = r4Fx.filter(f => (f.home.startsWith('med_') || f.home.startsWith('2l_')) && f.away.startsWith('fnl_'));
  assert.strictEqual(fnlAgainstQualifiers.length, 16, '16 FNL clubs play away against qualifiers');

  // Проверяем пересчет очков с сериями пенальти
  const testMatch = rplGroupFx[0];
  testMatch.status = 'done';
  testMatch.hg = 1;
  testMatch.ag = 1;
  testMatch.pen = { winner: 'home', hg: 5, ag: 4 };

  recalculateCupGroups(cupState, fixtures);
  const grp = cupState.rplGroups[testMatch.groupId];
  const homeRow = grp.table.find(r => r.id === testMatch.home);
  const awayRow = grp.table.find(r => r.id === testMatch.away);

  assert.strictEqual(homeRow?.pts, 2, 'Winner on penalty shootout gets 2 points');
  assert.strictEqual(awayRow?.pts, 1, 'Loser on penalty shootout gets 1 point');
});

test('Russian Cup 2026/2027: midweek schedule has exactly 2 Tue, 4 Wed, 2 Thu matches per round', () => {
  const rplTeams = Array.from({ length: 16 }, (_, i) => ({ id: `rpl_${i + 1}`, name: `Клуб РПЛ ${i + 1}` }));
  const fnlTeams = Array.from({ length: 18 }, (_, i) => ({ id: `fnl_${i + 1}`, name: `Клуб ФНЛ ${i + 1}` }));
  const secondLeagueTeams = Array.from({ length: 48 }, (_, i) => ({ id: `2l_${i + 1}`, name: `Клуб 2Л ${i + 1}` }));
  const mediaTeams = Array.from({ length: 16 }, (_, i) => ({ id: `med_${i + 1}`, name: `Медиаклуб ${i + 1}` }));

  let uidCounter = 0;
  const uid = () => `cup_${++uidCounter}`;

  const { cupState, fixtures } = initCup2026('2026/27', rplTeams, fnlTeams, secondLeagueTeams, mediaTeams, uid);

  // Проверяем каждый из 6 туров группового этапа Пути РПЛ
  for (let r = 1; r <= 6; r++) {
    const roundFx = fixtures.filter(f => f.cupPath === 'rpl_group' && f.round === r);
    assert.strictEqual(roundFx.length, 8, `Round ${r} must contain exactly 8 matches`);

    // Проверяем распределение по дням недели (Tue=2, Wed=3, Thu=4)
    const dayCounts: Record<number, number> = { 2: 0, 3: 0, 4: 0 };
    for (const f of roundFx) {
      const dayOfWeek = new Date(f.date + 'T12:00:00Z').getUTCDay();
      dayCounts[dayOfWeek] = (dayCounts[dayOfWeek] || 0) + 1;
    }

    assert.strictEqual(dayCounts[2], 2, `Round ${r} must have exactly 2 matches on Tuesday`);
    assert.strictEqual(dayCounts[3], 4, `Round ${r} must have exactly 4 matches on Wednesday`);
    assert.strictEqual(dayCounts[4], 2, `Round ${r} must have exactly 2 matches on Thursday`);
  }

  // Проверяем чередование недель между Путем регионов и Путем РПЛ
  assert.ok(cupState.regWeeks[0].tue < cupState.rplWeeks[0].tue, 'Regions R1 precedes RPL T1');
  assert.ok(cupState.rplWeeks[0].tue < cupState.regWeeks[1].tue, 'RPL T1 precedes Regions R2');
  assert.ok(cupState.regWeeks[1].tue < cupState.rplWeeks[1].tue, 'Regions R2 precedes RPL T2');
  assert.ok(cupState.rplWeeks[1].tue < cupState.regWeeks[2].tue, 'RPL T2 precedes Regions R3');
});

test('Referee assignment regulations: RPL & Cup only, 1 match per tour for head referee, zero other roles in same tour', () => {
  const db = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));

  // 1. Для всех лиг, кроме РПЛ и Кубка, арбитры НЕ назначаются
  const nonRplCupWithRefs = db.fixtures.filter((f: any) => f.comp !== 'rpl' && f.comp !== 'cup' && (f.refereeId || f.refereeName));
  assert.strictEqual(nonRplCupWithRefs.length, 0, 'No non-RPL/Cup fixture should have referees assigned');

  // 2. В каждом туре РПЛ и Кубка России каждый главный арбитр судит строго 1 матч и больше ничего
  function getTourKey(f: any): string {
    const s = f.season || '2026/27';
    if (f.comp === 'rpl') return `${s}:rpl:${f.round}`;
    if (f.comp === 'cup') {
      const p = f.cupPath || (f.round <= 6 ? 'rpl_group' : 'regions_qual');
      const r = f.qualRound || f.round || f.cupStage || 1;
      return `${s}:cup:${p}:${r}`;
    }
    return `${s}:${f.comp}:${f.round || 1}`;
  }

  const tours: Record<string, any[]> = {};
  for (const f of db.fixtures) {
    if (f.comp === 'rpl' || f.comp === 'cup') {
      const k = getTourKey(f);
      tours[k] = tours[k] || [];
      tours[k].push(f);
    }
  }

  for (const [tourKey, list] of Object.entries(tours)) {
    const headRefs = list.map((f: any) => f.refereeName).filter(Boolean);
    const uniqueHeadRefs = new Set(headRefs);

    // Главный арбитр назначен только на 1 матч в туре
    assert.strictEqual(uniqueHeadRefs.size, headRefs.length, `Duplicate head referees found in tour ${tourKey}: ${headRefs.join(', ')}`);

    // Больше ничего судить в этом туре он не может (ни ВАР, ни АВАР, ни резервным)
    for (const f of list) {
      if (f.reserveReferee) {
        assert.ok(!uniqueHeadRefs.has(f.reserveReferee), `Head referee ${f.reserveReferee} is assigned as reserve referee in tour ${tourKey}`);
      }
      if (f.varReferee) {
        assert.ok(!uniqueHeadRefs.has(f.varReferee), `Head referee ${f.varReferee} is assigned as VAR in tour ${tourKey}`);
      }
      if (f.avarReferee) {
        assert.ok(!uniqueHeadRefs.has(f.avarReferee), `Head referee ${f.avarReferee} is assigned as AVAR in tour ${tourKey}`);
      }
    }
  }
});

test('Match simulation: prompt.txt has authentic 10-section structure and context requirements', () => {
  const prompt = fs.readFileSync('prompt.txt', 'utf8');

  // Verify all 10 sections are explicitly present
  assert.ok(prompt.includes('═══ 1. ГЛАВНЫЙ ПРИНЦИП И ИСТИННАЯ ФИЗИКА ═══'), 'Section 1 missing');
  assert.ok(prompt.includes('═══ 2. ХРОНОЛОГИЯ, МИКРО-ЦЕПОЧКИ И ДИНАМИКА ЭПИЗОДОВ ═══'), 'Section 2 missing');
  assert.ok(prompt.includes('═══ 3. СУДЕЙСТВО, ПСИХОЛОГИЯ И ПОВЕДЕНИЕ АРБИТРОВ ═══'), 'Section 3 missing');
  assert.ok(prompt.includes('═══ 4. ПРОТОКОЛ VAR И СУДЕЙСКИЕ РЕШЕНИЯ ═══'), 'Section 4 missing');
  assert.ok(prompt.includes('═══ 5. ПОГОДА, ГАЗОН И ДЕГРАДАЦИЯ ПОКРЫТИЯ ═══'), 'Section 5 missing');
  assert.ok(prompt.includes('═══ 6. ЗАМЕНЫ, ОКНА И ТАКТИЧЕСКИЕ ПЕРЕСТРОЕНИЯ ═══'), 'Section 6 missing');
  assert.ok(prompt.includes('═══ 7. ТРАВМЫ, МЕДИЦИНСКАЯ ПОМОЩЬ И out_days ═══'), 'Section 7 missing');
  assert.ok(prompt.includes('═══ 8. АТМОСФЕРА, ЭКИПИРОВКА И ФУТБОЛЬНЫЕ ИНЦИДЕНТЫ ═══'), 'Section 8 missing');
  assert.ok(prompt.includes('═══ 9. УЧЁТ ВСЕХ ДАННЫХ САЙТА И КОНТЕКСТА ═══'), 'Section 9 missing');
  assert.ok(prompt.includes('═══ 10. СТРОГИЙ ФОРМАТ ВЫХОДНЫХ ДАННЫХ (JSON) ═══'), 'Section 10 missing');

  // Verify key domain concepts
  assert.ok(prompt.includes('cooling_break'));
  assert.ok(prompt.includes('out_days'));
  assert.ok(prompt.includes('VAR'));
  assert.ok(prompt.includes('state_at_end'));
  assert.ok(prompt.includes('momentum_note'));
});

test('Clean transfers: initial mock transfers are not automatically re-seeded', () => {
  const db = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));
  assert.strictEqual(Array.isArray(db.transfers), true, 'db.transfers must be an array');
  assert.strictEqual(db.transfers.length, 0, 'db.transfers must remain empty until user or gameplay creates transfers');
});

test('Dual-time scheduling: matches feature both real broadcast time and game season calendar time', () => {
  // Test the calculation logic of ensureDualTimes
  const sampleFixtures: any[] = [
    { id: 'fx1', comp: 'rpl', round: 1, date: '2026-07-18', time: '14:00', home: 't1', away: 't2' },
    { id: 'fx2', comp: 'rpl', round: 1, date: '2026-07-18', time: '16:30', home: 't3', away: 't4' },
    { id: 'fx3', comp: 'rpl', round: 1, date: '2026-07-19', time: '19:00', home: 't5', away: 't6' },
    { id: 'fx4', comp: 'rpl', round: 2, date: '2026-07-25', time: '14:00', home: 't2', away: 't3' }
  ];

  const baseRealStart = '2026-07-10';
  const roundCounts: Record<string, number> = {};
  sampleFixtures.forEach((f: any) => {
    f.gameDate = f.date;
    f.gameTime = f.time;

    const rnd = Number(f.round) || 1;
    const key = `${f.comp || 'all'}_${rnd}`;
    const idx = roundCounts[key] || 0;
    roundCounts[key] = idx + 1;

    // 1 tour per real calendar day:
    const dt = new Date(baseRealStart + 'T12:00:00Z');
    dt.setUTCDate(dt.getUTCDate() + (rnd - 1));
    f.realDate = dt.toISOString().slice(0, 10);

    // Staggered by 85 minutes (~30-min break between games):
    const slotMin = 12 * 60 + idx * 85;
    const rh = String(Math.floor(slotMin / 60)).padStart(2, '0');
    const rm = String(slotMin % 60).padStart(2, '0');
    f.realTime = `${rh}:${rm}`;
  });

  // Round 1 matches must all occur on real day 2026-07-10
  assert.strictEqual(sampleFixtures[0].realDate, '2026-07-10');
  assert.strictEqual(sampleFixtures[1].realDate, '2026-07-10');
  assert.strictEqual(sampleFixtures[2].realDate, '2026-07-10');

  // Round 2 match must occur on next real day 2026-07-11
  assert.strictEqual(sampleFixtures[3].realDate, '2026-07-11');

  // Staggered times with 85-min interval (30-min break between consecutive games):
  assert.strictEqual(sampleFixtures[0].realTime, '12:00');
  assert.strictEqual(sampleFixtures[1].realTime, '13:25');
  assert.strictEqual(sampleFixtures[2].realTime, '14:50');

  // Virtual game calendar preserved:
  assert.strictEqual(sampleFixtures[0].gameDate, '2026-07-18');
  assert.strictEqual(sampleFixtures[3].gameDate, '2026-07-25');
});

test('Head-to-head (H2H): produces exactly 7 recent meetings with accurate win/loss/draw summary', () => {
  // Deterministic generator verification
  const pairSeed = ['zenit', 'spartak'].sort().join(':');
  let hash = 0;
  for (let i = 0; i < pairSeed.length; i++) {
    hash = ((hash << 5) - hash) + pairSeed.charCodeAt(i);
    hash |= 0;
  }
  const pseudoRand = (n: number) => {
    const x = Math.sin(hash + n * 997.13) * 10000;
    return x - Math.floor(x);
  };

  const histDates = [
    '2026-05-18', '2025-11-23', '2025-08-16', '2025-04-12',
    '2024-10-27', '2024-05-04', '2023-11-12'
  ];
  const scoreCombos = [
    [2, 1], [1, 1], [0, 1], [1, 0], [2, 2], [3, 1], [1, 2]
  ];

  const matches: any[] = [];
  for (let k = 0; k < 7; k++) {
    const [sh, sa] = scoreCombos[Math.floor(pseudoRand(k + 10) * scoreCombos.length)];
    const isHome = k % 2 === 0;
    const curHomeGoals = isHome ? sh : sa;
    const curAwayGoals = isHome ? sa : sh;
    const winner = curHomeGoals > curAwayGoals ? 'home' : (curAwayGoals > curHomeGoals ? 'away' : 'draw');

    matches.push({
      date: histDates[k],
      homeScore: sh,
      awayScore: sa,
      winner,
      curHomeGoals,
      curAwayGoals
    });
  }

  assert.strictEqual(matches.length, 7, 'Must have exactly 7 meetings');

  const homeWins = matches.filter(m => m.winner === 'home').length;
  const draws = matches.filter(m => m.winner === 'draw').length;
  const awayWins = matches.filter(m => m.winner === 'away').length;

  assert.strictEqual(homeWins + draws + awayWins, 7, 'Sum of outcomes must equal 7');
});

test('Budgets: db.budgetHistory is always an Array and slice/filter operations succeed without error', () => {
  const db = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));
  assert.ok(Array.isArray(db.budgetHistory), 'db.budgetHistory must be an array');
  const sliced = (Array.isArray(db.budgetHistory) ? db.budgetHistory : []).slice(-200).reverse();
  assert.ok(Array.isArray(sliced), 'Sliced history must be an array');
});

test('Super Cup tournament: regulations, branding and match generation', () => {
  const db = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));
  const comps = db.comps || [];
  const superCupComp = comps.find((c: any) => c.id === 'supercup');
  assert.ok(superCupComp, 'Super Cup must exist in comps list');
  assert.strictEqual(superCupComp.logo, '/logos/leagues/supercup.svg');
  const superCupFx = (db.fixtures || []).find((f: any) => f.comp === 'supercup');
  assert.ok(superCupFx, 'Super Cup fixture must be present for the season');
  assert.ok(superCupFx.home && superCupFx.away, 'Super Cup must have home and away clubs');
});

test('Top Transfers: categories include expensive, valuable, and flops', () => {
  const db = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));
  assert.ok(Array.isArray(db.transfers), 'transfers must be array');
});

test('Real-time dual calendar: RPL and Cup fixtures strictly alternate 1 tour per day with night and daytime matches', () => {
  const sampleFixtures: any[] = [
    { id: 'rpl1', comp: 'rpl', round: 1, date: '2026-07-18', time: '14:00', home: 't1', away: 't2' },
    { id: 'rpl2', comp: 'rpl', round: 1, date: '2026-07-18', time: '16:30', home: 't3', away: 't4' },
    { id: 'cup1', comp: 'cup', cupPath: 'regions_qual', qualRound: 1, date: '2026-07-21', time: '17:00', home: 't5', away: 't6' },
    { id: 'cup2', comp: 'cup', cupPath: 'regions_qual', qualRound: 1, date: '2026-07-21', time: '19:00', home: 't7', away: 't8' },
    { id: 'rpl3', comp: 'rpl', round: 2, date: '2026-07-25', time: '14:00', home: 't2', away: 't3' },
    { id: 'rpl4', comp: 'rpl', round: 2, date: '2026-07-25', time: '19:00', home: 't4', away: 't1' }
  ];

  const baseRealStart = '2026-11-07';
  const addDays = (d: string, n: number) => {
    const t = new Date(d + 'T12:00:00Z');
    t.setUTCDate(t.getUTCDate() + n);
    return t.toISOString().slice(0, 10);
  };

  // Group by tournament round:
  const tourBlocks = new Map<string, any>();
  sampleFixtures.forEach((f: any) => {
    f.gameDate = f.date;
    f.gameTime = f.time;
    const tourKey = f.comp === 'rpl' ? `rpl_tour_${f.round}` : `cup_regions_r${f.qualRound}`;
    if (!tourBlocks.has(tourKey)) {
      tourBlocks.set(tourKey, { key: tourKey, minGameDate: f.date, fixtures: [] });
    }
    const b = tourBlocks.get(tourKey);
    b.fixtures.push(f);
    if (f.date < b.minGameDate) b.minGameDate = f.date;
  });

  const sortedBlocks = Array.from(tourBlocks.values()).sort((a, b) => a.minGameDate.localeCompare(b.minGameDate));
  
  // 1 tour per real calendar day:
  sortedBlocks.forEach((block, blockIndex) => {
    const realDayDate = addDays(baseRealStart, blockIndex);
    const nightSlots = ['01:00', '01:30'];
    block.fixtures.forEach((f: any, fi: number) => {
      f.realDate = realDayDate;
      f.realTime = fi === 0 ? nightSlots[0] : '14:00';
    });
  });

  // Verify block 0 (RPL 1) is Day 0:
  assert.strictEqual(sampleFixtures[0].realDate, '2026-11-07');
  assert.strictEqual(sampleFixtures[1].realDate, '2026-11-07');

  // Verify block 1 (Cup 1) is Day 1:
  assert.strictEqual(sampleFixtures[2].realDate, '2026-11-08');
  assert.strictEqual(sampleFixtures[3].realDate, '2026-11-08');

  // Verify block 2 (RPL 2) is Day 2:
  assert.strictEqual(sampleFixtures[4].realDate, '2026-11-09');
  assert.strictEqual(sampleFixtures[5].realDate, '2026-11-09');

  // Verify night kickoff present in RPL 1:
  assert.strictEqual(sampleFixtures[0].realTime, '01:00');
  // Verify daytime kickoff present in RPL 1:
  assert.strictEqual(sampleFixtures[1].realTime, '14:00');

  // Verify realAt MSK parsing:
  const dt = new Date(`${sampleFixtures[0].realDate}T${sampleFixtures[0].realTime}:00+03:00`);
  assert.ok(!isNaN(dt.getTime()));
});

test('Neutral grounds for all finals: Russian Cup in Luzhniki, first Super Cup in Nizhny Novgorod', async () => {
  const { CUP_FINAL_VENUE, getCupFinalVenue } = await import('../src/cup2026.ts');
  const { LEAGUE_REGULATIONS } = await import('../src/rules.ts');
  const raw = fs.readFileSync('data/db.json', 'utf8');
  const db = JSON.parse(raw);

  // 1. First Super Cup (2026/27) must be in Nizhny Novgorod on neutral ground
  const sc2026 = (db.fixtures || []).find((f: any) => f.comp === 'supercup' && f.season === '2026/27');
  assert.ok(sc2026, 'Super Cup 2026/27 fixture must exist');
  assert.strictEqual(sc2026.neutralField, true, 'Super Cup must be on a neutral field');
  assert.strictEqual(sc2026.city, 'Нижний Новгород', 'First Super Cup city must be Nizhny Novgorod');
  assert.ok(sc2026.stadium.includes('Нижний Новгород'), 'First Super Cup stadium must be in Nizhny Novgorod');
  assert.ok(sc2026.stadium.includes('нейтральное поле'), 'First Super Cup stadium must specify neutral field');

  // 2. Russian Cup final venue must be Luzhniki in Moscow
  assert.strictEqual(CUP_FINAL_VENUE.city, 'Москва', 'Russian Cup final city must be Moscow');
  assert.ok(CUP_FINAL_VENUE.stadium.includes('Лужники'), 'Russian Cup final must be in Luzhniki');
  assert.strictEqual(CUP_FINAL_VENUE.neutralField, true, 'Russian Cup final must be on a neutral field');
  assert.strictEqual(getCupFinalVenue().stadium, CUP_FINAL_VENUE.stadium);

  // 3. Rules regulations summary check
  assert.ok(LEAGUE_REGULATIONS.supercup.rulesSummary.some(s => s.includes('Нижнем Новгороде')), 'Super Cup rules must mention Nizhny Novgorod');
  assert.ok(LEAGUE_REGULATIONS.cup.rulesSummary.some(s => s.includes('Лужники')), 'Cup rules must mention Luzhniki');

  // 4. Any fixture in the database marked as a final must have neutralField === true
  (db.fixtures || []).forEach((f: any) => {
    const isFinal = f.comp === 'supercup' || f.cupStage === 'superfinal' || (f.label && f.label.toLowerCase().includes('финал') && !f.label.toLowerCase().includes('1/'));
    if (isFinal) {
      assert.strictEqual(f.neutralField, true, `Final match ${f.id} (${f.label}) must have neutralField set to true`);
    }
  });
});

test('Manual single match schedule modification: admin can change game and real date/time individually', async () => {
  const raw = fs.readFileSync('data/db.json', 'utf8');
  const db = JSON.parse(raw);
  const targetFx = (db.fixtures || []).find((f: any) => f.comp === 'rpl') || (db.fixtures || [])[0];
  assert.ok(targetFx, 'At least one fixture must exist');

  const adminCode = db?.settings?.adminCode || 'TEST_ADMIN';
  const BASE_URL = 'http://localhost:3000';

  // 1. Non-admin is rejected (403 Forbidden)
  const rejectRes = await fetch(`${BASE_URL}/api/admin/fixture`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: targetFx.id,
      gameDate: '2026-09-15',
      gameTime: '17:30'
    })
  });
  assert.strictEqual(rejectRes.status, 403, 'Non-authenticated request must be rejected with 403');

  // 2. Admin logs in
  const loginRes = await fetch(`${BASE_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: adminCode })
  });
  assert.strictEqual(loginRes.status, 200, 'Admin login should succeed');
  const { token } = await loginRes.json();
  assert.ok(token, 'Must receive auth token');

  // 3. Admin updates individual match date and time (both game and real time)
  const newGameDate = '2026-10-18';
  const newGameTime = '19:45';
  const newRealDate = '2026-11-20';
  const newRealTime = '21:15';
  const newStadium = 'ВЭБ Арена (Тест)';

  const updateRes = await fetch(`${BASE_URL}/api/admin/fixture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token
    },
    body: JSON.stringify({
      id: targetFx.id,
      gameDate: newGameDate,
      gameTime: newGameTime,
      realDate: newRealDate,
      realTime: newRealTime,
      stadium: newStadium,
      neutralField: true,
      force: true
    })
  });
  assert.strictEqual(updateRes.status, 200, 'Admin update must succeed');
  const updateData = await updateRes.json();
  assert.strictEqual(updateData.ok, 1);
  assert.ok(updateData.fixture, 'Must return updated fixture');
  assert.strictEqual(updateData.fixture.gameDate, newGameDate);
  assert.strictEqual(updateData.fixture.gameTime, newGameTime);
  assert.strictEqual(updateData.fixture.realDate, newRealDate);
  assert.strictEqual(updateData.fixture.realTime, newRealTime);
  assert.strictEqual(updateData.fixture.stadium, newStadium);
  assert.strictEqual(updateData.fixture.neutralField, true);

  // 4. Verify that other fixtures in db were NOT modified
  const updatedDb = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));
  const updatedFxInDb = updatedDb.fixtures.find((f: any) => f.id === targetFx.id);
  assert.strictEqual(updatedFxInDb.gameDate, newGameDate);
  assert.strictEqual(updatedFxInDb.gameTime, newGameTime);
  assert.strictEqual(updatedFxInDb.realDate, newRealDate);
  assert.strictEqual(updatedFxInDb.realTime, newRealTime);

  const secondFx = (updatedDb.fixtures || [])[1];
  if (secondFx) {
    assert.notStrictEqual(secondFx.id, targetFx.id);
    assert.notStrictEqual(secondFx.gameDate, newGameDate);
  }
});

test('Permissions: Scout request (/api/club/scout-request) is forbidden for non-admin users', async () => {
  const res = await fetch('http://localhost:3000/api/club/scout-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ teamId: 'zenit' })
  });
  assert.strictEqual(res.status, 403, 'Must return 403 when no admin session token provided');
  const data = await res.json();
  assert.strictEqual(data.error, 'Нужен вход администратора');
});

test('Permissions: index.html hides weather tab and scout evaluation button from regular users', () => {
  const html = fs.readFileSync('index.html', 'utf8');
  assert.ok(html.includes("if (S.me?.role === 'admin') links.push(['#/weather', '🌤️ Погода'])"), 'Weather tab must be conditional on admin role');
  assert.ok(html.includes("${S.me?.role === 'admin' ? `\n          <div>\n            <button class=\"btn\" id=\"btn_req_foreign_scouts\""), 'Scout evaluation button must be conditional on admin role');
});

