// @ts-nocheck
/**
 * League regulations and legionnaire rules for Russian football competitions
 */

export const LEAGUE_REGULATIONS: Record<string, any> = {
  rpl: {
    name: 'Российская Премьер-Лига',
    totalTeams: 16,
    format: '16 клубов, 30 туров (двухкруговой турнир)',
    zones: [
      { pos: [1], label: 'Чемпион России / Золото', color: '#eab308' },
      { pos: [13, 14], label: 'Стыковые матчи с Первой лигой', color: '#f97316' },
      { pos: [15, 16], label: 'Прямой вылет в Первую лигу', color: '#ef4444' }
    ],
    legionLimit: {
      inSquad: 13,
      onPitch: 8,
      desc: 'Не более 13 легионеров в заявке, не более 8 одновременно на поле. Граждане ЕАЭС не считаются легионерами.',
      label: 'Лимит: 13 в заявке / 8 на поле'
    }
  },
  fnl: {
    name: 'Первая лига (ФНЛ)',
    totalTeams: 18,
    format: '18 клубов, 34 тура',
    zones: [
      { pos: [1, 2], label: 'Прямой выход в РПЛ (зелёная зона)', color: '#22c55e' },
      { pos: [3, 4], label: 'Стыковые матчи за выход в РПЛ', color: '#f97316' },
      { pos: [16, 17, 18], label: 'Вылет во Вторую лигу А (красная зона)', color: '#ef4444' }
    ],
    legionLimit: {
      inSquad: 4,
      onPitch: 4,
      desc: 'Не более 4 легионеров в заявке и на поле.',
      label: 'Лимит: 4 в заявке / 4 на поле'
    }
  },
  cup: {
    name: 'Кубок России',
    format: 'Путь РПЛ (группы) + Путь Регионов (плей-офф на вылет) + Суперфинал',
    legionLimit: {
      inSquad: 13,
      onPitch: 8,
      desc: 'Лимит Кубка России: 13 / 8',
      label: 'Лимит: 13 / 8'
    }
  },
  '2la_gold': {
    name: 'Вторая лига А (Золото)',
    totalTeams: 10,
    zones: []
  },
  '2la_silver': {
    name: 'Вторая лига А (Серебро)',
    totalTeams: 10,
    zones: []
  },
  '2la': {
    name: 'Вторая лига А',
    zones: []
  },
  '2lb': {
    name: 'Вторая лига Б',
    zones: []
  }
};

const EAEU_COUNTRIES = new Set([
  'россия', 'russia', 'rus',
  'беларусь', 'belarus', 'blr',
  'казахстан', 'kazakhstan', 'kaz',
  'армения', 'armenia', 'arm',
  'кыргызстан', 'kyrgyzstan', 'kgz'
]);

export function isLegionnaire(player: any): boolean {
  if (!player) return false;
  const nation = String(player.nation || player.nationality || player.country || 'Россия').trim().toLowerCase();
  return !EAEU_COUNTRIES.has(nation);
}

export function getLegionnaireStatus(player: any): string {
  if (!player) return 'local';
  const nation = String(player.nation || player.nationality || player.country || 'Россия').trim().toLowerCase();
  if (nation === 'россия' || nation === 'russia' || nation === 'rus') return 'local';
  if (EAEU_COUNTRIES.has(nation)) return 'eaue';
  return 'legionnaire';
}

export function getRplLegionLimit(season?: string) {
  return {
    inSquad: 13,
    onPitch: 8,
    desc: 'Лимит: 13 в заявке / 8 на поле',
    label: '13 в заявке / 8 на поле'
  };
}

export function getTeamZoneClass(comp: string, pos: number, total: number): { zoneClass: string; badgeLabel: string; tooltip: string } {
  if (comp === 'rpl') {
    if (pos === 1) return { zoneClass: 'zone-gold', badgeLabel: 'Чемпион', tooltip: '1 место: Чемпион России' };
    if (pos >= 15) return { zoneClass: 'zone-bad', badgeLabel: 'Вылет', tooltip: '15-16 места: Прямой вылет в Первую лигу' };
    if (pos >= 13 && pos <= 14) return { zoneClass: 'zone-playoff', badgeLabel: 'Стыки', tooltip: '13-14 места: Стыковые матчи с Первой лигой' };
  } else if (comp === 'fnl') {
    if (pos <= 2) return { zoneClass: 'zone-top', badgeLabel: 'В РПЛ', tooltip: '1-2 места: Прямой выход в Премьер-Лигу' };
    if (pos <= 4) return { zoneClass: 'zone-playoff', badgeLabel: 'Стыки', tooltip: '3-4 места: Стыковые матчи за выход в РПЛ' };
    if (pos >= 16 || (total && pos >= total - 2)) return { zoneClass: 'zone-bad', badgeLabel: 'Вылет', tooltip: '16-18 места: Вылет во Вторую лигу' };
  } else if (comp === '2la_gold') {
    if (pos <= 2) return { zoneClass: 'zone-top', badgeLabel: 'В 1-ю лигу', tooltip: '1-2 места: Прямой выход в Первую лигу' };
    if (pos === 3) return { zoneClass: 'zone-playoff', badgeLabel: 'Стыки', tooltip: '3 место: Стыковой матч' };
    if (pos >= 7) return { zoneClass: 'zone-bad', badgeLabel: 'В Серебро', tooltip: '7-10 места: Ротация в группу «Серебро»' };
  } else if (comp === '2la_silver') {
    if (pos <= 4) return { zoneClass: 'zone-top', badgeLabel: 'В Золото', tooltip: '1-4 места: Повышение в группу «Золото»' };
    if (pos >= 7) return { zoneClass: 'zone-bad', badgeLabel: 'Во 2-ю лигу Б', tooltip: '7-10 места: Вылет во Вторую лигу Б' };
  } else if (comp && comp.startsWith('2lb')) {
    if (pos === 1) return { zoneClass: 'zone-top', badgeLabel: 'В «А»', tooltip: '1 место: Прямой выход в Серебро' };
    if (pos >= total) return { zoneClass: 'zone-bad', badgeLabel: '3-я лига', tooltip: 'Аутсайдер: Зона вылета' };
  } else if (comp === 'media') {
    if (pos <= 4) return { zoneClass: 'zone-top', badgeLabel: '1/2 финала', tooltip: '1-4 места: 1/2 финала плей-офф' };
    if (pos <= 8) return { zoneClass: 'zone-playoff', badgeLabel: 'Стыки', tooltip: '5-8 места: Квалификационные стыки' };
  }
  return { zoneClass: '', badgeLabel: '', tooltip: '' };
}
