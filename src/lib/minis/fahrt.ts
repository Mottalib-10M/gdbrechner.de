/** Fahrtkostenpauschale nach § 33 Abs. 2a EStG und was davon nach der zumutbaren Belastung bleibt. */
import type { MiniSpec } from '../mini-types';
import { fahrtkosten, type Merkzeichen } from '../engine/rechte';
import { zumutbar } from '../engine/steuer';
import { GDB, eur, mz, mzOpt } from './_kit';
export default (): MiniSpec => ({
  title: 'Fahrtkostenpauschale: wie viel wirkt?',
  cta: 'Steuerwirkung genau rechnen',
  inputs: [
    { id: 'g', label: 'Grad der Behinderung', def: 80, options: GDB(20) },
    { id: 'm', label: 'Merkzeichen', def: 0, options: mzOpt },
    { id: 'e', label: 'Gesamtbetrag der Einkünfte', def: 30000, unit: '€', max: 2000000 },
  ],
  run: (v) => {
    const m = mz(v.m);
    const f = fahrtkosten(v.g, m === '-' ? [] : [m as Merkzeichen]);
    const z = zumutbar(v.e, false, 0);
    return {
      head: ['Pauschale', eur(f)],
      rows: [['Zumutbare Belastung (ledig, ohne Kinder)', eur(z)], ['Davon abziehbar ohne weitere Kosten', eur(Math.max(0, f - z))]],
      note: 'Die Pauschale zählt zu den außergewöhnlichen Belastungen: weitere Krankheitskosten werden mit ihr zusammen um die zumutbare Belastung gekürzt.',
    };
  },
});
