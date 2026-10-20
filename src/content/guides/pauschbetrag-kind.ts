import { defineGuide } from '../../lib/guide-types';
import { pauschbetrag, fahrtkosten } from '../../lib/engine/rechte';
import { steuerwirkung } from '../../lib/engine/steuer';
import { eintrag } from '../../lib/engine/tabelle';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

/**
 * Übertragung des Behinderten-Pauschbetrags und der Fahrtkostenpauschale eines Kindes auf die Eltern
 * (§ 33b Abs. 5, § 33 Abs. 2a EStG). Eigene Beispiele: Ehepaar mit 68.000 € und Kind mit GdB 50 oder mit H,
 * getrennte Eltern mit je 36.000 €, Kinder-Sonderregeln der VersMedV (Teil A Nr. 5).
 */
const PB = P.pauschbetrag;
const eur = (x: number) => formatMoney(x, 0, 'de');
const tb = (id: string, teil: string) => {
  const s = eintrag(id)!.stufen.find((x) => x.text.includes(teil))!;
  return s.von === s.bis ? String(s.von) : `${s.von} bis ${s.bis}`;
};
const pb50 = pauschbetrag(50);
const pbH = pauschbetrag(50, ['H']);
const fkH = fahrtkosten(50, ['H']);
const paar50 = steuerwirkung({ zve: 68000, splitting: true, kirche: 0, pauschbetrag: pb50, fahrtkosten: 0, weitereAgB: 0, kinder: 1 });
const paarH = steuerwirkung({ zve: 68000, splitting: true, kirche: 0, pauschbetrag: pbH, fahrtkosten: fkH, weitereAgB: 0, kinder: 1 });
const wenig = steuerwirkung({ zve: 14000, splitting: false, kirche: 0, pauschbetrag: pb50 / 2, fahrtkosten: 0, weitereAgB: 0, kinder: 1 });
const ganz = steuerwirkung({ zve: 36000, splitting: false, kirche: 0, pauschbetrag: pb50, fahrtkosten: 0, weitereAgB: 0, kinder: 1 });
const haelfte = steuerwirkung({ zve: 36000, splitting: false, kirche: 0, pauschbetrag: pb50 / 2, fahrtkosten: 0, weitereAgB: 0, kinder: 1 });

export default defineGuide({
  id: 'pauschbetrag-kind',
  group: 'arbeit',
  order: 540,
  mini: 'kind',
  miniHref: 'behinderten-pauschbetrag',
  related: ['behinderten-pauschbetrag', 'fahrtkostenpauschale', 'merkzeichen-h', 'schwerbehindertenausweis-beantragen', 'gdb-diabetes'],
  sources: ['estg33b', 'estg33', 'estdv65', 'schwbawv6', 'versmedv'],
  de: {
    slug: 'pauschbetrag-kind',
    nav: 'Pauschbetrag des Kindes',
    card: 'Wie Eltern den Behinderten-Pauschbetrag und die Fahrtkostenpauschale ihres Kindes übernehmen, wie sie geteilt werden und was sie sparen.',
    title: 'Pauschbetrag Kind mit Behinderung 2026: Übertragung',
    description: `Pauschbetrag des Kindes 2026 übertragen: bis ${eur(PB.erhoeht)} mit H, je zur Hälfte auf beide Eltern, Steuer-ID des Kindes nötig. Was Eltern mit Splitting sparen.`,
    h1: 'Pauschbetrag des Kindes auf die Eltern übertragen',
    intro: 'Kinder mit Behinderung haben selten genug Einkommen, um ihren Pauschbetrag zu nutzen; das Gesetz erlaubt deshalb, ihn auf die Eltern zu übertragen.',
    resume: `Steht einem Kind der Behinderten-Pauschbetrag zu und nimmt es ihn nicht selbst in Anspruch, wird er nach § 33b Absatz 5 EStG auf Antrag auf die Eltern übertragen. Er beträgt je nach GdB ${eur(PB.stufen[0][1])} bis ${eur(PB.stufen[PB.stufen.length - 1][1])}, mit Merkzeichen H, Bl oder TBl ${eur(PB.erhoeht)}. Grundsätzlich wird er auf beide Elternteile je zur Hälfte aufgeteilt; auf gemeinsamen Antrag ist eine andere Aufteilung möglich, und wurde der Kinderfreibetrag auf einen Elternteil übertragen, folgt der Pauschbetrag ihm. Voraussetzung ist die Steuer-Identifikationsnummer des Kindes in der Einkommensteuererklärung. Die Fahrtkostenpauschale des Kindes lässt sich nach § 33 Absatz 2a EStG ebenso übertragen. Ein Ehepaar mit ${eur(68000)} zu versteuerndem Einkommen spart mit dem Pauschbetrag eines Kindes mit GdB 50 rund ${eur(paar50.ersparnis)} im Jahr; hat das Kind Merkzeichen H, sind es mit Fahrtkostenpauschale rund ${eur(paarH.ersparnis)}. Bei Kindern nimmt die Versorgungsmedizin-Verordnung Hilflosigkeit öfter an als bei Erwachsenen, etwa beim Diabetes bis zum 16. Geburtstag.`,
    faqs: [
      { q: 'Was müssen Eltern für die Übertragung in die Steuererklärung schreiben?', a: 'In der Anlage Kind tragen Sie die Übertragung des Behinderten-Pauschbetrags ein und geben die Steuer-Identifikationsnummer des Kindes an; ohne sie wird nicht übertragen. Den GdB und die Merkzeichen meldet die Behörde seit 2026 elektronisch an das Finanzamt, wenn ihr die Steuer-ID des Kindes vorliegt. Geben Sie diese deshalb schon im Antrag beim Versorgungsamt an.' },
      { q: 'Wie wird der Pauschbetrag bei getrennten Eltern verteilt?', a: `Grundsätzlich je zur Hälfte, also bei GdB 50 je ${eur(pb50 / 2)}. Wurde der Kinderfreibetrag auf einen Elternteil übertragen, erhält dieser den ganzen Pauschbetrag. Auf gemeinsamen Antrag können die Eltern auch eine andere Aufteilung wählen, etwa wenn ein Elternteil kaum Steuern zahlt. Ein Elternteil mit ${eur(36000)} Einkommen spart mit der Hälfte rund ${eur(haelfte.ersparnis)}.` },
      { q: 'Kann ein Kind mit eigenem Einkommen den Pauschbetrag behalten?', a: 'Ja. Die Übertragung setzt voraus, dass das Kind den Pauschbetrag nicht selbst in Anspruch nimmt. Hat es eigene steuerpflichtige Einkünfte, etwa als Auszubildende, kann es den Pauschbetrag in seiner eigenen Erklärung ansetzen. Übertragen wird er nur, wenn das Kind ihn nicht nutzt. Rechnen Sie aus, wo er mehr bringt: Bei geringem Einkommen des Kindes meist bei den Eltern.' },
      { q: 'Wie lange gilt der Ausweis eines Kindes?', a: 'Bei Kindern unter 10 Jahren wird der Ausweis nach § 6 der Schwerbehindertenausweisverordnung längstens bis zum Ende des Monats befristet, in dem das Kind 10 wird. Zwischen 10 und 15 Jahren gilt er längstens bis zum Monat des 20. Geburtstags. Danach beantragen Sie einen neuen Ausweis; die Behörde prüft dann, ob GdB und Merkzeichen weiter bestehen, besonders H.' },
      { q: 'Bekommt ein Kind mit Diabetes das Merkzeichen H?', a: `Nach Teil A Nummer 5 der Versorgungsmedizin-Verordnung ist beim Diabetes mellitus Hilflosigkeit bis zur Vollendung des 16. Lebensjahres anzunehmen. Damit steigt der Pauschbetrag auf ${eur(PB.erhoeht)}, und die Fahrtkostenpauschale von ${eur(fkH)} kommt hinzu. Den GdB selbst bewertet Teil B nach Therapie und Einschnitten in der Lebensführung; bei intensivierter Insulintherapie kann er ${tb('diabetes', 'mindestens vier Insulininjektionen')} betragen.` },
    ],
    body: (h) => `
<h2>Was übertragen wird und was die Eltern sparen</h2>
${h.table(['Kind', 'Pauschbetrag', 'Fahrtkostenpauschale', `Ersparnis Ehepaar, ${h.eur(68000)}`], [
  ['GdB 50', h.eur(pb50), h.eur(0), h.eur(paar50.ersparnis)],
  ['GdB 50 mit Merkzeichen H', h.eur(pbH), h.eur(fkH), h.eur(paarH.ersparnis)],
], 'Übertragung auf Eltern mit Zusammenveranlagung und einem Kind, Tarif 2026', ['l', 'r', 'r', 'r'])}
<p>Der Pauschbetrag wird bei den Eltern voll vom Einkommen abgezogen, ohne Kürzung. Die Fahrtkostenpauschale dagegen zählt bei ihnen als außergewöhnliche Belastung und wird mit ihren eigenen Krankheitskosten um die zumutbare Belastung gekürzt, die mit Kindern niedriger ist als ohne. Im Beispiel liegt diese bei ${h.eur(paarH.zumutbar)}; die Pauschale von ${h.eur(fkH)} mindert das Einkommen deshalb um ${h.eur(paarH.abzug33)}. Den Wert für Ihre Familie zeigt der Rechner.</p>
<h2>Die Regeln der Übertragung</h2>
<p>§ 33b Absatz 5 EStG regelt vier Punkte. Erstens: Übertragen wird nur auf Antrag und nur, wenn das Kind den Pauschbetrag nicht selbst nutzt. Zweitens: Der Pauschbetrag wird grundsätzlich auf beide Elternteile je zur Hälfte aufgeteilt. Drittens: Wurde der Kinderfreibetrag auf einen Elternteil übertragen, gilt das auch für den Pauschbetrag. Viertens: Auf gemeinsamen Antrag ist eine andere Aufteilung möglich. Für alle Fälle gilt, dass die ${h.src('estg33b', 'Identifikationsnummer des Kindes')} in der Erklärung stehen muss.</p>
<p>Für zusammenveranlagte Eltern spielt die Aufteilung keine Rolle, weil beide Hälften im selben Steuerbescheid landen. Wichtig wird sie bei getrennt lebenden, geschiedenen oder unverheirateten Eltern. Zahlt ein Elternteil kaum Steuern, verpufft seine Hälfte; dann lohnt der gemeinsame Antrag auf eine andere Verteilung.</p>
<h2>Rechenbeispiel: getrennte Eltern</h2>
<p>Ein Kind mit GdB 50 lebt bei der Mutter, die ${h.eur(36000)} zu versteuerndes Einkommen hat; der Vater verdient ${h.eur(14000)}. Bei hälftiger Aufteilung erhält jeder ${h.eur(pb50 / 2)}. Die Mutter spart damit ${h.eur(haelfte.ersparnis)}, der Vater nur ${h.eur(wenig.ersparnis)}, weil er knapp über dem Grundfreibetrag liegt. Beantragen beide gemeinsam, dass die Mutter den ganzen Betrag erhält, spart sie ${h.eur(ganz.ersparnis)}. Für die Familie insgesamt bleibt so mehr übrig. Der gemeinsame Antrag gehört in die Erklärungen beider Elternteile.</p>
<h2>Kinder: Hilflosigkeit wird früher angenommen</h2>
<p>Die Versorgungsmedizin-Verordnung enthält in Teil A Nummer 5 eigene Regeln für Kinder und Jugendliche. Sie berücksichtigt nur den Hilfebedarf, der über den eines gesunden gleichaltrigen Kindes hinausgeht, nimmt Hilflosigkeit aber bei vielen Krankheiten regelhaft an. Beispiele aus dem Verordnungstext: Diabetes mellitus bis zur Vollendung des 16. Lebensjahres; tief greifende Entwicklungsstörungen wie Autismus, die allein einen GdB von mindestens 50 bedingen, bis zum 18. Lebensjahr; Taubheit und an Taubheit grenzende Schwerhörigkeit ab Beginn der Frühförderung bis zum Ende der Ausbildung; Sehbehinderungen mit allein mindestens 80 bis 18; Mukoviszidose mit allein mindestens 50.</p>
<p>Mit dem ${h.a('merkzeichen-h', 'Merkzeichen H')} steigt der Pauschbetrag auf ${h.eur(PB.erhoeht)}, die Fahrtkostenpauschale auf ${h.eur(fkH)}. Beides können die Eltern übernehmen. Dazu kommen die kostenlose Wertmarke für den Nahverkehr und, für ein auf das Kind zugelassenes Fahrzeug, die Befreiung von der Kraftfahrzeugsteuer nach § 3a KraftStG. Viele Eltern wissen nicht, dass H an diese Altersgrenzen gebunden ist: Mit Erreichen der Grenze prüft die Behörde neu, und das Merkzeichen entfällt oft.</p>
<h2>Den Antrag für das Kind stellen</h2>
<p>Den Antrag stellen die Sorgeberechtigten bei der Versorgungsbehörde, wie unter ${h.a('schwerbehindertenausweis-beantragen', 'Schwerbehindertenausweis beantragen')} beschrieben. Nennen Sie neben den Diagnosen den zusätzlichen Hilfebedarf im Alltag: nächtliche Blutzuckerkontrollen, Begleitung in der Schule, Therapien, Überwachung wegen Anfällen. Geben Sie die Steuer-Identifikationsnummer des Kindes an, damit die Feststellung beim Finanzamt ankommt. Das Merkzeichen H beantragen Sie ausdrücklich mit.</p>
<p>Besteht die Behinderung schon länger, etwa seit der Geburt, können Sie beantragen, dass die Behörde den GdB auch für die Vergangenheit feststellt; dafür müssen Sie ein besonderes Interesse glaubhaft machen, und steuerliche Gründe werden dafür häufig angeführt. Mit dem rückwirkenden Bescheid können die Eltern ihre Steuerbescheide früherer Jahre ändern lassen, soweit diese noch änderbar sind, und den übertragenen Pauschbetrag nachträglich ansetzen.</p>
<h2>Wenn das Kind volljährig wird</h2>
<p>Die Übertragung endet nicht mit dem 18. Geburtstag, solange die Eltern für das Kind Kindergeld oder den Kinderfreibetrag erhalten, etwa während einer Ausbildung oder weil das Kind wegen seiner Behinderung außerstande ist, sich selbst zu unterhalten. Hat das volljährige Kind eigenes Einkommen, kann es den Pauschbetrag selbst nutzen. Dann sollte die Familie vergleichen, wo er mehr bringt. Den genauen Wert für jeden Fall rechnet der ${h.a('behinderten-pauschbetrag', 'Pauschbetrag-Rechner')}.</p>
`,
  },
});
