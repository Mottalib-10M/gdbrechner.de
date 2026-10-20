import { defineGuide } from '../../lib/guide-types';
import { pauschbetrag } from '../../lib/engine/rechte';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

/**
 * Gleichstellung mit schwerbehinderten Menschen (§ 2 Abs. 3, § 151 SGB IX). Eigene Beispiele: Ausgleichsabgabe eines
 * Betriebs mit 100 Arbeitsplätzen vor und nach der Gleichstellung (Beträge ab 2025 laut params), Antrag Schritt für Schritt.
 */
const S = P.schwelle;
const B = P.beschaeftigung;
const eur = (x: number) => formatMoney(x, 0, 'de');
/** Monatliche Ausgleichsabgabe je unbesetztem Pflichtplatz nach der Quote (Tabelle ab 2025, § 160 SGB IX). */
const abgabeJePlatz = (quote: number) => {
  if (quote >= B.quote) return 0;
  for (const [ab, betrag] of B.abgabe) if (quote >= ab) return betrag;
  return B.abgabe[B.abgabe.length - 1][1];
};
const plaetze = 100;
const pflicht = Math.floor(plaetze * B.quote);
const jahr = (besetzt: number) => abgabeJePlatz(besetzt / plaetze) * (pflicht - besetzt) * 12;
const vorher = jahr(2);
const nachher = jahr(3);
const pb30 = pauschbetrag(S.gleichstellung);
const pb40 = pauschbetrag(40);

export default defineGuide({
  id: 'gleichstellung',
  group: 'arbeit',
  order: 520,
  mini: 'gleich',
  miniHref: 'home',
  related: ['kuendigungsschutz-schwerbehinderung', 'gdb-30', 'gdb-40', 'widerspruch-gdb', 'schwerbehinderung'],
  sources: ['sgb9_2', 'sgb9_151', 'sgb9_154', 'bihAbgabe', 'sgb9_168'],
  de: {
    slug: 'gleichstellung',
    nav: 'Gleichstellung',
    card: 'Gleichstellung bei GdB 30 oder 40: Voraussetzungen, Antrag bei der Agentur für Arbeit, welche Rechte sie bringt und welche nicht.',
    title: 'Gleichstellung 2026: Antrag, Voraussetzungen, Rechte',
    description: `Gleichstellung 2026 bei GdB ${S.gleichstellung} oder 40: Antrag bei der Agentur für Arbeit, Kündigungsschutz ab Eingang, kein Zusatzurlaub. So begründen Sie den Antrag richtig.`,
    h1: 'Gleichstellung mit schwerbehinderten Menschen',
    intro: 'Die Gleichstellung schützt den Arbeitsplatz von Menschen mit GdB 30 oder 40; sie ist ein eigener Antrag bei der Agentur für Arbeit, nicht beim Versorgungsamt.',
    resume: `Menschen mit einem Grad der Behinderung von ${S.gleichstellung} oder 40 können nach § 2 Absatz 3 SGB IX schwerbehinderten Menschen gleichgestellt werden, wenn sie infolge ihrer Behinderung ohne die Gleichstellung einen geeigneten Arbeitsplatz nicht erlangen oder nicht behalten können. Zuständig ist die Agentur für Arbeit, nicht das Versorgungsamt. Die Gleichstellung wird nach § 151 Absatz 2 mit dem Tag des Antragseingangs wirksam und kann befristet werden. Sie bringt den besonderen Kündigungsschutz, die Hilfen des Integrationsamts im Arbeitsleben und die Anrechnung auf die Pflichtquote von ${(B.quote * 100).toLocaleString('de-DE')} Prozent, die Arbeitgeber ab ${B.pflicht_ab_plaetze} Arbeitsplätzen erfüllen müssen. Ausgenommen sind nach § 151 Absatz 3 der Zusatzurlaub und die unentgeltliche Beförderung. Einen Schwerbehindertenausweis gibt es nicht, und die Altersrente für schwerbehinderte Menschen bleibt verschlossen. Der Pauschbetrag hängt allein am GdB: ${eur(pb30)} bei ${S.gleichstellung}, ${eur(pb40)} bei 40. Für einen Betrieb mit ${plaetze} Plätzen senkt eine zusätzliche gleichgestellte Kraft die Ausgleichsabgabe im Beispiel dieser Seite von ${eur(vorher)} auf ${eur(nachher)} im Jahr.`,
    faqs: [
      { q: 'Wo beantrage ich die Gleichstellung?', a: 'Bei der Agentur für Arbeit an Ihrem Wohnort, schriftlich, online oder persönlich. Beizufügen ist der Bescheid des Versorgungsamts mit GdB 30 oder 40. Das Versorgungsamt selbst kann nicht gleichstellen, es stellt nur den GdB fest. Läuft das GdB-Verfahren noch, können Sie die Gleichstellung trotzdem schon beantragen; entschieden wird, sobald der Bescheid vorliegt.' },
      { q: 'Gilt die Gleichstellung auch für Arbeitslose?', a: 'Ja. Das Gesetz spricht von Menschen, die ohne Gleichstellung einen geeigneten Arbeitsplatz nicht erlangen oder nicht behalten können. Damit sind auch Arbeitsuchende erfasst, deren Behinderung die Vermittlung erschwert. Für sie wirkt die Gleichstellung vor allem über die Anrechnung auf die Pflichtquote: Ein Arbeitgeber, der sie einstellt, nähert sich seiner Quote und senkt seine Ausgleichsabgabe.' },
      { q: 'Ab wann wirkt die Gleichstellung?', a: `Ab dem Tag, an dem der Antrag bei der Agentur für Arbeit eingegangen ist (§ 151 Abs. 2 SGB IX), auch wenn die Entscheidung Wochen später kommt. Für den Kündigungsschutz zählt also der Eingang des Antrags. Zusätzlich muss das Arbeitsverhältnis länger als ${P.kuendigung.wartezeit_monate} Monate bestehen. Bewahren Sie deshalb einen Nachweis über das Eingangsdatum auf, etwa eine Eingangsbestätigung.` },
      { q: 'Kann die Agentur für Arbeit die Gleichstellung ablehnen?', a: 'Ja, wenn sie keinen Zusammenhang zwischen Behinderung und Gefährdung des Arbeitsplatzes sieht, etwa wenn der Arbeitsplatz aus anderen Gründen sicher ist oder die Probleme nichts mit der Behinderung zu tun haben. Gegen die Ablehnung ist Widerspruch möglich. Legen Sie darin konkrete Belege vor: Fehlzeiten, ärztliche Einschränkungen für bestimmte Tätigkeiten, Gespräche über Versetzung oder Kündigung.' },
      { q: 'Verliere ich die Gleichstellung, wenn mein GdB auf 50 steigt?', a: `Sie brauchen sie dann nicht mehr: Mit GdB ${S.schwerbehinderung} sind Sie schwerbehindert und haben alle Rechte, auch Zusatzurlaub und Ausweis. Sinkt der GdB unter ${S.gleichstellung}, entfällt die Grundlage der Gleichstellung. Ist sie befristet, endet sie mit Ablauf der Frist; rechtzeitig vorher können Sie eine Verlängerung beantragen.` },
    ],
    body: (h) => `
<h2>Was die Gleichstellung bringt und was nicht</h2>
${h.table(['Recht', 'Gleichgestellt', 'Schwerbehindert'], [
  ['Besonderer Kündigungsschutz', 'ja', 'ja'],
  ['Hilfen des Integrationsamts, Arbeitsplatzausstattung', 'ja', 'ja'],
  ['Anrechnung auf die Pflichtquote', 'ja', 'ja'],
  ['Zusatzurlaub (§ 208 SGB IX)', 'nein', `${P.urlaub.tage_bei_5} Tage`],
  ['Freifahrt, Merkzeichen (Kapitel 13)', 'nein', 'mit Merkzeichen'],
  ['Schwerbehindertenausweis', 'nein', 'ja'],
  ['Altersrente für schwerbehinderte Menschen', 'nein', 'ja'],
], 'Gleichstellung und Schwerbehinderung im Vergleich, Stand 2026', ['l', 'l', 'l'])}
<p>§ 151 Absatz 3 SGB IX wendet auf gleichgestellte Menschen die besonderen Regelungen für schwerbehinderte Menschen an, „mit Ausnahme des § 208 und des Kapitels 13“. Das sind der Zusatzurlaub und die unentgeltliche Beförderung. Die Altersrente ist im Rentenrecht geregelt und verlangt ausdrücklich die Schwerbehinderung nach § 2 Absatz 2. Was sich für Sie ändert, zeigt der kleine Rechner.</p>
<h2>Die Voraussetzung: Arbeitsplatz in Gefahr</h2>
<p>Die Agentur für Arbeit prüft keinen festen Katalog, sondern Ihre Lage. Entscheidend ist der Zusammenhang: Gefährdet die Behinderung den Arbeitsplatz, oder verhindert sie, dass Sie einen geeigneten finden? Für eine Gefährdung sprechen zum Beispiel wiederholte behinderungsbedingte Fehlzeiten, ärztliche Einschränkungen, die bestimmte Aufgaben ausschließen, eine verminderte Leistungsfähigkeit, Gespräche über Versetzung oder Abfindung, ein laufender Stellenabbau, bei dem Sie wegen der Einschränkungen schlechter dastehen. Gegen eine Gefährdung spricht ein sicherer Arbeitsplatz, an dem die Behinderung keine Rolle spielt.</p>
<p>Schreiben Sie deshalb im Antrag nicht nur den GdB, sondern die Folgen: welche Tätigkeiten Sie nicht mehr oder nur eingeschränkt ausüben können, wie oft Sie ausgefallen sind, was der Arbeitgeber bereits angesprochen hat. Ein kurzes Attest zu den Einschränkungen am Arbeitsplatz und eine Stellungnahme der Schwerbehindertenvertretung oder des Betriebsrats stärken den Antrag.</p>
<h2>Drei typische Situationen</h2>
<p>Ein Lagerarbeiter mit einem Rückenleiden und GdB ${S.gleichstellung} darf nach ärztlichem Rat nicht mehr schwer heben; der Arbeitgeber hat bereits angedeutet, dass es für ihn keine passende Aufgabe gebe. Hier liegt der Zusammenhang zwischen Behinderung und Gefährdung auf der Hand. Eine Pflegekraft mit einer Depression und GdB 40 kehrt nach langer Krankheit zurück und soll nur noch in Tagschichten arbeiten; die Gleichstellung sichert sie während der Wiedereingliederung ab. Eine Bewerberin mit Diabetes und GdB 40 wird für Stellen mit Nachtschicht immer wieder abgelehnt; auch wer einen Arbeitsplatz erst sucht, kann gleichgestellt werden. Kein Fall: eine Büroangestellte mit GdB ${S.gleichstellung}, deren Arbeit von der Behinderung nicht berührt ist und deren Stelle sicher ist.</p>
<h2>Der Antrag Schritt für Schritt</h2>
<p>Erstens: GdB feststellen lassen, mindestens ${S.gleichstellung}. Ohne Bescheid des Versorgungsamts kann die Agentur nicht entscheiden. Zweitens: Antrag bei der Agentur für Arbeit stellen, am besten sofort, denn er wirkt ab Eingang. Drittens: Fragebogen der Agentur ausfüllen und Belege beifügen. Viertens: Die Agentur kann Stellungnahmen einholen, auch beim Arbeitgeber oder bei der Interessenvertretung. Fünftens: Bescheid prüfen; gegen eine Ablehnung legen Sie innerhalb eines Monats Widerspruch ein. Die Gleichstellung kann befristet werden; achten Sie auf das Enddatum und beantragen Sie die Verlängerung rechtzeitig, bevor die Frist abläuft. Wechseln Sie den Arbeitgeber, gilt die Gleichstellung weiter, solange sie nicht befristet ist oder widerrufen wird.</p>
<h2>Der Blick des Arbeitgebers</h2>
<p>Arbeitgeber mit durchschnittlich mindestens ${B.pflicht_ab_plaetze} Arbeitsplätzen müssen nach § 154 SGB IX auf ${h.pct(B.quote)} der Plätze schwerbehinderte Menschen beschäftigen. Gleichgestellte zählen mit. Für jeden unbesetzten Pflichtplatz fällt eine monatliche Ausgleichsabgabe an, deren Höhe von der erreichten Quote abhängt; die Beträge gelten seit 2025 (${h.src('bihAbgabe', 'Integrationsämter')}).</p>
${h.table(['Erreichte Quote', 'Abgabe je unbesetztem Platz und Monat'], [
  [`${h.pct(B.abgabe[0][0])} bis unter ${h.pct(B.quote)}`, h.eur(B.abgabe[0][1])],
  [`${h.pct(B.abgabe[1][0])} bis unter ${h.pct(B.abgabe[0][0])}`, h.eur(B.abgabe[1][1])],
  [`über 0 bis unter ${h.pct(B.abgabe[1][0])}`, h.eur(B.abgabe[2][1])],
  ['0', h.eur(B.abgabe[3][1])],
], 'Ausgleichsabgabe seit 2025 (Betriebe ab 60 Arbeitsplätzen)', ['l', 'r'])}
<p>Ein Beispiel: Ein Betrieb mit ${plaetze} Arbeitsplätzen muss ${pflicht} Plätze besetzen. Beschäftigt er zwei schwerbehinderte Menschen, zahlt er ${h.eur(vorher)} im Jahr. Wird eine weitere Mitarbeiterin gleichgestellt, steigt die Quote, und die Abgabe sinkt auf ${h.eur(nachher)}. Für kleinere Betriebe gelten eigene, niedrigere Beträge. Die Gleichstellung ist für Arbeitgeber also kein reiner Nachteil, auch wenn sie den Kündigungsschutz auslöst.</p>
<h2>Gleichstellung oder höherer GdB?</h2>
<p>Wer knapp unter ${S.schwerbehinderung} liegt, steht oft vor der Frage, ob ein ${h.a('widerspruch-gdb', 'Widerspruch')} gegen den GdB oder die Gleichstellung der bessere Weg ist. Beides schließt sich nicht aus. Die Gleichstellung wirkt schnell und sichert den Arbeitsplatz, der höhere GdB bringt zusätzlich Zusatzurlaub, Ausweis und Rente, ist aber ungewiss. Viele beantragen deshalb die Gleichstellung sofort und verfolgen den Widerspruch parallel. Die Einzelheiten zu ${h.a('gdb-30', 'GdB 30')} und ${h.a('gdb-40', 'GdB 40')} stehen auf den Seiten der jeweiligen Stufe; was der Schutz konkret bedeutet, unter ${h.a('kuendigungsschutz-schwerbehinderung', 'Kündigungsschutz')}.</p>
`,
  },
});
