/** Zusatzurlaub nach § 208 SGB IX bei anderer Wochenarbeitszeit und im ersten Jahr. */
import type { MiniSpec } from '../mini-types';
import { zusatzurlaub, zusatzurlaubAnteilig } from '../engine/rechte';
import { num } from './_kit';
export default (): MiniSpec => ({
  title: 'Wie viele Tage Zusatzurlaub?',
  cta: 'Zusatzurlaub genau rechnen',
  inputs: [
    { id: 't', label: 'Arbeitstage je Woche', def: 5, max: 7, plain: true },
    { id: 'm', label: 'Volle Monate schwerbehindert in diesem Jahr', def: 12, max: 12, plain: true },
  ],
  run: (v) => {
    const j = zusatzurlaub(50, Math.min(7, Math.max(0, v.t)));
    const a = zusatzurlaubAnteilig(j, v.m);
    return {
      head: ['Zusatzurlaub in diesem Jahr', `${num(a, Number.isInteger(a) ? 0 : 1)} Tage`],
      rows: [['Im vollen Jahr', `${num(j, Number.isInteger(j) ? 0 : 1)} Tage`], ['Anteil', `${Math.min(12, Math.max(0, Math.floor(v.m)))}/12`]],
      note: 'Nur ab GdB 50; Gleichgestellte haben keinen Anspruch.',
    };
  },
});
