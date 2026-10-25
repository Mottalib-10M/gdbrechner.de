import { route, type Locale } from './routes';
import { PAGES, pageById, GROUPS } from '../lib/guides';
import type { Group } from '../lib/guide-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<string, string> = { home: 'Gesamt-GdB-Rechner', method: 'Methodik', about: 'Über uns', widget: 'Rechner einbinden', contact: 'Kontakt', editorial: 'Redaktionsgrundsätze', privacy: 'Datenschutz', terms: 'Impressum', cookies: 'Cookies' };
const GROUP_LABEL: Record<Group, string> = { rechner: 'Rechner', stufen: 'GdB 20 bis 100', merkzeichen: 'Merkzeichen', ausweis: 'Ausweis und Antrag', arbeit: 'Arbeit und Steuer', tabelle: 'GdB nach Erkrankung' };
export const label = (id: string, _lang: Locale = 'de') => CORE[id] ?? pageById(id)?.de.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
const inGroup = (g: Group, lang: Locale) => PAGES.filter((p) => p.group === g).map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  return GROUPS.filter((g) => g !== 'tabelle').map((g) => ({ label: GROUP_LABEL[g], links: g === 'rechner' ? [link('home', lang), ...inGroup(g, lang)] : inGroup(g, lang) })).filter((c) => c.links.length);
}
export const groupLabel = (g: Group, _lang: Locale = 'de') => GROUP_LABEL[g];
// Methode : liee en bas de page, hors du menu du haut pour qu'il tienne sur une ligne.
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => [
  { label: GROUP_LABEL.rechner, links: [link('home', lang), ...inGroup('rechner', lang)] },
  { label: GROUP_LABEL.stufen, links: inGroup('stufen', lang) },
  { label: GROUP_LABEL.merkzeichen, links: inGroup('merkzeichen', lang) },
  { label: `${GROUP_LABEL.ausweis}, ${GROUP_LABEL.arbeit}`, links: [...inGroup('ausweis', lang), ...inGroup('arbeit', lang)] },
  { label: GROUP_LABEL.tabelle, links: inGroup('tabelle', lang) },
  { label: 'Über die Seite', links: ['method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
].filter((c) => c.links.length);
export const popularLinks = (_lang: Locale): NavLink[] => [];
