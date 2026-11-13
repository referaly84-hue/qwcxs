// @ts-nocheck
/**
 * Foreign clubs and international transfer offers
 */

export const FOREIGN_CLUBS: any[] = [
  { id: 'besiktas', name: 'Бешикташ', country: 'Турция', league: 'Суперлига', reputation: 78 },
  { id: 'galatasaray', name: 'Галатасарай', country: 'Турция', league: 'Суперлига', reputation: 82 },
  { id: 'fenerbahce', name: 'Фенербахче', country: 'Турция', league: 'Суперлига', reputation: 81 },
  { id: 'crvena_zvezda', name: 'Црвена Звезда', country: 'Сербия', league: 'Суперлига', reputation: 76 },
  { id: 'partizan', name: 'Партизан', country: 'Сербия', league: 'Суперлига', reputation: 74 },
  { id: 'paok', name: 'ПАОК', country: 'Греция', league: 'Суперлига', reputation: 77 },
  { id: 'olympiacos', name: 'Олимпиакос', country: 'Греция', league: 'Суперлига', reputation: 79 }
];

export async function checkForeignInterestAfterMatch(db: any, match: any, fixture: any): Promise<any[]> {
  return [];
}

export function respondToForeignOffer(
  db: any,
  offerId: string,
  action: 'accept' | 'reject' | 'counter',
  tid?: string,
  comment?: string
): any {
  return { ok: true, status: action };
}

export async function createForeignOfferWithAI(options: {
  player: any;
  club: any;
  performanceReason?: string;
}): Promise<any> {
  const buyer = FOREIGN_CLUBS[Math.floor(Math.random() * FOREIGN_CLUBS.length)];
  const player = options.player;
  const club = options.club;
  const feeNum = (player?.marketValue || 1000000) * (1.1 + Math.random() * 0.4);
  const feeStr = `${(feeNum / 1000000).toFixed(1)} млн €`;

  return {
    id: `fo_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    playerId: player?.id,
    playerName: player?.name,
    clubId: club?.id,
    clubName: club?.name,
    buyerClub: buyer.name,
    buyerCountry: buyer.country,
    fee: feeStr,
    feeNum,
    scoutReport: options.performanceReason || `Высокий класс игры и стабильное лидерство в составе «${club?.name}».`,
    status: 'pending',
    date: new Date().toISOString()
  };
}
