import { defineGuide } from '../../lib/guide-types';
import { pauschbetrag, rente } from '../../lib/engine/rechte';
import { steuerwirkung } from '../../lib/engine/steuer';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

/**
 * GdB 50: Schwelle der Schwerbehinderung (§ 2 Abs. 2 SGB IX). Eigene Beispiele: Steuerersparnis bei
 * 35.000 € und 60.000 €, zwei Wege zu GdB 50 aus mehreren Leiden, Rentenalter Jahrgang 1966. Alle Zahlen vom Motor.
 */
const S = P.schwelle;
const eur = (x: number) => formatMoney(x, 0, 'de');
const pb = pauschbetrag(50);
const s35 = steuerwirkung({ zve: 35000, splitting: false, kirche: 0, pauschbetrag: pb, fahrtkosten: 0, weitereAgB: 0, kinder: 0 });
const s60 = steuerwirkung({ zve: 60000, splitting: false, kirche: 0, pauschbetrag: pb, fahrtkosten: 0, weitereAgB: 0, kinder: 0 });
const weg1 = gesamtGdb([{ system: 'beine', gdb: 40 }, { system: 'herz', gdb: 30, beziehung: 'nachteilig' }]);
const weg2 = gesamtGdb([{ system: 'wirbelsaeule', gdb: 30 }, { system: 'psyche', gdb: 30, beziehung: 'unabhaengig' }, { system: 'stoffwechsel', gdb: 20, beziehung: 'unabhaengig' }]);
const r66 = rente(1966)!;

export default defineGuide({
  id: 'gdb-50',
  group: 'stufen',
  order: 250,
  mini: 'stufe',
  miniDefaults: { g: 50 },
  miniHref: 'home',
  related: ['schwerbehindertenausweis-vorteile', 'zusatzurlaub-schwerbehinderung', 'kuendigungsschutz-schwerbehinderung', 'gdb-40', 'gdb-60', 'behinderten-pauschbetrag'],
  sources: ['sgb9_2', 'estg33b', 'sgb9_208', 'sgb9_168', 'sgb6_37', 'versmedv'],
  de: {
    slug: 'gdb-50',
    nav: 'GdB 50',
    card: 'Die Schwelle zur Schwerbehinderung: Ausweis, Pauschbetrag, Zusatzurlaub, Kündigungsschutz, Rente und was GdB 50 nicht bringt.',
    title: 'GdB 50 Vorteile 2026: Ausweis, Pauschbetrag, Urlaub',
    description: `GdB 50 Vorteile 2026: Schwerbehindertenausweis, Pauschbetrag ${eur(pb)}, 5 Tage Urlaub, Kündigungsschutz, Rente mit 65 ohne Abschlag. Was ohne Merkzeichen fehlt.`,
    h1: 'GdB 50: was die Schwerbehinderung bringt',
    intro: 'Mit GdB 50 beginnt die Schwerbehinderung. Hier steht jeder Vorteil mit Betrag und Paragraph, und was erst mit einem Merkzeichen dazukommt.',
    resume: `Ein Grad der Behinderung von ${S.schwerbehinderung} ist die Schwelle, ab der ein Mensch nach § 2 Absatz 2 SGB IX als schwerbehindert gilt. Damit gibt es auf Antrag den Schwerbehindertenausweis, einen Behinderten-Pauschbetrag von ${eur(pb)} im Jahr, ${P.urlaub.tage_bei_5} Arbeitstage bezahlten Zusatzurlaub bei der Fünftagewoche, den besonderen Kündigungsschutz nach ${P.kuendigung.wartezeit_monate} Monaten im Betrieb und die Altersrente für schwerbehinderte Menschen: für Jahrgänge ab 1964 ohne Abschlag mit 65, frühestens mit 62, wenn ${P.rente.wartezeit_jahre} Versicherungsjahre erfüllt sind. Der Pauschbetrag spart bei ${eur(35000)} zu versteuerndem Einkommen rund ${eur(s35.ersparnis)} Steuern im Jahr, bei ${eur(60000)} rund ${eur(s60.ersparnis)}. Nicht dabei sind ohne Merkzeichen die Freifahrt im Nahverkehr, die Kfz-Steuerermäßigung, der Parkausweis und die Fahrtkostenpauschale, die erst ab GdB ${P.fahrtkosten.gdb_klein_mit_g} mit G oder ab GdB ${P.fahrtkosten.gdb_klein} gilt. GdB 50 entsteht oft aus mehreren Leiden: Ein Beinleiden mit 40 und ein Herzleiden mit 30, die sich verstärken, ergeben nach der Verordnung meist ${weg1.richt}.`,
    faqs: [
      { q: 'Lohnt sich der Antrag auf GdB 50 überhaupt?', a: `Für Berufstätige meist ja: Zusatzurlaub, Kündigungsschutz und Pauschbetrag wirken sofort, die frühere Rente später. Wer selbstständig ist oder schon in Rente, hat vor allem den Pauschbetrag von ${eur(pb)} im Jahr. Der Arbeitgeber erfährt den GdB nicht von der Behörde, sondern nur, wenn Sie ihn mitteilen oder Rechte daraus geltend machen.` },
      { q: 'Muss ich dem Arbeitgeber den GdB 50 mitteilen?', a: 'Nein, eine Pflicht gibt es nicht. Ohne Mitteilung kann der Arbeitgeber aber keinen Zusatzurlaub gewähren, und für den Kündigungsschutz muss die Schwerbehinderung bei der Kündigung festgestellt oder rechtzeitig beantragt sein. Wer gekündigt wird, ohne dass der Arbeitgeber davon weiß, sollte ihn sofort informieren; die Gerichte verlangen eine Mitteilung innerhalb kurzer Frist.' },
      { q: 'Wie oft kommt man mit mehreren Leiden auf GdB 50?', a: `Häufig, aber nicht durch Addition. Drei Leiden mit 30, 30 und 20, die verschiedene Lebensbereiche betreffen, ergeben nach diesem Rechner ${weg2.min} bis ${weg2.max}, Richtwert ${weg2.richt}. Für die 50 braucht es meist ein Leiden mit mindestens 40 und ein zweites, das die Gesamtbeeinträchtigung deutlich verstärkt. Ein dritter Wert von 20 hebt nach Teil A Nummer 3.5 vielfach nicht weiter an.` },
      { q: 'Bekomme ich mit GdB 50 den Ausweis unbefristet?', a: `In der Regel nicht. Nach § 6 der Schwerbehindertenausweisverordnung wird der Ausweis meist auf höchstens ${P.ausweis.befristung_jahre} Jahre befristet und kann verlängert werden. Unbefristet gibt es ihn, wenn keine wesentliche Änderung zu erwarten ist. Bei Krebs setzt die Behörde oft eine Heilungsbewährung von fünf Jahren an; danach prüft sie neu und senkt den GdB häufig ab.` },
      { q: 'Wann kann ich mit GdB 50 in Rente gehen?', a: `Wer 1966 geboren ist, kann die Altersrente für schwerbehinderte Menschen ohne Abschlag mit ${r66.ohneJ} beziehen und frühestens mit ${r66.fruehJ}, dann mit bis zu ${(r66.abschlagMax * 100).toLocaleString('de-DE', { maximumFractionDigits: 1 })} Prozent Abschlag. Voraussetzung sind ${P.rente.wartezeit_jahre} Versicherungsjahre und der GdB 50 am Tag des Rentenbeginns. Sinkt der GdB vor Rentenbeginn unter 50, entfällt diese Rentenart.` },
    ],
    body: (h) => `
<h2>Alle Vorteile mit GdB 50</h2>
${h.table(['Vorteil', 'Umfang 2026', 'Rechtsgrundlage'], [
  ['Schwerbehindertenausweis', 'auf Antrag, meist befristet', '§ 152 Abs. 5 SGB IX'],
  ['Behinderten-Pauschbetrag', `${h.eur(pb)} im Jahr`, '§ 33b Abs. 3 EStG'],
  ['Zusatzurlaub', `${P.urlaub.tage_bei_5} Arbeitstage bei 5-Tage-Woche`, '§ 208 SGB IX'],
  ['Besonderer Kündigungsschutz', `nach ${P.kuendigung.wartezeit_monate} Monaten`, '§§ 168, 173 SGB IX'],
  ['Freistellung von Mehrarbeit', 'auf Verlangen', '§ 207 SGB IX'],
  ['Altersrente', '65 ohne, 62 mit Abschlag (ab Jahrgang 1964)', '§ 37 SGB VI'],
  ['Freifahrt, Kfz-Steuer, Parkausweis', 'nur mit Merkzeichen', '§ 228 SGB IX, § 3a KraftStG'],
], 'Rechte bei GdB 50 ohne Merkzeichen', ['l', 'l', 'l'])}
<p>Wie viel der Pauschbetrag wert ist, hängt vom Steuersatz ab: Er mindert das zu versteuernde Einkommen, nicht die Steuer. Bei einem Grenzsteuersatz von rund ${h.pct(s35.grenzsteuersatz)} bringt er etwa ${h.eur(s35.ersparnis)}; wer kaum Steuern zahlt, spart nichts. Den genauen Wert mit Splitting und Kirchensteuer zeigt der ${h.a('behinderten-pauschbetrag', 'Pauschbetrag-Rechner')}.</p>
<!--mini:steuer-->
<h2>Im Beruf</h2>
<p>Der ${h.a('zusatzurlaub-schwerbehinderung', 'Zusatzurlaub')} kommt zum vertraglichen Urlaub hinzu und richtet sich nach der Zahl Ihrer Arbeitstage: Bei vier Tagen in der Woche sind es vier, bei sechs Tagen sechs. Wird die Schwerbehinderung im Laufe des Jahres festgestellt, gibt es für jeden vollen Monat ein Zwölftel. Der ${h.a('kuendigungsschutz-schwerbehinderung', 'Kündigungsschutz')} bedeutet nicht, dass niemand kündigen darf: Das Integrationsamt muss vorher zustimmen und prüft, ob die Kündigung mit der Behinderung zusammenhängt. Bei Betriebsschließung stimmt es fast immer zu.</p>
<p>Arbeitgeber mit mindestens ${P.beschaeftigung.pflicht_ab_plaetze} Arbeitsplätzen müssen ${h.pct(P.beschaeftigung.quote)} davon mit schwerbehinderten Menschen besetzen oder eine Ausgleichsabgabe zahlen. Ihre Einstellung senkt diese Abgabe.</p>
<h2>Was ohne Merkzeichen fehlt</h2>
<p>Viele Vorteile, die man mit dem Ausweis verbindet, hängen an ${h.a('merkzeichen', 'Merkzeichen')}: Die Freifahrt im Nahverkehr gibt es mit ${h.a('merkzeichen-g', 'Merkzeichen G')}, aG, H, Bl oder Gl gegen eine Wertmarke von ${h.eur(P.wertmarke.jahr)} im Jahr. Den Parkausweis für Behindertenparkplätze gibt es mit aG oder Bl. Die Kfz-Steuer entfällt mit H, Bl oder aG. Merkzeichen beantragen Sie mit demselben Formular wie den GdB; die Behörde prüft sie nach eigenen Voraussetzungen.</p>
<h2>Wenn der GdB knapp unter 50 liegt</h2>
<p>Bei ${h.a('gdb-40', 'GdB 40')} oder 30 können Sie bei der Agentur für Arbeit die ${h.a('gleichstellung', 'Gleichstellung')} beantragen; sie bringt den Kündigungsschutz, aber keinen Zusatzurlaub und keinen Ausweis. Hat sich ein Leiden verschlechtert oder ist ein neues hinzugekommen, ist ein ${h.a('verschlimmerungsantrag', 'Verschlimmerungsantrag')} der Weg. Gegen einen frischen Bescheid legen Sie ${h.a('widerspruch-gdb', 'Widerspruch')} ein, innerhalb eines Monats. In der Begründung des Bescheids stehen die Einzelwerte; mit dem ${h.a('home', 'Gesamt-GdB-Rechner')} sehen Sie, ob die 50 nach dem Wortlaut der Verordnung in Reichweite liegt.</p>
<h2>Vom Antrag zum Ausweis</h2>
<p>Den Antrag stellen Sie bei der Behörde Ihres Landes, in vielen Ländern online; welche zuständig ist, steht unter ${h.a('schwerbehindertenausweis-beantragen', 'Schwerbehindertenausweis beantragen')}. Sie nennen alle Gesundheitsstörungen, die behandelnden Ärzte und Kliniken und entbinden sie von der Schweigepflicht, damit die Behörde Befundberichte anfordern kann. Eigene, aktuelle Berichte beschleunigen das Verfahren, besonders wenn sie die Folgen im Alltag beschreiben: wie weit Sie gehen können, wie oft Sie ausfallen, welche Hilfe Sie brauchen. Eine Diagnose allein bestimmt den GdB nicht.</p>
<p>Für Berufstätige gelten kurze Fristen: Ohne Gutachten soll die Behörde innerhalb von ${P.verfahren.entscheidung_ohne_gutachten_wochen} Wochen entscheiden (§ 152 Abs. 1 SGB IX mit § 14 Abs. 2). In der Praxis dauert es oft mehrere Monate. Der GdB gilt ab dem Tag des Antrags, auf begründeten Wunsch auch früher. Das ist für den Kündigungsschutz wichtig: Wer den Antrag rechtzeitig vor einer Kündigung gestellt hat, ist auch dann geschützt, wenn der Bescheid erst danach kommt.</p>
<p>Mit dem Bescheid kommt der Ausweis, wenn Sie ihn beantragt haben, und seit 2026 die Mitteilung an das Finanzamt, sofern Sie Ihre Steuer-Identifikationsnummer angegeben haben. Der Pauschbetrag gilt dann für das ganze Kalenderjahr, auch wenn der GdB erst im Herbst festgestellt wird. Der Zusatzurlaub dagegen wird für ein angebrochenes Jahr nur anteilig gewährt, mit einem Zwölftel für jeden vollen Monat, in dem die Schwerbehinderung bestand. Rechnen Sie ihn mit dem Zusatzurlaub-Rechner nach, bevor Sie ihn beim Arbeitgeber beantragen.</p>
<p>Wichtig für die Begründung: Nach Teil A Nummer 3.4 vergleicht die Behörde den Gesamtwert mit Leiden aus Teil B, für die ein fester Wert gilt. Mit 50 bewertet Teil B zum Beispiel den Verlust eines Beines im Unterschenkel bei guter Funktion des Stumpfes. Ein Widerspruch hat deshalb mehr Aussicht, wenn er zeigt, wie stark die Leiden im Alltag zusammenwirken, als wenn er Einzelwerte addiert.</p>
`,
  },
});
