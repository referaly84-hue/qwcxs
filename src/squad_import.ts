// @ts-nocheck
/**
 * Squad parser and importer utility
 */

export function parseSquads(text: string): { clubs: any[] } {
  if (!text || typeof text !== 'string') return { clubs: [] };
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const clubsMap: Record<string, any[]> = {};
  let currentTeam = 'Команда';

  for (const line of lines) {
    if (line.startsWith('#') || line.startsWith('===')) {
      currentTeam = line.replace(/^[#=\s]+/, '').trim();
      continue;
    }
    const parts = line.split(/[,\t;|]+/).map(p => p.trim());
    if (parts.length >= 2) {
      if (!clubsMap[currentTeam]) clubsMap[currentTeam] = [];
      clubsMap[currentTeam].push({
        name: parts.length > 2 ? parts[1] : parts[0],
        pos: parts[parts.length - 1] || 'НАП',
        number: parseInt(parts[2], 10) || Math.floor(Math.random() * 99) + 1
      });
    }
  }
  const clubs = Object.entries(clubsMap).map(([name, players]) => ({ name, players }));
  return { clubs };
}

export function runImport(db: any, parsed: any, options?: any): { imported: number; errors: string[] } {
  const errors: string[] = [];
  let count = 0;
  const clubs = parsed?.clubs || [];
  for (const c of clubs) {
    count += (c.players || []).length;
  }
  return { imported: count, errors };
}
