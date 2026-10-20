import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

/**
 * Besonderer Kündigungsschutz schwerbehinderter und gleichgestellter Menschen: §§ 168 bis 174 und § 178 Abs. 2 SGB IX.
 * Eigene Beispiele: drei Fälle (Kündigung im fünften Monat, Antrag vor und nach der Kündigung), Fristen aus params.
 */
const K = P.kuendigung;
const S = P.schwelle;
const V = P.verfahren;

export default defineGuide({
  id: 'kuendigungsschutz-schwerbehinderung',
  group: 'arbeit',
  order: 510,
  mini: 'kuendigung',
  miniHref: 'home',
  related: ['gleichstellung', 'gdb-50', 'schwerbehindertenausweis-beantragen', 'zusatzurlaub-schwerbehinderung', 'gdb-40'],
  sources: ['sgb9_168', 'sgb9_173', 'sgb9_2', 'sgb9_151', 'sgb9_14'],
  de: {
    slug: 'kuendigungsschutz-schwerbehinderung',
    nav: 'Kündigungsschutz',
    card: 'Wann eine Kündigung die Zustimmung des Integrationsamts braucht, welche Fristen gelten und wann der Schutz trotz Antrag nicht greift.',
    title: 'Kündigungsschutz Schwerbehinderung 2026: Regeln, Fristen',
    description: `Kündigungsschutz bei Schwerbehinderung 2026: Zustimmung des Integrationsamts nach ${K.wartezeit_monate} Monaten, ${K.frist_wochen_min} Wochen Mindestfrist und die Regeln bei laufendem GdB-Antrag.`,
    h1: 'Kündigungsschutz bei Schwerbehinderung',
    intro: 'Schwerbehinderte und gleichgestellte Beschäftigte dürfen nur mit vorheriger Zustimmung des Integrationsamts gekündigt werden; hier stehen Voraussetzungen, Fristen und Lücken.',
    resume: `Nach § 168 SGB IX braucht die Kündigung eines schwerbehinderten Menschen durch den Arbeitgeber die vorherige Zustimmung des Integrationsamts. Das gilt ab einem GdB von ${S.schwerbehinderung} und für Menschen mit GdB ${S.gleichstellung} oder 40, die die Agentur für Arbeit gleichgestellt hat. Der Schutz beginnt, wenn das Arbeitsverhältnis bei Zugang der Kündigung ohne Unterbrechung länger als ${K.wartezeit_monate} Monate besteht (§ 173 Abs. 1 SGB IX). Die Kündigungsfrist beträgt mindestens ${K.frist_wochen_min} Wochen (§ 169). Das Integrationsamt soll innerhalb von ${K.entscheidung_monate} Monat nach Eingang des Antrags entscheiden; bei einer fristlosen Kündigung muss der Arbeitgeber die Zustimmung innerhalb von ${K.ausserordentlich_wochen} Wochen beantragen, und schweigt das Amt ${K.ausserordentlich_wochen} Wochen, gilt sie als erteilt. Ist die Schwerbehinderung bei der Kündigung noch nicht festgestellt, schützt § 173 Abs. 3 nur, wenn der Antrag so früh gestellt war, dass die Behörde in ihrer Frist von ${V.entscheidung_ohne_gutachten_wochen} Wochen hätte entscheiden können. Eine Kündigung ohne Beteiligung der Schwerbehindertenvertretung ist nach § 178 Abs. 2 unwirksam.`,
    faqs: [
      { q: 'Darf mein Arbeitgeber mich trotz Schwerbehinderung kündigen?', a: 'Ja, aber nur mit vorheriger Zustimmung des Integrationsamts. Das Amt prüft, ob die Kündigung mit der Behinderung zusammenhängt und ob es Alternativen gibt, etwa einen anderen Arbeitsplatz oder technische Hilfen. Bei Schließung des Betriebs oder Insolvenz ist sein Ermessen nach § 172 SGB IX stark eingeschränkt. Erst nach der Zustimmung darf der Arbeitgeber kündigen.' },
      { q: 'Gilt der Kündigungsschutz auch in der Probezeit?', a: `Nein, wenn das Arbeitsverhältnis bei Zugang der Kündigung noch nicht länger als ${K.wartezeit_monate} Monate ohne Unterbrechung besteht. Das ist unabhängig davon, wie die Probezeit im Vertrag geregelt ist. Der Arbeitgeber muss eine solche Kündigung dem Integrationsamt aber innerhalb von vier Tagen anzeigen (§ 173 Abs. 4 SGB IX). Die Schwerbehindertenvertretung ist auch in diesem Fall zu beteiligen.` },
      { q: 'Was gilt, wenn mein GdB-Antrag bei der Kündigung noch läuft?', a: `Dann kommt es auf den Zeitpunkt des Antrags an. Nach § 173 Abs. 3 SGB IX greift der Schutz nicht, wenn die Schwerbehinderung bei der Kündigung nicht nachgewiesen ist oder die Behörde wegen fehlender Mitwirkung nicht in der Frist entscheiden konnte. War der Antrag mindestens ${V.entscheidung_ohne_gutachten_wochen} Wochen vor der Kündigung gestellt und haben Sie mitgewirkt, sind Sie in der Regel geschützt, auch wenn der Bescheid später kommt.` },
      { q: 'Wie lange darf das Integrationsamt für die Entscheidung brauchen?', a: `Bei einer ordentlichen Kündigung soll es innerhalb von ${K.entscheidung_monate} Monat nach Eingang des Antrags entscheiden (§ 171 SGB IX). Bei einer außerordentlichen Kündigung hat es ${K.ausserordentlich_wochen} Wochen; entscheidet es nicht, gilt die Zustimmung als erteilt (§ 174). Nach Zustellung der Zustimmung muss der Arbeitgeber eine ordentliche Kündigung innerhalb eines Monats erklären, sonst ist die Zustimmung verbraucht.` },
      { q: 'Hilft der Kündigungsschutz bei einem Aufhebungsvertrag?', a: 'Nein. Der besondere Schutz gilt nur für Kündigungen durch den Arbeitgeber. Einen Aufhebungsvertrag oder eine eigene Kündigung prüft das Integrationsamt nicht, und auch das Ende eines befristeten Vertrags ist keine Kündigung. Wer einen Aufhebungsvertrag angeboten bekommt, sollte vor der Unterschrift prüfen lassen, ob er damit auf einen Schutz verzichtet, den er sonst hätte.' },
    ],
    body: (h) => `
<h2>Wer geschützt ist</h2>
<p>Den besonderen Kündigungsschutz haben Beschäftigte mit einem festgestellten GdB von mindestens ${S.schwerbehinderung} und Beschäftigte mit GdB ${S.gleichstellung} oder 40, die die Agentur für Arbeit nach § 2 Abs. 3 SGB IX gleichgestellt hat. Die ${h.a('gleichstellung', 'Gleichstellung')} gilt ab dem Tag, an dem der Antrag eingegangen ist. Auf die Größe des Betriebs kommt es nicht an: Anders als beim allgemeinen Kündigungsschutz gilt der besondere Schutz auch in Kleinbetrieben.</p>
${h.table(['Voraussetzung', 'Regel', 'Vorschrift'], [
  ['Schwerbehinderung oder Gleichstellung', `GdB ab ${S.schwerbehinderung}, oder ${S.gleichstellung}/40 mit Bescheid der Agentur`, '§ 2, § 151 SGB IX'],
  ['Dauer des Arbeitsverhältnisses', `länger als ${K.wartezeit_monate} Monate ohne Unterbrechung`, '§ 173 Abs. 1 Nr. 1'],
  ['Nachweis bei Zugang der Kündigung', `festgestellt oder Antrag mindestens ${V.entscheidung_ohne_gutachten_wochen} Wochen vorher`, '§ 173 Abs. 3, § 152 Abs. 1'],
  ['Kündigungsfrist', `mindestens ${K.frist_wochen_min} Wochen`, '§ 169'],
  ['Beteiligung der Schwerbehindertenvertretung', 'vor jeder Kündigung', '§ 178 Abs. 2'],
], 'Voraussetzungen des besonderen Kündigungsschutzes, Stand 2026', ['l', 'l', 'l'])}
<p>Ob der Schutz in Ihrem Fall greift, prüft der kleine Rechner mit drei Angaben.</p>
<h2>Drei Fälle aus der Praxis</h2>
<p><strong>Kündigung im fünften Monat.</strong> Eine Mitarbeiterin mit GdB 60 wird nach vier Monaten und drei Wochen gekündigt. Das Arbeitsverhältnis besteht noch nicht länger als ${K.wartezeit_monate} Monate, die Zustimmung des Integrationsamts ist nicht nötig. Der Arbeitgeber muss die Kündigung aber dem Integrationsamt anzeigen und die Schwerbehindertenvertretung beteiligen. Ohne diese Beteiligung ist die Kündigung unwirksam.</p>
<p><strong>Antrag rechtzeitig gestellt.</strong> Ein Beschäftigter beantragt im März die Feststellung, gibt alle Ärzte an und schickt angeforderte Unterlagen sofort zurück. Im Mai kündigt der Arbeitgeber ohne Zustimmung, im Juli kommt der Bescheid mit GdB 50 rückwirkend ab März. Der Antrag lag mehr als ${V.entscheidung_ohne_gutachten_wochen} Wochen vor der Kündigung, die Verzögerung lag nicht bei ihm; der Schutz greift, die Kündigung ist unwirksam.</p>
<p><strong>Antrag nach der Kündigung.</strong> Wer erst nach Zugang der Kündigung den Antrag stellt, ist für diese Kündigung nicht besonders geschützt, auch wenn der GdB später hoch ausfällt. Deshalb lohnt es sich, den Antrag zu stellen, sobald eine Behinderung absehbar ist, nicht erst, wenn der Arbeitsplatz wackelt.</p>
<h2>Das Verfahren vor dem Integrationsamt</h2>
<p>Der Arbeitgeber beantragt die Zustimmung schriftlich oder elektronisch beim Integrationsamt, das für den Sitz des Betriebs zuständig ist (§ 170 SGB IX). Das Amt holt eine Stellungnahme des Betriebsrats oder Personalrats und der Schwerbehindertenvertretung ein und hört Sie an. Nutzen Sie diese Anhörung: Schildern Sie, wie die Kündigungsgründe mit Ihrer Behinderung zusammenhängen, welche Anpassungen des Arbeitsplatzes möglich wären und welche Folgen der Verlust der Stelle für Sie hätte. Das Integrationsamt soll in jeder Lage des Verfahrens auf eine gütliche Einigung hinwirken.</p>
<p>Die Entscheidung ist eine Ermessensentscheidung. Hängen die Gründe mit der Behinderung zusammen, etwa krankheitsbedingte Fehlzeiten, prüft das Amt besonders genau, ob Hilfen den Arbeitsplatz erhalten können. Bei einer Betriebsschließung oder Insolvenz ist das Ermessen nach § 172 eingeschränkt, ebenso wenn ein anderer angemessener Arbeitsplatz gesichert ist. Gegen die Zustimmung können Sie Widerspruch einlegen, er hat aber keine aufschiebende Wirkung (§ 171 Abs. 4).</p>
<h2>Fristlose Kündigung</h2>
<p>Für eine außerordentliche Kündigung gelten kürzere Fristen (§ 174 SGB IX). Der Arbeitgeber muss die Zustimmung innerhalb von ${K.ausserordentlich_wochen} Wochen beantragen, nachdem er von den maßgeblichen Tatsachen erfahren hat. Das Integrationsamt entscheidet innerhalb von ${K.ausserordentlich_wochen} Wochen; danach gilt die Zustimmung als erteilt. Hat der Grund nichts mit der Behinderung zu tun, soll es zustimmen. Nach der Zustimmung muss die Kündigung unverzüglich erklärt werden.</p>
<h2>Ausnahmen vom Schutz</h2>
<p>§ 173 SGB IX nimmt einige Gruppen aus. Neben der Wartezeit von ${K.wartezeit_monate} Monaten betrifft das bestimmte Stellen, die nach § 156 Abs. 2 nicht als Arbeitsplätze gelten, ältere Beschäftigte, die nach einem Sozialplan eine Abfindung oder vergleichbare Leistung erhalten und der Kündigung nicht widersprechen (Abs. 1 Nr. 3), und witterungsbedingte Entlassungen mit gesicherter Wiedereinstellung (Abs. 2). Wer unter eine dieser Ausnahmen fällt, hat nur den allgemeinen Kündigungsschutz.</p>
<h2>Was Sie nach einer Kündigung tun sollten</h2>
<p>Teilen Sie dem Arbeitgeber sofort mit, dass Sie schwerbehindert oder gleichgestellt sind oder einen Antrag gestellt haben, wenn er das nicht weiß, und belegen Sie es. Prüfen Sie, ob eine Zustimmung des Integrationsamts vorlag und ob die Schwerbehindertenvertretung beteiligt war. Für eine Klage zum Arbeitsgericht gelten kurze Fristen ab Zugang der Kündigung; lassen Sie sich deshalb ohne Zögern von einer Gewerkschaft, einem Sozialverband oder einer Fachanwältin beraten. Wie Sie den GdB feststellen lassen, steht unter ${h.a('schwerbehindertenausweis-beantragen', 'Schwerbehindertenausweis beantragen')}.</p>
`,
  },
});
