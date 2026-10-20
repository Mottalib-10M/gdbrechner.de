import { defineGuide } from '../../lib/guide-types';
import { pauschbetrag } from '../../lib/engine/rechte';
import { steuerwirkung } from '../../lib/engine/steuer';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { eintrag } from '../../lib/engine/tabelle';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

/**
 * GdB 30: Pauschbetrag der zweiten Stufe und Einstieg in die Gleichstellung (§ 2 Abs. 3 SGB IX).
 * Eigene Beispiele: Ehepaar mit Splitting und 58.000 €, Teilzeitkraft mit 24.000 €, Wege zu 30 aus 20 und 20.
 */
const S = P.schwelle;
const eur = (x: number) => formatMoney(x, 0, 'de');
const tb = (id: string, teil: string) => {
  const s = eintrag(id)!.stufen.find((x) => x.text.includes(teil))!;
  return s.von === s.bis ? String(s.von) : `${s.von} bis ${s.bis}`;
};
const G = S.gleichstellung;
const pb = pauschbetrag(G);
const pb20 = pauschbetrag(S.min_gdb);
const paar = steuerwirkung({ zve: 58000, splitting: true, kirche: 0, pauschbetrag: pb, fahrtkosten: 0, weitereAgB: 0, kinder: 0 });
const teilzeit = steuerwirkung({ zve: 24000, splitting: false, kirche: 0, pauschbetrag: pb, fahrtkosten: 0, weitereAgB: 0, kinder: 0 });
const verstaerkt = gesamtGdb([{ system: 'wirbelsaeule', gdb: 20 }, { system: 'beine', gdb: 20, beziehung: 'nachteilig' }]);
const getrennt = gesamtGdb([{ system: 'wirbelsaeule', gdb: 20 }, { system: 'ohren', gdb: 20, beziehung: 'unabhaengig' }]);
const ueberlapp = gesamtGdb([{ system: 'psyche', gdb: 30 }, { system: 'ohren', gdb: 20, beziehung: 'teilweise' }]);

export default defineGuide({
  id: 'gdb-30',
  group: 'stufen',
  order: 230,
  mini: 'stufe',
  miniDefaults: { g: 30 },
  miniHref: 'home',
  related: ['gleichstellung', 'gdb-40', 'gdb-20', 'kuendigungsschutz-schwerbehinderung', 'behinderten-pauschbetrag'],
  sources: ['sgb9_2', 'sgb9_151', 'estg33b', 'versmedv'],
  de: {
    slug: 'gdb-30',
    nav: 'GdB 30',
    card: 'Pauschbetrag der zweiten Stufe und der Weg zur Gleichstellung: was GdB 30 im Beruf schützt und was ohne Schwerbehinderung fehlt.',
    title: 'GdB 30 Vorteile 2026: Gleichstellung und Pauschbetrag',
    description: `GdB 30 Vorteile 2026: Pauschbetrag ${eur(pb)}, Gleichstellung mit Kündigungsschutz über die Agentur für Arbeit. Typische Leiden mit 30 und was ohne Ausweis fehlt.`,
    h1: 'GdB 30: Pauschbetrag und Gleichstellung',
    intro: 'Mit GdB 30 öffnet sich die Gleichstellung, die den Arbeitsplatz schützt; einen Ausweis gibt es weiterhin nicht.',
    resume: `Ein Grad der Behinderung von ${G} bringt zwei Dinge: einen Behinderten-Pauschbetrag von ${eur(pb)} im Jahr nach § 33b Absatz 3 EStG, also ${eur(pb - pb20)} mehr als bei GdB ${S.min_gdb}, und die Möglichkeit der Gleichstellung nach § 2 Absatz 3 SGB IX. Die Gleichstellung beantragen Sie bei der Agentur für Arbeit; sie wird gewährt, wenn Sie wegen der Behinderung ohne sie einen geeigneten Arbeitsplatz nicht erlangen oder nicht behalten können. Sie gilt ab dem Tag des Antrags und bringt vor allem den besonderen Kündigungsschutz: Eine Kündigung braucht dann die Zustimmung des Integrationsamts. Zusatzurlaub, Ausweis, Freifahrt und die Altersrente für schwerbehinderte Menschen gibt es mit GdB ${G} nicht, auch nicht mit Gleichstellung. Der Pauschbetrag spart einem Ehepaar mit ${eur(58000)} zu versteuerndem Einkommen rund ${eur(paar.ersparnis)} im Jahr. Typisch für ${G} sind nach Teil B der Versorgungsmedizin-Verordnung beidseitige Knie-Totalendoprothesen oder eine mittelgradige Schwerhörigkeit auf beiden Ohren.`,
    faqs: [
      { q: 'Was ist bei GdB 30 der wichtigste Vorteil?', a: `Für Beschäftigte meist die Gleichstellung, weil sie den Arbeitsplatz absichert: Eine Kündigung durch den Arbeitgeber braucht nach § 168 SGB IX die vorherige Zustimmung des Integrationsamts. Für alle anderen bleibt der Pauschbetrag von ${eur(pb)} im Jahr. Selbstständige und Rentner haben von der Gleichstellung nichts, weil sie an ein Arbeitsverhältnis anknüpft.` },
      { q: 'Wird die Gleichstellung bei GdB 30 automatisch gewährt?', a: `Nein. Die Agentur für Arbeit prüft, ob Sie infolge der Behinderung ohne Gleichstellung einen geeigneten Arbeitsplatz nicht bekommen oder nicht behalten können. Hinweise darauf sind häufige behinderungsbedingte Fehlzeiten, eingeschränkte Einsatzmöglichkeiten, Abmahnungen oder angekündigte Stellenstreichungen. Ein GdB von ${G} allein genügt nicht; schildern Sie im Antrag die konkrete Lage am Arbeitsplatz.` },
      { q: 'Muss ich den Arbeitgeber über den Gleichstellungsantrag informieren?', a: 'Eine gesetzliche Pflicht dazu gibt es nicht. Die Agentur für Arbeit kann im Verfahren aber Stellungnahmen einholen, etwa beim Arbeitgeber, beim Betriebsrat oder bei der Schwerbehindertenvertretung, um zu klären, wie sich die Behinderung im Betrieb auswirkt. Rechnen Sie also damit, dass der Arbeitgeber vom Antrag erfährt. Bedenken dagegen sollten Sie im Antrag offen ansprechen.' },
      { q: 'Kann ich mit GdB 30 früher in Rente gehen?', a: `Nicht über die Altersrente für schwerbehinderte Menschen: Sie verlangt nach § 37 SGB VI einen GdB von mindestens ${S.schwerbehinderung} bei Rentenbeginn, und die Gleichstellung ersetzt diesen nicht. Andere Rentenarten, etwa für langjährig Versicherte oder wegen Erwerbsminderung, hängen nicht am GdB. Wer nahe an der Rente steht, sollte prüfen, ob ein Verschlimmerungsantrag Aussicht hat.` },
      { q: 'Welche Leiden ergeben zusammen GdB 30?', a: `Häufig zwei Leiden mit je 20, die sich gegenseitig verstärken, etwa ein Rückenleiden und ein Kniegelenk, die beide das Gehen erschweren. Nach diesem Rechner liegt das bei ${verstaerkt.min} bis ${verstaerkt.max}, Richtwert ${verstaerkt.richt}. Betreffen die zwei Leiden ganz verschiedene Lebensbereiche, bleibt der Richtwert bei ${getrennt.richt}, weil Teil A Nummer 3.5 eine Erhöhung durch 20 vielfach nicht annimmt.` },
    ],
    body: (h) => `
<h2>Die Rechte bei GdB 30 im Überblick</h2>
${h.table(['Recht', 'GdB 30 ohne Gleichstellung', 'GdB 30 mit Gleichstellung'], [
  ['Behinderten-Pauschbetrag', h.eur(pb), h.eur(pb)],
  ['Besonderer Kündigungsschutz', 'nein', 'ja, § 168 SGB IX'],
  ['Hilfen des Integrationsamts im Beruf', 'nein', 'ja'],
  ['Zusatzurlaub', 'nein', 'nein (§ 151 Abs. 3 SGB IX)'],
  ['Ausweis, Freifahrt', 'nein', 'nein'],
  ['Altersrente schwerbehindert', 'nein', 'nein'],
], 'GdB 30 im Jahr 2026: mit und ohne Gleichstellung', ['l', 'l', 'l'])}
<p>Die Tabelle zeigt den Kern: Was bei GdB ${G} über den Pauschbetrag hinausgeht, kommt aus der Gleichstellung. § 151 Absatz 3 SGB IX wendet auf gleichgestellte Menschen das Schwerbehindertenrecht an, nimmt aber den Zusatzurlaub nach § 208 und das Kapitel über die unentgeltliche Beförderung ausdrücklich aus. Wie sich die Gleichstellung bei GdB ${G} auswirkt, zeigt der zweite Rechner.</p>
<!--mini:gleich-->
<h2>Der Pauschbetrag bei GdB 30</h2>
<p>Der Pauschbetrag von ${h.eur(pb)} mindert das zu versteuernde Einkommen. Eine Teilzeitkraft mit ${h.eur(24000)} spart damit ${h.eur(teilzeit.ersparnis)} im Jahr, das Ehepaar mit ${h.eur(58000)} und Zusammenveranlagung ${h.eur(paar.ersparnis)}. Bei Ehepaaren zählt der Pauschbetrag des Partners, der den GdB hat; haben beide einen GdB, kommen beide Beträge in die Erklärung. Die Fahrtkostenpauschale gibt es erst ab GdB ${P.fahrtkosten.gdb_klein_mit_g} mit Merkzeichen G. Für einen genauen Wert mit Kirchensteuer nutzen Sie den ${h.a('behinderten-pauschbetrag', 'Pauschbetrag-Rechner')}.</p>
<h2>Typische Einzelwerte von 30</h2>
<p>Teil B der Versorgungsmedizin-Verordnung bewertet beidseitige Knie-Totalendoprothesen bei bestem Ergebnis mit mindestens ${tb('knie-endoprothese', 'beidseitiger Totalendoprothese')}, eine Herzklappenprothese mit mindestens ${tb('herzklappe', 'Herzklappenprothesen')} und eine mittelgradige Schwerhörigkeit auf beiden Ohren mit ${tb('schwerhoerigkeit', 'Mittelgradige Schwerhörigkeit beidseits')}. Ein Wirbelsäulenschaden mit schweren funktionellen Auswirkungen in einem Abschnitt ergibt ${tb('wirbelsaeulenschaeden', 'schweren funktionellen Auswirkungen in einem')}. Stärker behindernde psychische Störungen, etwa eine ausgeprägtere Depression, liegen bei ${tb('depression', 'Stärker behindernde')}. Diese Spanne zeigt, wie viel vom Befund abhängt: Ob es 30 oder 40 wird, entscheidet die Behörde nach Ausprägung und Verlauf.</p>
<h2>Wege zu 30 aus mehreren Leiden</h2>
<p>Bei zwei Leiden mit je 20 kommt es auf das Zusammenwirken an. Verstärken sie sich, etwa Rücken und Knie beim Gehen, nimmt Teil A Nummer 3.3.1 „in der Regel“ eine Erhöhung an; der Richtwert dieser Seite ist ${verstaerkt.richt}. Ein Rückenleiden und ein Hörverlust mit je 20 betreffen verschiedene Bereiche; hier bleibt der Richtwert bei ${getrennt.richt}, die Spanne reicht bis ${getrennt.max}. Überschneiden sich zwei Leiden teilweise, etwa eine Depression mit 30 und ein belastender Tinnitus mit 20, erhöht sich der Wert meist nicht: Richtwert ${ueberlapp.richt}. Weitere Kombinationen rechnet der ${h.a('home', 'Gesamt-GdB-Rechner')}.</p>
<h2>Gleichstellung: Antrag und Wirkung</h2>
<p>Den Antrag stellen Sie bei der Agentur für Arbeit, formlos oder mit deren Vordruck, zusammen mit dem GdB-Bescheid. Die Gleichstellung wird nach § 151 Abs. 2 SGB IX mit dem Tag des Eingangs wirksam und kann befristet werden. Ab diesem Tag gilt der besondere Kündigungsschutz, sofern das Arbeitsverhältnis länger als ${P.kuendigung.wartezeit_monate} Monate besteht. Für Arbeitgeber zählt ein gleichgestellter Mensch auf die Pflichtquote von ${h.pct(P.beschaeftigung.quote)}, die ab ${P.beschaeftigung.pflicht_ab_plaetze} Arbeitsplätzen gilt. Einzelheiten zu Voraussetzungen und Ablauf stehen unter ${h.a('gleichstellung', 'Gleichstellung beantragen')}.</p>
<p>Lehnt die Agentur ab, ist Widerspruch möglich. Hilfreich sind Belege über Fehlzeiten, ein Attest zu den Einschränkungen am Arbeitsplatz und, wenn vorhanden, eine Stellungnahme der Schwerbehindertenvertretung oder des Betriebsrats.</p>
<h2>Was GdB 30 im Alltag nicht ändert</h2>
<p>Viele Vergünstigungen, die man mit einer Behinderung verbindet, hängen nicht am GdB allein, sondern an einem ${h.a('merkzeichen', 'Merkzeichen')}, und Merkzeichen wie G oder aG setzen die Schwerbehinderung voraus. Mit GdB ${G} gibt es deshalb keine Freifahrt in Bus und Bahn, keine Ermäßigung der Kraftfahrzeugsteuer nach § 3a KraftStG, keinen Parkausweis und keine Ermäßigung beim Rundfunkbeitrag. Auch Rabatte privater Anbieter, etwa bei Eintrittspreisen, verlangen meist den Ausweis, den es erst ab GdB ${S.schwerbehinderung} gibt.</p>
<p>Unverändert bleibt dagegen alles, was Sie ohne GdB auch hätten: Krankheitskosten wie Zuzahlungen, Hilfsmittel oder Fahrten zur Behandlung können Sie neben dem Pauschbetrag als außergewöhnliche Belastung angeben, soweit sie die zumutbare Belastung übersteigen. Geben Sie im Antrag beim Versorgungsamt Ihre Steuer-Identifikationsnummer an: Seit 2026 meldet die Behörde den GdB direkt an das Finanzamt, und nur dann wird der Pauschbetrag für neue Feststellungen berücksichtigt.</p>
<h2>Wenn 30 zu niedrig erscheint</h2>
<p>Liegt ein Leiden nach Ihren Befunden eher in der oberen Spanne, lohnt der Blick in die Begründung des Bescheids: Dort stehen die Einzelwerte und die Leiden, die die Behörde berücksichtigt hat. Fehlt etwas, legen Sie innerhalb eines Monats ${h.a('widerspruch-gdb', 'Widerspruch')} ein. Hat sich der Zustand seitdem verschlechtert, ist ein ${h.a('verschlimmerungsantrag', 'Verschlimmerungsantrag')} der richtige Weg. Ab ${h.a('gdb-40', 'GdB 40')} steigt der Pauschbetrag weiter; die großen Rechte beginnen erst mit ${h.a('gdb-50', 'GdB 50')}.</p>
`,
  },
});
