import { defineGuide } from '../../lib/guide-types';
import { pauschbetrag, fahrtkosten } from '../../lib/engine/rechte';
import { steuerwirkung, zumutbar } from '../../lib/engine/steuer';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { eintrag } from '../../lib/engine/tabelle';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

/**
 * GdB 70: Fahrtkostenpauschale nur mit Merkzeichen G (§ 33 Abs. 2a Nr. 1 EStG), Hörfunktion 70 als Teil der
 * Taubblindheit (§ 3 Abs. 1 Nr. 8 SchwbAwV), Parkerleichterungen nach VwV-StVO Rn. 134 und 136.
 * Eigene Beispiele: Single mit 40.000 € mit und ohne G, mit Krankheitskosten; Wege zu 70.
 */
const S = P.schwelle;
const F = P.fahrtkosten;
const eur = (x: number) => formatMoney(x, 0, 'de');
const tb = (id: string, teil: string) => {
  const s = eintrag(id)!.stufen.find((x) => x.text.includes(teil))!;
  return s.von === s.bis ? String(s.von) : `${s.von} bis ${s.bis}`;
};
const G7 = F.gdb_klein_mit_g;
const pb = pauschbetrag(G7);
const fkG = fahrtkosten(G7, ['G']);
const fkOhne = fahrtkosten(G7, []);
const ohneG = steuerwirkung({ zve: 40000, splitting: false, kirche: 0, pauschbetrag: pb, fahrtkosten: 0, weitereAgB: 0, kinder: 0 });
const mitG = steuerwirkung({ zve: 40000, splitting: false, kirche: 0, pauschbetrag: pb, fahrtkosten: fkG, weitereAgB: 0, kinder: 0 });
const mitGKosten = steuerwirkung({ zve: 40000, splitting: false, kirche: 0, pauschbetrag: pb, fahrtkosten: fkG, weitereAgB: 1800, kinder: 0 });
const ohneGKosten = steuerwirkung({ zve: 40000, splitting: false, kirche: 0, pauschbetrag: pb, fahrtkosten: 0, weitereAgB: 1800, kinder: 0 });
const zum40 = zumutbar(40000, false, 0);
const sechzig30 = gesamtGdb([{ system: 'beine', gdb: 60 }, { system: 'wirbelsaeule', gdb: 30, beziehung: 'nachteilig' }]);
const zweimal50 = gesamtGdb([{ system: 'augen', gdb: 50 }, { system: 'ohren', gdb: 50, beziehung: 'unabhaengig' }]);

export default defineGuide({
  id: 'gdb-70',
  group: 'stufen',
  order: 270,
  mini: 'stufe',
  miniDefaults: { g: 70 },
  miniHref: 'home',
  related: ['fahrtkostenpauschale', 'merkzeichen-g', 'gdb-80', 'gdb-60', 'merkzeichen-bl', 'gdb-schwerhoerigkeit'],
  sources: ['estg33', 'estg33b', 'schwbawv3', 'vwvStvo', 'versmedv'],
  de: {
    slug: 'gdb-70',
    nav: 'GdB 70',
    card: 'Ab 70 zählt das Merkzeichen G doppelt: Fahrtkostenpauschale, Parkerleichterung in Sonderfällen und die Hörschwelle der Taubblindheit.',
    title: 'GdB 70 Vorteile 2026: Fahrtkosten mit Merkzeichen G',
    description: `GdB 70 Vorteile 2026: Pauschbetrag ${eur(pb)}, mit Merkzeichen G zusätzlich ${eur(fkG)} Fahrtkostenpauschale. Typische Leiden, Parkausweis und die Taubblindheit.`,
    h1: 'GdB 70: Pauschbetrag und Fahrtkosten mit G',
    intro: 'Bei GdB 70 hängt viel am Merkzeichen G: Mit ihm kommt eine Fahrtkostenpauschale hinzu, ohne es bleibt es beim Pauschbetrag.',
    resume: `Ein Grad der Behinderung von ${G7} bringt alle Rechte der Schwerbehinderung und einen Behinderten-Pauschbetrag von ${eur(pb)} im Jahr nach § 33b Absatz 3 EStG. Neu ist ab dieser Stufe die behinderungsbedingte Fahrtkostenpauschale von ${eur(fkG)} nach § 33 Absatz 2a EStG, aber nur zusammen mit dem Merkzeichen G; ohne G gibt es sie erst ab GdB ${F.gdb_klein}. Die Pauschale ist eine außergewöhnliche Belastung und wirkt nur, soweit sie mit anderen Krankheitskosten die zumutbare Belastung übersteigt: Bei ${eur(40000)} Einkommen ohne Kinder liegt diese bei ${eur(zum40)}. Wer zusätzlich ${eur(1800)} Krankheitskosten hat, spart mit G rund ${eur(mitGKosten.ersparnis - ohneGKosten.ersparnis)} mehr als ohne. Die Zahl 70 hat noch zwei weitere Bedeutungen: Für das Merkzeichen TBl braucht es einen GdB von mindestens 70 wegen der Hörstörung, und die Verwaltungsvorschrift zur StVO gewährt Parkerleichterungen bei Stoma mit Harnableitung ab 70. Typische Einzelwerte von ${G7} sind der Verlust eines Beines im Oberschenkel und eine an Taubheit grenzende Schwerhörigkeit beidseits.`,
    faqs: [
      { q: 'Bekomme ich mit GdB 70 automatisch die Fahrtkostenpauschale?', a: `Nein. Bei GdB ${G7} verlangt § 33 Abs. 2a Nr. 1 EStG zusätzlich das Merkzeichen G. Ohne G beträgt die Pauschale ${eur(fkOhne)}; sie beginnt dann erst bei GdB ${F.gdb_klein}. Mit aG, Bl, TBl oder H gibt es unabhängig vom GdB ${eur(F.gross)}. Andere behinderungsbedingte Fahrtkosten sind neben der Pauschale nicht absetzbar, Fahrten zur Behandlung als Krankheitskosten schon.` },
      { q: 'Warum spart die Fahrtkostenpauschale bei mir nichts?', a: `Weil sie zu den außergewöhnlichen Belastungen zählt und zuerst die zumutbare Belastung auffüllt. Bei ${eur(40000)} Einkommen, ledig und ohne Kinder, liegt diese bei ${eur(zum40)}; die Pauschale von ${eur(fkG)} allein bleibt darunter. Erst mit weiteren Krankheitskosten, etwa Zuzahlungen, Zahnersatz oder Brillen, wird der übersteigende Teil abgezogen. Bei Ehepaaren und mit Kindern ist die zumutbare Belastung niedriger.` },
      { q: 'Was bedeutet GdB 70 für das Merkzeichen TBl?', a: `Taubblind im Sinne von § 3 Abs. 1 Nr. 8 der Schwerbehindertenausweisverordnung ist, wer wegen einer Störung der Hörfunktion mindestens einen GdB von 70 und wegen einer Störung des Sehvermögens einen GdB von 100 hat. Mit TBl gibt es den erhöhten Pauschbetrag von ${eur(P.pauschbetrag.erhoeht)}, die Fahrtkostenpauschale von ${eur(F.gross)} und die Befreiung vom Rundfunkbeitrag.` },
      { q: 'Wann gilt ein Anfallsleiden mit GdB 70 als gehbehindert?', a: 'Nach Teil D der Versorgungsmedizin-Verordnung ist bei hirnorganischen Anfällen im Allgemeinen erst ab einer mittleren Anfallshäufigkeit mit einem GdB von wenigstens 70 auf eine erhebliche Beeinträchtigung der Bewegungsfähigkeit zu schließen, wenn die Anfälle überwiegend am Tag auftreten. Dasselbe gilt für Diabetes mit häufigen Unterzuckerungsschocks. Dann kommt das Merkzeichen G in Betracht.' },
      { q: 'Wie viele Tage Zusatzurlaub gibt es bei GdB 70?', a: `Genauso viele wie bei GdB ${S.schwerbehinderung}: ${P.urlaub.tage_bei_5} Arbeitstage bei der Fünftagewoche, bei vier Tagen vier. § 208 SGB IX staffelt den Zusatzurlaub nicht nach der Höhe des GdB. Abweichende Regeln können sich aus Tarifverträgen oder Beamtenrecht ergeben. Den Anteil im ersten Jahr rechnet der Zusatzurlaub-Rechner aus.` },
    ],
    body: (h) => `
<h2>Was GdB 70 bringt</h2>
${h.table(['Recht', 'ohne Merkzeichen', 'mit Merkzeichen G'], [
  ['Behinderten-Pauschbetrag', h.eur(pb), h.eur(pb)],
  ['Fahrtkostenpauschale', h.eur(fkOhne), h.eur(fkG)],
  ['Freifahrt oder halbe Kfz-Steuer', 'nein', `ja, Wertmarke ${h.eur(P.wertmarke.jahr)}`],
  ['Zusatzurlaub, Kündigungsschutz', 'ja', 'ja'],
  [`Steuer bei ${h.eur(40000)}, ledig`, h.eur(ohneG.mit), h.eur(mitG.mit)],
], 'GdB 70 mit und ohne Merkzeichen G, Stand 2026', ['l', 'r', 'r'])}
<p>Die Tabelle zeigt eine Eigenheit des Steuerrechts: Ohne weitere Krankheitskosten ändert die Pauschale von ${h.eur(fkG)} bei ${h.eur(40000)} Einkommen nichts, denn die zumutbare Belastung von ${h.eur(zum40)} schluckt sie. Mit ${h.eur(1800)} Krankheitskosten im Jahr sieht es anders aus: Dann zahlt die Person mit G ${h.eur(mitGKosten.mit)} statt ${h.eur(ohneGKosten.mit)}. Wie viel bei Ihrem Einkommen übrig bleibt, zeigt der Rechner.</p>
<!--mini:fahrt-->
<p>Die Pauschale ersetzt alle anderen behinderungsbedingten Fahrtkosten, auch Fahrten zu Freizeit und Einkauf. Nicht ersetzt werden Fahrten zum Arzt oder zur Therapie, die als Krankheitskosten zählen. Einzelheiten stehen unter ${h.a('fahrtkostenpauschale', 'Fahrtkostenpauschale')}.</p>
<h2>Typische Einzelwerte von 70</h2>
<p>Teil B nennt ${tb('beinverlust', 'im Oberschenkel (einschließlich')} für den Verlust eines Beines im Oberschenkel und ${tb('armverlust', 'im Oberarm oder im Ellenbogengelenk')} für den Verlust eines Armes im Oberarm. Eine an Taubheit grenzende Schwerhörigkeit auf beiden Ohren ergibt ${tb('schwerhoerigkeit', 'An Taubheit grenzende')}, eine Sehschärfe von 0,1 auf beiden Augen ebenfalls ${tb('sehbehinderung', 'Sehschärfe 0,1 auf beiden')}. Der Verlust des Kehlkopfes bei guter Ersatzstimme wird mit ${tb('kehlkopf', 'guter Ersatzstimme')} bewertet, der Zustand nach Herz- oder Lungentransplantation nach Ablauf der Heilungsbewährung mit mindestens ${tb('herztransplantation', 'danach')}.</p>
<p>Bei der Sehbehinderung hat die 70 eine Folge für die Mobilität: Teil D der Verordnung nimmt bei allen Sehbehinderungen mit einem GdB von wenigstens 70 Störungen der Orientierungsfähigkeit an, die das Merkzeichen G begründen. Mit G und einem Gesamt-GdB von ${G7} ist dann auch die Fahrtkostenpauschale erreicht.</p>
<h2>Hörbehinderung mit 70: Gl und TBl</h2>
<p>Eine an Taubheit grenzende Schwerhörigkeit auf beiden Ohren ist einer der häufigsten Wege zu einem Einzelwert von ${G7}. Daran knüpfen zwei Merkzeichen an. Gehörlos im Sinne des Merkzeichens Gl sind nach Teil D Nummer 4 nicht nur Menschen mit Taubheit beiderseits, sondern auch solche mit einer an Taubheit grenzenden Schwerhörigkeit beiderseits, wenn zusätzlich schwere Sprachstörungen bestehen; das betrifft vor allem Hörbehinderungen, die angeboren sind oder in der Kindheit entstanden. Mit Gl gibt es die Freifahrt mit Wertmarke oder die halbe Kfz-Steuer.</p>
<p>Kommt zu einer Hörstörung mit wenigstens 70 eine Sehstörung mit 100 hinzu, ist das Merkzeichen TBl festzustellen. Es bringt den erhöhten Pauschbetrag von ${h.eur(P.pauschbetrag.erhoeht)}, die große Fahrtkostenpauschale von ${h.eur(F.gross)} und die Befreiung vom Rundfunkbeitrag. Bei Hörstörungen bewertet die Behörde das Sprachgehör ohne Hörgeräte nach Ton- und Sprachaudiogramm; mehr dazu unter ${h.a('gdb-schwerhoerigkeit', 'GdB bei Schwerhörigkeit')}.</p>
<h2>Parkerleichterungen ab 70</h2>
<p>Die ${h.src('vwvStvo', 'Verwaltungsvorschrift zur StVO')} nennt zwei Gruppen, die an die Zahl 70 anknüpfen. Erstens schwerbehinderte Menschen mit den Merkzeichen G und B und einem GdB von wenigstens 70 allein für Funktionsstörungen der Beine und, soweit sie das Gehen beeinträchtigt, der Lendenwirbelsäule, wenn gleichzeitig ein GdB von wenigstens 50 für Herz oder Atmungsorgane besteht. Zweitens Menschen mit künstlichem Darmausgang und zugleich künstlicher Harnableitung, wenn hierfür ein GdB von wenigstens 70 vorliegt. Beide erhalten auf Antrag bei der Straßenverkehrsbehörde Parkerleichterungen, aber keinen Zugang zu den Parkplätzen mit Rollstuhlsymbol.</p>
<h2>Wie 70 aus mehreren Leiden entsteht</h2>
<p>Ein Beinleiden mit 60 und ein Rückenleiden mit 30, die das Gehen gemeinsam verschlechtern, ergeben nach diesem Rechner ${sechzig30.min} bis ${sechzig30.max}, Richtwert ${sechzig30.richt}. Zwei schwere Leiden mit je 50 in verschiedenen Bereichen, etwa Sehen und Hören, liegen bei ${zweimal50.min} bis ${zweimal50.max}; der Richtwert dieser Seite ist ${zweimal50.richt}. Gerade bei Sinnesorganen nimmt die Verordnung oft eine stärkere Wechselwirkung an, weil ein Sinn den anderen nicht mehr ausgleichen kann. Die Spanne für Ihre Leiden zeigt der ${h.a('home', 'Gesamt-GdB-Rechner')}.</p>
<h2>Merkzeichen G beantragen</h2>
<p>Wer mit GdB ${G7} nicht weit gehen kann, sollte das ${h.a('merkzeichen-g', 'Merkzeichen G')} beantragen. Die Behörde prüft, ob Sie Wegstrecken im Ortsverkehr, die üblicherweise zu Fuß zurückgelegt werden, nicht ohne erhebliche Schwierigkeiten oder Gefahren bewältigen. Für Beine und Lendenwirbelsäule mit wenigstens ${S.schwerbehinderung} gilt das als erfüllt. Mit G haben Sie die Wahl zwischen Freifahrt und halber Kfz-Steuer nach § 3a KraftStG. Ab ${h.a('gdb-80', 'GdB 80')} gibt es die Fahrtkostenpauschale auch ohne G.</p>
<p>Beschreiben Sie im Antrag konkret, wie weit Sie ohne Pause gehen können, ob Sie Hilfsmittel wie Stock oder Rollator brauchen, wie oft Sie stürzen und ob Atemnot, Schmerzen oder Schwindel Sie anhalten lassen. Arztberichte, die nur Diagnosen aufzählen, reichen für das Merkzeichen selten. Ob G vorliegt, entscheidet die Behörde nach Aktenlage oder Untersuchung; der Rechner auf dieser Seite kann das nicht vorwegnehmen.</p>
`,
  },
});
