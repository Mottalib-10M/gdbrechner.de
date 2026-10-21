import { defineGuide } from '../../lib/guide-types';
import { eintrag } from '../../lib/engine/tabelle';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { sehGdb } from '../../lib/engine/augen';
import { pauschbetrag } from '../../lib/engine/rechte';
import { formatMoney } from '../../lib/format';

/**
 * Sehorgan (VersMedV Teil B Nr. 4): Sehschärfe nach der MdE-Tabelle der DOG (4.3, src/data/dog-tabelle.json),
 * Linsenverlust (4.2), Doppelbilder (4.4), Gesichtsfeld (4.5); Blindheit und hochgradige Sehbehinderung nach
 * Teil A Nr. 6. Jeder Wert kommt aus der Tabelle oder aus tabelle.json, Kombinationen vom Motor.
 */
const eur = (x: number) => formatMoney(x, 0, 'de');
const gf = eintrag('gesichtsfeldausfall')!.stufen;
const lv = eintrag('linsenverlust')!.stufen;
const db = eintrag('doppelbilder')!.stufen;
const at = eintrag('augentumor')!.stufen;
const sp = (s: { von: number; bis: number }) => (s.von === s.bis ? `${s.von}` : `${s.von} bis ${s.bis}`);
const r = (x: { min: number; max: number }) => (x.min === x.max ? `${x.min}` : `${x.min} bis ${x.max}`);
const v = (x: number) => (x === 1 ? '1,0' : String(x).replace('.', ','));
const g = sehGdb;
const mitGlaukom = gesamtGdb([{ system: 'augen', gdb: g(0.4, 0.4) }, { system: 'augen', gdb: gf[4].von, beziehung: 'nachteilig' }]);
const mitDiabetes = gesamtGdb([{ system: 'augen', gdb: g(0.2, 0.2) }, { system: 'stoffwechsel', gdb: 40, beziehung: 'unabhaengig' }]);

export default defineGuide({
  id: 'gdb-augen',
  group: 'tabelle',
  order: 655,
  mini: 'augen',
  miniHref: 'home',
  related: ['gdb-tabelle', 'merkzeichen-bl', 'merkzeichen-g', 'gdb-diabetes', 'gdb-50', 'home'],
  sources: ['versmedv', 'sgb9_152', 'sgb9_229', 'estg33b', 'rbstv4'],
  de: {
    slug: 'gdb-augen',
    nav: 'Augen und Sehen',
    card: 'Sehschärfe beider Augen nach der Tabelle der DOG, Gesichtsfeld, Linsenverlust, Doppelbilder: welcher GdB gilt.',
    title: 'GdB Augen 2026: Sehschärfe, Gesichtsfeld und DOG-Tabelle',
    description: 'GdB bei Sehbehinderung 2026 nach VersMedV Teil B Nr. 4: Sehschärfe beider Augen in der DOG-Tabelle nachschlagen, Gesichtsfeld, Linse, Blindheit, Rechner.',
    h1: 'GdB bei Sehbehinderung: Augen nach der DOG-Tabelle',
    intro: 'Bei den Augen zählt die Sehschärfe mit Brille oder Kontaktlinse, beide Augen zusammen.',
    resume: `Sehstörungen bewertet die Versorgungsmedizin-Verordnung in Teil B Nummer 4. Maßgebend ist in erster Linie die korrigierte Sehschärfe, also mit Brille oder Kontaktlinse, und zwar beider Augen zusammen in der MdE-Tabelle der Deutschen Ophthalmologischen Gesellschaft. Sehen beide Augen ${v(0.5)}, sind es ${g(0.5, 0.5)}; bei ${v(0.32)} auf beiden Augen ${g(0.32, 0.32)}, bei ${v(0.2)} schon ${g(0.2, 0.2)} und damit Schwerbehinderung, bei ${v(0.1)} sind es ${g(0.1, 0.1)}. Ist ein Auge blind und das andere voll sehfähig, gilt ${g(1, 0)}. Daneben zählen Ausfälle des Gesichtsfeldes, etwa beim Glaukom: Eine allseitige Einengung beider Augen auf 10 Grad ergibt ${gf[5].von}. Blind ist, wer auf keinem Auge mehr als 0,02 sieht; dann gibt es das Merkzeichen Bl und ${eur(pauschbetrag(100, ['Bl']))} Pauschbetrag im Jahr. Der Rechner oben liest den Wert für Ihre beiden Augen direkt aus der Tabelle.`,
    faqs: [
      { q: 'Zählt beim GdB die Sehschärfe mit oder ohne Brille?', a: 'Mit. Nach Teil B Nummer 4 ist in erster Linie die korrigierte Sehschärfe maßgebend, bestimmt nach den Empfehlungen der DOG und der DIN 58220. Wer mit Brille gut sieht, hat beim Sehen also keinen nennenswerten GdB, auch wenn er ohne Brille kaum etwas erkennt. Prüft der Augenarzt ein- und beidäugig mit unterschiedlichem Ergebnis, setzt die Verordnung die beidäugige Sehschärfe als Wert des besseren Auges an.' },
      { q: 'Welcher GdB gilt, wenn ein Auge blind ist?', a: `Sieht das andere Auge mit Korrektur voll (1,0), nennt die MdE-Tabelle ${g(1, 0)}. Sinkt die Sehschärfe des verbliebenen Auges auf ${v(0.5)}, sind es ${g(0.5, 0)}, bei ${v(0.25)} schon ${g(0.25, 0)}. Wer ein Auge verloren hat und in der Augenhöhle eine dauernde, nicht behandelbare Eiterung hat, erhält nach Nummer 4.1 40. Der Verlust eines Auges allein macht also noch nicht schwerbehindert.` },
      { q: 'Wie wird ein Glaukom mit Gesichtsfeldausfall bewertet?', a: `Nach dem Gesichtsfeld, gemessen mit kinetischer Perimetrie nach Goldmann III/4e, wie es die Verordnung verlangt. Eine allseitige Einengung beider Augen auf 50 Grad ergibt ${gf[3].von}, auf 30 Grad ${gf[4].von}, auf 10 Grad ${gf[5].von}, auf 5 Grad ${gf[6].von}. Ist zugleich die Sehschärfe gemindert, wirken beide Störungen zusammen; der Gesamtwert für die Augen steigt dann über den höheren der beiden Einzelwerte.` },
      { q: 'Gibt es einen GdB nach einer Katarakt-Operation mit Kunstlinse?', a: `Ja, als Linsenverlust nach Nummer 4.2, auch wenn eine Kunstlinse eingesetzt ist. Bei einem Auge mit Sehschärfe 0,4 und mehr sind es ${lv[0].von}, bei 0,1 bis unter 0,4 ${lv[1].von}, unter 0,1 ${sp(lv[2])}. Betrifft es beide Augen, wird der Wert aus der Sehschärfe-Tabelle um 10 erhöht, solange er nicht über 60 liegt. Voraussetzung ist, dass die Linsen vertragen werden.` },
      { q: 'Ab welcher Sehschärfe ist man schwerbehindert?', a: `Wenn beide Augen nur noch ${v(0.2)} erreichen, nennt die Tabelle ${g(0.2, 0.2)}, das ist die Grenze der Schwerbehinderung. Bei ungleichen Augen gleicht das bessere Auge viel aus: ${v(0.25)} und ${v(0.1)} ergeben ${g(0.25, 0.1)}, ${v(0.4)} und ${v(0.1)} dagegen nur ${g(0.4, 0.1)}. Kommen andere Leiden hinzu, kann der Gesamt-GdB die 50 auch mit einem kleineren Augenwert erreichen.` },
    ],
    body: (h) => `
<h2>Die MdE-Tabelle der DOG: beide Augen zusammen</h2>
<p>Die Verordnung übernimmt für die Sehschärfe eine Tabelle der Deutschen Ophthalmologischen Gesellschaft. Sie ordnet jedem Paar aus rechtem und linkem Auge einen Wert zu; die Zeilen sind das eine Auge, die Spalten das andere. Hier ein Auszug für häufige Kombinationen, die ganze Tabelle steckt im Rechner oben:</p>
${h.table(['Sehschärfe Auge 1', 'Sehschärfe Auge 2', 'GdB'], [
  [v(1), v(0.5), String(g(1, 0.5))],
  [v(1), v(0.1), String(g(1, 0.1))],
  [v(1), '0 (blind)', String(g(1, 0))],
  [v(0.5), v(0.5), String(g(0.5, 0.5))],
  [v(0.5), v(0.1), String(g(0.5, 0.1))],
  [v(0.4), v(0.4), String(g(0.4, 0.4))],
  [v(0.32), v(0.32), String(g(0.32, 0.32))],
  [v(0.25), v(0.25), String(g(0.25, 0.25))],
  [v(0.2), v(0.2), String(g(0.2, 0.2))],
  [v(0.1), v(0.1), String(g(0.1, 0.1))],
  [v(0.05), v(0.05), String(g(0.05, 0.05))],
], 'Auszug aus der MdE-Tabelle der DOG, VersMedV Teil B Nr. 4.3', ['l', 'l', 'r'])}
<p>Die Tabelle kennt Zwischenwerte wie 5, 15, 25 oder 35. Festgestellt wird der GdB nach ${h.src('sgb9_152', '§ 152 SGB IX')} aber in Zehnergraden; ein Zwischenwert fließt in die Gesamtbewertung ein und wird dort auf- oder abgerundet, je nachdem, was die übrigen Befunde zeigen. Wer nur auf einem Auge schlecht sieht, bleibt meist bei 25 oder darunter, weil das gesunde Auge im Alltag fast alles ausgleicht.</p>
<!--mini:stufe-->
<h2>Gesichtsfeld: wenn der Rand fehlt</h2>
<p>Nicht nur die Schärfe in der Mitte zählt. Nummer 4.5 bewertet Ausfälle des Gesichtsfeldes, wie sie beim Glaukom, nach einem Schlaganfall oder bei Netzhauterkrankungen auftreten. Eine homonyme Hemianopsie, also der Ausfall derselben Hälfte auf beiden Augen, ergibt ${gf[0].von}; eine bitemporale Hemianopsie ${gf[1].von}; der vollständige Ausfall beider unteren Gesichtsfeldhälften ${gf[2].von}. Bei der allseitigen Einengung entscheidet der verbleibende Abstand vom Zentrum, gemessen an beiden Augen zusammen: 50 Grad ergeben ${gf[3].von}, 30 Grad ${gf[4].von}, 10 Grad ${gf[5].von} und 5 Grad ${gf[6].von}. Verwertbar sind nur Messungen mit manueller kinetischer Perimetrie entsprechend Goldmann III/4e; ein automatischer Schwellentest beim Optiker reicht nicht.</p>
<h2>Linsenverlust, Doppelbilder, Tumor</h2>
<p>Nach einer Operation des grauen Stars gilt das Auge als linsenlos, auch mit Kunstlinse. Nummer 4.2 nennt für ein Auge ${lv[0].von} bei einer Sehschärfe ab 0,4, ${lv[1].von} zwischen 0,1 und 0,4 und ${sp(lv[2])} darunter. Muss ein Auge wegen Doppelbildern vom Sehen ausgeschlossen werden, etwa durch eine Augenmuskellähmung, sind es nach Nummer 4.4 ${db[0].von}; hat sich das Gehirn an das Ausblenden gewöhnt und verschwinden die Doppelbilder, ${db[1].von}. Ein bösartiger Tumor des Auges ergibt während der Heilungsbewährung von fünf Jahren ${at[0].von}, wenn er auf den Augapfel begrenzt war, sonst wenigstens ${at[1].von}.</p>
<h2>Blind und hochgradig sehbehindert</h2>
<p>Teil A Nummer 6 der Verordnung zieht zwei Grenzen. Blind ist, wem das Augenlicht vollständig fehlt oder wer auf keinem Auge und auch beidäugig nicht mehr als 0,02 (1/50) sieht; gleichgestellt sind schwere Gesichtsfeldeinengungen, etwa auf 5 Grad um das Zentrum auch bei normaler Sehschärfe. Hochgradig sehbehindert ist, wer nicht mehr als 0,05 (1/20) erreicht. Beide Gruppen liegen beim GdB 100. Mit Blindheit gibt es das Merkzeichen Bl, den erhöhten Pauschbetrag von ${eur(pauschbetrag(100, ['Bl']))} und je nach Land Blindengeld; die Einzelheiten stehen auf der Seite ${h.a('merkzeichen-bl', 'Merkzeichen Bl')}. Bei sehbehinderten Kindern mit einem Augenwert von wenigstens 80 ist bis zum 18. Geburtstag Hilflosigkeit anzunehmen, also das Merkzeichen H.</p>
<h2>Mehrere Augenleiden und andere Krankheiten</h2>
<p>Sehschärfe, Gesichtsfeld und Linse gehören zum selben Funktionssystem. Zuerst bildet das Amt einen Wert für die Augen insgesamt, dann den Gesamt-GdB mit den übrigen Leiden. Ein Glaukom mit Sehschärfe ${v(0.4)} auf beiden Augen (${g(0.4, 0.4)}) und einer Einengung auf 30 Grad (${gf[4].von}) verstärken sich: Die Spanne liegt bei ${r(mitGlaukom)}. Eine diabetische Netzhauterkrankung mit ${v(0.2)} auf beiden Augen (${g(0.2, 0.2)}) und ein insulinpflichtiger Diabetes mit 40 betreffen verschiedene Lebensbereiche; die Spanne liegt bei ${r(mitDiabetes)}. Wie der Diabetes selbst bewertet wird, erklärt die Seite ${h.a('gdb-diabetes', 'GdB bei Diabetes')}.</p>
<h2>Merkzeichen G bei Sehbehinderung</h2>
<p>Das Merkzeichen G setzt eine erhebliche Beeinträchtigung der Bewegungsfähigkeit im Straßenverkehr voraus. Bei Sehbehinderung sieht Teil D der Verordnung Störungen der Orientierungsfähigkeit vor, die dazu führen: bei allen Sehbehinderungen mit einem GdB von wenigstens 70, bei 50 oder 60 nur, wenn zugleich etwa eine hochgradige Schwerhörigkeit beidseits hinzukommt. Mit G gibt es die Freifahrt im Nahverkehr mit Wertmarke oder die ermäßigte Kfz-Steuer; die Voraussetzungen im Wortlaut stehen in ${h.src('sgb9_229', '§ 229 SGB IX')} und auf der Seite ${h.a('merkzeichen-g', 'Merkzeichen G')}.</p>
<h2>Was in den Antrag gehört</h2>
<p>Ein aktueller augenärztlicher Befund mit der korrigierten Sehschärfe jedes Auges und beidäugig, bei Gesichtsfeldausfällen das Perimeter-Protokoll nach Goldmann, Operationsberichte bei Linsenersatz und der Verlauf über die letzten Jahre. Schreiben Sie dazu, was im Alltag nicht mehr geht: Lesen, Autofahren, sich in fremder Umgebung orientieren. Beim Rundfunkbeitrag gibt es für blinde und wesentlich sehbehinderte Menschen mit einem GdB von wenigstens 60 allein wegen der Sehbehinderung eine Ermäßigung auf ein Drittel nach ${h.src('rbstv4', '§ 4 Rundfunkbeitragsstaatsvertrag')}. Über den Wert entscheidet das Versorgungsamt; die Tabelle gibt den Rahmen, die Befunde den Platz darin.</p>
<p>Wer bereits einen Bescheid hat und schlechter sieht, kann einen Änderungsantrag stellen. Lohnend ist er, wenn die neue Sehschärfe in der Tabelle mindestens zehn Punkte höher liegt; die Folgen erklärt die Seite ${h.a('verschlimmerungsantrag', 'Verschlimmerungsantrag')}. Alle übrigen Werte der Verordnung lassen sich in der ${h.a('gdb-tabelle', 'GdB-Tabelle')} nachschlagen.</p>
`,
  },
});
