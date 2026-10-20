import { defineGuide } from '../../lib/guide-types';
import { rechte } from '../../lib/engine/rechte';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

/**
 * Merkzeichen im Schwerbehindertenausweis (SchwbAwV § 3) und die Nachteilsausgleiche, die an ihnen hängen.
 * Beispiele: GdB 70 mit G, GdB 80 mit aG und B, GdB 100 mit Bl und H. Zählung vom Motor.
 */
const eur = (x: number) => formatMoney(x, 0, 'de');
const zaehl = (g: number, m: Parameters<typeof rechte>[1]) => rechte(g, m).filter((r) => ['freifahrt', 'kfz', 'begleitung', 'parken', 'rundfunk', 'fahrtkosten'].includes(r.id) && r.gilt).length;
const g70 = zaehl(70, ['G']);
const ag = zaehl(80, ['aG', 'B']);
const bl = zaehl(100, ['Bl', 'H', 'RF']);

export default defineGuide({
  id: 'merkzeichen',
  group: 'rechner',
  order: 130,
  tool: 'merkzeichen',
  related: ['merkzeichen-g', 'merkzeichen-ag', 'merkzeichen-b', 'merkzeichen-h', 'merkzeichen-bl', 'merkzeichen-rf'],
  sources: ['schwbawv3', 'sgb9_229', 'sgb9_228', 'kraftstg3a', 'rbstv4', 'vwvStvo'],
  de: {
    slug: 'merkzeichen',
    nav: 'Merkzeichen',
    card: 'G, aG, B, H, Bl, TBl, Gl und RF: Voraussetzungen im Wortlaut und welche Vorteile jedes Merkzeichen auslöst.',
    title: 'Merkzeichen 2026: G, aG, B, H, Bl, RF und ihre Vorteile',
    description: `Merkzeichen 2026 im Schwerbehindertenausweis: Voraussetzungen von G, aG, B, H, Bl, TBl, Gl und RF und was sie bringen, von Wertmarke ${eur(P.wertmarke.jahr)} bis Kfz-Steuer.`,
    h1: 'Merkzeichen: was jedes einzelne bringt',
    intro: 'GdB und Merkzeichen wählen: Der Rechner zeigt Freifahrt, Kfz-Steuer, Parkausweis, Begleitperson, Rundfunkbeitrag und Fahrtkosten auf einen Blick.',
    resume: `Merkzeichen sind Buchstaben im Schwerbehindertenausweis, die gesundheitliche Merkmale bestätigen. Sie werden zusammen mit dem GdB beantragt, aber nach eigenen Voraussetzungen geprüft, und an ihnen hängen die meisten Vorteile, die man mit dem Ausweis verbindet. G steht für erheblich gehbehindert und öffnet die Freifahrt im Nahverkehr mit Wertmarke für ${eur(P.wertmarke.jahr)} im Jahr oder die halbe Kfz-Steuer. aG, außergewöhnlich gehbehindert, setzt eine Beeinträchtigung voraus, die einem GdB von 80 entspricht, und bringt den EU-Parkausweis, die Steuerbefreiung fürs Auto und ${eur(P.fahrtkosten.gross)} Fahrtkostenpauschale. B erlaubt eine Begleitperson, die kostenlos mitfährt. H und Bl erhöhen den Pauschbetrag auf ${eur(P.pauschbetrag.erhoeht)} und machen die Wertmarke kostenlos. RF ermäßigt den Rundfunkbeitrag auf ${P.rundfunk.ermaessigt.toLocaleString('de-DE', { minimumFractionDigits: 2 })} € im Monat. Wer GdB 70 mit G hat, erhält ${g70} der sechs Vorteile im Rechner, mit aG und B sind es ${ag}, mit Bl, H und RF ${bl}.`,
    faqs: [
      { q: 'Kann ich ein Merkzeichen nachträglich beantragen?', a: 'Ja, jederzeit mit einem Änderungsantrag bei derselben Behörde. Sie kreuzen das Merkzeichen an und legen Befunde bei, die die Voraussetzung belegen, etwa zur Gehstrecke für G. Die Behörde prüft dann auch den GdB neu; er kann dabei steigen, aber auch sinken, wenn sich Leiden gebessert haben. Wer unsicher ist, fragt vorher nach, ob eine Absenkung droht.' },
      { q: 'Welche Merkzeichen gibt es außer G, aG, B, H, Bl und RF?', a: 'Die Schwerbehindertenausweisverordnung kennt außerdem TBl für taubblinde Menschen, Gl für gehörlose Menschen und „1. Kl.“ für die Benutzung der ersten Wagenklasse mit Fahrkarte der zweiten, wenn die Tarife der Eisenbahnen das vorsehen. Hinzu kommen die Kennzeichnungen VB, EB und „Kriegsbeschädigt“ für Entschädigungsberechtigte.' },
      { q: 'Gelten Merkzeichen auch im Ausland?', a: 'Der EU-Parkausweis für Menschen mit aG oder Bl folgt einem einheitlichen EU-Muster und wird in den Mitgliedstaaten anerkannt, die Regeln vor Ort gelten aber nach dem Recht des jeweiligen Landes. Die Freifahrt mit Wertmarke gilt im deutschen Nahverkehr, nicht im Ausland. Steuer- und Beitragsvorteile hängen an deutschem Recht und gelten nur hier.' },
    ],
    body: (h) => `
<h2>Die Merkzeichen und ihre Vorteile</h2>
${h.table(['Merkzeichen', 'Bedeutung', 'Wichtigste Vorteile'], [
  [h.a('merkzeichen-g', 'G'), 'erheblich gehbehindert', `Freifahrt mit Wertmarke oder halbe Kfz-Steuer; mit GdB 70 ${h.eur(P.fahrtkosten.klein)} Fahrtkosten`],
  [h.a('merkzeichen-ag', 'aG'), 'außergewöhnlich gehbehindert', `EU-Parkausweis, Kfz-Steuerbefreiung, ${h.eur(P.fahrtkosten.gross)} Fahrtkosten`],
  [h.a('merkzeichen-b', 'B'), 'Begleitperson', 'Begleitung fährt in Bus und Bahn kostenlos'],
  [h.a('merkzeichen-h', 'H'), 'hilflos', `Pauschbetrag ${h.eur(P.pauschbetrag.erhoeht)}, Wertmarke kostenlos, Kfz-Steuerbefreiung`],
  [h.a('merkzeichen-bl', 'Bl'), 'blind', `Pauschbetrag ${h.eur(P.pauschbetrag.erhoeht)}, Parkausweis, Wertmarke kostenlos, Landesblindengeld`],
  ['TBl', 'taubblind', 'Pauschbetrag erhöht, Befreiung vom Rundfunkbeitrag'],
  ['Gl', 'gehörlos', 'Freifahrt mit Wertmarke oder halbe Kfz-Steuer'],
  [h.a('merkzeichen-rf', 'RF'), 'Rundfunkbeitrag', 'Beitrag auf ein Drittel ermäßigt'],
], 'Merkzeichen nach § 3 Schwerbehindertenausweisverordnung, Stand 2026', ['l', 'l', 'l'])}
<p>Die Wertmarke kostet ${h.eur(P.wertmarke.jahr)} für zwölf Monate oder ${h.eur(P.wertmarke.halbjahr)} für sechs Monate. Mit G oder Gl müssen Sie wählen: Wer die Wertmarke nimmt, bekommt die halbe Kfz-Steuer nicht, und umgekehrt (§ 228 Abs. 5 SGB IX, § 3a Abs. 2 KraftStG). Wer im Monat mehr als rund ${h.eur(Math.ceil(P.wertmarke.jahr / 12))} für Nahverkehrsfahrkarten ausgibt, fährt mit der Wertmarke meist günstiger.</p>
<!--mini:freifahrt-->
<h2>Wie Merkzeichen festgestellt werden</h2>
<p>Die Behörde prüft Merkzeichen im selben Verfahren wie den GdB, aber nach eigenen Maßstäben aus dem SGB IX und Teil D der Versorgungsmedizinischen Grundsätze. Für G kommt es darauf an, ob Sie Wegstrecken im Ortsverkehr, die üblicherweise zu Fuß gegangen werden, nur mit erheblichen Schwierigkeiten oder Gefahren schaffen; das kann auch an inneren Leiden, Anfällen oder Orientierungsstörungen liegen. Ein hoher GdB allein genügt nicht. Umgekehrt setzt aG nicht die Unfähigkeit zu gehen voraus, sondern eine mobilitätsbezogene Beeinträchtigung, die einem GdB von 80 entspricht. Die genauen Voraussetzungen jedes Merkzeichens stehen im Rechenweg des Rechners.</p>
`,
  },
});
