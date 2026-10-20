import { defineGuide } from '../../lib/guide-types';
import { pauschbetrag } from '../../lib/engine/rechte';
import { steuerwirkung } from '../../lib/engine/steuer';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { eintrag } from '../../lib/engine/tabelle';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

/**
 * GdB 40: höchste Stufe unter der Schwerbehinderung. Eigene Beispiele: Ersparnis bei 42.000 € mit 8 % Kirchensteuer,
 * Abstand zu GdB 50 in Euro, Kombinationen 30 + 30 und 40 + 20, Teil-B-Werte von 40.
 */
const S = P.schwelle;
const eur = (x: number) => formatMoney(x, 0, 'de');
const tb = (id: string, teil: string) => {
  const s = eintrag(id)!.stufen.find((x) => x.text.includes(teil))!;
  return s.von === s.bis ? String(s.von) : `${s.von} bis ${s.bis}`;
};
const pb = pauschbetrag(40);
const pb50 = pauschbetrag(S.schwerbehinderung);
const s42 = steuerwirkung({ zve: 42000, splitting: false, kirche: 0.08, pauschbetrag: pb, fahrtkosten: 0, weitereAgB: 0, kinder: 0 });
const s42b = steuerwirkung({ zve: 42000, splitting: false, kirche: 0.08, pauschbetrag: pb50, fahrtkosten: 0, weitereAgB: 0, kinder: 0 });
const dreissig = gesamtGdb([{ system: 'wirbelsaeule', gdb: 30 }, { system: 'psyche', gdb: 30, beziehung: 'unabhaengig' }]);
const vierzig20 = gesamtGdb([{ system: 'beine', gdb: 40 }, { system: 'stoffwechsel', gdb: 20, beziehung: 'unabhaengig' }]);
const vierzig30 = gesamtGdb([{ system: 'beine', gdb: 40 }, { system: 'wirbelsaeule', gdb: 30, beziehung: 'nachteilig' }]);

export default defineGuide({
  id: 'gdb-40',
  group: 'stufen',
  order: 240,
  mini: 'stufe',
  miniDefaults: { g: 40 },
  miniHref: 'home',
  related: ['gdb-50', 'gleichstellung', 'verschlimmerungsantrag', 'gdb-30', 'widerspruch-gdb'],
  sources: ['sgb9_2', 'sgb9_151', 'estg33b', 'versmedv', 'sgb10_48'],
  de: {
    slug: 'gdb-40',
    nav: 'GdB 40',
    card: 'Knapp unter der Schwerbehinderung: Pauschbetrag, Gleichstellung und was zwischen 40 und 50 an Rechten und Euro liegt.',
    title: 'GdB 40 Vorteile 2026: knapp unter Schwerbehinderung',
    description: `GdB 40 Vorteile 2026: Pauschbetrag ${eur(pb)}, Gleichstellung möglich, aber kein Ausweis und kein Zusatzurlaub. Was der Schritt auf GdB 50 zusätzlich bringen würde.`,
    h1: 'GdB 40: was fehlt bis zur Schwerbehinderung',
    intro: 'GdB 40 liegt eine Stufe unter der Schwerbehinderung; dieser Ratgeber zeigt, was die Stufe bringt und was der Schritt auf 50 ändern würde.',
    resume: `Mit einem Grad der Behinderung von 40 sind Sie behindert, aber nicht schwerbehindert, denn die Schwerbehinderung beginnt nach § 2 Absatz 2 SGB IX bei ${S.schwerbehinderung}. Zustehen Ihnen der Behinderten-Pauschbetrag von ${eur(pb)} im Jahr und, wenn der Arbeitsplatz wegen der Behinderung gefährdet ist, die Gleichstellung durch die Agentur für Arbeit mit dem besonderen Kündigungsschutz. Es fehlen Ausweis, Zusatzurlaub, Altersrente für schwerbehinderte Menschen und alle Merkzeichen-Vorteile. Steuerlich ist der Abstand klein: Bei ${eur(42000)} zu versteuerndem Einkommen und 8 Prozent Kirchensteuer spart GdB 40 rund ${eur(s42.ersparnis)}, GdB ${S.schwerbehinderung} rund ${eur(s42b.ersparnis)}. Der eigentliche Unterschied liegt im Beruf und bei der Rente. Typische Einzelwerte von 40 sind nach Teil B eine Bewegungseinschränkung beider Kniegelenke mittleren Grades oder der Verlust beider Brüste. Zwei Leiden mit je 30, die verschiedene Lebensbereiche betreffen, ergeben nach diesem Rechner meist ${dreissig.richt}.`,
    faqs: [
      { q: 'Wie komme ich von GdB 40 auf GdB 50?', a: `Nur über eine neue Bewertung: mit einem Widerspruch, solange der Bescheid nicht bestandskräftig ist, oder später mit einem Verschlimmerungsantrag, wenn sich der Zustand wesentlich verschlechtert hat oder ein neues Leiden hinzugekommen ist. Wesentlich heißt nach Teil A Nummer 7 der Verordnung eine Änderung um mindestens 10, die länger als sechs Monate anhält. Neue Befundberichte sind dafür die Grundlage.` },
      { q: 'Kann ein Verschlimmerungsantrag den GdB 40 auch senken?', a: 'Ja, das ist möglich. Die Behörde prüft bei einem Neufeststellungsantrag nach § 48 SGB X den gesamten Gesundheitszustand, nicht nur das verschlechterte Leiden. Hat sich ein anderes Leiden gebessert, etwa nach einer Operation, kann der Gesamtwert gleich bleiben oder sinken. Prüfen Sie deshalb vor dem Antrag, ob sich wirklich insgesamt mehr Einschränkungen ergeben als beim letzten Bescheid.' },
      { q: 'Bekommt man mit GdB 40 Merkzeichen G?', a: `In der Regel nicht. Die Nachteilsausgleiche des Merkzeichens G, also Freifahrt und Kfz-Steuerermäßigung, setzen nach §§ 228 und 229 SGB IX die Schwerbehinderung voraus. Teil D der Verordnung erlaubt zwar, ein Beinleiden unter 50 bei der Prüfung von G zu berücksichtigen, etwa eine Hüftversteifung; der Gesamt-GdB muss aber mindestens ${S.schwerbehinderung} betragen.` },
      { q: 'Wie viel Geld macht der Unterschied zwischen 40 und 50 aus?', a: `Beim Pauschbetrag ${eur(pb50 - pb)} im Jahr, was bei mittlerem Einkommen etwa ${eur(s42b.ersparnis - s42.ersparnis)} Steuern entspricht. Mehr wert sind die Rechte, die erst ab ${S.schwerbehinderung} gelten: ${P.urlaub.tage_bei_5} Tage Zusatzurlaub bei der Fünftagewoche und die frühere Altersrente. Für jemanden kurz vor dem Rentenalter kann dieser Unterschied Jahre bedeuten.` },
      { q: 'Lohnt sich bei GdB 40 die Gleichstellung?', a: 'Wenn Sie angestellt sind und Ihr Arbeitsplatz wegen der Behinderung unsicher ist, oft ja: Mit der Gleichstellung braucht jede Kündigung durch den Arbeitgeber die Zustimmung des Integrationsamts, und das Integrationsamt kann den Arbeitsplatz mit Hilfen fördern. Zusatzurlaub bringt sie nicht. Wer selbstständig ist, verbeamtet auf Lebenszeit ohne Wechselabsicht oder bereits in Rente, hat davon wenig.' },
    ],
    body: (h) => `
<h2>Rechte mit GdB 40 und der Abstand zu 50</h2>
${h.table(['Recht', 'GdB 40', 'GdB 50'], [
  ['Behinderten-Pauschbetrag', h.eur(pb), h.eur(pb50)],
  [`Steuerersparnis bei ${h.eur(42000)}, 8 % KiSt`, h.eur(s42.ersparnis), h.eur(s42b.ersparnis)],
  ['Kündigungsschutz', 'nur mit Gleichstellung', 'ja'],
  ['Zusatzurlaub', 'nein', `${P.urlaub.tage_bei_5} Tage`],
  ['Ausweis', 'nein', 'ja'],
  ['Altersrente schwerbehindert', 'nein', 'ja, § 37 SGB VI'],
], 'GdB 40 und GdB 50 im Vergleich, Stand 2026', ['l', 'r', 'r'])}
<p>Bei der Steuer liegen 40 und 50 nah beieinander. Der Pauschbetrag steigt um ${h.eur(pb50 - pb)}, die Ersparnis im Beispiel um ${h.eur(s42b.ersparnis - s42.ersparnis)}. Der große Sprung liegt bei den Rechten, die das Gesetz an die Schwerbehinderung knüpft. Wer berufstätig ist, gewinnt mit 50 eine Woche bezahlten Urlaub im Jahr; wer auf die Rente zugeht, kann früher aufhören. Das erklärt, warum so viele Widersprüche gerade gegen einen GdB von 40 gerichtet sind.</p>
<h2>Typische Einzelwerte von 40</h2>
<p>Teil B nennt für viele Leiden genau diesen Wert. Eine Bewegungseinschränkung beider Kniegelenke mittleren Grades ergibt ${tb('knie', 'mittleren Grades, beidseitig')}, eine einseitige Hüfteinschränkung stärkeren Grades ${tb('huefte', 'stärkeren Grades, einseitig')}, die Versteifung eines Hüftgelenks in günstiger Stellung ${tb('hueftversteifung', 'günstiger Stellung')}. Der Verlust beider Brüste wird mit ${tb('brustverlust', 'beidseitig')} bewertet, eine homonyme Hemianopsie, also der Ausfall einer Gesichtsfeldhälfte, mit ${tb('gesichtsfeldausfall', 'Homonyme Hemianopsie')}. Bei Asthma mit häufigen oder schweren Anfällen reicht die Spanne von ${tb('asthma', 'häufigen')}. Wie die Behörde innerhalb einer Spanne entscheidet, hängt von Befunden und Verlauf ab; die ${h.a('gdb-tabelle', 'GdB-Tabelle')} zeigt den Wortlaut.</p>
<h2>Wie 40 aus mehreren Leiden entsteht</h2>
<p>Zwei Leiden mit je 30, die unterschiedliche Lebensbereiche betreffen, etwa ein Rückenleiden und eine Depression, ergeben nach Teil A Nummer 3.3.2 „häufig“ eine Erhöhung. Dieser Rechner nennt ${dreissig.min} bis ${dreissig.max} mit Richtwert ${dreissig.richt}. Für die 50 reicht das in der Regel nicht, denn ein weiteres Leiden erhöht um mindestens 10, nicht um seinen eigenen Wert.</p>
<p>Ein Kniegelenk mit 40 und ein Diabetes mit 20 bleiben nach dem Richtwert bei ${vierzig20.richt}, weil ein Leiden mit 20 den Gesamtwert vielfach nicht erhöht; die Spanne reicht bis ${vierzig20.max}. Kommt zum Kniegelenk mit 40 aber ein Rückenleiden mit 30, das das Gehen zusätzlich erschwert, liegt der Richtwert bei ${vierzig30.richt}. Solche Konstellationen, in denen sich zwei Leiden am selben Lebensbereich verstärken, sind der häufigste Weg von 40 zur Schwerbehinderung. Probieren Sie es mit dem zweiten Rechner aus.</p>
<!--mini:zwei-->
<h2>Gleichstellung bei GdB 40</h2>
<p>Die Gleichstellung beantragen Sie bei der Agentur für Arbeit. Sie verlangt nach § 2 Abs. 3 SGB IX, dass Sie infolge der Behinderung ohne sie einen geeigneten Arbeitsplatz nicht erlangen oder nicht behalten können. Sie wirkt ab dem Tag des Antrags. Einzelheiten zu Antrag, Begründung und Rechten stehen unter ${h.a('gleichstellung', 'Gleichstellung')}; bei ${h.a('gdb-30', 'GdB 30')} gelten dieselben Regeln.</p>
<h2>Widerspruch oder Verschlimmerungsantrag?</h2>
<p>Ist der Bescheid frisch, legen Sie ${h.a('widerspruch-gdb', 'Widerspruch')} innerhalb eines Monats ein; die Frist beginnt mit der Bekanntgabe, bei Post am ${P.verfahren.bekanntgabe_tag}. Tag nach Absendung. Begründen Sie ihn mit Befunden, die die Behörde nicht hatte oder nicht gewürdigt hat. Ist der Bescheid bestandskräftig und hat sich seitdem etwas verschlechtert, stellen Sie einen ${h.a('verschlimmerungsantrag', 'Verschlimmerungsantrag')}. War der Bescheid von Anfang an falsch, gibt es den Überprüfungsantrag nach § 44 SGB X.</p>
<p>In jedem Fall gilt: Die Behörde bewertet Auswirkungen, nicht Diagnosen. Ein Attest, das nur „chronische Schmerzen“ nennt, hilft wenig; ein Bericht, der beschreibt, wie weit Sie gehen können, wie oft Sie ausfallen und welche Therapie nötig ist, hilft viel. Ob die 50 erreichbar ist, entscheidet am Ende der ärztliche Dienst der Behörde.</p>
<h2>Was GdB 40 für Bewerbungen bedeutet</h2>
<p>Im Bewerbungsverfahren müssen Sie einen GdB von 40 nicht angeben. Ohne Gleichstellung knüpfen die besonderen Regeln des Schwerbehindertenrechts für Arbeitgeber nicht an Ihren GdB an, eine Angabe würde Ihnen dort also keine zusätzlichen Rechte verschaffen. Mit Gleichstellung kann die Angabe sinnvoll sein, weil der Arbeitgeber Sie dann auf seine Pflichtquote anrechnen kann. Die Entscheidung liegt bei Ihnen; ein Nachteil darf aus der Behinderung rechtlich nicht folgen.</p>
<h2>Was Sie mit GdB 40 schon jetzt nutzen sollten</h2>
<p>Tragen Sie den Pauschbetrag für jedes Jahr ein, in dem der GdB bestand; für noch offene Steuerbescheide auch rückwirkend. Mehrkosten für Behandlung, Medikamente und Hilfsmittel, die die Kasse nicht trägt, kommen als außergewöhnliche Belastung dazu, soweit sie die zumutbare Belastung übersteigen. Prüfen Sie außerdem, ob Ihr Tarifvertrag oder eine Betriebsvereinbarung Regelungen für Menschen mit Behinderung unter 50 enthält; manche knüpfen an den GdB oder an die Gleichstellung an. Und heben Sie alle Befundberichte auf: Sie sind die Grundlage, wenn Sie später eine höhere Bewertung beantragen.</p>
`,
  },
});
