import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

/**
 * Begriff der Schwerbehinderung: § 2 SGB IX, Feststellung nach § 152, Ende nach § 199, Beschäftigungspflicht und
 * Ausgleichsabgabe (§ 154, § 160; Beträge ab 2025 laut BIH). Eigenes Beispiel: Betrieb mit 100 Arbeitsplätzen.
 */
const S = P.schwelle;
const B = P.beschaeftigung;
const eur = (x: number) => formatMoney(x, 0, 'de');
const pct = (x: number) => `${(x * 100).toLocaleString('de-DE')} %`;
const plaetze = 100;
const pflicht = Math.round(plaetze * B.quote);
const besetzt = 2;
const quoteIst = besetzt / plaetze;
const satz = B.abgabe.find(([ab]) => quoteIst >= ab && ab > 0)?.[1] ?? B.abgabe[B.abgabe.length - 1][1];
const abgabeJahr = (pflicht - besetzt) * satz * 12;
const satz0 = B.abgabe[B.abgabe.length - 1][1];
const abgabe0 = pflicht * satz0 * 12;

export default defineGuide({
  id: 'schwerbehinderung',
  group: 'ausweis',
  order: 440,
  mini: 'rente',
  miniDefaults: { j: 1967 },
  miniHref: 'home',
  related: ['gdb-50', 'schwerbehindertenausweis', 'gleichstellung', 'schwerbehindertenausweis-vorteile', 'kuendigungsschutz-schwerbehinderung'],
  sources: ['sgb9_2', 'sgb9_152', 'sgb9_154', 'bihAbgabe', 'sgb9_199', 'sgb6_37'],
  de: {
    slug: 'schwerbehinderung',
    nav: 'Schwerbehinderung',
    card: 'Was das Gesetz unter Behinderung und Schwerbehinderung versteht, wie GdB, Pflegegrad und Erwerbsminderung zusammenhängen und was Arbeitgeber betrifft.',
    title: 'Schwerbehinderung 2026: Definition, GdB 50, Rechte',
    description: `Schwerbehinderung 2026: Definition nach § 2 SGB IX, GdB ab ${S.schwerbehinderung}, Unterschied zu Pflegegrad und Erwerbsminderung, Ende des Schutzes und die Ausgleichsabgabe.`,
    h1: 'Schwerbehinderung: Begriff, Feststellung und Folgen',
    intro: `Schwerbehindert ist, wer einen festgestellten GdB von mindestens ${S.schwerbehinderung} hat; was das rechtlich heißt und was nicht, steht in wenigen Paragraphen des SGB IX.`,
    resume: `Menschen mit Behinderungen sind nach § 2 Absatz 1 SGB IX Menschen mit körperlichen, seelischen, geistigen oder Sinnesbeeinträchtigungen, die sie in Wechselwirkung mit Barrieren an der gleichberechtigten Teilhabe mit hoher Wahrscheinlichkeit länger als sechs Monate hindern können. Schwerbehindert sind sie nach Absatz 2, wenn ein Grad der Behinderung von wenigstens ${S.schwerbehinderung} vorliegt und sie in Deutschland wohnen, sich gewöhnlich aufhalten oder rechtmäßig beschäftigt sind. Den GdB stellt auf Antrag die zuständige Behörde des Landes fest, in Zehnerschritten ab ${S.min_gdb}. Mit GdB ${S.gleichstellung} oder 40 ist eine Gleichstellung durch die Agentur für Arbeit möglich. Die Schwerbehinderung ist kein Pflegegrad und keine Erwerbsminderung; diese prüfen Pflegekasse und Rentenversicherung nach eigenen Maßstäben. Sinkt der GdB unter ${S.schwerbehinderung}, enden die Rechte nach § 199 SGB IX erst mit Ablauf des dritten Kalendermonats nach Unanfechtbarkeit des Bescheids. Arbeitgeber mit mindestens ${B.pflicht_ab_plaetze} Arbeitsplätzen müssen ${pct(B.quote)} davon mit schwerbehinderten Menschen besetzen. Ein Betrieb mit ${plaetze} Plätzen und nur ${besetzt} schwerbehinderten Beschäftigten zahlt nach den seit 2025 geltenden Sätzen ${eur(abgabeJahr)} Ausgleichsabgabe im Jahr.`,
    faqs: [
      { q: 'Was ist der Unterschied zwischen Behinderung und Schwerbehinderung?', a: `Behinderung ist der Oberbegriff aus § 2 Absatz 1 SGB IX: eine Beeinträchtigung, die die Teilhabe voraussichtlich länger als sechs Monate erschwert. Rechtlich festgestellt wird sie ab GdB ${S.min_gdb}. Schwerbehinderung ist die Stufe ab GdB ${S.schwerbehinderung}; erst mit ihr gelten Ausweis, Zusatzurlaub, besonderer Kündigungsschutz und die Altersrente für schwerbehinderte Menschen. Mit GdB ${S.min_gdb} bis 40 gibt es den Pauschbetrag, ohne Gleichstellung aber keines dieser Schutzrechte.` },
      { q: 'Gelte ich als schwerbehindert, wenn ich im Ausland wohne und in Deutschland arbeite?', a: 'Ja, wenn Sie rechtmäßig in Deutschland beschäftigt sind. § 2 Absatz 2 SGB IX verlangt Wohnsitz, gewöhnlichen Aufenthalt oder Beschäftigung auf einem Arbeitsplatz im Geltungsbereich des Gesetzbuchs. Grenzgänger können den GdB deshalb in Deutschland feststellen lassen und die Schutzrechte im Arbeitsverhältnis in Anspruch nehmen. Welche Behörde zuständig ist, wenn kein Wohnsitz in Deutschland besteht, erfragen Sie bei der Stelle am Ort des Arbeitsplatzes.' },
      { q: 'Ist eine Schwerbehinderung dasselbe wie ein Pflegegrad?', a: 'Nein. Den GdB stellt das Versorgungsamt nach der Versorgungsmedizin-Verordnung fest, er misst die Beeinträchtigung der Teilhabe. Den Pflegegrad stellt die Pflegekasse fest, er misst die Selbstständigkeit im Alltag. Beides kann weit auseinanderliegen: GdB 100 ohne Pflegegrad ist ebenso möglich wie ein Pflegegrad bei niedrigem GdB. Eine Brücke gibt es nur im Steuerrecht, wo Pflegegrad 4 oder 5 dem Merkzeichen H gleichsteht.' },
      { q: 'Wie lange bleibe ich schwerbehindert, wenn der GdB sinkt?', a: `Bis zum Ende des dritten Kalendermonats, nachdem der Bescheid mit dem niedrigeren GdB unanfechtbar geworden ist (§ 199 Absatz 1 SGB IX). Unanfechtbar wird er erst, wenn die Widerspruchsfrist von ${P.verfahren.widerspruch_monate} Monat abgelaufen ist oder ein Widerspruch und eine Klage abgeschlossen sind. Bis dahin gelten Zusatzurlaub, Kündigungsschutz und Ausweis weiter. Für die Altersrente zählt der GdB am Tag des Rentenbeginns.` },
      { q: 'Wie hoch ist die Ausgleichsabgabe für unbesetzte Pflichtplätze?', a: `Seit 2025 je unbesetztem Pflichtplatz und Monat ${eur(B.abgabe[0][1])} bei einer Quote von ${pct(B.abgabe[0][0])} bis unter ${pct(B.quote)}, ${eur(B.abgabe[1][1])} bei ${pct(B.abgabe[1][0])} bis unter ${pct(B.abgabe[0][0])}, ${eur(B.abgabe[2][1])} bei mehr als 0 bis unter ${pct(B.abgabe[1][0])} und ${eur(satz0)}, wenn der Arbeitgeber niemanden beschäftigt. Für kleinere Betriebe unter 60 Plätzen gelten niedrigere Sätze. Die Abgabe ersetzt die Beschäftigungspflicht nicht.` },
    ],
    body: (h) => `
<h2>Drei Stufen im Gesetz</h2>
<p>Das ${h.src('sgb9_2', 'SGB IX in § 2')} unterscheidet drei Gruppen. <strong>Menschen mit Behinderungen</strong> haben eine körperliche, seelische, geistige oder Sinnesbeeinträchtigung, die sie in Wechselwirkung mit Barrieren voraussichtlich länger als sechs Monate an der Teilhabe hindert. <strong>Schwerbehinderte Menschen</strong> haben einen GdB von wenigstens ${S.schwerbehinderung} und leben oder arbeiten rechtmäßig in Deutschland. <strong>Gleichgestellte</strong> haben einen GdB von ${S.gleichstellung} oder 40 und werden auf Antrag von der Agentur für Arbeit schwerbehinderten Menschen gleichgestellt, wenn sie sonst einen geeigneten Arbeitsplatz nicht erhalten oder nicht behalten können.</p>
${h.table(['Stufe', 'GdB', 'Wichtigste Folgen'], [
  ['Behinderung festgestellt', `${S.min_gdb} bis 40`, 'Pauschbetrag, Bescheid als Nachweis'],
  ['Gleichstellung', `${S.gleichstellung} oder 40 mit Bescheid der Agentur`, 'Kündigungsschutz, Hilfen im Arbeitsleben, kein Zusatzurlaub, keine Freifahrt'],
  ['Schwerbehinderung', `ab ${S.schwerbehinderung}`, 'Ausweis, Zusatzurlaub, Kündigungsschutz, Altersrente, Merkzeichen möglich'],
], 'Stufen nach § 2 SGB IX', ['l', 'l', 'l'])}
<p>Die Stufe ergibt sich allein aus dem festgestellten GdB, nicht aus der Diagnose. Zwei Menschen mit derselben Krankheit können verschiedene Stufen haben, weil der GdB die Auswirkungen bewertet. Was jede Stufe konkret bringt, zeigen die Seiten zu ${h.a('gdb-50', 'GdB 50')} und zur ${h.a('gleichstellung', 'Gleichstellung')}.</p>
<h2>Wie die Schwerbehinderung festgestellt wird</h2>
<p>Die Schwerbehinderung entsteht nicht von selbst, sie wird auf Antrag festgestellt (${h.src('sgb9_152', '§ 152 SGB IX')}). Die Behörde bewertet jede Funktionsbeeinträchtigung nach der Versorgungsmedizin-Verordnung und bildet daraus den Gesamt-GdB, ohne die Einzelwerte zu addieren. Eine Besonderheit regelt § 152 Absatz 2: Hat schon ein Rentenbescheid oder eine entsprechende Verwaltungs- oder Gerichtsentscheidung eine Minderung der Erwerbsfähigkeit festgestellt, gilt diese zugleich als Feststellung des GdB, sofern Sie kein Interesse an einer eigenen Feststellung glaubhaft machen. Wie Sie den Antrag stellen, steht unter ${h.a('schwerbehindertenausweis-beantragen', 'Schwerbehindertenausweis beantragen')}.</p>
<h2>Was Schwerbehinderung nicht ist</h2>
<p>Drei Begriffe werden häufig verwechselt. Der <strong>GdB</strong> misst die Beeinträchtigung der Teilhabe in allen Lebensbereichen. Der <strong>Grad der Schädigungsfolgen</strong> (GdS) folgt derselben Tabelle, gilt aber im Sozialen Entschädigungsrecht und nur für Schäden mit bestimmter Ursache, etwa nach einer Gewalttat. Der <strong>Pflegegrad</strong> misst die Selbstständigkeit und wird von der Pflegekasse festgestellt. Auch die <strong>Erwerbsminderung</strong> ist etwas anderes: Ob Sie noch arbeiten können, prüft die Rentenversicherung. Ein GdB von 100 bedeutet weder Pflegebedürftigkeit noch Erwerbsunfähigkeit.</p>
<h2>Wenn die Schwerbehinderung endet</h2>
<p>Stellt die Behörde nach einer Besserung, etwa nach Ablauf einer Heilungsbewährung, einen GdB unter ${S.schwerbehinderung} fest, endet die Schwerbehinderung nicht sofort. Nach ${h.src('sgb9_199', '§ 199 SGB IX')} gelten die besonderen Regeln bis zum Ende des dritten Kalendermonats nach Unanfechtbarkeit des Bescheids. Ein Beispiel: Wird der Bescheid im Mai unanfechtbar, bleiben Zusatzurlaub und Kündigungsschutz bis Ende August bestehen.</p>
<p>Wer kurz vor der Rente steht, sollte die Folgen eines niedrigeren GdB kennen: Die Altersrente für schwerbehinderte Menschen setzt nach ${h.src('sgb6_37', '§ 37 SGB VI')} voraus, dass Sie bei Rentenbeginn als schwerbehindert anerkannt sind und ${P.rente.wartezeit_jahre} Versicherungsjahre haben; das Alter je Jahrgang zeigt der kleine Rechner auf dieser Seite.</p>
<h2>Schwerbehinderung und Arbeitgeber</h2>
<p>Arbeitgeber mit jahresdurchschnittlich mindestens ${B.pflicht_ab_plaetze} Arbeitsplätzen müssen auf wenigstens ${pct(B.quote)} davon schwerbehinderte Menschen beschäftigen (${h.src('sgb9_154', '§ 154 SGB IX')}). Für jeden unbesetzten Pflichtplatz zahlen sie eine Ausgleichsabgabe, deren Höhe von der erreichten Quote abhängt.</p>
${h.table(['Erreichte Beschäftigungsquote', 'Abgabe je Platz und Monat'], [
  [`${pct(B.abgabe[0][0])} bis unter ${pct(B.quote)}`, h.eur(B.abgabe[0][1])],
  [`${pct(B.abgabe[1][0])} bis unter ${pct(B.abgabe[0][0])}`, h.eur(B.abgabe[1][1])],
  [`mehr als 0 % bis unter ${pct(B.abgabe[1][0])}`, h.eur(B.abgabe[2][1])],
  ['0 %', h.eur(satz0)],
], 'Ausgleichsabgabe seit 1. Januar 2025, laut Integrationsämtern auch 2026', ['l', 'r'])}
<p><strong>Beispiel:</strong> Ein Betrieb mit ${plaetze} Arbeitsplätzen hat ${pflicht} Pflichtplätze. Beschäftigt er ${besetzt} schwerbehinderte Menschen, liegt die Quote bei ${pct(quoteIst)}, und für die ${pflicht - besetzt} unbesetzten Plätze fallen ${h.eur(satz)} im Monat an, zusammen ${h.eur(abgabeJahr)} im Jahr. Ohne schwerbehinderte Beschäftigte wären es ${h.eur(abgabe0)}. Die Beträge veröffentlichen die ${h.src('bihAbgabe', 'Integrationsämter')}. Für Betriebe mit weniger als 40 oder 60 Plätzen gelten Sonderregeln mit niedrigeren Sätzen. Die Abgabe befreit nicht von der Pflicht zur Beschäftigung. Für Bewerberinnen und Bewerber kann das ein Argument sein, die Schwerbehinderung im Gespräch zu nennen, eine Pflicht dazu besteht nicht.</p>
`,
  },
});
