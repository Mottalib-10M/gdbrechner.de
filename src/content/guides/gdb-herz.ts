import { defineGuide } from '../../lib/guide-types';
import { eintrag } from '../../lib/engine/tabelle';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { pauschbetrag } from '../../lib/engine/rechte';
import { formatMoney } from '../../lib/format';

/**
 * Herz und Kreislauf (VersMedV Teil B Nr. 9): Herzleistung, Herzinfarkt, Klappen, Schrittmacher, ICD, Bluthochdruck,
 * pAVK. Werte aus tabelle.json, Kombinationen vom Motor.
 */
const eur = (x: number) => formatMoney(x, 0, 'de');
const ins = eintrag('herzinsuffizienz')!.stufen;
const klappe = eintrag('herzklappe')!.stufen;
const sm = eintrag('herzschrittmacher')!.stufen;
const icd = eintrag('defibrillator')!.stufen;
const rr = eintrag('bluthochdruck')!.stufen;
const pavk = eintrag('pavk')!.stufen;
const tx = eintrag('herztransplantation')!.stufen;
const sp = (s: { von: number; bis: number }) => (s.von === s.bis ? `${s.von}` : `${s.von} bis ${s.bis}`);
const r = (x: { min: number; max: number }) => (x.min === x.max ? `${x.min}` : `${x.min} bis ${x.max}`);
const herzLunge = gesamtGdb([{ system: 'herz', gdb: 50 }, { system: 'lunge', gdb: 30, beziehung: 'nachteilig' }]);
const infarktRR = gesamtGdb([{ system: 'herz', gdb: 30 }, { system: 'herz', gdb: 20, beziehung: 'teilweise' }]);

export default defineGuide({
  id: 'gdb-herz',
  group: 'tabelle',
  order: 640,
  mini: 'zwei',
  miniDefaults: { a: 50, b: 30, z: 1 },
  miniHref: 'home',
  related: ['gdb-tabelle', 'gdb-lunge', 'gdb-diabetes', 'gdb-50', 'merkzeichen-g', 'home'],
  sources: ['versmedv', 'sgb9_152', 'estg33b'],
  de: {
    slug: 'gdb-herz',
    nav: 'Herz und Kreislauf',
    card: 'Herzschwäche, Herzinfarkt, Klappe, Schrittmacher, Defibrillator, Bluthochdruck: was nach Teil B Nr. 9 zählt.',
    title: 'GdB Herz 2026: Infarkt, Herzschwäche, ICD, Bluthochdruck',
    description: `GdB bei Herzerkrankungen 2026 nach VersMedV Teil B Nr. 9: Herzschwäche ${sp(ins[1])} bis ${ins[4].bis}, Klappe mindestens ${klappe[0].von}, ICD wenigstens ${icd[0].von}. Was die Belastbarkeit zählt.`,
    h1: 'GdB bei Herz und Kreislauf',
    intro: 'Beim Herzen zählt die Leistungsfähigkeit im Alltag und unter Belastung, nicht die Diagnose oder das EKG allein.',
    resume: `Herzerkrankungen bewertet die Versorgungsmedizin-Verordnung in Teil B Nummer 9 vor allem nach der Leistungsbeeinträchtigung. Ohne wesentliche Beeinträchtigung selbst bei stärkerer Belastung beträgt der Wert ${sp(ins[0])}. Atemnot oder Brustschmerz bei mittelschwerer Belastung, etwa forschem Gehen mit fünf bis sechs Kilometern pro Stunde, ergeben ${sp(ins[1])}. Beschwerden schon bei alltäglicher leichter Belastung wie Spazierengehen oder einem Stockwerk Treppe ergeben ${sp(ins[2])}, Beschwerden in Ruhe ${sp(ins[4])}. Nach einem Herzinfarkt oder einer Bypass-Operation richtet sich der Wert nach der bleibenden Leistungsbeeinträchtigung. Feste Werte gibt es für einige Fälle: Herzklappenprothese nicht unter ${klappe[0].von}, Herzschrittmacher ${sm[0].von}, implantierter Defibrillator wenigstens ${icd[0].von}, nach Herztransplantation ${tx[0].von} für die Heilungsbewährung. Bluthochdruck hat eigene Stufen von ${rr[0].von} bis ${rr[3].bis}. Ein EKG-Befund allein erlaubt nach der Verordnung keinen Rückschluss auf die Leistung. Mit GdB 50 gibt es ${eur(pauschbetrag(50))} Pauschbetrag im Jahr.`,
    faqs: [
      { q: 'Welchen GdB gibt es nach einem Herzinfarkt?', a: `Keinen festen. Die Verordnung sagt ausdrücklich, dass der Wert nach einem Infarkt und nach Eingriffen wie Stent oder Bypass von der bleibenden Leistungsbeeinträchtigung abhängt. Wer nach der Rehabilitation wieder voll belastbar ist, liegt bei ${sp(ins[0])}. Bleibt eine Einschränkung bei mittelschwerer Belastung, sind es ${sp(ins[1])}. Maßgeblich sind Belastungs-EKG, Echokardiographie und die Schilderung im Alltag.` },
      { q: 'Bekommt man mit Defibrillator automatisch GdB 50?', a: `Ja, nach Implantation eines Kardioverter-Defibrillators beträgt der Wert nach Teil B Nummer 9.1.6 wenigstens ${icd[0].von}. Damit sind Sie schwerbehindert, auch wenn die Herzleistung sonst gut ist. Ist die Leistung zusätzlich eingeschränkt, kann der Wert höher liegen. Ein Herzschrittmacher dagegen ergibt nur ${sm[0].von}, weil er die Leistung in der Regel normalisiert.` },
      { q: 'Wie wird Bluthochdruck bewertet?', a: `Nach Nummer 9.3 in Formen: leicht mit höchstens leichten Augenhintergrundveränderungen ${sp(rr[0])}, mittelschwer mit Organbeteiligung leichten bis mittleren Grades ${sp(rr[1])}, schwer mit Beteiligung mehrerer Organe ${sp(rr[2])}. Ein gut eingestellter Bluthochdruck ohne Organschäden führt also meist zu keinem nennenswerten GdB. Folgen an Herz, Nieren oder Gehirn werden zusätzlich als eigene Leiden bewertet.` },
      { q: 'Zählen Herz und Lunge zusammen?', a: `Sie sind zwei Funktionssysteme, die sich oft gegenseitig verstärken: Wer schon wegen des Herzens kurzatmig ist, leidet unter einer Lungenerkrankung stärker. Nach Teil A Nummer 3.3.1 wirkt das in der Regel erhöhend. Ein Herzleiden mit 50 und ein Lungenleiden mit 30, die sich verstärken, ergeben nach diesem Rechner ${r(herzLunge)}.` },
    ],
    body: (h) => `
<h2>Herzleistung: die Grundtabelle</h2>
${h.table(['Leistungsbeeinträchtigung', 'Beispiel aus der Verordnung', 'GdB'], [
  ['keine wesentliche', 'auch bei gewohnter stärkerer Belastung beschwerdefrei', sp(ins[0])],
  ['bei mittelschwerer Belastung', 'forsches Gehen 5 bis 6 km/h, mittelschwere Arbeit', sp(ins[1])],
  ['bei alltäglicher leichter Belastung', 'Spazierengehen 3 bis 4 km/h, ein Stockwerk Treppe', sp(ins[2])],
  ['mit gelegentlichen schweren Dekompensationen', 'zeitweise schwere Herzschwäche', sp(ins[3])],
  ['in Ruhe', 'Ruheinsuffizienz', sp(ins[4])],
], 'Einschränkung der Herzleistung nach Teil B Nr. 9.1.1, Wortlaut gekürzt', ['l', 'l', 'r'])}
<p>Die Verordnung nennt zu jeder Stufe auch Werte der Ergometrie, etwa die Belastung in Watt, bei der Beschwerden auftreten. Sie sind Anhaltspunkte; entscheidend ist das Gesamtbild aus Untersuchung und Alltag. Ausdrücklich heißt es: Elektrokardiographische Abweichungen allein gestatten keinen Rückschluss auf die Leistungseinbuße. Ein auffälliges EKG ohne Beschwerden führt also nicht zu einem höheren Wert.</p>
<h2>Feste Werte</h2>
<p>Einige Behandlungen haben feste Werte, weil sie das Leben unabhängig von der Leistung prägen. Eine Herzklappenprothese wird nicht niedriger als ${klappe[0].von} bewertet; darin ist die dauerhafte Behandlung mit Blutverdünnern eingeschlossen. Ein Herzschrittmacher ergibt ${sm[0].von}. Ein implantierter Defibrillator ergibt wenigstens ${icd[0].von}. Nach einer Herztransplantation gilt eine Heilungsbewährung von im Allgemeinen zwei Jahren mit ${tx[0].von}, danach selbst bei günstigem Verlauf nicht weniger als ${tx[1].von}.</p>
<!--mini:stufe-->
<h2>Durchblutung der Beine</h2>
<p>Die arterielle Verschlusskrankheit der Beine (pAVK) gehört zum Kreislauf, wirkt aber vor allem auf das Gehen. Die Verordnung bewertet sie nach der schmerzfreien Gehstrecke in der Ebene: mehr als 500 Meter ${sp(pavk[1])}, 100 bis 500 Meter ${sp(pavk[2])}, 50 bis 100 Meter ${sp(pavk[3])}, unter 50 Meter ohne Ruheschmerz ${sp(pavk[4])}. Ab einer deutlich verkürzten Gehstrecke kommt auch das ${h.a('merkzeichen-g', 'Merkzeichen G')} in Betracht. Ein Gehtest beim Gefäßarzt ist hier der wichtigste Beleg. Nach Teil D kann G bei einer arteriellen Verschlusskrankheit schon ab einem GdB von 40 vorliegen, weil sie sich besonders auf das Gehen auswirkt.</p>
<h2>Mehrere Herz- und Kreislaufleiden</h2>
<p>Herz, Bluthochdruck und Gefäße gehören zum selben Funktionssystem. Ein Herzleiden mit 30 nach Infarkt und ein Bluthochdruck mit 20 werden deshalb zuerst zu einem Wert für Herz und Kreislauf zusammengefasst; weil sie sich überschneiden, liegt er bei ${r(infarktRR)}. Erst dieser Wert geht mit anderen Bereichen wie Lunge, Stoffwechsel oder Bewegungsapparat in den Gesamt-GdB ein. Diabetes und Herz verstärken sich häufig; Beispiele dazu stehen unter ${h.a('gdb-diabetes', 'Diabetes')}, die Lunge unter ${h.a('gdb-lunge', 'Atmung und Lunge')}.</p>
<h2>Beispiele</h2>
<p>Ein 61-Jähriger hatte vor einem Jahr einen Infarkt mit Stent. In der Rehabilitation erreicht er auf dem Fahrrad 100 Watt ohne Beschwerden, im Alltag geht er zügig spazieren. Die Leistung ist kaum eingeschränkt, der Wert liegt bei ${sp(ins[0])} oder an der unteren Grenze von ${sp(ins[1])}.</p>
<p>Eine 70-Jährige mit Herzschwäche muss nach einem Stockwerk Treppe stehen bleiben und kann nur langsam spazieren gehen. Das entspricht einer Beeinträchtigung bei alltäglicher leichter Belastung, ${sp(ins[2])}, und damit der Schwerbehinderung. Mit einer Lungenerkrankung dazu kann der Gesamtwert weiter steigen.</p>
<p>Ein 45-Jähriger erhält nach einem Herzstillstand einen Defibrillator. Unabhängig von seiner Leistung beträgt der Wert wenigstens ${icd[0].von}; er hat damit Anspruch auf Zusatzurlaub, Kündigungsschutz und den Pauschbetrag. Ob und wann er wieder Auto fahren darf, ist eine eigene Frage, die der GdB nicht beantwortet.</p>
<h2>Merkzeichen bei Herzleiden</h2>
<p>Ein Herzleiden kann die Gehfähigkeit so einschränken wie ein Beinleiden. Die Voraussetzungen für das Merkzeichen G nennen ausdrücklich auch innere Leiden: Wer wegen Atemnot oder Brustschmerz übliche Wege im Ortsverkehr nicht ohne erhebliche Schwierigkeiten zurücklegen kann, erfüllt sie. Nach Teil D der Verordnung ist das bei Herzschäden mit Beeinträchtigung der Herzleistung wenigstens nach der Gruppe 3, also bei Beschwerden schon bei alltäglicher leichter Belastung, in der Regel anzunehmen. Mit G gibt es die Freifahrt im Nahverkehr gegen eine Wertmarke oder die halbe Kfz-Steuer, ab GdB 70 dazu die Fahrtkostenpauschale.</p>
<p>Bei sehr schwerer Herzschwäche mit Beschwerden in Ruhe kommt auch das Merkzeichen aG in Betracht, wenn die Beeinträchtigung der Mobilität einem GdB von 80 entspricht und Wege außerhalb des Autos nur mit großer Anstrengung möglich sind. Dann gibt es den EU-Parkausweis.</p>
<h2>Kinder mit angeborenem Herzfehler</h2>
<p>Für Kinder gelten dieselben Stufen, bezogen auf die altersgemäße Belastbarkeit. Bei angeborenen oder in der Kindheit erworbenen Herzschäden mit schwerer Leistungsbeeinträchtigung entsprechend den Gruppen 3 und 4 der Tabelle ist nach Teil A Nummer 5 Hilflosigkeit anzunehmen, bis sich die Leistung bessert, etwa durch eine Operation. Das Merkzeichen H erhöht den Pauschbetrag auf ${h.eur(h.P.pauschbetrag.erhoeht)}, den die Eltern übernehmen können.</p>
<h2>Was in den Antrag gehört</h2>
<p>Arztbriefe der Kardiologie mit Ejektionsfraktion, Belastungs-EKG oder Spiroergometrie, Entlassungsberichte nach Infarkt oder Operation und der Rehabilitationsbericht. Beschreiben Sie zusätzlich, welche Wege und Tätigkeiten Sie nicht mehr schaffen. Bessert sich die Leistung nach einer Behandlung, kann die Behörde den Wert später senken; verschlechtert sie sich, ist ein ${h.a('verschlimmerungsantrag', 'Verschlimmerungsantrag')} möglich.</p>
`,
  },
});
