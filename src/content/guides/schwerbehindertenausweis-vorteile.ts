import { defineGuide } from '../../lib/guide-types';
import { fahrtkosten, pauschbetrag, rechte, zusatzurlaub, type Merkzeichen } from '../../lib/engine/rechte';
import { steuerwirkung } from '../../lib/engine/steuer';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

/**
 * Vorteile des Schwerbehindertenausweises, geordnet nach dem, was sie im Jahr wert sind. Eigene Beispiele:
 * vier Profile (GdB 50; 70 mit G; 90 mit aG; 100 mit H) bei 38.000 € zvE, Steuerwirkung vom Motor.
 */
const eur = (x: number) => formatMoney(x, 0, 'de');
const ZVE = 38000;
const profil = (g: number, mz: Merkzeichen[]) => {
  const pb = pauschbetrag(g, mz);
  const fk = fahrtkosten(g, mz);
  const s = steuerwirkung({ zve: ZVE, splitting: false, kirche: 0, pauschbetrag: pb, fahrtkosten: fk, weitereAgB: 0, kinder: 0 });
  const r = rechte(g, mz);
  const w = (id: string) => r.find((x) => x.id === id)!;
  return { pb, fk, s, frei: w('freifahrt').wert, kfz: w('kfz').wert, park: w('parken').wert };
};
const p50 = profil(50, []);
const p70 = profil(70, ['G']);
const p90 = profil(90, ['aG']);
const p100 = profil(100, ['H']);
const urlaub4 = zusatzurlaub(50, 4);

export default defineGuide({
  id: 'schwerbehindertenausweis-vorteile',
  group: 'ausweis',
  order: 430,
  mini: 'steuer',
  miniDefaults: { g: 60, z: ZVE },
  miniHref: 'behinderten-pauschbetrag',
  related: ['schwerbehindertenausweis', 'merkzeichen', 'behinderten-pauschbetrag', 'zusatzurlaub-schwerbehinderung', 'kuendigungsschutz-schwerbehinderung', 'gdb-50'],
  sources: ['estg33b', 'estg33', 'sgb9_208', 'sgb9_228', 'kraftstg3a', 'sgb6_37'],
  de: {
    slug: 'schwerbehindertenausweis-vorteile',
    nav: 'Vorteile des Ausweises',
    card: 'Was der Ausweis im Jahr wert ist: vier Profile mit Steuerersparnis, Freifahrt, Kfz-Steuer und Parkausweis, dazu die Rechte im Beruf.',
    title: 'Schwerbehindertenausweis Vorteile 2026: was er wert ist',
    description: `Schwerbehindertenausweis Vorteile 2026: Steuerersparnis bei ${eur(ZVE)} Einkommen für vier Profile, Freifahrt, Kfz-Steuer, Parken, Urlaub, Kündigungsschutz.`,
    h1: 'Vorteile des Schwerbehindertenausweises im Überblick',
    intro: 'Welche Vorteile der Ausweis bringt, hängt weniger vom Dokument ab als von GdB und Merkzeichen; vier Beispiele zeigen, was das im Jahr ausmacht.',
    resume: `Der Schwerbehindertenausweis belegt einen GdB von mindestens ${P.schwelle.schwerbehinderung} und die festgestellten Merkzeichen. Allen Inhabern stehen der Behinderten-Pauschbetrag nach § 33b EStG, bei der Fünftagewoche ${P.urlaub.tage_bei_5} Arbeitstage Zusatzurlaub, der besondere Kündigungsschutz nach ${P.kuendigung.wartezeit_monate} Monaten im Betrieb, die Freistellung von Mehrarbeit und unter Voraussetzungen die Altersrente für schwerbehinderte Menschen zu. Alles Weitere hängt an Merkzeichen. Bei ${eur(ZVE)} zu versteuerndem Einkommen spart ein Mensch mit GdB 50 ohne Merkzeichen nach dem Rechner rund ${eur(p50.s.ersparnis)} Steuern im Jahr. Mit GdB 70 und G sind es rund ${eur(p70.s.ersparnis)}, dazu Freifahrt mit Wertmarke für ${eur(P.wertmarke.jahr)} oder die halbe Kfz-Steuer. Mit GdB 90 und aG steigt die Ersparnis auf rund ${eur(p90.s.ersparnis)}, das Auto ist steuerfrei und der EU-Parkausweis kommt hinzu. Mit GdB 100 und H sind es rund ${eur(p100.s.ersparnis)}, die Wertmarke ist kostenlos. Rabatte von Museen, Bädern oder Verkehrsverbünden ohne gesetzliche Grundlage sind freiwillig und von Anbieter zu Anbieter verschieden.`,
    faqs: [
      { q: 'Welche Vorteile bringt der Ausweis ganz ohne Merkzeichen?', a: `Vor allem Rechte im Beruf und bei der Steuer: Pauschbetrag nach dem GdB, ${P.urlaub.tage_bei_5} Tage Zusatzurlaub bei fünf Arbeitstagen, Kündigungsschutz, Freistellung von Mehrarbeit und die Altersrente für schwerbehinderte Menschen. Keine Freifahrt, keine Kfz-Steuerermäßigung, kein Parkausweis. Für Rentner ohne Merkzeichen bleibt deshalb meist nur der Pauschbetrag, bei GdB 50 also ${eur(p50.pb)} weniger zu versteuerndes Einkommen.` },
      { q: 'Gibt es Rabatte mit dem Ausweis, die nicht im Gesetz stehen?', a: 'Ja, manche Museen, Theater, Bäder oder Freizeitparks gewähren Ermäßigungen, teils auch für eine Begleitperson. Ein Anspruch darauf besteht nicht; Höhe und Bedingungen legt jeder Anbieter selbst fest und kann sie jederzeit ändern. Fragen Sie vor dem Besuch nach. Diese Seite listet solche Rabatte nicht auf, weil sie sich nicht verlässlich prüfen lassen.' },
      { q: 'Kann ich auf einzelne Vorteile des Ausweises verzichten?', a: 'Ja. Kein Vorteil wird automatisch gewährt, fast alle setzen einen Antrag oder Ihre Mitteilung voraus. Den Arbeitgeber müssen Sie nicht informieren; ohne Mitteilung gibt es dann aber keinen Zusatzurlaub. Mit G oder Gl müssen Sie ohnehin zwischen Wertmarke und halber Kfz-Steuer wählen. Auch den Pauschbetrag können Sie durch den Nachweis höherer tatsächlicher Kosten nach § 33 EStG ersetzen.' },
      { q: 'Verliere ich die Vorteile, wenn der Ausweis abläuft?', a: 'Die Rechte hängen an der Feststellung durch die Behörde, nicht an der Karte. Der Ausweis dient nach § 152 Absatz 5 SGB IX dem Nachweis. Ist er abgelaufen, fehlt Ihnen dieser Nachweis im Bus, beim Parken oder gegenüber dem Arbeitgeber, auch wenn der GdB weiter gilt. Beantragen Sie die Verlängerung deshalb rechtzeitig; für das Finanzamt zählt seit 2026 die elektronische Mitteilung.' },
      { q: 'Welcher Vorteil ist für Rentner am wichtigsten?', a: `Meist der Pauschbetrag, weil Zusatzurlaub und Kündigungsschutz nach dem Berufsleben wegfallen. Wie viel er spart, hängt von der Steuer ab: Wer nur eine kleine Rente bezieht und kaum Steuern zahlt, spart wenig oder nichts. Hinzu kommen die Vorteile der Merkzeichen, etwa die große Fahrtkostenpauschale von ${eur(P.fahrtkosten.gross)} mit aG, H oder Bl, die Freifahrt und die Kfz-Steuerbefreiung.` },
    ],
    body: (h) => `
<h2>Vier Profile, gerechnet für 2026</h2>
<p>Die folgende Tabelle rechnet für ein zu versteuerndes Einkommen von ${h.eur(ZVE)}, Einzelveranlagung ohne Kirchensteuer, was Pauschbetrag und Fahrtkostenpauschale an Steuer sparen, und zeigt die Verkehrsvorteile. Die Fahrtkostenpauschale zählt nur, soweit sie die zumutbare Belastung von hier ${h.eur(p100.s.zumutbar)} übersteigt.</p>
${h.table(['', 'GdB 50', 'GdB 70 + G', 'GdB 90 + aG', 'GdB 100 + H'], [
  ['Pauschbetrag', h.eur(p50.pb), h.eur(p70.pb), h.eur(p90.pb), h.eur(p100.pb)],
  ['Fahrtkostenpauschale', h.eur(p50.fk), h.eur(p70.fk), h.eur(p90.fk), h.eur(p100.fk)],
  ['Steuerersparnis im Jahr', h.eur(p50.s.ersparnis), h.eur(p70.s.ersparnis), h.eur(p90.s.ersparnis), h.eur(p100.s.ersparnis)],
  ['Freifahrt im Nahverkehr', p50.frei, p70.frei, p90.frei, p100.frei],
  ['Kraftfahrzeugsteuer', p50.kfz, p70.kfz, p90.kfz, p100.kfz],
  ['EU-Parkausweis', p50.park, p70.park, p90.park, p100.park],
], `Vorteile bei ${h.eur(ZVE)} zu versteuerndem Einkommen, Tarif 2026`, ['l', 'r', 'r', 'r', 'r'])}
<p>Die Zahlen zeigen zwei Sprünge. Der erste liegt bei der Fahrtkostenpauschale: Sie gibt es nach ${h.src('estg33', '§ 33 Abs. 2a EStG')} erst ab GdB ${P.fahrtkosten.gdb_klein_mit_g} mit G oder ab GdB ${P.fahrtkosten.gdb_klein}, und die große Pauschale von ${h.eur(P.fahrtkosten.gross)} nur mit aG, Bl, TBl oder H. Der zweite liegt beim Pauschbetrag: Mit H, Bl oder TBl ersetzt der erhöhte Betrag von ${h.eur(P.pauschbetrag.erhoeht)} den Betrag nach dem GdB (${h.src('estg33b', '§ 33b EStG')}). Für Ihr eigenes Einkommen rechnet der kleine Rechner auf dieser Seite.</p>
<h2>Rechte im Beruf</h2>
<p>Wer arbeitet, profitiert von Rechten, die sich nicht in Euro ausdrücken lassen. Der Zusatzurlaub nach ${h.src('sgb9_208', '§ 208 SGB IX')} beträgt ${P.urlaub.tage_bei_5} Arbeitstage bei fünf Arbeitstagen in der Woche und verändert sich mit der Zahl der Arbeitstage, bei vier Tagen sind es ${urlaub4}. Der ${h.a('kuendigungsschutz-schwerbehinderung', 'besondere Kündigungsschutz')} verlangt vor jeder Kündigung die Zustimmung des Integrationsamts, sobald das Arbeitsverhältnis länger als ${P.kuendigung.wartezeit_monate} Monate besteht. Auf Verlangen werden Sie von Mehrarbeit freigestellt (§ 207 SGB IX). Arbeitgeber ab ${P.beschaeftigung.pflicht_ab_plaetze} Arbeitsplätzen erfüllen mit Ihrer Beschäftigung ihre Pflichtquote; das kann bei Bewerbungen ein Argument sein. Den Zusatzurlaub für Teilzeit und angebrochene Jahre rechnet der ${h.a('zusatzurlaub-schwerbehinderung', 'Zusatzurlaub-Rechner')}.</p>
<h2>Mobilität: Freifahrt, Auto, Parken</h2>
<p>Die Verkehrsvorteile hängen vollständig an Merkzeichen. Mit G, aG, H, Bl, TBl oder Gl erhalten Sie einen Ausweis mit orangefarbenem Aufdruck und fahren mit Wertmarke im Nahverkehr frei (${h.src('sgb9_228', '§ 228 SGB IX')}); die Marke kostet ${h.eur(P.wertmarke.jahr)} im Jahr oder ${h.eur(P.wertmarke.halbjahr)} im Halbjahr, mit H oder Bl nichts. Die Kraftfahrzeugsteuer entfällt mit H, Bl oder aG und halbiert sich mit G oder Gl, wenn Sie keine Wertmarke nutzen (${h.src('kraftstg3a', '§ 3a KraftStG')}). Den EU-Parkausweis für Behindertenparkplätze gibt es mit aG oder Bl und für einige gleichgestellte Gruppen. Mit B fährt eine Begleitperson kostenlos mit, auch im Fernverkehr. Die Einzelheiten stehen bei den ${h.a('merkzeichen', 'Merkzeichen')}.</p>
<h2>Rente, Rundfunk und weitere Vorteile</h2>
<p>Für die Altersrente für schwerbehinderte Menschen müssen am Tag des Rentenbeginns ein GdB von mindestens ${P.schwelle.schwerbehinderung} und ${P.rente.wartezeit_jahre} Versicherungsjahre vorliegen (${h.src('sgb6_37', '§ 37 SGB VI')}); das genaue Alter nach Jahrgang rechnet der Rechner gleich unter diesem Absatz.</p>
<!--mini:rente-->
<p>Mit Merkzeichen RF zahlen Sie auf Antrag ${h.eur(P.rundfunk.ermaessigt, 2)} statt ${h.eur(P.rundfunk.voll, 2)} Rundfunkbeitrag im Monat. Daneben gibt es Vorteile außerhalb des Bundesrechts, etwa das Blindengeld der Länder oder Ermäßigungen kommunaler Einrichtungen, die je nach Ort verschieden sind.</p>
<h2>Vorteile schon unter GdB 50</h2>
<p>Einige Vorteile setzen den Ausweis gar nicht voraus. Den Behinderten-Pauschbetrag gibt es ab GdB ${P.schwelle.min_gdb}, nachgewiesen durch den Bescheid oder die elektronische Mitteilung an das Finanzamt. Mit GdB ${P.schwelle.gleichstellung} oder 40 kann die Agentur für Arbeit Sie schwerbehinderten Menschen gleichstellen; dann gilt der Kündigungsschutz, nicht aber Zusatzurlaub, Freifahrt oder die besondere Altersrente. Wer knapp unter ${P.schwelle.schwerbehinderung} liegt, findet auf den Seiten ${h.a('gdb-40', 'GdB 40')} und ${h.a('gleichstellung', 'Gleichstellung')}, was sich schon jetzt nutzen lässt.</p>
<h2>Was der Ausweis nicht bringt</h2>
<p>Der Ausweis ist kein Anspruch auf Geldleistungen. Er bringt weder Rente wegen Erwerbsminderung noch Pflegegeld, und er sagt nichts darüber, wie viele Stunden Sie arbeiten können; diese Fragen prüfen Rentenversicherung und Pflegekasse nach eigenen Regeln. Auch der Pauschbetrag ist kein Geld, das ausgezahlt wird, sondern ein Betrag, der das zu versteuernde Einkommen mindert. Wer keine Einkommensteuer zahlt, hat davon nichts. Und viele Vorteile wirken nur, wenn Sie sie beantragen: die Wertmarke, die Kfz-Steuerbefreiung, den Parkausweis, die Ermäßigung beim Rundfunkbeitrag.</p>
<p>Wie Sie zum Ausweis kommen, steht unter ${h.a('schwerbehindertenausweis-beantragen', 'Schwerbehindertenausweis beantragen')}; was auf der Karte steht und wie lange sie gilt, unter ${h.a('schwerbehindertenausweis', 'Schwerbehindertenausweis')}.</p>
`,
  },
});
