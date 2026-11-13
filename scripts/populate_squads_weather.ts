import fs from 'node:fs';
import {
  ALL_TEAMS_GEO,
  CLIMATE_DATA,
  calculateMatchWeather,
  generateFullSquad
} from '../src/squads_and_weather.ts';

const DB_FILE = 'data/db.json';
const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

console.log('--- Начинаем обновление базы данных: города, погода и полные составы ---');

// 1. Обновляем города, стадионы и координаты всех команд
let geoUpdated = 0;
for (const t of db.teams) {
  const geo = ALL_TEAMS_GEO[t.name];
  if (geo) {
    t.city = geo.city;
    t.stadium = geo.stadium;
    t.lat = geo.lat;
    t.lon = geo.lon;
    geoUpdated++;
  } else if (!t.city) {
    t.city = 'Москва';
    t.lat = 55.75;
    t.lon = 37.62;
    t.stadium = t.name + ' Арена';
  }
}
console.log(`Обновлена география и стадионы для ${geoUpdated} команд из ${db.teams.length}.`);

// 2. Инициализируем климатическую базу данных в db.json
db.cityClimates = CLIMATE_DATA;
if (!db.dailyWeather) db.dailyWeather = {};

console.log(`Климатическая база сохранена в db.cityClimates (${Object.keys(db.cityClimates).length} базовых климатических зон).`);

// 3. Создаем полные составы для всех команд Первой лиги, Второй лиги А, Второй лиги Б, Медиалиги и РПЛ
if (!Array.isArray(db.players)) db.players = [];
if (!db.squads) db.squads = {};

const existingPlayerIds = new Set(db.players.map((p: any) => p.id));
let squadsCreated = 0;
let playersAdded = 0;

for (const t of db.teams) {
  const comp = t.comp || '';
  const currentSquad = (db.squads[t.id] || []).filter((pid: string) => existingPlayerIds.has(pid));

  // Если у команды меньше 16 игроков, создаем полный комплект из 20 игроков
  if (currentSquad.length < 16) {
    const fullSquad = generateFullSquad(t);
    const newIds: string[] = [];
    for (const p of fullSquad) {
      // Удаляем возможные старые дубликаты
      db.players = db.players.filter((x: any) => x.id !== p.id);
      db.players.push(p);
      existingPlayerIds.add(p.id);
      newIds.push(p.id);
      playersAdded++;
    }
    db.squads[t.id] = newIds;
    squadsCreated++;
  }
}
console.log(`Созданы полные составы для ${squadsCreated} команд (добавлено ${playersAdded} игроков в db.players).`);
console.log(`Всего игроков в базе: ${db.players.length}. Заявок в db.squads: ${Object.keys(db.squads).length}.`);

// 4. Привязываем погоду к каждому матчу в db.fixtures
let fixturesWeatherUpdated = 0;
for (const f of db.fixtures) {
  const homeTeam = db.teams.find((t: any) => t.id === f.home);
  const matchCity = f.city || homeTeam?.city || 'Москва';
  const matchDate = f.gameDate || f.date || '2026-09-15';
  const matchTime = f.gameTime || f.time || '17:00';

  const w = calculateMatchWeather(matchCity, matchDate, matchTime);
  f.weather = w.text;
  f.weatherShort = w.short;
  f.weatherDetails = {
    temp: w.temp,
    feelsLike: w.feelsLike,
    condition: w.condition,
    icon: w.icon,
    wind: w.wind,
    windDir: w.windDir,
    humidity: w.humidity,
    pressure: w.pressure,
    precipitation: w.precipitation,
    pitch: w.pitch
  };

  const weatherKey = `${matchCity}_${matchDate}`;
  db.dailyWeather[weatherKey] = w;
  fixturesWeatherUpdated++;
}

console.log(`Погода рассчитана и сохранена для всех ${fixturesWeatherUpdated} матчей календаря.`);

// Сохраняем в db.json
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('✅ Файл data/db.json успешно обновлен и сохранен!');
