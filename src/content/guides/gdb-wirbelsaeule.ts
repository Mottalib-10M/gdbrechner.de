import { defineGuide } from '../../lib/guide-types';
import { eintrag } from '../../lib/engine/tabelle';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { pauschbetrag } from '../../lib/engine/rechte';
import { formatMoney } from '../../lib/format';

/**
 * Wirbelsäule und Bandscheibe (VersMedV Teil B Nr. 18.9). Stufen aus tabelle.json; eigene Beispiele:
 * Lendenwirbelsäule allein, zwei Abschnitte, Rücken mit Kniearthrose, Rücken mit Depression.
 */
const eur = (x: number) => formatMoney(x, 0, 'de');
const ws = eintrag('wirbelsaeulenschaeden')!;
const st = ws.stufen;
const sp = (s: { von: number; bis: number }) => (s.von === s.bis ? `${s.von}` : `${s.von} bis ${s.bis}`);
const zweiAbschnitte = gesamtGdb([{ system: 'wirbelsaeule', gdb: 30 }, { system: 'wirbelsaeule', gdb: 20, beziehung: 'teilweise' }]);
const mitKnie = gesamtGdb([{ system: 'wirbelsaeule', gdb: 30 }, { system: 'beine', gdb: 20, beziehung: 'teilweise' }]);
const mitPsyche = gesamtGdb([{ system: 'wirbelsaeule', gdb: 30 }, { system: 'psyche', gdb: 30, beziehung: 'unabhaengig' }]);
const r = (x: { min: number; max: number }) => (x.min === x.max ? `${x.min}` : `${x.min} bis ${x.max}`);

export default defineGuide({
  id: 'gdb-wirbelsaeule',
  group: 'tabelle',
  order: 600,
  mini: 'zwei',
  miniDefaults: { a: 30, b: 20, z: 2 },
  miniHref: 'home',
  related: ['gdb-tabelle', 'gdb-knie-huefte', 'gdb-30', 'verschlimmerungsantrag', 'merkzeichen-g', 'home'],
  sources: ['versmedv', 'bgbl2025', 'sgb9_152'],
  de: {
    slug: 'gdb-wirbelsaeule',
    nav: 'Wirbelsäule und Bandscheibe',
    card: 'Bandscheibenvorfall, Spinalkanalstenose, Skoliose: welche Stufe von Teil B Nr. 18.9 passt und wie Rückenleiden mit anderen zusammenwirken.',
    title: 'GdB Wirbelsäule 2026: Bandscheibe, Stenose, Tabelle',
    description: `GdB Wirbelsäule 2026 nach VersMedV Nr. 18.9: ${st[1].von} bis ${st[6].bis} je nach Funktion und Zahl der Abschnitte. Was bei Bandscheibenvorfall und Stenose wirklich zählt.`,
    h1: 'GdB bei Wirbelsäule und Bandscheibe',
    intro: 'Für den Rücken zählt nicht die Diagnose, sondern wie stark und in wie vielen Abschnitten die Wirbelsäule eingeschränkt ist.',
    resume: `Wirbelsäulenschäden bewertet die Versorgungsmedizin-Verordnung in Teil B Nummer 18.9, und zwar für alle Ursachen gemeinsam: Bandscheibenvorfall, Scheuermann-Krankheit, Spondylolisthesis, Spinalkanalstenose und Postdiskotomiesyndrom. Maßgeblich sind das Ausmaß der Bewegungseinschränkung, Verformung und Instabilität und die Zahl der betroffenen Abschnitte (Hals-, Brust- und Lendenwirbelsäule). Geringe funktionelle Auswirkungen ergeben ${sp(st[1])}, mittelgradige in einem Abschnitt ${sp(st[2])}, schwere in einem Abschnitt ${sp(st[3])}, mittelgradige bis schwere in zwei Abschnitten ${sp(st[4])}. Besonders schwere Auswirkungen, etwa eine Versteifung großer Teile der Wirbelsäule oder eine schwere Skoliose, führen zu ${sp(st[5])}. Nervenausfälle durch Wurzelkompression und außergewöhnliche Schmerzsyndrome sind zusätzlich zu berücksichtigen. Ein Rückenleiden mit 30 und eine Depression mit 30, die verschiedene Lebensbereiche betreffen, ergeben zusammen meist ${mitPsyche.richt}. Für einen GdB von 30 gibt es ${eur(pauschbetrag(30))} Pauschbetrag im Jahr.`,
    faqs: [
      { q: 'Welchen GdB gibt ein Bandscheibenvorfall?', a: `Keinen festen. Ein Bandscheibenvorfall wird wie jeder Wirbelsäulenschaden nach seinen Folgen bewertet: Ein ausgeheilter Vorfall ohne Bewegungseinschränkung ergibt ${sp(st[0])}, häufig wiederkehrende, über Tage andauernde Beschwerden in einem Abschnitt ${sp(st[2])}, wochenlange ausgeprägte Beschwerden ${sp(st[3])}. Bleiben Lähmungen oder Taubheit durch eine eingeklemmte Nervenwurzel, kommt ein Wert für den Nervenausfall hinzu.` },
      { q: 'Zählen Hals- und Lendenwirbelsäule getrennt?', a: `Nein. Die Wirbelsäule ist ein Funktionssystem, und die Verordnung nennt eigene Werte für zwei betroffene Abschnitte: ${sp(st[4])} bei mittelgradigen bis schweren Auswirkungen. Zwei Einzelwerte für Hals und Lende werden also nicht nebeneinander gestellt, sondern zu einem Wirbelsäulenwert zusammengefasst. Im Rechner ergeben 30 und 20 im selben Bereich ${r(zweiAbschnitte)}.` },
      { q: 'Was bedeutet „Instabilität“ in der Tabelle?', a: 'Die Verordnung meint damit eine abnorme Beweglichkeit zweier Wirbel gegeneinander unter normaler Belastung und die daraus folgenden Weichteilveränderungen und Schmerzen. Sie wird wie eine Bewegungseinschränkung gewertet, in den Stufen gering, mittel und schwer. Belegt wird sie meist durch Funktionsaufnahmen im Röntgen und durch die klinische Untersuchung, nicht allein durch Schmerzangaben.' },
      { q: 'Warum ist mein Rückenleiden mit nur 10 bewertet?', a: 'Weil die Behörde nur geringe funktionelle Auswirkungen festgestellt hat, etwa seltene und kurz dauernde Beschwerden. Für chronisch wiederkehrende Bandscheibensyndrome verlangt die Verordnung aussagekräftige Befunde über einen ausreichend langen Zeitraum, weil die Untersuchung im beschwerdefreien Intervall wenig zeigt. Ein Schmerztagebuch und Berichte über Behandlungen in akuten Phasen helfen dabei mehr als ein einzelnes MRT.' },
      { q: 'Kann ein Rückenleiden zum Merkzeichen G führen?', a: 'Ja, wenn es das Gehvermögen so stark einschränkt, dass übliche Wege im Ortsverkehr nicht ohne erhebliche Schwierigkeiten möglich sind. Das ist vor allem bei Spinalkanalstenose mit neurogenem Hinken oder bei Nervenausfällen in den Beinen der Fall. Nach Teil D der Verordnung gilt G als erfüllt, wenn Funktionsstörungen der Beine und der Lendenwirbelsäule für sich einen GdB von wenigstens 50 bedingen; darunter nur in besonderen Fällen.' },
    ],
    body: (h) => `
<h2>Die Stufen von Nummer 18.9</h2>
${h.table(['Auswirkungen', 'GdB'], st.map((s) => [s.text.split(' (')[0], sp(s)]), 'Wirbelsäulenschäden nach Teil B Nr. 18.9, Wortlaut gekürzt', ['l', 'r'])}
<p>Die Klammerzusätze der Verordnung erklären, was „mittelgradig“ und „schwer“ bedeutet: bei mittelgradigen Auswirkungen häufig wiederkehrende oder anhaltende Bewegungseinschränkung oder Instabilität mittleren Grades und über Tage andauernde Wirbelsäulensyndrome, bei schweren dasselbe in schwerem Grad und über Wochen. Den vollständigen Wortlaut zeigt die ${h.a('gdb-tabelle', 'GdB-Tabelle')} beim Eintrag Wirbelsäulenschäden.</p>
<h2>Was zusätzlich zählt</h2>
<p>Die Tabelle beschreibt die Wirbelsäule selbst. Drei Dinge kommen nach dem Text von Nummer 18.9 hinzu: anhaltende Funktionsstörungen durch Wurzelkompression mit motorischen Ausfällen, die zeitweisen Störungen bei Spinalkanalstenose und Auswirkungen auf innere Organe, etwa auf die Atmung bei schwerer Skoliose. Bei außergewöhnlichen Schmerzsyndromen kann auch ohne nachweisbare neurologische Ausfälle ein Wert über 30 in Betracht kommen, etwa beim Postdiskotomiesyndrom nach einer Bandscheibenoperation.</p>
<p>Das neurogene Hinken bei Spinalkanalstenose ist nach der Verordnung etwas günstiger zu bewerten als eine vergleichbare Einschränkung der Gehstrecke durch Durchblutungsstörungen der Beine. Für die Beurteilung sind deshalb Angaben zur schmerzfreien Gehstrecke und zur Erholung nach dem Stehenbleiben wichtig.</p>
<h2>Rücken und andere Leiden</h2>
<p>Rückenleiden treffen oft mit Gelenk- oder psychischen Leiden zusammen. Für den Gesamt-GdB kommt es darauf an, wie sie zusammenwirken. Ein Rücken mit 30 und eine Kniearthrose mit 20 überschneiden sich teilweise, weil beide das Gehen und Stehen betreffen: Die Spanne liegt bei ${r(mitKnie)}, und nach Teil A Nummer 3.5 erhöht ein Wert von 20 vielfach nicht. Ein Rücken mit 30 und eine Depression mit 30 betreffen dagegen verschiedene Lebensbereiche und ergeben ${r(mitPsyche)}. Wie die Verordnung diese Zusammenhänge beschreibt, steht auf der ${h.a('home', 'Startseite mit dem Gesamt-GdB-Rechner')}; die Hüfte und das Knie behandelt die Seite ${h.a('gdb-knie-huefte', 'Knie und Hüfte')}.</p>
<!--mini:stufe-->
<h2>Befunde, die die Einstufung tragen</h2>
<p>Die Behörde liest Befundberichte, keine Bilder. Ein MRT zeigt, was an der Wirbelsäule verändert ist, aber nicht, wie stark Sie im Alltag eingeschränkt sind. Hilfreich sind deshalb Berichte, die Beweglichkeit in Zahlen angeben, etwa den Finger-Boden-Abstand oder die Drehung der Halswirbelsäule in Grad, die Häufigkeit und Dauer von Schmerzphasen beschreiben und die Behandlungen nennen: Physiotherapie, Injektionen, Schmerzmittel, Klinikaufenthalte, Arbeitsunfähigkeitszeiten. Die Verordnung betont ausdrücklich, dass bei chronisch wiederkehrenden Bandscheibensyndromen ein ausreichend langer Zeitraum zu betrachten ist.</p>
<p>Hat sich der Rücken seit dem letzten Bescheid verschlechtert, etwa nach einer Operation mit bleibenden Ausfällen oder weil ein zweiter Abschnitt betroffen ist, führt ein ${h.a('verschlimmerungsantrag', 'Verschlimmerungsantrag')} zu einer neuen Bewertung. Bei einem GdB von ${h.a('gdb-30', '30')} aus dem Rücken allein kommt im Beruf die Gleichstellung in Frage.</p>
<h2>Drei Beispiele aus der Tabelle</h2>
<p>Eine Büroangestellte hat seit Jahren wiederkehrende Beschwerden der Lendenwirbelsäule, die mehrmals im Jahr über Tage andauern, mit eingeschränkter Beugung. Das entspricht mittelgradigen Auswirkungen in einem Abschnitt, also ${sp(st[2])}. Kommen Beschwerden der Halswirbelsäule mit ähnlicher Ausprägung hinzu, ist die Stufe für zwei Abschnitte zu prüfen, ${sp(st[4])}.</p>
<p>Ein Handwerker hat nach einer Bandscheibenoperation eine Fußheberschwäche behalten. Die Wirbelsäule selbst ist mäßig eingeschränkt; der bleibende Nervenausfall wird nach der Verordnung zusätzlich berücksichtigt, und das Gehvermögen kann so betroffen sein, dass auch das ${h.a('merkzeichen-g', 'Merkzeichen G')} zu prüfen ist.</p>
<p>Eine Jugendliche mit schwerer Skoliose von über 70 Grad nach Cobb und Korsett über drei Abschnitte fällt in die Stufe der besonders schweren Auswirkungen, ${sp(st[5])}. In diesen Fällen ist oft auch die Lungenfunktion beeinträchtigt, die als weiteres Leiden in den Gesamt-GdB eingeht.</p>
<p>Ein Wort zur Begrifflichkeit: Die Tabelle spricht vom GdS, dem Grad der Schädigungsfolgen im sozialen Entschädigungsrecht. Für den GdB im Schwerbehindertenrecht gelten dieselben Werte; die Verordnung verwendet beide Begriffe nebeneinander. Die Werte der Tabelle sind Anhaltswerte, von denen die Behörde mit Begründung abweichen kann. Wer den Bescheid prüft, findet in dessen Begründung die Einzelwerte je Funktionssystem. Steht dort für den Rücken ein Wert, der nicht zu den beschriebenen Auswirkungen passt, ist das ein Ansatz für den Widerspruch, und zwar mit Befunden, die die Stufe belegen. Ein Hinweis auf die bloße Diagnose oder auf Bilder genügt dafür nicht. Die Frist für den ${h.a('widerspruch-gdb', 'Widerspruch')} beträgt einen Monat ab Bekanntgabe des Bescheids, bei Postversand gilt er am vierten Tag als bekannt gegeben.</p>
`,
  },
});
