/**
 * Auswahl aus den Versorgungsmedizinischen Grundsätzen, Teil B (VersMedV, Anlage), Wortlaut gekürzt.
 * Daten: src/data/tabelle.json, geprüft gegen gesetze-im-internet.de (Stand siehe `stand`).
 */
import data from '../../data/tabelle.json';

export interface Stufe { text: string; von: number; bis: number }
export interface Eintrag { id: string; system: string; nr: string; name: string; suche?: string[]; stufen: Stufe[]; hinweis?: string; heilungsbewaehrung?: boolean }
export const EINTRAEGE: Eintrag[] = (data as { eintraege: Eintrag[] }).eintraege;
export const eintrag = (id: string) => EINTRAEGE.find((e) => e.id === id);
export const imSystem = (system: string) => EINTRAEGE.filter((e) => e.system === system);
