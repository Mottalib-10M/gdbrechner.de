/** Altersgrenze der Altersrente für schwerbehinderte Menschen nach Jahrgang (§ 37, § 236a SGB VI). */
import type { MiniSpec } from '../mini-types';
import { rente } from '../engine/rechte';
import { pct } from './_kit';
const alter = (j: number, m: number) => (m ? `${j} J. ${m} M.` : `${j} Jahre`);
export default (): MiniSpec => ({
  title: 'Ab wann Altersrente mit Schwerbehinderung?',
  cta: 'Alle Rechte bei GdB 50 ansehen',
  inputs: [{ id: 'j', label: 'Geburtsjahr', def: 1966, max: 2010, plain: true }],
  run: (v) => {
    const r = rente(Math.round(v.j));
    if (!r) return { head: ['Altersgrenze', 'vor 1952: bereits erreicht'], rows: [], note: 'Die Tabelle beginnt mit dem Jahrgang 1952.' };
    return {
      head: ['Ohne Abschlag ab', alter(r.ohneJ, r.ohneM)],
      rows: [['Frühestens ab', alter(r.fruehJ, r.fruehM)], ['Höchster Abschlag', pct(r.abschlagMax, 1)], ['Versicherungsjahre', '35']],
      note: 'Voraussetzung: GdB 50 bei Rentenbeginn. Jahrgang 1952: Januar bis Mai etwas früher.',
    };
  },
});
