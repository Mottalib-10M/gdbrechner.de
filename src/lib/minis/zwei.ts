/** Zwei Einzel-GdB → Gesamt-GdB als Spanne (VersMedV Teil A Nr. 3). */
import type { MiniSpec } from '../mini-types';
import { gesamtGdb } from '../engine/gesamt';
import { GDB, BEZ, bezOpt, spanne } from './_kit';
export default (): MiniSpec => ({
  title: 'Zwei Leiden: welcher Gesamt-GdB?',
  cta: 'Mit allen Leiden und Rechten rechnen',
  inputs: [
    { id: 'a', label: 'Höchster Einzel-GdB', def: 30, options: GDB(10) },
    { id: 'b', label: 'Zweiter Einzel-GdB', def: 30, options: GDB(10) },
    { id: 'z', label: 'Zusammenhang', def: 0, options: bezOpt },
  ],
  run: (v) => {
    const b = BEZ[Math.min(3, Math.max(0, v.z | 0))].b;
    const r = gesamtGdb([{ system: 'a', gdb: v.a }, { system: 'b', gdb: v.b, beziehung: b }]);
    return {
      head: ['Gesamt-GdB, Richtwert', String(r.richt)],
      rows: [['Spanne nach dem Wortlaut', spanne(r)], ['Addiert wäre es', `${Math.min(100, v.a + v.b)}, aber unzulässig`], ['Schwerbehindert ab', 'GdB 50']],
      note: 'Ausgang ist der höchste Einzelwert; Addition und Mittelung sind nach Teil A Nr. 3.2 nicht zulässig.',
    };
  },
});
