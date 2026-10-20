/** Widerspruchsfrist gegen den GdB-Bescheid (§ 84 SGG, Bekanntgabe nach § 37 SGB X). */
import type { MiniSpec } from '../mini-types';
import { janein } from './_kit';
export default (): MiniSpec => ({
  title: 'Wie viel Zeit bleibt für den Widerspruch?',
  cta: 'Gesamt-GdB vor dem Widerspruch prüfen',
  inputs: [
    { id: 't', label: 'Tage seit dem Datum des Bescheids', def: 10, max: 400, plain: true },
    { id: 'b', label: 'Rechtsbehelfsbelehrung fehlt oder ist falsch', def: 0, options: janein },
  ],
  run: (v) => {
    const frist = v.b ? 365 : 34;
    const rest = frist - Math.max(0, Math.round(v.t));
    return {
      head: ['Verbleibend, ungefähr', rest > 0 ? `${rest} Tage` : 'Frist abgelaufen'],
      rows: [['Frist', v.b ? 'ein Jahr (§ 66 Abs. 2 SGG)' : 'ein Monat ab Bekanntgabe'], ['Danach noch möglich', 'Überprüfungsantrag (§ 44 SGB X)']],
      note: 'Vereinfacht: Postversand gilt am vierten Tag nach Absendung als bekannt gegeben, ein Monat ist hier mit 30 Tagen gerechnet. Maßgeblich ist das Kalenderdatum.',
    };
  },
});
