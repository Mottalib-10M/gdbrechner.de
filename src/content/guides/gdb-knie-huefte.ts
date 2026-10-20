import { defineGuide } from '../../lib/guide-types';
import { eintrag } from '../../lib/engine/tabelle';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { pauschbetrag } from '../../lib/engine/rechte';
import { formatMoney } from '../../lib/format';

/**
 * Knie und Hüfte (VersMedV Teil B Nr. 18.12 Endoprothesen, 18.14 untere Gliedmaßen), Merkzeichen G nach Teil D.
 * Werte aus tabelle.json, Kombinationen vom Motor.
 */
const eur = (x: number) => formatMoney(x, 0, 'de');
const kn = eintrag('knie')!.stufen;
const hu = eintrag('huefte')!.stufen;
const ktep = eintrag('knie-endoprothese')!.stufen;
const htep = eintrag('hueft-endoprothese')!.stufen;
const kv = eintrag('knieversteifung')!.stufen;
const hv = eintrag('hueftversteifung')!.stufen;
const kb = eintrag('kniebandapparat')!.stufen;
const ks = eintrag('knorpelschaden-knie')!.stufen;
const sp = (s: { von: number; bis: number }) => (s.von === s.bis ? `${s.von}` : `${s.von} bis ${s.bis}`);
const r = (x: { min: number; max: number }) => (x.min === x.max ? `${x.min}` : `${x.min} bis ${x.max}`);
const knieBeide = gesamtGdb([{ system: 'beine', gdb: 30 }, { system: 'beine', gdb: 20, beziehung: 'nachteilig' }]);
const hueftRuecken = gesamtGdb([{ system: 'beine', gdb: 40 }, { system: 'wirbelsaeule', gdb: 30, beziehung: 'nachteilig' }]);

export default defineGuide({
  id: 'gdb-knie-huefte',
  group: 'tabelle',
  order: 670,
  mini: 'zwei',
  miniDefaults: { a: 40, b: 30, z: 1 },
  miniHref: 'home',
  related: ['gdb-tabelle', 'gdb-wirbelsaeule', 'merkzeichen-g', 'gdb-50', 'verschlimmerungsantrag', 'home'],
  sources: ['versmedv', 'sgb9_229', 'estg33b'],
  de: {
    slug: 'gdb-knie-huefte',
    nav: 'Knie und Hüfte',
    card: 'Arthrose, künstliches Gelenk, Versteifung: welcher GdB für Knie und Hüfte gilt und wann das Merkzeichen G kommt.',
    title: 'GdB Knie und Hüfte 2026: Arthrose, TEP, Versteifung',
    description: `GdB bei Knie und Hüfte 2026 nach VersMedV: Knie-TEP mindestens ${ktep[0].von}, Hüft-TEP mindestens ${htep[0].von}, Arthrose je nach Beweglichkeit. Wann Merkzeichen G und GdB 50.`,
    h1: 'GdB bei Knie und Hüfte',
    intro: 'Bei Knie und Hüfte zählt die Beweglichkeit in Winkelgraden, und ein künstliches Gelenk hat einen Mindestwert.',
    resume: `Knie und Hüfte bewertet die Versorgungsmedizin-Verordnung in Teil B Nummer 18.14 nach der Bewegungseinschränkung, gemessen in Winkelgraden nach der Neutral-Null-Methode. Eine Kniearthrose geringen Grades auf einer Seite ergibt ${sp(kn[0])}, mittleren Grades ${kn[2].von}, stärkeren Grades ${kn[4].von}; beidseitig sind es ${sp(kn[1])}, ${kn[3].von} und ${kn[5].von}. Bei der Hüfte sind es einseitig ${sp(hu[0])}, ${hu[2].von} und ${hu[4].von}. Für künstliche Gelenke nennt Nummer 18.12 Mindestwerte bei bestmöglichem Ergebnis: Knie-Totalendoprothese einseitig ${ktep[0].von}, beidseitig ${ktep[1].von}; Hüftendoprothese einseitig ${htep[0].von}, beidseitig ${htep[1].von}. Bleiben Beschwerden, Bewegungs- oder Belastungseinschränkungen, sind höhere Werte angemessen. Das Merkzeichen G setzt nach Teil D in der Regel voraus, dass Beine und Lendenwirbelsäule zusammen einen GdB von wenigstens 50 bedingen; bei Versteifung der Hüfte oder des Knies in ungünstiger Stellung kann es schon darunter reichen. Ab GdB 50 gibt es ${eur(pauschbetrag(50))} Pauschbetrag im Jahr.`,
    faqs: [
      { q: 'Welcher GdB gilt nach einem künstlichen Kniegelenk?', a: `Nach Teil B Nummer 18.12 bei einseitiger Totalendoprothese mindestens ${ktep[0].von}, bei beidseitiger mindestens ${ktep[1].von}; eine Teilendoprothese, der Schlitten, ergibt mindestens ${ktep[2].von}. Diese Werte gelten bei bestmöglichem Behandlungsergebnis. Bleiben Bewegungseinschränkungen, Nervenschäden, deutlicher Muskelabbau oder ausgeprägte Narben, sind nach der Verordnung höhere Werte angemessen.` },
      { q: 'Warum ist der GdB für die Hüft-TEP so niedrig?', a: `Weil ein gut sitzendes künstliches Hüftgelenk im Alltag oft wenig einschränkt. Die Verordnung nennt mindestens ${htep[0].von} für eine Seite und ${htep[1].von} für beide, eingeschlossen die üblichen Beschränkungen nach der Operation. Ältere Ratgeber nennen teils höhere Mindestwerte; maßgebend ist die geltende Fassung. Wer hinkt, Schmerzen hat oder die Hüfte schlecht beugen kann, liegt höher.` },
      { q: 'Wie wird eine Kniearthrose gemessen?', a: `Nach Beweglichkeit und Reizzustand. Die Verordnung nennt als Beispiel für geringen Grad eine Streckung und Beugung bis 0-0-90, für mittleren Grad 0-10-90 und für stärkeren Grad 0-30-90. Ausgeprägte Knorpelschäden mit anhaltenden Reizerscheinungen werden auch ohne Bewegungseinschränkung bewertet. Ein orthopädischer Befund mit den gemessenen Winkeln ist deshalb der wichtigste Beleg im Antrag.` },
      { q: 'Bekomme ich mit Hüft- oder Knieproblemen das Merkzeichen G?', a: 'In der Regel, wenn die Funktionsstörungen der Beine und der Lendenwirbelsäule für sich einen GdB von wenigstens 50 bedingen. Darunter kann es reichen, wenn sich das Leiden besonders auf das Gehen auswirkt; Teil D nennt als Beispiele die Versteifung des Hüftgelenks und die Versteifung des Knie- oder Fußgelenks in ungünstiger Stellung. Eine Arthrose mit 30 genügt allein nicht.' },
    ],
    body: (h) => `
<h2>Die Stufen im Überblick</h2>
${h.table(['Befund', 'einseitig', 'beidseitig'], [
  ['Knie, Bewegung geringen Grades', sp(kn[0]), sp(kn[1])],
  ['Knie, Bewegung mittleren Grades', String(kn[2].von), String(kn[3].von)],
  ['Knie, Bewegung stärkeren Grades', String(kn[4].von), String(kn[5].von)],
  ['Hüfte, Bewegung geringen Grades', sp(hu[0]), sp(hu[1])],
  ['Hüfte, Bewegung mittleren Grades', String(hu[2].von), String(hu[3].von)],
  ['Hüfte, Bewegung stärkeren Grades', String(hu[4].von), sp(hu[5])],
  ['Knie-Totalendoprothese, mindestens', String(ktep[0].von), String(ktep[1].von)],
  ['Hüftendoprothese, mindestens', String(htep[0].von), String(htep[1].von)],
], 'Untere Gliedmaßen nach Teil B Nr. 18.12 und 18.14, Wortlaut gekürzt', ['l', 'r', 'r'])}
<p>Gemessen wird nach der Neutral-Null-Methode: drei Zahlen für Streckung, Nullstellung und Beugung. Beim Knie nennt die Verordnung als Beispiele für den geringen Grad 0-0-90, für den mittleren 0-10-90 und für den stärkeren 0-30-90; bei der Hüfte für den geringen Grad 0-10-90 und für den mittleren 0-30-90, jeweils mit entsprechender Einschränkung der Dreh- und Spreizfähigkeit. Die Winkel stammen aus dem orthopädischen Befund; schreiben Sie sie nicht selbst in den Antrag, sondern legen Sie den Befund bei.</p>
<!--mini:stufe-->
<h2>Das künstliche Gelenk</h2>
<p>Nummer 18.12 gibt für Endoprothesen Mindestwerte an, die bei bestmöglichem Behandlungsergebnis gelten. Die Versorgungsqualität kann nach der Verordnung vor allem durch Beweglichkeits- und Belastungseinschränkung, Nervenschädigung, deutliche Muskelminderung oder ausgeprägte Narbenbildung beeinträchtigt sein; dann sind höhere Werte angemessen. Die üblichen Beschränkungen, etwa der Verzicht auf bestimmte Sportarten, sind im Mindestwert schon enthalten. Eine Teilendoprothese des Knies ergibt mindestens ${ktep[2].von}, beidseitig ${ktep[3].von}.</p>
<p>Ein Beispiel: Eine Frau, 66 Jahre, hat seit zwei Jahren ein künstliches Kniegelenk rechts, beugt das Knie nur bis 80 Grad und hinkt nach längeren Strecken. Der Mindestwert von ${ktep[0].von} wird hier voraussichtlich nicht das letzte Wort sein; maßgebend ist die tatsächliche Einschränkung, die das Versorgungsamt aus den Befunden ableitet.</p>
<h2>Versteifung und instabiles Knie</h2>
<p>Ein versteiftes Gelenk wiegt schwerer als ein bewegliches: Die Versteifung eines Kniegelenks in günstiger Stellung ergibt ${kv[0].von}, in ungünstiger Stellung ${sp(kv[1])}, beider Kniegelenke ${kv[2].von}. Die Versteifung eines Hüftgelenks in günstiger Stellung ergibt ${hv[0].von}, in ungünstiger ${sp(hv[1])}. Eine Lockerung des Kniebandapparats, etwa nach einem Kreuzbandriss, liegt bei ${kb[0].von}, wenn die Muskulatur sie ausgleicht, bei ${kb[1].von} mit Gangunsicherheit und bei ${sp(kb[2])}, wenn ein Stützapparat nötig ist.</p>
<h2>Knorpelschaden ohne steifes Knie</h2>
<p>Nicht jede Kniearthrose zeigt sich in den Winkeln. Ausgeprägte Knorpelschäden mit anhaltenden Reizerscheinungen, also wiederkehrenden Schwellungen und Ergüssen, bewertet die Verordnung eigens: einseitig ohne Bewegungseinschränkung ${sp(ks[0])}, einseitig mit Bewegungseinschränkung ${sp(ks[1])}. Ein Mann, 55 Jahre, der das Knie fast normal beugen kann, aber nach jeder längeren Belastung einen Erguss hat, ist also nicht auf den niedrigsten Wert festgelegt. Wichtig sind Befunde, die die Reizerscheinungen über längere Zeit belegen, etwa wiederholte Punktionen oder Arztberichte aus mehreren Monaten.</p>
<h2>Beide Knie, Hüfte und Rücken</h2>
<p>Alle Gelenke der Beine gehören zum selben Funktionssystem. Ist das rechte Knie stärkeren Grades mit 30 und das linke mittleren Grades mit 20 eingeschränkt, verstärken sich die beiden Leiden beim Gehen; die Spanne liegt bei ${r(knieBeide)}. Die Tabelle nennt für beidseitige Einschränkungen deshalb eigene Werte. Kommt ein Rückenleiden hinzu, ist das ein anderes Funktionssystem: Eine Hüfte mit 40 und eine Lendenwirbelsäule mit 30, die sich gegenseitig verschlimmern, ergeben ${r(hueftRuecken)}. Wie der Rücken bewertet wird, steht auf der Seite ${h.a('gdb-wirbelsaeule', 'Wirbelsäule und Bandscheibe')}.</p>
<h2>Merkzeichen G und Parken</h2>
<p>Für das ${h.a('merkzeichen-g', 'Merkzeichen G')} kommt es nach Teil D auf die Gehfähigkeit an. Erfüllt sind die Voraussetzungen, wenn Funktionsstörungen der Beine und der Lendenwirbelsäule für sich einen GdB von wenigstens 50 bedingen. Darunter können sie erfüllt sein, wenn sich die Behinderung besonders auf das Gehen auswirkt, etwa bei Versteifung des Hüftgelenks oder bei Versteifung des Knie- oder Fußgelenks in ungünstiger Stellung. Mit G gibt es die Freifahrt im Nahverkehr mit Wertmarke oder die halbe Kfz-Steuer. Das Merkzeichen aG, das zum Parken auf Behindertenparkplätzen berechtigt, verlangt nach § 229 Absatz 3 SGB IX mehr: eine erhebliche mobilitätsbezogene Teilhabebeeinträchtigung, die einem GdB von mindestens 80 entspricht.</p>
<h2>Vor und nach der Operation</h2>
<p>Wer auf ein neues Gelenk wartet, ist meist stärker eingeschränkt als danach. Ein Antrag vor der Operation bildet den aktuellen Zustand ab; nach der Operation kann das Amt prüfen, ob sich die Lage wesentlich gebessert hat. Nach Teil A Nummer 7 ist eine Änderung wesentlich, wenn der Wert um mindestens 10 abweicht und die Änderung länger als sechs Monate anhält. Umgekehrt gilt: Bleibt das Ergebnis der Operation schlecht oder kommt die andere Seite hinzu, ist ein ${h.a('verschlimmerungsantrag', 'Verschlimmerungsantrag')} der Weg zu einem höheren Wert.</p>
<h2>Was in den Antrag gehört</h2>
<p>Orthopädische Befunde mit den gemessenen Winkeln beider Seiten, Röntgen- oder MRT-Befunde, Operations- und Reha-Berichte, die Verordnung von Hilfsmitteln wie Gehstützen oder Orthesen und eine eigene Beschreibung: wie weit Sie ohne Pause gehen, ob Sie Treppen schaffen, ob Sie nachts wegen Schmerzen aufwachen. Das Versorgungsamt entscheidet; die Tabelle gibt den Rahmen, Ihre Befunde den Platz darin. Fehlen aktuelle Winkelmessungen, lohnt sich vor dem Antrag ein Termin beim Orthopäden.</p>
`,
  },
});
