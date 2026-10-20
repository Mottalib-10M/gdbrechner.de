import { defineGuide } from '../../lib/guide-types';
import { pauschbetrag, fahrtkosten } from '../../lib/engine/rechte';
import { steuerwirkung } from '../../lib/engine/steuer';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { eintrag } from '../../lib/engine/tabelle';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

/**
 * GdB 100: höchste Stufe. Eigene Beispiele: Pauschbetrag 100 gegen den erhöhten Betrag mit Bl oder H bei 40.000 €,
 * Wege zu 100 (80 + 50, 90 + 50), Blindheit und Hilflosigkeit nach Teil A Nr. 4 und 6 der VersMedV.
 */
const S = P.schwelle;
const PB = P.pauschbetrag;
const eur = (x: number) => formatMoney(x, 0, 'de');
const tb = (id: string, teil: string) => {
  const s = eintrag(id)!.stufen.find((x) => x.text.includes(teil))!;
  return s.von === s.bis ? String(s.von) : `${s.von} bis ${s.bis}`;
};
const pb = pauschbetrag(100);
const pbBl = pauschbetrag(100, ['Bl']);
const fk = fahrtkosten(100);
const fkBl = fahrtkosten(100, ['Bl']);
const nur100 = steuerwirkung({ zve: 40000, splitting: false, kirche: 0, pauschbetrag: pb, fahrtkosten: fk, weitereAgB: 0, kinder: 0 });
const blind = steuerwirkung({ zve: 40000, splitting: false, kirche: 0, pauschbetrag: pbBl, fahrtkosten: fkBl, weitereAgB: 0, kinder: 0 });
const achtzig50 = gesamtGdb([{ system: 'lunge', gdb: 80 }, { system: 'beine', gdb: 50, beziehung: 'unabhaengig' }]);
const neunzig50 = gesamtGdb([{ system: 'herz', gdb: 90 }, { system: 'lunge', gdb: 50, beziehung: 'nachteilig' }]);

export default defineGuide({
  id: 'gdb-100',
  group: 'stufen',
  order: 299,
  mini: 'stufe',
  miniDefaults: { g: 100 },
  miniHref: 'home',
  related: ['merkzeichen-bl', 'merkzeichen-h', 'merkzeichen', 'gdb-80', 'behinderten-pauschbetrag', 'schwerbehindertenausweis'],
  sources: ['estg33b', 'estg33', 'sgb9_228', 'kraftstg3a', 'rbstv4', 'versmedv'],
  de: {
    slug: 'gdb-100',
    nav: 'GdB 100',
    card: 'Die höchste Stufe: Pauschbetrag, Fahrtkosten und welche Merkzeichen bei GdB 100 häufig sind, von Bl über H bis aG.',
    title: 'GdB 100 Vorteile 2026: Merkzeichen, Steuer, Blindheit',
    description: `GdB 100 Vorteile 2026: Pauschbetrag ${eur(pb)}, mit Bl oder H ${eur(pbBl)}, Fahrtkostenpauschale bis ${eur(fkBl)}. Welche Merkzeichen bei GdB 100 häufig dazukommen.`,
    h1: 'GdB 100: die höchste Stufe und ihre Merkzeichen',
    intro: 'GdB 100 ist der höchste Wert, den die Behörde feststellen kann; was er wert ist, entscheiden vor allem die Merkzeichen.',
    resume: `Ein Grad der Behinderung von 100 ist die höchste Stufe; die Behörde stellt den GdB in Zehnergraden fest, und auch mehrere schwere Leiden ergeben zusammen nicht mehr als 100. Mit GdB 100 stehen Ihnen ein Behinderten-Pauschbetrag von ${eur(pb)} im Jahr und die Fahrtkostenpauschale von ${eur(fk)} zu, dazu alle Rechte der Schwerbehinderung: Ausweis, Zusatzurlaub, Kündigungsschutz und Altersrente. Der GdB allein bringt aber weder Freifahrt noch Kfz-Steuerbefreiung noch Parkausweis. Diese hängen an Merkzeichen, die bei GdB 100 häufig sind: Blinde (Bl) und hilflose Menschen (H) erhalten den erhöhten Pauschbetrag von ${eur(pbBl)}, die Fahrtkostenpauschale von ${eur(fkBl)}, eine kostenlose Wertmarke und die Kfz-Steuerbefreiung. Bei ${eur(40000)} zu versteuerndem Einkommen spart GdB 100 ohne Merkzeichen rund ${eur(nur100.ersparnis)}, mit Bl rund ${eur(blind.ersparnis)}. Typische Einzelwerte von 100 sind die Dauerdialyse, der Verlust beider Beine im Oberschenkel und eine Sehschärfe von höchstens 0,05 auf beiden Augen.`,
    faqs: [
      { q: 'Gibt es mit GdB 100 mehr Zusatzurlaub?', a: `Nein. Der Zusatzurlaub nach § 208 SGB IX beträgt bei jedem GdB ab ${S.schwerbehinderung} ${P.urlaub.tage_bei_5} Arbeitstage bei der Fünftagewoche. Auch Kündigungsschutz und Altersrente sind nicht nach der Höhe gestaffelt. Was mit 100 steigt, sind Pauschbetrag und Fahrtkostenpauschale, und vor allem die Wahrscheinlichkeit von Merkzeichen, die eigene Vorteile auslösen.` },
      { q: 'Ist man mit GdB 100 automatisch hilflos?', a: 'Nein. Hilflos ist, wer für eine Reihe häufig und regelmäßig wiederkehrender Verrichtungen des täglichen Lebens dauernd fremde Hilfe braucht. Die Verordnung nimmt das stets an bei Blindheit, hochgradiger Sehbehinderung und dauerhafter Rollstuhlpflicht, in der Regel auch bei Hirnschäden, Anfallsleiden, geistiger Behinderung oder Psychosen, die allein einen GdB von 100 bedingen. Bei allen anderen Leiden prüft die Behörde den Hilfebedarf im Einzelfall.' },
      { q: 'Wann gilt man im Sinne des Merkzeichens Bl als blind?', a: 'Nach Teil A Nummer 6 der Versorgungsmedizin-Verordnung, wenn das Augenlicht vollständig fehlt oder die Sehschärfe auf keinem Auge und auch nicht beidäugig mehr als 0,02 beträgt. Gleich stehen bestimmte schwere Gesichtsfeldeinengungen, etwa auf höchstens 5 Grad um das Zentrum, und der vollständige Ausfall der Sehrinde. Hochgradig sehbehindert ist, wer nicht mehr als 0,05 sieht; das ergibt GdB 100, aber kein Bl.' },
      { q: 'Kann der GdB 100 wieder gesenkt werden?', a: `Ja. Bei Krebs setzt Teil B den Wert von 100 oft nur für die Heilungsbewährung an, etwa ${tb('leberkrebs', 'Heilungsbewährung')} beim Leberkrebs für fünf Jahre oder ${tb('akute-leukaemie', 'Im ersten Jahr')} bei akuter Leukämie im ersten Jahr nach der Diagnose. Danach bewertet die Behörde neu, und der Ablauf der Heilungsbewährung gilt nach Teil A Nummer 7 als wesentliche Änderung. Gegen eine Herabsetzung ist Widerspruch möglich.` },
      { q: 'Lohnt sich bei GdB 100 noch ein Merkzeichen-Antrag?', a: `Meist ja, denn der GdB allein ist bei 100 ausgeschöpft. Ein Merkzeichen wie H, Bl oder aG hebt die Fahrtkostenpauschale von ${eur(fk)} auf ${eur(fkBl)}, befreit von der Kfz-Steuer und bringt mit H oder Bl die kostenlose Wertmarke. Den Antrag stellen Sie bei derselben Behörde, auch Jahre nach dem GdB-Bescheid; maßgeblich sind die aktuellen Befunde.` },
    ],
    body: (h) => `
<h2>GdB 100 ohne und mit Merkzeichen</h2>
${h.table(['Leistung', 'GdB 100 allein', 'GdB 100 mit Bl oder H'], [
  ['Behinderten-Pauschbetrag', h.eur(pb), h.eur(pbBl)],
  ['Fahrtkostenpauschale', h.eur(fk), h.eur(fkBl)],
  ['Freifahrt im Nahverkehr', 'nein', 'ja, Wertmarke kostenlos'],
  ['Kraftfahrzeugsteuer', 'voll', 'befreit'],
  [`Steuerersparnis bei ${h.eur(40000)}`, h.eur(nur100.ersparnis), h.eur(blind.ersparnis)],
], 'GdB 100 im Jahr 2026', ['l', 'r', 'r'])}
<p>Die Tabelle zeigt, warum bei 100 die Merkzeichen den Ausschlag geben. Der erhöhte Pauschbetrag von ${h.eur(pbBl)} nach § 33b Absatz 3 EStG ersetzt den Betrag nach dem GdB, er kommt nicht hinzu. Die große Fahrtkostenpauschale von ${h.eur(fkBl)} ersetzt ebenso die kleine. Nach § 228 Absatz 4 SGB IX erhalten blinde und hilflose Menschen die Wertmarke ohne Eigenbeteiligung; alle anderen zahlen ${h.eur(P.wertmarke.jahr)} im Jahr. Die Kfz-Steuer entfällt nach § 3a Absatz 1 KraftStG mit H, Bl oder aG für ein Fahrzeug, das auf Sie zugelassen ist.</p>
<!--mini:merkzeichen-->
<h2>Wie man auf 100 kommt</h2>
<p>Teil B nennt 100 als Einzelwert für schwerste Leiden: die Notwendigkeit einer Dauerbehandlung mit Blutreinigungsverfahren (${tb('dialyse', 'Dauerbehandlung')}), den Verlust beider Beine im Oberschenkel (${tb('beinverlust', 'beider Beine im Oberschenkel')}), den Verlust eines Armes und eines Beines (${tb('armverlust', 'Armes und Beines')}), den Verlust aller zehn Finger (${tb('fingerverlust', 'aller zehn Finger')}) und eine Sehschärfe von 0,05 auf beiden Augen (${tb('sehbehinderung', '0,05')}). Bei vielen Krebserkrankungen und nach Transplantationen gilt 100 für die Zeit der Heilungsbewährung, etwa nach einer Lebertransplantation (${tb('lebertransplantation', 'während der Heilungsbewährung')}).</p>
<p>Aus mehreren Leiden wird 100 seltener, als viele erwarten. Ein Lungenleiden mit 80 und ein Beinleiden mit 50, die unabhängig wirken, ergeben nach diesem Rechner ${achtzig50.min} bis ${achtzig50.max}, Richtwert ${achtzig50.richt}. Erst wenn sich zwei schwere Leiden gegenseitig verstärken, etwa ein Herzleiden mit 90 und ein Lungenleiden mit 50, liegt der Richtwert bei ${neunzig50.richt}. Die Verordnung verlangt nach Teil A Nummer 3.4 den Vergleich mit Leiden, für die Teil B einen festen Wert nennt: Ein Gesamt-GdB von 100 sollte deshalb in seiner Schwere mit Leiden vergleichbar sein, die Teil B mit 100 bewertet, etwa dem Verlust beider Beine im Oberschenkel. Ihre Einzelwerte prüft der ${h.a('home', 'Gesamt-GdB-Rechner')}.</p>
<h2>Merkzeichen, die bei GdB 100 häufig sind</h2>
<p><strong>Bl:</strong> Blind ist nach Teil A Nummer 6, wessen Sehschärfe nicht mehr als 0,02 beträgt oder wer eine gleich schwere Störung des Sehvermögens hat. Das ${h.a('merkzeichen-bl', 'Merkzeichen Bl')} bringt den erhöhten Pauschbetrag, die große Fahrtkostenpauschale, kostenlose Wertmarke, Kfz-Steuerbefreiung und den EU-Parkausweis. Daneben zahlen die Länder ein Blindengeld nach eigenem Recht; die Beträge sind hier nicht aufgeführt.</p>
<p><strong>H:</strong> Hilflosigkeit nimmt die Verordnung ohne nähere Prüfung bei Blindheit, hochgradiger Sehbehinderung, Querschnittslähmung und bei Behinderungen an, die dauernd einen Rollstuhl auch in der Wohnung erfordern. In der Regel gilt sie auch beim Verlust von zwei oder mehr Gliedmaßen, ausgenommen beidseitige Unterschenkel- oder Fußamputationen. Mehr dazu beim ${h.a('merkzeichen-h', 'Merkzeichen H')}.</p>
<p><strong>aG, G und B:</strong> Wer sich wegen der Schwere der Beeinträchtigung dauernd nur mit fremder Hilfe oder großer Anstrengung außerhalb des Fahrzeugs bewegen kann, erhält aG. G und B kommen bei vielen Menschen mit GdB 100 hinzu; mit B fährt eine Begleitperson in Bus und Bahn kostenlos mit.</p>
<p><strong>RF und TBl:</strong> Blinde Menschen zahlen auf Antrag ein Drittel des Rundfunkbeitrags, ${h.eur(P.rundfunk.ermaessigt, 2)} im Monat. Taubblinde Menschen und Empfänger von Blindenhilfe nach § 72 SGB XII sind ganz befreit.</p>
<h2>Antrag auf Merkzeichen: worauf es ankommt</h2>
<p>Merkzeichen stellt die Behörde nicht von sich aus fest, Sie müssen sie beantragen, entweder zusammen mit dem GdB oder später. Für H zählt der tägliche Hilfebedarf: An- und Auskleiden, Essen, Körperpflege und Toilettengänge, außerdem Bewegung, geistige Anregung und Kommunikation. Einzelne Hilfen, etwa beim Anziehen einzelner Kleidungsstücke oder als Begleitung auf Spaziergängen, genügen nach Teil A Nummer 4 nicht. Beschreiben Sie deshalb, bei welchen Verrichtungen Sie wie oft Hilfe brauchen, und legen Sie, wenn vorhanden, ein Pflegegutachten bei. Für Bl ist ein augenärztlicher Befund mit Sehschärfe und Gesichtsfeld die Grundlage.</p>
<h2>Was GdB 100 nicht ersetzt</h2>
<p>GdB 100 bedeutet nicht Erwerbsunfähigkeit. Viele Menschen mit GdB 100 arbeiten, und der Ausweis sagt nichts darüber, wie viele Stunden jemand arbeiten kann. Renten wegen Erwerbsminderung und Leistungen der Pflegeversicherung prüfen andere Stellen nach eigenen Regeln. Ein Pflegegrad entsteht nicht aus dem GdB, und umgekehrt; nur für den Pauschbetrag steht Pflegegrad 4 oder 5 dem Merkzeichen H gleich (§ 65 Abs. 2 EStDV).</p>
`,
  },
});
