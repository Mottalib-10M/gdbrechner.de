import { defineGuide } from '../../lib/guide-types';
import { EINTRAEGE, eintrag } from '../../lib/engine/tabelle';
import { SYSTEME } from '../../data/systeme';

/**
 * GdB-Tabelle: durchsuchbare Auswahl aus Teil B der Versorgungsmedizinischen Grundsätze (src/data/tabelle.json).
 * Beispiele aus der Tabelle selbst (Wirbelsäule, Diabetes, Depression), keine Zahl von Hand.
 */
const ws = eintrag('wirbelsaeulenschaeden')!;
const dm = eintrag('diabetes')!;
const ps = eintrag('depression')!;
const tep = eintrag('knie-endoprothese')!;
const hb = EINTRAEGE.filter((e) => e.heilungsbewaehrung).length;
const span = (s: { von: number; bis: number }) => (s.von === s.bis ? `${s.von}` : `${s.von} bis ${s.bis}`);

export default defineGuide({
  id: 'gdb-tabelle',
  group: 'rechner',
  order: 110,
  tool: 'tabelle',
  related: ['home', 'gdb-wirbelsaeule', 'gdb-diabetes', 'gdb-depression', 'gdb-krebs', 'widerspruch-gdb'],
  sources: ['versmedv', 'bgbl2025', 'sgb9_152'],
  de: {
    slug: 'gdb-tabelle',
    nav: 'GdB-Tabelle',
    card: `${EINTRAEGE.length} Einträge aus Teil B der Versorgungsmedizin-Verordnung durchsuchen, Werte übernehmen und den Gesamt-GdB schätzen.`,
    title: 'GdB-Tabelle 2026: Grad der Behinderung nach Erkrankung',
    description: `GdB-Tabelle 2026 nach Teil B der Versorgungsmedizin-Verordnung: ${EINTRAEGE.length} Erkrankungen mit Anhaltswerten durchsuchen, Werte wählen, Gesamt-GdB direkt schätzen.`,
    h1: 'GdB-Tabelle: Grad der Behinderung nach Erkrankung',
    intro: 'Erkrankung suchen, passende Beschreibung wählen: Der Rechner übernimmt den Wert und zeigt den Gesamt-GdB Ihrer Auswahl.',
    resume: `Die „GdB-Tabelle“ ist Teil B der Versorgungsmedizinischen Grundsätze, der Anlage zur Versorgungsmedizin-Verordnung. Sie nennt für Gesundheitsstörungen in ${SYSTEME.length} Bereichen Anhaltswerte nach der Schwere der Funktionseinschränkung, nicht nach der Diagnose. Ein Wirbelsäulenschaden mit mittelgradigen Auswirkungen in einem Abschnitt hat ${span(ws.stufen[2])}, mit schweren Auswirkungen ${span(ws.stufen[3])}; ein Diabetes, dessen Therapie Unterzuckerungen auslösen kann und der tägliche Messungen erfordert, ${span(dm.stufen[2])}; eine stärker behindernde psychische Störung ${span(ps.stufen[1])}. Diese Seite enthält eine Auswahl von ${EINTRAEGE.length} häufigen Einträgen mit gekürztem Wortlaut. Die Werte sind „Anhaltswerte“: Die Behörde kann innerhalb der Spannen und mit Begründung auch darüber hinaus abweichen. Bei ${hb} Einträgen, meist Krebserkrankungen, gilt eine Heilungsbewährung; der Wert ist dann für einige Jahre höher und wird danach überprüft. Mehrere Werte werden nie addiert; den Gesamt-GdB bildet die Behörde nach Teil A Nummer 3.`,
    faqs: [
      { q: 'Ist die GdB-Tabelle verbindlich?', a: 'Sie ist Teil einer Rechtsverordnung und bindet die Behörden und Gerichte. Die Werte sind aber Anhaltswerte mit Beurteilungsspannen, und eine Abweichung ist möglich, wenn sie begründet wird. Für Leiden, die nicht in der Tabelle stehen, wird der Wert in Analogie zu vergleichbaren Gesundheitsstörungen gebildet. Maßgeblich ist immer die vollständige Fassung auf gesetze-im-internet.de, nicht diese Auswahl.' },
      { q: 'Wie viel Prozent Behinderung sind ein GdB von 50?', a: 'Keine. Umgangssprachlich heißt es oft „50 Prozent behindert“, doch der GdB ist kein Prozentwert. Nach Teil A Nummer 1.1 der Verordnung gibt er die nach Zehnergraden von 10 bis 100 abgestufte Beeinträchtigung der Teilhabe wieder, unabhängig von der Ursache. Er sagt nichts über die Erwerbsfähigkeit oder darüber, wie viel Prozent der Arbeitskraft fehlt; ein GdB von 50 bedeutet die Grenze zur Schwerbehinderung, nicht die halbe Leistungsfähigkeit.' },
      { q: 'Warum steht bei manchen Einträgen eine Spanne wie 30 bis 40?', a: 'Weil die Schwere innerhalb einer Beschreibung unterschiedlich sein kann. Die Behörde wählt den Wert nach den Befunden: wie oft Beschwerden auftreten, wie lange sie dauern, welche Therapie nötig ist und wie sehr sie den Alltag einschränken. Eine Spanne bedeutet nicht, dass der höhere Wert zusteht. Im Rechner können Sie beide Enden übernehmen und vergleichen.' },
      { q: `Warum hat eine Knie-Endoprothese nur GdB ${tep.stufen[0].von}?`, a: `Weil Teil B für Endoprothesen Mindestwerte bei bestmöglichem Ergebnis nennt: einseitig am Knie mindestens ${tep.stufen[0].von}, beidseitig mindestens ${tep.stufen[1].von}. Ist die Beweglichkeit eingeschränkt, das Gelenk instabil oder das Ergebnis aus anderen Gründen schlechter, sind höhere Werte angemessen. Entscheidend sind die Befunde nach der Rehabilitation, nicht die Operation selbst.` },
    ],
    body: (h) => `
<h2>Wie die Tabelle zu lesen ist</h2>
<p>Jeder Eintrag beschreibt Stufen der Funktionseinschränkung. Gesucht wird die Beschreibung, die zu den ärztlichen Befunden passt; der Wert dahinter ist der Einzel-GdB dieses Leidens. Mehrere Leiden im selben Bereich, etwa Hals- und Lendenwirbelsäule, fasst die Behörde zuerst zu einem Wert für diesen Bereich zusammen. Die Werte verschiedener Bereiche werden dann nach Teil A Nummer 3 zum Gesamt-GdB verbunden, ohne Addition. Das macht der ${h.a('home', 'Gesamt-GdB-Rechner')}; aus dieser Tabelle heraus übernehmen Sie Ihre Auswahl mit einem Klick.</p>
${h.table(['Erkrankung', 'Beschreibung', 'GdB'], [
  ['Wirbelsäule (Nr. 18.9)', ws.stufen[2].text.split(' (')[0], span(ws.stufen[2])],
  ['Wirbelsäule (Nr. 18.9)', ws.stufen[4].text, span(ws.stufen[4])],
  ['Diabetes (Nr. 15.1)', 'Therapie kann Unterzuckerung auslösen, tägliche Messung, weitere Einschnitte', span(dm.stufen[2])],
  ['Psyche (Nr. 3.7)', 'stärker behindernde Störung, z. B. ausgeprägtere Depression', span(ps.stufen[1])],
  ['Knie-Endoprothese (Nr. 18.12)', 'einseitig, bestmögliches Ergebnis', `mindestens ${tep.stufen[0].von}`],
], 'Beispiele aus Teil B, Wortlaut gekürzt', ['l', 'l', 'r'])}
<h2>Was die Tabelle nicht sagt</h2>
<p>Sie sagt nicht, welcher Wert Ihnen zusteht. Ob Ihr Rückenleiden „mittelgradige“ oder „schwere“ Auswirkungen hat, beurteilt der ärztliche Dienst nach Aktenlage oder Untersuchung. Eine Diagnose wie Bandscheibenvorfall ergibt allein keinen GdB; es zählen Bewegungseinschränkung, Häufigkeit und Dauer der Beschwerden und Ausfälle. Werte unter 20 werden für den Bescheid nicht als Gesamt-GdB festgestellt, gehen aber in die Gesamtschau ein. Wo die Verordnung keinen festen Wert nennt, etwa bei Multipler Sklerose, steht im Rechner nur der Hinweis aus dem Text.</p>
<p>Seit dem ${h.date(h.P.versmedv.in_kraft)} gilt die Neufassung von Teil A durch die ${h.src('bgbl2025', 'Sechste Änderungsverordnung')}. Die Tabellen von Teil B blieben dabei unverändert; gestrichen wurde nur dessen allgemeine Nummer 1, und die Regeln zur Heilungsbewährung stehen jetzt in Teil A Nummer 2: in der Regel fünf Jahre, bei bösartigen Neubildungen im Allgemeinen mindestens GdB 50. Die Werte dieser Auswahl stammen aus der ${h.src('versmedv', 'geltenden Fassung')}; Änderungen übernehmen wir, wenn sie verkündet sind.</p>
`,
  },
});
