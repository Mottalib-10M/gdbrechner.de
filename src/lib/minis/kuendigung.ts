/** Greift der besondere Kündigungsschutz? (§ 168, § 173 SGB IX) */
import type { MiniSpec } from '../mini-types';
import { P } from '../engine/params';
import { janein } from './_kit';
export default (): MiniSpec => ({
  title: 'Greift der besondere Kündigungsschutz?',
  cta: 'Gesamt-GdB und alle Rechte',
  inputs: [
    { id: 'g', label: 'Schwerbehindert oder gleichgestellt', def: 1, options: janein },
    { id: 'm', label: 'Monate im Betrieb', def: 12, max: 600, plain: true },
    { id: 'a', label: 'Antrag mindestens drei Wochen vor der Kündigung gestellt', def: 1, options: janein },
  ],
  run: (v) => {
    const warte = v.m > P.kuendigung.wartezeit_monate;
    const ok = !!v.g && warte;
    return {
      head: ['Zustimmung des Integrationsamts nötig', ok ? (v.a ? 'ja' : 'fraglich') : 'nein'],
      rows: [['Länger als 6 Monate beschäftigt', warte ? 'ja' : 'nein'], ['Kündigungsfrist mindestens', `${P.kuendigung.frist_wochen_min} Wochen`]],
      note: 'Ist die Schwerbehinderung bei Zugang der Kündigung noch nicht festgestellt, greift der Schutz nur, wenn der Antrag rechtzeitig gestellt war (§ 173 Abs. 3 SGB IX).',
    };
  },
});
