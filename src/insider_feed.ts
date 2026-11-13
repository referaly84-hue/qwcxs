// @ts-nocheck
/**
 * Telegram insider channels and insider drop generator
 */

export interface InsiderPost {
  id: string;
  channelId: string;
  channelName: string;
  channelHandle: string;
  avatarBg: string;
  avatarIcon: string;
  title: string;
  text?: string;
  content?: string;
  tag?: string;
  tagColor?: string;
  time?: string;
  timeLabel?: string;
  createdAt?: string | number;
  views?: number;
  likes?: number;
  reactions?: Record<string, number>;
  mediaUrl?: string;
  isHot?: boolean;
  [key: string]: any;
}

export const TELEGRAM_CHANNELS: Record<string, { id: string; name: string; handle: string; avatarBg: string; avatarIcon: string; desc: string }> = {
  karp: {
    id: 'karp',
    name: 'Инсайды от Карпа',
    handle: '@karpinside',
    avatarBg: '#ea580c',
    avatarIcon: '💣',
    desc: 'Эксклюзивы, контракты, трансферные бомбы российского футбола'
  },
  nobel: {
    id: 'nobel',
    name: 'Нобель',
    handle: '@nobelarustamyan',
    avatarBg: '#0284c7',
    avatarIcon: '🎙️',
    desc: 'Большие интервью, европейские инсайды и закулисье'
  },
  spartak: {
    id: 'spartak',
    name: 'КБ Телега',
    handle: '@kb_telega',
    avatarBg: '#dc2626',
    avatarIcon: '🔴⚪',
    desc: 'Всё о Спартаке: раздевалка, совет директоров, трансферы'
  },
  rfs: {
    id: 'rfs',
    name: 'Пресс-служба РФС',
    handle: '@rfsru_official',
    avatarBg: '#1e3a8a',
    avatarIcon: '🇷🇺',
    desc: 'Официальные заявления, регламент и решения комитетов РФС'
  },
  mutko: {
    id: 'mutko',
    name: 'Мутко против',
    handle: '@mutkoprotiv',
    avatarBg: '#475569',
    avatarIcon: '⚡',
    desc: 'Расследования, финансовые скандалы и судейские интриги'
  }
};

export function getInitialInsiderPosts(): InsiderPost[] {
  return [
    {
      id: 'insider_init_1',
      channelId: 'karp',
      channelName: TELEGRAM_CHANNELS.karp.name,
      channelHandle: TELEGRAM_CHANNELS.karp.handle,
      avatarBg: TELEGRAM_CHANNELS.karp.avatarBg,
      avatarIcon: TELEGRAM_CHANNELS.karp.avatarIcon,
      title: '🔥 Жара на трансферном рынке перед закрытием окна!',
      text: 'Клубы РПЛ готовят сразу несколько громких переходов. Ведутся переговоры по подписанию латиноамериканских талантов.',
      tag: 'Трансферы',
      tagColor: '#ea580c',
      time: '12:00',
      likes: 142,
      isHot: true
    },
    {
      id: 'insider_init_2',
      channelId: 'rfs',
      channelName: TELEGRAM_CHANNELS.rfs.name,
      channelHandle: TELEGRAM_CHANNELS.rfs.handle,
      avatarBg: TELEGRAM_CHANNELS.rfs.avatarBg,
      avatarIcon: TELEGRAM_CHANNELS.rfs.avatarIcon,
      title: '📋 Разъяснение судейского комитета по последним турам',
      text: 'Все спорные моменты в штрафной площади оперативно направляются на экспертизу ЭСК РФС.',
      tag: 'Судейство',
      tagColor: '#0284c7',
      time: '14:30',
      likes: 89,
      isHot: false
    }
  ];
}

export function generatePostMatchInsider(db: any, fixture: any, match: any): InsiderPost | null {
  return null;
}

export function generateRandomInsiderDrop(db?: any, tag?: string): InsiderPost {
  const ch = TELEGRAM_CHANNELS.karp;
  return {
    id: `insider_${Date.now()}`,
    channelId: ch.id,
    channelName: ch.name,
    channelHandle: ch.handle,
    avatarBg: ch.avatarBg,
    avatarIcon: ch.avatarIcon,
    title: '⚡ Новый инсайд из штаба лидеров РПЛ',
    text: 'Тренерский штаб планирует тактические перестановки на следующий ключевой тур.',
    tag: tag || 'Инсайд',
    tagColor: '#ea580c',
    time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    likes: Math.floor(Math.random() * 50) + 10,
    isHot: Math.random() > 0.5
  };
}

export async function generateAIInsiderPost(...args: any[]): Promise<InsiderPost> {
  const db = args[0];
  return generateRandomInsiderDrop(db);
}

export function generateDrawInsiderPost(db: any, type: string, payload: any): InsiderPost {
  const ch = TELEGRAM_CHANNELS.rfs;
  return {
    id: `insider_draw_${Date.now()}`,
    channelId: ch.id,
    channelName: ch.name,
    channelHandle: ch.handle,
    avatarBg: ch.avatarBg,
    avatarIcon: ch.avatarIcon,
    title: '🎲 Жеребьёвка Кубка: результаты корзин',
    text: 'Определились составы групп и турнирная сетка плей-офф!',
    tag: 'Кубок',
    tagColor: '#1e3a8a',
    time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    likes: 67
  };
}
