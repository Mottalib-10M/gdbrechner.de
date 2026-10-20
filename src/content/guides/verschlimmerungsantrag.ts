import { defineGuide } from '../../lib/guide-types';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { P } from '../../lib/engine/params';

/**
 * Verschlimmerungsantrag (Neufeststellungsantrag): § 48 SGB X, VersMedV Teil A Nr. 7 (wesentliche Änderung:
 * mehr als sechs Monate, Änderung um wenigstens 10), § 199 SGB IX. Eigene Beispiele vom Motor: Knie 40 plus
 * neues Herzleiden; Rücken schlechter, Diabetes besser (Risiko der Herabsetzung); neues Leiden mit 10.
 */
const S = P.schwelle;
const V = P.verfahren;
const fall1Alt = gesamtGdb([{ system: 'beine', gdb: 40 }]);
const fall1Neu = gesamtGdb([{ system: 'beine', gdb: 40 }, { system: 'herz', gdb: 30, beziehung: 'nachteilig' }]);
const fall2Alt = gesamtGdb([{ system: 'stoffwechsel', gdb: 40 }, { system: 'wirbelsaeule', gdb: 30, beziehung: 'unabhaengig' }]);
const fall2Neu = gesamtGdb([{ system: 'wirbelsaeule', gdb: 40 }, { system: 'stoffwechsel', gdb: 20, beziehung: 'unabhaengig' }]);
const fall3Alt = gesamtGdb([{ system: 'psyche', gdb: 50 }]);
const fall3Neu = gesamtGdb([{ system: 'psyche', gdb: 50 }, { system: 'haut', gdb: 10, beziehung: 'unabhaengig' }]);

export default defineGuide({
  id: 'verschlimmerungsantrag',
  group: 'ausweis',
  order: 460,
  mini: 'zwei',
  miniDefaults: { a: 40, b: 30, z: 1 },
  miniHref: 'home',
  related: ['widerspruch-gdb', 'schwerbehindertenausweis', 'gdb-40', 'gdb-50', 'merkzeichen', 'gdb-krebs'],
  sources: ['sgb10_48', 'versmedv', 'sgb9_199', 'sgb10_44', 'sgb9_152'],
  de: {
    slug: 'verschlimmerungsantrag',
    nav: 'Verschlimmerungsantrag',
    card: 'Wann eine Verschlechterung als wesentlich gilt, was die Behörde neu prüft, ab wann ein höherer GdB wirkt und warum der GdB auch sinken kann.',
    title: 'Verschlimmerungsantrag GdB 2026: Regeln, Risiko, Ablauf',
    description: 'Verschlimmerungsantrag 2026: wann eine GdB-Änderung wesentlich ist (mindestens 10, länger als sechs Monate), ab wann sie wirkt, Risiko einer Herabsetzung.',
    h1: 'Verschlimmerungsantrag: höherer GdB nach Verschlechterung',
    intro: 'Hat sich Ihr Gesundheitszustand seit dem letzten Bescheid verschlechtert, können Sie jederzeit eine Neufeststellung beantragen; die Behörde schaut dann aber auf alles.',
    resume: `Der Verschlimmerungsantrag, amtlich Antrag auf Neufeststellung, ist der Weg zu einem höheren GdB oder einem neuen Merkzeichen, wenn sich die Gesundheit nach einem bestandskräftigen Bescheid verschlechtert hat. Rechtsgrundlage ist § 48 SGB X: Tritt eine wesentliche Änderung ein, wird der alte Bescheid aufgehoben, zu Ihren Gunsten in der Regel ab dem Zeitpunkt der Änderung. Wesentlich ist eine Änderung nach Teil A Nummer 7 der Versorgungsmedizin-Verordnung nur, wenn der veränderte Zustand mehr als sechs Monate angehalten hat oder voraussichtlich anhalten wird und sich der GdB um wenigstens 10 ändert; ebenso, wenn die Voraussetzungen eines Merkzeichens neu erfüllt sind oder entfallen. Die Behörde prüft dabei alle Leiden, nicht nur das verschlechterte. Haben sich andere gebessert, kann der GdB auch sinken. Ein Kniegelenk mit 40 und ein neues Herzleiden mit 30, die sich verstärken, ergeben nach diesem Rechner ${fall1Neu.richt} statt ${fall1Alt.richt}. Wird dagegen ein Rückenleiden von 30 auf 40 höher bewertet, während ein Diabetes von 40 auf 20 sinkt, ergibt der Rechner nur noch ${fall2Neu.richt} statt bisher ${fall2Alt.richt}. Fällt der GdB unter ${S.schwerbehinderung}, gelten die Schutzrechte nach § 199 SGB IX noch bis zum Ende des dritten Kalendermonats nach Unanfechtbarkeit.`,
    faqs: [
      { q: 'Wie lange muss eine Verschlechterung bestehen, bevor ich den Antrag stelle?', a: 'Nach Teil A Nummer 7 der Verordnung muss der veränderte Zustand mehr als sechs Monate angehalten haben oder voraussichtlich anhalten. Sie müssen also nicht sechs Monate warten, wenn absehbar ist, dass die Verschlechterung bleibt, etwa nach einem Schlaganfall mit Lähmung. Vorübergehende Verschlechterungen, etwa ein akuter Schub, der abklingt, rechtfertigen keinen höheren GdB. Die Befunde sollten die Dauer belegen.' },
      { q: 'Ab wann gilt der höhere GdB nach einem Verschlimmerungsantrag?', a: 'Nach § 48 Absatz 1 Satz 2 Nummer 1 SGB X soll der alte Bescheid ab dem Zeitpunkt der Änderung aufgehoben werden, wenn die Änderung zu Ihren Gunsten ist. Belegen Ihre Befunde, dass die Verschlechterung schon vor dem Antrag eingetreten ist, kann der höhere GdB also auch für die Zeit davor gelten. Ohne solche Nachweise lässt sich ein früherer Zeitpunkt kaum begründen.' },
      { q: 'Prüft die Behörde bei einem Verschlimmerungsantrag alle Leiden neu?', a: 'Ja. Der GdB beschreibt die Gesamtbeeinträchtigung, deshalb bewertet die Behörde jede Funktionsbeeinträchtigung nach dem heutigen Stand. Hat sich ein anderes Leiden gebessert, etwa nach einer Operation oder einer erfolgreichen Therapie, setzt sie es niedriger an. Am Ende kann der Gesamt-GdB gleich bleiben oder sogar sinken. Prüfen Sie vor dem Antrag ehrlich, wie sich jedes einzelne Leiden entwickelt hat.' },
      { q: 'Reicht eine neue Diagnose für einen höheren GdB?', a: `Nein. Bewertet wird nicht die Diagnose, sondern die Funktionsbeeinträchtigung. Eine neue Erkrankung, die mit 10 bewertet wird, erhöht den Gesamt-GdB nach Teil A Nummer 3.5 in der Regel nicht: Aus GdB ${fall3Alt.richt} wird nach dem Rechner mit einem zusätzlichen Hautleiden von 10 weiterhin ${fall3Neu.richt}. Auch ein Leiden mit 20 hebt vielfach nicht an. Erst eine Änderung um wenigstens 10 im Gesamt-GdB ist wesentlich.` },
      { q: 'Worin unterscheiden sich Verschlimmerungsantrag und Überprüfungsantrag?', a: `Der Verschlimmerungsantrag nach § 48 SGB X setzt voraus, dass sich die Verhältnisse nach dem Bescheid geändert haben. Der Überprüfungsantrag nach § 44 SGB X greift, wenn der Bescheid schon bei Erlass falsch war, etwa weil ein Befund übersehen wurde; er wirkt bis zu ${V.ueberpruefung_jahre} Jahre zurück. Ist der Bescheid noch keinen Monat alt, ist der Widerspruch der richtige Weg. Alle drei können sich ergänzen.` },
    ],
    body: (h) => `
<h2>Wann eine Änderung wesentlich ist</h2>
<p>Ein Bescheid über den GdB ist ein Verwaltungsakt mit Dauerwirkung. Ändern sich die Verhältnisse wesentlich, ist er nach ${h.src('sgb10_48', '§ 48 SGB X')} aufzuheben. Was im Schwerbehindertenrecht als wesentlich gilt, bestimmt Teil A Nummer 7 der ${h.src('versmedv', 'Versorgungsmedizinischen Grundsätze')}.</p>
${h.table(['Fall', 'Wesentlich nach Teil A Nr. 7?'], [
  ['Verschlechterung, die länger als sechs Monate besteht oder bestehen wird, GdB steigt um 10 oder mehr', 'ja'],
  ['Verschlechterung für einige Wochen, etwa ein Schub, der abklingt', 'nein'],
  ['Neues Leiden, das den Gesamt-GdB nicht um 10 erhöht', 'nein'],
  ['Voraussetzungen eines Merkzeichens neu erfüllt, etwa G nach Verkürzung der Gehstrecke', 'ja, auch bei gleichem GdB'],
  ['Voraussetzungen eines Merkzeichens entfallen', 'ja, Merkzeichen kann entzogen werden'],
  ['Heilungsbewährung abgelaufen, Symptome unverändert', 'ja, Neubewertung zulässig'],
], 'Wesentliche Änderung nach VersMedV Teil A Nr. 7', ['l', 'l'])}
<p>Die Tabelle zeigt, dass die Regel in beide Richtungen wirkt. Dieselbe Vorschrift, die Ihnen einen höheren GdB ermöglicht, erlaubt der Behörde, ihn zu senken, wenn sich Leiden gebessert haben oder eine Heilungsbewährung abgelaufen ist. Das betrifft besonders Krebserkrankungen; mehr dazu unter ${h.a('gdb-krebs', 'GdB bei Krebs')}.</p>
<h2>Drei Fälle, gerechnet</h2>
<p><strong>Neues Herzleiden.</strong> Ein Mann hat seit Jahren GdB ${fall1Alt.richt} wegen eines Kniegelenks. Nach einem Herzinfarkt bleibt eine eingeschränkte Belastbarkeit, die mit 30 bewertet wird. Weil Herz und Knie zusammen das Gehen stärker einschränken, rechnet der Rechner mit ${fall1Neu.min} bis ${fall1Neu.max}, Richtwert ${fall1Neu.richt}. Das ist eine wesentliche Änderung; ab ${S.schwerbehinderung} kommen Ausweis, Zusatzurlaub und Kündigungsschutz hinzu.</p>
<p><strong>Eines schlechter, eines besser.</strong> Eine Frau hat GdB ${fall2Alt.richt} aus einem Diabetes mit 40 und einem Rückenleiden mit 30. Sie beantragt die Neufeststellung, weil der Rücken schlechter geworden ist und jetzt 40 trägt. Inzwischen ist ihr Diabetes mit einer anderen Therapie aber so eingestellt, dass er nur noch mit 20 bewertet wird. Der Rechner ergibt ${fall2Neu.min} bis ${fall2Neu.max}, Richtwert ${fall2Neu.richt}: Statt des erhofften höheren Werts kann der Antrag den GdB senken, im günstigsten Fall bleibt er bei ${fall2Neu.max}.</p>
<p><strong>Ein leichtes neues Leiden.</strong> Ein Mann mit GdB ${fall3Alt.richt} wegen einer Depression meldet eine neue Hauterkrankung, bewertet mit 10. Nach Teil A Nummer 3.5 führen Leiden mit 10 von Ausnahmen abgesehen nicht zu einer Erhöhung; der Rechner bleibt bei ${fall3Neu.richt}. Ein Antrag allein deshalb bringt nichts.</p>
<p>Mit dem kleinen Rechner prüfen Sie zwei Einzelwerte und ihren Zusammenhang; für mehrere Leiden nutzen Sie den ${h.a('home', 'Gesamt-GdB-Rechner')}.</p>
<h2>Das Risiko der Herabsetzung</h2>
<p>Bevor Sie den Antrag stellen, gehen Sie jede Funktionsbeeinträchtigung aus dem letzten Bescheid durch und fragen sich, ob sie heute besser, gleich oder schlechter ist. Haben Sie seit dem Bescheid eine Operation mit gutem Ergebnis gehabt, eine Therapie erfolgreich abgeschlossen oder Gewicht verloren, das die Gelenke entlastet, kann die Behörde diese Leiden niedriger ansetzen. Wer schwerbehindert ist und knapp über ${S.schwerbehinderung} liegt, riskiert damit seinen Status.</p>
<p>Sinkt der GdB unter ${S.schwerbehinderung}, enden die besonderen Rechte nicht sofort. Nach ${h.src('sgb9_199', '§ 199 SGB IX')} gelten sie bis zum Ende des dritten Kalendermonats, nachdem der Bescheid unanfechtbar geworden ist. Für die Altersrente für schwerbehinderte Menschen zählt der GdB am Tag des Rentenbeginns; das Rentenalter nach Jahrgang zeigt der Rechner unter diesem Absatz.</p>
<!--mini:rente-->
<p>Ist die Herabsetzung aus Ihrer Sicht falsch, legen Sie ${h.a('widerspruch-gdb', 'Widerspruch')} ein; solange er läuft, wird der Bescheid nicht unanfechtbar.</p>
<h2>Der Antrag in der Praxis</h2>
<p>Den Antrag stellen Sie bei der Behörde, die den letzten Bescheid erlassen hat, in vielen Ländern mit demselben Formular wie beim Erstantrag, gekennzeichnet als Antrag auf Neufeststellung. Nennen Sie, welches Leiden sich seit wann verschlechtert hat und welche Leiden neu hinzugekommen sind, und fügen Sie aktuelle Befunde bei, die die Folgen im Alltag beschreiben. Beantragen Sie Merkzeichen ausdrücklich mit, wenn ihre Voraussetzungen jetzt vorliegen könnten, etwa ${h.a('merkzeichen-g', 'G')} nach einer Verkürzung der Gehstrecke. Der Ausweis wird nach § 152 Absatz 5 SGB IX berichtigt, sobald die Neufeststellung unanfechtbar ist.</p>
<p>Eine Frist für den Verschlimmerungsantrag gibt es nicht. Sie können ihn stellen, sobald die Änderung voraussichtlich länger als sechs Monate dauert, und wiederholen, wenn sich später erneut etwas ändert. Steht schon fest, dass der alte Bescheid von Anfang an falsch war, ist der Überprüfungsantrag nach ${h.src('sgb10_44', '§ 44 SGB X')} der passende Weg; er wirkt bis zu ${V.ueberpruefung_jahre} Jahre zurück.</p>
`,
  },
});
