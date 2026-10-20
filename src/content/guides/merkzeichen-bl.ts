import { defineGuide } from '../../lib/guide-types';
import { fahrtkosten, pauschbetrag, rechte } from '../../lib/engine/rechte';
import { steuerwirkung } from '../../lib/engine/steuer';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

/**
 * Merkzeichen Bl (SchwbAwV § 3 Abs. 1 Nr. 3, § 72 Abs. 5 SGB XII, VersMedV Teil A Nr. 6). Eigene Beispiele:
 * blinde Frau mit 30.000 € zvE, mit Bl im Ausweis und nur mit GdB 100; Bl gegen hochgradige Sehbehinderung mit H.
 * Landesblindengeld: keine Beträge (in research/fakten.md nicht belegt), nur Verweis auf das Land.
 */
const eur = (x: number) => formatMoney(x, 0, 'de');
const eur2 = (x: number) => formatMoney(x, 2, 'de');
const pbBl = pauschbetrag(100, ['Bl']);
const pb100 = pauschbetrag(100);
const fkBl = fahrtkosten(100, ['Bl']);
const fk100 = fahrtkosten(100);
const st = (pb: number, fk: number) => steuerwirkung({ zve: 30000, splitting: false, kirche: 0, pauschbetrag: pb, fahrtkosten: fk, weitereAgB: 0, kinder: 0 });
const mitBl = st(pbBl, fkBl);
const ohneBl = st(pb100, fk100);
const wert = (m: Parameters<typeof rechte>[1], id: string) => rechte(100, m).find((r) => r.id === id)!.wert;
const parkBl = wert(['Bl', 'H', 'RF'], 'parken');
const parkH = wert(['H', 'RF'], 'parken');

export default defineGuide({
  id: 'merkzeichen-bl',
  group: 'merkzeichen',
  order: 350,
  mini: 'merkzeichen',
  miniDefaults: { m: 5, g: 100 },
  miniHref: 'merkzeichen',
  related: ['merkzeichen', 'merkzeichen-h', 'merkzeichen-rf', 'gdb-100', 'merkzeichen-b'],
  sources: ['schwbawv3', 'versmedv', 'estg33b', 'sgb9_228', 'rbstv4', 'vwvStvo'],
  de: {
    slug: 'merkzeichen-bl',
    nav: 'Merkzeichen Bl',
    card: 'Blind im Sinne des Gesetzes: Sehschärfe, Gesichtsfeld, Rindenblindheit, die Nachteilsausgleiche mit Bl und das Blindengeld der Länder.',
    title: 'Merkzeichen Bl 2026: Blindheit, Vorteile, Blindengeld',
    description: `Merkzeichen Bl 2026: wann man als blind gilt, Pauschbetrag ${eur(pbBl)}, Fahrtkosten ${eur(fkBl)}, EU-Parkausweis, freie Wertmarke und das Blindengeld der Länder.`,
    h1: 'Merkzeichen Bl: blind im Sinne des Gesetzes',
    intro: 'Blind im rechtlichen Sinn ist auch, wer noch einen Sehrest hat; das Merkzeichen Bl bündelt Steuer-, Verkehrs- und Beitragsvorteile.',
    resume: `Das Merkzeichen Bl erhalten schwerbehinderte Menschen, die blind im Sinne des § 72 Absatz 5 SGB XII sind. Nach Teil A Nummer 6 der Versorgungsmedizin-Verordnung ist blind, wem das Augenlicht vollständig fehlt, wessen Sehschärfe auf keinem Auge und auch nicht beidäugig mehr als 0,02 beträgt, oder wer eine gleich schwere Störung des Sehvermögens hat, etwa eine starke Einengung des Gesichtsfeldes oder einen vollständigen Ausfall der Sehrinde. Mit Bl gibt es den erhöhten Behinderten-Pauschbetrag von ${eur(pbBl)}, die Fahrtkostenpauschale von ${eur(fkBl)}, die Wertmarke für den Nahverkehr ohne Gebühr, die Befreiung von der Kraftfahrzeugsteuer, den EU-Parkausweis und auf Antrag den Rundfunkbeitrag zu einem Drittel, ${eur2(P.rundfunk.ermaessigt)} im Monat. Eine blinde Frau mit ${eur(30000)} zu versteuerndem Einkommen spart mit Bl nach dem Rechner rund ${eur(mitBl.ersparnis)} Steuern im Jahr, mit GdB 100 ohne Bl nur rund ${eur(ohneBl.ersparnis)}. Daneben zahlen die Länder ein Blindengeld nach eigenem Landesrecht; Höhe und Zuständigkeit unterscheiden sich von Land zu Land.`,
    faqs: [
      { q: 'Wie hoch ist das Blindengeld 2026?', a: 'Das hängt vom Bundesland ab. Das Landesblindengeld ist keine Bundesleistung, sondern beruht auf dem Recht des jeweiligen Landes, das auch Höhe, Voraussetzungen und Altersstufen festlegt. Diese Seite nennt keine Beträge, weil sie sie nicht für alle Länder geprüft hat. Fragen Sie bei der Behörde Ihres Landes nach, die das Blindengeld zahlt; oft hilft die Stelle, die auch Ihren GdB festgestellt hat, weiter.' },
      { q: 'Bekommt man mit hochgradiger Sehbehinderung dieselben Vorteile wie mit Bl?', a: `Viele, aber nicht alle. Wer auf keinem Auge mehr als 0,05 sieht, hat nach Teil A Nummer 6 einen GdB von 100 und erfüllt nach Nummer 4 stets die Voraussetzungen für das Merkzeichen H; damit gibt es denselben Pauschbetrag von ${eur(pbBl)}, die große Fahrtkostenpauschale, die freie Wertmarke und die Kfz-Steuerbefreiung. Es fehlt der EU-Parkausweis, der an Blindheit oder aG hängt. Ob das Land auch hochgradig Sehbehinderten eine Leistung zahlt, regelt sein Landesrecht.` },
      { q: 'Wird der Rundfunkbeitrag mit Merkzeichen Bl ganz erlassen?', a: `In der Regel nicht. Blinde Menschen erhalten nach § 4 Absatz 2 RBStV auf Antrag eine Ermäßigung auf ein Drittel, ${eur2(P.rundfunk.ermaessigt)} statt ${eur2(P.rundfunk.voll)} im Monat; im Ausweis steht dafür RF. Ganz befreit sind nach § 4 Absatz 1 Nummer 10 nur taubblinde Menschen und Empfänger von Blindenhilfe nach § 72 SGB XII. Das Landesblindengeld allein führt nicht zur Befreiung.` },
      { q: 'Zählt ein eingeengtes Gesichtsfeld für das Merkzeichen Bl?', a: 'Ja, unter bestimmten Bedingungen. Teil A Nummer 6 nennt sieben Fallgruppen nach den Richtlinien der Deutschen Ophthalmologischen Gesellschaft. So gilt als blind, wessen Gesichtsfeld auch bei normaler Sehschärfe in keiner Richtung mehr als 5 Grad vom Zentrum reicht, oder wer bei einer Sehschärfe von höchstens 0,05 ein Restgesichtsfeld von nicht mehr als 15 Grad hat. Die Messung muss ein augenärztlicher Befund belegen.' },
      { q: 'Muss ich die kostenlose Wertmarke mit Bl gesondert beantragen?', a: `Ja. Nach § 228 Absatz 4 SGB IX wird die Jahreswertmarke blinden Menschen auf Antrag ohne die Gebühr von ${eur(P.wertmarke.jahr)} ausgegeben, und zwar von der Behörde, die den Ausweis ausstellt. Sie gilt jeweils für ein Jahr; denken Sie an den Folgeantrag. Ohne gültige Wertmarke ist die Freifahrt im Nahverkehr nicht möglich, auch wenn Bl im Ausweis steht.` },
    ],
    body: (h) => `
<h2>Wer als blind gilt</h2>
<p>Das Merkzeichen Bl verweist auf den Blindheitsbegriff der Sozialhilfe: Eingetragen wird es, wenn der schwerbehinderte Mensch blind im Sinne des § 72 Absatz 5 SGB XII ist (${h.src('schwbawv3', '§ 3 Abs. 1 Nr. 3 SchwbAwV')}). Die Einzelheiten stehen in Teil A Nummer 6 der ${h.src('versmedv', 'Versorgungsmedizinischen Grundsätze')}. Blind ist danach, wem das Augenlicht vollständig fehlt. Als blind gilt auch, wessen Sehschärfe auf keinem Auge und auch nicht beidäugig mehr als 0,02 (1/50) beträgt. Gleich stehen Störungen des Sehvermögens von vergleichbarer Schwere.</p>
${h.table(['Fallgruppe nach Teil A Nr. 6', 'Sehschärfe', 'Gesichtsfeld'], [
  ['Einengung des Gesichtsfeldes', 'höchstens 0,033 (1/30)', 'Grenze in keiner Richtung mehr als 30° vom Zentrum'],
  ['Einengung des Gesichtsfeldes', 'höchstens 0,05 (1/20)', 'Grenze in keiner Richtung mehr als 15°'],
  ['Einengung des Gesichtsfeldes', 'höchstens 0,1 (1/10)', 'Grenze in keiner Richtung mehr als 7,5°'],
  ['Gesichtsfeldinsel', 'auch normale Sehschärfe', 'Grenze in keiner Richtung mehr als 5°'],
  ['Große zentrale Skotome', 'höchstens 0,1', 'unterhalb des horizontalen Meridians mehr als die Hälfte ausgefallen'],
  ['Homonyme Hemianopsie', 'höchstens 0,1', 'erhaltenes Gesichtsfeld horizontal höchstens 30° Durchmesser'],
  ['Bitemporale oder binasale Hemianopsie', 'höchstens 0,1', 'kein Binokularsehen'],
], 'Der Sehschärfe von 0,02 gleichgestellte Sehbehinderungen; Gesichtsfeldreste jenseits von 50° bleiben unberücksichtigt', ['l', 'l', 'l'])}
<p>Blind ist auch, wer einen nachgewiesenen vollständigen Ausfall der Sehrinde hat, die sogenannte Rindenblindheit. Eine visuelle Agnosie oder andere Störungen des Erkennens genügen dagegen nicht. Die Grenze zur hochgradigen Sehbehinderung liegt bei einer Sehschärfe von 0,05 (1/20): Wer nicht mehr als das sieht, aber noch nicht blind ist, ist hochgradig sehbehindert. Das ergibt GdB 100 und nach Teil A Nummer 4 stets das ${h.a('merkzeichen-h', 'Merkzeichen H')}, aber kein Bl.</p>
<h2>Was Bl bringt</h2>
<p>Bl ist das Merkzeichen mit den meisten Nachteilsausgleichen. Nach ${h.src('estg33b', '§ 33b Abs. 3 EStG')} erhalten blinde Menschen einen Pauschbetrag von ${h.eur(pbBl)} statt ${h.eur(pb100)} bei GdB 100, dazu die Fahrtkostenpauschale von ${h.eur(fkBl)} statt ${h.eur(fk100)}. Die Wertmarke für den Nahverkehr gibt es nach ${h.src('sgb9_228', '§ 228 Abs. 4 SGB IX')} auf Antrag ohne Gebühr. Ein auf Sie zugelassenes Auto ist von der Kraftfahrzeugsteuer befreit (§ 3a Abs. 1 KraftStG). Die ${h.src('vwvStvo', 'Verwaltungsvorschrift zur StVO')} stellt blinde Menschen beim Parken den außergewöhnlich Gehbehinderten gleich: Sie erhalten den EU-Parkausweis, die Person am Steuer nutzt ihn für Fahrten mit Ihnen.</p>
<p>Wie viel das ausmacht, zeigt ein Beispiel. Eine blinde Frau mit ${h.eur(30000)} zu versteuerndem Einkommen spart mit Bl im Ausweis rund ${h.eur(mitBl.ersparnis)} Steuern im Jahr. Hätte die Behörde nur GdB 100 ohne Bl festgestellt, wären es rund ${h.eur(ohneBl.ersparnis)}. Der Unterschied von rund ${h.eur(mitBl.ersparnis - ohneBl.ersparnis)} im Jahr zeigt, warum sich der ausdrückliche Antrag auf das Merkzeichen lohnt, auch wenn der GdB schon bei 100 liegt.</p>
<h2>Bl oder hochgradige Sehbehinderung mit H</h2>
${h.table(['Vorteil', 'Blind (Bl, meist mit H)', 'Hochgradig sehbehindert (H)'], [
  ['Pauschbetrag', h.eur(pbBl), h.eur(pbBl)],
  ['Fahrtkostenpauschale', h.eur(fkBl), h.eur(fkBl)],
  ['Wertmarke', 'ohne Gebühr', 'ohne Gebühr'],
  ['Kraftfahrzeugsteuer', 'befreit', 'befreit'],
  ['EU-Parkausweis', parkBl, parkH],
  ['Rundfunkbeitrag mit RF', `${h.eur(P.rundfunk.ermaessigt, 2)} im Monat`, `${h.eur(P.rundfunk.ermaessigt, 2)} im Monat`],
  ['Landesblindengeld', 'nach Landesrecht', 'nach Landesrecht, nicht in jedem Land'],
], 'Blindheit und hochgradige Sehbehinderung im Vergleich, Stand 2026', ['l', 'l', 'l'])}
<p>Bei den Steuer- und Verkehrsvorteilen ist der Unterschied kleiner, als viele denken, weil die hochgradige Sehbehinderung nach der Verordnung stets Hilflosigkeit begründet. Den Ausschlag geben Parkausweis und Landesleistungen. Den Rundfunkbeitrag ermäßigt § 4 Absatz 2 RBStV für blinde und für wesentlich sehbehinderte Menschen mit einem GdB von wenigstens 60 allein wegen der Sehbehinderung; mehr dazu beim ${h.a('merkzeichen-rf', 'Merkzeichen RF')}.</p>
<!--mini:rundfunk-->
<h2>Blindengeld der Länder und Blindenhilfe</h2>
<p>Neben den bundesrechtlichen Vorteilen zahlen die Länder ein Blindengeld. Es beruht auf Landesgesetzen, und jedes Land regelt selbst, wer es erhält, in welcher Höhe, ab welchem Alter und welche Stelle es auszahlt. Diese Seite nennt bewusst keine Beträge, weil sie nicht für alle Länder an amtlicher Quelle geprüft sind. Wenden Sie sich an die zuständige Behörde Ihres Landes; welche Stelle in Ihrem Land für den GdB zuständig ist, steht unter ${h.a('schwerbehindertenausweis-beantragen', 'Schwerbehindertenausweis beantragen')}.</p>
<p>Davon zu unterscheiden ist die Blindenhilfe nach § 72 SGB XII, eine Leistung der Sozialhilfe, die nach den Regeln der Sozialhilfe gewährt wird. Sie hat eine Folge, die das Landesblindengeld nicht hat: Wer Blindenhilfe bezieht, ist nach ${h.src('rbstv4', '§ 4 Abs. 1 Nr. 10 RBStV')} auf Antrag ganz vom Rundfunkbeitrag befreit, ebenso wie taubblinde Menschen.</p>
<h2>Taubblind: das Merkzeichen TBl</h2>
<p>Wer wegen einer Störung der Hörfunktion einen GdB von mindestens 70 und wegen einer Störung des Sehvermögens einen GdB von 100 hat, erhält zusätzlich TBl. Es bringt ebenfalls den erhöhten Pauschbetrag und die große Fahrtkostenpauschale und befreit auf Antrag ganz vom Rundfunkbeitrag. Für die Kraftfahrzeugsteuer nennt § 3a Absatz 1 KraftStG nur H, Bl und aG, nicht TBl. Weil ein Seh-GdB von 100 nach Teil A Nummer 6 Blindheit oder hochgradige Sehbehinderung bedeutet und beides nach Nummer 4 Hilflosigkeit begründet, erfüllen taubblinde Menschen in aller Regel auch die Voraussetzungen von H; beantragen Sie es ausdrücklich mit.</p>
<h2>Der Antrag auf Bl</h2>
<p>Grundlage ist ein aktueller augenärztlicher Befund mit Sehschärfe beider Augen, mit und ohne Korrektur, und einer Gesichtsfeldmessung. Bei Erkrankungen des Gehirns gehört ein neurologischer Befund dazu. Beantragen Sie Bl, H, RF und, wenn Sie in Bus und Bahn Hilfe brauchen, ${h.a('merkzeichen-b', 'B')} und G zusammen; die Behörde prüft jedes Merkzeichen einzeln.</p>
`,
  },
});
