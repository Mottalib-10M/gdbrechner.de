/** Merkzeichen RF: Ersparnis beim Rundfunkbeitrag, auch rückwirkend. */
import type { MiniSpec } from '../mini-types';
import { P } from '../engine/params';
import { eur } from './_kit';
export default (): MiniSpec => ({
  title: 'Was spart das Merkzeichen RF?',
  cta: 'Alle Merkzeichen ansehen',
  inputs: [{ id: 'm', label: 'Monate seit Zuerkennung, bis 36', def: 12, max: 36, plain: true }],
  run: (v) => {
    const d = P.rundfunk.voll - P.rundfunk.ermaessigt;
    const m = Math.min(36, Math.max(0, Math.round(v.m)));
    return {
      head: ['Ersparnis im Jahr', eur(d * 12)],
      rows: [['Beitrag statt', `${eur(P.rundfunk.ermaessigt, 2)} statt ${eur(P.rundfunk.voll, 2)}`], ['Rückwirkend höchstens', eur(d * m)]],
      note: 'Ermäßigung auf Antrag, frühestens drei Jahre vor dem Antragsmonat (§ 4 Abs. 4 RBStV).',
    };
  },
});
