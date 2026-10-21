/** Startseite (Säule): Gesamt-GdB nach VersMedV Teil A Nr. 3 und die Rechte je GdB. Rechtswerte über P, Beispiele aus dem Motor. */
import type { FAQ, Helpers } from '../lib/guide-types';
import { gesamtGdb } from '../lib/engine/gesamt';
import { pauschbetrag } from '../lib/engine/rechte';
import { P } from '../lib/engine/params';

interface HomeText { title: string; description: string; h1: string; intro: string; resume: (h: Helpers) => string; faqs: (h: Helpers) => FAQ[]; body: (h: Helpers) => string }

const S = P.schwelle;
const zweiMal30 = gesamtGdb([{ system: 'wirbelsaeule', gdb: 30 }, { system: 'psyche', gdb: 30, beziehung: 'unabhaengig' }]);
const mit20 = gesamtGdb([{ system: 'beine', gdb: 50 }, { system: 'stoffwechsel', gdb: 20, beziehung: 'unabhaengig' }]);
const nachteilig = gesamtGdb([{ system: 'lunge', gdb: 40 }, { system: 'herz', gdb: 30, beziehung: 'nachteilig' }]);
const gleich = gesamtGdb([{ system: 'wirbelsaeule', gdb: 40 }, { system: 'beine', gdb: 30, beziehung: 'vollstaendig' }]);
const sp = (r: { min: number; max: number }) => (r.min === r.max ? `${r.min}` : `${r.min} bis ${r.max}`);

export const HOME: Record<'de', HomeText> = {
  de: {
    title: 'GdB-Rechner 2026: Gesamt-GdB nach neuer VersMedV schätzen',
    description: `GdB-Rechner 2026: Gesamt-GdB aus mehreren Leiden nach VersMedV Teil A Nr. 3, Fassung seit 03.10.2025, als Spanne mit Rechenweg, mit Pauschbetrag und Rechten.`,
    h1: 'GdB-Rechner: Gesamt-Grad der Behinderung bei mehreren Erkrankungen',
    intro: 'Einzelwerte eintragen, Zusammenhang wählen: Sie sehen den Gesamt-GdB als Spanne mit Richtwert, jeden Schritt nach der Verordnung und was dieser GdB Ihnen bringt.',
    resume: (h) => `Der Gesamt-GdB entsteht nicht durch Addieren. Die Versorgungsmedizin-Verordnung schreibt in Teil A Nummer 3, in der Fassung seit dem ${h.date(P.versmedv.in_kraft)}, vor: Ausgangspunkt ist der höchste Einzel-GdB, und jede weitere Beeinträchtigung erhöht ihn nur, wenn sie das Ausmaß der Gesamtbeeinträchtigung wesentlich verstärkt, also um mindestens 10. „Addition oder Mittelung sind nicht zulässig“, steht dort wörtlich. Zwei Leiden mit je GdB 30 ergeben deshalb nicht 60, sondern meist ${zweiMal30.richt}, und ein zusätzlicher GdB von 10 erhöht in der Regel gar nicht. Ein GdB von 20 erhöht vielfach nicht, muss aber geprüft werden. Wie stark eine weitere Beeinträchtigung zählt, hängt davon ab, ob sie andere Lebensbereiche betrifft, die stärkste verstärkt oder sich mit ihr überschneidet. Die Verordnung nennt dafür keine Zahl. Der Rechner zeigt deshalb eine Spanne und einen Richtwert, legt jeden Schritt offen und nennt die Rechte des Ergebnisses: ab GdB ${S.min_gdb} den Pauschbetrag von ${h.eur(pauschbetrag(S.min_gdb))}, ab GdB ${S.gleichstellung} die mögliche Gleichstellung, ab GdB ${S.schwerbehinderung} Ausweis, Zusatzurlaub, Kündigungsschutz und Altersrente. Fest stellt den GdB allein die Behörde Ihres Landes.`,
    faqs: (h) => [
      { q: 'Werden die Einzel-GdB zusammengezählt?', a: `Nein. Die Versorgungsmedizin-Verordnung verbietet in Teil A Nummer 3.2 ausdrücklich „Addition oder Mittelung“. Die Behörde geht vom höchsten Einzel-GdB aus und prüft für jede weitere Beeinträchtigung, ob sie die Gesamtbeeinträchtigung um mindestens 10 verstärkt. Bei einem GdB von 30 für den Rücken und 30 für eine Depression liegt das Ergebnis deshalb meist bei ${zweiMal30.richt}, nicht bei 60.` },
      { q: 'Was hat sich am 3. Oktober 2025 beim Gesamt-GdB geändert?', a: `Die Sechste Verordnung zur Änderung der Versorgungsmedizin-Verordnung hat Teil A neu gefasst. Neu ist, dass die Teilhabebeeinträchtigung zuerst je Funktionssystem bestimmt wird und die vier Arten von Zusammenhängen ausdrücklich benannt sind. Die Grundregel blieb: höchster Einzelwert, keine Addition, GdB 10 erhöht in der Regel nicht. Die früheren Rechenbeispiele mit 10 oder 20 Punkten Zuschlag stehen nicht mehr im Text.` },
      { q: 'Erhöht ein GdB von 20 den Gesamt-GdB?', a: `Vielfach nicht. Teil A Nummer 3.5 sagt, dass auch bei leichten Beeinträchtigungen mit einem GdB von 20 vielfach nicht auf eine wesentliche Zunahme geschlossen werden kann, verlangt aber, das in jedem Fall zu prüfen. Im Beispiel eines Hüftleidens mit GdB 50 und eines Diabetes mit GdB 20 liegt die Spanne bei ${sp(mit20)}. Der Rechner nimmt als Richtwert keine Erhöhung an, außer die beiden Leiden verstärken sich.` },
      { q: 'Wie genau ist das Ergebnis des Rechners?', a: `Der Rechner bildet die Regeln der Verordnung ab, nicht die ärztliche Bewertung Ihrer Befunde. Die Spanne zeigt, was nach dem Wortlaut möglich ist; der Richtwert ist eine Annahme dieser Seite, die auf der Methodikseite steht. Ob ein Leiden 30 oder 40 wert ist und wie die Leiden zusammenwirken, beurteilt der ärztliche Dienst des Versorgungsamts nach Aktenlage oder Untersuchung.` },
      { q: `Ab welchem GdB gilt man als schwerbehindert?`, a: `Ab einem GdB von ${S.schwerbehinderung}, so bestimmt es § 2 Absatz 2 SGB IX. Dann gibt es auf Antrag den Schwerbehindertenausweis, ${P.urlaub.tage_bei_5} Tage Zusatzurlaub bei der Fünftagewoche, besonderen Kündigungsschutz und die Altersrente für schwerbehinderte Menschen. Bei GdB ${S.gleichstellung} oder 40 kann die Agentur für Arbeit gleichstellen; das schützt den Arbeitsplatz, gibt aber weder Ausweis noch Zusatzurlaub.` },
      { q: 'Was bringt ein GdB unter 50?', a: `Ab GdB ${S.min_gdb} steht Ihnen der Behinderten-Pauschbetrag zu, bei GdB ${S.min_gdb} ${h.eur(pauschbetrag(20))} und bei GdB 40 ${h.eur(pauschbetrag(40))} im Jahr, ohne Belege. Bei GdB 30 und 40 ist die Gleichstellung möglich, wenn der Arbeitsplatz gefährdet ist. Einen Ausweis, Zusatzurlaub oder die Freifahrt gibt es unter GdB ${S.schwerbehinderung} nicht.` },
    ],
    body: (h) => `
<h2>Die Regel im Wortlaut</h2>
<p>Teil A Nummer 3 der Versorgungsmedizinischen Grundsätze ist seit dem ${h.date(P.versmedv.in_kraft)} neu gefasst (${h.src('bgbl2025', 'Sechste Änderungsverordnung, BGBl. 2025 I Nr. 228')}). Die Behörde bestimmt zuerst einen Wert für jedes Funktionssystem; mehrere Leiden im selben System werden dort schon nach denselben Regeln zusammengefasst (Nummer 3.1). Dann gilt Nummer 3.2: „Dabei ist von der Teilhabebeeinträchtigung auszugehen, die den höchsten Einzel-GdB bedingt.“ Jede weitere Beeinträchtigung zählt nur, wenn sie „eine Erhöhung des Gesamt-GdB um mindestens 10 bewirkt. Berechnungsmethoden wie zum Beispiel Addition oder Mittelung sind nicht zulässig.“</p>
<p>Wie viel eine weitere Beeinträchtigung bringt, hängt nach Nummer 3.3 von ihrer Beziehung zur stärksten ab. Die Verordnung unterscheidet vier Fälle, und der Rechner fragt genau nach ihnen:</p>
${h.table(['Zusammenhang', 'Wortlaut der Verordnung', 'Beispiel des Rechners'], [
  ['Verstärkt die stärkste (3.3.1)', 'wirkt sich „in der Regel“ erhöhend aus', `Lunge 40, Herz 30: ${sp(nachteilig)}`],
  ['Betrifft andere Bereiche (3.3.2)', 'führt „häufig“ zu einer Erhöhung', `Rücken 30, Psyche 30: ${sp(zweiMal30)}`],
  ['Überschneidet sich teilweise (3.3.3)', '„kann“ erhöhen', 'kleiner Zuschlag oder keiner'],
  ['Hat dieselben Folgen (3.3.4)', 'führt „in der Regel“ zu keiner Erhöhung', `Rücken 40, Beine 30: ${sp(gleich)}`],
], 'Die vier Zusammenhänge nach Teil A Nummer 3.3, Spannen nach diesem Rechner')}
<p>Nummer 3.4 verlangt, die Werte aus Teil B „als Vergleich heranzuziehen“: Ein Gesamt-GdB von 50 sollte so schwer wiegen wie ein Leiden, das Teil B allein mit 50 bewertet, etwa der Verlust eines Beines im Unterschenkel bei guter Funktion des Stumpfes. Nummer 3.5 schließlich: Ein Einzel-GdB von 10 führt „in der Regel nicht zu einer Zunahme“, ein GdB von 20 „vielfach“ nicht, das ist aber in jedem Fall zu prüfen.</p>
<!--mini:zwei-->
<h2>Was der Rechner annimmt</h2>
<p>Die Verordnung nennt keine Punktzahl je Zusammenhang. Bis Oktober 2025 standen in Teil A Beispiele, nach denen zum ersten Wert 10 oder 20 oder mehr hinzukommen konnten; diese Sätze sind gestrichen. Der Rechner setzt deshalb Spannen: Bei unabhängigen Leiden mit 30 oder 40 erhöht er um 0 bis 10, ab einem weiteren Einzelwert von 50 um bis zu 20, bei einander verstärkenden Leiden um 10 bis 20 und bei schweren bis 30. Der Richtwert liegt innerhalb dieser Spanne. Diese Größen sind eine Annahme dieser Seite, auf der ${h.a('method', 'Methodikseite')} offengelegt; die Behörde hat einen Beurteilungsspielraum und muss eine Abweichung von den Anhaltswerten begründen (Teil A Nummer 1).</p>
<h2>Was jeder GdB bringt</h2>
${h.table(['GdB', 'Status', 'Pauschbetrag', 'Fahrtkosten', 'Zusatzurlaub'], [20, 30, 40, 50, 60, 70, 80, 90, 100].map((g) => [
  g >= 50 ? h.a(`gdb-${g}`, String(g)) : h.a(`gdb-${g}`, String(g)),
  g >= S.schwerbehinderung ? 'schwerbehindert' : g >= S.gleichstellung ? 'Gleichstellung möglich' : 'behindert',
  h.eur(pauschbetrag(g)),
  g >= P.fahrtkosten.gdb_klein ? h.eur(P.fahrtkosten.klein) : g >= P.fahrtkosten.gdb_klein_mit_g ? `${h.eur(P.fahrtkosten.klein)} mit G` : '–',
  g >= S.schwerbehinderung ? `${P.urlaub.tage_bei_5} Tage` : '–',
]), `Rechte nach GdB, Stand 2026. Mit Merkzeichen H, Bl oder TBl beträgt der Pauschbetrag ${h.eur(P.pauschbetrag.erhoeht)}.`, ['l', 'l', 'r', 'r', 'r'])}
<p>Weitere Rechte hängen nicht am GdB, sondern an Merkzeichen: Freifahrt mit G, aG, H, Bl oder Gl, Kfz-Steuerbefreiung mit H, Bl oder aG, Begleitperson mit B, Parkausweis mit aG oder Bl, ermäßigter Rundfunkbeitrag mit RF. Einzelheiten unter ${h.a('merkzeichen', 'Merkzeichen')}. Den Wert eines einzelnen Leidens finden Sie in der ${h.a('gdb-tabelle', 'GdB-Tabelle')}.</p>
<h2>Woher die Einzelwerte kommen</h2>
<p>Den Einzel-GdB eines Leidens bestimmt die Behörde nach Teil B der Versorgungsmedizinischen Grundsätze, der „GdB-Tabelle“. Sie nennt für jede Gesundheitsstörung Spannen nach Schwere, zum Beispiel für Wirbelsäulenschäden mit mittelgradigen funktionellen Auswirkungen in einem Abschnitt GdB 20. Maßgeblich sind die Auswirkungen im Alltag, belegt durch Befundberichte, nicht die Diagnose. Wer seinen Antrag vorbereitet, fügt deshalb aktuelle Berichte bei, die Einschränkungen beschreiben: wie weit Sie gehen können, wie oft Schübe auftreten, welche Therapie nötig ist.</p>
<p>Der Antrag geht an die zuständige Behörde Ihres Landes; welche das ist, steht unter ${h.a('schwerbehindertenausweis-beantragen', 'Schwerbehindertenausweis beantragen')}. Gegen einen Bescheid können Sie innerhalb eines Monats ${h.a('widerspruch-gdb', 'Widerspruch')} einlegen.</p>
`,
  },
};
