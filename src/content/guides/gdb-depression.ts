import { defineGuide } from '../../lib/guide-types';
import { eintrag } from '../../lib/engine/tabelle';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { pauschbetrag } from '../../lib/engine/rechte';
import { formatMoney } from '../../lib/format';

/**
 * Depression, Angst, PTBS (VersMedV Teil B Nr. 3.7) und affektive Psychosen (Nr. 3.6). Werte aus tabelle.json;
 * Kombinationen mit Schmerz- und Rückenleiden vom Motor.
 */
const eur = (x: number) => formatMoney(x, 0, 'de');
const d = eintrag('depression')!.stufen;
const bp = eintrag('affektive-psychose')!.stufen;
const sp = (s: { von: number; bis: number }) => (s.von === s.bis ? `${s.von}` : `${s.von} bis ${s.bis}`);
const r = (x: { min: number; max: number }) => (x.min === x.max ? `${x.min}` : `${x.min} bis ${x.max}`);
const mitRuecken = gesamtGdb([{ system: 'psyche', gdb: 40 }, { system: 'wirbelsaeule', gdb: 30, beziehung: 'unabhaengig' }]);
const mitSchmerz = gesamtGdb([{ system: 'psyche', gdb: 30 }, { system: 'rheuma', gdb: 30, beziehung: 'teilweise' }]);
const mitTinnitus = gesamtGdb([{ system: 'psyche', gdb: 30 }, { system: 'ohren', gdb: 20, beziehung: 'nachteilig' }]);

export default defineGuide({
  id: 'gdb-depression',
  group: 'tabelle',
  order: 630,
  mini: 'zwei',
  miniDefaults: { a: 40, b: 30, z: 0 },
  miniHref: 'home',
  related: ['gdb-tabelle', 'gdb-30', 'gdb-40', 'gleichstellung', 'widerspruch-gdb', 'home'],
  sources: ['versmedv', 'sgb9_2', 'sgb9_151'],
  de: {
    slug: 'gdb-depression',
    nav: 'Depression und Psyche',
    card: 'Depression, Angststörung, PTBS, bipolare Störung: welche Stufe von Teil B Nr. 3.7 passt und warum die Teilhabe zählt, nicht die Diagnose.',
    title: 'GdB Depression 2026: Angst, PTBS und psychische Leiden',
    description: `GdB bei Depression 2026 nach VersMedV Teil B Nr. 3.7: ${sp(d[0])}, ${sp(d[1])}, ${sp(d[2])} oder ${sp(d[3])} je nach Einschränkung, auch bei Angst, PTBS und Phobie.`,
    h1: 'GdB bei Depression und anderen psychischen Leiden',
    intro: 'Psychische Leiden bewertet die Verordnung nach der Einschränkung der Erlebnis- und Gestaltungsfähigkeit und nach den sozialen Folgen.',
    resume: `Depressionen, Angst- und Zwangsstörungen, somatoforme Störungen und die Folgen psychischer Traumen wie eine posttraumatische Belastungsstörung bewertet die Versorgungsmedizin-Verordnung in Teil B Nummer 3.7. Es gibt vier Stufen: Leichtere psychovegetative oder psychische Störungen ergeben ${sp(d[0])}. Stärker behindernde Störungen mit wesentlicher Einschränkung der Erlebnis- und Gestaltungsfähigkeit, etwa eine ausgeprägtere Depression oder Phobie, ergeben ${sp(d[1])}. Schwere Störungen mit mittelgradigen sozialen Anpassungsschwierigkeiten ergeben ${sp(d[2])}, mit schweren ${sp(d[3])}. Maßgeblich ist nicht die Diagnose, sondern wie stark Beruf, Familie, Freizeit und Alltag eingeschränkt sind, belegt durch fachärztliche oder psychotherapeutische Berichte über einen längeren Zeitraum. Bipolare Störungen mit abgegrenzten Phasen stehen in Nummer 3.6 und haben eigene Werte. Eine Depression mit 40 und ein Rückenleiden mit 30 betreffen verschiedene Lebensbereiche und ergeben zusammen meist ${mitRuecken.richt}. Ab GdB 30 gibt es ${eur(pauschbetrag(30))} Pauschbetrag und die Möglichkeit der Gleichstellung.`,
    faqs: [
      { q: 'Welchen GdB bekommt man bei einer mittelgradigen Depression?', a: `Die Verordnung verwendet die Schweregrade der Diagnose nicht. Sie fragt, ob die Erlebnis- und Gestaltungsfähigkeit wesentlich eingeschränkt ist und ob soziale Anpassungsschwierigkeiten bestehen. Eine dauerhaft behandlungsbedürftige Depression mit deutlichen Einschränkungen im Alltag liegt häufig in der Stufe ${sp(d[1])}. Erst mittelgradige soziale Anpassungsschwierigkeiten, etwa eine gefährdete Berufstätigkeit oder ein Rückzug aus fast allen Beziehungen, führen zu ${sp(d[2])}.` },
      { q: 'Was sind „soziale Anpassungsschwierigkeiten“ bei psychischen Leiden?', a: 'Gemeint sind die Folgen des Leidens für Beruf, Familie und Freundschaften. Leichte Schwierigkeiten bestehen, wenn die Berufstätigkeit trotz Problemen erhalten bleibt. Mittelgradige, wenn sie gefährdet ist oder nur noch eingeschränkt möglich, mit Konflikten in Familie und Umfeld. Schwere, wenn eine Berufstätigkeit nicht mehr möglich ist und soziale Beziehungen weitgehend fehlen. Die Verordnung selbst definiert die Begriffe nicht; so werden sie in der Praxis der Behörden und Sozialgerichte verstanden.' },
      { q: 'Zählt eine PTBS wie eine Depression?', a: `Ja, die Folgen psychischer Traumen stehen in derselben Nummer 3.7 und werden nach denselben Stufen bewertet: ${sp(d[0])}, ${sp(d[1])}, ${sp(d[2])} oder ${sp(d[3])}. Entscheidend ist, wie stark Albträume, Vermeidung, Übererregung und Rückzug den Alltag bestimmen. Liegen neben der PTBS eine Depression oder eine Angststörung vor, bilden sie mit ihr ein Funktionssystem und werden dort zu einem Wert zusammengefasst.` },
      { q: 'Wie wird eine bipolare Störung bewertet?', a: `Nach Nummer 3.6 als affektive Psychose: Bei ein bis zwei Phasen im Jahr von mehrwöchiger Dauer ${sp(bp[0])}, bei häufigeren Phasen ${sp(bp[1])}. Nach dem Abklingen gilt eine Heilungsbewährung von zwei Jahren, mit ${bp[2].von}, wenn schon mehrere manische oder manische und depressive Phasen vorangegangen sind, sonst ${bp[3].von}.` },
    ],
    body: (h) => `
<h2>Die Stufen von Nummer 3.7</h2>
${h.table(['Ausprägung', 'GdB'], [
  ['Leichtere psychovegetative oder psychische Störungen', sp(d[0])],
  ['Stärker behindernde Störungen mit wesentlicher Einschränkung der Erlebnis- und Gestaltungsfähigkeit', sp(d[1])],
  ['Schwere Störungen mit mittelgradigen sozialen Anpassungsschwierigkeiten', sp(d[2])],
  ['Schwere Störungen mit schweren sozialen Anpassungsschwierigkeiten', sp(d[3])],
], 'Neurosen, Persönlichkeitsstörungen, Folgen psychischer Traumen nach Teil B Nr. 3.7', ['l', 'r'])}
<p>Die Stufen sind breit, und ihre Grenzen sind fließend. Zwischen 30 und 40 oder zwischen 50 und 70 entscheidet die Behörde nach dem Gesamtbild: Dauer und Häufigkeit der Episoden, Behandlung (ambulant, stationär, Medikamente, Psychotherapie), Arbeitsunfähigkeitszeiten, Einschränkungen in Haushalt, Freizeit und Beziehungen. Ein Bericht, der nur die Diagnose nennt, reicht dafür nicht. Hilfreich ist ein Befundbericht der Psychiaterin oder des Psychotherapeuten, der beschreibt, was im Alltag nicht mehr geht.</p>
<!--mini:stufe-->
<h2>Psychische und körperliche Leiden zusammen</h2>
<p>Psychische Leiden treffen oft mit körperlichen zusammen, und dann ist die Frage der Wechselwirkung entscheidend. Eine Depression mit 40 und ein Rückenleiden mit 30 betreffen in der Regel verschiedene Lebensbereiche; nach Teil A Nummer 3.3.2 führt das „häufig“ zu einer Erhöhung, die Spanne liegt bei ${r(mitRuecken)}. Anders bei chronischen Schmerzen: Eine somatoforme Schmerzstörung mit 30 und ein Fibromyalgie- oder Gelenkleiden mit 30 überschneiden sich teilweise, weil der Schmerz in beiden steckt; die Spanne liegt bei ${r(mitSchmerz)}. Verstärkt ein Leiden das andere, etwa ein Tinnitus mit 20, der eine Depression mit 30 vertieft, kann nach Nummer 3.3.1 auch ein Wert von 20 erhöhen: ${r(mitTinnitus)}.</p>
<p>Die Verordnung achtet darauf, dass dieselbe Beeinträchtigung nicht doppelt zählt. Wird bei einem Schmerzleiden die psychische Verarbeitung schon im Wert des Schmerzes berücksichtigt, gibt es dafür keinen eigenen Wert. Den Zusammenhang wählen Sie im ${h.a('home', 'Gesamt-GdB-Rechner')} für jedes weitere Leiden.</p>
<h2>Beispiele</h2>
<p>Ein 47-jähriger Lehrer ist wegen einer rezidivierenden depressiven Störung seit drei Jahren in Behandlung, mit zwei längeren Arbeitsunfähigkeiten und einer stationären Therapie. Er arbeitet weiter, hat aber Hobbys und Freundschaften weitgehend aufgegeben. Das spricht für eine wesentliche Einschränkung der Erlebnis- und Gestaltungsfähigkeit, ${sp(d[1])}.</p>
<p>Eine 35-jährige Rettungssanitäterin entwickelt nach einem Einsatz eine posttraumatische Belastungsstörung, kann nicht mehr im Beruf arbeiten und meidet öffentliche Orte. Mittelgradige soziale Anpassungsschwierigkeiten liegen nahe, ${sp(d[2])}. Bei einem Arbeitsunfall kommt neben dem GdB auch die gesetzliche Unfallversicherung in Betracht, die nach eigenen Regeln bewertet.</p>
<h2>Antrag und Begutachtung</h2>
<p>Bei psychischen Leiden entscheidet die Behörde häufiger als bei anderen nach einer Begutachtung, weil sich die Einschränkungen schlecht in Messwerten ausdrücken lassen. Der ärztliche Dienst wertet zunächst die Berichte aus; reichen sie nicht, folgt eine Untersuchung durch eine Gutachterin oder einen Gutachter. Gefragt wird nach dem Tagesablauf, nach Antrieb, Konzentration und Schlaf, nach Kontakten, nach der Arbeit und nach dem, was früher möglich war und heute nicht mehr. Es hilft, sich vorher Notizen zu machen: Welche Aufgaben bleiben liegen, welche Situationen meiden Sie, wie oft brauchen Sie Hilfe?</p>
<p>Die Verordnung verlangt, dass die Beeinträchtigung nicht nur vorübergehend ist, also voraussichtlich länger als sechs Monate besteht. Eine einzelne depressive Episode, die nach drei Monaten abklingt, führt daher nicht zu einem GdB. Bei wiederkehrenden Episoden zählt das Bild über einen längeren Zeitraum, auch die Phasen dazwischen. Wer in Behandlung ist, sollte die Behandelnden fragen, ob sie einen ausführlichen Befundbericht für die Behörde schreiben; ein kurzer Vordruck mit Diagnose und Medikation führt oft zu einer niedrigen Einstufung.</p>
<p>Eine Psychotherapie oder eine Rehabilitation wirkt sich nicht nachteilig aus. Bessert sich der Zustand dauerhaft, kann die Behörde den Wert später überprüfen; verschlechtert er sich, ist ein ${h.a('verschlimmerungsantrag', 'Verschlimmerungsantrag')} möglich. Eine wesentliche Änderung setzt voraus, dass sich der Wert um mindestens 10 ändert und der neue Zustand länger als sechs Monate anhält. Wer zwischen zwei Stufen liegt, sollte deshalb nicht jeden Monat einen neuen Antrag stellen, sondern abwarten, bis die Veränderung belegt ist.</p>
<h2>Im Beruf</h2>
<p>Ein GdB von ${h.a('gdb-30', '30')} oder ${h.a('gdb-40', '40')} aus einer Depression allein ist häufig. Er bringt keinen Ausweis, aber die Möglichkeit der ${h.a('gleichstellung', 'Gleichstellung')} durch die Agentur für Arbeit, wenn der Arbeitsplatz wegen der Erkrankung gefährdet ist oder ein neuer nicht zu finden ist. Gleichgestellte haben den besonderen Kündigungsschutz, nicht aber den Zusatzurlaub. Ob Sie den Arbeitgeber informieren, entscheiden Sie selbst.</p>
<p>Wird ein Antrag wegen einer psychischen Erkrankung abgelehnt oder zu niedrig bewertet, lohnt sich ein Blick in die Begründung des Bescheids: Dort steht, welche Stufe die Behörde angenommen hat. Ein ${h.a('widerspruch-gdb', 'Widerspruch')} sollte darlegen, welche Einschränkungen im Alltag die höhere Stufe tragen, mit Berichten, die diese Einschränkungen beschreiben.</p>
`,
  },
});
