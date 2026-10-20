import { defineGuide } from '../../lib/guide-types';
import { eintrag, EINTRAEGE } from '../../lib/engine/tabelle';
import { pauschbetrag, zusatzurlaub } from '../../lib/engine/rechte';
import { steuerwirkung } from '../../lib/engine/steuer';
import { formatMoney } from '../../lib/format';

/**
 * Krebs und Heilungsbewährung (VersMedV Teil A Nr. 2, Teil B je Organ). Werte aus tabelle.json:
 * Brust (14.1), Prostata (13.6), Darm (10.2.2), Haut (17.13), Lunge (8.4). Steuerbeispiel vom Motor.
 */
const eur = (x: number) => formatMoney(x, 0, 'de');
const brust = eintrag('brustkrebs')!.stufen;
const prostata = eintrag('prostatakrebs')!.stufen;
const darm = eintrag('darmkrebs')!.stufen;
const haut = eintrag('hautkrebs')!.stufen;
const lunge = eintrag('lungenkrebs')!.stufen;
const hb = EINTRAEGE.filter((e) => e.heilungsbewaehrung).length;
const s50 = steuerwirkung({ zve: 45000, splitting: false, kirche: 0, pauschbetrag: pauschbetrag(50), fahrtkosten: 0, weitereAgB: 0, kinder: 0 });
const s80 = steuerwirkung({ zve: 45000, splitting: false, kirche: 0, pauschbetrag: pauschbetrag(80), fahrtkosten: 0, weitereAgB: 0, kinder: 0 });

export default defineGuide({
  id: 'gdb-krebs',
  group: 'tabelle',
  order: 620,
  mini: 'stufe',
  miniDefaults: { g: 50 },
  miniHref: 'home',
  related: ['gdb-tabelle', 'gdb-50', 'gdb-80', 'schwerbehindertenausweis-beantragen', 'verschlimmerungsantrag', 'widerspruch-gdb'],
  sources: ['versmedv', 'bgbl2025', 'sgb10_48', 'sgb9_199', 'estg33b'],
  de: {
    slug: 'gdb-krebs',
    nav: 'Krebs und Heilungsbewährung',
    card: 'Brust, Prostata, Darm, Haut, Lunge: GdB während der Heilungsbewährung, wie lange sie dauert und was danach geschieht.',
    title: 'GdB bei Krebs 2026: Heilungsbewährung und Werte je Organ',
    description: `GdB bei Krebs 2026: während der Heilungsbewährung meist mindestens 50, in höheren Stadien 80. Brust, Prostata, Darm, Haut und Lunge nach VersMedV, mit Fristen.`,
    h1: 'GdB bei Krebs: Heilungsbewährung und danach',
    intro: 'Nach einer Krebserkrankung gilt für einige Jahre ein pauschal höherer GdB. Hier steht, wie hoch, wie lange und was die Neubewertung danach bedeutet.',
    resume: `Bei bösartigen Tumoren bewertet die Versorgungsmedizin-Verordnung nicht nur die Folgen der Behandlung, sondern die Ungewissheit über den Verlauf. Teil A Nummer 2 nennt das Heilungsbewährung: Für einen Zeitraum von in der Regel fünf Jahren wird der GdB pauschal höher angesetzt, bei bösartigen Neubildungen im Allgemeinen mindestens 50, in höheren Stadien im Allgemeinen 80. Teil B regelt je Organ abweichende Werte und kürzere Fristen. Nach Entfernung eines Brustkrebses im Stadium T1 bis T2 ohne befallene Lymphknoten sind es ${brust[0].von}, mit befallenen Lymphknoten ${brust[1].von}; nach Entfernung eines frühen Darmtumors ${darm[0].von} für zwei Jahre; nach Entfernung eines Lungentumors wenigstens ${lunge[0].von}. Die Frist beginnt, wenn der Tumor durch Operation oder andere Primärtherapie als beseitigt gilt; eine anschließende Chemo- oder Strahlentherapie verschiebt den Beginn nicht. Nach Ablauf prüft die Behörde neu und bewertet dann nur die bleibenden Folgen, oft deutlich niedriger. Mit GdB 50 gibt es ${eur(pauschbetrag(50))} Pauschbetrag im Jahr.`,
    faqs: [
      { q: 'Wann beginnt die Heilungsbewährung?', a: 'Mit dem Zeitpunkt, zu dem der Tumor durch Operation oder eine andere Primärtherapie als beseitigt angesehen werden kann (Teil A Nummer 2.5). Eine zusätzliche adjuvante Therapie, etwa eine Chemotherapie nach der Operation, hat keinen Einfluss auf den Beginn. Tritt ein Rückfall auf und wird er kurativ behandelt, beginnt die Heilungsbewährung neu. Für Transplantationen zählt der Tag der Transplantation.' },
      { q: 'Was passiert nach Ablauf der fünf Jahre?', a: 'Die Behörde leitet von sich aus eine Überprüfung ein und bewertet nur noch die bleibenden Folgen: Narben, Lymphödem, Stoma, Inkontinenz, Erschöpfung, psychische Folgen. Ist der Verlauf rezidivfrei, entfällt die pauschale Bewertung, und der GdB sinkt häufig unter 50. Die Herabsetzung gilt für die Zukunft, nach Anhörung und mit einem neuen Bescheid, gegen den Sie Widerspruch einlegen können.' },
      { q: 'Gibt es bei einem Carcinoma in situ eine Heilungsbewährung?', a: `Grundsätzlich nicht, sagt Teil A Nummer 2.6, außer Teil B bestimmt es anders. Für die Brust tut Teil B das: Nach Entfernung eines Carcinoma in situ der Brustdrüse gilt eine Heilungsbewährung von zwei Jahren mit ${brust[3].von}. Bei der Haut sind Melanoma in situ, Basalzellkarzinome und die Bowen-Krankheit ausdrücklich ausgenommen.` },
      { q: 'Lohnt sich der Antrag schon während der Therapie?', a: `Meist ja, weil der GdB ab dem Antrag gilt und während der Behandlung die Belastung am größten ist. Mit GdB 50 kommen Ausweis, Zusatzurlaub von ${zusatzurlaub(50)} Tagen bei der Fünftagewoche, Kündigungsschutz und der Pauschbetrag hinzu. Bei ${eur(45000)} zu versteuerndem Einkommen spart der Pauschbetrag für GdB 50 rund ${eur(s50.ersparnis)} im Jahr, für GdB 80 rund ${eur(s80.ersparnis)}.` },
    ],
    body: (h) => `
<h2>Werte während der Heilungsbewährung</h2>
${h.table(['Tumor (Teil B)', 'Situation', 'GdB', 'Frist'], [
  ['Brust (Nr. 14.1)', 'Stadium T1 bis T2, pN0', String(brust[0].von), '5 Jahre'],
  ['Brust (Nr. 14.1)', 'Stadium T1 bis T2, pN1', String(brust[1].von), '5 Jahre'],
  ['Brust (Nr. 14.1)', 'höhere Stadien', `wenigstens ${brust[2].von}`, '5 Jahre'],
  ['Prostata (Nr. 13.6)', 'T1a N0 M0, G1', String(prostata[0].von), '2 Jahre'],
  ['Prostata (Nr. 13.6)', 'höhere Stadien', `wenigstens ${prostata[2].von}`, '5 Jahre'],
  ['Darm (Nr. 10.2.2)', 'T1 bis T2 N0 M0', String(darm[0].von), '2 Jahre'],
  ['Darm (Nr. 10.2.2)', 'andere Stadien', `wenigstens ${darm[2].von}`, '5 Jahre'],
  ['Haut (Nr. 17.13)', 'Melanom Stadium I', String(haut[0].von), '5 Jahre'],
  ['Lunge (Nr. 8.4)', 'nach Entfernung', `wenigstens ${lunge[0].von}`, '5 Jahre'],
], 'Auswahl aus Teil B, Wortlaut gekürzt; die GdB-Tabelle enthält alle Einträge mit Heilungsbewährung', ['l', 'l', 'r', 'r'])}
<p>Diese Werte sind Mindestwerte für die Zeit der Heilungsbewährung. Bedingen die Folgen der Behandlung selbst einen höheren Wert, etwa ein dauerhaftes Stoma, ein ausgeprägtes Lymphödem des Arms oder eine eingeschränkte Lungenfunktion, wird der Wert entsprechend höher angesetzt. Ein Prostatakarzinom, das dauerhaft hormonbehandelt wird, hat wenigstens ${prostata[4].von}. Insgesamt tragen ${hb} Einträge der ${h.a('gdb-tabelle', 'GdB-Tabelle')} auf dieser Seite eine Heilungsbewährung.</p>
<!--mini:steuer-->
<h2>Was sich 2025 geändert hat</h2>
<p>Seit dem ${h.date(h.P.versmedv.in_kraft)} stehen die allgemeinen Regeln zur Heilungsbewährung in Teil A Nummer 2 (${h.src('bgbl2025', 'Sechste Änderungsverordnung')}). Neu gefasst ist vor allem die Begründung: Der GdB wird „in Anbetracht der Ungewissheit über den künftigen Verlauf pauschal höher bewertet“, und die damit verbundene Teilhabebeeinträchtigung muss nicht im Einzelnen nachgewiesen werden. Klar geregelt ist auch, dass eine adjuvante Therapie den Beginn nicht verschiebt und dass ein Rückfall mit kurativer Behandlung eine neue Heilungsbewährung auslöst. Die Werte in Teil B für die einzelnen Organe blieben unverändert.</p>
<h2>Nach der Heilungsbewährung</h2>
<p>Die Neubewertung ist eine Herabsetzung wegen wesentlicher Änderung der Verhältnisse nach ${h.src('sgb10_48', '§ 48 SGB X')}. Die Behörde hört Sie vorher an. Das ist der Moment, Befunde über alle bleibenden Folgen einzureichen: Narbenbeschwerden, Bewegungseinschränkung der Schulter, Lymphödem, Polyneuropathie nach Chemotherapie, Fatigue, Angst und Depression, Inkontinenz oder Erektionsstörung nach Prostataoperation. Jede dieser Folgen ist ein eigenes Leiden mit eigenem Wert, und zusammen können sie den GdB über 50 halten. Der ${h.a('home', 'Gesamt-GdB-Rechner')} zeigt, wie die Werte nach der Verordnung zusammenwirken.</p>
<p>Sinkt der GdB unter 50, gelten die Regeln für schwerbehinderte Menschen noch bis zum Ende des dritten Kalendermonats nach Unanfechtbarkeit des Bescheids (${h.src('sgb9_199', '§ 199 SGB IX')}); bis dahin gelten Zusatzurlaub und Kündigungsschutz weiter. Wer zu diesem Zeitpunkt schon eine Altersrente für schwerbehinderte Menschen bezieht, behält sie. Gegen die Herabsetzung ist ein ${h.a('widerspruch-gdb', 'Widerspruch')} innerhalb eines Monats möglich.</p>
<h2>Drei Verläufe</h2>
<p>Eine 52-jährige Angestellte wird an Brustkrebs im Stadium T1 ohne Lymphknotenbefall operiert und anschließend bestrahlt. Für die fünf Jahre der Heilungsbewährung beträgt ihr GdB ${brust[0].von}, gerechnet ab der Operation; die Bestrahlung verschiebt den Beginn nicht. Sie hat damit Anspruch auf Zusatzurlaub, den Pauschbetrag und den besonderen Kündigungsschutz. Nach fünf Jahren ohne Rückfall bleibt ein leichtes Lymphödem des Arms; die Behörde bewertet nun nur noch diese Folge.</p>
<p>Ein 64-Jähriger wird wegen eines Prostatakarzinoms im Stadium T2 N0 M0 operiert. Die Heilungsbewährung dauert fünf Jahre mit ${prostata[1].von}. Eine bleibende Harninkontinenz ist ein eigenes Leiden im Bereich der Harnorgane und kann den Wert während und nach der Heilungsbewährung stützen.</p>
<p>Eine 40-Jährige erhält nach einem Darmtumor im Stadium T2 N0 M0 eine Operation ohne künstlichen Ausgang. Für sie gilt die kürzere Heilungsbewährung von zwei Jahren mit ${darm[0].von}. Wäre ein dauerhafter künstlicher After angelegt worden, läge der Wert bei ${darm[1].von} bis ${darm[1].bis}.</p>
<h2>Heilungsbewährung und Altersrente</h2>
<p>Für die Altersrente für schwerbehinderte Menschen muss der GdB von 50 am Tag des Rentenbeginns vorliegen. Endet die Heilungsbewährung vorher und sinkt der Wert unter 50, ist diese Rentenart nicht mehr möglich. Wer kurz vor der Rente steht, sollte deshalb den Zeitpunkt im Blick behalten und rechtzeitig bei der Rentenversicherung klären, welche Rente in Frage kommt. Ob eine andere Altersrente oder eine Erwerbsminderungsrente in Frage kommt, beurteilt die Rentenversicherung; der GdB entscheidet darüber nicht.</p>
<h2>Antrag während der Behandlung</h2>
<p>Der Antrag kann schon während der Primärtherapie gestellt werden, auch vom Krankenhaus aus. Die Behörde stellt den GdB ab dem Tag des Antrags fest; eine Feststellung für frühere Zeiten gibt es nur, wenn Sie ein besonderes Interesse glaubhaft machen, etwa für die Steuer eines abgelaufenen Jahres. Wer berufstätig ist, profitiert von den kurzen Fristen: Ohne Gutachten soll die Behörde innerhalb von ${h.P.verfahren.entscheidung_ohne_gutachten_wochen} Wochen entscheiden. Viele Kliniken und ihre Sozialdienste helfen beim Antrag und reichen die nötigen Berichte direkt mit ein. Wichtig sind der Operationsbericht mit Stadium (TNM), der Entlassungsbericht und der Behandlungsplan. Die Behörde braucht keine Prognose von Ihnen; sie setzt den Wert der Heilungsbewährung nach Stadium und Organ an. Merkzeichen kommen bei Krebs nur in Betracht, wenn ihre eigenen Voraussetzungen erfüllt sind, etwa G, wenn die Gehfähigkeit nicht nur vorübergehend erheblich eingeschränkt ist. Die Einzelheiten stehen bei den Merkzeichen.</p>
`,
  },
});
