/** Pauschbetrag des Kindes auf die Eltern übertragen (§ 33b Abs. 5 EStG): Ersparnis je Elternteil. */
import type { MiniSpec } from '../mini-types';
import { pauschbetrag } from '../engine/rechte';
import { steuerwirkung } from '../engine/steuer';
import { GDB, eur, janein } from './_kit';
export default (): MiniSpec => ({
  title: 'Pauschbetrag des Kindes: was sparen die Eltern?',
  cta: 'Steuerwirkung mit allen Angaben',
  inputs: [
    { id: 'g', label: 'GdB des Kindes', def: 50, options: GDB(20) },
    { id: 'h', label: 'Merkzeichen H oder Bl', def: 0, options: janein },
    { id: 'z', label: 'Zu versteuerndes Einkommen der Eltern', def: 70000, unit: '€', max: 2000000 },
  ],
  run: (v) => {
    const pb = pauschbetrag(v.g, v.h ? ['H'] : []);
    const r = steuerwirkung({ zve: v.z, splitting: true, kirche: 0, pauschbetrag: pb, fahrtkosten: 0, weitereAgB: 0, kinder: 1 });
    return {
      head: ['Ersparnis der Eltern im Jahr', eur(r.ersparnis)],
      rows: [['Übertragener Pauschbetrag', eur(pb)], ['Bei getrennter Veranlagung je Elternteil', eur(pb / 2)]],
      note: 'Zusammenveranlagung, Tarif 2026, ohne Kirchensteuer; Voraussetzung ist die Steuer-ID des Kindes in der Erklärung.',
    };
  },
});
