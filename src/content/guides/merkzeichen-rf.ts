import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

/**
 * Merkzeichen RF (SchwbAwV § 3 Abs. 1 Nr. 5, § 4 Abs. 2 RBStV) und Befreiung nach § 4 Abs. 1 Nr. 10 RBStV.
 * Eigene Beispiele: Ersparnis im Monat, im Jahr und rückwirkend, Antrag 14 Monate nach dem Bescheid. Beträge aus params.
 */
const R = P.rundfunk;
const eur2 = (x: number) => formatMoney(x, 2, 'de');
const diff = R.voll - R.ermaessigt;
const jahrVoll = R.voll * 12;
const jahrRf = R.ermaessigt * 12;
const jahrSpar = diff * 12;
const maxMonate = R.rueckwirkend_jahre * 12;
const maxRueck = diff * maxMonate;
const spaet = 14;
const spaetRueck = diff * spaet;

export default defineGuide({
  id: 'merkzeichen-rf',
  group: 'merkzeichen',
  order: 360,
  mini: 'rundfunk',
  miniDefaults: { m: spaet },
  miniHref: 'merkzeichen',
  related: ['merkzeichen', 'merkzeichen-bl', 'gdb-schwerhoerigkeit', 'gdb-80', 'schwerbehindertenausweis-vorteile'],
  sources: ['rbstv4', 'rundfunkbeitrag', 'schwbawv3'],
  de: {
    slug: 'merkzeichen-rf',
    nav: 'Merkzeichen RF',
    card: 'Rundfunkbeitrag zu einem Drittel: die drei Gruppen mit RF, der Antrag beim Beitragsservice, die Frist für die Rückwirkung und wann es eine volle Befreiung gibt.',
    title: 'Merkzeichen RF 2026: Rundfunkbeitrag ermäßigt, Antrag',
    description: `Merkzeichen RF 2026: Rundfunkbeitrag ${eur2(R.ermaessigt)} statt ${eur2(R.voll)} im Monat, wer RF bekommt, wie der Antrag beim Beitragsservice läuft, bis zu ${R.rueckwirkend_jahre} Jahre rückwirkend.`,
    h1: 'Merkzeichen RF: ein Drittel des Rundfunkbeitrags',
    intro: 'RF senkt den Rundfunkbeitrag auf ein Drittel, aber erst auf Antrag beim Beitragsservice; das Merkzeichen im Ausweis allein ändert an der Rechnung nichts.',
    resume: `Das Merkzeichen RF zeigt im Schwerbehindertenausweis, dass die gesundheitlichen Voraussetzungen für eine Ermäßigung des Rundfunkbeitrags erfüllt sind. Nach § 4 Absatz 2 des Rundfunkbeitragsstaatsvertrags sind das drei Gruppen: blinde oder nicht nur vorübergehend wesentlich sehbehinderte Menschen mit einem GdB von wenigstens 60 allein wegen der Sehbehinderung, hörgeschädigte Menschen, die gehörlos sind oder sich auch mit Hörhilfen nicht ausreichend über das Gehör verständigen können, und Menschen mit einem GdB von wenigstens 80, die wegen ihres Leidens ständig nicht an öffentlichen Veranstaltungen teilnehmen können. Mit RF zahlen Sie auf Antrag ${eur2(R.ermaessigt)} statt ${eur2(R.voll)} im Monat, also ${eur2(jahrRf)} statt ${eur2(jahrVoll)} im Jahr; die Ersparnis beträgt ${eur2(jahrSpar)} jährlich. Die Ermäßigung gilt frühestens ${R.rueckwirkend_jahre} Jahre vor dem Ersten des Antragsmonats, höchstens also ${eur2(maxRueck)} rückwirkend. Ganz befreit sind nur taubblinde Menschen und Empfänger von Blindenhilfe. Den Antrag stellen Sie beim Beitragsservice von ARD, ZDF und Deutschlandradio, nicht beim Versorgungsamt.`,
    faqs: [
      { q: 'Muss ich die Ermäßigung trotz Merkzeichen RF extra beantragen?', a: `Ja. § 4 Absatz 2 RBStV gewährt die Ermäßigung nur auf Antrag. Der Bescheid des Versorgungsamts ersetzt diesen Antrag nicht. Sie schicken den Antrag mit einer Kopie des Ausweises oder des Bescheids mit RF an den Beitragsservice von ARD, ZDF und Deutschlandradio. Bis dahin wird der volle Beitrag von ${eur2(R.voll)} im Monat fällig.` },
      { q: 'Wie weit zurück gilt die Ermäßigung beim Rundfunkbeitrag?', a: `Die Ermäßigung wirkt auch für die Vergangenheit, nach § 4 Absatz 4 RBStV aber frühestens ${R.rueckwirkend_jahre} Jahre vor dem Ersten des Monats, in dem Sie sie beantragen. Wer RF seit langem hat und erst jetzt den Antrag stellt, erhält also höchstens ${maxMonate} Monate zurück, das sind ${eur2(maxRueck)}. Was darüber hinausgeht, ist verloren; stellen Sie den Antrag deshalb gleich nach dem Bescheid.` },
      { q: 'Was bedeutet „ständig nicht an öffentlichen Veranstaltungen teilnehmen“?', a: 'Gemeint sind Veranstaltungen, die der Allgemeinheit offenstehen. „Ständig“ heißt, dass die Teilnahme dauerhaft nicht möglich ist, nicht nur in Krankheitsphasen oder bei einzelnen Anlässen. Das Gesetz verlangt außerdem einen GdB von wenigstens 80, der nicht nur vorübergehend besteht. Die Behörde prüft das anhand der Befunde; wer mit Hilfe noch gelegentlich ausgeht, sollte genau beschreiben, warum das die Ausnahme ist.' },
      { q: 'Bekommen Menschen mit Hörgerät das Merkzeichen RF?', a: 'Nur wenn eine ausreichende Verständigung über das Gehör auch mit Hörhilfen nicht möglich ist; so steht es in § 4 Absatz 2 Nummer 2 RBStV. Wer mit Hörgerät oder Cochlea-Implantat Gespräche gut führen kann, erfüllt die Voraussetzung nicht, auch wenn der GdB für das Gehör hoch ist. Gehörlose Menschen erfüllen sie stets. Maßgeblich sind die Hörbefunde mit Hörhilfe.' },
      { q: 'Wann wird man ganz vom Rundfunkbeitrag befreit?', a: 'Ganz befreit sind nach § 4 Absatz 1 Nummer 10 RBStV taubblinde Menschen und Menschen, die Blindenhilfe nach § 72 SGB XII oder nach § 27d des Bundesversorgungsgesetzes erhalten. Für die Taubblindheit genügt nach Absatz 7 eine ärztliche Bescheinigung. Daneben gibt es Befreiungen wegen bestimmter Sozialleistungen, die nicht an eine Behinderung anknüpfen. RF allein führt nie zur vollen Befreiung.' },
    ],
    body: (h) => `
<h2>Die drei Gruppen mit RF</h2>
<p>Das Merkzeichen RF wird nach ${h.src('schwbawv3', '§ 3 Abs. 1 Nr. 5 SchwbAwV')} eingetragen, wenn die landesrechtlich festgelegten gesundheitlichen Voraussetzungen erfüllt sind. Landesrecht ist hier der Rundfunkbeitragsstaatsvertrag, ein Staatsvertrag der Länder (${h.src('rbstv4', '§ 4 Abs. 2 RBStV')}).</p>
${h.table(['Gruppe', 'Voraussetzung im Wortlaut', 'Typische Fälle'], [
  ['Sehen', 'blind oder nicht nur vorübergehend wesentlich sehbehindert, GdB von wenigstens 60 allein wegen der Sehbehinderung', 'Merkzeichen Bl, starke Sehbehinderung beider Augen'],
  ['Hören', 'gehörlos oder ausreichende Verständigung über das Gehör auch mit Hörhilfen nicht möglich', 'Merkzeichen Gl, an Taubheit grenzende Schwerhörigkeit'],
  ['Teilnahme', 'GdB nicht nur vorübergehend wenigstens 80 und ständig keine Teilnahme an öffentlichen Veranstaltungen möglich', 'schwerste Leiden mit dauerhafter Bindung an die Wohnung'],
], 'Voraussetzungen der Ermäßigung nach § 4 Abs. 2 RBStV', ['l', 'l', 'l'])}
<p>Bei den ersten beiden Gruppen zählt nur das eine Leiden: Ein GdB von 60, der aus einer Sehbehinderung von 40 und anderen Leiden entsteht, genügt für die erste Gruppe nicht. Bei der dritten Gruppe zählt der Gesamt-GdB, aber das Gesetz verlangt zusätzlich, dass die Teilnahme an öffentlichen Veranstaltungen wegen des Leidens ständig ausgeschlossen ist.</p>
<h2>Was RF spart</h2>
<p>Der Rundfunkbeitrag beträgt ${h.eur(R.voll, 2)} im Monat je Wohnung (${h.src('rundfunkbeitrag', 'Beitragsservice')}). Mit RF zahlen Sie ein Drittel, ${h.eur(R.ermaessigt, 2)} im Monat. Im Jahr sind das ${h.eur(jahrRf, 2)} statt ${h.eur(jahrVoll, 2)}, eine Ersparnis von ${h.eur(jahrSpar, 2)}. Über die rückwirkende Ermäßigung rechnet der kleine Rechner, gemessen in Monaten seit der Zuerkennung.</p>
<p><strong>Beispiel:</strong> Ein Mann erhält im Bescheid RF, legt das Schreiben aber zur Seite und stellt den Antrag beim Beitragsservice ${spaet} Monate später. Weil die Frist von ${R.rueckwirkend_jahre} Jahren noch nicht abgelaufen ist, kann er die Ermäßigung für die zurückliegenden Monate erhalten, rund ${h.eur(spaetRueck, 2)}. Hätte er ${R.rueckwirkend_jahre} Jahre und länger gewartet, wäre der ältere Teil verfallen; mehr als ${h.eur(maxRueck, 2)} rückwirkend gibt es nie.</p>
<h2>Der Antrag beim Beitragsservice</h2>
<p>Das Merkzeichen stellt das Versorgungsamt fest, die Ermäßigung gewährt der Beitragsservice, und zwar nur auf Antrag. Nach dem Bescheid mit RF stellen Sie deshalb einen eigenen Antrag auf Ermäßigung, mit einer Kopie des Ausweises mit RF oder des Bescheids. Entfällt RF bei einer Neufeststellung, entfällt auch die Grundlage der Ermäßigung; nach einer Verlängerung des Ausweises halten Sie den neuen Nachweis bereit.</p>
<p>Wer noch keinen Bescheid hat, sollte RF im Antrag auf GdB und Merkzeichen ausdrücklich ankreuzen. Die Behörde prüft es sonst nicht von sich aus. Für die Seh- und Hörgruppen sind aktuelle Befunde aus der Augen- oder HNO-Heilkunde die Grundlage, für die dritte Gruppe Berichte, die beschreiben, warum Sie Veranstaltungen dauerhaft nicht besuchen können.</p>
<h2>RF neben anderen Merkzeichen</h2>
<p>Viele Menschen mit RF haben zugleich ${h.a('merkzeichen-bl', 'Bl')}, Gl oder TBl. Für taubblinde Menschen ist RF nicht der beste Weg: Sie sind nach § 4 Absatz 1 Nummer 10 RBStV auf Antrag ganz befreit. Dasselbe gilt für Empfänger von Blindenhilfe nach § 72 SGB XII. Das Landesblindengeld begründet dagegen keine Befreiung, sondern nur, über die Blindheit, die Ermäßigung mit RF. Wer schwerhörig ist, findet die Bewertung des Hörverlusts unter ${h.a('gdb-schwerhoerigkeit', 'GdB bei Schwerhörigkeit')}; wann der GdB von 80 für die dritte Gruppe erreicht wird, erklärt die Seite ${h.a('gdb-80', 'GdB 80')}.</p>
<h2>Was RF nicht bewirkt</h2>
<p>RF ist ein Merkzeichen mit einer einzigen Rechtsfolge. Es verändert weder den Behinderten-Pauschbetrag noch die Fahrtkostenpauschale, es öffnet keine Freifahrt im Nahverkehr, keinen Parkausweis und keine Ermäßigung der Kraftfahrzeugsteuer. Wer RF wegen einer Sehbehinderung hat, erhält diese Vorteile allenfalls über andere Merkzeichen wie Bl, H oder G, die die Behörde getrennt prüft. Umgekehrt kostet ein abgelehntes RF nichts außer der Ersparnis beim Beitrag. Welche Vorteile Ihr GdB mit allen Merkzeichen zusammen auslöst, zeigt der ${h.a('merkzeichen', 'Merkzeichen-Rechner')}.</p>
<h2>Wenn RF abgelehnt wird</h2>
<p>Gegen die Ablehnung von RF ist wie gegen jeden Teil des Bescheids ein ${h.a('widerspruch-gdb', 'Widerspruch')} innerhalb eines Monats möglich. Er richtet sich an das Versorgungsamt, nicht an den Beitragsservice. Begründen Sie ihn mit dem Wortlaut der Gruppe, die auf Sie passt: bei Hörbehinderung mit einem Sprachverständnistest mit Hörhilfe, bei Sehbehinderung mit dem Anteil des GdB, der allein auf die Augen entfällt. Bei der dritten Gruppe hilft eine genaue Schilderung, warum auch ein Besuch mit Begleitung, Rollstuhl oder Hilfsmitteln nicht möglich ist.</p>
`,
  },
});
