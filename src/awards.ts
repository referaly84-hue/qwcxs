// @ts-nocheck
/**
 * Match ratings, Man of the Match (MOTM), Team of the Round and Month
 */

export function computeMatchRatings(match: any, fixture: any, homeName: string, awayName: string): any[] {
  const ratings: any[] = [];
  const events = match?.events || [];
  const homeLineup = match?.lineup?.home || fixture?.lineup?.home || [];
  const awayLineup = match?.lineup?.away || fixture?.lineup?.away || [];

  const addPlayers = (list: any[], tName: string, tid: string) => {
    for (const p of list) {
      if (!p) continue;
      let base = 6.0 + (Math.random() * 1.5);
      const pid = p.id || p.playerId;
      // boost if scored
      const goals = events.filter((e: any) => e.type === 'goal' && (e.player === p.name || e.playerId === pid)).length;
      base += goals * 1.2;
      ratings.push({
        playerId: pid,
        name: p.name,
        pos: p.pos || 'НАП',
        team: tName,
        teamId: tid,
        rating: Math.min(10.0, Math.max(5.0, +base.toFixed(1))),
        goals,
        assists: 0
      });
    }
  };

  addPlayers(homeLineup, homeName, fixture?.home);
  addPlayers(awayLineup, awayName, fixture?.away);
  return ratings;
}

export function getMatchMotm(match: any, fixture: any, homeName: string, awayName: string, coachHome?: any, coachAway?: any): any {
  const ratings = match?.ratings || computeMatchRatings(match, fixture, homeName, awayName);
  if (!ratings.length) {
    return {
      playerId: 'motm_1',
      name: 'Лучший игрок матча',
      pos: 'НАП',
      rating: 8.5,
      team: homeName,
      teamName: homeName,
      headline: `Яркая игра в атаке решила исход противостояния!`,
      interview: {
        headline: `«Главное — победа команды и радость наших болельщиков»`,
        quote: `Мы выполнили установку наставника, сыграли дисциплинированно и довели дело до победы!`,
        tacticsComment: `Тренер просил действовать широко и прессинговать с первых минут.`,
        mood: 'happy'
      }
    };
  }

  // pick highest rating
  const best = [...ratings].sort((a, b) => b.rating - a.rating)[0];
  return {
    ...best,
    teamName: best.team,
    headline: `«${best.name}: игра была напряжённой до последних минут»`,
    interview: {
      headline: `«${best.name}: игра была напряжённой до последних минут»`,
      quote: `Мы готовились к трудному матчу, соперник оказал серьезное сопротивление. Рады победе и поддержке трибун!`,
      tacticsComment: `Установка тренера была ясна: надёжность сзади и острота впереди.`,
      mood: 'satisfied'
    }
  };
}

export function buildTeamOfRound(round: number | string, comp: string, fixtures: any[], matchesMap: any, teamsMap: any): any {
  return {
    round,
    comp,
    formation: '4-3-3',
    coach: 'Лучший тренер тура',
    bestPlayer: { name: 'Звезда тура', team: 'РПЛ', rating: 8.8 },
    players: []
  };
}

export function buildTeamOfMonth(month: string, comp: string, fixtures: any[], matchesMap: any, teamsMap: any): any {
  return {
    month,
    comp,
    formation: '4-3-3',
    coach: 'Тренер месяца',
    bestPlayer: { name: 'Игрок месяца', team: 'РПЛ', rating: 8.9 },
    players: []
  };
}
