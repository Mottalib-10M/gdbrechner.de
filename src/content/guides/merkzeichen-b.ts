import { defineGuide } from '../../lib/guide-types';
import { rechte } from '../../lib/engine/rechte';
import { P } from '../../lib/engine/params';
import { MZ_INFO } from '../../data/merkzeichen';
import { formatMoney } from '../../lib/format';

/**
 * Merkzeichen B (§ 229 Abs. 2, § 228 Abs. 6 SGB IX, VersMedV Teil D Nr. 2, SchwbAwV § 3 Abs. 2).
 * Eigene Beispiele: drei Reisen (Stadtbus, Regionalzug, Fernzug) mit und ohne Wertmarke; Zählung vom Motor.
 */
const eur = (x: number) => formatMoney(x, 0, 'de');
const minB = MZ_INFO.B.mindestGdb!;
const vorteile = (m: Parameters<typeof rechte>[1]) => rechte(70, m).filter((r) => r.gilt && ['freifahrt', 'kfz', 'begleitung', 'parken', 'rundfunk', 'fahrtkosten'].includes(r.id)).length;
const nG = vorteile(['G']);
const nGB = vorteile(['G', 'B']);

export default defineGuide({
  id: 'merkzeichen-b',
  group: 'merkzeichen',
  order: 330,
  mini: 'merkzeichen',
  miniDefaults: { m: 3, g: 70 },
  miniHref: 'merkzeichen',
  related: ['merkzeichen', 'merkzeichen-g', 'merkzeichen-h', 'merkzeichen-bl', 'schwerbehindertenausweis'],
  sources: ['sgb9_229', 'sgb9_228', 'schwbawv3', 'versmedv', 'wertmarkeBerlin'],
  de: {
    slug: 'merkzeichen-b',
    nav: 'Merkzeichen B',
    card: 'Begleitperson fährt kostenlos mit, in Bus, Regionalzug und Fernverkehr: wer B bekommt, was B nicht bedeutet und was Begleitung, Hund und Rollstuhl betrifft.',
    title: 'Merkzeichen B 2026: Begleitperson fährt kostenlos mit',
    description: `Merkzeichen B 2026: Begleitperson fährt in Nah- und Fernverkehr gratis, auch ohne Wertmarke. Wer B bekommt, warum G, Gl oder H nötig ist und was B nicht heißt.`,
    h1: 'Merkzeichen B: die Begleitperson fährt umsonst',
    intro: 'Mit dem Merkzeichen B fährt eine Begleitperson in Bus und Bahn unentgeltlich mit; es sagt nichts darüber, ob Sie allein reisen dürfen.',
    resume: `Das Merkzeichen B steht für die Berechtigung zur Mitnahme einer Begleitperson. Nach § 229 Absatz 2 SGB IX erhalten es schwerbehinderte Menschen, die bei der Benutzung öffentlicher Verkehrsmittel infolge ihrer Behinderung regelmäßig auf Hilfe angewiesen sind; nach Teil D Nummer 2 der Versorgungsmedizin-Verordnung müssen zugleich die Voraussetzungen für G, Gl oder H vorliegen, und der GdB muss mindestens ${minB} betragen. Die Begleitperson fährt nach § 228 Absatz 6 im Nah- und im Fernverkehr unentgeltlich, und zwar auch dann, wenn der schwerbehinderte Mensch keine Wertmarke hat. Die Wertmarke für ${eur(P.wertmarke.jahr)} im Jahr braucht nur, wer selbst im Nahverkehr frei fahren will. Ebenfalls kostenlos befördert werden Handgepäck, Rollstuhl, orthopädische Hilfsmittel und Führhund. B steht auf der Vorderseite des Ausweises mit dem Satz „Die Berechtigung zur Mitnahme einer Begleitperson ist nachgewiesen“. Das Gesetz stellt klar, dass B nicht bedeutet, dass Sie ohne Begleitung eine Gefahr für sich oder andere sind. Pauschbetrag und Steuer ändert B nicht.`,
    faqs: [
      { q: 'Muss meine Begleitperson im Fernzug eine Fahrkarte kaufen?', a: 'Nein. § 228 Absatz 6 SGB IX erstreckt die unentgeltliche Beförderung der Begleitperson ausdrücklich auf den Nah- und den Fernverkehr im Sinne des § 230. Anders ist es für Sie selbst: Ihre eigene Freifahrt gilt nur im Nahverkehr. Im Fernzug lösen Sie also eine Fahrkarte für sich, Ihre Begleitung fährt ohne. Welche Züge zum Fernverkehr nach § 230 gehören, regelt das Gesetz dort im Einzelnen.' },
      { q: 'Bedeutet das Merkzeichen B, dass ich nicht allein fahren darf?', a: 'Nein. § 229 Absatz 2 Satz 2 SGB IX sagt ausdrücklich, dass die Feststellung nicht bedeutet, dass die schwerbehinderte Person ohne Begleitung eine Gefahr für sich oder andere darstellt. B ist ein Recht, keine Pflicht. Sie entscheiden bei jeder Fahrt, ob Sie jemanden mitnehmen. Auch Ihr Ausweis bleibt mit B derselbe, ob Sie allein oder begleitet unterwegs sind.' },
      { q: 'Braucht die Begleitperson einen eigenen Nachweis?', a: 'Nein. Der Nachweis steht in Ihrem Ausweis: Die Berechtigung muss eingetragen sein, also B auf der Vorderseite mit dem vorgeschriebenen Satz. Die Begleitperson muss weder behindert sein noch einen eigenen Ausweis vorlegen, und das Gesetz verlangt nicht, dass es immer dieselbe Person ist. Kontrolliert wird Ihr Ausweis; reisen Sie deshalb gemeinsam und halten Sie ihn bereit.' },
      { q: 'Darf ich mit Merkzeichen B einen Hund kostenlos mitnehmen?', a: 'Ja, in mehreren Fällen. Ein Führhund fährt nach § 228 Absatz 6 Nummer 2 stets unentgeltlich mit. Wer B im Ausweis hat, darf außerdem einen Hund kostenlos mitnehmen, auch wenn er kein Führhund ist. Dasselbe gilt für einen nach dem Behindertengleichstellungsgesetz gekennzeichneten Assistenzhund. Handgepäck, ein Rollstuhl, soweit das Fahrzeug ihn zulässt, und orthopädische Hilfsmittel sind ebenfalls frei.' },
      { q: 'Gibt es das Merkzeichen B schon für Säuglinge?', a: 'Ja. Teil D Nummer 2 Buchstabe a der Verordnung verlangt auch bei Säuglingen und Kleinkindern eine gutachtliche Beurteilung nach denselben Kriterien wie bei Erwachsenen mit gleichen Gesundheitsstörungen. Ob tatsächlich Mehrkosten entstehen, prüft die Behörde nicht. Dass jedes Kleinkind ohnehin begleitet wird, schließt B daher nicht aus; es kommt auf die Voraussetzungen von G, Gl oder H und den behinderungsbedingten Hilfebedarf an.' },
      { q: 'Brauche ich für die Freifahrt meiner Begleitung eine Wertmarke?', a: `Nein. § 228 Absatz 6 befreit die Begleitperson ausdrücklich, „ohne dass die Voraussetzung des Absatzes 1 Satz 2 erfüllt sein muss“, also ohne gültige Wertmarke. Die Wertmarke für ${eur(P.wertmarke.jahr)} brauchen Sie nur für Ihre eigene Freifahrt im Nahverkehr. Wer mit G die halbe Kfz-Steuer gewählt hat und deshalb keine Wertmarke besitzt, kann seine Begleitung trotzdem kostenlos mitnehmen.` },
    ],
    body: (h) => `
<h2>Wer das Merkzeichen B bekommt</h2>
<p>Die Grundregel steht in ${h.src('sgb9_229', '§ 229 Abs. 2 SGB IX')}: Zur Mitnahme einer Begleitperson berechtigt sind schwerbehinderte Menschen, die bei der Benutzung öffentlicher Verkehrsmittel infolge ihrer Behinderung regelmäßig auf Hilfe angewiesen sind. Die ${h.src('versmedv', 'Versorgungsmedizinischen Grundsätze')} präzisieren das in Teil D Nummer 2. B setzt voraus, dass zugleich die Voraussetzungen für ${h.a('merkzeichen-g', 'G')}, Gl oder ${h.a('merkzeichen-h', 'H')} vorliegen. Dann kommt es darauf an, ob Sie regelmäßig fremde Hilfe brauchen beim Ein- und Aussteigen, während der Fahrt oder zum Ausgleich von Orientierungsstörungen, etwa wegen einer Sehbehinderung oder einer geistigen Behinderung.</p>
<p>Für einige Gruppen nimmt die Verordnung B regelhaft an: bei Querschnittgelähmten, bei Ohnhändern und bei blinden und sehbehinderten, hörbehinderten, geistig behinderten Menschen und Anfallskranken, bei denen eine erhebliche Beeinträchtigung der Bewegungsfähigkeit im Straßenverkehr anerkannt ist. Für alle anderen prüft die Behörde den Einzelfall. Wer nur gelegentlich Hilfe braucht, etwa bei Glätte oder auf unbekannten Strecken, erfüllt das Merkmal „regelmäßig“ meist nicht.</p>
<h2>Was B bewirkt</h2>
${h.table(['Wer oder was', 'Nahverkehr', 'Fernverkehr'], [
  ['Sie selbst', 'frei mit Wertmarke', 'Fahrkarte nötig'],
  ['Ihre Begleitperson', 'frei, ohne Wertmarke', 'frei, ohne Wertmarke'],
  ['Handgepäck, Rollstuhl, orthopädische Hilfsmittel', 'frei', 'frei'],
  ['Führhund, Assistenzhund, Hund bei B', 'frei', 'frei'],
], 'Unentgeltliche Beförderung nach § 228 Abs. 1 und 6 SGB IX', ['l', 'l', 'l'])}
<p>Die Tabelle zeigt den wichtigsten Unterschied, der oft übersehen wird: Ihre eigene Freifahrt hängt an der Wertmarke und gilt nur im Nahverkehr (${h.src('sgb9_228', '§ 228 Abs. 1 SGB IX')}). Die Freifahrt Ihrer Begleitung hängt nicht an der Wertmarke und gilt auch im Fernverkehr. Die Wertmarke kostet ${h.eur(P.wertmarke.jahr)} für zwölf oder ${h.eur(P.wertmarke.halbjahr)} für sechs Monate, mit H oder Bl nichts.</p>
<h2>Drei Reisen mit B</h2>
<p><strong>Mit dem Stadtbus zur Therapie.</strong> Eine Frau mit GdB 70, G und B fährt zweimal in der Woche mit ihrem Mann zur Physiotherapie. Sie hat eine Wertmarke; beide fahren kostenlos. Ohne Wertmarke müsste sie selbst eine Fahrkarte lösen, ihr Mann führe trotzdem umsonst.</p>
<p><strong>Mit dem Regionalzug zur Familie.</strong> Ein junger Mann mit Anfallsleiden, G und B besucht seine Eltern. Er nimmt einen Freund mit, beim nächsten Mal seine Schwester. Das Gesetz verlangt keine feste Begleitperson. Seine Wertmarke deckt seine eigene Fahrt im Nahverkehr.</p>
<p><strong>Mit dem Fernzug in den Urlaub.</strong> Ein blinder Mann mit Bl, H, G und B reist mit seiner Tochter und seinem Führhund. Er braucht für sich eine Fahrkarte, weil die Freifahrt der Wertmarke nicht für den Fernverkehr gilt. Tochter und Hund fahren unentgeltlich.</p>
<p>Mit GdB 70 und G allein ergibt der Rechner dieser Seite ${nG} von sechs Verkehrs- und Beitragsvorteilen, mit G und B ${nGB}. Was ein einzelnes Merkzeichen zu Ihrem GdB bringt, zeigt der kleine Rechner oben.</p>
<h2>Wie B im Ausweis steht</h2>
<p>Anders als die übrigen Merkzeichen steht B nicht auf der Rückseite. Nach ${h.src('schwbawv3', '§ 3 Abs. 2 der Schwerbehindertenausweisverordnung')} werden auf der Vorderseite das Merkzeichen B und der Satz „Die Berechtigung zur Mitnahme einer Begleitperson ist nachgewiesen“ eingetragen. Diese Eintragung ist die Voraussetzung dafür, dass das Verkehrsunternehmen die Begleitung kostenlos befördern muss. Ein Bescheid allein genügt im Bus nicht; tragen Sie den Ausweis bei sich.</p>
<h2>Was B nicht ist</h2>
<p>B ist keine Feststellung über Ihre Fähigkeiten im Alltag und kein Hinweis an Arbeitgeber oder Behörden, dass Sie ständig begleitet werden müssten. Das Gesetz sagt das in § 229 Absatz 2 Satz 2 ausdrücklich. B ist auch kein steuerlicher Vorteil: Behinderten-Pauschbetrag und Fahrtkostenpauschale richten sich nach dem GdB und den Merkzeichen G, aG, H, Bl und TBl, nicht nach B. Ermäßigungen für Begleitpersonen in Museen, Theatern oder Freizeitbädern beruhen nicht auf diesem Gesetz; ob es sie gibt, entscheidet der jeweilige Anbieter.</p>
<h2>B beantragen</h2>
<p>B beantragen Sie bei derselben Behörde wie GdB und G, im Erstantrag oder später mit einem Änderungsantrag. Beschreiben Sie konkrete Situationen: Sie können ohne Hilfe nicht in einen Bus mit Stufe einsteigen, Sie verlieren in Bahnhöfen die Orientierung, Sie brauchen bei Anfällen jemanden, der eingreift. Ärztliche Berichte, die diese Folgen bestätigen, sind wichtiger als Diagnosen. Liegt bei Ihnen G noch nicht vor, beantragen Sie beides zusammen. Wie das Verfahren abläuft, steht unter ${h.a('schwerbehindertenausweis-beantragen', 'Schwerbehindertenausweis beantragen')}.</p>
`,
  },
});
