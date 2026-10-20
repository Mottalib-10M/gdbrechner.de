import { defineGuide } from '../../lib/guide-types';
import { pauschbetrag } from '../../lib/engine/rechte';
import { steuerwirkung, zumutbar } from '../../lib/engine/steuer';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

/**
 * Behinderungsbedingte Fahrtkostenpauschale (§ 33 Abs. 2a EStG). Eigene Beispiele: zumutbare Belastung bei 20.000,
 * 35.000 und 55.000 € (ledig, verheiratet, mit Kindern), Rentner mit aG, Familie mit Zuzahlungen. Alle Zahlen vom Motor.
 */
const F = P.fahrtkosten;
const eur = (x: number) => formatMoney(x, 0, 'de');
const rest = (betrag: number, z: number) => Math.max(0, betrag - z);
const faelle = [
  { text: 'ledig, 20.000 €', z: zumutbar(20000, false, 0) },
  { text: 'ledig, 35.000 €', z: zumutbar(35000, false, 0) },
  { text: 'verheiratet, 55.000 €', z: zumutbar(55000, true, 0) },
  { text: 'verheiratet, 2 Kinder, 55.000 €', z: zumutbar(55000, true, 2) },
];
const rentner = steuerwirkung({ zve: 24000, splitting: false, kirche: 0, pauschbetrag: pauschbetrag(80), fahrtkosten: F.gross, weitereAgB: 0, kinder: 0 });
const rentnerOhne = steuerwirkung({ zve: 24000, splitting: false, kirche: 0, pauschbetrag: pauschbetrag(80), fahrtkosten: 0, weitereAgB: 0, kinder: 0 });
const familie = steuerwirkung({ zve: 55000, splitting: true, kirche: 0, pauschbetrag: pauschbetrag(80), fahrtkosten: F.klein, weitereAgB: 1200, kinder: 2 });
const familieOhne = steuerwirkung({ zve: 55000, splitting: true, kirche: 0, pauschbetrag: pauschbetrag(80), fahrtkosten: 0, weitereAgB: 1200, kinder: 2 });

export default defineGuide({
  id: 'fahrtkostenpauschale',
  group: 'arbeit',
  order: 530,
  mini: 'fahrt',
  miniHref: 'behinderten-pauschbetrag',
  related: ['behinderten-pauschbetrag', 'gdb-70', 'gdb-80', 'merkzeichen-ag', 'pauschbetrag-kind'],
  sources: ['estg33', 'estg33b', 'estdv65'],
  de: {
    slug: 'fahrtkostenpauschale',
    nav: 'Fahrtkostenpauschale',
    card: `${eur(F.klein)} oder ${eur(F.gross)} im Jahr für Fahrten wegen der Behinderung: wer sie bekommt und warum die zumutbare Belastung oft viel davon schluckt.`,
    title: `Fahrtkostenpauschale Behinderung 2026: ${F.klein} oder ${eur(F.gross)}`,
    description: `Fahrtkostenpauschale 2026 nach § 33 Abs. 2a EStG: ${eur(F.klein)} ab GdB ${F.gdb_klein} oder ${F.gdb_klein_mit_g} mit G, ${eur(F.gross)} mit aG, Bl, TBl oder H. Was nach der zumutbaren Belastung bleibt.`,
    h1: 'Behinderungsbedingte Fahrtkostenpauschale',
    intro: `Die Fahrtkostenpauschale ersetzt seit ${P.pauschbetrag.seit_vz} den Einzelnachweis behinderungsbedingter Fahrten; ihr Steuerwert hängt stark von der zumutbaren Belastung ab.`,
    resume: `Die behinderungsbedingte Fahrtkostenpauschale nach § 33 Absatz 2a EStG beträgt ${eur(F.klein)} im Jahr für Menschen mit einem GdB von mindestens ${F.gdb_klein} oder mit GdB ${F.gdb_klein_mit_g} und Merkzeichen G. Menschen mit den Merkzeichen aG, Bl, TBl oder H erhalten ${eur(F.gross)}; die kleine Pauschale kommt dann nicht hinzu. Über die Pauschale hinaus sind keine weiteren behinderungsbedingten Fahrtkosten absetzbar, auch nicht mit Fahrtenbuch. Anders als der Behinderten-Pauschbetrag ist sie eine außergewöhnliche Belastung: Sie wird mit anderen Krankheitskosten zusammengerechnet und nur abgezogen, soweit die Summe die zumutbare Belastung übersteigt. Bei ledigen Steuerpflichtigen mit ${eur(35000)} Einkünften liegt diese bei ${eur(faelle[1].z)}, die kleine Pauschale allein bleibt also wirkungslos. Ein Rentner mit aG und ${eur(24000)} Einkommen spart mit der großen Pauschale dagegen ${eur(rentner.ersparnis - rentnerOhne.ersparnis)} zusätzlich. Steht die Pauschale einem Kind zu, können die Eltern sie wie den Pauschbetrag übernehmen.`,
    faqs: [
      { q: `Wer bekommt die Fahrtkostenpauschale von ${F.klein} Euro?`, a: `Menschen mit einem GdB von mindestens ${F.gdb_klein} und Menschen mit einem GdB von mindestens ${F.gdb_klein_mit_g}, in deren Ausweis das Merkzeichen G eingetragen ist. Bei GdB ${F.gdb_klein_mit_g} ohne G oder bei GdB 60 mit G gibt es keine Pauschale. Ein Nachweis über tatsächliche Fahrten ist nicht nötig; es genügt die Feststellung, die seit 2026 elektronisch an das Finanzamt geht.` },
      { q: 'Kann ich Arztfahrten zusätzlich zur Pauschale absetzen?', a: 'Ja, wenn es Fahrten zur Heilbehandlung sind. Sie gelten als Krankheitskosten, nicht als behinderungsbedingte Fahrten, und werden neben der Pauschale berücksichtigt. Ausgeschlossen sind nur weitere Fahrtkosten, die wegen der Behinderung entstehen, etwa für Einkäufe, Besuche oder Freizeit, auch Taxifahrten. Bewahren Sie für Arztfahrten Termine und Belege auf. Beides zusammen wird um die zumutbare Belastung gekürzt.' },
      { q: 'Warum zieht das Finanzamt die Fahrtkostenpauschale nicht voll ab?', a: 'Weil sie eine außergewöhnliche Belastung nach § 33 EStG ist. Das Finanzamt rechnet alle außergewöhnlichen Belastungen zusammen und zieht davon die zumutbare Belastung ab, die von Einkünften, Familienstand und Kinderzahl abhängt. Nur der Rest mindert das Einkommen. Der Behinderten-Pauschbetrag wird dagegen voll abgezogen, er ist von der Kürzung nicht betroffen.' },
      { q: 'Gibt es die Pauschale auch für das Jahr der Feststellung?', a: 'Ja, für jedes Kalenderjahr, in dem die Voraussetzungen vorliegen, in voller Höhe. Eine Aufteilung nach Monaten sieht § 33 Abs. 2a EStG nicht vor. Wird der GdB rückwirkend festgestellt, können Sie die Pauschale auch für frühere Jahre geltend machen, solange deren Steuerbescheide noch geändert werden können. Der neue Feststellungsbescheid ist dafür ein Änderungsgrund.' },
      { q: 'Bekomme ich die große Pauschale mit Pflegegrad 4?', a: `Für den Pauschbetrag steht Pflegegrad 4 oder 5 dem Merkzeichen H gleich (§ 65 Abs. 2 EStDV), dann gilt der erhöhte Betrag von ${eur(P.pauschbetrag.erhoeht)}. § 33 Abs. 2a EStG nennt für die große Fahrtkostenpauschale dagegen die Merkzeichen aG, Bl, TBl und H. Lassen Sie im Zweifel das Merkzeichen H feststellen, damit beide Beträge sicher anerkannt werden.` },
    ],
    body: (h) => `
<h2>Wer welche Pauschale bekommt</h2>
${h.table(['Voraussetzung', 'Pauschale im Jahr'], [
  [`GdB ab ${F.gdb_klein}`, h.eur(F.klein)],
  [`GdB ${F.gdb_klein_mit_g} mit Merkzeichen G`, h.eur(F.klein)],
  [`GdB ${F.gdb_klein_mit_g} ohne G, GdB 60 mit G`, h.eur(0)],
  ['Merkzeichen aG, Bl, TBl oder H, unabhängig vom GdB', h.eur(F.gross)],
], 'Fahrtkostenpauschale nach § 33 Abs. 2a EStG, Stand 2026', ['l', 'r'])}
<p>Die Pauschale gibt es seit dem Veranlagungszeitraum ${P.pauschbetrag.seit_vz}. Sie ersetzt die frühere Praxis, behinderungsbedingte Fahrten einzeln nachzuweisen. Wer die Voraussetzungen erfüllt, trägt den Betrag in der Anlage Außergewöhnliche Belastungen ein. Den Nachweis führt die Behörde: Seit dem 1. Januar 2026 übermittelt sie GdB und Merkzeichen elektronisch an das Finanzamt, wenn Sie Ihre Steuer-Identifikationsnummer angegeben haben (§ 65 Abs. 3a EStDV). Mit dem Rechner sehen Sie, wie viel bei Ihren Einkünften wirkt.</p>
<h2>Die zumutbare Belastung frisst einen Teil</h2>
<p>Die zumutbare Belastung ist ein Eigenanteil, den das Finanzamt bei allen außergewöhnlichen Belastungen abzieht. Sie wird stufenweise berechnet: ein Prozentsatz auf die Einkünfte bis ${h.eur(P.steuer.zumutbar.grenze1)}, ein höherer bis ${h.eur(P.steuer.zumutbar.grenze2)} und der höchste darüber. Ledige ohne Kinder tragen ${h.pct(P.steuer.zumutbar.ohne_kinder_grund[0])} bis ${h.pct(P.steuer.zumutbar.ohne_kinder_grund[2])}, Eltern mit ein oder zwei Kindern ${h.pct(P.steuer.zumutbar.kinder_1_2[0])} bis ${h.pct(P.steuer.zumutbar.kinder_1_2[2])}.</p>
${h.table(['Fall', 'Zumutbare Belastung', `Rest von ${h.eur(F.klein)}`, `Rest von ${h.eur(F.gross)}`], faelle.map((f) => [f.text, h.eur(f.z), h.eur(rest(F.klein, f.z)), h.eur(rest(F.gross, f.z))]), 'Was ohne weitere Krankheitskosten von der Pauschale abziehbar bleibt', ['l', 'r', 'r', 'r'])}
<p>Die Tabelle zeigt: Die kleine Pauschale wirkt in keinem der vier Fälle allein, sie verschwindet vollständig in der zumutbaren Belastung. Sie kommt erst zum Tragen, wenn weitere Krankheitskosten hinzukommen. Eine Familie mit zwei Kindern, ${h.eur(55000)} Einkommen, GdB 80 bei einem Elternteil und ${h.eur(1200)} Zuzahlungen und Zahnersatz zahlt dank der Pauschale ${h.eur(familieOhne.mit - familie.mit)} weniger Steuer. Die große Pauschale von ${h.eur(F.gross)} übersteigt die zumutbare Belastung fast immer deutlich.</p>
<h2>Rentner mit aG: die große Pauschale</h2>
<p>Ein Rentner mit GdB 80 und Merkzeichen aG hat ${h.eur(24000)} zu versteuerndes Einkommen. Seine zumutbare Belastung beträgt ${h.eur(rentner.zumutbar)}. Die große Pauschale von ${h.eur(F.gross)} übersteigt sie um ${h.eur(rentner.abzug33)}, die voll vom Einkommen abgehen. Zusammen mit dem Pauschbetrag zahlt er ${h.eur(rentner.mit)} statt ${h.eur(rentner.ohne)} Steuer im Jahr. Ohne die Pauschale wären es ${h.eur(rentnerOhne.mit)}. Weil viele Rentner nahe am Grundfreibetrag liegen, kann die große Pauschale die Steuer sogar ganz auf null bringen; mehr als die Steuer, die anfällt, lässt sich aber nicht sparen.</p>
<h2>Wenn beide Ehepartner eine Behinderung haben</h2>
<p>Die Pauschale steht jeder Person zu, die die Voraussetzungen erfüllt. Haben beide Ehepartner einen GdB von ${F.gdb_klein} oder ein passendes Merkzeichen, tragen beide ihre Pauschale ein. Bei der Zusammenveranlagung werden die außergewöhnlichen Belastungen beider Partner zusammengerechnet und einmal um die gemeinsame zumutbare Belastung gekürzt. Zwei kleine Pauschalen von zusammen ${h.eur(2 * F.klein)} überschreiten sie deshalb häufiger als eine allein.</p>
<h2>Welche Kosten Sie zusätzlich sammeln sollten</h2>
<p>Weil Pauschale und Krankheitskosten gemeinsam gekürzt werden, lohnt es sich, alle Krankheitskosten des Jahres zu sammeln: Zuzahlungen zu Medikamenten und Therapien, Brillen und Hörgeräte, Zahnersatz, Eigenanteile bei Hilfsmitteln, Fahrten zu Ärzten und Kliniken. Für jedes dieser Beispiele gilt, dass nur Kosten zählen, die Sie selbst getragen haben und die nicht erstattet wurden. Haben Sie in einem Jahr eine teure Behandlung, kann die Pauschale in diesem Jahr plötzlich voll wirken.</p>
<h2>Pauschale für das Kind</h2>
<p>§ 33 Abs. 2a EStG verweist auf § 33b Abs. 5: Nimmt ein Kind die Fahrtkostenpauschale nicht selbst in Anspruch, können die Eltern sie übernehmen, grundsätzlich je zur Hälfte. Bei den Eltern wird sie dann mit deren eigenen Krankheitskosten um deren zumutbare Belastung gekürzt, die mit Kindern niedriger ist. Wie die Übertragung beim Pauschbetrag funktioniert, steht unter ${h.a('pauschbetrag-kind', 'Pauschbetrag des Kindes übertragen')}.</p>
<h2>Merkzeichen und GdB prüfen lassen</h2>
<p>Wer bei GdB ${F.gdb_klein_mit_g} nicht weit gehen kann, sollte das Merkzeichen G beantragen, siehe ${h.a('gdb-70', 'GdB 70')}. Wer sich nur mit großer Anstrengung außerhalb des Autos bewegen kann, prüft das ${h.a('merkzeichen-ag', 'Merkzeichen aG')}: Es hebt die Pauschale auf ${h.eur(F.gross)}. Maßgeblich ist der Zeitraum, für den der Bescheid das Merkzeichen ausweist; stellen Sie den Antrag deshalb früh und nennen Sie ein besonderes Interesse, wenn es rückwirkend gelten soll. Die Entscheidung trifft die Versorgungsbehörde; das Finanzamt übernimmt ihre Feststellung, ohne sie selbst zu prüfen. Den genauen Steuerwert mit Pauschbetrag, Kirchensteuer und Splitting rechnet der ${h.a('behinderten-pauschbetrag', 'Pauschbetrag-Rechner')}.</p>
`,
  },
});
