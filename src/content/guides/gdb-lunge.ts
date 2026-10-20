import { defineGuide } from '../../lib/guide-types';
import { eintrag } from '../../lib/engine/tabelle';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { pauschbetrag } from '../../lib/engine/rechte';
import { formatMoney } from '../../lib/format';

/**
 * Atmung und Lunge (VersMedV Teil B Nr. 8): COPD und Lungenfunktion (8.3), Bronchitis (8.2), Asthma (8.5, 8.6),
 * Schlafapnoe (8.7), Lungenkrebs (8.4). Werte aus tabelle.json, Kombinationen vom Motor.
 */
const eur = (x: number) => formatMoney(x, 0, 'de');
const lf = eintrag('lungenfunktion')!.stufen;
const br = eintrag('chronische-bronchitis')!.stufen;
const as = eintrag('asthma')!.stufen;
const ak = eintrag('asthma-kinder')!.stufen;
const sa = eintrag('schlafapnoe')!.stufen;
const lk = eintrag('lungenkrebs')!.stufen;
const sp = (s: { von: number; bis: number }) => (s.von === s.bis ? `${s.von}` : `${s.von} bis ${s.bis}`);
const r = (x: { min: number; max: number }) => (x.min === x.max ? `${x.min}` : `${x.min} bis ${x.max}`);
const copdHerz = gesamtGdb([{ system: 'lunge', gdb: 50 }, { system: 'herz', gdb: 30, beziehung: 'nachteilig' }]);
const asthmaApnoe = gesamtGdb([{ system: 'lunge', gdb: 30 }, { system: 'lunge', gdb: 20, beziehung: 'teilweise' }]);

export default defineGuide({
  id: 'gdb-lunge',
  group: 'tabelle',
  order: 650,
  mini: 'zwei',
  miniDefaults: { a: 50, b: 30, z: 1 },
  miniHref: 'home',
  related: ['gdb-tabelle', 'gdb-herz', 'gdb-krebs', 'merkzeichen-g', 'gdb-50', 'home'],
  sources: ['versmedv', 'sgb9_229', 'estg33b'],
  de: {
    slug: 'gdb-lunge',
    nav: 'Atmung und Lunge',
    card: 'COPD, Asthma, Schlafapnoe, Lungenkrebs: welche Stufe von Teil B Nr. 8 gilt und wann Atemnot zum Merkzeichen G führt.',
    title: 'GdB Lunge 2026: COPD, Asthma, Schlafapnoe nach Tabelle',
    description: `GdB bei Lungenerkrankungen 2026 nach VersMedV Teil B Nr. 8: COPD ${sp(lf[0])} bis ${lf[2].bis}, Asthma bis ${as[2].von}, Schlafapnoe mit CPAP ${sa[1].von}. Wann G und Schwerbehinderung.`,
    h1: 'GdB bei Atmung und Lunge',
    intro: 'Bei Lungenerkrankungen zählen die Atemnot im Alltag und die gemessene Lungenfunktion, beides zusammen.',
    resume: `Krankheiten der Atmungsorgane bewertet die Versorgungsmedizin-Verordnung in Teil B Nummer 8. Für chronische Erkrankungen mit dauernder Einschränkung der Lungenfunktion, etwa eine COPD, gibt es drei Stufen: geringen Grades mit Atemnot bei mittelschwerer Belastung und Messwerten bis zu einem Drittel unter dem Soll ${sp(lf[0])}, mittleren Grades mit Atemnot schon bei leichter Belastung und Messwerten bis zu zwei Dritteln unter dem Soll ${sp(lf[1])}, schweren Grades mit Atemnot in Ruhe ${sp(lf[2])}. Bronchialasthma ohne dauernde Funktionseinschränkung wird nach der Häufigkeit der Anfälle bewertet: selten und leicht ${sp(as[0])}, häufig oder schwer ${sp(as[1])}, Serien schwerer Anfälle ${sp(as[2])}. Ein Schlafapnoe-Syndrom mit nötiger Überdruckbeatmung ergibt ${sa[1].von}. Nach Entfernung eines Lungentumors gilt eine Heilungsbewährung von fünf Jahren mit wenigstens ${lk[0].von}. Eine Lungenfunktion mittleren Grades begründet nach Teil D in der Regel das Merkzeichen G. Ab GdB 50 gibt es ${eur(pauschbetrag(50))} Pauschbetrag im Jahr.`,
    faqs: [
      { q: 'Welcher GdB gilt bei COPD?', a: `Das hängt vom Grad der dauernden Einschränkung der Lungenfunktion ab, nicht vom GOLD-Stadium. Geringen Grades sind es ${sp(lf[0])}, mittleren Grades ${sp(lf[1])}, schweren Grades ${sp(lf[2])}. Maßgeblich sind die klinische Symptomatik und ihre Auswirkung auf den Allgemeinzustand, gestützt durch Lungenfunktionsprüfung und gegebenenfalls Blutgasanalyse. Häufige Infekte und Krankenhausaufenthalte gehören ins Gesamtbild.` },
      { q: 'Gibt Schlafapnoe einen GdB?', a: `Ohne nötige Überdruckbeatmung ${sp(sa[0])}, mit nächtlicher CPAP-Therapie ${sa[1].von}, und wenn die Beatmung nicht durchführbar ist, ${sa[2].von}. Folgeerscheinungen wie Herzrhythmusstörungen oder Bluthochdruck werden zusätzlich berücksichtigt. Weil ein Wert von 20 den Gesamt-GdB nach Teil A Nummer 3.5 vielfach nicht erhöht, wirkt die Schlafapnoe neben anderen Leiden oft nicht steigernd.` },
      { q: 'Wie wird Asthma bei Kindern bewertet?', a: `Nach Nummer 8.6 mit eigenen, höheren Stufen: geringen Grades ${sp(ak[0])}, mittleren Grades ${sp(ak[1])}, schweren Grades ${sp(ak[2])}. Bei schwerem Bronchialasthma ist nach Teil A Nummer 5 in der Regel bis zum 16. Geburtstag Hilflosigkeit anzunehmen, also das Merkzeichen H mit erhöhtem Pauschbetrag, den die Eltern übernehmen können.` },
      { q: 'Wann bekommt man wegen der Lunge das Merkzeichen G?', a: 'Nach Teil D der Verordnung ist eine erhebliche Beeinträchtigung der Bewegungsfähigkeit vor allem bei Atembehinderungen mit dauernder Einschränkung der Lungenfunktion wenigstens mittleren Grades anzunehmen. Wer also schon bei alltäglicher leichter Belastung wie Spazierengehen außer Atem ist, erfüllt in der Regel die Voraussetzungen. Mit G gibt es die Freifahrt mit Wertmarke oder die halbe Kfz-Steuer.' },
    ],
    body: (h) => `
<h2>Die Stufen im Überblick</h2>
${h.table(['Erkrankung (Teil B)', 'Ausprägung', 'GdB'], [
  ['Lungenfunktion (Nr. 8.3)', 'geringen Grades', sp(lf[0])],
  ['Lungenfunktion (Nr. 8.3)', 'mittleren Grades', sp(lf[1])],
  ['Lungenfunktion (Nr. 8.3)', 'schweren Grades', sp(lf[2])],
  ['Chronische Bronchitis (Nr. 8.2)', 'leicht, ohne Funktionseinschränkung', sp(br[0])],
  ['Chronische Bronchitis (Nr. 8.2)', 'schwer, ohne Funktionseinschränkung', sp(br[1])],
  ['Asthma (Nr. 8.5)', 'seltene oder leichte Anfälle', sp(as[0])],
  ['Asthma (Nr. 8.5)', 'häufige oder schwere Anfälle', sp(as[1])],
  ['Schlafapnoe (Nr. 8.7)', 'mit Überdruckbeatmung', String(sa[1].von)],
], 'Atmungsorgane nach Teil B Nr. 8, Wortlaut gekürzt', ['l', 'l', 'r'])}
<p>Die Verordnung beschreibt die Lungenfunktion doppelt: mit der Atemnot im Alltag und mit Messwerten der Lungenfunktionsprüfung im Verhältnis zum Sollwert. Bei der geringen Stufe liegen sie bis zu einem Drittel, bei der mittleren bis zu zwei Dritteln, bei der schweren um mehr als zwei Drittel unter dem Soll. Weichen Beschwerden und Messwerte voneinander ab, richtet sich der Wert nach der Verordnung vor allem nach der klinischen Symptomatik und ihren Auswirkungen auf den Allgemeinzustand.</p>
<!--mini:stufe-->
<h2>Asthma: zwei Wege der Bewertung</h2>
<p>Bronchialasthma wird nach Nummer 8.5 nach den Anfällen bewertet, solange die Lungenfunktion zwischen den Anfällen normal ist. Bleibt dauerhaft eine Einschränkung, wird sie nach Nummer 8.3 zusätzlich berücksichtigt. Eine junge Frau mit allergischem Asthma, die im Frühjahr einige leichte Anfälle hat und sonst beschwerdefrei ist, liegt bei ${sp(as[0])}. Ein Mann mit mehrmals im Monat auftretenden Anfällen trotz Dauertherapie liegt bei ${sp(as[1])}. Ein Anfallskalender und die Liste der Notfallbehandlungen sind die besten Belege.</p>
<h2>Lunge und Herz</h2>
<p>Lungen- und Herzerkrankungen verstärken sich gegenseitig. Eine COPD mittleren Grades mit 50 und eine Herzschwäche mit 30 betreffen zwei Funktionssysteme, die sich nach Teil A Nummer 3.3.1 in der Regel erhöhend auswirken: Die Spanne liegt bei ${r(copdHerz)}. Ein Asthma mit 30 und eine Schlafapnoe mit 20 dagegen gehören beide zu den Atmungsorganen; sie werden zuerst innerhalb dieses Systems zusammengefasst und überschneiden sich teilweise, ${r(asthmaApnoe)}. Mehr zum Herzen steht unter ${h.a('gdb-herz', 'Herz und Kreislauf')}.</p>
<h2>Lungenkrebs und Transplantation</h2>
<p>Nach Entfernung eines bösartigen Lungen- oder Bronchialtumors gilt eine Heilungsbewährung von fünf Jahren mit wenigstens ${lk[0].von}, bei Einschränkung der Lungenfunktion mittleren bis schweren Grades ${sp(lk[1])}. Nach einer Lungentransplantation sind während der Heilungsbewährung von im Allgemeinen zwei Jahren 100 anzusetzen, danach nicht weniger als 70. Was nach der Heilungsbewährung geschieht, erklärt die Seite ${h.a('gdb-krebs', 'Krebs und Heilungsbewährung')}.</p>
<h2>Was in den Antrag gehört</h2>
<p>Lungenfunktionsbefunde der letzten Jahre mit Sollwerten, gegebenenfalls Blutgasanalyse und Belastungstests, Berichte über Exazerbationen und Krankenhausaufenthalte, die Liste der Medikamente und eine eigene Beschreibung: wie weit Sie gehen können, ob Sie Treppen schaffen, ob Sie Sauerstoff brauchen. Die Verordnung bewertet die Folgen im Alltag; ein einzelner guter Messwert an einem guten Tag soll nicht das ganze Bild bestimmen. Mit einer Lungenfunktion mittleren Grades lohnt es sich, im selben Antrag das ${h.a('merkzeichen-g', 'Merkzeichen G')} anzukreuzen.</p>
<h2>Chronische Bronchitis und Infekte</h2>
<p>Eine chronische Bronchitis ohne dauernde Einschränkung der Lungenfunktion bewertet Nummer 8.2 nach Husten, Auswurf und Häufigkeit der Schübe: in leichter Form ${sp(br[0])}, in schwerer Form mit fast kontinuierlichem, ausgiebigem Husten und Auswurf und häufigen akuten Schüben ${sp(br[1])}. Kommt eine messbare Funktionseinschränkung hinzu, wird sie nach Nummer 8.3 bewertet und nicht doppelt gezählt. Wer im Winter regelmäßig mit Antibiotika oder Kortison behandelt wird, sollte jede dieser Behandlungen mit Datum belegen; die Häufigkeit der Schübe ist für die Einstufung entscheidend.</p>
<h2>Sauerstoff und Atemnot in Ruhe</h2>
<p>Wer eine Langzeit-Sauerstofftherapie braucht oder schon in Ruhe Atemnot hat, liegt in der Regel in der schweren Stufe mit ${sp(lf[2])}. In dieser Lage kommen neben G auch weitere Merkzeichen in Betracht: Das Merkzeichen aG verlangt nach § 229 Absatz 3 SGB IX eine erhebliche mobilitätsbezogene Teilhabebeeinträchtigung, die einem GdB von mindestens 80 entspricht: Wer sich wegen der Schwere der Beeinträchtigung dauernd nur mit fremder Hilfe oder mit großer Anstrengung außerhalb des Autos bewegen kann, erfüllt diese Voraussetzung. Das kann auch eine schwere Lungenerkrankung sein, nicht nur eine Erkrankung der Beine. Ob das zutrifft, entscheidet das Versorgungsamt im Einzelfall, auf Grundlage der Befunde und gegebenenfalls einer Begutachtung.</p>
<h2>Wenn sich die Lunge verschlechtert</h2>
<p>Eine COPD schreitet häufig fort. Steigt der Einzelwert um mindestens 10 und hält die Verschlechterung länger als sechs Monate an, liegt nach Teil A Nummer 7 eine wesentliche Änderung vor, und ein Verschlimmerungsantrag kann zu einem höheren Gesamt-GdB führen. Die neuen Lungenfunktionswerte im Vergleich zu den alten sind dafür der wichtigste Beleg. Bessert sich die Lage dagegen dauerhaft, etwa nach erfolgreicher Therapie, kann das Amt den Wert auch herabsetzen.</p>
<p>Wer raucht, wird nicht schlechter bewertet; die Verordnung fragt nach den Folgen, nicht nach der Ursache. Bei einer Berufskrankheit, etwa durch Staub, gibt es neben dem GdB Leistungen der Unfallversicherung nach eigenen Regeln.</p>
`,
  },
});
