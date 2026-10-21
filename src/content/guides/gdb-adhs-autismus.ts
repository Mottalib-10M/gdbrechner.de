import { defineGuide } from '../../lib/guide-types';
import { eintrag } from '../../lib/engine/tabelle';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { pauschbetrag } from '../../lib/engine/rechte';
import { formatMoney } from '../../lib/format';

/**
 * Verhaltens- und emotionale Störungen mit Beginn in Kindheit und Jugend (VersMedV Teil B Nr. 3.5): tief greifende
 * Entwicklungsstörungen (3.5.1, Autismus) und hyperkinetische Störungen (3.5.2, ADHS); Teilleistungsschwächen
 * (3.4.2); Hilflosigkeit bei Kindern nach Teil A Nr. 5 d bb. Werte aus tabelle.json, Kombinationen vom Motor.
 */
const eur = (x: number) => formatMoney(x, 0, 'de');
const au = eintrag('autismus')!.stufen;
const ad = eintrag('adhs')!.stufen;
const le = eintrag('legasthenie')!.stufen;
const sp = (s: { von: number; bis: number }) => (s.von === s.bis ? `${s.von}` : `${s.von} bis ${s.bis}`);
const r = (x: { min: number; max: number }) => (x.min === x.max ? `${x.min}` : `${x.min} bis ${x.max}`);
const adhsDepression = gesamtGdb([{ system: 'psyche', gdb: 30 }, { system: 'psyche', gdb: 30, beziehung: 'teilweise' }]);
const autismusEpilepsie = gesamtGdb([{ system: 'psyche', gdb: 50 }, { system: 'psyche', gdb: 40, beziehung: 'unabhaengig' }]);

export default defineGuide({
  id: 'gdb-adhs-autismus',
  group: 'tabelle',
  order: 635,
  mini: 'kind',
  miniDefaults: { g: 50, h: 1, z: 70000 },
  miniHref: 'pauschbetrag-kind',
  related: ['pauschbetrag-kind', 'gdb-depression', 'merkzeichen-h', 'gdb-tabelle', 'gdb-50', 'home'],
  sources: ['versmedv', 'sgb9_152', 'estg33b', 'sgb9_2'],
  de: {
    slug: 'gdb-adhs-autismus',
    nav: 'ADHS und Autismus',
    card: 'ADHS, Autismus und Asperger nach Teil B Nr. 3.5: welche Werte gelten, was soziale Anpassungsschwierigkeiten sind, Merkzeichen H.',
    title: 'GdB ADHS und Autismus 2026: Werte für Kinder und Erwachsene',
    description: 'GdB bei ADHS und Autismus 2026 nach VersMedV Teil B Nr. 3.5: Werte nach sozialen Anpassungsschwierigkeiten, Grenze ab 25 Jahren, Merkzeichen H, Pauschbetrag.',
    h1: 'GdB bei ADHS, Autismus und Asperger-Syndrom',
    intro: 'Nicht die Diagnose zählt, sondern wie sehr sie Kindergarten, Schule, Arbeit und Alltag erschwert.',
    resume: `ADHS und Autismus stehen in Teil B Nummer 3.5 der Versorgungsmedizin-Verordnung, bei den Störungen mit Beginn in Kindheit und Jugend. Beide werden nicht nach der Diagnose bewertet, sondern nach den sozialen Anpassungsschwierigkeiten: wie weit ein Kind oder Erwachsener ohne besondere Förderung in Kindergarten, Schule, Arbeit und öffentlichem Leben zurechtkommt. Bei Autismus und Asperger-Syndrom reichen die Werte von ${sp(au[0])} ohne solche Schwierigkeiten über ${sp(au[1])} bei leichten und ${sp(au[2])} bei mittleren bis zu ${sp(au[3])} bei schweren Schwierigkeiten. Bei ADHS liegt ohne soziale Anpassungsschwierigkeiten keine Teilhabebeeinträchtigung vor; mit ihnen liegen die Werte je nach Schwere zwischen ${ad[0].von} und ${ad[3].bis}, ab 25 Jahren in der Regel höchstens 50. Ein autistisches Kind mit wenigstens 50 gilt bis zum 18. Geburtstag regelhaft als hilflos, Merkzeichen H; dann steht ein Pauschbetrag von ${eur(pauschbetrag(50, ['H']))} im Jahr zu, den die Eltern übernehmen können.`,
    faqs: [
      { q: 'Bekommt man mit einer ADHS-Diagnose automatisch einen GdB?', a: 'Nein. Nummer 3.5.2 sagt ausdrücklich: Ohne soziale Anpassungsschwierigkeiten liegt keine Teilhabebeeinträchtigung vor. Eine Diagnose nach ICD-10-GM ist Voraussetzung, aber bewertet wird, was sie im Alltag bewirkt, etwa ob ein Kind nur mit Schulbegleitung am Unterricht teilnehmen kann oder mehr Aufsicht braucht als Gleichaltrige. Berichte von Schule, Kita und Therapeuten zählen deshalb oft mehr als der Arztbrief.' },
      { q: 'Warum ist der GdB bei ADHS ab 25 Jahren begrenzt?', a: `Die Verordnung bestimmt in Nummer 3.5.2, dass der Wert ab dem Alter von 25 Jahren regelhaft nicht mehr als 50 beträgt. Für Kinder und Jugendliche reicht die Skala bis ${ad[3].bis}. Hinter der Grenze steht die Annahme, dass sich die Folgen im Erwachsenenalter meist verringern. „Regelhaft“ heißt aber nicht ausnahmslos; kommen eigenständige Leiden wie eine Depression hinzu, werden sie gesondert bewertet.` },
      { q: 'Was bedeuten mittlere soziale Anpassungsschwierigkeiten bei Autismus?', a: `Nach Nummer 3.5.1 liegen sie insbesondere vor, wenn die Eingliederung in Lebensbereiche wie Regel-Kindergarten, Regel-Schule oder allgemeinen Arbeitsmarkt nicht ohne umfassende Unterstützung möglich ist, zum Beispiel einen Integrationshelfer. Dann gilt ${sp(au[2])}. Leichte Schwierigkeiten mit ${sp(au[1])} bestehen, wenn besondere Förderung nötig ist; schwere mit ${sp(au[3])}, wenn auch umfassende Unterstützung die Teilhabe nicht ermöglicht.` },
      { q: 'Gibt es für ein autistisches Kind das Merkzeichen H?', a: `Ja, wenn der Autismus für sich allein mindestens 50 ergibt. Teil A Nummer 5 der Verordnung nimmt bei tief greifenden Entwicklungsstörungen dieser Schwere regelhaft Hilflosigkeit bis zum 18. Lebensjahr an. Mit H steht der erhöhte Pauschbetrag von ${eur(pauschbetrag(50, ['H']))} zu, den die Eltern nach § 33b Absatz 5 EStG übernehmen können, dazu die Freifahrt im Nahverkehr mit kostenloser Wertmarke.` },
      { q: 'Werden Legasthenie oder Dyskalkulie neben ADHS bewertet?', a: `Ja, als eigene Teilleistungsschwäche nach Nummer 3.4.2. Leichte Formen ohne wesentliche Beeinträchtigung der Schulleistungen ergeben ${sp(le[0])}, sonst ${sp(le[1])} bis zum Ausgleich, besonders schwere und seltene Formen ${le[2].von}. Die Verordnung erwähnt dabei Konzentrations- und Aufmerksamkeitsstörungen; was beim ADHS-Wert schon berücksichtigt ist, darf beim Gesamt-GdB nicht ein zweites Mal zählen.` },
    ],
    body: (h) => `
<h2>Die Werte im Überblick</h2>
${h.table(['Folgen im Alltag', 'Autismus, Asperger (3.5.1)', 'ADHS, ADS (3.5.2)'], [
  ['keine sozialen Anpassungsschwierigkeiten', sp(au[0]), 'kein GdB'],
  ['Schwierigkeiten ohne Auswirkung auf die Integrationsfähigkeit', '–', sp(ad[0])],
  ['leichte Schwierigkeiten, besondere Förderung nötig', sp(au[1]), sp(ad[1])],
  ['umfassende Unterstützung nötig, etwa Integrationshelfer', sp(au[2]), sp(ad[2])],
  ['Teilhabe auch mit umfassender Unterstützung nicht möglich', sp(au[3]), sp(ad[3])],
], 'VersMedV Teil B Nr. 3.5.1 und 3.5.2; bei ADHS ab 25 Jahren regelhaft höchstens 50', ['l', 'r', 'r'])}
<p>Beide Skalen messen dasselbe: wie weit ein Mensch in den Lebensbereichen mitkommt, die die Verordnung aufzählt, also Regel-Kindergarten, Regel-Schule, allgemeiner Arbeitsmarkt, öffentliches Leben und häusliches Leben. Bei ADHS zählt zusätzlich, ob jemand mehr Beaufsichtigung braucht, als seinem Alter entspricht. Eine pauschale Festsetzung nach dem Lebensalter schließt Nummer 3.5 aus, und eine Behinderung liegt erst ab dem Beginn der Teilhabebeeinträchtigung vor, nicht schon ab der Diagnose.</p>
<!--mini:zwei-->
<h2>Was das Amt sehen will</h2>
<p>Die Verordnung verlangt, dass die Kriterien der ICD-10-GM erfüllt sind; die Diagnose muss also von einer Fachärztin, einem Kinder- und Jugendpsychiater oder einem sozialpädiatrischen Zentrum gestellt sein. Für die Höhe des Wertes entscheidend sind aber die Belege für die Folgen: Berichte aus Kita oder Schule, Bescheide über Eingliederungshilfe oder eine Schulbegleitung, Förderpläne, Zeugnisbemerkungen, bei Erwachsenen Berichte über Arbeitsplatzwechsel, Abbrüche oder betreutes Wohnen. Ein Integrationshelfer ist in der Verordnung selbst als Beispiel für umfassende Unterstützung genannt; wer einen hat, sollte den Bewilligungsbescheid beilegen.</p>
<h2>Begleitende Leiden zählen gesondert</h2>
<p>Komorbide psychische Störungen sind nach Nummer 3.5 gesondert zu berücksichtigen. Viele Menschen mit ADHS haben zusätzlich eine Depression, eine Angststörung oder eine Lese-Rechtschreib-Schwäche. Diese Leiden gehören zum selben Funktionssystem, überschneiden sich in ihren Folgen aber oft nur teilweise. Eine ADHS mit 30 und eine Depression mit 30, die sich teilweise überschneiden, ergeben eine Spanne von ${r(adhsDepression)}. Kommt zu einem Autismus eine Epilepsie hinzu, gehört sie zwar zum selben Funktionssystem Gehirn und Psyche, hat aber eigene Folgen: Ein Autismus mit 50 und ein davon unabhängiges Anfallsleiden mit 40 ergeben ${r(autismusEpilepsie)}. Wie Depressionen bewertet werden, erklärt die Seite ${h.a('gdb-depression', 'Depression und Psyche')}.</p>
<h2>Kinder: Merkzeichen H und Pauschbetrag</h2>
<p>Für Kinder und Jugendliche hat Teil A Nummer 5 eigene Regeln zur Hilflosigkeit. Berücksichtigt wird nur der Hilfebedarf, der über den eines gesunden gleichaltrigen Kindes hinausgeht; dazu zählen auch Anleitung, Überwachung und Förderung. Bei tief greifenden Entwicklungsstörungen, die für sich allein mindestens 50 bedingen, ist Hilflosigkeit bis zum 18. Lebensjahr regelhaft anzunehmen. Dasselbe gilt für andere, gleich schwere Verhaltens- und emotionale Störungen mit Beginn im Kindesalter und lang andauernden erheblichen Einordnungsschwierigkeiten; darunter kann auch eine schwere ADHS fallen.</p>
<p>Mit dem Merkzeichen H steigt der Pauschbetrag nach ${h.src('estg33b', '§ 33b EStG')} auf ${eur(pauschbetrag(50, ['H']))} im Jahr, ohne H sind es bei GdB 50 ${eur(pauschbetrag(50))}. Das Kind zahlt selten Steuern, deshalb können die Eltern den Betrag übernehmen; der Rechner oben zeigt, was das bei ihrem Einkommen spart. Die Regeln der Übertragung stehen auf der Seite ${h.a('pauschbetrag-kind', 'Pauschbetrag Kind')}, die Voraussetzungen von H auf der Seite ${h.a('merkzeichen-h', 'Merkzeichen H')}.</p>
<h2>Erwachsene mit ADHS oder Autismus</h2>
<p>Bei Erwachsenen verschiebt sich der Blick auf Ausbildung, Arbeit und Wohnen. Wer etwa nur in einer Werkstatt oder mit Arbeitsassistenz arbeiten kann, braucht Unterstützung, die das Amt als umfassend werten kann. Für ADHS gilt die Grenze von 50 ab 25 Jahren; für Autismus kennt die Verordnung keine Altersgrenze. Ab 50 gelten die Rechte schwerbehinderter Menschen am Arbeitsplatz, mit 30 oder 40 ist eine ${h.a('gleichstellung', 'Gleichstellung')} möglich, wenn der Arbeitsplatz wegen der Behinderung gefährdet ist. Was ab welchem Wert gilt, zeigt die Seite ${h.a('gdb-50', 'GdB 50')}.</p>
<h2>Drei Beispiele</h2>
<p>Ein Junge, 8 Jahre, mit frühkindlichem Autismus besucht die Regelschule nur mit Schulbegleitung, die über die Eingliederungshilfe bewilligt ist: mittlere soziale Anpassungsschwierigkeiten, ${sp(au[2])}. Liegt der Wert bei 50 oder mehr, kommt H bis zum 18. Geburtstag hinzu. Eine Schülerin, 14 Jahre, mit ADHS braucht deutlich mehr Aufsicht als Gleichaltrige und hat in Schule und Freizeit wiederholt Konflikte, kommt aber ohne Begleitung aus: ${sp(ad[1])}. Ein Softwareentwickler, 34 Jahre, mit Asperger-Syndrom arbeitet ohne Unterstützung, meidet aber Besprechungen und öffentliche Veranstaltungen: Je nachdem, ob das Amt darin leichte soziale Anpassungsschwierigkeiten sieht, liegt er bei ${sp(au[0])} oder ${sp(au[1])}.</p>
<h2>Feststellung und Überprüfung</h2>
<p>Der GdB wird nach ${h.src('sgb9_152', '§ 152 SGB IX')} auf Antrag beim Versorgungsamt festgestellt, bei Kindern durch die Eltern. Weil sich die Folgen mit dem Alter ändern, kann ein Bescheid für ein Kind später überprüft und neu festgesetzt werden. Werden die Schwierigkeiten größer, lohnt ein Änderungsantrag mit neuen Berichten; die Risiken erklärt die Seite ${h.a('verschlimmerungsantrag', 'Verschlimmerungsantrag')}. Über die Höhe entscheidet das Amt, nicht dieser Rechner; die Spannen der Verordnung lassen Raum für den Einzelfall.</p>
`,
  },
});
