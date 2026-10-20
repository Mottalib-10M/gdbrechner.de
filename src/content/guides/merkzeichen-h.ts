import { defineGuide } from '../../lib/guide-types';
import { fahrtkosten, pauschbetrag } from '../../lib/engine/rechte';
import { steuerwirkung } from '../../lib/engine/steuer';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

/**
 * Merkzeichen H (§ 33b Abs. 3 Satz 4 EStG, VersMedV Teil A Nr. 4 und 5, § 228 Abs. 4 SGB IX, § 3a Abs. 1 KraftStG).
 * Eigene Beispiele: Rentner mit GdB 70 und 24.000 € zvE, Beschäftigte mit GdB 90 und 45.000 €, je mit und ohne H.
 */
const eur = (x: number) => formatMoney(x, 0, 'de');
const PB = P.pauschbetrag;
const pbH = pauschbetrag(70, ['H']);
const pb70 = pauschbetrag(70);
const pb90 = pauschbetrag(90);
const fkH = fahrtkosten(70, ['H']);
const fk70 = fahrtkosten(70);
const fk90 = fahrtkosten(90);
const st = (zve: number, pb: number, fk: number) => steuerwirkung({ zve, splitting: false, kirche: 0, pauschbetrag: pb, fahrtkosten: fk, weitereAgB: 0, kinder: 0 });
const a70 = st(24000, pb70, fk70);
const a70H = st(24000, pbH, fkH);
const b90 = st(45000, pb90, fk90);
const b90H = st(45000, pbH, fkH);

export default defineGuide({
  id: 'merkzeichen-h',
  group: 'merkzeichen',
  order: 340,
  mini: 'merkzeichen',
  miniDefaults: { m: 4, g: 80 },
  miniHref: 'merkzeichen',
  related: ['merkzeichen', 'pauschbetrag-kind', 'merkzeichen-bl', 'gdb-100', 'behinderten-pauschbetrag', 'merkzeichen-b'],
  sources: ['estg33b', 'estdv65', 'versmedv', 'sgb9_228', 'kraftstg3a', 'estg33'],
  de: {
    slug: 'merkzeichen-h',
    nav: 'Merkzeichen H',
    card: 'Hilflos im Sinne des Steuerrechts: welcher Hilfebedarf zählt, welche Regeln für Kinder gelten und warum H den Pauschbetrag auf einen Schlag erhöht.',
    title: 'Merkzeichen H 2026: hilflos, Pauschbetrag, Voraussetzungen',
    description: `Merkzeichen H 2026: wer als hilflos gilt, welche Verrichtungen zählen, Sonderregeln für Kinder und der erhöhte Pauschbetrag von ${eur(PB.erhoeht)} statt Betrag nach GdB.`,
    h1: 'Merkzeichen H: hilflos im Sinne des Gesetzes',
    intro: 'Hilflos ist, wer im Alltag dauernd fremde Hilfe braucht; das Merkzeichen H bringt den höchsten Pauschbetrag und die kostenlose Wertmarke.',
    resume: `Hilflos ist nach § 33b Absatz 3 Satz 4 EStG, wer für eine Reihe häufig und regelmäßig wiederkehrender Verrichtungen zur Sicherung der persönlichen Existenz im Ablauf jedes Tages dauernd fremde Hilfe braucht. Dazu zählen nach Teil A Nummer 4 der Versorgungsmedizin-Verordnung vor allem An- und Auskleiden, Essen, Körperpflege und Toilettengang, außerdem Bewegung, geistige Anregung und Kommunikation; auch Überwachung, Anleitung oder ständige Bereitschaft zur Hilfe genügen. Hilfe im Haushalt zählt nicht. Das Merkzeichen H bringt einen Behinderten-Pauschbetrag von ${eur(PB.erhoeht)} statt des Betrags nach GdB, eine Fahrtkostenpauschale von ${eur(fkH)}, die Wertmarke für den Nahverkehr ohne Gebühr und die Befreiung von der Kraftfahrzeugsteuer. Ein Rentner mit GdB 70 und ${eur(24000)} zu versteuerndem Einkommen spart mit H nach dem Rechner rund ${eur(a70H.ersparnis)} Steuern im Jahr, ohne H rund ${eur(a70.ersparnis)}. Für Kinder gelten in Teil A Nummer 5 eigene Regeln: Hilflosigkeit kann dort schon bei niedrigerem GdB vorliegen, endet aber oft mit einem bestimmten Alter. Für den Pauschbetrag steht Pflegegrad 4 oder 5 dem Merkzeichen H gleich.`,
    faqs: [
      { q: 'Ersetzt ein Pflegegrad das Merkzeichen H im Ausweis?', a: 'Nur beim Pauschbetrag. Nach § 65 Absatz 2 EStDV steht die Einstufung in Pflegegrad 4 oder 5 dem Merkzeichen H gleich, das Finanzamt gewährt dann den erhöhten Betrag. Für die kostenlose Wertmarke und die Befreiung von der Kraftfahrzeugsteuer verlangen § 228 SGB IX und § 3a KraftStG dagegen den Ausweis mit H. Wer diese Vorteile will, muss H beim Versorgungsamt beantragen, auch mit hohem Pflegegrad.' },
      { q: 'Zählt Hilfe im Haushalt für das Merkzeichen H?', a: 'Nein. Teil A Nummer 4 Buchstabe d schließt Verrichtungen aus, die mit der Pflege der Person nicht unmittelbar zusammenhängen, etwa die hauswirtschaftliche Versorgung. Einkaufen, Kochen, Putzen und Wäsche begründen H also nicht, auch wenn Sie dabei vollständig auf Hilfe angewiesen sind. Es zählen Anziehen, Essen, Waschen, Toilettengang, Bewegung, geistige Anregung und Kommunikation, und zwar in erheblichem Umfang an jedem Tag.' },
      { q: 'Kann ein Mensch mit psychischer Erkrankung das Merkzeichen H erhalten?', a: 'Ja. Teil A Nummer 4 Buchstabe c nimmt Hilflosigkeit auch an, wenn ein psychisch oder geistig behinderter Mensch Verrichtungen zwar körperlich ausführen könnte, sie aber wegen einer Antriebsschwäche ohne ständige Überwachung nicht vornähme. Bei Psychosen, Hirnschäden oder geistiger Behinderung, die allein einen GdB von 100 bedingen, ist H nach Buchstabe f in der Regel gegeben. Entscheidend ist der beschriebene Hilfebedarf im Alltag.' },
      { q: 'Endet das Merkzeichen H eines Kindes automatisch mit 16 oder 18?', a: 'Nicht automatisch. Die Verordnung nennt aber für viele Erkrankungen ein Alter, bis zu dem Hilflosigkeit in der Regel anzunehmen ist, etwa beim Diabetes bis zum 16. oder bei schwerer Sehbehinderung bis zum 18. Lebensjahr; danach prüft die Behörde neu. Nach Teil A Nummer 5 kann H auch dadurch entfallen, dass Jugendliche gelernt haben, die nötigen Maßnahmen selbstständig auszuführen. Bleibt der Hilfebedarf, gelten danach die Maßstäbe für Erwachsene.' },
      { q: 'Wie beschreibe ich den Hilfebedarf im Antrag auf H?', a: 'Konkret und für einen normalen Tag: bei welchen Verrichtungen Sie Hilfe brauchen, wie oft, wie lange und warum. Schreiben Sie auch nächtliche Hilfe, Überwachung und Anleitung auf, denn sie zählen ebenfalls. Ein Pflegetagebuch über zwei bis drei Wochen, das Pflegegutachten und Berichte der behandelnden Ärzte machen den Bedarf nachvollziehbar. Einzelne Hilfen, etwa beim Anziehen der Schuhe, genügen nach der Verordnung nicht.' },
    ],
    body: (h) => `
<h2>Wann die Verordnung Hilflosigkeit annimmt</h2>
<p>Die Definition stammt aus dem Steuerrecht (${h.src('estg33b', '§ 33b Abs. 3 Satz 4 EStG')}), die Bewertung aus Teil A Nummer 4 der ${h.src('versmedv', 'Versorgungsmedizinischen Grundsätze')}. Hilfe ist nicht nur das Handanlegen: Auch Überwachung oder Anleitung zu den Verrichtungen genügen, und es reicht, wenn Hilfe zwar nicht dauernd geleistet wird, aber ständig bereitstehen muss, etwa weil sie häufig und plötzlich wegen akuter Lebensgefahr nötig wird. Der Umfang muss erheblich sein. Das ist der Fall, wenn Hilfe dauernd für zahlreiche, täglich wiederkehrende Verrichtungen gebraucht wird. Einzelne Hilfen, selbst lebensnotwendige, reichen nicht: Die Verordnung nennt als Beispiele Hilfe beim Anziehen einzelner Kleidungsstücke, Begleitung bei Reisen und Spaziergängen, Hilfe im Straßenverkehr, einfache Wundbehandlung und Hilfe bei der Heimdialyse ohne weiteren Hilfebedarf.</p>
<p>Für einige Behinderungen nimmt die Verordnung Hilflosigkeit ohne nähere Prüfung an: stets bei Blindheit und hochgradiger Sehbehinderung, bei Querschnittslähmung und anderen Behinderungen, die dauernd auch in der Wohnung einen Rollstuhl erfordern, und bei dauerndem Krankenlager, das nicht völlige Bettlägerigkeit voraussetzt. In der Regel gilt das auch für Hirnschäden, Anfallsleiden, geistige Behinderung und Psychosen, die allein einen GdB von 100 bedingen, und für den Verlust von zwei oder mehr Gliedmaßen, ausgenommen Unterschenkel- oder Fußamputationen beiderseits.</p>
<h2>Was H im Jahr wert ist</h2>
${h.table(['Leistung', 'ohne H', 'mit H'], [
  ['Behinderten-Pauschbetrag bei GdB 70', h.eur(pb70), h.eur(pbH)],
  ['Fahrtkostenpauschale bei GdB 70', h.eur(fk70), h.eur(fkH)],
  ['Wertmarke für den Nahverkehr', 'nur mit G, aG oder Gl, gegen Gebühr', 'auf Antrag ohne Gebühr'],
  ['Kraftfahrzeugsteuer', 'voll', 'befreit (§ 3a Abs. 1 KraftStG)'],
  [`Steuerersparnis bei ${h.eur(24000)}, GdB 70`, h.eur(a70.ersparnis), h.eur(a70H.ersparnis)],
  [`Steuerersparnis bei ${h.eur(45000)}, GdB 90`, h.eur(b90.ersparnis), h.eur(b90H.ersparnis)],
], 'Merkzeichen H im Vergleich, Einzelveranlagung, Tarif 2026', ['l', 'r', 'r'])}
<p>Der erhöhte Pauschbetrag von ${h.eur(PB.erhoeht)} tritt an die Stelle des Betrags nach dem GdB, er kommt nicht hinzu. Ebenso ersetzt die große Fahrtkostenpauschale die kleine; sie wirkt nur oberhalb der zumutbaren Belastung, die im ersten Beispiel ${h.eur(a70H.zumutbar)} beträgt. Mit H fahren Sie nach ${h.src('sgb9_228', '§ 228 SGB IX')} im Nahverkehr frei, und die Wertmarke gibt es auf Antrag für ein Jahr ohne die Gebühr von ${h.eur(P.wertmarke.jahr)}. Das Auto ist steuerfrei, wenn es auf Sie zugelassen ist; die Einzelheiten regelt ${h.src('kraftstg3a', '§ 3a KraftStG')}. Einen Parkausweis bringt H allein nicht.</p>
<h2>Kinder: eigene Maßstäbe</h2>
<p>Bei Kindern zählt nach Teil A Nummer 5 nicht nur die Hilfe bei den Verrichtungen, sondern auch die Anleitung dazu, die Förderung der körperlichen und geistigen Entwicklung und die notwendige Überwachung. Berücksichtigt wird nur der Teil, der über den Bedarf eines gesunden gleichaltrigen Kindes hinausgeht, und dieser Mehrbedarf muss erheblich sein. Weil Behinderung und Hilfebedarf bei Kindern nicht immer im Verhältnis stehen, kann H anders als bei Erwachsenen schon bei niedrigerem GdB vorliegen, auch im ersten Lebensjahr.</p>
${h.table(['Erkrankung', 'Hilflosigkeit nach Teil A Nr. 5 in der Regel'], [
  ['Diabetes mellitus', 'bis zur Vollendung des 16. Lebensjahres'],
  ['Schweres Bronchialasthma', 'bis zur Vollendung des 16. Lebensjahres'],
  ['Künstliche Niere oder Niereninsuffizienz mit GdS 100', 'bis zur Vollendung des 16. Lebensjahres'],
  ['Sehbehinderung mit GdS von wenigstens 80', 'bis zur Vollendung des 18. Lebensjahres'],
  ['Tief greifende Entwicklungsstörung mit GdS ab 50', 'bis zum 18. Lebensjahr'],
  ['Taubheit oder an Taubheit grenzende Schwerhörigkeit', 'ab Frühförderung bis zum Ende der Ausbildung'],
  ['Phenylketonurie', 'ab Diagnose, in der Regel bis zum 14. Lebensjahr'],
  ['Akute Leukämie und andere bösartige Erkrankungen', 'für die Dauer der zytostatischen Intensivtherapie'],
], 'Beispiele aus VersMedV Teil A Nr. 5', ['l', 'l'])}
<p>Die Liste ist nicht abschließend; die Verordnung nennt weitere Fälle, etwa Mukoviszidose, Hämophilie, Lippen-Kiefer-Gaumenspalte und schwere Allergien mit Gefahr eines anaphylaktischen Schocks. Für Kinder ist H meist steuerlich bei den Eltern wirksam: Der erhöhte Pauschbetrag kann auf sie übertragen werden. Wie das geht, steht unter ${h.a('pauschbetrag-kind', 'Pauschbetrag für das Kind')}. Stellt die Behörde H für ein Kind fest, kann sie eine Nachprüfung vorsehen; Hilflosigkeit kann dann nicht nur durch Besserung entfallen, sondern auch, weil Jugendliche gelernt haben, Insulin, Inhalation oder Diät selbst zu steuern.</p>
<h2>H und Pflegegrad</h2>
<p>Pflegegrad und Merkzeichen H prüfen verschiedene Stellen nach verschiedenen Maßstäben: den Pflegegrad die Pflegekasse mit dem Medizinischen Dienst, H das Versorgungsamt nach der Verordnung. Ein Pflegegrad führt nicht automatisch zu H, und ein abgelehntes H sagt nichts über den Pflegegrad. Steuerlich gibt es eine Brücke: Nach ${h.src('estdv65', '§ 65 Abs. 2 EStDV')} steht Pflegegrad 4 oder 5 dem Merkzeichen H beim Pauschbetrag gleich. Legen Sie ein vorhandenes Pflegegutachten dem Antrag auf H bei; es beschreibt den täglichen Hilfebedarf oft genauer als ein Arztbrief.</p>
<h2>H beantragen</h2>
<p>H beantragen Sie bei der Behörde, die den GdB feststellt, zusammen mit dem GdB oder später. Bei Blindheit oder hochgradiger Sehbehinderung genügt der augenärztliche Befund, weil die Verordnung H dann stets annimmt; das ${h.a('merkzeichen-bl', 'Merkzeichen Bl')} kommt bei Blindheit hinzu. In allen anderen Fällen entscheidet die Beschreibung des Alltags. Wer H hat, erfüllt nach Teil D Nummer 2 zugleich eine der Voraussetzungen für das ${h.a('merkzeichen-b', 'Merkzeichen B')}, wenn er in Bus und Bahn regelmäßig Hilfe braucht.</p>
`,
  },
});
