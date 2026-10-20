import { defineGuide } from '../../lib/guide-types';
import { pauschbetrag } from '../../lib/engine/rechte';
import { steuerwirkung } from '../../lib/engine/steuer';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { eintrag } from '../../lib/engine/tabelle';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

/**
 * GdB 60: Schwerbehinderung mit zwei Sonderfällen ab 60 allein für ein Leiden: besonderer Parkausweis bei
 * Morbus Crohn oder Colitis ulcerosa (VwV-StVO zu § 46, Rn. 135) und Merkzeichen RF bei Sehbehinderung (§ 4 Abs. 2 RBStV).
 * Eigene Beispiele: Ersparnis bei 38.000 € und Ehepaar mit 75.000 €, Wege zu 60, RF-Ersparnis im Jahr.
 */
const S = P.schwelle;
const eur = (x: number) => formatMoney(x, 0, 'de');
const eur2 = (x: number) => formatMoney(x, 2, 'de');
const tb = (id: string, teil: string) => {
  const s = eintrag(id)!.stufen.find((x) => x.text.includes(teil))!;
  return s.von === s.bis ? String(s.von) : `${s.von} bis ${s.bis}`;
};
const pb = pauschbetrag(60);
const pb50 = pauschbetrag(S.schwerbehinderung);
const s38 = steuerwirkung({ zve: 38000, splitting: false, kirche: 0, pauschbetrag: pb, fahrtkosten: 0, weitereAgB: 0, kinder: 0 });
const paar = steuerwirkung({ zve: 75000, splitting: true, kirche: 0.09, pauschbetrag: pb, fahrtkosten: 0, weitereAgB: 0, kinder: 2 });
const rfJahr = (P.rundfunk.voll - P.rundfunk.ermaessigt) * 12;
const fuenfzig30 = gesamtGdb([{ system: 'verdauung', gdb: 50 }, { system: 'psyche', gdb: 30, beziehung: 'unabhaengig' }]);
const fuenfzig20 = gesamtGdb([{ system: 'beine', gdb: 50 }, { system: 'wirbelsaeule', gdb: 20, beziehung: 'nachteilig' }]);
const vierzig40 = gesamtGdb([{ system: 'herz', gdb: 40 }, { system: 'lunge', gdb: 40, beziehung: 'nachteilig' }]);

export default defineGuide({
  id: 'gdb-60',
  group: 'stufen',
  order: 260,
  mini: 'stufe',
  miniDefaults: { g: 60 },
  miniHref: 'home',
  related: ['gdb-50', 'gdb-70', 'merkzeichen-rf', 'merkzeichen-g', 'behinderten-pauschbetrag', 'schwerbehindertenausweis-vorteile'],
  sources: ['estg33b', 'vwvStvo', 'rbstv4', 'rundfunkbeitrag', 'sgb9_2', 'versmedv'],
  de: {
    slug: 'gdb-60',
    nav: 'GdB 60',
    card: 'Schwerbehindert mit höherem Pauschbetrag: Parkerleichterung bei Morbus Crohn ab 60, RF bei Sehbehinderung und was sonst gleich bleibt.',
    title: 'GdB 60 Vorteile 2026: Pauschbetrag, Parken, Rundfunk',
    description: `GdB 60 Vorteile 2026: Pauschbetrag ${eur(pb)}, alle Rechte der Schwerbehinderung, Parkausweis bei Morbus Crohn ab 60, RF bei Sehbehinderung. Was sonst gilt.`,
    h1: 'GdB 60: was über die Schwerbehinderung hinaus gilt',
    intro: 'GdB 60 bringt alle Rechte der Schwerbehinderung und für zwei Gruppen eigene Vorteile, die genau an diese Stufe geknüpft sind.',
    resume: `Mit einem Grad der Behinderung von 60 sind Sie schwerbehindert und haben dieselben Rechte wie mit ${S.schwerbehinderung}: Ausweis, ${P.urlaub.tage_bei_5} Tage Zusatzurlaub bei der Fünftagewoche, besonderen Kündigungsschutz und die Altersrente für schwerbehinderte Menschen. Mehr gibt es beim Behinderten-Pauschbetrag: ${eur(pb)} statt ${eur(pb50)} im Jahr. Bei ${eur(38000)} zu versteuerndem Einkommen spart das rund ${eur(s38.ersparnis)} Steuern. Zwei Regeln knüpfen ausdrücklich an 60 an, wenn dieser Wert allein auf ein bestimmtes Leiden entfällt: Menschen mit Morbus Crohn oder Colitis ulcerosa und einem GdB von wenigstens 60 dafür können nach der Verwaltungsvorschrift zur StVO Parkerleichterungen erhalten, und blinde oder wesentlich sehbehinderte Menschen mit einem GdB von wenigstens 60 allein wegen der Sehbehinderung zahlen nach § 4 Absatz 2 RBStV nur ein Drittel des Rundfunkbeitrags, ${eur2(P.rundfunk.ermaessigt)} statt ${eur2(P.rundfunk.voll)} im Monat. Freifahrt, Kfz-Steuervorteil und Fahrtkostenpauschale hängen weiterhin an Merkzeichen oder einem höheren GdB.`,
    faqs: [
      { q: 'Was bringt GdB 60 mehr als GdB 50?', a: `Bei den Rechten im Beruf und bei der Rente nichts: Zusatzurlaub, Kündigungsschutz und Altersgrenze sind für alle schwerbehinderten Menschen gleich. Mehr gibt es beim Pauschbetrag, ${eur(pb - pb50)} im Jahr. Dazu kommen die Sonderregeln für Morbus Crohn, Colitis ulcerosa und Sehbehinderung, wenn der Wert von 60 allein auf dieses Leiden entfällt. Ein Gesamt-GdB von 60 aus mehreren Leiden genügt dafür nicht.` },
      { q: 'Bekomme ich mit Morbus Crohn und GdB 60 einen Parkausweis?', a: 'Die Verwaltungsvorschrift zu § 46 StVO nennt schwerbehinderte Menschen mit Morbus Crohn oder Colitis ulcerosa, wenn hierfür ein GdB von wenigstens 60 vorliegt (Randnummer 135). Sie erhalten auf Antrag bei der Straßenverkehrsbehörde eine Ausnahmegenehmigung, etwa zum gebührenfreien Parken an Parkuhren. Die Behindertenparkplätze mit Rollstuhlsymbol bleiben dagegen Menschen mit aG, Blinden und vergleichbaren Gruppen vorbehalten.' },
      { q: 'Gibt es das Merkzeichen RF schon ab GdB 60?', a: `Nur bei Sehbehinderung: Blinde oder nicht nur vorübergehend wesentlich sehbehinderte Menschen mit einem GdB von wenigstens 60 allein wegen der Sehbehinderung erhalten auf Antrag die Ermäßigung auf ein Drittel. Das spart ${eur2(rfJahr)} im Jahr. Für alle anderen gilt RF erst ab GdB 80, wenn die Behinderung die Teilnahme an öffentlichen Veranstaltungen ständig unmöglich macht.` },
      { q: 'Wie lange gilt der Ausweis mit GdB 60 bei Krebs?', a: `Bei Krebs setzt Teil B meist eine Heilungsbewährung an, in der ein höherer Wert gilt, etwa ${tb('brustkrebs', 'pN1')} nach Entfernung eines Brusttumors im Stadium T1 bis T2 mit Lymphknotenbefall. Der Ausweis wird in der Regel auf höchstens ${P.ausweis.befristung_jahre} Jahre befristet. Nach Ablauf der Heilungsbewährung prüft die Behörde neu; der Ablauf allein gilt nach Teil A Nummer 7 als wesentliche Änderung.` },
      { q: 'Wann gibt es bei GdB 60 das Merkzeichen G?', a: `Wenn sich die Behinderung auf das Gehen auswirkt. Nach Teil D der Verordnung sind die Voraussetzungen erfüllt, wenn Funktionsstörungen der Beine oder der Lendenwirbelsäule für sich einen GdB von wenigstens ${S.schwerbehinderung} bedingen. Ein Unterschenkelverlust mit ungünstigem Stumpf, bewertet mit ${tb('beinverlust', 'Unterschenkel bei ungenügender')}, erfüllt das in der Regel. Ein GdB von 60 aus Darm- oder Hautleiden begründet G dagegen nicht.` },
    ],
    body: (h) => `
<h2>Die Rechte mit GdB 60</h2>
${h.table(['Recht', 'GdB 60', 'Bedingung'], [
  ['Schwerbehindertenausweis', 'ja', 'auf Antrag'],
  ['Behinderten-Pauschbetrag', `${h.eur(pb)} im Jahr`, '§ 33b Abs. 3 EStG'],
  ['Zusatzurlaub', `${P.urlaub.tage_bei_5} Arbeitstage`, 'bei Fünftagewoche'],
  ['Besonderer Kündigungsschutz', 'ja', `nach ${P.kuendigung.wartezeit_monate} Monaten`],
  ['Parkerleichterungen', 'nur Sonderfall', 'Morbus Crohn, Colitis: 60 allein dafür'],
  ['Rundfunkbeitrag ein Drittel', 'nur Sonderfall', 'Sehbehinderung: 60 allein dafür'],
  ['Fahrtkostenpauschale', 'nein', `ab ${P.fahrtkosten.gdb_klein_mit_g} mit G`],
], 'GdB 60 im Jahr 2026', ['l', 'l', 'l'])}
<p>Die meisten Rechte der Schwerbehinderung sind nur an die Schwelle von ${S.schwerbehinderung} gebunden. Was mit 60 tatsächlich wächst, ist der Pauschbetrag. Für ein Ehepaar mit zwei Kindern, ${h.eur(75000)} zu versteuerndem Einkommen und Kirchensteuer bringt er rund ${h.eur(paar.ersparnis)} im Jahr. Die Altersrente beginnt für alle Schwerbehinderten gleich, nach Jahrgang; Einzelheiten stehen bei ${h.a('gdb-50', 'GdB 50')}.</p>
<!--mini:steuer-->
<h2>Morbus Crohn und Colitis ulcerosa: Parken ab 60</h2>
<p>Teil B Nummer 10.2.2 bewertet Morbus Crohn und Colitis ulcerosa mit schwerer Auswirkung, also anhaltenden erheblichen Beschwerden, erheblicher Beeinträchtigung des Kräfte- und Ernährungszustands und häufigen, auch nächtlichen Durchfällen, mit ${tb('morbus-crohn-colitis', 'mit schwerer Auswirkung')}. Liegt der GdB für die Darmerkrankung allein bei wenigstens 60, nennt die ${h.src('vwvStvo', 'Verwaltungsvorschrift zur StVO')} diese Gruppe ausdrücklich unter den Menschen, die Parkerleichterungen erhalten können.</p>
<p>Die Ausnahmegenehmigung beantragen Sie bei der örtlichen Straßenverkehrsbehörde. Sie erlaubt unter anderem, bis zu drei Stunden im eingeschränkten Halteverbot zu parken, an Parkuhren und Parkscheinautomaten ohne Gebühr und zeitliche Grenze zu stehen und in Fußgängerzonen während der Ladezeiten zu halten, wenn in zumutbarer Entfernung keine andere Parkmöglichkeit besteht. Sie wird für höchstens fünf Jahre erteilt, in der Regel gebührenfrei, und gilt im ganzen Bundesgebiet. Die Parkplätze mit Rollstuhlsymbol darf diese Gruppe nicht nutzen; dafür braucht es den EU-Parkausweis, den es mit ${h.a('merkzeichen-ag', 'Merkzeichen aG')} oder Blindheit gibt.</p>
<p>Wichtig ist die Formulierung „hierfür“: Ein Gesamt-GdB von 60, der aus Darmerkrankung und Rückenleiden zusammengesetzt ist, genügt nicht. Im Bescheid steht der Einzelwert für das Darmleiden in der Begründung; diesen Wert prüft die Straßenverkehrsbehörde.</p>
<h2>Darmleiden mit Stoma</h2>
<p>Bei chronisch entzündlichen Darmerkrankungen kommt es nach Operationen oft zu einem künstlichen Darmausgang. Teil B Nummer 10.2.4 bewertet ein Stoma mit guter Versorgungsmöglichkeit mit ${tb('kuenstlicher-darmausgang', 'guter Versorgungsmöglichkeit')}, bei Komplikationen wie Bauchwandhernie, Stenose oder ungünstiger Lage mit ${tb('kuenstlicher-darmausgang', 'sonst')}. Fisteln, Stenosen und Folgen außerhalb des Darms, etwa Gelenkentzündungen, bewertet die Behörde nach der Verordnung zusätzlich. Wer zugleich eine künstliche Harnableitung hat, gehört bei einem GdB von wenigstens 70 dafür zu einer weiteren Gruppe der Verwaltungsvorschrift; mehr dazu bei ${h.a('gdb-70', 'GdB 70')}.</p>
<p>Für den Antrag zählen Häufigkeit und Schwere der Schübe, Gewichtsverlauf, Laborwerte zur Blutarmut und die nötige Therapie. Ein Tagebuch über Durchfälle und Ausfalltage über einige Monate macht die Auswirkungen nachvollziehbar und hilft, die obere Hälfte der Spanne zu begründen.</p>
<h2>Sehbehinderung: Rundfunkbeitrag ab 60</h2>
<p>§ 4 Absatz 2 Nummer 1 des ${h.src('rbstv4', 'Rundfunkbeitragsstaatsvertrags')} ermäßigt den Beitrag für blinde oder nicht nur vorübergehend wesentlich sehbehinderte Menschen „mit einem Grad der Behinderung von wenigstens 60 allein wegen der Sehbehinderung“. Im Ausweis steht dann das ${h.a('merkzeichen-rf', 'Merkzeichen RF')}. Der Beitrag sinkt auf ${h.eur(P.rundfunk.ermaessigt, 2)} im Monat, die Ersparnis beträgt ${h.eur(rfJahr, 2)} im Jahr. Den Antrag stellen Sie beim Beitragsservice; die Ermäßigung wirkt höchstens ${P.rundfunk.rueckwirkend_jahre} Jahre zurück. Mit 60 bewertet Teil B zum Beispiel den vollständigen Ausfall beider unterer Gesichtsfeldhälften (${tb('gesichtsfeldausfall', 'unterer Gesichtsfeldhälften')}).</p>
<h2>Wie 60 zustande kommt</h2>
<p>Als Einzelwert nennt Teil B die 60 etwa für den Verlust eines Unterarms mit sehr kurzem Stumpf (${tb('armverlust', 'Stumpflänge bis 7 cm')}), für Prostatakrebs unter dauerhafter Hormonbehandlung (${tb('prostatakrebs', 'hormonbehandelt')}) und für die Zeit nach einer Lebertransplantation (${tb('lebertransplantation', 'danach')}). Häufiger entsteht 60 aus mehreren Leiden: Ein Darmleiden mit 50 und eine Depression mit 30, die verschiedene Lebensbereiche betreffen, ergeben nach diesem Rechner ${fuenfzig30.min} bis ${fuenfzig30.max}, Richtwert ${fuenfzig30.richt}. Ein Beinleiden mit 50 und ein Rückenleiden mit 20, die das Gehen gemeinsam erschweren, liegen beim Richtwert ${fuenfzig20.richt}. Herz- und Lungenleiden mit je 40, die sich verstärken, kommen auf ${vierzig40.richt}. Den Gesamtwert aus Ihren Einzelwerten zeigt der ${h.a('home', 'Gesamt-GdB-Rechner')}.</p>
<h2>Merkzeichen prüfen lassen</h2>
<p>Ab 60 lohnt es sich besonders, im Antrag auch Merkzeichen zu beantragen, wenn die Voraussetzungen in Frage kommen. Das ${h.a('merkzeichen-g', 'Merkzeichen G')} öffnet die Wahl zwischen Freifahrt mit Wertmarke für ${h.eur(P.wertmarke.jahr)} im Jahr und halber Kfz-Steuer; mit G und einem GdB ab ${P.fahrtkosten.gdb_klein_mit_g} kommt die Fahrtkostenpauschale von ${h.eur(P.fahrtkosten.klein)} hinzu. Merkzeichen beantragen Sie mit demselben Formular wie den GdB, auch nachträglich.</p>
`,
  },
});
