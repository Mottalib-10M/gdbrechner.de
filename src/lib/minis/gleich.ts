/** Gleichstellung bei GdB 30 oder 40: was sie bringt und was nicht. */
import type { MiniSpec } from '../mini-types';
import { pauschbetrag } from '../engine/rechte';
import { eur } from './_kit';
export default (): MiniSpec => ({
  title: 'Gleichstellung: was ändert sich?',
  cta: 'Gesamt-GdB prüfen',
  inputs: [{ id: 'g', label: 'Grad der Behinderung', def: 30, options: [{ value: '30', label: 'GdB 30' }, { value: '40', label: 'GdB 40' }] }],
  run: (v) => ({
    head: ['Mit Gleichstellung', 'Kündigungsschutz'],
    rows: [['Pauschbetrag (ohnehin)', eur(pauschbetrag(v.g))], ['Zusatzurlaub', 'nein'], ['Ausweis und Freifahrt', 'nein'], ['Altersrente schwerbehindert', 'nein']],
    note: 'Antrag bei der Agentur für Arbeit; wirksam ab dem Tag des Eingangs (§ 151 Abs. 2 SGB IX).',
  }),
});
