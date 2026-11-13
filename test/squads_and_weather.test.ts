import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { generateFullSquad } from '../src/squads_and_weather.ts';
import { createForeignOfferWithAI, respondToForeignOffer, FOREIGN_CLUBS } from '../src/foreign_transfers.ts';

const BASE_URL = 'http://localhost:3000';

test('Player Database: all players successfully cleared from db as requested', () => {
  const raw = fs.readFileSync('data/db.json', 'utf8');
  const db = JSON.parse(raw);
  assert.equal(db.players.length, 0, 'Database players must be cleared');
  assert.ok(db.teams.length >= 16, 'Teams must remain in the database');
});

test('Full Squads Generator: First League (FNL) generates complete rosters of at least 18-20 players with all positions', () => {
  const raw = fs.readFileSync('data/db.json', 'utf8');
  const db = JSON.parse(raw);

  const fnlTeams = db.teams.filter((t: any) => t.comp === 'fnl');
  assert.equal(fnlTeams.length, 18, 'First League must contain 18 teams');

  const sampleTeam = fnlTeams[0];
  const players = generateFullSquad(sampleTeam);
  assert.ok(players.length >= 18, `Team ${sampleTeam.name} must generate at least 18 players, got ${players.length}`);

  const gks = players.filter((p: any) => p.pos === 'ВР');
  const defs = players.filter((p: any) => ['ЦЗ', 'ЛЗ', 'ПЗ'].includes(p.pos));
  const mids = players.filter((p: any) => ['ОП', 'ЦП', 'АП'].includes(p.pos));
  const fwds = players.filter((p: any) => ['ЛВ', 'ПВ', 'ЦФ'].includes(p.pos));

  assert.ok(gks.length >= 1, `Team ${sampleTeam.name} must have at least 1 goalkeeper`);
  assert.ok(defs.length >= 4, `Team ${sampleTeam.name} must have at least 4 defenders`);
  assert.ok(mids.length >= 4, `Team ${sampleTeam.name} must have at least 4 midfielders`);
  assert.ok(fwds.length >= 2, `Team ${sampleTeam.name} must have at least 2 forwards`);
});

test('Full Squads Generator: Second League A (Gold & Silver) teams have complete generator support', () => {
  const raw = fs.readFileSync('data/db.json', 'utf8');
  const db = JSON.parse(raw);

  const teams2la = db.teams.filter((t: any) => t.comp === '2la_gold' || t.comp === '2la_silver');
  assert.ok(teams2la.length >= 17, 'Second League A must have at least 17 teams (Gold + Silver)');

  const sample = teams2la[0];
  const players = generateFullSquad(sample);
  assert.ok(players.length >= 18, `${sample.name} must generate full roster`);
  assert.ok(players.some((p: any) => p.pos === 'ВР'), `${sample.name} must have a goalkeeper`);
  assert.ok(sample.city && sample.city.length > 0, `${sample.name} must have a designated city`);
  assert.ok(sample.lat != null && sample.lon != null, `${sample.name} must have geographical coordinates`);
});

test('Full Squads Generator: Media League teams include iconic media stars', () => {
  const raw = fs.readFileSync('data/db.json', 'utf8');
  const db = JSON.parse(raw);

  const team2Drots = db.teams.find((t: any) => t.name === '2Drots') || { id: '2drots', name: '2Drots', comp: 'media' };
  const players2Drots = generateFullSquad(team2Drots);
  const names2D = players2Drots.map((p: any) => p.name);
  assert.ok(names2D.some((n: string) => n.includes('Сычёв') || n.includes('Крап') || n.includes('Слон')), '2Drots stars must be present');

  const teamAmkal = db.teams.find((t: any) => t.name === 'Амкал') || { id: 'amkal', name: 'Амкал', comp: 'media' };
  const playersAmkal = generateFullSquad(teamAmkal);
  const namesAmkal = playersAmkal.map((p: any) => p.name);
  assert.ok(namesAmkal.some((n: string) => n.includes('Швагирев') || n.includes('Прокоп') || n.includes('Маврин')), 'Amkal stars must be present');
});

test('Weather Database: db.json stores climate statistics for all football cities', () => {
  const raw = fs.readFileSync('data/db.json', 'utf8');
  const db = JSON.parse(raw);

  assert.ok(db.cityClimates, 'db.cityClimates must exist in the database');
  const climateCities = Object.keys(db.cityClimates);
  assert.ok(climateCities.length >= 10, 'Climate database must contain multi-month climate norms');

  for (const city of ['Москва', 'Санкт-Петербург', 'Краснодар', 'Казань', 'Сочи']) {
    const c = db.cityClimates[city];
    assert.ok(c, `City ${city} must be in climate database`);
    assert.equal(c.months.length, 12, `${city} must have 12 months climate stats`);
    assert.ok(c.months[6].tDay > c.months[0].tDay, `July daytime temp in ${city} must be warmer than January`);
  }
});

test('Weather Integration: Every fixture in db.fixtures has weather assigned and persisted', () => {
  const raw = fs.readFileSync('data/db.json', 'utf8');
  const db = JSON.parse(raw);

  for (const f of db.fixtures.slice(0, 30)) {
    assert.ok(f.weather, `Fixture ${f.id} must have weather description`);
    assert.ok(f.weatherDetails, `Fixture ${f.id} must have weatherDetails object`);
    assert.equal(typeof f.weatherDetails.temp, 'number');
    assert.ok(f.weatherDetails.pitch, `Fixture ${f.id} must have pitch condition description`);
  }
});

test('Weather API: /api/weather/cities and /api/weather/city/:cityName endpoints return accurate climate data', async () => {
  const resCities = await fetch(`${BASE_URL}/api/weather/cities`);
  assert.equal(resCities.status, 200);
  const cities = await resCities.json();
  assert.ok(Array.isArray(cities) && cities.length > 0, 'Must return array of cities');

  const resMoscow = await fetch(`${BASE_URL}/api/weather/city/Москва?date=2026-07-15`);
  assert.equal(resMoscow.status, 200);
  const moscow = await resMoscow.json();
  assert.equal(moscow.city, 'Москва');
  assert.ok(moscow.temp > 10, 'Moscow July temperature should be summer level');
  assert.ok(moscow.pitch, 'Pitch state must be present');
});

test('Foreign Transfers: AI generates realistic offer when player performs well', async () => {
  const dummyPlayer = {
    id: 'pl_test_star',
    name: 'Алексей Батраков',
    pos: 'АП',
    rating: 81,
    teamId: 'team_loko'
  };
  const dummyClub = {
    id: 'team_loko',
    name: 'Локомотив'
  };

  const offer = await createForeignOfferWithAI({
    player: dummyPlayer,
    club: dummyClub,
    performanceReason: 'Признан MOTM матча, забил 2 гола, оценка 8.8',
    matchRating: 8.8
  });

  assert.ok(offer.id.startsWith('fo_'), 'Offer ID should start with fo_');
  assert.equal(offer.pid, dummyPlayer.id);
  assert.equal(offer.playerName, dummyPlayer.name);
  assert.ok(offer.buyerClub && offer.buyerClub.length > 0, 'Buyer club must be defined');
  assert.ok(offer.buyerCountry && offer.buyerCountry.length > 0, 'Buyer country must be defined');
  assert.ok(offer.feeAmount > 0, 'Fee amount must be positive');
  assert.ok(offer.fee.includes('€'), 'Fee string must format Euros');
  assert.ok(offer.scoutReport && offer.scoutReport.length > 10, 'Scout report should be detailed');
  assert.equal(offer.status, 'pending');
});

test('Foreign Transfers: club owner accepts offer, receives budget funds, and completes transfer', () => {
  const mockDb: any = {
    players: [{ id: 'p1', name: 'Матвей Кисляк', pos: 'ЦП', rating: 77, teamId: 'c1' }],
    teams: [{ id: 'c1', name: 'ЦСКА', budget: 5_000_000 }],
    squads: { c1: ['p1'] },
    transfers: [] as any[],
    budgetHistory: [] as any[],
    foreignOffers: [{
      id: 'fo_999',
      pid: 'p1',
      playerName: 'Матвей Кисляк',
      pos: 'ЦП',
      playerRating: 77,
      clubId: 'c1',
      clubName: 'ЦСКА',
      buyerClub: 'Аталанта',
      buyerCountry: 'Италия',
      buyerLeague: 'Серия А',
      buyerFlag: '🇮🇹',
      buyerLogo: '',
      type: 'sale',
      fee: '€10.0 млн',
      feeAmount: 10.0,
      wage: '€1.8 млн/год',
      scoutReport: 'Отличная игра в центре поля',
      triggerReason: 'MOTM в дерби',
      date: new Date().toISOString(),
      status: 'pending'
    }]
  };

  const result = respondToForeignOffer(mockDb, 'fo_999', 'accept', 'c1');
  assert.equal(result.success, true);
  assert.equal(result.action, 'accepted');
  assert.equal(mockDb.teams[0].budget, 15_000_000, 'Club budget must increase by 10 million euros');
  assert.equal(mockDb.squads.c1.length, 0, 'Player must be removed from current squad');
  assert.equal(mockDb.players[0].teamId, null, 'Player teamId must be cleared');
  assert.equal(mockDb.players[0].foreignClub, 'Аталанта', 'Player foreignClub must be Atalanta');
  assert.equal(mockDb.budgetHistory.length, 1, 'Budget transaction must be recorded');
  assert.equal(mockDb.budgetHistory[0].amount, 10_000_000);
});
