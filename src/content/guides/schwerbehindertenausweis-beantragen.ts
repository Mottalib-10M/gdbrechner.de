import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

/**
 * Antrag auf Feststellung von GdB und Merkzeichen und auf den Ausweis: § 152 SGB IX, § 14 und § 17 SGB IX,
 * § 65 Abs. 3a EStDV. Zuständige Stellen je Land aus research/fakten.md Nr. 9 (Stand 20.10.2026); nicht
 * geprüfte Angaben stehen nur als Gattungsname, Links nur über amtliche Quellen in params (zbfs, nrw).
 */
const V = P.verfahren;
const S = P.schwelle;

export default defineGuide({
  id: 'schwerbehindertenausweis-beantragen',
  group: 'ausweis',
  order: 420,
  mini: 'stufe',
  miniDefaults: { g: 50 },
  miniHref: 'home',
  related: ['schwerbehindertenausweis', 'schwerbehindertenausweis-vorteile', 'widerspruch-gdb', 'merkzeichen', 'kuendigungsschutz-schwerbehinderung', 'gdb-50'],
  sources: ['sgb9_152', 'sgb9_14', 'estdv65', 'zbfs', 'nrw', 'schwbawv6'],
  de: {
    slug: 'schwerbehindertenausweis-beantragen',
    nav: 'Ausweis beantragen',
    card: 'Welche Behörde in welchem Land zuständig ist, wo es den Online-Antrag gibt, was in den Antrag gehört und welche Fristen die Behörde einhalten muss.',
    title: 'Schwerbehindertenausweis beantragen 2026: Ablauf, Ämter',
    description: `Schwerbehindertenausweis beantragen 2026: zuständige Behörde je Bundesland, Online-Antrag, Unterlagen, Steuer-ID und die Frist von ${V.entscheidung_ohne_gutachten_wochen} Wochen für Berufstätige.`,
    h1: 'Grad der Behinderung und Schwerbehindertenausweis beantragen',
    intro: 'Der Antrag auf GdB, Merkzeichen und Ausweis ist ein einziges Verfahren; wer ihn gut vorbereitet, verkürzt die Wartezeit und vermeidet einen zu niedrigen Bescheid.',
    resume: `Den Schwerbehindertenausweis beantragen Sie zusammen mit der Feststellung des Grades der Behinderung bei der Behörde, die Ihr Land dafür bestimmt hat. Das sind je nach Land ein Landesamt, wie das ZBFS in Bayern oder das LAGeSo in Berlin, oder die Kreise und kreisfreien Städte, wie in Nordrhein-Westfalen und Sachsen; in vielen Ländern gibt es einen Online-Antrag. Die Behörde stellt nach § 152 SGB IX den GdB zum Zeitpunkt des Antrags fest, auf begründeten Antrag auch für einen früheren Zeitpunkt, und trifft im selben Verfahren die Entscheidung über Merkzeichen. Eine Feststellung gibt es ab GdB ${S.min_gdb}, den Ausweis ab GdB ${S.schwerbehinderung}. Für Berufstätige, die die Schwerbehinderung feststellen lassen wollen, gelten Fristen: ohne Gutachten Entscheidung innerhalb von ${V.entscheidung_ohne_gutachten_wochen} Wochen, mit Gutachten innerhalb von zwei Wochen nach dessen Eingang. In der Praxis dauert es länger; Berlin nennt auf seiner Serviceseite eine durchschnittliche Bearbeitungszeit von fünf bis sechs Monaten. Seit 2026 sollten Sie Ihre Steuer-Identifikationsnummer angeben, damit die Behörde den GdB elektronisch an das Finanzamt meldet.`,
    faqs: [
      { q: 'Kann ich den Antrag auf Feststellung online stellen?', a: 'In den meisten Ländern ja. Einen Online-Antrag bieten nach unserer Prüfung im Oktober 2026 unter anderem Bayern, Brandenburg, Bremen, Hamburg, Hessen, Mecklenburg-Vorpommern, Niedersachsen, Nordrhein-Westfalen, Rheinland-Pfalz und das Saarland an. In Berlin ist der Antrag auf Papier vorgesehen, Unterlagen lassen sich online nachreichen. Für die übrigen Länder fragen Sie bei der zuständigen Stelle nach; der Papierantrag ist überall möglich.' },
      { q: 'Welche Behörde ist in Nordrhein-Westfalen zuständig?', a: 'In Nordrhein-Westfalen stellen die Kreise und kreisfreien Städte den GdB fest und stellen auch den Ausweis aus. Zuständig ist also das Amt Ihres Kreises oder Ihrer Stadt, nicht ein Landesamt. Den Antrag können Sie über das Landesportal ELSA.NRW online stellen. Eine Übersicht mit Formularen bietet das Inklusionsportal des Ministeriums für Arbeit, Gesundheit und Soziales.' },
      { q: 'Warum fragt die Behörde nach meiner Steuer-Identifikationsnummer?', a: 'Weil das Finanzamt den Pauschbetrag seit 2026 nur noch auf Grundlage einer elektronischen Mitteilung berücksichtigt. Nach § 65 Absatz 3a EStDV übermittelt die Behörde ihre Feststellungen auf Ihren Antrag an das Finanzamt; dafür braucht sie Ihre Identifikationsnummer. Ohne diese Angabe kann die Steuerermäßigung ausbleiben. Bescheide und Ausweise, die vor 2026 ausgestellt wurden, gelten weiter, bis sich die Feststellungen ändern.' },
      { q: 'Kann der GdB auch rückwirkend festgestellt werden?', a: 'Ja, auf Antrag. Grundsätzlich stellt die Behörde den GdB ab dem Tag des Antrags fest. Nach § 152 Absatz 1 Satz 2 SGB IX kann sie feststellen, dass GdB oder Merkzeichen schon früher vorlagen, wenn Sie ein besonderes Interesse glaubhaft machen, etwa für die Steuer früherer Jahre. Legen Sie dafür Befunde aus der betreffenden Zeit bei und begründen Sie, wofür Sie die frühere Feststellung brauchen.' },
      { q: 'Was passiert, wenn ich angeforderte Unterlagen nicht schicke?', a: `Dann verzögert sich das Verfahren, und die Fristen für Berufstätige laufen nicht zu Ihren Gunsten. § 152 Absatz 1 verweist auf die Mitwirkungspflicht nach § 60 SGB I. Für den Kündigungsschutz kann das entscheidend sein: Nach § 173 Absatz 3 SGB IX greift er nicht, wenn die Behörde wegen fehlender Mitwirkung nicht innerhalb der Frist entscheiden konnte. Reagieren Sie deshalb schnell auf Rückfragen.` },
      { q: 'Wer stellt in Sachsen-Anhalt seit April 2026 den GdB fest?', a: 'Seit dem 1. April 2026 nimmt das neu gegründete Landesamt für Soziales, Jugend und Gesundheit in Halle die Aufgaben wahr, die vorher beim Landesverwaltungsamt lagen. Das teilt das Land auf der Seite des Landesverwaltungsamts mit. Die Antragsformulare stehen weiter als PDF zur Verfügung; einen Online-Antrag haben wir für Sachsen-Anhalt nicht gefunden. Zuständig ist die Stelle für Ihren Wohnort.' },
    ],
    body: (h) => `
<h2>Wer zuständig ist</h2>
<p>Das Gesetz überträgt die Feststellung den Behörden, die das Soziale Entschädigungsrecht durchführen, und erlaubt den Ländern, die Zuständigkeit abweichend zu regeln (${h.src('sgb9_152', '§ 152 Abs. 1 SGB IX')}). Deshalb ist es in jedem Land anders. Umgangssprachlich heißt die Stelle oft weiter „Versorgungsamt“, auch wenn sie heute anders benannt ist.</p>
${h.table(['Land', 'Zuständige Stelle', 'Online-Antrag'], [
  ['Baden-Württemberg', 'Versorgungsamt', 'nicht geprüft'],
  ['Bayern', 'Zentrum Bayern Familie und Soziales (ZBFS)', 'ja'],
  ['Berlin', 'Landesamt für Gesundheit und Soziales (LAGeSo)', 'Formular; online nur Nachreichung von Unterlagen'],
  ['Brandenburg', 'Landesamt für Soziales und Versorgung (LASV)', 'ja'],
  ['Bremen', 'Amt für Versorgung und Inklusion Bremen (AVIB)', 'ja'],
  ['Hamburg', 'Versorgungsamt Hamburg (Sozialbehörde)', 'ja'],
  ['Hessen', 'Hessisches Amt für Versorgung und Soziales des Wohnorts', 'ja'],
  ['Mecklenburg-Vorpommern', 'Landesamt für Gesundheit und Soziales (LAGuS)', 'ja'],
  ['Niedersachsen', 'Außenstelle des Landesamts für Soziales, Jugend und Familie', 'ja, mit BundID'],
  ['Nordrhein-Westfalen', 'Kreis oder kreisfreie Stadt', 'ja, ELSA.NRW'],
  ['Rheinland-Pfalz', 'Landesamt für Soziales, Jugend und Versorgung (LSJV)', 'ja'],
  ['Saarland', 'Landesamt für Soziales, Abteilung Schwerbehinderung', 'ja'],
  ['Sachsen', 'Landkreis oder kreisfreie Stadt', 'nicht geprüft'],
  ['Sachsen-Anhalt', 'Landesamt für Soziales, Jugend und Gesundheit (seit 1.4.2026)', 'nicht gefunden, PDF-Formular'],
  ['Schleswig-Holstein', 'Landesamt für Arbeitsschutz, Soziales und Gesundheit (LASG)', 'nicht geprüft'],
  ['Thüringen', 'Versorgungsamt beim Landesverwaltungsamt', 'nicht geprüft'],
], 'Zuständige Stellen für GdB und Ausweis, geprüft an Landesseiten am 20.10.2026', ['l', 'l', 'l'])}
<p>„Nicht geprüft“ heißt: Die Landesseite war bei unserer Prüfung nicht lesbar oder nannte keinen Online-Weg. Fragen Sie in diesen Ländern bei Ihrer Stadt- oder Kreisverwaltung nach der zuständigen Stelle. Amtliche Übersichten mit Formularen bieten zum Beispiel das ${h.src('zbfs', 'ZBFS in Bayern')} und das ${h.src('nrw', 'Inklusionsportal NRW')}. Zuständig ist immer die Stelle Ihres Wohnorts.</p>
<h2>Was in den Antrag gehört</h2>
<p>Die Formulare der Länder unterscheiden sich, fragen aber dieselben Punkte ab. Je genauer Sie sie ausfüllen, desto weniger muss die Behörde nachfragen.</p>
<p><strong>Alle Gesundheitsstörungen.</strong> Nennen Sie jede Erkrankung, die Sie dauerhaft, also länger als sechs Monate, beeinträchtigt, auch scheinbar kleine. Die Behörde bewertet nur, was Sie angeben. Schreiben Sie dazu, wie sich das Leiden im Alltag auswirkt.</p>
<p><strong>Ärzte und Kliniken.</strong> Geben Sie alle behandelnden Ärztinnen und Ärzte, Kliniken und Reha-Einrichtungen der letzten Jahre an und entbinden Sie sie von der Schweigepflicht. Die Behörde fordert dort Befundberichte an.</p>
<p><strong>Eigene Unterlagen.</strong> Aktuelle Arztbriefe, Entlassungsberichte, Reha-Berichte und ein vorhandenes Pflegegutachten beschleunigen die Bearbeitung, besonders wenn sie Funktionseinschränkungen mit Messwerten beschreiben.</p>
<p><strong>Merkzeichen.</strong> Kreuzen Sie jedes Merkzeichen an, dessen Voraussetzungen Sie für möglich halten, etwa G, B oder RF. Die Behörde prüft Merkzeichen nur, wenn Sie sie beantragen. Die Voraussetzungen jedes Merkzeichens erklärt die Seite ${h.a('merkzeichen', 'Merkzeichen')}.</p>
<p><strong>Ausweis und Steuer-ID.</strong> Kreuzen Sie an, dass Sie einen Ausweis möchten, wenn Sie einen GdB von ${S.schwerbehinderung} oder mehr erwarten, und geben Sie Ihre Steuer-Identifikationsnummer an (${h.src('estdv65', '§ 65 Abs. 3a EStDV')}).</p>
<p><strong>Früherer Zeitpunkt.</strong> Wenn Sie eine Feststellung für die Vergangenheit brauchen, beantragen Sie sie ausdrücklich und begründen Sie das besondere Interesse.</p>
<h2>Fristen und tatsächliche Dauer</h2>
<p>Für erwerbstätige Menschen, die die Schwerbehinderung feststellen lassen, verweist § 152 Absatz 1 Satz 3 SGB IX auf die Fristen des Rehabilitationsrechts (${h.src('sgb9_14', '§ 14 Abs. 2 SGB IX')}). Muss kein Gutachten eingeholt werden, soll die Behörde innerhalb von ${V.entscheidung_ohne_gutachten_wochen} Wochen nach Eingang des Antrags entscheiden. Braucht sie ein Gutachten, soll der Gutachter es innerhalb von zwei Wochen nach dem Auftrag erstellen, und die Entscheidung folgt innerhalb von zwei Wochen nach Eingang des Gutachtens. Für Menschen, die nicht erwerbstätig sind, nennt das Gesetz keine solche Frist.</p>
<p>Die Wirklichkeit sieht oft anders aus. Das Land Berlin gibt für seine Behörde eine durchschnittliche Bearbeitungszeit von fünf bis sechs Monaten an. Der GdB gilt trotzdem ab dem Tag des Antrags, und auch der Ausweis beginnt mit diesem Datum (${h.src('schwbawv6', '§ 6 SchwbAwV')}). Für Beschäftigte ist das Antragsdatum außerdem für den ${h.a('kuendigungsschutz-schwerbehinderung', 'Kündigungsschutz')} wichtig: Wer den Antrag früh genug vor einer Kündigung stellt und mitwirkt, ist geschützt, auch wenn der Bescheid erst später kommt.</p>
<h2>Nach dem Antrag</h2>
<p>Die Behörde holt Befundberichte ein und lässt sie von einem versorgungsärztlichen Dienst auswerten, nach Aktenlage oder nach einer Untersuchung. Bei fehlenden Unterlagen schreibt sie Sie an; antworten Sie zügig. Am Ende erhalten Sie einen Bescheid mit dem Gesamt-GdB, den Merkzeichen und einer Begründung, in der die einzelnen Funktionsbeeinträchtigungen mit ihren Einzelwerten stehen. Prüfen Sie diese Liste sofort: Fehlt ein Leiden oder ist ein Wert zu niedrig angesetzt, bleibt ein Monat für den ${h.a('widerspruch-gdb', 'Widerspruch')}.</p>
<p>Mit dem Ausweis, wenn Sie ihn beantragt haben, kommen die Rechte, die die Seite ${h.a('schwerbehindertenausweis-vorteile', 'Vorteile des Ausweises')} zusammenstellt. Für die Wertmarke stellen Sie bei derselben Behörde einen eigenen Antrag. Bevor Sie den Antrag abschicken, können Sie mit dem kleinen Rechner auf dieser Seite sehen, welche Rechte zu welcher GdB-Stufe gehören; mit dem ${h.a('home', 'Gesamt-GdB-Rechner')} schätzen Sie, wohin mehrere Leiden zusammen führen.</p>
`,
  },
});
