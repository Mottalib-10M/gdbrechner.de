import { defineGuide } from '../../lib/guide-types';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { P } from '../../lib/engine/params';

/**
 * Widerspruch gegen den GdB-Bescheid: § 84 SGG (Frist, Form), § 37 SGB X (Bekanntgabe), § 66 SGG (fehlende
 * Belehrung), § 87 SGG (Klage), § 44 SGB X (Überprüfung). Eigene Beispiele: Fristberechnung für einen Bescheid
 * vom 10.09.2026; Widerspruch, der ein übersehenes Leiden nachträgt (Gesamt-GdB vom Motor).
 */
const V = P.verfahren;
const tag = (iso: string, d: number) => { const x = new Date(`${iso}T12:00:00Z`); x.setUTCDate(x.getUTCDate() + d); return x.toISOString().slice(0, 10); };
const monat = (iso: string, m: number) => { const x = new Date(`${iso}T12:00:00Z`); x.setUTCMonth(x.getUTCMonth() + m); return x.toISOString().slice(0, 10); };
const bescheid = '2026-09-10';
const bekannt = tag(bescheid, V.bekanntgabe_tag);
const ende = monat(bekannt, V.widerspruch_monate);
const vorher = gesamtGdb([{ system: 'wirbelsaeule', gdb: 30 }, { system: 'beine', gdb: 20, beziehung: 'teilweise' }]);
const nachher = gesamtGdb([{ system: 'wirbelsaeule', gdb: 30 }, { system: 'beine', gdb: 20, beziehung: 'teilweise' }, { system: 'psyche', gdb: 30, beziehung: 'unabhaengig' }]);

export default defineGuide({
  id: 'widerspruch-gdb',
  group: 'ausweis',
  order: 450,
  mini: 'frist',
  miniDefaults: { t: 20, b: 0 },
  miniHref: 'home',
  related: ['verschlimmerungsantrag', 'schwerbehindertenausweis-beantragen', 'gdb-tabelle', 'gdb-40', 'merkzeichen'],
  sources: ['sgg84', 'sgb10_37', 'sgg66', 'sgg87', 'sgb10_44', 'versmedv'],
  de: {
    slug: 'widerspruch-gdb',
    nav: 'Widerspruch',
    card: 'Frist, Form und Begründung des Widerspruchs gegen den GdB-Bescheid, die Berechnung der Monatsfrist, Klage beim Sozialgericht und der Weg nach Fristablauf.',
    title: 'Widerspruch GdB 2026: Frist, Begründung, Ablauf, Klage',
    description: `Widerspruch gegen den GdB-Bescheid 2026: Frist von ${V.widerspruch_monate} Monat ab Bekanntgabe, diese gilt am ${V.bekanntgabe_tag}. Tag nach Postaufgabe, gute Begründung, Klage und Überprüfung.`,
    h1: 'Widerspruch gegen den GdB-Bescheid',
    intro: 'Gegen einen zu niedrigen GdB oder ein abgelehntes Merkzeichen ist der Widerspruch der erste Schritt; er braucht wenig Form, aber er muss pünktlich sein.',
    resume: `Gegen den Bescheid über GdB und Merkzeichen können Sie nach § 84 des Sozialgerichtsgesetzes innerhalb eines Monats nach Bekanntgabe Widerspruch einlegen, schriftlich, in elektronischer Form oder zur Niederschrift bei der Behörde, die den Bescheid erlassen hat. Ein mit der Post versandter Bescheid gilt nach § 37 SGB X am ${V.bekanntgabe_tag}. Tag nach der Aufgabe zur Post als bekannt gegeben. Für einen Bescheid, der am ${bescheid.split('-').reverse().join('.')} zur Post gegeben wurde, endet die Frist deshalb am ${ende.split('-').reverse().join('.')}. Fehlt die Rechtsbehelfsbelehrung oder ist sie falsch, gilt nach § 66 SGG eine Frist von einem Jahr. Die Behörde prüft den gesamten Bescheid erneut; ein Widerspruch hat die besten Aussichten, wenn er ein übersehenes Leiden, einen zu niedrig angesetzten Einzelwert oder eine falsche Bewertung des Zusammenwirkens belegt. Wer zusätzlich zu Wirbelsäule und Knie eine Depression mit 30 nachweist, kann nach dem Rechner von ${vorher.richt} auf ${nachher.richt} kommen. Gegen den Widerspruchsbescheid ist innerhalb eines Monats Klage beim Sozialgericht möglich. Ist die Frist verpasst, bleibt der Überprüfungsantrag nach § 44 SGB X.`,
    faqs: [
      { q: 'Kann ich nur gegen ein abgelehntes Merkzeichen Widerspruch einlegen?', a: 'Ja. Der Bescheid enthält mehrere Entscheidungen: den GdB, jedes beantragte Merkzeichen und den Beginn der Feststellung. Sie können den Widerspruch auf einen Teil beschränken, etwa „Ich lege Widerspruch gegen die Ablehnung des Merkzeichens G ein“. Schreiben Sie klar, wogegen Sie sich wenden. Die Frist von einem Monat gilt für jeden Teil gleich.' },
      { q: 'Wann beginnt die Widerspruchsfrist bei einem Bescheid per Post?', a: `Mit der Bekanntgabe. Nach § 37 Absatz 2 SGB X gilt ein schriftlicher Bescheid, der im Inland mit der Post übermittelt wird, am ${V.bekanntgabe_tag}. Tag nach der Aufgabe zur Post als bekannt gegeben, es sei denn, er ist nicht oder später zugegangen. Ab diesem Tag läuft der Monat. Das Datum im Briefkopf ist nicht automatisch der Tag der Aufgabe zur Post; im Zweifel rechnen Sie vorsichtig.` },
      { q: 'Was tun, wenn die Widerspruchsfrist verpasst ist?', a: `Dann wird der Bescheid bestandskräftig, aber nicht unabänderlich. Mit dem Überprüfungsantrag nach § 44 SGB X kann die Behörde einen von Anfang an falschen Bescheid zurücknehmen; Leistungen gibt es dann für bis zu ${V.ueberpruefung_jahre} Jahre rückwirkend. Hat sich Ihr Zustand seit dem Bescheid verschlechtert, ist ein Verschlimmerungsantrag der passende Weg. Beide sind an keine Frist gebunden.` },
      { q: 'Wie begründe ich einen Widerspruch gegen den GdB?', a: 'Mit Tatsachen, nicht mit Prozentrechnung. Prüfen Sie in der Begründung des Bescheids jede Funktionsbeeinträchtigung: Fehlt ein Leiden, ist ein Einzelwert nach der GdB-Tabelle zu niedrig, oder hat die Behörde verkannt, dass sich Leiden gegenseitig verstärken? Belegen Sie das mit aktuellen Befunden und einer Beschreibung Ihres Alltags. Einzelwerte zusammenzählen hilft nicht, denn die Verordnung verbietet die Addition.' },
      { q: 'Was passiert nach einem abgelehnten Widerspruch?', a: `Die Behörde erlässt einen Widerspruchsbescheid. Dagegen können Sie nach § 87 SGG innerhalb von ${V.klage_monate} Monat Klage beim Sozialgericht erheben; die Frist beginnt mit der Bekanntgabe des Widerspruchsbescheids. Im Klageverfahren ermittelt das Gericht selbst und kann eigene medizinische Gutachten einholen. Vertreten lassen können Sie sich etwa durch einen Sozialverband, eine Gewerkschaft oder eine Fachanwältin für Sozialrecht.` },
      { q: 'Gilt die Monatsfrist auch, wenn ich im Ausland wohne?', a: 'Nein. Nach § 84 Absatz 1 Satz 2 SGG beträgt die Frist bei Bekanntgabe im Ausland drei Monate. Das betrifft etwa Grenzgänger, die in Deutschland arbeiten und deren Bescheid an eine Adresse im Ausland geschickt wird. Die übrigen Regeln gelten gleich: Der Widerspruch geht an die Behörde, die den Bescheid erlassen hat, schriftlich oder in elektronischer Form.' },
    ],
    body: (h) => `
<h2>Frist und Form</h2>
<p>Die Frist steht in ${h.src('sgg84', '§ 84 SGG')}: Der Widerspruch ist binnen eines Monats, nachdem der Bescheid bekannt gegeben worden ist, einzureichen, und zwar bei der Stelle, die ihn erlassen hat. Er kann schriftlich, in elektronischer Form oder zur Niederschrift bei der Behörde eingelegt werden. Ein unterschriebener Brief, dessen Eingang Sie nachweisen können, etwa durch eine Eingangsbestätigung bei persönlicher Abgabe, ist der sichere Weg. Bei der elektronischen Form stellt das Recht besondere Anforderungen; eine einfache E-Mail sollten Sie nicht als einzigen Weg wählen.</p>
<p>Für die Bekanntgabe gilt ${h.src('sgb10_37', '§ 37 SGB X')}: Ein Bescheid, der im Inland mit der Post verschickt wird, gilt am ${V.bekanntgabe_tag}. Tag nach der Aufgabe zur Post als bekannt gegeben. Ein Beispiel:</p>
${h.table(['Schritt', 'Datum'], [
  ['Bescheid zur Post gegeben', h.date(bescheid)],
  [`Bekanntgabe (${V.bekanntgabe_tag}. Tag)`, h.date(bekannt)],
  [`Fristende (${V.widerspruch_monate} Monat)`, h.date(ende)],
], 'Fristberechnung für einen Widerspruch, Beispiel', ['l', 'r'])}
<p>Der Widerspruch muss spätestens am letzten Tag der Frist bei der Behörde eingehen; das Absenden allein reicht nicht. Fehlt im Bescheid die Rechtsbehelfsbelehrung oder ist sie unrichtig, verlängert sich die Frist nach ${h.src('sgg66', '§ 66 SGG')} auf ein Jahr. Wie viel Zeit Ihnen bleibt, schätzt der kleine Rechner. Eine Begründung schreibt § 84 SGG nicht vor; ein kurzer Widerspruch wahrt die Frist, die Begründung können Sie nachreichen, wenn Sie das ankündigen.</p>
<h2>Erst die Akte, dann die Begründung</h2>
<p>Der Bescheid nennt die Funktionsbeeinträchtigungen, aber nicht immer, wie die Behörde zu den Einzelwerten gekommen ist. Diese stehen in der versorgungsärztlichen Stellungnahme in Ihrer Akte. Sie können Einsicht in die Akte verlangen (§ 25 SGB X) und gezielt nach dieser Stellungnahme fragen. Erst mit ihr sehen Sie, welche Befunde ausgewertet wurden und welche fehlten.</p>
<p>Dann vergleichen Sie jeden Einzelwert mit der Tabelle in Teil B der ${h.src('versmedv', 'Versorgungsmedizin-Verordnung')}. Die ${h.a('gdb-tabelle', 'GdB-Tabelle')} dieser Seite zeigt die Spannen nach Organsystem. Liegt Ihr Befund in der Beschreibung einer höheren Stufe, ist das ein starkes Argument. Prüfen Sie außerdem, wie die Behörde die Leiden zusammengeführt hat: Nach Teil A Nummer 3 werden die Einzelwerte nicht addiert, sondern es kommt darauf an, ob sie sich verstärken, unabhängig voneinander wirken oder überschneiden.</p>
<h2>Beispiel: ein übersehenes Leiden</h2>
<p>Eine Frau hat ein Wirbelsäulenleiden mit 30 und ein Knieleiden mit 20 angegeben, die sich teilweise überschneiden. Der Bescheid lautet auf GdB ${vorher.richt}, was nach diesem Rechner im Rahmen von ${vorher.min} bis ${vorher.max} liegt. Ihre seit Jahren behandelte Depression hat sie im Antrag nicht erwähnt. Im Widerspruch legt sie den Bericht der Psychotherapeutin vor, der eine Bewertung mit 30 trägt. Weil die Depression einen anderen Lebensbereich betrifft, ergibt der Rechner nun ${nachher.min} bis ${nachher.max}, Richtwert ${nachher.richt}. Ob die Behörde so entscheidet, hängt von der Würdigung im Einzelfall ab; der Rechner zeigt nur, dass der Widerspruch nicht aussichtslos ist.</p>
<h2>Nach dem Widerspruch</h2>
<p>Die Behörde prüft den Bescheid erneut und kann weitere Befundberichte oder ein Gutachten einholen. Sie kann dem Widerspruch ganz oder teilweise abhelfen; dann erhalten Sie einen neuen Bescheid. Hilft sie nicht ab, entscheidet die Widerspruchsstelle mit einem Widerspruchsbescheid. Dagegen ist nach ${h.src('sgg87', '§ 87 SGG')} innerhalb von ${V.klage_monate} Monat die Klage beim Sozialgericht möglich. Das Sozialgericht ermittelt von Amts wegen und kann eigene Gutachten einholen.</p>
<h2>Wenn die Frist abgelaufen ist</h2>
<p>Ein bestandskräftiger Bescheid ist nicht das Ende. War er von Anfang an falsch, etwa weil die Behörde einen Befund übersehen hat, können Sie jederzeit einen Überprüfungsantrag nach ${h.src('sgb10_44', '§ 44 SGB X')} stellen; Leistungen werden dann für bis zu ${V.ueberpruefung_jahre} Jahre rückwirkend erbracht. Hat sich Ihr Gesundheitszustand seit dem Bescheid verschlechtert, stellen Sie einen ${h.a('verschlimmerungsantrag', 'Verschlimmerungsantrag')}. Und war nur ein ${h.a('merkzeichen', 'Merkzeichen')} nicht beantragt, holen Sie es mit einem Änderungsantrag nach.</p>
`,
  },
});
