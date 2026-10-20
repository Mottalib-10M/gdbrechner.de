/**
 * Steuerwirkung des Behinderten-Pauschbetrags (§ 33b EStG) und der behinderungsbedingten
 * Fahrtkostenpauschale (§ 33 Abs. 2a EStG) im Veranlagungszeitraum 2026.
 * Tarif: § 32a Abs. 1 und 5 EStG; Solidaritätszuschlag: §§ 3 und 4 SolZG 1995; Kirchensteuer: Satz des Landes.
 * Zumutbare Belastung: § 33 Abs. 3 EStG, stufenweise gerechnet (BFH, Urteil vom 19.01.2017, VI R 75/14).
 */
import { P } from './params';

const T = () => P.steuer.tarif;

/** Tarifliche Einkommensteuer nach § 32a Abs. 1 EStG (Grundtarif), zvE auf volle Euro abgerundet, Ergebnis abgerundet. */
export function estGrund(zve: number): number {
  const t = T();
  const x = Math.floor(Math.max(0, zve));
  let s: number;
  if (x <= t.grundfreibetrag) s = 0;
  else if (x <= t.zone2_bis) { const y = (x - t.grundfreibetrag) / 10000; s = (t.z2_a * y + t.z2_b) * y; }
  else if (x <= t.zone3_bis) { const z = (x - t.zone2_bis) / 10000; s = (t.z3_a * z + t.z3_b) * z + t.z3_c; }
  else if (x <= t.zone4_bis) s = t.z4_satz * x - t.z4_abzug;
  else s = t.z5_satz * x - t.z5_abzug;
  return Math.floor(s);
}

/** Splitting (§ 32a Abs. 5): das Zweifache der Steuer auf die Hälfte. */
export const est = (zve: number, splitting: boolean) => (splitting ? 2 * estGrund(Math.floor(Math.max(0, zve)) / 2) : estGrund(zve));

/** Solidaritätszuschlag mit Freigrenze und Milderungszone (§ 3 Abs. 3, § 4 SolZG), ohne Kinderfreibeträge. */
export function soli(estBetrag: number, splitting: boolean): number {
  const s = P.steuer.soli;
  const grenze = splitting ? s.freigrenze_zusammen : s.freigrenze_einzel;
  if (estBetrag <= grenze) return 0;
  return Math.floor(Math.min(estBetrag * s.satz, (estBetrag - grenze) * s.milderung) * 100) / 100;
}

export interface SteuerEingabe {
  /** Zu versteuerndes Einkommen OHNE Pauschbetrag und Fahrtkostenpauschale. */
  zve: number;
  splitting: boolean;
  /** Kirchensteuersatz: 0, 0,08 (Bayern, Baden-Württemberg) oder 0,09. */
  kirche: number;
  /** Behinderten-Pauschbetrag (§ 33b), schon nach GdB und Merkzeichen ermittelt. */
  pauschbetrag: number;
  /** Fahrtkostenpauschale (§ 33 Abs. 2a), 0, 900 oder 4 500 €. */
  fahrtkosten: number;
  /** Weitere außergewöhnliche Belastungen nach § 33 (Krankheitskosten u. a.), die der Nutzer kennt. */
  weitereAgB: number;
  /** Kinder mit Kindergeld oder Freibetrag (für die zumutbare Belastung). */
  kinder: number;
}

/** Zumutbare Belastung nach § 33 Abs. 3 EStG, stufenweise auf den Gesamtbetrag der Einkünfte. */
export function zumutbar(gde: number, splitting: boolean, kinder: number): number {
  const z = P.steuer.zumutbar;
  const saetze = kinder >= 3 ? z.kinder_ab3 : kinder >= 1 ? z.kinder_1_2 : splitting ? z.ohne_kinder_splitting : z.ohne_kinder_grund;
  const g = Math.max(0, gde);
  const s1 = Math.min(g, z.grenze1) * saetze[0];
  const s2 = Math.max(0, Math.min(g, z.grenze2) - z.grenze1) * saetze[1];
  const s3 = Math.max(0, g - z.grenze2) * saetze[2];
  return Math.floor(s1 + s2 + s3);
}

export interface SteuerErgebnis {
  ohne: number; mit: number; ersparnis: number;
  /** Teil der Ersparnis, der auf den Pauschbetrag entfällt. */
  ausPauschbetrag: number;
  /** Abzug nach § 33 (Fahrtkostenpauschale + weitere), der die zumutbare Belastung übersteigt. */
  abzug33: number;
  zumutbar: number;
  grenzsteuersatz: number;
}

function last(zve: number, e: SteuerEingabe) {
  const st = est(zve, e.splitting);
  return st + soli(st, e.splitting) + Math.floor(st * e.kirche * 100) / 100;
}

/**
 * Steuerlast ohne und mit den Abzügen. Vereinfachung (offen gelegt): der Gesamtbetrag der Einkünfte für die
 * zumutbare Belastung wird dem eingegebenen zvE gleichgesetzt; Sonderausgaben und Kinderfreibeträge sind nicht modelliert.
 */
export function steuerwirkung(e: SteuerEingabe): SteuerErgebnis {
  const zve = Math.max(0, e.zve);
  const zum = zumutbar(zve, e.splitting, e.kinder);
  const abzug33 = Math.max(0, e.fahrtkosten + e.weitereAgB - zum);
  const ohneAgB = Math.max(0, e.weitereAgB - zum);
  const ohne = last(zve - ohneAgB, e);
  const mitPb = last(Math.max(0, zve - ohneAgB - e.pauschbetrag), e);
  const mit = last(Math.max(0, zve - abzug33 - e.pauschbetrag), e);
  const hoch = last(zve + 100, e), basis = last(zve, e);
  return {
    ohne: Math.round(ohne), mit: Math.round(mit), ersparnis: Math.round(ohne - mit),
    ausPauschbetrag: Math.round(ohne - mitPb), abzug33, zumutbar: zum,
    grenzsteuersatz: Math.max(0, (hoch - basis) / 100),
  };
}
