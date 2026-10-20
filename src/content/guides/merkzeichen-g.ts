import { defineGuide } from '../../lib/guide-types';
import { fahrtkosten, rechte } from '../../lib/engine/rechte';
import { P } from '../../lib/engine/params';
import { MZ_INFO } from '../../data/merkzeichen';
import { formatMoney } from '../../lib/format';

/**
 * Merkzeichen G (§ 229 Abs. 1 SGB IX, VersMedV Teil D Nr. 1). Eigene Beispiele: Wertmarke oder halbe Kfz-Steuer
 * für eine Pendlerin und einen Autofahrer auf dem Land, Fahrtkostenpauschale bei GdB 60 und 70 mit G. Zahlen vom Motor.
 */
const W = P.wertmarke;
const eur = (x: number) => formatMoney(x, 0, 'de');
const minG = MZ_INFO.G.mindestGdb!;
// Fall 1: Pendlerin, Kfz-Steuer 110 € im Jahr, Monatskarte 49 €.
const f1 = { kfz: 110, karte: 49 };
const f1Wert = f1.karte * 12 - W.jahr;
const f1Kfz = f1.kfz / 2;
// Fall 2: Autofahrer auf dem Land, Kfz-Steuer 320 € im Jahr, Fahrkarten 8 € im Monat.
const f2 = { kfz: 320, karte: 8 };
const f2Wert = f2.karte * 12 - W.jahr;
const f2Kfz = f2.kfz / 2;
const fk60 = fahrtkosten(60, ['G']);
const fk70 = fahrtkosten(70, ['G']);
const zahl = (g: number) => rechte(g, ['G']).filter((r) => r.gilt && ['freifahrt', 'kfz', 'fahrtkosten'].includes(r.id)).length;
const n60 = zahl(60);
const n70 = zahl(70);

export default defineGuide({
  id: 'merkzeichen-g',
  group: 'merkzeichen',
  order: 310,
  mini: 'freifahrt',
  miniDefaults: { k: f1.kfz, f: f1.karte },
  miniHref: 'merkzeichen',
  related: ['merkzeichen', 'merkzeichen-b', 'merkzeichen-ag', 'gdb-70', 'fahrtkostenpauschale', 'schwerbehindertenausweis'],
  sources: ['sgb9_229', 'sgb9_228', 'versmedv', 'kraftstg3a', 'wertmarkeBerlin', 'estg33'],
  de: {
    slug: 'merkzeichen-g',
    nav: 'Merkzeichen G',
    card: 'Erheblich gehbehindert: die Gehstrecke als Maßstab, innere Leiden, Anfälle, Orientierung und die Wahl zwischen Wertmarke und halber Kfz-Steuer.',
    title: 'Merkzeichen G 2026: Voraussetzungen, Gehstrecke, Vorteile',
    description: `Merkzeichen G 2026: wann die Behörde eine erhebliche Gehbehinderung annimmt, Freifahrt mit Wertmarke für ${eur(W.jahr)} oder halbe Kfz-Steuer, Fahrtkosten ab ${P.fahrtkosten.gdb_klein_mit_g}.`,
    h1: 'Merkzeichen G: erheblich gehbehindert im Straßenverkehr',
    intro: 'Das Merkzeichen G hängt nicht an der Diagnose, sondern daran, ob Sie die im Ort üblichen Wege zu Fuß noch ohne erhebliche Schwierigkeiten schaffen.',
    resume: `Das Merkzeichen G erhält nach § 229 Absatz 1 SGB IX, wer infolge einer Einschränkung des Gehvermögens, auch durch innere Leiden, Anfälle oder Störungen der Orientierung, Wegstrecken im Ortsverkehr nicht ohne erhebliche Schwierigkeiten oder Gefahren zurücklegen kann, die üblicherweise noch zu Fuß gegangen werden. Die Versorgungsmedizin-Verordnung setzt dafür in Teil D Nummer 1 eine Strecke von etwa zwei Kilometern an, die in etwa einer halben Stunde zurückgelegt wird; auf die Wege am eigenen Wohnort kommt es nicht an. Voraussetzung ist die Schwerbehinderung, also ein GdB von mindestens ${minG}. G bringt den Ausweis mit orangefarbenem Flächenaufdruck und damit die Freifahrt im Nahverkehr mit einer Wertmarke für ${eur(W.jahr)} im Jahr oder ${eur(W.halbjahr)} im Halbjahr. Alternativ gibt es die halbe Kraftfahrzeugsteuer, aber nie beides zugleich. Ab GdB ${P.fahrtkosten.gdb_klein_mit_g} kommt mit G eine Fahrtkostenpauschale von ${eur(fk70)} im Jahr hinzu; bei GdB 60 mit G sind es ${eur(fk60)}. Ein Parkausweis für Behindertenparkplätze folgt aus G allein nicht.`,
    faqs: [
      { q: 'Zählt für das Merkzeichen G, wie weit meine Haltestelle entfernt ist?', a: 'Nein. Nach Teil D Nummer 1 Buchstabe b kommt es nicht auf die örtlichen Verhältnisse im Einzelfall an, sondern darauf, welche Wege nicht behinderte Menschen allgemein noch zu Fuß gehen, unabhängig vom Alter. Maßstab ist eine Strecke von etwa zwei Kilometern in etwa einer halben Stunde. Ein weiter Weg zum Bus auf dem Land begründet G also nicht, ein kurzer Weg in der Stadt schließt es nicht aus.' },
      { q: 'Kann ich mit Merkzeichen G zwischen Wertmarke und halber Kfz-Steuer wechseln?', a: `Ja, aber nicht für denselben Zeitraum. Die Steuerermäßigung wird nach § 3a Absatz 2 KraftStG nicht gewährt, solange Sie die Freifahrt nutzen, und die Wertmarke wird nach § 228 Absatz 5 SGB IX nicht ausgegeben, solange die Ermäßigung läuft. Wer eine Jahresmarke vor Ablauf eines halben Jahres zurückgibt, erhält auf Antrag die Hälfte der Gebühr zurück, also ${eur(W.jahr / 2)}.` },
      { q: 'Bekommen Kleinkinder das Merkzeichen G?', a: 'Ja, wenn die Voraussetzungen vorliegen. Teil D Nummer 1 Buchstabe c verlangt auch bei Säuglingen und Kleinkindern eine gutachtliche Beurteilung nach denselben Kriterien wie bei Erwachsenen mit gleichen Gesundheitsstörungen. Ob dem Kind tatsächlich Nachteile oder Mehrkosten entstehen, prüft die Behörde ausdrücklich nicht. Dass ein Kleinkind ohnehin getragen oder geschoben wird, spricht daher nicht gegen das Merkzeichen.' },
      { q: 'Gibt es mit Merkzeichen G einen Parkausweis?', a: 'Den EU-einheitlichen Parkausweis für Behindertenparkplätze gibt es mit G allein nicht. Die Verwaltungsvorschrift zur StVO sieht aber Parkerleichterungen für Menschen mit G und B vor, die einen GdB von mindestens 70 allein für die Beine und die Lendenwirbelsäule und zugleich mindestens 50 für Herz oder Atmungsorgane haben. Sie dürfen etwa im eingeschränkten Haltverbot länger parken, nicht aber auf den Plätzen mit Rollstuhlsymbol.' },
      { q: 'Welche Befunde stützen einen Antrag auf Merkzeichen G?', a: 'Hilfreich sind Berichte, die die Folgen für das Gehen beschreiben, nicht nur die Diagnose: orthopädische Bewegungsmaße, Befunde zur Durchblutung der Beine, Belastungs-EKG oder Ergometrie, Lungenfunktionswerte, ein Anfallskalender oder augenärztliche Werte. Notieren Sie, nach welcher Strecke und Zeit Sie stehen bleiben müssen und warum. Die Behörde stellt das Merkzeichen nach Aktenlage oder nach einer Untersuchung fest.' },
    ],
    body: (h) => `
<h2>Was das Merkzeichen G voraussetzt</h2>
<p>Das Gesetz fragt nicht, ob jemand überhaupt gehen kann, sondern ob die im Ortsverkehr üblichen Wege ohne erhebliche Schwierigkeiten oder ohne Gefahr für sich oder andere zu schaffen sind (${h.src('sgb9_229', '§ 229 Abs. 1 SGB IX')}). Die Ursache muss nicht in den Beinen liegen. Das Gesetz nennt ausdrücklich innere Leiden, Anfälle und Störungen der Orientierungsfähigkeit. Weil das Merkzeichen zur unentgeltlichen Beförderung nach § 228 SGB IX gehört, setzt es die Schwerbehinderung voraus: Unter GdB ${minG} trägt die Behörde G nicht ein. Ein hoher GdB allein reicht umgekehrt nicht. Wer GdB 80 wegen einer Erkrankung hat, die das Gehen nicht berührt, erhält kein G.</p>
<p>Die Feststellung trifft dieselbe Behörde, die den GdB feststellt, im selben Verfahren (§ 152 Abs. 4 SGB IX). Sie kreuzen G im Antrag an oder beantragen es später mit einem Änderungsantrag. Die Bewertungsregeln stehen in Teil D Nummer 1 der ${h.src('versmedv', 'Versorgungsmedizinischen Grundsätze')}.</p>
<h2>Die Maßstäbe aus Teil D Nummer 1</h2>
${h.table(['Ursache', 'Wann die Verordnung G annimmt'], [
  ['Beine und Lendenwirbelsäule', 'Funktionsstörungen, die sich auf das Gehen auswirken und für sich einen GdB von wenigstens 50 bedingen'],
  ['Beine unter GdB 50', 'besondere Auswirkung auf das Gehen, z. B. Versteifung der Hüfte, Versteifung von Knie oder Fuß in ungünstiger Stellung, arterielle Verschlusskrankheit mit GdB 40'],
  ['Herz', 'Beeinträchtigung der Herzleistung wenigstens nach Gruppe 3'],
  ['Lunge', 'dauernde Einschränkung der Lungenfunktion wenigstens mittleren Grades'],
  ['Andere innere Leiden', 'schwere Beeinträchtigung der Leistungsfähigkeit, z. B. Niereninsuffizienz mit ausgeprägter Anämie'],
  ['Anfälle', 'in der Regel ab mittlerer Häufigkeit mit GdS 70, wenn sie überwiegend am Tag auftreten; ebenso Diabetes mit häufigen hypoglykämischen Schocks'],
  ['Sehen', 'Sehbehinderung ab GdB 70; bei 50 oder 60 nur zusammen mit erheblichen Störungen der Ausgleichsfunktion'],
  ['Geistige Behinderung', 'bei GdB 100 immer, bei 80 oder 90 in den meisten Fällen, darunter nur in besonders gelagerten Einzelfällen'],
], 'Anhaltspunkte für das Merkzeichen G nach VersMedV Teil D Nr. 1', ['l', 'l'])}
<p>Die Tabelle gibt Regelfälle wieder. Die Behörde muss jeden Antrag einzeln prüfen; ein Leiden, das nicht in der Liste steht, kann G ebenso begründen, wenn es das Gehen ähnlich stark einschränkt. Bei Hörbehinderungen nimmt die Verordnung eine Orientierungsstörung nur bei Taubheit oder an Taubheit grenzender Schwerhörigkeit im Kindesalter an, bei Erwachsenen nur in Verbindung mit weiteren Störungen wie einer Sehbehinderung. Wer gehörlos ist, fährt unabhängig davon frei: Teil D Nummer 1 Buchstabe a stellt klar, dass hilflose und gehörlose Menschen stets Anspruch auf die unentgeltliche Beförderung haben.</p>
<h2>Wertmarke oder halbe Kraftfahrzeugsteuer</h2>
<p>Mit G können Sie zwischen zwei Vorteilen wählen. Die Wertmarke kostet ${h.eur(W.jahr)} für zwölf oder ${h.eur(W.halbjahr)} für sechs Monate (${h.src('wertmarkeBerlin', 'Gebühr seit 2025')}) und berechtigt zur Freifahrt in Bussen und Bahnen des Nahverkehrs. Die Alternative ist die Ermäßigung der Kraftfahrzeugsteuer um die Hälfte nach ${h.src('kraftstg3a', '§ 3a Abs. 2 KraftStG')}, für ein Fahrzeug und nur auf schriftlichen Antrag. Kostenlos ist die Wertmarke mit G nur, wenn Sie bestimmte Sozialleistungen beziehen, etwa laufende Leistungen zum Lebensunterhalt nach dem SGB II oder SGB XII (§ 228 Abs. 4 SGB IX).</p>
<p><strong>Eine Pendlerin</strong> zahlt für ihr kleines Auto ${h.eur(f1.kfz)} Kfz-Steuer im Jahr und kauft jeden Monat eine Nahverkehrskarte für ${h.eur(f1.karte)}. Die Wertmarke spart ihr nach Abzug der Gebühr ${h.eur(f1Wert)} im Jahr, die halbe Steuer nur ${h.eur(f1Kfz)}. Für sie ist die Wertmarke klar besser.</p>
<p><strong>Ein Autofahrer auf dem Land</strong> zahlt ${h.eur(f2.kfz)} Kfz-Steuer und fährt selten Bus, für etwa ${h.eur(f2.karte)} im Monat. Die Wertmarke brächte ihm ${f2Wert < 0 ? `ein Minus von ${h.eur(-f2Wert)}` : h.eur(f2Wert)}, die halbe Steuer ${h.eur(f2Kfz)}. Er beantragt die Steuerermäßigung.</p>
<p>Ihre eigenen Zahlen prüft der kleine Rechner. Mit den Merkzeichen H, Bl oder aG stellt sich die Frage nicht: Dann ist das Auto ganz steuerfrei, und die Wertmarke gibt es trotzdem.</p>
<h2>Fahrtkostenpauschale: wann G Geld bringt</h2>
<p>Steuerlich wirkt das Merkzeichen G nur in einem Fall. Nach ${h.src('estg33', '§ 33 Abs. 2a EStG')} erhalten Menschen mit GdB ${P.fahrtkosten.gdb_klein_mit_g} und Merkzeichen G eine behinderungsbedingte Fahrtkostenpauschale von ${h.eur(P.fahrtkosten.klein)} im Jahr; ohne G gilt sie erst ab GdB ${P.fahrtkosten.gdb_klein}. Bei GdB 60 mit G gibt es keine Pauschale. Nach dem Rechner dieser Seite bringt G deshalb mit GdB 60 ${n60} der drei Verkehrsvorteile (Freifahrt, Kfz-Steuer, Fahrtkosten), mit GdB 70 alle ${n70}. Die Pauschale zählt zu den außergewöhnlichen Belastungen und wirkt erst, soweit sie die zumutbare Belastung übersteigt; wie viel davon übrig bleibt, zeigt die Seite zur ${h.a('fahrtkostenpauschale', 'Fahrtkostenpauschale')}. Den Behinderten-Pauschbetrag verändert G nicht, er richtet sich allein nach dem GdB.</p>
<h2>G als Grundlage für weitere Merkzeichen</h2>
<p>Das ${h.a('merkzeichen-b', 'Merkzeichen B')} für eine Begleitperson setzt nach Teil D Nummer 2 voraus, dass die Voraussetzungen für G, Gl oder H vorliegen. Wer G hat und im Bus regelmäßig Hilfe beim Ein- und Aussteigen braucht, sollte B deshalb gleich mitbeantragen. Das ${h.a('merkzeichen-ag', 'Merkzeichen aG')} ist dagegen keine Steigerung von G mit eigenen Stufen: Es verlangt eine Beeinträchtigung, die einem GdB von mindestens 80 entspricht, und dass man sich außerhalb des Autos dauernd nur mit fremder Hilfe oder großer Anstrengung bewegen kann. Viele Menschen mit aG haben G zusätzlich im Ausweis; für den Parkausweis zählt nur aG.</p>
<h2>Wenn sich die Gehfähigkeit bessert</h2>
<p>Merkzeichen gelten nicht für immer. Nach Teil A Nummer 7 der Verordnung ist es eine wesentliche Änderung, wenn die Voraussetzungen für einen Nachteilsausgleich entfallen. Nach einer gelungenen Hüftoperation oder einer Behandlung, die die Herzleistung deutlich bessert, kann die Behörde G entziehen, auch wenn der GdB gleich bleibt. Umgekehrt lohnt ein neuer Antrag, wenn die Gehstrecke sich dauerhaft verkürzt hat. Wie das abläuft, steht unter ${h.a('verschlimmerungsantrag', 'Verschlimmerungsantrag')}; ob G zu Ihrem GdB passt, zeigt der ${h.a('merkzeichen', 'Merkzeichen-Rechner')}.</p>
<h2>Was im Ausweis steht</h2>
<p>Mit G erhalten Sie einen Ausweis mit halbseitigem orangefarbenem Flächenaufdruck; er zeigt dem Personal in Bus und Bahn, dass Sie zur Freifahrt berechtigt sein können. Das G steht auf der Rückseite. Gültig wird die Freifahrt erst mit der Wertmarke, die Sie bei derselben Behörde beantragen, die den Ausweis ausstellt (§ 228 Abs. 5 SGB IX). Mehr zu Farbe, Gültigkeit und Verlängerung steht unter ${h.a('schwerbehindertenausweis', 'Schwerbehindertenausweis')}.</p>
`,
  },
});
