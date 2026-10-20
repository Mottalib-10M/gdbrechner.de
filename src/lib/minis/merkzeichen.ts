/** Ein Merkzeichen → die Nachteilsausgleiche, die es auslöst. */
import type { MiniSpec } from '../mini-types';
import { rechte, type Merkzeichen } from '../engine/rechte';
import { GDB, mz, mzOpt } from './_kit';
export default (): MiniSpec => ({
  title: 'Was bringt dieses Merkzeichen?',
  cta: 'Mehrere Merkzeichen kombinieren',
  inputs: [
    { id: 'm', label: 'Merkzeichen', def: 1, options: mzOpt },
    { id: 'g', label: 'Grad der Behinderung', def: 70, options: GDB(50) },
  ],
  run: (v) => {
    const m = mz(v.m);
    const r = rechte(v.g, m === '-' ? [] : [m as Merkzeichen]).filter((x) => ['freifahrt', 'kfz', 'begleitung', 'parken', 'rundfunk', 'fahrtkosten'].includes(x.id));
    const ja = r.filter((x) => x.gilt);
    return {
      head: ['Nachteilsausgleiche', `${ja.length} von ${r.length}`],
      rows: ja.length ? ja.map((x) => [x.titel, x.wert]) : [['Mit diesem GdB ohne Merkzeichen', 'keine davon']],
    };
  },
});
