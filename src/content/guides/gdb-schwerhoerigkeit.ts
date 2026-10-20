import { defineGuide } from '../../lib/guide-types';
import { eintrag } from '../../lib/engine/tabelle';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { pauschbetrag } from '../../lib/engine/rechte';
import { formatMoney } from '../../lib/format';

/**
 * Hör- und Gleichgewichtsorgan (VersMedV Teil B Nr. 5): Schwerhörigkeit nach Tabelle D (5.2), Tinnitus und
 * Gleichgewichtsstörungen (5.3), Taubheit in der Kindheit (5.1). Werte aus tabelle.json, Kombinationen vom Motor.
 */
const eur = (x: number) => formatMoney(x, 0, 'de');
const sh = eintrag('schwerhoerigkeit')!.stufen;
const ti = eintrag('tinnitus')!.stufen;
const gg = eintrag('gleichgewichtsstoerung')!.stufen;
const tk = eintrag('taubheit-kindheit')!.stufen;
const sp = (s: { von: number; bis: number }) => (s.von === s.bis ? `${s.von}` : `${s.von} bis ${s.bis}`);
const r = (x: { min: number; max: number }) => (x.min === x.max ? `${x.min}` : `${x.min} bis ${x.max}`);
const hoerTinnitus = gesamtGdb([{ system: 'ohren', gdb: 30 }, { system: 'ohren', gdb: 20, beziehung: 'teilweise' }]);
const hoerPsyche = gesamtGdb([{ system: 'ohren', gdb: 50 }, { system: 'psyche', gdb: 30, beziehung: 'unabhaengig' }]);

export default defineGuide({
  id: 'gdb-schwerhoerigkeit',
  group: 'tabelle',
  order: 660,
  mini: 'zwei',
  miniDefaults: { a: 30, b: 20, z: 0 },
  miniHref: 'home',
  related: ['gdb-tabelle', 'merkzeichen-rf', 'merkzeichen', 'gdb-depression', 'gdb-50', 'home'],
  sources: ['versmedv', 'sgb9_152', 'sgb9_228', 'rbstv4', 'estg33b'],
  de: {
    slug: 'gdb-schwerhoerigkeit',
    nav: 'Hören und Gleichgewicht',
    card: 'Schwerhörigkeit nach Tabelle D, Tinnitus, Schwindel: welcher GdB gilt und wann Gl oder RF in Frage kommen.',
    title: 'GdB Schwerhörigkeit 2026: Tabelle D, Tinnitus, Schwindel',
    description: `GdB bei Schwerhörigkeit 2026 nach VersMedV Teil B Nr. 5: einseitig taub ${sh[0].von}, beidseits hochgradig ${sh[5].von}, taub ${sh[7].von}. Tinnitus, Schwindel, Merkzeichen Gl und RF.`,
    h1: 'GdB bei Schwerhörigkeit und Tinnitus',
    intro: 'Beim Hören zählt das Sprachgehör beider Ohren zusammen, gemessen ohne Hörgerät.',
    resume: `Hörstörungen bewertet die Versorgungsmedizin-Verordnung in Teil B Nummer 5. Maßgebend ist die Herabsetzung des Sprachgehörs, gemessen ohne Hörhilfen, und zwar für beide Ohren zusammen nach der Tabelle D. Ist ein Ohr taub und das andere normalhörig, sind es ${sh[0].von}. Geringgradige Schwerhörigkeit auf beiden Seiten ergibt ${sh[3].von}, mittelgradige ${sh[4].von}, hochgradige ${sh[5].von}, an Taubheit grenzende ${sh[6].von} und Taubheit beidseits ${sh[7].von}. Ein Tinnitus wird nach seinen psychischen Folgen bewertet, von ${sp(ti[0])} ohne nennenswerte Begleiterscheinungen bis ${ti[3].von} bei schweren psychischen Störungen. Gleichgewichtsstörungen reichen von ${sp(gg[0])} bis ${gg[4].von}. Wer gehörlos ist, erhält das Merkzeichen Gl und damit die Freifahrt mit Wertmarke; wer sich auch mit Hörhilfen nicht ausreichend verständigen kann, zahlt auf Antrag nur ein Drittel des Rundfunkbeitrags. Ab GdB 50 gibt es ${eur(pauschbetrag(50))} Pauschbetrag im Jahr.`,
    faqs: [
      { q: 'Zählt die Schwerhörigkeit mit oder ohne Hörgerät?', a: 'Ohne. Nach Teil B Nummer 5.2 ist die Herabsetzung des Sprachgehörs maßgebend, deren Umfang durch Prüfung ohne Hörhilfen zu bestimmen ist. Wer mit Hörgeräten im Alltag gut zurechtkommt, wird deshalb nicht schlechter bewertet. Grundlage ist ein aktuelles Ton- und Sprachaudiogramm vom HNO-Arzt.' },
      { q: 'Welcher GdB gilt bei Taubheit auf einem Ohr?', a: `Ist das andere Ohr normalhörig, ${sh[0].von}; ist es geringgradig schwerhörig, ${sh[1].von}. Eine hochgradige Schwerhörigkeit auf einem Ohr bei normalem anderen Ohr ergibt nur ${sh[2].von}. Die Verordnung bewertet immer beide Ohren zusammen, weil das gesunde Ohr im Alltag beim Verstehen sehr viel ausgleicht.` },
      { q: 'Wie viel GdB gibt es für Tinnitus?', a: `Ohne nennenswerte psychische Begleiterscheinungen ${sp(ti[0])}, mit erheblichen psychovegetativen Begleiterscheinungen ${ti[1].von}, mit wesentlicher Einschränkung der Erlebnis- und Gestaltungsfähigkeit, etwa ausgeprägter Depression, ${sp(ti[2])}, mit schweren psychischen Störungen und sozialen Anpassungsschwierigkeiten ${ti[3].von}. Das Geräusch selbst wird also nicht gemessen, sondern was es im Leben anrichtet.` },
      { q: 'Wann gibt es das Merkzeichen Gl?', a: 'Gehörlos im Sinne des Schwerbehindertenrechts sind nach Teil D der Verordnung Menschen mit Taubheit beiderseits und Menschen mit einer an Taubheit grenzenden Schwerhörigkeit beiderseits, wenn daneben schwere Sprachstörungen bestehen. Mit Gl gibt es die unentgeltliche Beförderung im Nahverkehr mit Wertmarke oder alternativ die halbe Kfz-Steuer.' },
    ],
    body: (h) => `
<h2>Tabelle D: beide Ohren zusammen</h2>
${h.table(['Rechtes und linkes Ohr', 'GdB'], [
  ['ein Ohr taub, das andere normal', String(sh[0].von)],
  ['ein Ohr taub, das andere geringgradig schwerhörig', String(sh[1].von)],
  ['ein Ohr hochgradig schwerhörig, das andere normal', String(sh[2].von)],
  ['beide geringgradig schwerhörig', String(sh[3].von)],
  ['beide mittelgradig schwerhörig', String(sh[4].von)],
  ['beide hochgradig schwerhörig', String(sh[5].von)],
  ['beide an Taubheit grenzend', String(sh[6].von)],
  ['beide taub', String(sh[7].von)],
], 'Auszug aus Tabelle D, VersMedV Teil B Nr. 5.2', ['l', 'r'])}
<p>Die Tabelle D ordnet jedem Paar aus dem prozentualen Hörverlust des rechten und des linken Ohres einen Wert zu. Den Hörverlust ermittelt der HNO-Arzt aus dem Sprachaudiogramm, ersatzweise aus dem Tonaudiogramm. Ein Einzelwert wie 15 ist ein Zwischenwert der Tabelle; festgestellt wird der GdB nach § 152 SGB IX in Zehnergraden. Bei mehreren Leiden fließt die 15 in die Gesamtbewertung ein, bleibt aber in der Regel ohne erhöhende Wirkung.</p>
<!--mini:stufe-->
<h2>Taubheit in der Kindheit</h2>
<p>Eine angeborene oder bis zum 7. Lebensjahr erworbene Taubheit mit schwerer Störung des Spracherwerbs ergibt nach Nummer 5.1 ${tk[0].von}. Wird die Taubheit im 8. bis 18. Lebensjahr erworben und bestehen schwere Sprachstörungen, sind es ebenfalls ${tk[1].von}, sonst je nach Sprachstörung ${sp(tk[2])}. Hier wird nicht nur das Hören bewertet, sondern die Folge für Sprache und Verständigung. Bei Kindern lohnt sich der Blick auf den ${h.a('pauschbetrag-kind', 'Pauschbetrag für Kinder')}, den die Eltern übernehmen können.</p>
<h2>Tinnitus und Schwindel</h2>
<p>Ohrgeräusche und Gleichgewichtsstörungen stehen in Nummer 5.3. Beim Tinnitus zählt nicht die Lautstärke, sondern die psychische Wirkung: Schlafstörungen, Konzentrationsprobleme, Rückzug. Wer deshalb in psychotherapeutischer Behandlung ist, sollte den Bericht beilegen. Bei Schwindel unterscheidet die Verordnung nach den Folgen: leichte Unsicherheit ${gg[1].von}, stärkere Unsicherheit mit Schwindel schon bei alltäglicher Belastung ${sp(gg[2])}, heftiger Schwindel mit erheblicher Gangunsicherheit ${sp(gg[3])}, und wer ohne Unterstützung nicht gehen oder stehen kann, ${gg[4].von}.</p>
<h2>Mehrere Hörleiden zusammen</h2>
<p>Schwerhörigkeit, Tinnitus und Schwindel gehören zum selben Funktionssystem, den Ohren. Eine mittelgradige Schwerhörigkeit beidseits mit ${sh[4].von} und ein Tinnitus mit psychovegetativen Begleiterscheinungen mit ${ti[1].von} überschneiden sich teilweise; die Spanne liegt bei ${r(hoerTinnitus)}. Ist dagegen eine eigenständige Depression hinzugekommen, die nicht nur aus dem Tinnitus folgt, wird sie als eigenes Leiden im Funktionssystem Psyche bewertet. Eine hochgradige Schwerhörigkeit beidseits mit ${sh[5].von} und eine davon unabhängige Depression mit 30 ergeben ${r(hoerPsyche)}. Wichtig: Ein Leiden darf nicht doppelt gezählt werden; die psychische Wirkung des Tinnitus steckt bereits in seinem Wert. Mehr dazu auf der Seite ${h.a('gdb-depression', 'Depression und Psyche')}.</p>
<h2>Merkzeichen und Rundfunkbeitrag</h2>
<p>Für Hörgeschädigte sind zwei Merkzeichen wichtig. Gl setzt Gehörlosigkeit voraus und öffnet die Freifahrt mit Wertmarke. RF steht für die Ermäßigung des Rundfunkbeitrags auf ein Drittel; nach § 4 Absatz 2 des Rundfunkbeitragsstaatsvertrags gilt sie für hörgeschädigte Menschen, die gehörlos sind oder denen eine ausreichende Verständigung über das Gehör auch mit Hörhilfen nicht möglich ist. Den Antrag stellen Sie beim Beitragsservice mit dem Bescheid oder dem Ausweis. Alle Voraussetzungen stehen auf der Seite ${h.a('merkzeichen-rf', 'Merkzeichen RF')}.</p>
<h2>Drei Beispiele</h2>
<p>Ein Monteur, 52 Jahre, hört nach jahrelanger Lärmarbeit auf beiden Ohren mittelgradig schlecht. Nach Tabelle D liegt er bei ${sh[4].von}. Das reicht nicht für die Schwerbehinderung, aber für einen Antrag auf ${h.a('gleichstellung', 'Gleichstellung')} bei der Agentur für Arbeit, wenn sein Arbeitsplatz wegen der Hörstörung gefährdet ist. Eine Lehrerin, 45 Jahre, ist nach einem Hörsturz auf einem Ohr taub, das andere hört normal: ${sh[0].von}. Kommt ein belastender Tinnitus hinzu, kann der Gesamtwert steigen, aber nur, wenn die Folgen im Alltag belegt sind. Ein Rentner, 74 Jahre, ist beidseits hochgradig schwerhörig: ${sh[5].von}, damit schwerbehindert, mit Pauschbetrag von ${eur(pauschbetrag(sh[5].von))} im Jahr.</p>
<h2>Schwerhörigkeit im Beruf</h2>
<p>Ab GdB 50 gelten die Rechte schwerbehinderter Menschen am Arbeitsplatz: der besondere Kündigungsschutz, für den das Integrationsamt zustimmen muss, und der Zusatzurlaub von einer Arbeitswoche im Jahr. Wer mit 30 oder 40 gleichgestellt wird, erhält den Kündigungsschutz, aber keinen Zusatzurlaub. Der besondere Kündigungsschutz greift erst, wenn das Arbeitsverhältnis länger als sechs Monate ohne Unterbrechung besteht. Für den Zusatzurlaub kommt es darauf an, ab wann die Schwerbehinderung besteht; im ersten und letzten Jahr gibt es ihn anteilig. Die Einzelheiten stehen auf der Seite ${h.a('kuendigungsschutz-schwerbehinderung', 'Kündigungsschutz')}.</p>
<h2>Wenn das Gehör nachlässt</h2>
<p>Schwerhörigkeit nimmt oft über Jahre zu. Eine neue Bewertung lohnt sich, wenn der Hörverlust in Tabelle D eine Stufe höher rutscht und der Einzelwert dadurch um mindestens 10 steigt; nach Teil A Nummer 7 ist eine Änderung wesentlich, wenn sie länger als sechs Monate anhält. Ein neues Audiogramm im Vergleich zum alten ist der Beleg. Wer bereits einen Bescheid hat, stellt einen Änderungsantrag beim selben Amt; die Folgen erklärt die Seite ${h.a('verschlimmerungsantrag', 'Verschlimmerungsantrag')}.</p>
<h2>Was in den Antrag gehört</h2>
<p>Aktuelle Ton- und Sprachaudiogramme beider Ohren, die Verordnung der Hörgeräte oder des Cochlea-Implantats, Berichte über Tinnitus oder Schwindel mit Angaben zu Häufigkeit und Folgen, gegebenenfalls ein psychotherapeutischer Bericht. Beschreiben Sie selbst, in welchen Lagen das Verstehen scheitert: Gespräche in Gruppen, Telefonate, Besprechungen am Arbeitsplatz. Über den Wert entscheidet das Versorgungsamt; die Tabelle gibt den Rahmen vor, die Befunde den Platz darin.</p>
<p>Bei einer Hörstörung, die durch Lärm am Arbeitsplatz entstanden ist, kommt neben dem GdB eine Berufskrankheit in Betracht; die Unfallversicherung prüft sie nach eigenen Regeln und unabhängig vom Versorgungsamt.</p>
`,
  },
});
