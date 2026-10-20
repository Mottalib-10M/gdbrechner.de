import { defineGuide } from '../../lib/guide-types';
import { zusatzurlaub, zusatzurlaubAnteilig } from '../../lib/engine/rechte';
import { P } from '../../lib/engine/params';
import { formatNumber } from '../../lib/format';

/**
 * Zusatzurlaub nach § 208 SGB IX. Eigene Beispiele: Vier-, Drei- und Sechstagewoche, Feststellung ab März, Mai
 * und Juli mit der Zwölftelung und Rundung nach Abs. 2. Alle Zahlen vom Motor.
 */
const S = P.schwelle;
const U = P.urlaub;
const n = (x: number) => formatNumber(x, Number.isInteger(x) ? 0 : 2, 'de');
const t4 = zusatzurlaub(S.schwerbehinderung, 4);
const t3 = zusatzurlaub(S.schwerbehinderung, 3);
const t6 = zusatzurlaub(S.schwerbehinderung, 6);
const t5 = zusatzurlaub(S.schwerbehinderung, 5);
const maerz = zusatzurlaubAnteilig(t5, 10);
const mai = zusatzurlaubAnteilig(t5, 8);
const juli = zusatzurlaubAnteilig(t5, 6);
const mai4 = zusatzurlaubAnteilig(t4, 8);

export default defineGuide({
  id: 'zusatzurlaub-schwerbehinderung',
  group: 'rechner',
  order: 130,
  tool: 'zusatzurlaub',
  related: ['gdb-50', 'kuendigungsschutz-schwerbehinderung', 'gleichstellung', 'schwerbehindertenausweis-vorteile', 'home'],
  sources: ['sgb9_208', 'sgb9_151', 'sgb9_2'],
  de: {
    slug: 'zusatzurlaub-schwerbehinderung',
    nav: 'Zusatzurlaub-Rechner',
    card: 'Wie viele Tage Zusatzurlaub bei Schwerbehinderung: nach Arbeitstagen je Woche und anteilig im Jahr der Feststellung.',
    title: 'Zusatzurlaub Schwerbehinderung 2026: Rechner nach § 208',
    description: `Zusatzurlaub bei Schwerbehinderung 2026: ${U.tage_bei_5} Tage bei Fünftagewoche, anteilig bei Teilzeit und im ersten Jahr. Der Rechner zeigt den Anspruch nach § 208 SGB IX.`,
    h1: 'Zusatzurlaub bei Schwerbehinderung berechnen',
    intro: 'Arbeitstage je Woche und den Monat der Feststellung eingeben: Der Rechner nennt Ihren Zusatzurlaub nach § 208 SGB IX für dieses Jahr.',
    resume: `Schwerbehinderte Beschäftigte mit einem GdB von mindestens ${S.schwerbehinderung} haben nach § 208 Absatz 1 SGB IX Anspruch auf einen bezahlten Zusatzurlaub von ${U.tage_bei_5} Arbeitstagen im Jahr, wenn sie an fünf Tagen in der Woche arbeiten. Arbeiten sie an mehr oder weniger Tagen, erhöht oder vermindert er sich entsprechend: bei vier Tagen ${n(t4)}, bei drei Tagen ${n(t3)}, bei sechs Tagen ${n(t6)}. Der Zusatzurlaub kommt zum gesetzlichen, vertraglichen oder tariflichen Urlaub hinzu und ist unabhängig von der Höhe des GdB. Besteht die Schwerbehinderung nicht das ganze Jahr, gibt es nach Absatz 2 für jeden vollen Monat ein Zwölftel; Bruchteile von mindestens einem halben Tag werden aufgerundet. Wer ab März schwerbehindert ist, erhält bei der Fünftagewoche ${n(maerz)} Tage, ab Mai ${n(mai)}, ab Juli ${n(juli)}. Gleichgestellte Menschen mit GdB ${S.gleichstellung} oder 40 haben nach § 151 Absatz 3 keinen Anspruch. Wird die Schwerbehinderung rückwirkend festgestellt, richtet sich die Übertragung ins Folgejahr nach den Urlaubsregeln des Arbeitsverhältnisses.`,
    faqs: [
      { q: 'Ab wann zählt der Zusatzurlaub, wenn der Bescheid später kommt?', a: 'Maßgeblich ist der Zeitpunkt, ab dem die Schwerbehinderung festgestellt ist, in der Regel der Tag des Antrags, nicht das Datum des Bescheids. Kommt der Bescheid im Herbst und gilt ab Februar, haben Sie Anspruch für die vollen Monate ab Februar. Für Vorjahre regelt § 208 Abs. 3 SGB IX die Übertragung: Es gelten die Regeln Ihres Arbeitsverhältnisses für den Urlaub.' },
      { q: 'Wie viel Zusatzurlaub gibt es bei Teilzeit?', a: `Es kommt auf die Zahl der Arbeitstage an, nicht auf die Stunden. Wer an vier Tagen arbeitet, erhält ${n(t4)} Tage, wer an drei Tagen arbeitet, ${n(t3)}. Wer fünf Tage mit verkürzter Stundenzahl arbeitet, erhält die vollen ${U.tage_bei_5} Tage, jeder Urlaubstag ist dann eben kürzer. Bei wechselnden Arbeitstagen rechnen Sie mit dem Durchschnitt je Woche.` },
      { q: 'Verfällt der Zusatzurlaub am Jahresende?', a: 'Er folgt den Regeln, die für Ihren übrigen Urlaub gelten, also dem Bundesurlaubsgesetz und Ihrem Arbeits- oder Tarifvertrag. Nehmen Sie ihn deshalb im laufenden Jahr oder in dem Übertragungszeitraum, den Ihr Vertrag vorsieht. Beantragen Sie ihn beim Arbeitgeber wie normalen Urlaub und legen Sie den Bescheid oder den Ausweis vor, wenn der Arbeitgeber von der Schwerbehinderung noch nichts weiß.' },
      { q: 'Bekommen Beschäftigte mit GdB 100 mehr Zusatzurlaub?', a: `Nein. § 208 SGB IX unterscheidet nicht nach der Höhe des GdB: Ab ${S.schwerbehinderung} gilt derselbe Anspruch, ob 50, 80 oder 100. Ein Tarifvertrag oder eine Betriebsvereinbarung kann mehr vorsehen, etwa zusätzliche Tage für höhere GdB; das prüfen Sie in Ihren Unterlagen. Der Rechner bildet nur den gesetzlichen Anspruch ab.` },
    ],
    body: (h) => `
<h2>So rechnet der Rechner</h2>
<p>Zuerst der Jahresanspruch: ${U.tage_bei_5} Tage mal Ihre Arbeitstage je Woche, geteilt durch fünf. Dann der Anteil, wenn die Schwerbehinderung erst im Laufe des Jahres beginnt: ein Zwölftel je vollem Monat. Zuletzt die Rundung nach § 208 Absatz 2 SGB IX: Ein Bruchteil, der mindestens einen halben Tag ergibt, wird auf einen vollen Tag aufgerundet. Kleinere Bruchteile rundet das Gesetz nicht auf; der Rechner weist sie als Bruchteil aus. Bei GdB unter ${S.schwerbehinderung} zeigt er null, auch mit Gleichstellung.</p>
${h.table(['Fall', 'Rechnung', 'Zusatzurlaub'], [
  ['Fünftagewoche, ganzes Jahr', `${U.tage_bei_5} × 5 ÷ 5`, `${n(t5)} Tage`],
  ['Viertagewoche, ganzes Jahr', `${U.tage_bei_5} × 4 ÷ 5`, `${n(t4)} Tage`],
  ['Fünftagewoche, ab März', `${n(t5)} × 10 ÷ 12`, `${n(maerz)} Tage`],
  ['Fünftagewoche, ab Mai', `${n(t5)} × 8 ÷ 12`, `${n(mai)} Tage`],
  ['Fünftagewoche, ab Juli', `${n(t5)} × 6 ÷ 12, aufgerundet`, `${n(juli)} Tage`],
  ['Viertagewoche, ab Mai', `${n(t4)} × 8 ÷ 12, aufgerundet`, `${n(mai4)} Tage`],
], 'Beispiele nach § 208 SGB IX', ['l', 'l', 'r'])}
<h2>Wer Anspruch hat</h2>
<p>Den Zusatzurlaub erhalten Arbeitnehmerinnen und Arbeitnehmer, Auszubildende und andere Beschäftigte, deren GdB mindestens ${S.schwerbehinderung} beträgt. Er setzt keinen Ausweis voraus, der Bescheid genügt. Menschen, die bei GdB ${S.gleichstellung} oder 40 von der Agentur für Arbeit ${h.a('gleichstellung', 'gleichgestellt')} sind, haben keinen Anspruch: § 151 Absatz 3 SGB IX nimmt § 208 ausdrücklich aus. Der Zusatzurlaub ist bezahlter Urlaub und wird wie der übrige Urlaub vergütet. Für den Arbeitgeber gilt er auch dann, wenn der Arbeitsvertrag mehr Urlaub gewährt als das Gesetz: Er kommt obendrauf.</p>
<h2>Was Sie dem Arbeitgeber vorlegen</h2>
<p>Damit der Arbeitgeber den Zusatzurlaub gewährt, muss er von der Schwerbehinderung wissen. Legen Sie den Bescheid des Versorgungsamts oder den Ausweis vor. Wann Sie das tun, entscheiden Sie selbst; eine Pflicht zur Mitteilung besteht nicht. Wer den Bescheid erst später vorlegt, verliert den Anspruch für das laufende Jahr nicht, muss den Urlaub aber noch nehmen können. Weitere Rechte im Beruf, etwa den ${h.a('kuendigungsschutz-schwerbehinderung', 'besonderen Kündigungsschutz')} und die Freistellung von Mehrarbeit nach § 207 SGB IX, finden Sie bei ${h.a('gdb-50', 'GdB 50')}.</p>
`,
  },
});
