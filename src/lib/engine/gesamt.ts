/**
 * Gesamt-GdB nach der Versorgungsmedizin-Verordnung, Anlage Teil A Nummer 3 (Fassung vom 29.09.2025,
 * in Kraft seit 03.10.2025, BGBl. 2025 I Nr. 228).
 *
 * Die Verordnung nennt KEINE Rechenformel: „Berechnungsmethoden wie zum Beispiel Addition oder Mittelung
 * sind nicht zulässig“ (3.2). Dieser Motor rechnet deshalb keinen festen Wert aus, sondern
 *  1. bildet je Funktionssystem einen Wert (3.1: höchster Einzelwert, weitere nach denselben Regeln),
 *  2. geht vom höchsten Funktionssystem aus (3.2),
 *  3. prüft jede weitere Beeinträchtigung nach der Beziehung, die der Nutzer mit den Worten von 3.3.1 bis
 *     3.3.4 wählt, und nach 3.5 (GdB 10 erhöht nicht, GdB 20 meist nicht),
 *  4. gibt eine Spanne (min, max) und einen Richtwert aus. Die Erhöhungen des Richtwerts sind eine
 *     ANNAHME dieser Seite (params.gesamt.annahme), offengelegt auf der Methodik-Seite.
 */
import { P } from './params';

/** Beziehung einer weiteren Beeinträchtigung zur höchsten, mit den Begriffen aus Teil A 3.3. */
export type Beziehung = 'nachteilig' | 'unabhaengig' | 'teilweise' | 'vollstaendig';
export const BEZIEHUNGEN: Beziehung[] = ['unabhaengig', 'nachteilig', 'teilweise', 'vollstaendig'];

export interface Beeintraechtigung {
  /** Funktionssystem aus Teil B (z. B. „wirbelsaeule“, „psyche“); gleiche Systeme werden zuerst zusammengefasst. */
  system: string;
  /** Einzel-GdB in Zehnerstufen 0 bis 100. */
  gdb: number;
  /** Beziehung zur stärksten Beeinträchtigung (nur für die weiteren von Bedeutung). */
  beziehung?: Beziehung;
}

export interface Schritt { regel: string; text: string; min: number; richt: number; max: number }
export interface GesamtErgebnis {
  min: number;
  richt: number;
  max: number;
  /** Höchster Einzelwert (Ausgangswert nach 3.2). */
  ausgang: number;
  /** Werte je Funktionssystem nach 3.1, absteigend. */
  systeme: Array<{ system: string; gdb: number; teile: number }>;
  schritte: Schritt[];
}

/** Auf Zehnerstufen 0 bis 100 bringen (SGB IX § 152 Abs. 1: „nach Zehnergraden abgestuft“). */
export const stufe = (x: number) => Math.min(100, Math.max(0, Math.round((Number.isFinite(x) ? x : 0) / 10) * 10));

type Zuschlag = { min: number; richt: number; max: number; regel: string };

/**
 * Erhöhung durch eine weitere Beeinträchtigung mit dem Einzelwert `g` und der Beziehung `b`.
 * Regeln: 3.5 (10 und 20), 3.3.1 bis 3.3.4 (Beziehung). Größen: params.gesamt.annahme.
 */
export function zuschlag(g: number, b: Beziehung): Zuschlag {
  const A = P.gesamt.annahme;
  if (g <= 0) return { min: 0, richt: 0, max: 0, regel: '3.1' };
  if (g <= 10) return { min: 0, richt: 0, max: A.max_bei_10, regel: '3.5' };
  if (g <= 20) {
    if (b === 'vollstaendig') return { min: 0, richt: 0, max: 0, regel: '3.3.4' };
    return { min: 0, richt: b === 'nachteilig' ? A.schritt : 0, max: A.schritt, regel: '3.5' };
  }
  const gross = g >= A.grosse_ab;
  switch (b) {
    case 'vollstaendig': return { min: 0, richt: 0, max: 0, regel: '3.3.4' };
    case 'teilweise': return { min: 0, richt: gross ? A.schritt : 0, max: A.schritt, regel: '3.3.3' };
    case 'unabhaengig': return { min: 0, richt: A.schritt, max: gross ? 2 * A.schritt : A.schritt, regel: '3.3.2' };
    case 'nachteilig': return { min: A.schritt, richt: gross ? 2 * A.schritt : A.schritt, max: gross ? 3 * A.schritt : 2 * A.schritt, regel: '3.3.1' };
  }
}

/** Mehrere Beeinträchtigungen in EINEM Funktionssystem (3.1): wie beim Gesamt-GdB, Richtwert. */
function system(teile: Beeintraechtigung[]) {
  const s = [...teile].map((t) => ({ ...t, gdb: stufe(t.gdb) })).sort((a, b) => b.gdb - a.gdb);
  let min = s[0].gdb, richt = s[0].gdb, max = s[0].gdb;
  for (const t of s.slice(1)) {
    const z = zuschlag(t.gdb, t.beziehung ?? 'teilweise');
    min += z.min; richt += z.richt; max += z.max;
  }
  return { min: Math.min(100, min), richt: Math.min(100, richt), max: Math.min(100, max) };
}

export function gesamtGdb(liste: Beeintraechtigung[]): GesamtErgebnis {
  const gueltig = liste.filter((x) => stufe(x.gdb) > 0);
  if (!gueltig.length) return { min: 0, richt: 0, max: 0, ausgang: 0, systeme: [], schritte: [] };
  // 3.1: zuerst je Funktionssystem.
  const gruppen = new Map<string, Beeintraechtigung[]>();
  for (const x of gueltig) gruppen.set(x.system, [...(gruppen.get(x.system) ?? []), x]);
  const sys = [...gruppen.entries()].map(([name, teile]) => {
    const w = system(teile);
    // Beziehung des Systems zur stärksten: die der stärksten Beeinträchtigung in diesem System.
    const top = [...teile].sort((a, b) => stufe(b.gdb) - stufe(a.gdb))[0];
    return { system: name, gdb: w.richt, min: w.min, max: w.max, teile: teile.length, beziehung: top.beziehung ?? 'unabhaengig' as Beziehung };
  }).sort((a, b) => b.gdb - a.gdb);

  const schritte: Schritt[] = [];
  const erst = sys[0];
  let min = erst.min, richt = erst.gdb, max = erst.max;
  schritte.push({ regel: '3.2', text: erst.system, min, richt, max });
  for (const s of sys.slice(1)) {
    const z = zuschlag(s.gdb, s.beziehung);
    min = Math.min(100, min + z.min); richt = Math.min(100, richt + z.richt); max = Math.min(100, max + z.max);
    schritte.push({ regel: z.regel, text: s.system, min, richt, max });
  }
  return {
    min, richt, max, ausgang: erst.gdb,
    systeme: sys.map((s) => ({ system: s.system, gdb: s.gdb, teile: s.teile })),
    schritte,
  };
}

/** Schwelle, ab der eine Behinderung „schwer“ ist (SGB IX § 2 Abs. 2). */
export const istSchwer = (gdb: number) => gdb >= P.schwelle.schwerbehinderung;
/** Gleichstellung möglich (SGB IX § 2 Abs. 3): GdB 30 oder 40. */
export const gleichstellungMoeglich = (gdb: number) => gdb >= P.schwelle.gleichstellung && gdb < P.schwelle.schwerbehinderung;
