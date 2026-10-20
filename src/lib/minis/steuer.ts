/** Pauschbetrag → Steuerersparnis 2026 (Einzelveranlagung, ohne Kirchensteuer). */
import type { MiniSpec } from '../mini-types';
import { pauschbetrag } from '../engine/rechte';
import { steuerwirkung } from '../engine/steuer';
import { GDB, eur, pct } from './_kit';
export default (): MiniSpec => ({
  title: 'Wie viel Steuer spart der Pauschbetrag?',
  cta: 'Mit Splitting, Kirchensteuer und Fahrtkosten rechnen',
  inputs: [
    { id: 'g', label: 'Grad der Behinderung', def: 50, options: GDB(20) },
    { id: 'z', label: 'Zu versteuerndes Einkommen', def: 40000, unit: '€', max: 2000000 },
  ],
  run: (v) => {
    const pb = pauschbetrag(v.g);
    const r = steuerwirkung({ zve: v.z, splitting: false, kirche: 0, pauschbetrag: pb, fahrtkosten: 0, weitereAgB: 0, kinder: 0 });
    return {
      head: ['Ersparnis im Jahr', eur(r.ersparnis)],
      rows: [['Pauschbetrag', eur(pb)], ['Grenzsteuersatz', pct(r.grenzsteuersatz)], ['Steuer ohne / mit', `${eur(r.ohne)} / ${eur(r.mit)}`]],
      note: 'Tarif 2026 mit Solidaritätszuschlag, Einzelveranlagung, ohne Kirchensteuer.',
    };
  },
});
