import { defineGuide } from '../../lib/guide-types';
import { pauschbetrag } from '../../lib/engine/rechte';
import { steuerwirkung } from '../../lib/engine/steuer';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { eintrag } from '../../lib/engine/tabelle';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

/**
 * GdB 20: unterste Stufe, ab der überhaupt festgestellt wird (§ 152 Abs. 1 SGB IX) und der Pauschbetrag beginnt.
 * Eigene Beispiele: Ersparnis bei 28.000 € und 52.000 €, Teil-B-Werte von 20, zwei Leiden mit 20 und 10.
 */
const S = P.schwelle;
const eur = (x: number) => formatMoney(x, 0, 'de');
const tb = (id: string, teil: string) => {
  const s = eintrag(id)!.stufen.find((x) => x.text.includes(teil))!;
  return s.von === s.bis ? String(s.von) : `${s.von} bis ${s.bis}`;
};
const pb = pauschbetrag(S.min_gdb);
const s28 = steuerwirkung({ zve: 28000, splitting: false, kirche: 0, pauschbetrag: pb, fahrtkosten: 0, weitereAgB: 0, kinder: 0 });
const s52 = steuerwirkung({ zve: 52000, splitting: false, kirche: 0.09, pauschbetrag: pb, fahrtkosten: 0, weitereAgB: 0, kinder: 0 });
const klein = steuerwirkung({ zve: 13000, splitting: false, kirche: 0, pauschbetrag: pb, fahrtkosten: 0, weitereAgB: 0, kinder: 0 });
const mit10 = gesamtGdb([{ system: 'wirbelsaeule', gdb: 20 }, { system: 'haut', gdb: 10, beziehung: 'unabhaengig' }]);
const zweimal10 = gesamtGdb([{ system: 'beine', gdb: 10 }, { system: 'ohren', gdb: 10, beziehung: 'unabhaengig' }]);
const zwei20 = gesamtGdb([{ system: 'lunge', gdb: 20 }, { system: 'stoffwechsel', gdb: 20, beziehung: 'unabhaengig' }]);
const pb30 = pauschbetrag(S.gleichstellung);

export default defineGuide({
  id: 'gdb-20',
  group: 'stufen',
  order: 220,
  mini: 'stufe',
  miniDefaults: { g: 20 },
  miniHref: 'home',
  related: ['gdb-30', 'behinderten-pauschbetrag', 'verschlimmerungsantrag', 'gdb-tabelle', 'gdb-50'],
  sources: ['sgb9_152', 'estg33b', 'estdv65', 'versmedv'],
  de: {
    slug: 'gdb-20',
    nav: 'GdB 20',
    card: 'Die erste Stufe: Feststellung ab 20, kleiner Pauschbetrag, kein Ausweis. Typische Leiden mit 20 und was der Bescheid trotzdem nützt.',
    title: 'GdB 20 Vorteile 2026: Pauschbetrag, aber kein Ausweis',
    description: `GdB 20 Vorteile 2026: Pauschbetrag von ${eur(pb)} im Jahr, aber kein Ausweis und keine Gleichstellung. Welche Leiden 20 ergeben und wann sich der Antrag lohnt.`,
    h1: 'GdB 20: die erste Stufe und was sie bringt',
    intro: 'Ein GdB von 20 ist der kleinste Wert, den die Behörde überhaupt feststellt; er bringt einen Steuerfreibetrag und sonst wenig.',
    resume: `Ein Grad der Behinderung von ${S.min_gdb} ist die unterste Stufe: Nach § 152 Absatz 1 SGB IX trifft die Behörde eine Feststellung nur, wenn ein GdB von wenigstens ${S.min_gdb} vorliegt. Liegt er darunter, ergeht ein ablehnender Bescheid. Mit GdB ${S.min_gdb} gibt es den Behinderten-Pauschbetrag nach § 33b Absatz 3 EStG von ${eur(pb)} im Jahr, ohne Belege und für das ganze Kalenderjahr. Er spart bei ${eur(28000)} zu versteuerndem Einkommen rund ${eur(s28.ersparnis)} Steuern, bei ${eur(52000)} mit Kirchensteuer rund ${eur(s52.ersparnis)}. Einen Schwerbehindertenausweis gibt es nicht, auch keine Gleichstellung (sie beginnt bei GdB ${S.gleichstellung}), keinen Zusatzurlaub, keinen besonderen Kündigungsschutz und keine Fahrtkostenpauschale. Typische Einzelwerte von 20 sind nach Teil B der Versorgungsmedizin-Verordnung eine einseitige Knie-Totalendoprothese, eine Schlafapnoe mit nächtlicher Überdruckbeatmung oder eine Zöliakie unter Diät. Ein weiteres Leiden mit GdB 10 hebt den Gesamtwert in der Regel nicht an.`,
    faqs: [
      { q: 'Bekomme ich mit GdB 20 einen Ausweis?', a: `Nein. Den Schwerbehindertenausweis gibt es erst ab GdB ${S.schwerbehinderung}. Mit GdB ${S.min_gdb} erhalten Sie einen Feststellungsbescheid, und der genügt als Nachweis. Seit 2026 meldet die Behörde den GdB direkt an das Finanzamt, wenn Sie Ihre Steuer-Identifikationsnummer angegeben haben. Manche Arbeitgeber oder Versicherungen fragen nach dem Bescheid; vorlegen müssen Sie ihn dort in der Regel nicht.` },
      { q: 'Lohnt sich ein Antrag, wenn nur GdB 20 herauskommt?', a: `Steuerlich bringt er bei mittlerem Einkommen etwa ${eur(s28.ersparnis)} im Jahr, wer unter dem Grundfreibetrag liegt, spart nichts. Wichtiger ist oft der Bescheid selbst: Er hält fest, welche Leiden die Behörde anerkennt. Verschlechtert sich etwas, bauen Sie mit einem Verschlimmerungsantrag darauf auf, statt bei null zu beginnen. Nachteile hat ein festgestellter GdB von ${S.min_gdb} rechtlich nicht.` },
      { q: 'Was passiert, wenn die Behörde nur GdB 10 feststellt?', a: `Sie stellt dann gar keinen GdB fest, denn eine Feststellung gibt es nach § 152 Abs. 1 SGB IX erst ab ${S.min_gdb}. Der Bescheid lehnt den Antrag ab, nennt aber in der Begründung meist die Einzelwerte. Gegen diese Ablehnung ist Widerspruch innerhalb eines Monats möglich. Mehrere Leiden mit je 10 ergeben zusammen in der Regel auch nur 10, so steht es in Teil A Nummer 3.5.` },
      { q: 'Erfährt mein Arbeitgeber von GdB 20?', a: `Nicht von der Behörde. Die Feststellung geht an Sie und, mit Ihrer Steuer-Identifikationsnummer, an das Finanzamt. Für den Lohnsteuerabzug kann der Pauschbetrag als Freibetrag berücksichtigt werden; welche Angaben der Arbeitgeber dabei sieht, regelt das Lohnsteuerverfahren. Wer nichts mitteilen will, setzt den Pauschbetrag einfach in der Einkommensteuererklärung an.` },
      { q: 'Kann aus GdB 20 später mehr werden?', a: `Ja, wenn sich die Gesundheit wesentlich verschlechtert oder ein neues Leiden hinzukommt. Wesentlich ist eine Änderung nach Teil A Nummer 7, wenn sie länger als sechs Monate anhält und den GdB um mindestens 10 verändert. Dann stellen Sie einen Verschlimmerungsantrag. Ab GdB ${S.gleichstellung} ist eine Gleichstellung möglich, der Pauschbetrag steigt dann auf ${eur(pb30)}.` },
    ],
    body: (h) => `
<h2>Was GdB 20 bringt und was nicht</h2>
${h.table(['Recht', 'Mit GdB 20', 'Ab welchem GdB'], [
  ['Feststellung durch die Behörde', 'ja, Bescheid', `ab ${S.min_gdb} (§ 152 Abs. 1 SGB IX)`],
  ['Behinderten-Pauschbetrag', `${h.eur(pb)} im Jahr`, `ab ${S.min_gdb} (§ 33b EStG)`],
  ['Gleichstellung', 'nein', `ab ${S.gleichstellung}`],
  ['Schwerbehindertenausweis', 'nein', `ab ${S.schwerbehinderung}`],
  ['Zusatzurlaub, Kündigungsschutz', 'nein', `ab ${S.schwerbehinderung}`],
  ['Fahrtkostenpauschale', 'nein', `ab ${P.fahrtkosten.gdb_klein_mit_g} mit G oder ${P.fahrtkosten.gdb_klein}`],
], 'Rechte bei GdB 20 im Jahr 2026', ['l', 'l', 'l'])}
<p>Der GdB von ${S.min_gdb} ist rechtlich vor allem eine Steuerfrage. Der Pauschbetrag von ${h.eur(pb)} steht Ihnen für jedes Kalenderjahr zu, in dem der GdB besteht, ohne dass Sie Ausgaben nachweisen müssen. Er senkt das zu versteuernde Einkommen, nicht die Steuer selbst. Bei einem Grenzsteuersatz von rund ${h.pct(s28.grenzsteuersatz)} bleiben davon etwa ${h.eur(s28.ersparnis)}. Wer knapp über dem Grundfreibetrag liegt, etwa mit ${h.eur(13000)} zu versteuerndem Einkommen, spart nur ${h.eur(klein.ersparnis)}. Wie viel es bei Ihrem Einkommen ist, rechnet der kleine Rechner aus.</p>
<!--mini:steuer-->
<p>Statt des Pauschbetrags können Sie nach § 33b Abs. 1 EStG auch die tatsächlichen Mehrkosten der Behinderung als außergewöhnliche Belastung ansetzen. Das lohnt sich bei GdB ${S.min_gdb} selten, weil die zumutbare Belastung davon abgezogen wird. Krankheitskosten wie Zuzahlungen und Brillen können Sie aber zusätzlich zum Pauschbetrag eintragen. Mehr dazu beim ${h.a('behinderten-pauschbetrag', 'Pauschbetrag-Rechner')}.</p>
<h2>Welche Leiden mit 20 bewertet werden</h2>
<p>Teil B der Versorgungsmedizin-Verordnung nennt für viele Gesundheitsstörungen einen Wert oder eine Spanne. Mit ${tb('knie-endoprothese', 'einseitiger Totalendoprothese')} bewertet die Verordnung eine einseitige Knie-Totalendoprothese bei bestem Behandlungsergebnis, mit ${tb('schlafapnoe', 'mit Notwendigkeit einer kontinuierlichen')} eine Schlafapnoe, die eine nächtliche Überdruckbeatmung erfordert, mit ${tb('zoeliakie', 'ohne wesentliche Folgeerscheinungen')} eine Zöliakie ohne wesentliche Folgen unter glutenfreier Kost. Ebenfalls ${tb('schwerhoerigkeit', 'Taubheit auf einem Ohr, anderes Ohr normalhörig')} ergibt die Taubheit auf einem Ohr bei normalem Gehör auf dem anderen und ${tb('tinnitus', 'erheblichen psychovegetativen')} ein Tinnitus mit erheblichen psychovegetativen Begleiterscheinungen.</p>
<p>Diese Werte sind Anhaltswerte, keine Automatik. Die Behörde bewertet die Folgen im Alltag, nicht die Diagnose. Ein Bandscheibenschaden ohne Bewegungseinschränkung ergibt nach Teil B Nummer 18.9 ${tb('bandscheibe', 'ohne Bewegungseinschränkung')}, mit mittelgradigen Auswirkungen in einem Wirbelsäulenabschnitt ${tb('bandscheibe', 'mittelgradigen funktionellen Auswirkungen in einem')}. Den Wortlaut für Ihr Leiden finden Sie in der ${h.a('gdb-tabelle', 'GdB-Tabelle')}.</p>
<h2>Warum ein zweites leichtes Leiden selten hilft</h2>
<p>Der Gesamt-GdB entsteht nicht durch Addition. Teil A Nummer 3.5 sagt, dass zusätzliche Beeinträchtigungen mit GdB 10 die Gesamtbeeinträchtigung in der Regel nicht erhöhen, auch wenn es mehrere sind. Ein Rückenleiden mit 20 und eine Hauterkrankung mit 10 ergeben nach diesem Rechner ${mit10.richt}. Zwei Leiden mit je 10 bleiben bei ${zweimal10.richt}, und damit unter der Schwelle der Feststellung.</p>
<p>Anders bei zwei Leiden mit je 20: Auch hier schließt die Verordnung „vielfach“ nicht auf eine wesentliche Zunahme, verlangt aber eine Prüfung im Einzelfall. Ein Lungenleiden und eine Stoffwechselstörung mit je 20, die unterschiedliche Lebensbereiche betreffen, liegen nach dem Wortlaut zwischen ${zwei20.min} und ${zwei20.max}; der Richtwert dieser Seite ist ${zwei20.richt}. Ob es ${S.gleichstellung} wird, hängt davon ab, wie die Behörde das Zusammenwirken beurteilt. Mit dem ${h.a('home', 'Gesamt-GdB-Rechner')} können Sie mehrere Leiden eingeben.</p>
<h2>Der Bescheid als Grundlage für später</h2>
<p>Viele beantragen den GdB, wenn ein Leiden neu ist, und erhalten zunächst 20. Der Bescheid hat dann zwei Funktionen: Er sichert den Pauschbetrag, und er dokumentiert die anerkannten Leiden. Wird es schlimmer, prüft die Behörde bei einem ${h.a('verschlimmerungsantrag', 'Verschlimmerungsantrag')} nur die Veränderung. Halten Sie den Bescheid für zu niedrig, legen Sie ${h.a('widerspruch-gdb', 'Widerspruch')} innerhalb eines Monats ein.</p>
<p>Seit dem 1. Januar 2026 berücksichtigt das Finanzamt neue Feststellungen nur, wenn die Behörde sie elektronisch übermittelt hat (§ 65 Abs. 3a EStDV). Geben Sie deshalb im Antrag Ihre Steuer-Identifikationsnummer an. Ältere Bescheide gelten weiter, solange sich die Feststellung nicht ändert.</p>
<p>Wer arbeitet und auf einen besseren Schutz des Arbeitsplatzes hofft, braucht mindestens GdB ${S.gleichstellung}: Dann kann die Agentur für Arbeit gleichstellen, wie unter ${h.a('gdb-30', 'GdB 30')} beschrieben. Ab GdB ${S.schwerbehinderung} kommen Ausweis und Zusatzurlaub hinzu, siehe ${h.a('gdb-50', 'GdB 50')}.</p>
<h2>Wie Sie den Antrag sinnvoll vorbereiten</h2>
<p>Nennen Sie im Antrag alle Gesundheitsstörungen, auch die, die Ihnen klein vorkommen, und die Ärzte, die sie behandeln. Die Behörde fordert Befundberichte an; was nicht darin steht, bewertet sie nicht. Hilfreich sind Angaben zu den Folgen im Alltag: wie lange Sie sitzen, gehen oder sich konzentrieren können, wie oft Beschwerden auftreten und welche Behandlung nötig ist. Ein Leiden, das gut eingestellt ist, wird niedriger bewertet als eines mit häufigen Rückfällen. Der Bescheid ist eine Einschätzung der Behörde; dieser Ratgeber kann nur zeigen, was die Verordnung vorsieht.</p>
`,
  },
});
