import { defineGuide } from '../../lib/guide-types';
import { fahrtkosten, pauschbetrag } from '../../lib/engine/rechte';
import { steuerwirkung } from '../../lib/engine/steuer';
import { P } from '../../lib/engine/params';
import { MZ_INFO } from '../../data/merkzeichen';
import { formatMoney } from '../../lib/format';

/**
 * Merkzeichen aG (§ 229 Abs. 3 SGB IX; Teil D Nr. 3 VersMedV ist aufgehoben). Eigene Beispiele: Rentnerin mit
 * GdB 80 und 32.000 € zvE, Angestellter mit GdB 90 und 52.000 €, jeweils mit und ohne aG. Parken nach VwV-StVO.
 */
const eur = (x: number) => formatMoney(x, 0, 'de');
const ag80 = MZ_INFO.aG.mindestGdb!;
const pb80 = pauschbetrag(80, ['aG']);
const pb90 = pauschbetrag(90, ['aG']);
const fkAg = fahrtkosten(80, ['aG']);
const fk80 = fahrtkosten(80);
const fk90 = fahrtkosten(90);
const st = (zve: number, pb: number, fk: number) => steuerwirkung({ zve, splitting: false, kirche: 0, pauschbetrag: pb, fahrtkosten: fk, weitereAgB: 0, kinder: 0 });
const r1Ohne = st(32000, pb80, fk80);
const r1Mit = st(32000, pb80, fkAg);
const r2Ohne = st(52000, pb90, fk90);
const r2Mit = st(52000, pb90, fkAg);

export default defineGuide({
  id: 'merkzeichen-ag',
  group: 'merkzeichen',
  order: 320,
  mini: 'merkzeichen',
  miniDefaults: { m: 2, g: 80 },
  miniHref: 'merkzeichen',
  related: ['merkzeichen', 'merkzeichen-g', 'gdb-80', 'fahrtkostenpauschale', 'merkzeichen-b', 'schwerbehindertenausweis-vorteile'],
  sources: ['sgb9_229', 'vwvStvo', 'kraftstg3a', 'estg33', 'sgb9_228', 'versmedv'],
  de: {
    slug: 'merkzeichen-ag',
    nav: 'Merkzeichen aG',
    card: 'Außergewöhnlich gehbehindert: der Maßstab GdB 80, Rollstuhl und gleichwertige Leiden, EU-Parkausweis, Steuerbefreiung und große Fahrtkostenpauschale.',
    title: 'Merkzeichen aG 2026: Parkausweis, Voraussetzungen, Steuer',
    description: `Merkzeichen aG 2026: wer als außergewöhnlich gehbehindert gilt, was der EU-Parkausweis erlaubt und warum die Fahrtkostenpauschale auf ${eur(fkAg)} ansteigt.`,
    h1: 'Merkzeichen aG: außergewöhnlich gehbehindert',
    intro: 'Das Merkzeichen aG öffnet die Parkplätze mit Rollstuhlsymbol; die Hürde ist hoch, und sie liegt nicht beim Gesamt-GdB, sondern bei der Mobilität.',
    resume: `Außergewöhnlich gehbehindert sind nach § 229 Absatz 3 SGB IX Menschen mit einer erheblichen mobilitätsbezogenen Teilhabebeeinträchtigung, die einem GdB von mindestens ${ag80} entspricht. Das ist der Fall, wenn sie sich wegen der Schwere ihrer Beeinträchtigung dauernd nur mit fremder Hilfe oder mit großer Anstrengung außerhalb ihres Kraftfahrzeugs bewegen können. Das Gesetz nennt als Hauptgruppe Menschen, die aus medizinischer Notwendigkeit dauerhaft auch für sehr kurze Strecken auf einen Rollstuhl angewiesen sind; andere Leiden, etwa des Herzens, der Atmung oder der Nerven, zählen, wenn ihre Wirkung auf das Gehen gleich schwer ist. Mit aG gibt es den EU-einheitlichen Parkausweis für Behindertenparkplätze, die Befreiung von der Kraftfahrzeugsteuer, die Freifahrt im Nahverkehr mit Wertmarke für ${eur(P.wertmarke.jahr)} im Jahr und eine Fahrtkostenpauschale von ${eur(fkAg)} statt ${eur(fk80)}. Eine Rentnerin mit GdB 80 und ${eur(32000)} zu versteuerndem Einkommen zahlt dadurch nach dem Rechner rund ${eur(r1Mit.ersparnis - r1Ohne.ersparnis)} weniger Steuern im Jahr als ohne aG. Der Behinderten-Pauschbetrag steigt mit aG nicht.`,
    faqs: [
      { q: 'Reicht ein Rollator für das Merkzeichen aG?', a: `Das Gesetz knüpft aG nicht an ein bestimmtes Hilfsmittel. Ausdrücklich genannt ist nur der Rollstuhl, der aus medizinischer Notwendigkeit dauerhaft auch für sehr kurze Strecken gebraucht wird. Wer mit Rollator geht, kann aG erhalten, wenn er sich außerhalb des Autos dauernd nur mit großer Anstrengung oder fremder Hilfe bewegen kann und die Beeinträchtigung einem GdB von ${ag80} entspricht. Entscheidend sind Befunde zur tatsächlichen Gehfähigkeit.` },
      { q: 'Darf eine Angehörige mit meinem Parkausweis parken, wenn ich nicht mitfahre?', a: 'Nein. Die Ausnahmegenehmigung gilt für Sie als Person, nicht für das Fahrzeug. Nach der Verwaltungsvorschrift zur StVO darf auch jemand ohne eigenen Führerschein den Parkausweis erhalten; die Person, die Sie fährt, nutzt die Erleichterungen dann für Fahrten mit Ihnen. Allein, etwa zum Einkaufen für Sie, darf die Angehörige den Ausweis nicht verwenden. Ein Missbrauch kann zum Widerruf der Genehmigung führen.' },
      { q: 'Erhöht das Merkzeichen aG den Behinderten-Pauschbetrag?', a: `Nein. Den erhöhten Pauschbetrag von ${eur(P.pauschbetrag.erhoeht)} gibt es nach § 33b Absatz 3 EStG nur für hilflose, blinde und taubblinde Menschen. Mit aG bleibt es beim Betrag nach dem GdB, bei GdB 80 also ${eur(pb80)}. Steuerlich wirkt aG über die Fahrtkostenpauschale von ${eur(fkAg)}, die allerdings erst zählt, soweit sie die zumutbare Belastung übersteigt.` },
      { q: 'Muss der GdB für die Beine allein 80 betragen?', a: `Nicht zwingend. Das Gesetz verlangt eine mobilitätsbezogene Beeinträchtigung, die einem GdB von ${ag80} entspricht, und lässt ausdrücklich die Kombination verschiedener Gesundheitsstörungen zu, etwa eines Herz- und eines Beinleidens. Maßgeblich ist, wie sich alle Leiden zusammen dauerhaft auf das Gehen auswirken. Ein Gesamt-GdB von 80 aus Leiden, die das Gehen kaum berühren, genügt dagegen nicht.` },
      { q: 'Wo beantrage ich den EU-Parkausweis?', a: 'Bei der örtlichen Straßenverkehrsbehörde, meist im Ordnungs- oder Straßenverkehrsamt Ihrer Stadt oder Ihres Kreises. Sie legen den Schwerbehindertenausweis mit aG vor. Nach der Verwaltungsvorschrift wird die Genehmigung in der Regel gebührenfrei erteilt, für höchstens fünf Jahre und stets widerruflich. Sie gilt im ganzen Bundesgebiet; das EU-Muster wird auch in anderen Mitgliedstaaten anerkannt, dort gelten aber die örtlichen Regeln.' },
    ],
    body: (h) => `
<h2>Was das Gesetz unter aG versteht</h2>
<p>Die Definition der außergewöhnlichen Gehbehinderung steht im Gesetz selbst (${h.src('sgb9_229', '§ 229 Abs. 3 SGB IX')}). Die frühere Nummer 3 in Teil D der ${h.src('versmedv', 'Versorgungsmedizinischen Grundsätze')} ist aufgehoben. Das Gesetz arbeitet in drei Schritten. Erstens braucht es eine erhebliche mobilitätsbezogene Teilhabebeeinträchtigung, die einem GdB von mindestens ${ag80} entspricht. Zweitens ist sie erheblich, wenn Sie sich wegen der Schwere der Beeinträchtigung dauernd nur mit fremder Hilfe oder mit großer Anstrengung außerhalb Ihres Kraftfahrzeugs bewegen können. Drittens nennt das Gesetz Beispiele: insbesondere Menschen, die dauerhaft auch für sehr kurze Entfernungen aus medizinischer Notwendigkeit einen Rollstuhl brauchen, und Menschen, bei denen Störungen der Bewegung, der Nerven und Muskeln, mentaler Funktionen, des Herz-Kreislauf-Systems oder der Atmung zusammen so schwer wirken, dass sie dem gleichkommen.</p>
<p>Die 80 ist dabei ein Vergleichsmaßstab für die Mobilität, kein Gesamt-GdB, der irgendwo im Bescheid stehen muss. Wer wegen eines Lungenleidens schon nach wenigen Schritten in Atemnot gerät, kann aG erhalten, auch wenn die Beine gesund sind. Wer dagegen einen Gesamt-GdB von 100 aus einem Krebsleiden in Heilungsbewährung hat und gut gehen kann, erfüllt aG nicht. Die Behörde stellt das Merkzeichen im Verfahren nach § 152 Abs. 4 SGB IX fest, oft nach versorgungsärztlicher Untersuchung.</p>
<h2>Was aG bringt</h2>
${h.table(['Vorteil', 'Mit aG', 'Rechtsgrundlage'], [
  ['Parken', 'EU-Parkausweis: Behindertenparkplätze und weitere Erleichterungen', 'VwV-StVO zu § 45 und § 46'],
  ['Kraftfahrzeugsteuer', 'Befreiung für ein auf Sie zugelassenes Fahrzeug', '§ 3a Abs. 1 KraftStG'],
  ['Nahverkehr', `Freifahrt mit Wertmarke, ${h.eur(P.wertmarke.jahr)} im Jahr`, '§ 228 SGB IX'],
  ['Fahrtkosten', `Pauschale ${h.eur(fkAg)} im Jahr`, '§ 33 Abs. 2a EStG'],
  ['Pauschbetrag', 'unverändert nach GdB', '§ 33b Abs. 3 EStG'],
  ['Begleitperson', 'nur mit zusätzlichem Merkzeichen B', '§ 229 Abs. 2 SGB IX'],
], 'Nachteilsausgleiche mit Merkzeichen aG, Stand 2026', ['l', 'l', 'l'])}
<p>Anders als bei G müssen Sie mit aG nicht zwischen Wertmarke und Steuervorteil wählen: Die Befreiung nach § 3a Absatz 1 KraftStG gilt neben der Freifahrt. Die Wertmarke kostet mit aG den vollen Betrag, kostenlos ist sie nur mit H oder Bl oder bei bestimmten Sozialleistungen. Was jedes Merkzeichen einzeln auslöst, zeigt der kleine Rechner.</p>
<h2>Parken mit dem EU-Parkausweis</h2>
<p>Die ${h.src('vwvStvo', 'Verwaltungsvorschrift zur StVO')} regelt, was der Parkausweis erlaubt. Er berechtigt zum Parken auf den besonders gekennzeichneten Plätzen mit Rollstuhlsymbol. Daneben dürfen Sie im eingeschränkten Haltverbot bis zu drei Stunden parken, die zulässige Parkdauer in Zonen und an Parkplätzen mit Zeitbegrenzung überschreiten, an Parkuhren und Parkscheinautomaten ohne Gebühr und ohne zeitliche Begrenzung stehen und in Fußgängerzonen während der Ladezeiten parken, jeweils nur, wenn in zumutbarer Entfernung keine andere Parkmöglichkeit besteht. Die längste zulässige Parkzeit beträgt 24 Stunden.</p>
<p>Den EU-Parkausweis erhalten neben Menschen mit aG auch blinde Menschen und Menschen mit beidseitiger Amelie oder Phokomelie oder vergleichbaren Funktionseinschränkungen. Für einige weitere Gruppen, etwa Menschen mit G und B und schweren Leiden an Beinen und Herz oder Lunge, gibt es einen besonderen Parkausweis mit Erleichterungen, aber ohne die Plätze mit Rollstuhlsymbol. Die Genehmigung erteilt die Straßenverkehrsbehörde, nicht das Versorgungsamt.</p>
<h2>Zwei Rechenbeispiele</h2>
<p>Die Fahrtkostenpauschale ist der größte Geldvorteil von aG. Sie zählt zu den außergewöhnlichen Belastungen nach ${h.src('estg33', '§ 33 Abs. 2a EStG')} und wirkt nur, soweit sie die zumutbare Belastung übersteigt.</p>
<p><strong>Rentnerin, GdB 80.</strong> Bei ${h.eur(32000)} zu versteuerndem Einkommen bringen Pauschbetrag und die kleine Fahrtkostenpauschale von ${h.eur(fk80)} zusammen rund ${h.eur(r1Ohne.ersparnis)} Steuerersparnis. Mit aG steigt die Pauschale auf ${h.eur(fkAg)}, die Ersparnis auf rund ${h.eur(r1Mit.ersparnis)}. Die zumutbare Belastung von ${h.eur(r1Mit.zumutbar)} wird dabei zuerst abgezogen.</p>
<p><strong>Angestellter, GdB 90.</strong> Bei ${h.eur(52000)} spart er ohne aG rund ${h.eur(r2Ohne.ersparnis)}, mit aG rund ${h.eur(r2Mit.ersparnis)}. Höheres Einkommen bedeutet hier zugleich eine höhere zumutbare Belastung (${h.eur(r2Mit.zumutbar)}) und einen höheren Steuersatz; beides zusammen bestimmt den Vorteil. Mit Splitting und Kirchensteuer rechnet der ${h.a('behinderten-pauschbetrag', 'Pauschbetrag-Rechner')}, die Einzelheiten zur Pauschale stehen unter ${h.a('fahrtkostenpauschale', 'Fahrtkostenpauschale')}.</p>
<h2>Der Antrag auf aG</h2>
<p>Viele Anträge auf aG scheitern daran, dass die Unterlagen die Diagnose beschreiben, nicht die Mobilität. Die Behörde muss erkennen können, wie weit Sie sich außerhalb des Autos bewegen, mit welchen Hilfsmitteln, mit welchen Pausen und mit welcher Hilfe. Nützlich sind Berichte von Orthopädie, Neurologie, Kardiologie oder Pneumologie mit Messwerten, Berichte aus Reha und Physiotherapie, eine Hilfsmittelverordnung für den Rollstuhl mit Begründung und, falls vorhanden, ein Pflegegutachten. Ein einfaches Gehprotokoll über mehrere Wochen ergänzt das Bild.</p>
<p>Wird aG abgelehnt, prüfen Sie die Begründung: Hat die Behörde nur die Beine betrachtet, obwohl Herz oder Lunge die Gehfähigkeit begrenzen, ist das ein Ansatz für einen ${h.a('widerspruch-gdb', 'Widerspruch')}. Häufig erkennt die Behörde zumindest ${h.a('merkzeichen-g', 'Merkzeichen G')} an; mit G und ${h.a('merkzeichen-b', 'B')} kann bei schweren Leiden an Beinen und Herz oder Lunge der besondere Parkausweis in Betracht kommen.</p>
`,
  },
});
