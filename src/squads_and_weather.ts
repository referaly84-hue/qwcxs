// @ts-nocheck
/**
 * Squad generator, geo data, and weather calculation
 */

export const CLIMATE_DATA: Record<string, any> = {
  'Москва': { tempSummer: 23, tempWinter: -6, rainProb: 0.25 },
  'Санкт-Петербург': { tempSummer: 21, tempWinter: -4, rainProb: 0.40 },
  'Краснодар': { tempSummer: 30, tempWinter: 3, rainProb: 0.15 },
  'Ростов-на-Дону': { tempSummer: 29, tempWinter: 0, rainProb: 0.18 },
  'Казань': { tempSummer: 24, tempWinter: -10, rainProb: 0.22 },
  'Самара': { tempSummer: 25, tempWinter: -8, rainProb: 0.20 },
  'Грозный': { tempSummer: 28, tempWinter: 2, rainProb: 0.16 },
  'Сочи': { tempSummer: 28, tempWinter: 8, rainProb: 0.25 }
};

export const ALL_TEAMS_GEO: Record<string, { lat: number; lon: number; city: string }> = {
  'Зенит': { lat: 59.972, lon: 30.221, city: 'Санкт-Петербург' },
  'Спартак': { lat: 55.818, lon: 37.441, city: 'Москва' },
  'ЦСКА': { lat: 55.791, lon: 37.516, city: 'Москва' },
  'Динамо Москва': { lat: 55.791, lon: 37.560, city: 'Москва' },
  'Локомотив': { lat: 55.803, lon: 37.742, city: 'Москва' },
  'Краснодар': { lat: 45.044, lon: 39.029, city: 'Краснодар' },
  'Ростов': { lat: 47.209, lon: 39.738, city: 'Ростов-на-Дону' },
  'Рубин': { lat: 55.819, lon: 49.158, city: 'Казань' }
};

export function getOrCreateCityClimate(city: string): any {
  return CLIMATE_DATA[city] || { tempSummer: 22, tempWinter: -5, rainProb: 0.2 };
}

export function calculateMatchWeather(cityName: string, dateStr?: string, timeStr?: string): any {
  const city = cityName || 'Москва';
  const climate = getOrCreateCityClimate(city);
  const temp = Math.floor(climate.tempSummer + (Math.random() * 6 - 3));
  const isRain = Math.random() < (climate.rainProb || 0.2);

  const text = isRain
    ? `Дождь, +${temp}°C, ветер 4 м/с`
    : `Ясно, +${temp}°C, слабый ветер 2 м/с`;

  const short = isRain ? `🌧️ +${temp}°C` : `☀️ +${temp}°C`;

  return {
    text,
    short,
    temp,
    condition: isRain ? 'rain' : 'clear',
    wind: '3 м/с',
    humidity: '65%'
  };
}

const RUSSIAN_FIRST_NAMES = ['Иван', 'Алексей', 'Дмитрий', 'Максим', 'Сергей', 'Артем', 'Михаил', 'Даниил', 'Кирилл', 'Никита', 'Андрей', 'Илья'];
const RUSSIAN_LAST_NAMES = ['Смирнов', 'Иванов', 'Кузнецов', 'Попов', 'Соколов', 'Лебедев', 'Козлов', 'Новиков', 'Морозов', 'Петров', 'Волков'];

export function generateFullSquad(team: any): any[] {
  const tid = team.id || team;
  const tName = team.name || 'Клуб';
  const comp = team.comp || 'rpl';
  const baseRating = comp === 'rpl' ? 74 : (comp === 'fnl' ? 66 : 58);

  const positions = [
    'ВР', 'ВР', 'ВР',
    'ЗАЩ', 'ЗАЩ', 'ЗАЩ', 'ЗАЩ', 'ЗАЩ', 'ЗАЩ', 'ЗАЩ',
    'ПЗ', 'ПЗ', 'ПЗ', 'ПЗ', 'ПЗ', 'ПЗ', 'ПЗ',
    'НАП', 'НАП', 'НАП', 'НАП'
  ];

  return positions.map((pos, idx) => {
    const fn = RUSSIAN_FIRST_NAMES[Math.floor(Math.random() * RUSSIAN_FIRST_NAMES.length)];
    const ln = RUSSIAN_LAST_NAMES[Math.floor(Math.random() * RUSSIAN_LAST_NAMES.length)];
    const num = idx + 1;
    const rating = Math.floor(baseRating + (Math.random() * 8 - 4));
    return {
      id: `p_${tid}_${idx + 1}`,
      teamId: tid,
      name: `${fn} ${ln}`,
      pos,
      num,
      rating,
      age: Math.floor(19 + Math.random() * 14),
      nation: 'Россия',
      marketValue: rating * 150000,
      salary: rating * 12000
    };
  });
}
