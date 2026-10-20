/** Wertmarke oder Kfz-Steuerermäßigung: was lohnt sich mit G oder Gl? */
import type { MiniSpec } from '../mini-types';
import { P } from '../engine/params';
import { eur } from './_kit';
export default (): MiniSpec => ({
  title: 'Wertmarke oder halbe Kfz-Steuer?',
  cta: 'Alle Merkzeichen vergleichen',
  inputs: [
    { id: 'k', label: 'Kfz-Steuer im Jahr', def: 150, unit: '€', max: 5000 },
    { id: 'f', label: 'Fahrkarten im Nahverkehr je Monat', def: 30, unit: '€', max: 2000 },
  ],
  run: (v) => {
    const wert = v.f * 12 - P.wertmarke.jahr;
    const kfz = v.k / 2;
    return {
      head: [wert >= kfz ? 'Besser: Wertmarke' : 'Besser: halbe Kfz-Steuer', eur(Math.max(wert, kfz))],
      rows: [['Wertmarke spart (nach Kosten)', eur(wert)], ['Steuerermäßigung spart', eur(kfz)], ['Wertmarke kostet', `${eur(P.wertmarke.jahr)} im Jahr`]],
      note: 'Mit G oder Gl gibt es nur eines von beiden (§ 3a Abs. 2 KraftStG). Mit H, Bl oder aG ist das Auto steuerfrei und die Wertmarke trotzdem möglich.',
    };
  },
});
