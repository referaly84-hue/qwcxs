// @ts-nocheck
/**
 * Club family mappings (e.g. Zenit, Zenit-2, Zenit-M)
 */

export function familyNamesOf(name: string): string[] {
  if (!name) return [];
  const base = name.trim();
  return [
    base,
    `${base}-2`,
    `${base} 2`,
    `${base}-м`,
    `${base}-д`
  ];
}
