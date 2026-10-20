/**
 * Nachteilsausgleiche nach GdB und Merkzeichen, Stand 2026. Jede Zahl kommt aus params-2026.json.
 * Rechtsgrundlagen: § 33b und § 33 Abs. 2a EStG, SGB IX §§ 2, 151, 152, 168, 173, 208, 228, 229,
 * SGB VI §§ 37 und 236a, KraftStG § 3a, Rundfunkbeitragsstaatsvertrag § 4, VwV-StVO zu § 46.
 */
import { P } from './params';

export type Merkzeichen = 'G' | 'aG' | 'B' | 'H' | 'Bl' | 'TBl' | 'Gl' | 'RF';
export const MERKZEICHEN: Merkzeichen[] = ['G', 'aG', 'B', 'H', 'Bl', 'TBl', 'Gl', 'RF'];
export const MZ_NAME: Record<Merkzeichen, string> = {
  G: 'G (erheblich gehbehindert)', aG: 'aG (außergewöhnlich gehbehindert)', B: 'B (Begleitperson)', H: 'H (hilflos)',
  Bl: 'Bl (blind)', TBl: 'TBl (taubblind)', Gl: 'Gl (gehörlos)', RF: 'RF (Rundfunkbeitrag)',
};

/** Behinderten-Pauschbetrag nach § 33b Abs. 3 EStG: GdB-Stufe oder der erhöhte Betrag für H, Bl, TBl. */
export function pauschbetrag(gdb: number, mz: Merkzeichen[] = []): number {
  const pb = P.pauschbetrag;
  if (mz.some((m) => m === 'H' || m === 'Bl' || m === 'TBl')) return pb.erhoeht;
  let b = 0;
  for (const [g, betrag] of pb.stufen) if (gdb >= g) b = betrag;
  return b;
}

/** Behinderungsbedingte Fahrtkostenpauschale nach § 33 Abs. 2a EStG (0, 900 oder 4 500 €). */
export function fahrtkosten(gdb: number, mz: Merkzeichen[] = []): number {
  const f = P.fahrtkosten;
  if (mz.some((m) => m === 'aG' || m === 'Bl' || m === 'TBl' || m === 'H')) return f.gross;
  if (gdb >= f.gdb_klein || (gdb >= f.gdb_klein_mit_g && mz.includes('G'))) return f.klein;
  return 0;
}

/** Zusatzurlaub nach § 208 SGB IX: fünf Arbeitstage bei der Fünftagewoche, anteilig bei anderer Verteilung. */
export function zusatzurlaub(gdb: number, tageProWoche = 5): number {
  if (gdb < P.schwelle.schwerbehinderung) return 0;
  return Math.round((P.urlaub.tage_bei_5 * tageProWoche) / 5 * 100) / 100;
}

/**
 * Zusatzurlaub im Jahr des Eintritts oder Wegfalls (§ 208 Abs. 2 SGB IX): ein Zwölftel je vollem Monat,
 * Bruchteile von mindestens einem halben Tag werden aufgerundet.
 */
export function zusatzurlaubAnteilig(tage: number, volleMonate: number): number {
  const roh = (tage * Math.min(12, Math.max(0, Math.floor(volleMonate)))) / 12;
  const ganz = Math.floor(roh);
  return roh - ganz >= 0.5 ? ganz + 1 : roh === ganz ? ganz : Math.round(roh * 100) / 100;
}

/** Früheste Altersrente für schwerbehinderte Menschen nach Jahrgang (§ 37, § 236a SGB VI). */
export function rente(jahrgang: number): { ohneJ: number; ohneM: number; fruehJ: number; fruehM: number; abschlagMax: number } | null {
  const R = P.rente;
  if (!Number.isFinite(jahrgang) || jahrgang < R.tabelle[0].jahrgang) return null;
  const z = [...R.tabelle].reverse().find((t) => jahrgang >= t.jahrgang)!;
  const monate = (z.ohne_j - z.frueh_j) * 12 + (z.ohne_m - z.frueh_m);
  return { ohneJ: z.ohne_j, ohneM: z.ohne_m, fruehJ: z.frueh_j, fruehM: z.frueh_m, abschlagMax: Math.round(monate * R.abschlag_je_monat * 1000) / 1000 };
}

export interface Recht { id: string; titel: string; wert: string; text: string; gilt: boolean }

const eur = (x: number) => `${x.toLocaleString('de-DE')} €`;
const eur2 = (x: number) => `${x.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\u00a0€`;
const alter = (j: number, m: number) => (m ? `${j} Jahre und ${m} Monate` : `${j} Jahre`);

/**
 * Die Rechte zu einem GdB und Merkzeichen, in der Reihenfolge des Nutzens. `gilt` = trifft zu; die
 * übrigen Zeilen sagen, ab wann sie gelten würden.
 */
export function rechte(gdb: number, mz: Merkzeichen[] = [], jahrgang?: number): Recht[] {
  const S = P.schwelle;
  const schwer = gdb >= S.schwerbehinderung;
  const pb = pauschbetrag(gdb, mz);
  const fk = fahrtkosten(gdb, mz);
  const r: Recht[] = [];
  r.push({
    id: 'status', titel: 'Status',
    wert: schwer ? 'schwerbehindert' : gdb >= S.gleichstellung ? 'Gleichstellung möglich' : gdb >= S.min_gdb ? 'behindert' : 'kein GdB festgestellt',
    text: schwer
      ? `Ab GdB ${S.schwerbehinderung} gelten Sie als schwerbehindert (§ 2 Abs. 2 SGB IX) und erhalten auf Antrag den Schwerbehindertenausweis.`
      : gdb >= S.gleichstellung
        ? `Bei GdB ${S.gleichstellung} oder 40 kann die Agentur für Arbeit Sie schwerbehinderten Menschen gleichstellen, wenn Sie sonst einen Arbeitsplatz nicht bekommen oder nicht behalten (§ 2 Abs. 3 SGB IX). Einen Ausweis gibt es nicht.`
        : `Unter GdB ${S.schwerbehinderung} gibt es keinen Ausweis; der Bescheid genügt für den Pauschbetrag.`,
    gilt: gdb >= S.min_gdb,
  });
  r.push({
    id: 'pauschbetrag', titel: 'Behinderten-Pauschbetrag', wert: pb ? `${eur(pb)} im Jahr` : '0 €',
    text: pb ? `Steuerfreibetrag nach § 33b EStG, ohne Belege; er senkt das zu versteuernde Einkommen, nicht die Steuer um diesen Betrag.` : `Der Pauschbetrag beginnt bei GdB ${P.pauschbetrag.stufen[0][0]}.`,
    gilt: pb > 0,
  });
  r.push({
    id: 'fahrtkosten', titel: 'Fahrtkostenpauschale', wert: fk ? `${eur(fk)} im Jahr` : '0 €',
    text: fk ? `Nach § 33 Abs. 2a EStG; sie zählt zu den außergewöhnlichen Belastungen, wirkt also erst über der zumutbaren Belastung.` : `Ab GdB ${P.fahrtkosten.gdb_klein} oder ab GdB ${P.fahrtkosten.gdb_klein_mit_g} mit Merkzeichen G; ${eur(P.fahrtkosten.gross)} mit aG, Bl, TBl oder H.`,
    gilt: fk > 0,
  });
  r.push({
    id: 'urlaub', titel: 'Zusatzurlaub', wert: schwer ? `${P.urlaub.tage_bei_5} Arbeitstage` : 'nein',
    text: schwer ? `Bezahlter Zusatzurlaub nach § 208 SGB IX, bei der Fünftagewoche; Gleichgestellte haben keinen Anspruch.` : `Erst ab GdB ${S.schwerbehinderung}, auch nicht bei Gleichstellung.`,
    gilt: schwer,
  });
  r.push({
    id: 'kuendigung', titel: 'Besonderer Kündigungsschutz', wert: schwer ? 'ja' : gdb >= S.gleichstellung ? 'nur mit Gleichstellung' : 'nein',
    text: `Eine Kündigung durch den Arbeitgeber braucht die vorherige Zustimmung des Integrationsamts (§ 168 SGB IX), wenn das Arbeitsverhältnis ohne Unterbrechung länger als ${P.kuendigung.wartezeit_monate} Monate besteht (§ 173 Abs. 1 SGB IX).`,
    gilt: schwer,
  });
  const re = jahrgang ? rente(jahrgang) : null;
  r.push({
    id: 'rente', titel: 'Altersrente für schwerbehinderte Menschen',
    wert: schwer && re ? `ab ${alter(re.ohneJ, re.ohneM)}` : schwer ? 'ja' : 'nein',
    text: schwer
      ? re
        ? `Ohne Abschlag ab ${alter(re.ohneJ, re.ohneM)}, frühestens ab ${alter(re.fruehJ, re.fruehM)} mit bis zu ${(re.abschlagMax * 100).toLocaleString('de-DE', { maximumFractionDigits: 1 })} % Abschlag, wenn ${P.rente.wartezeit_jahre} Versicherungsjahre erfüllt sind und der GdB bei Rentenbeginn mindestens ${S.schwerbehinderung} beträgt (§ 37, § 236a SGB VI).`
        : `Wenn ${P.rente.wartezeit_jahre} Versicherungsjahre erfüllt sind und der GdB bei Rentenbeginn mindestens ${S.schwerbehinderung} beträgt (§ 37 SGB VI). Ihr Jahrgang bestimmt das Alter.`
      : `Erst ab GdB ${S.schwerbehinderung} bei Rentenbeginn; Gleichstellung genügt nicht.`,
    gilt: schwer,
  });
  const frei = mz.some((m) => ['G', 'aG', 'H', 'Bl', 'TBl', 'Gl'].includes(m));
  const kostenlos = mz.some((m) => m === 'H' || m === 'Bl' || m === 'TBl');
  r.push({
    id: 'freifahrt', titel: 'Freifahrt im Nahverkehr',
    wert: !frei ? 'nein' : kostenlos ? 'Wertmarke kostenlos' : `Wertmarke ${eur(P.wertmarke.jahr)} im Jahr`,
    text: frei
      ? `Unentgeltliche Beförderung in Bussen und Bahnen des Nahverkehrs mit Beiblatt und Wertmarke (§ 228 SGB IX); die Wertmarke kostet ${eur(P.wertmarke.jahr)} für ein Jahr oder ${eur(P.wertmarke.halbjahr)} für ein halbes Jahr, mit H oder Bl und bei bestimmten Sozialleistungen nichts.`
      : 'Nur mit Merkzeichen G, aG, H, Bl, TBl oder Gl.',
    gilt: frei,
  });
  const kfzFrei = mz.some((m) => m === 'H' || m === 'Bl' || m === 'aG');
  const kfzHalb = !kfzFrei && mz.some((m) => m === 'G' || m === 'Gl');
  r.push({
    id: 'kfz', titel: 'Kraftfahrzeugsteuer',
    wert: kfzFrei ? 'befreit' : kfzHalb ? '50 % weniger' : 'nein',
    text: kfzFrei
      ? 'Befreiung für ein auf Sie zugelassenes Fahrzeug (§ 3a Abs. 1 KraftStG); zusätzlich zur Freifahrt.'
      : kfzHalb
        ? 'Halbe Kraftfahrzeugsteuer (§ 3a Abs. 2 KraftStG), aber nur, wenn Sie auf die Freifahrt verzichten: entweder Wertmarke oder Steuerermäßigung.'
        : 'Nur mit Merkzeichen H, Bl oder aG (Befreiung) oder G, Gl (Ermäßigung).',
    gilt: kfzFrei || kfzHalb,
  });
  r.push({
    id: 'begleitung', titel: 'Begleitperson fährt umsonst', wert: mz.includes('B') ? 'ja' : 'nein',
    text: mz.includes('B') ? 'Mit Merkzeichen B fährt eine Begleitperson im Nah- und Fernverkehr der Bahn unentgeltlich mit (§ 228 Abs. 6 SGB IX).' : 'Nur mit Merkzeichen B.',
    gilt: mz.includes('B'),
  });
  const parken = mz.some((m) => m === 'aG' || m === 'Bl' || m === 'TBl');
  r.push({
    id: 'parken', titel: 'EU-Parkausweis', wert: parken ? 'ja' : 'nein',
    text: parken ? 'Parken auf Behindertenparkplätzen mit Rollstuhlsymbol und weitere Parkerleichterungen, mit dem EU-einheitlichen Parkausweis; Antrag bei der Straßenverkehrsbehörde.' : 'Nur mit aG oder Bl (auch bei Taubblindheit). Für einige weitere Gruppen, etwa Morbus Crohn ab GdB 60, gibt es einen besonderen Parkausweis ohne Behindertenparkplätze.',
    gilt: parken,
  });
  r.push({
    id: 'rundfunk', titel: 'Rundfunkbeitrag',
    wert: mz.includes('TBl') ? 'befreit' : mz.includes('RF') ? `${eur2(P.rundfunk.ermaessigt)} im Monat` : 'nein',
    text: mz.includes('TBl')
      ? 'Taubblinde Menschen sind auf Antrag befreit.'
      : mz.includes('RF')
        ? `Mit Merkzeichen RF zahlen Sie auf Antrag ein Drittel des Beitrags: ${eur2(P.rundfunk.ermaessigt)} statt ${eur2(P.rundfunk.voll)} im Monat.`
        : 'Nur mit Merkzeichen RF (Ermäßigung) oder TBl (Befreiung).',
    gilt: mz.includes('RF') || mz.includes('TBl'),
  });
  return r;
}
