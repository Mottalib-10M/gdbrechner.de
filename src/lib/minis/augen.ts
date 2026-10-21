/** Sehschärfe rechts und links → Einzel-GdB nach der MdE-Tabelle der DOG (VersMedV Teil B Nr. 4.3). */
import type { MiniSpec } from '../mini-types';
import { VISUS, sehGdb, blind, hochgradig } from '../engine/augen';
import { pauschbetrag } from '../engine/rechte';
import { eur } from './_kit';
const BRUCH: Record<string, string> = { '0.05': ' (1/20)', '0.02': ' (1/50)' };
const opt = VISUS.map((v, i) => ({ value: String(i), label: v === 0 ? '0 (kein Sehen)' : (v === 1 ? '1,0' : String(v).replace('.', ',')) + (BRUCH[String(v)] ?? '') }));
const at = (i: number) => VISUS[Math.min(VISUS.length - 1, Math.max(0, Math.round(i) || 0))];
export default (): MiniSpec => ({
  title: 'Sehschärfe beider Augen: welcher GdB?',
  cta: 'Mit weiteren Leiden zum Gesamt-GdB',
  inputs: [
    { id: 'r', label: 'Rechtes Auge, mit Brille', def: VISUS.indexOf(0.32), options: opt },
    { id: 'l', label: 'Linkes Auge, mit Brille', def: VISUS.indexOf(0.32), options: opt },
  ],
  run: (v) => {
    const re = at(v.r), li = at(v.l);
    const g = sehGdb(re, li);
    const bl = blind(re, li), hg = hochgradig(re, li);
    const zehner = g % 10 === 0;
    const pb = bl ? eur(pauschbetrag(100, ['Bl'])) : zehner ? eur(pauschbetrag(g)) : `${eur(pauschbetrag(g - 5))} oder ${eur(pauschbetrag(g + 5))}`;
    return {
      head: ['Einzel-GdB Sehen', String(g)],
      rows: [
        ['Schwerbehindert (ab 50)', g >= 50 ? 'ja, wenn allein festgestellt' : 'nein, allein nicht'],
        ['Pauschbetrag im Jahr', g < 20 && !bl ? 'keiner' : pb],
        ['Blind oder hochgradig sehbehindert', bl ? 'blind: Merkzeichen Bl möglich' : hg ? 'hochgradig sehbehindert' : 'nein'],
      ],
      note: zehner ? 'Tabellenwert der DOG; Gesichtsfeld, Linsenverlust und Doppelbilder kommen hinzu.' : 'Zwischenwert der DOG-Tabelle: festgestellt wird in Zehnergraden, das Amt entscheidet nach Befund.',
    };
  },
});
