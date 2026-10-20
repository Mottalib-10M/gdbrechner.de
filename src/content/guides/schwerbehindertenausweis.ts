import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

/**
 * Der Schwerbehindertenausweis als Dokument: § 152 Abs. 5 SGB IX, SchwbAwV §§ 1 bis 3 und 6, § 199 SGB IX.
 * Eigene Beispiele: Gültigkeit bei Ausstellung im Mai 2026, Kind mit 7 und Jugendliche mit 12 Jahren (berechnet).
 */
const A = P.ausweis;
const S = P.schwelle;
const monat = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
const ausgestellt = { j: 2026, m: 5 };
const bisErw = `${monat[ausgestellt.m - 1]} ${ausgestellt.j + A.befristung_jahre}`;
const kind = { j: 2019, m: 8 };
const jugend = { j: 2014, m: 2 };
const bisKind = `${monat[kind.m - 1]} ${kind.j + 10}`;
const bisJugend = `${monat[jugend.m - 1]} ${jugend.j + 20}`;
const alterKind = 2026 - kind.j;
const alterJugend = 2026 - jugend.j;

export default defineGuide({
  id: 'schwerbehindertenausweis',
  group: 'ausweis',
  order: 410,
  mini: 'merkzeichen',
  miniDefaults: { m: 1, g: 60 },
  miniHref: 'merkzeichen',
  related: ['schwerbehindertenausweis-beantragen', 'schwerbehindertenausweis-vorteile', 'merkzeichen', 'schwerbehinderung', 'verschlimmerungsantrag'],
  sources: ['sgb9_152', 'schwbawv3', 'schwbawv6', 'sgb9_199', 'estdv65', 'sgb9_228'],
  de: {
    slug: 'schwerbehindertenausweis',
    nav: 'Schwerbehindertenausweis',
    card: 'Das Dokument im Detail: Farben, Vorder- und Rückseite, Merkzeichen, Gültigkeit bei Erwachsenen und Kindern, Verlängerung und Einzug.',
    title: 'Schwerbehindertenausweis 2026: Gültigkeit, Farben, Einträge',
    description: `Schwerbehindertenausweis 2026: grün oder mit orangem Aufdruck, was auf Vorder- und Rückseite steht, Gültigkeit bis ${A.befristung_jahre} Jahre, Kinder, Verlängerung und Rückgabe.`,
    h1: 'Der Schwerbehindertenausweis: was drauf steht und wie lange er gilt',
    intro: 'Der Ausweis ist der Nachweis der Schwerbehinderung im Alltag; seine Farbe, seine Einträge und sein Ablaufdatum entscheiden, welche Rechte Sie damit sofort belegen können.',
    resume: `Den Schwerbehindertenausweis stellt die Behörde nach § 152 Absatz 5 SGB IX auf Antrag aus, wenn ein GdB von mindestens ${S.schwerbehinderung} festgestellt ist. Er weist die Schwerbehinderung, den GdB und die Merkzeichen nach und dient als Nachweis für alle Nachteilsausgleiche. Nach der Schwerbehindertenausweisverordnung ist er eine Karte mit grünem Grund; wer zur Freifahrt im Nahverkehr berechtigt sein kann, erhält ihn mit halbseitigem orangefarbenem Aufdruck. Das Merkzeichen B steht auf der Vorderseite, alle anderen Merkzeichen auf der Rückseite. Gültig ist der Ausweis ab dem Tag, an dem der Antrag eingegangen ist. Er wird in der Regel auf höchstens ${A.befristung_jahre} Jahre ab dem Monat der Ausstellung befristet; unbefristet gibt es ihn, wenn keine wesentliche Änderung zu erwarten ist. Bei Kindern unter 10 Jahren gilt er höchstens bis zum Ende des Monats, in dem sie 10 werden, bei Kindern zwischen 10 und 15 bis zum 20. Geburtstag. Ein im ${monat[ausgestellt.m - 1]} ${ausgestellt.j} ausgestellter befristeter Ausweis gilt also längstens bis ${bisErw}. Sinkt der GdB unter ${S.schwerbehinderung}, wird er eingezogen.`,
    faqs: [
      { q: 'Welche Farbe hat der Schwerbehindertenausweis?', a: 'Grün. § 1 der Schwerbehindertenausweisverordnung schreibt einen fälschungssicheren Aufdruck in der Grundfarbe Grün vor. Wer das Recht auf unentgeltliche Beförderung im Nahverkehr haben kann, etwa mit G, aG, H, Bl oder Gl, erhält zusätzlich einen halbseitigen orangefarbenen Flächenaufdruck. Die Farbe allein berechtigt aber noch nicht zur Freifahrt; dafür brauchen Sie die gültige Wertmarke.' },
      { q: 'Ab welchem Datum gilt der Ausweis?', a: `Ab dem Tag, an dem Ihr Antrag auf Feststellung bei der Behörde eingegangen ist; dieser Tag steht nach § 6 Absatz 1 SchwbAwV als Beginn auf der Rückseite. Kommt der Bescheid nach Monaten, gilt der Ausweis trotzdem rückwirkend. Haben Sie glaubhaft gemacht, dass der GdB schon früher vorlag, kann die Behörde auch einen früheren Zeitpunkt feststellen. Das Ende steht auf der Vorderseite, als Monat und Jahr.` },
      { q: 'Was steht auf der Rückseite des Ausweises?', a: 'Die Merkzeichen nach § 3 Absatz 1 SchwbAwV: aG, H, Bl, Gl, RF, „1. Kl.“, G und TBl, soweit sie festgestellt sind, außerdem der Beginn der Gültigkeit. Auf der Vorderseite stehen unter anderem das Ende der Gültigkeit und, wenn festgestellt, das Merkzeichen B mit dem Satz zur Begleitperson. Für Kriegsbeschädigte und Entschädigungsberechtigte gibt es eigene Kennzeichnungen wie VB und EB.' },
      { q: 'Muss ich den Ausweis zurückgeben, wenn der GdB unter 50 fällt?', a: `Ja, aber nicht sofort. Nach § 152 Absatz 5 SGB IX wird der Ausweis eingezogen, sobald der gesetzliche Schutz erloschen ist. Nach § 199 SGB IX endet dieser Schutz erst mit Ablauf des dritten Kalendermonats, nachdem der Bescheid mit dem niedrigeren GdB unanfechtbar geworden ist. Bis dahin gelten Ausweis, Zusatzurlaub und Kündigungsschutz weiter. Legen Sie Widerspruch ein, wird der Bescheid zunächst nicht unanfechtbar.` },
      { q: 'Wie lange gilt der Ausweis eines Zwölfjährigen?', a: `Höchstens bis zum Ende des Monats, in dem er 20 Jahre alt wird. § 6 Absatz 4 SchwbAwV sieht diese längere Frist für Kinder zwischen 10 und 15 Jahren vor. Ein im ${monat[jugend.m - 1]} ${jugend.j} geborenes Mädchen, das 2026 den Ausweis mit ${alterJugend} Jahren erhält, kann ihn also längstens bis ${bisJugend} nutzen. Die Behörde kann eine kürzere Frist setzen, wenn sie eine Änderung erwartet.` },
    ],
    body: (h) => `
<h2>Was der Ausweis ist und was nicht</h2>
<p>Der Ausweis ist die Bescheinigung über einen Bescheid, nicht der Bescheid selbst. Die Rechte entstehen mit der Feststellung des GdB und der Merkzeichen durch die Behörde (${h.src('sgb9_152', '§ 152 SGB IX')}); der Ausweis dient nach Absatz 5 dem Nachweis, wenn Sie diese Rechte in Anspruch nehmen. Deshalb erhalten ihn nur schwerbehinderte Menschen mit einem GdB von mindestens ${S.schwerbehinderung}. Wer GdB 30 oder 40 hat, auch mit ${h.a('gleichstellung', 'Gleichstellung')}, bekommt keinen Ausweis; für ihn ist der Bescheid der Nachweis. Den Ausweis müssen Sie gesondert beantragen, meist mit einem Kreuz im Antrag auf Feststellung.</p>
<p>Für das Finanzamt hat der Ausweis 2026 an Bedeutung verloren. Nach ${h.src('estdv65', '§ 65 Abs. 3a EStDV')} übermittelt die Behörde ihre Feststellungen seit dem 1. Januar 2026 auf Ihren Antrag elektronisch an das Finanzamt, wenn Sie Ihre Steuer-Identifikationsnummer angeben. Ausweise und Bescheide, die vorher ausgestellt wurden, gelten weiter, bis sich die Feststellungen ändern.</p>
<h2>Gestaltung: Farben, Vorder- und Rückseite</h2>
${h.table(['Element', 'Regel', 'Vorschrift'], [
  ['Format', 'Identifikationskarte nach Muster 5 der Verordnung', '§ 1 Abs. 5 SchwbAwV'],
  ['Grundfarbe', 'Grün, fälschungssicherer Aufdruck', '§ 1 Abs. 1 SchwbAwV'],
  ['Orangefarbener Aufdruck', 'halbseitig, wenn Freifahrt im Nahverkehr möglich ist', '§ 1 Abs. 2 SchwbAwV'],
  ['Vorderseite', 'Ende der Gültigkeit (Monat und Jahr), Merkzeichen B mit Satz zur Begleitperson', '§ 3 Abs. 2, § 6 Abs. 7 SchwbAwV'],
  ['Rückseite', 'Merkzeichen aG, H, Bl, Gl, RF, 1. Kl., G, TBl; Beginn der Gültigkeit', '§ 3 Abs. 1, § 6 Abs. 1 SchwbAwV'],
  ['Sondergruppen', 'Kennzeichnung „Kriegsbeschädigt“, VB oder EB', '§ 2 SchwbAwV'],
], 'Gestaltung des Ausweises nach der Schwerbehindertenausweisverordnung', ['l', 'l', 'l'])}
<p>Der orangefarbene Aufdruck zeigt nur, dass Sie zum Kreis der Berechtigten für die unentgeltliche Beförderung gehören. Fahren dürfen Sie erst mit der Wertmarke, die die Behörde auf Antrag ausgibt (${h.src('sgb9_228', '§ 228 SGB IX')}). Der Ausweis ohne Merkzeichen ist rein grün. Welche Rechte ein einzelnes Merkzeichen bei Ihrem GdB auslöst, zeigt der kleine Rechner; die Übersicht aller Einträge steht unter ${h.a('merkzeichen', 'Merkzeichen')}.</p>
<h2>Gültigkeit: wie lange der Ausweis gilt</h2>
<p>Die Regeln stehen in ${h.src('schwbawv6', '§ 6 SchwbAwV')}. Der Ausweis gilt ab dem Eingang des Antrags auf Feststellung. Befristet wird er auf höchstens ${A.befristung_jahre} Jahre ab dem Monat der Ausstellung. Ist keine wesentliche Änderung der gesundheitlichen Verhältnisse zu erwarten, kann die Behörde ihn unbefristet ausstellen, etwa bei einem dauerhaften Zustand, der sich nicht mehr bessern wird. Bei Erkrankungen mit Heilungsbewährung, etwa nach Krebs, ist eine Änderung dagegen zu erwarten: Nach Teil A Nummer 7 der Versorgungsmedizin-Verordnung ist der Ablauf der Heilungsbewährung selbst eine wesentliche Änderung.</p>
${h.table(['Fall', 'Längste Gültigkeit', 'Beispiel'], [
  ['Erwachsene, Änderung möglich', `${A.befristung_jahre} Jahre ab Monat der Ausstellung`, `ausgestellt ${monat[ausgestellt.m - 1]} ${ausgestellt.j}: bis ${bisErw}`],
  ['Erwachsene, keine Änderung zu erwarten', 'unbefristet möglich', 'dauerhafter Zustand'],
  ['Kinder unter 10 Jahren', 'bis Ende des Monats des 10. Geburtstags', `geboren ${monat[kind.m - 1]} ${kind.j}: bis ${bisKind}`],
  ['Kinder von 10 bis 15 Jahren', 'bis Ende des Monats des 20. Geburtstags', `geboren ${monat[jugend.m - 1]} ${jugend.j}: bis ${bisJugend}`],
  ['Befristeter Aufenthaltstitel', 'bis zum Ablauf des Titels', 'Monat des Fristablaufs'],
], 'Gültigkeitsdauer nach § 6 SchwbAwV', ['l', 'l', 'l'])}
<p>Für ein ${alterKind}-jähriges Kind, das 2026 den Ausweis erhält, bedeutet das: Er läuft spätestens mit dem 10. Geburtstag ab, dann folgt ein neuer Ausweis mit der längeren Frist bis zum 20. Geburtstag, wenn die Schwerbehinderung fortbesteht.</p>
<h2>Verlängern, berichtigen, einziehen</h2>
<p><strong>Verlängern.</strong> Beantragen Sie die Verlängerung einige Monate vor Ablauf bei der Behörde, die den Ausweis ausgestellt hat. Haben sich die Verhältnisse wesentlich geändert, kann sie den GdB nach § 48 SGB X neu feststellen, auch nach unten. Ein abgelaufener Ausweis beendet die Feststellung nicht, er beweist sie nur nicht mehr; im Bus, beim Parken und beim Arbeitgeber haben Sie dann ein Nachweisproblem.</p>
<p><strong>Berichtigen.</strong> Nach einer Neufeststellung, etwa nach einem ${h.a('verschlimmerungsantrag', 'Verschlimmerungsantrag')}, wird der Ausweis berichtigt, sobald der neue Bescheid unanfechtbar ist (§ 152 Abs. 5 Satz 5 SGB IX). Ein höherer GdB oder ein neues Merkzeichen steht also erst nach Ablauf der Widerspruchsfrist im Ausweis.</p>
<p><strong>Einziehen.</strong> Sinkt der GdB unter ${S.schwerbehinderung}, wird der Ausweis eingezogen, sobald der gesetzliche Schutz erloschen ist. Das ist nach ${h.src('sgb9_199', '§ 199 SGB IX')} am Ende des dritten Kalendermonats nach Unanfechtbarkeit des Bescheids. Bis dahin können Sie den Ausweis weiter nutzen.</p>
<h2>Ausweis beantragen</h2>
<p>Den Ausweis beantragen Sie zusammen mit dem GdB bei der zuständigen Behörde Ihres Landes; welche das ist, steht unter ${h.a('schwerbehindertenausweis-beantragen', 'Schwerbehindertenausweis beantragen')}. Was Sie mit dem Ausweis konkret erhalten, von der Steuer bis zum Zusatzurlaub, zeigt die Seite ${h.a('schwerbehindertenausweis-vorteile', 'Vorteile des Schwerbehindertenausweises')}. Ob Ihre Einzelwerte für die ${S.schwerbehinderung} reichen, prüft der ${h.a('home', 'Gesamt-GdB-Rechner')}.</p>
`,
  },
});
