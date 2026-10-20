import { defineGuide } from '../../lib/guide-types';
import { pauschbetrag } from '../../lib/engine/rechte';
import { steuerwirkung } from '../../lib/engine/steuer';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

/**
 * Behinderten-Pauschbetrag (§ 33b Abs. 3 EStG) mit Steuerwirkung nach Tarif 2026. Eigene Beispiele:
 * Rentnerin mit GdB 50 und 22.000 €, Ehepaar mit GdB 80 und 70.000 €, Merkzeichen H. Alle Zahlen vom Motor.
 */
const eur = (x: number) => formatMoney(x, 0, 'de');
const PB = P.pauschbetrag;
const rentnerin = steuerwirkung({ zve: 22000, splitting: false, kirche: 0, pauschbetrag: pauschbetrag(50), fahrtkosten: 0, weitereAgB: 0, kinder: 0 });
const paar = steuerwirkung({ zve: 70000, splitting: true, kirche: 0.09, pauschbetrag: pauschbetrag(80), fahrtkosten: P.fahrtkosten.klein, weitereAgB: 0, kinder: 0 });
const hilflos = steuerwirkung({ zve: 45000, splitting: false, kirche: 0, pauschbetrag: PB.erhoeht, fahrtkosten: P.fahrtkosten.gross, weitereAgB: 0, kinder: 0 });

export default defineGuide({
  id: 'behinderten-pauschbetrag',
  group: 'rechner',
  order: 120,
  tool: 'pauschbetrag',
  related: ['fahrtkostenpauschale', 'pauschbetrag-kind', 'gdb-50', 'merkzeichen-h', 'home'],
  sources: ['estg33b', 'estg33', 'estg32a', 'solzg', 'estdv65'],
  de: {
    slug: 'behinderten-pauschbetrag',
    nav: 'Behinderten-Pauschbetrag',
    card: 'Pauschbetrag von 384 bis 7.400 € und die Steuer, die er wirklich spart, mit Fahrtkostenpauschale und zumutbarer Belastung.',
    title: 'Behinderten-Pauschbetrag 2026: Tabelle und Steuerersparnis',
    description: `Behinderten-Pauschbetrag 2026 nach § 33b EStG: ${eur(PB.stufen[0][1])} bei GdB 20 bis ${eur(PB.erhoeht)} mit H oder Bl. Der Rechner zeigt die echte Steuerersparnis nach Tarif 2026.`,
    h1: 'Behinderten-Pauschbetrag: Betrag und echte Steuerersparnis',
    intro: 'GdB und Einkommen eingeben: Der Rechner nennt den Pauschbetrag, die Fahrtkostenpauschale und wie viel Steuer beides 2026 tatsächlich spart.',
    resume: `Der Behinderten-Pauschbetrag nach § 33b Absatz 3 EStG steht jedem zu, dessen GdB auf mindestens ${PB.stufen[0][0]} festgestellt ist, ohne Belege. Er beträgt ${PB.stufen.map(([g, b]) => `${eur(b)} bei GdB ${g}`).join(', ')}; Menschen mit Merkzeichen H, Bl oder TBl erhalten ${eur(PB.erhoeht)}. Die Beträge gelten seit ${PB.seit_vz} unverändert. Der Pauschbetrag mindert das zu versteuernde Einkommen, nicht die Steuer selbst: Eine Rentnerin mit GdB 50 und ${eur(22000)} zu versteuerndem Einkommen spart ${eur(rentnerin.ersparnis)} im Jahr, ein Ehepaar mit GdB 80 und ${eur(70000)} spart mit Fahrtkostenpauschale und Kirchensteuer ${eur(paar.ersparnis)}. Seit 2026 berücksichtigt das Finanzamt neue Feststellungen nur, wenn die Behörde sie elektronisch übermittelt hat; dafür braucht sie Ihre Steuer-Identifikationsnummer. Der Pauschbetrag gilt für das ganze Jahr, in dem der GdB besteht, auch wenn er erst im Dezember festgestellt wird.`,
    faqs: [
      { q: 'Gibt es den Pauschbetrag rückwirkend?', a: 'Ja, für jedes Jahr, für das der Bescheid den GdB feststellt, und soweit der Steuerbescheid dieses Jahres noch geändert werden kann. Stellt die Behörde den GdB rückwirkend fest, ist das ein Grund, einen bestandskräftigen Steuerbescheid zu ändern. Die Behörde muss das besondere Interesse an der Rückwirkung allerdings glaubhaft gemacht bekommen; schreiben Sie das in den Antrag.' },
      { q: 'Muss ich den Ausweis beim Finanzamt einreichen?', a: `Für Feststellungen ab dem 1. Januar 2026 nicht mehr: Die Behörde übermittelt GdB und Merkzeichen elektronisch an das Finanzamt, wenn Sie Ihre Steuer-Identifikationsnummer angeben (§ 65 Abs. 3a EStDV). Ältere Ausweise und Bescheide gelten weiter, bis sich die Feststellung ändert. Ohne Übermittlung oder gültigen alten Nachweis gibt es keinen Pauschbetrag.` },
      { q: 'Kann ich statt des Pauschbetrags die tatsächlichen Kosten absetzen?', a: 'Ja. Der Pauschbetrag gilt laufende, typische Mehraufwendungen ab, etwa für Pflege und erhöhten Wäschebedarf. Wer höhere Kosten hat, kann sie stattdessen als außergewöhnliche Belastung nach § 33 EStG nachweisen; sie werden dann um die zumutbare Belastung gekürzt. Das Wahlrecht gilt einheitlich für das ganze Jahr. Krankheitskosten wie Zuzahlungen und Operationen kommen ohnehin zusätzlich hinzu.' },
      { q: `Warum spart der Pauschbetrag weniger als ${eur(PB.stufen[3][1])}?`, a: `Weil er das zu versteuernde Einkommen senkt, nicht die Steuer. Die Ersparnis ist der Pauschbetrag mal Ihrem Grenzsteuersatz, plus Solidaritätszuschlag und Kirchensteuer, wenn sie anfallen. Bei einem Grenzsteuersatz von 25 Prozent bringen ${eur(PB.stufen[3][1])} rund ${eur(PB.stufen[3][1] * 0.25)}. Wer unter dem Grundfreibetrag von ${eur(P.steuer.tarif.grundfreibetrag)} liegt, spart nichts.` },
    ],
    body: (h) => `
<h2>Die Tabelle 2026</h2>
${h.table(['GdB', 'Pauschbetrag im Jahr', 'Fahrtkostenpauschale'], [
  ...PB.stufen.map(([g, b]) => [String(g), h.eur(b), g >= P.fahrtkosten.gdb_klein ? h.eur(P.fahrtkosten.klein) : g >= P.fahrtkosten.gdb_klein_mit_g ? `${h.eur(P.fahrtkosten.klein)} mit G` : '–']),
  ['H, Bl, TBl', h.eur(PB.erhoeht), h.eur(P.fahrtkosten.gross)],
], 'Pauschbeträge nach § 33b Abs. 3 EStG und Fahrtkostenpauschale nach § 33 Abs. 2a EStG', ['l', 'r', 'r'])}
<p>Mit aG gibt es ${h.eur(P.fahrtkosten.gross)} Fahrtkostenpauschale, aber nur den Pauschbetrag nach dem GdB. Pflegegrad 4 oder 5 steht steuerlich dem Merkzeichen H gleich (§ 65 Abs. 2 EStDV): Dann gilt der erhöhte Betrag von ${h.eur(PB.erhoeht)} auch ohne Merkzeichen im Ausweis.</p>
<h2>Was der Pauschbetrag wirklich bringt</h2>
<p>Drei Fälle mit dem Tarif 2026, Solidaritätszuschlag eingerechnet: Die Rentnerin mit GdB 50 und ${h.eur(22000)} zu versteuerndem Einkommen zahlt ${h.eur(rentnerin.ohne)} ohne und ${h.eur(rentnerin.mit)} mit Pauschbetrag. Das Ehepaar mit GdB 80, Zusammenveranlagung und 9 Prozent Kirchensteuer zahlt ${h.eur(paar.ohne)} statt ${h.eur(paar.mit)}; die Fahrtkostenpauschale wirkt nur, soweit sie die zumutbare Belastung von ${h.eur(paar.zumutbar)} übersteigt, hier mit ${h.eur(paar.abzug33)}. Ein Mensch mit Merkzeichen H und ${h.eur(45000)} spart ${h.eur(hilflos.ersparnis)}.</p>
<p>Die ${h.a('fahrtkostenpauschale', 'Fahrtkostenpauschale')} ist keine eigene Freistellung wie der Pauschbetrag, sondern eine außergewöhnliche Belastung. Wer sonst keine Krankheitskosten hat, verliert bei mittlerem Einkommen einen großen Teil an die zumutbare Belastung. Wer Zuzahlungen, Brillen oder Zahnersatz selbst bezahlt, sollte diese Kosten mit eintragen: Sie werden zusammen mit der Pauschale gekürzt, nicht jede für sich.</p>
<h2>Für Kinder und Partner</h2>
<p>Steht der Pauschbetrag einem Kind zu, das ihn nicht selbst nutzt, können ihn die Eltern übernehmen, je zur Hälfte oder auf gemeinsamen Antrag anders verteilt (§ 33b Abs. 5 EStG). Voraussetzung ist die Steuer-Identifikationsnummer des Kindes in der Erklärung. Einzelheiten und ein eigener Rechner: ${h.a('pauschbetrag-kind', 'Pauschbetrag des Kindes übertragen')}. Bei Ehepaaren mit Zusammenveranlagung kann jeder Partner seinen eigenen Pauschbetrag geltend machen; haben beide einen GdB, zählen beide Beträge.</p>
<h2>So rechnet der Rechner</h2>
<p>Einkommensteuer nach § 32a EStG für 2026 (${h.src('estg32a', 'Tarif')}), Solidaritätszuschlag mit Freigrenze und Milderungszone (${h.src('solzg', 'SolZG')}), Kirchensteuer mit 8 oder 9 Prozent. Die zumutbare Belastung wird stufenweise gerechnet; als Gesamtbetrag der Einkünfte nimmt der Rechner vereinfachend das eingegebene Einkommen. Kinderfreibeträge und Sonderausgaben sind nicht modelliert; mit Kindern ist die tatsächliche Steuer meist etwas niedriger. Den Pauschbetrag tragen Sie in der Anlage Außergewöhnliche Belastungen ein.</p>
`,
  },
});
