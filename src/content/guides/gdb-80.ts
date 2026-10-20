import { defineGuide } from '../../lib/guide-types';
import { pauschbetrag, fahrtkosten } from '../../lib/engine/rechte';
import { steuerwirkung } from '../../lib/engine/steuer';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { eintrag } from '../../lib/engine/tabelle';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

/**
 * GdB 80: Fahrtkostenpauschale ohne Merkzeichen (§ 33 Abs. 2a Nr. 1 EStG), Bezugsgröße für aG (§ 229 Abs. 3 SGB IX)
 * und RF (§ 4 Abs. 2 Nr. 3 RBStV). Eigene Beispiele: Ehepaar mit 60.000 € und Krankheitskosten, Rentner mit aG,
 * Wege zu 80 aus 70 + 30 und 60 + 50.
 */
const S = P.schwelle;
const F = P.fahrtkosten;
const eur = (x: number) => formatMoney(x, 0, 'de');
const eur2 = (x: number) => formatMoney(x, 2, 'de');
const tb = (id: string, teil: string) => {
  const s = eintrag(id)!.stufen.find((x) => x.text.includes(teil))!;
  return s.von === s.bis ? String(s.von) : `${s.von} bis ${s.bis}`;
};
const G8 = F.gdb_klein;
const pb = pauschbetrag(G8);
const fk = fahrtkosten(G8);
const fkAg = fahrtkosten(G8, ['aG']);
const paar = steuerwirkung({ zve: 60000, splitting: true, kirche: 0, pauschbetrag: pb, fahrtkosten: fk, weitereAgB: 1500, kinder: 0 });
const paarOhneFk = steuerwirkung({ zve: 60000, splitting: true, kirche: 0, pauschbetrag: pb, fahrtkosten: 0, weitereAgB: 1500, kinder: 0 });
const rentnerAg = steuerwirkung({ zve: 26000, splitting: false, kirche: 0, pauschbetrag: pb, fahrtkosten: fkAg, weitereAgB: 0, kinder: 0 });
const siebzig30 = gesamtGdb([{ system: 'beine', gdb: 70 }, { system: 'herz', gdb: 30, beziehung: 'unabhaengig' }]);
const sechzig50 = gesamtGdb([{ system: 'lunge', gdb: 60 }, { system: 'herz', gdb: 50, beziehung: 'nachteilig' }]);
const rfJahr = (P.rundfunk.voll - P.rundfunk.ermaessigt) * 12;

export default defineGuide({
  id: 'gdb-80',
  group: 'stufen',
  order: 280,
  mini: 'stufe',
  miniDefaults: { g: 80 },
  miniHref: 'home',
  related: ['merkzeichen-ag', 'merkzeichen-rf', 'fahrtkostenpauschale', 'gdb-70', 'gdb-100', 'behinderten-pauschbetrag'],
  sources: ['estg33', 'estg33b', 'sgb9_229', 'rbstv4', 'kraftstg3a', 'versmedv'],
  de: {
    slug: 'gdb-80',
    nav: 'GdB 80',
    card: 'Fahrtkostenpauschale ohne Merkzeichen, Bezugspunkt für aG und RF: was GdB 80 steuerlich bringt und welche Merkzeichen naheliegen.',
    title: 'GdB 80 Vorteile 2026: Fahrtkosten, aG und Rundfunk',
    description: `GdB 80 Vorteile 2026: Pauschbetrag ${eur(pb)} und ${eur(fk)} Fahrtkostenpauschale ohne Merkzeichen. Wann aG oder RF hinzukommen und welche Leiden genau 80 ergeben.`,
    h1: 'GdB 80: Fahrtkosten ohne Merkzeichen und der Weg zu aG',
    intro: 'Ab GdB 80 gibt es die Fahrtkostenpauschale ohne Merkzeichen, und zwei wichtige Merkzeichen nehmen die 80 als Maßstab.',
    resume: `Ein Grad der Behinderung von ${G8} bringt alle Rechte der Schwerbehinderung, einen Behinderten-Pauschbetrag von ${eur(pb)} im Jahr und, als erste Stufe ohne Merkzeichen, die behinderungsbedingte Fahrtkostenpauschale von ${eur(fk)} nach § 33 Absatz 2a EStG. Die Pauschale zählt zu den außergewöhnlichen Belastungen und wirkt erst über der zumutbaren Belastung. Ein Ehepaar mit ${eur(60000)} zu versteuerndem Einkommen und ${eur(1500)} Krankheitskosten zahlt dank der Pauschale ${eur(paarOhneFk.mit - paar.mit)} weniger Steuer, zusammen mit dem Pauschbetrag ${eur(paar.ersparnis)}. Die Zahl 80 ist außerdem der Maßstab für zwei Merkzeichen: aG setzt nach § 229 Absatz 3 SGB IX eine mobilitätsbezogene Teilhabebeeinträchtigung voraus, die einem GdB von mindestens 80 entspricht, und RF verlangt nach dem Rundfunkbeitragsstaatsvertrag einen GdB von wenigstens 80 und die dauernde Unfähigkeit, an öffentlichen Veranstaltungen teilzunehmen. Mit aG steigt die Fahrtkostenpauschale auf ${eur(fkAg)}. Typische Einzelwerte von ${G8} sind der Verlust beider Unterschenkel und die Taubheit auf beiden Ohren.`,
    faqs: [
      { q: 'Muss ich die Fahrten für die Pauschale bei GdB 80 nachweisen?', a: `Nein. Die ${eur(fk)} gelten pauschal, ohne Fahrtenbuch und ohne Belege; Sie tragen sie in der Anlage Außergewöhnliche Belastungen ein. Darüber hinaus sind behinderungsbedingte Fahrtkosten nicht mehr absetzbar, auch wenn sie höher waren. Fahrten zur ärztlichen Behandlung gelten dagegen als Krankheitskosten und können zusätzlich angesetzt werden.` },
      { q: 'Bekomme ich mit GdB 80 das Merkzeichen aG?', a: 'Nicht automatisch. Entscheidend ist nicht der Gesamt-GdB, sondern eine erhebliche mobilitätsbezogene Teilhabebeeinträchtigung, die für sich einem GdB von mindestens 80 entspricht. Dazu kommt, dass Sie sich wegen der Schwere der Beeinträchtigung dauernd nur mit fremder Hilfe oder mit großer Anstrengung außerhalb des Autos bewegen können. Ein GdB von 80 aus Darm- und Psychoerkrankung genügt dafür nicht.' },
      { q: 'Gibt es bei GdB 80 eine Ermäßigung beim Rundfunkbeitrag?', a: `Nur mit dem Merkzeichen RF. § 4 Abs. 2 Nr. 3 RBStV verlangt neben dem GdB von wenigstens 80, dass Sie wegen Ihres Leidens an öffentlichen Veranstaltungen ständig nicht teilnehmen können, etwa weil Sie das Haus kaum verlassen. Dann zahlen Sie ${eur2(P.rundfunk.ermaessigt)} statt ${eur2(P.rundfunk.voll)} im Monat, das sind ${eur2(rfJahr)} weniger im Jahr.` },
      { q: 'Lohnt sich bei GdB 80 eine Einzelaufstellung der Fahrtkosten?', a: `Nein, das Gesetz lässt sie nicht zu: Über die Pauschale hinaus sind keine weiteren behinderungsbedingten Fahrtkosten berücksichtigungsfähig. Wer sehr viel fährt, kann nur über ein Merkzeichen wie aG oder H die höhere Pauschale von ${eur(F.gross)} erreichen. Die Kfz-Steuerbefreiung nach § 3a KraftStG gibt es ebenfalls nur mit H, Bl oder aG, nicht mit dem GdB allein.` },
      { q: 'Kann ich die Fahrtkostenpauschale meines Kindes mit GdB 80 nutzen?', a: 'Ja. § 33 Abs. 2a EStG verweist auf die Übertragungsregel für den Pauschbetrag in § 33b Abs. 5 EStG. Nimmt das Kind die Pauschale nicht selbst in Anspruch, können die Eltern sie ansetzen, grundsätzlich je zur Hälfte. Bei den Eltern zählt sie wie eigene außergewöhnliche Belastungen und wird mit deren Krankheitskosten um die zumutbare Belastung gekürzt.' },
      { q: 'Wird der Ausweis mit GdB 80 unbefristet ausgestellt?', a: `Das hängt nicht von der Höhe des GdB ab, sondern davon, ob sich der Zustand noch wesentlich ändern kann. Nach § 6 der Schwerbehindertenausweisverordnung wird der Ausweis in der Regel auf höchstens ${P.ausweis.befristung_jahre} Jahre befristet. Ist keine Änderung zu erwarten, etwa nach einer Amputation, kann er unbefristet ausgestellt werden. Bei Krebs mit Heilungsbewährung bleibt er befristet.` },
    ],
    body: (h) => `
<h2>Rechte und Beträge mit GdB 80</h2>
${h.table(['Leistung', 'GdB 80 ohne Merkzeichen', 'GdB 80 mit aG'], [
  ['Behinderten-Pauschbetrag', h.eur(pb), h.eur(pb)],
  ['Fahrtkostenpauschale', h.eur(fk), h.eur(fkAg)],
  ['Kraftfahrzeugsteuer', 'voll', 'befreit (§ 3a Abs. 1 KraftStG)'],
  ['Parken auf Behindertenparkplätzen', 'nein', 'ja, EU-Parkausweis'],
  ['Freifahrt im Nahverkehr', 'nein', `ja, Wertmarke ${h.eur(P.wertmarke.jahr)}`],
], 'GdB 80 mit und ohne Merkzeichen aG, Stand 2026', ['l', 'r', 'r'])}
<p>Mit GdB ${G8} beginnt die Fahrtkostenpauschale, ohne dass die Behörde ein Merkzeichen feststellen muss. Ihr Wert hängt von der zumutbaren Belastung ab. Beim Ehepaar mit ${h.eur(60000)} beträgt sie ${h.eur(paar.zumutbar)}; zusammen mit ${h.eur(1500)} Krankheitskosten übersteigen Pauschale und Kosten sie um ${h.eur(paar.abzug33)}. Ohne Pauschale wären es nur ${h.eur(Math.max(0, 1500 - paar.zumutbar))}. Eine Rentnerin mit ${h.eur(26000)} und Merkzeichen aG profitiert stärker: Die große Pauschale von ${h.eur(fkAg)} und der Pauschbetrag sparen ihr zusammen ${h.eur(rentnerAg.ersparnis)} im Jahr.</p>
<!--mini:fahrt-->
<h2>aG: die 80 als Maßstab, nicht als Gesamtwert</h2>
<p>Nach § 229 Absatz 3 SGB IX ist außergewöhnlich gehbehindert, wer eine erhebliche mobilitätsbezogene Teilhabebeeinträchtigung hat, die einem GdB von mindestens 80 entspricht, und sich deshalb dauernd nur mit fremder Hilfe oder großer Anstrengung außerhalb des Fahrzeugs bewegen kann. Die Behörde betrachtet dabei nur die Leiden, die die Mobilität einschränken. Ein Gesamt-GdB von 80 aus einem Beinleiden mit 50 und einer Depression mit 50 erfüllt die Voraussetzung deshalb nicht. Einzelheiten zum Verfahren und zu den Vorteilen stehen beim ${h.a('merkzeichen-ag', 'Merkzeichen aG')}.</p>
<h2>RF: die 80 und die Teilnahme am öffentlichen Leben</h2>
<p>Für das ${h.a('merkzeichen-rf', 'Merkzeichen RF')} verlangt der ${h.src('rbstv4', 'Rundfunkbeitragsstaatsvertrag')} einen GdB von wenigstens 80, der nicht nur vorübergehend besteht, und die ständige Unfähigkeit, an öffentlichen Veranstaltungen teilzunehmen. Gemeint sind Menschen, die wegen ihres Leidens Veranstaltungen wie Theater, Konzerte, Gottesdienste oder Versammlungen dauerhaft nicht besuchen können. Die Behörde prüft das anhand der Befunde und stellt RF im selben Verfahren wie den GdB fest. Bei Sehbehinderung reicht schon ein GdB von 60 allein dafür, siehe ${h.a('gdb-60', 'GdB 60')}.</p>
<h2>Typische Einzelwerte von 80</h2>
<p>Teil B bewertet den Verlust eines Beines im Hüftgelenk mit ${tb('beinverlust', 'im Hüftgelenk')}, den Verlust beider Unterschenkel mit ${tb('beinverlust', 'beider Beine im Unterschenkel')} und die Versteifung beider Kniegelenke mit ${tb('knieversteifung', 'beider Kniegelenke')}. Die Taubheit auf beiden Ohren ergibt ${tb('schwerhoerigkeit', 'Taubheit beidseits')}. Bei Krebs in höheren Stadien setzt die Verordnung während der Heilungsbewährung oft wenigstens 80 an, etwa beim Brustkrebs (${tb('brustkrebs', 'höheren Stadien')}) oder beim Lungentumor (${tb('lungenkrebs', 'während dieser Zeit')}). Nach Ablauf der Heilungsbewährung bewertet die Behörde neu.</p>
<p>Bei geistiger Behinderung hat die 80 eine Bedeutung für das Merkzeichen G: Teil D nimmt eine erhebliche Beeinträchtigung der Bewegungsfähigkeit bei einem GdB von 80 oder 90 „in den meisten Fällen“ an, wenn sich die Person auf ungewohnten Wegen nur schwer zurechtfindet. Bei sehbehinderten Kindern mit einem Wert von wenigstens 80 allein für das Sehen ist bis zum 18. Geburtstag Hilflosigkeit anzunehmen, also das Merkzeichen H.</p>
<h2>Pflegegrad 4 oder 5 bei GdB 80</h2>
<p>Viele Menschen mit GdB ${G8} sind zugleich pflegebedürftig. Für den Pauschbetrag ist das wichtig: Nach § 65 Absatz 2 EStDV steht die Einstufung in Pflegegrad 4 oder 5 dem Merkzeichen H gleich. Dann gilt statt ${h.eur(pb)} der erhöhte Pauschbetrag von ${h.eur(P.pauschbetrag.erhoeht)}, auch wenn im Ausweis kein H eingetragen ist. Den Pflegegrad weisen Sie mit dem Bescheid der Pflegekasse nach. Mit einem niedrigeren Pflegegrad bleibt es beim Pauschbetrag nach dem GdB. Ob neben dem Pauschbetrag auch die große Fahrtkostenpauschale gilt, hängt vom festgestellten Merkzeichen ab; lassen Sie im Zweifel H bei der Versorgungsbehörde feststellen.</p>
<h2>Wie 80 aus mehreren Leiden entsteht</h2>
<p>Ein Beinleiden mit 70 und ein Herzleiden mit 30, die unabhängig voneinander wirken, ergeben nach diesem Rechner ${siebzig30.min} bis ${siebzig30.max}, Richtwert ${siebzig30.richt}. Ein Lungenleiden mit 60 und ein Herzleiden mit 50, die sich gegenseitig verstärken, liegen beim Richtwert ${sechzig50.richt}, die Spanne reicht bis ${sechzig50.max}. Je höher der Ausgangswert, desto mehr Gewicht braucht ein weiteres Leiden, um noch etwas zu verändern. Probieren Sie Ihre Werte im ${h.a('home', 'Gesamt-GdB-Rechner')} aus.</p>
`,
  },
});
