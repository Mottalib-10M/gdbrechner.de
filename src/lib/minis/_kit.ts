/** Gemeinsame Helfer der Mini-Rechner (vom Register ignoriert: Präfix „_“). */
import { formatMoney, formatNumber, formatPercent } from '../format';
export type L = 'de';
export const eur = (x: number, d = 0) => formatMoney(x, d, 'de');
export const num = (x: number, d = 0) => formatNumber(x, d, 'de');
export const pct = (x: number, d = 0) => formatPercent(x, d, 'de');
export const janein = [{ value: '0', label: 'Nein' }, { value: '1', label: 'Ja' }];
export const GDB = (von = 20) => [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].filter((g) => g >= von).map((g) => ({ value: String(g), label: `GdB ${g}` }));
/** Merkzeichen als Zahl (Mini-Rechner kennen nur Zahlen). */
export const MZ = ['-', 'G', 'aG', 'B', 'H', 'Bl', 'Gl', 'RF'] as const;
export const mzOpt = MZ.map((m, i) => ({ value: String(i), label: m === '-' ? 'keines' : m }));
export const mz = (i: number) => MZ[Math.min(Math.max(Math.round(i) || 0, 0), MZ.length - 1)];
export const BEZ = [
  { b: 'unabhaengig', label: 'andere Lebensbereiche' },
  { b: 'nachteilig', label: 'verstärken sich' },
  { b: 'teilweise', label: 'überschneiden sich teilweise' },
  { b: 'vollstaendig', label: 'dieselben Folgen' },
] as const;
export const bezOpt = BEZ.map((b, i) => ({ value: String(i), label: b.label }));
export const spanne = (r: { min: number; max: number }) => (r.min === r.max ? `${r.min}` : `${r.min} bis ${r.max}`);
