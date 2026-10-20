/**
 * Zahlenformat für Texte außerhalb von `body(h)`: zitierbarer Absatz, FAQ, Titel. Jede Rechtszahl kommt aus P,
 * jedes Beispielergebnis aus dem Motor; geschrieben wird sie nur über diese Formatierer (RECETTE §4.1, §17.4).
 */
import { formatMoney, formatNumber, formatPercent } from './format';
export { P } from './engine/params';
export const DE = {
  eur: (n: number, d = 0) => formatMoney(n, d, 'de'),
  num: (n: number, d = 0) => formatNumber(n, d, 'de'),
  pct: (x: number, d = 0) => formatPercent(x, d, 'de'),
};
