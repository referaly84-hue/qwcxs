// @ts-nocheck
/**
 * Coaching and club staff system
 */

export interface Coach {
  id: string;
  name: string;
  club?: string;
  clubName?: string;
  comp?: string;
  tactic?: string;
  style?: string;
  styleTitle?: string;
  styleDesc?: string;
  formation?: string;
  favoriteFormation?: string;
  temperament?: string;
  quote?: string;
  nationality?: string;
  age?: number;
  reputation?: number;
  salary?: number;
  [key: string]: any;
}

export type StaffRole = 'head' | 'assistant' | 'gk' | 'fitness' | 'doctor' | 'analyst' | 'scout';

export interface StaffMember {
  id: string;
  teamId: string;
  teamName?: string;
  name: string;
  role: StaffRole;
  roleTitle: string;
  specialty?: string;
  salary?: number;
  rating?: number;
  reputation?: string;
  age?: number;
  nationality?: string;
  brief?: string;
  bio?: string;
  favoriteFormation?: string;
  style?: string;
  styleTitle?: string;
  pending?: boolean;
  [key: string]: any;
}

export const STAFF_ROLES: Record<string, { title: string; desc: string }> = {
  head: { title: 'Главный тренер', desc: 'Определяет тактику, состав и управляет командой во время матча' },
  assistant: { title: 'Ассистент тренера', desc: 'Помогает главному тренеру в тактической подготовке' },
  gk: { title: 'Тренер вратарей', desc: 'Отвечает за подготовку голкиперов и реакцию на стандартах' },
  fitness: { title: 'Тренер по физподготовке', desc: 'Снижает утомляемость игроков и травматизм' },
  doctor: { title: 'Главный врач', desc: 'Диагностика травм и ускорение реабилитации игроков' },
  analyst: { title: 'Аналитик', desc: 'Сбор данных по соперникам и xG статистика' },
  scout: { title: 'Скаутинг', desc: 'Поиск талантов на трансферном рынке' }
};

const DEFAULT_COACHES: Record<string, Partial<Coach>> = {
  'зенит': { name: 'Сергей Семак', formation: '4-3-3', favoriteFormation: '4-3-3', style: 'Атакующий контроль', temperament: 'Сдержанный', quote: 'Главное — результат и дисциплина на каждом участке поля.' },
  'спартак': { name: 'Деян Станкович', formation: '4-2-3-1', favoriteFormation: '4-2-3-1', style: 'Высокий прессинг', temperament: 'Эмоциональный', quote: 'Спартак должен всегда биться за первое место с горящим сердцем.' },
  'цска': { name: 'Марко Николич', formation: '3-4-2-1', favoriteFormation: '3-4-2-1', style: 'Организованный баланс', temperament: 'Прагматичный', quote: 'Порядок бьёт класс, если каждый отдаётся на сто процентов.' },
  'локомотив': { name: 'Михаил Галактионов', formation: '4-2-3-1', favoriteFormation: '4-2-3-1', style: 'Быстрые фланговые атаки', temperament: 'Аналитический', quote: 'Доверяем молодёжи и развиваем скорость в переходных фазах.' },
  'динамо москва': { name: 'Марцел Личка', formation: '4-3-3', favoriteFormation: '4-3-3', style: 'Тотальный атакующий футбол', temperament: 'Открытый', quote: 'Футбол для болельщиков: лучше выиграть 4:3, чем 1:0.' },
  'краснодар': { name: 'Мурад Мусаев', formation: '4-3-3', favoriteFormation: '4-3-3', style: 'Комбинационный стиль', temperament: 'Требовательный', quote: 'Атакующая философия клуба неизменна.' },
  'ростов': { name: 'Валерий Карпин', formation: '4-3-3', favoriteFormation: '4-3-3', style: 'Выход из обороны через пас', temperament: 'Харизматичный', quote: 'Играем смело, не боимся ошибаться под прессингом.' },
  'рубин': { name: 'Рашид Рахимов', formation: '3-5-2', favoriteFormation: '3-5-2', style: 'Плотная оборона и контратаки', temperament: 'Строгий', quote: 'Надёжность сзади — фундамент любых побед.' }
};

export function getTeamCoach(name: string, comp?: string): Coach {
  const nm = String(name || '').toLowerCase();
  for (const [k, c] of Object.entries(DEFAULT_COACHES)) {
    if (nm.includes(k) || k.includes(nm)) {
      return {
        id: `coach_${k}`,
        name: c.name || 'Главный тренер',
        club: name,
        clubName: name,
        comp: comp || 'rpl',
        tactic: c.style || 'Сбалансированная',
        formation: c.formation || '4-3-3',
        favoriteFormation: c.favoriteFormation || '4-3-3',
        temperament: c.temperament || 'Спокойный',
        quote: c.quote || 'Мы выходим побеждать в каждом матче.',
        reputation: 80,
        salary: 12000000
      };
    }
  }
  return {
    id: `coach_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    name: 'Главный тренер',
    club: name,
    clubName: name,
    comp: comp || 'rpl',
    tactic: 'Сбалансированная',
    formation: '4-4-2',
    favoriteFormation: '4-4-2',
    temperament: 'Уравновешенный',
    quote: 'Работаем на тренировках, чтобы радовать фанатов.',
    reputation: 65,
    salary: 5000000
  };
}

export function computeCoachSynergy(coach: any, tactics: any): number {
  if (!coach || !tactics) return 75;
  let score = 70;
  if (coach.formation && tactics.formation && coach.formation === tactics.formation) {
    score += 15;
  }
  if (coach.style && tactics.style && coach.style.toLowerCase().includes(tactics.style.toLowerCase())) {
    score += 15;
  }
  return Math.min(100, Math.max(40, score));
}

const FIRST_NAMES = ['Александр', 'Сергей', 'Михаил', 'Дмитрий', 'Андрей', 'Алексей', 'Владимир', 'Игорь', 'Олег', 'Павел'];
const LAST_NAMES = ['Иванов', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев', 'Петров', 'Соколов', 'Михайлов', 'Новиков', 'Федоров'];

function randomName(): string {
  const fn = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const ln = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${fn} ${ln}`;
}

export function generateClubStaff(team: any): StaffMember[] {
  const tid = team.id || team;
  const tName = team.name || 'Клуб';
  const roles: StaffRole[] = ['head', 'assistant', 'gk', 'fitness', 'doctor'];
  const coach = getTeamCoach(tName, team.comp);

  return roles.map((role) => {
    const isHead = role === 'head';
    return {
      id: `staff_${tid}_${role}`,
      teamId: tid,
      teamName: tName,
      name: isHead ? coach.name : randomName(),
      role,
      roleTitle: STAFF_ROLES[role]?.title || role,
      specialty: STAFF_ROLES[role]?.desc || '',
      rating: Math.floor(65 + Math.random() * 25),
      salary: isHead ? 8000000 : 2500000,
      reputation: isHead ? 'Высокая' : 'Стабильная',
      age: Math.floor(35 + Math.random() * 25),
      nationality: 'Россия',
      brief: STAFF_ROLES[role]?.desc || '',
      pending: false
    };
  });
}

export function getAllInitialStaff(teams: any[]): StaffMember[] {
  const staff: StaffMember[] = [];
  for (const t of teams || []) {
    staff.push(...generateClubStaff(t));
  }
  return staff;
}
