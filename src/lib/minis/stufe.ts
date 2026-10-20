/** Ein GdB → die wichtigsten Rechte. */
import type { MiniSpec } from '../mini-types';
import { rechte } from '../engine/rechte';
import { GDB } from './_kit';
export default (): MiniSpec => ({
  title: 'Was bringt dieser GdB?',
  cta: 'Alle Rechte mit Merkzeichen ansehen',
  inputs: [{ id: 'g', label: 'Grad der Behinderung', def: 50, options: GDB(20) }],
  run: (v) => {
    const r = rechte(v.g, []);
    const w = (id: string) => r.find((x) => x.id === id)!.wert;
    return {
      head: ['Status', w('status')],
      rows: [['Pauschbetrag', w('pauschbetrag')], ['Fahrtkostenpauschale', w('fahrtkosten')], ['Zusatzurlaub', w('urlaub')], ['Kündigungsschutz', w('kuendigung')]],
      note: 'Ohne Merkzeichen. Freifahrt, Kfz-Steuer und Parkausweis hängen an Merkzeichen.',
    };
  },
});
