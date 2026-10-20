import { defineGuide } from '../../lib/guide-types';
import { eintrag } from '../../lib/engine/tabelle';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { pauschbetrag } from '../../lib/engine/rechte';
import { formatMoney } from '../../lib/format';

/**
 * Diabetes mellitus (VersMedV Teil B Nr. 15.1): Bewertung nach Therapieaufwand und Einschnitten in der
 * Lebensführung, nicht nach HbA1c. Eigene Beispiele: Metformin, Basalinsulin, intensivierte Therapie, Diabetes
 * mit Bluthochdruck und mit Polyneuropathie. Werte aus tabelle.json, Kombinationen vom Motor.
 */
const eur = (x: number) => formatMoney(x, 0, 'de');
const dm = eintrag('diabetes')!;
const [s0, s1, s2, s3] = dm.stufen;
const sp = (s: { von: number; bis: number }) => (s.von === s.bis ? `${s.von}` : `${s.von} bis ${s.bis}`);
const r = (x: { min: number; max: number }) => (x.min === x.max ? `${x.min}` : `${x.min} bis ${x.max}`);
const mitHerz = gesamtGdb([{ system: 'stoffwechsel', gdb: s3.von }, { system: 'herz', gdb: 20, beziehung: 'nachteilig' }]);
const mitAugen = gesamtGdb([{ system: 'stoffwechsel', gdb: s2.bis }, { system: 'augen', gdb: 30, beziehung: 'nachteilig' }]);
const typ2 = gesamtGdb([{ system: 'stoffwechsel', gdb: s1.von }, { system: 'herz', gdb: 20, beziehung: 'unabhaengig' }]);

export default defineGuide({
  id: 'gdb-diabetes',
  group: 'tabelle',
  order: 610,
  mini: 'zwei',
  miniDefaults: { a: 40, b: 20, z: 1 },
  miniHref: 'home',
  related: ['gdb-tabelle', 'gdb-herz', 'gdb-50', 'pauschbetrag-kind', 'verschlimmerungsantrag', 'home'],
  sources: ['versmedv', 'sgb9_152', 'estg33b'],
  de: {
    slug: 'gdb-diabetes',
    nav: 'Diabetes',
    card: 'Typ 1 und Typ 2: welcher GdB nach Therapieaufwand gilt, warum der HbA1c allein nicht zählt und wann 50 erreicht ist.',
    title: 'GdB Diabetes 2026: Typ 1, Typ 2, Insulin und Tabelle',
    description: `GdB bei Diabetes 2026 nach VersMedV Teil B Nr. 15.1: ${s0.von} ohne Unterzuckerungsrisiko, ${sp(s1)}, ${sp(s2)} oder ${s3.von} je nach Therapieaufwand. Was dokumentiert sein muss.`,
    h1: 'GdB bei Diabetes: was der Therapieaufwand ausmacht',
    intro: 'Beim Diabetes bewertet die Verordnung nicht den Blutzucker, sondern den Aufwand der Behandlung und die Einschnitte im Alltag.',
    resume: `Den GdB bei Diabetes mellitus regelt Teil B Nummer 15.1 der Versorgungsmedizin-Verordnung in vier Stufen, gleich ob Typ 1 oder Typ 2. Maßgeblich ist, ob die Therapie Unterzuckerungen auslösen kann, wie oft der Blutzucker gemessen werden muss und wie stark die Lebensführung eingeschränkt ist. Kann die Behandlung regelhaft keine Unterzuckerung auslösen, etwa mit Diät oder Metformin allein, beträgt der Wert ${s0.von}. Kann sie eine Unterzuckerung auslösen und schränkt sie die Lebensführung ein, sind es ${sp(s1)}. Wer zusätzlich mindestens einmal täglich dokumentiert messen muss und weitere Einschnitte hat, erhält ${sp(s2)}. Mindestens vier Insulininjektionen am Tag mit selbst angepasster Dosis, dokumentiert, und gravierende Einschnitte ergeben ${s3.von}, also die Schwerbehinderung. Außergewöhnlich schwer einstellbare Verläufe können höher bewertet werden. Folgeschäden an Augen, Nieren, Nerven oder Gefäßen werden als eigene Leiden bewertet. Ab GdB ${s1.von} gibt es ${eur(pauschbetrag(s1.von))} Pauschbetrag im Jahr.`,
    faqs: [
      { q: 'Bekommt man mit Insulinpumpe automatisch GdB 50?', a: `Nein. Die Pumpe ersetzt die Injektionen; entscheidend ist wie bei der Spritze, ob die Dosis täglich selbst nach Blutzucker, Mahlzeit und Bewegung angepasst wird, ob Messungen und Insulingaben dokumentiert sind und ob die Lebensführung gravierend eingeschränkt ist. Erst wenn alle Voraussetzungen der höchsten Stufe erfüllt sind, beträgt der Wert ${s3.von}. Sonst bleibt es bei ${sp(s2)}.` },
      { q: 'Zählt der HbA1c-Wert für den GdB?', a: `Nicht als Grenzwert. Die Verordnung nennt bei der Stufe ${sp(s2)} die „Güte der Stoffwechseleinstellung“ als einen Gesichtspunkt für die Höhe innerhalb der Spanne, ein bestimmter HbA1c löst aber keine Stufe aus. Ein schlecht eingestellter Diabetes kann allenfalls zu den außergewöhnlich schwer regulierbaren Stoffwechsellagen gehören, für die höhere Werte möglich sind.` },
      { q: 'Was heißt „Einschnitte in der Lebensführung“?', a: 'Die Verordnung meint Einschränkungen durch die Behandlung im Alltag: feste Zeiten für Mahlzeiten und Spritzen, Messungen vor dem Autofahren oder Sport, Vorsicht bei Schichtarbeit, Planung von Reisen. Je mehr der Tagesablauf nach der Therapie ausgerichtet werden muss, desto höher die Stufe. Schildern Sie das im Antrag konkret; ein Arztbericht mit Therapieplan und Messprotokoll belegt es.' },
      { q: 'Wie werden Folgeschäden des Diabetes bewertet?', a: `Getrennt, in ihrem eigenen Funktionssystem: eine Retinopathie bei den Augen, eine Nephropathie bei den Nieren, eine Polyneuropathie beim Nervensystem. Dann gilt die Regel für den Gesamt-GdB. Weil Folgeschäden und Diabetes sich gegenseitig verschlimmern können, kommt oft eine Erhöhung in Betracht: Ein Diabetes mit ${s2.bis} und eine Sehminderung mit 30, die sich verstärken, ergeben nach diesem Rechner ${r(mitAugen)}.` },
    ],
    body: (h) => `
<h2>Die vier Stufen</h2>
${h.table(['Therapie und Alltag', 'GdB'], [
  ['Therapie kann regelhaft keine Unterzuckerung auslösen (z. B. Diät, Metformin allein)', sp(s0)],
  ['Therapie kann Unterzuckerung auslösen, Einschnitte in der Lebensführung', sp(s1)],
  ['dazu mindestens einmal täglich dokumentierte Messung, weitere Einschnitte', sp(s2)],
  ['mindestens vier Injektionen täglich mit selbst angepasster Dosis, dokumentiert, gravierende Einschnitte', sp(s3)],
], 'Diabetes mellitus nach Teil B Nr. 15.1, Wortlaut gekürzt', ['l', 'r'])}
<p>Wichtig ist, was die Tabelle nicht tut: Sie unterscheidet nicht nach Typ 1 und Typ 2, nicht nach Krankheitsdauer und nicht nach Laborwerten. Zwei Menschen mit derselben Diagnose können deshalb ganz unterschiedliche Werte erhalten, je nachdem, wie sie behandelt werden. Die Beispiele in der ersten Zeile stehen nicht im Text der Verordnung; sie zeigen nur, welche Behandlungen in der Regel keine Unterzuckerung auslösen. Ob ein Medikament dazu gehört, ergibt sich aus dem Arztbericht. Sulfonylharnstoffe und Insulin können Unterzuckerungen auslösen und führen deshalb mindestens in die zweite Stufe, wenn die Lebensführung eingeschränkt ist.</p>
<h2>Drei typische Verläufe</h2>
<p>Ein 58-Jähriger mit Typ-2-Diabetes nimmt Metformin und achtet auf die Ernährung. Seine Therapie löst keine Unterzuckerung aus; nach der Tabelle ergibt der Diabetes keinen GdB, auch wenn er seit Jahren besteht. Erst ein Folgeschaden oder eine Umstellung auf Insulin ändert das.</p>
<p>Eine 45-Jährige spritzt abends ein Basalinsulin und misst jeden Morgen, dokumentiert in einer App. Sie muss Mahlzeiten und Sport planen und hatte mehrere leichte Unterzuckerungen. Das passt zur Stufe ${sp(s2)}; wo innerhalb der Spanne, hängt von Aufwand und Einstellung ab.</p>
<p>Ein 30-Jähriger mit Typ-1-Diabetes nutzt eine Pumpe mit Sensor, passt die Dosis zu jeder Mahlzeit und bei Bewegung selbst an und dokumentiert alles. Wenn er zudem gravierende Einschnitte im Alltag belegt, etwa durch Schichtdienst oder häufige Unterzuckerungen, beträgt der Wert ${s3.von}.</p>
<h2>Was die Behörde sehen will</h2>
<p>Für die beiden oberen Stufen verlangt die Verordnung Dokumentation: die täglichen Messungen und, für ${s3.von}, die Insulindosen oder Pumpengaben. Ein Ausdruck aus dem Messgerät oder der App über einige Wochen und der Bericht der Diabetespraxis mit Therapieplan sind die wichtigsten Unterlagen. Beschreiben Sie im Antrag selbst, was der Diabetes im Alltag erzwingt: Unterzuckerungen und wie oft sie auftreten, Einschränkungen im Beruf, beim Fahren, beim Sport. Die Verordnung bewertet den Aufwand, also muss er sichtbar sein.</p>
<!--mini:stufe-->
<h2>Diabetes zusammen mit anderen Leiden</h2>
<p>Viele Menschen mit Typ-2-Diabetes haben auch Bluthochdruck oder ein Herzleiden. Ein Diabetes mit ${s1.von} und ein leichter Bluthochdruck mit 20 betreffen verschiedene Organe, erhöhen nach Teil A Nummer 3.5 aber vielfach nicht: Die Spanne liegt bei ${r(typ2)}. Bei intensivierter Insulintherapie mit ${s3.von} und einem Herzleiden mit 20, das sich mit dem Diabetes verstärkt, liegt sie bei ${r(mitHerz)}. Die Werte für das Herz finden Sie unter ${h.a('gdb-herz', 'Herz und Kreislauf')}.</p>
<p>Diabetische Folgeschäden sind eigene Leiden, und hier hilft die Unterscheidung der Verordnung: Folgen, die die Auswirkungen des Diabetes verstärken, wirken nach Nummer 3.3.1 in der Regel erhöhend. Ein Diabetes mit ${s2.bis} und eine diabetische Sehminderung mit 30 ergeben ${r(mitAugen)}. Den genauen Wert für Ihre Kombination zeigt der ${h.a('home', 'Gesamt-GdB-Rechner')}.</p>
<h2>Kinder mit Diabetes</h2>
<p>Bei Kindern gilt dieselbe Tabelle, doch Teil A Nummer 5 der Verordnung enthält eine eigene Regel: „Beim Diabetes mellitus ist Hilflosigkeit bis zur Vollendung des 16. Lebensjahres anzunehmen.“ Kinder mit Diabetes erhalten deshalb bis zu ihrem 16. Geburtstag in der Regel das Merkzeichen H, weil Messungen, Insulingaben und Mahlzeiten von Erwachsenen angeleitet und überwacht werden müssen. Mit H steigt der Pauschbetrag auf ${h.eur(h.P.pauschbetrag.erhoeht)}, die Wertmarke für die Freifahrt ist kostenlos, und die Fahrtkostenpauschale beträgt ${h.eur(h.P.fahrtkosten.gross)}.</p>
<p>Den Pauschbetrag des Kindes können die Eltern in ihrer eigenen Steuererklärung geltend machen, je zur Hälfte oder auf gemeinsamen Antrag anders verteilt: ${h.a('pauschbetrag-kind', 'Pauschbetrag des Kindes übertragen')}. Mit dem 16. Geburtstag endet die Annahme der Hilflosigkeit; die Behörde prüft dann neu, welcher GdB nach dem Therapieaufwand gilt und ob weitere Merkzeichen vorliegen. Es lohnt sich, die Befristung im Ausweis im Blick zu behalten und rechtzeitig vorher aktuelle Berichte zu sammeln.</p>
<h2>Wenn sich die Therapie ändert</h2>
<p>Der GdB folgt der Therapie. Wer von Tabletten auf Insulin umgestellt wird, sollte einen ${h.a('verschlimmerungsantrag', 'Verschlimmerungsantrag')} stellen, sobald die neue Behandlung einige Monate läuft und dokumentiert ist. Umgekehrt kann eine Behörde den Wert senken, wenn eine Gewichtsabnahme oder eine Operation die Insulinpflicht beendet. Eine wesentliche Änderung liegt nach Teil A Nummer 7 nur vor, wenn der neue Zustand mehr als sechs Monate anhält oder voraussichtlich anhalten wird und sich der Wert um wenigstens 10 ändert. Wer die Stufe ${s2.von} bis ${s2.bis} erreicht hat, ist noch nicht schwerbehindert; bei GdB ${s2.von} oder ${s2.bis} kommt im Beruf die Gleichstellung in Frage.</p>
`,
  },
});
