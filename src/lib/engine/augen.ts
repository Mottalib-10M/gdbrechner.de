/**
 * Sehschärfe beider Augen → Einzel-GdB nach der MdE-Tabelle der DOG (VersMedV Teil B Nr. 4.3), dazu die
 * Schwellen für Blindheit (0,02) und hochgradige Sehbehinderung (0,05) aus Teil A Nr. 6. Die Tabelle liefert auch
 * Zwischenwerte (5, 15, 25, 35); festgestellt wird der GdB nach § 152 SGB IX in Zehnergraden.
 */
import DOG from '../../data/dog-tabelle.json';

export const VISUS: number[] = DOG.visus;
const idx = (v: number) => {
  const i = VISUS.findIndex((x) => Math.abs(x - v) < 1e-9);
  if (i < 0) throw new Error(`Sehschärfe ${v} steht nicht in der DOG-Tabelle`);
  return i;
};
/** Tabellenwert für rechtes und linkes Auge (korrigierte Sehschärfe, Werte der Tabelle). */
export function sehGdb(rechts: number, links: number): number {
  return DOG.gdb[idx(links)][idx(rechts)];
}
/** Blind im Sinne von Teil A Nr. 6: Sehschärfe auf keinem Auge mehr als 0,02 (1/50). */
export const blind = (rechts: number, links: number) => Math.max(rechts, links) <= 0.02;
/** Hochgradig sehbehindert: auf keinem Auge mehr als 0,05 (1/20), aber nicht blind. */
export const hochgradig = (rechts: number, links: number) => !blind(rechts, links) && Math.max(rechts, links) <= 0.05;
