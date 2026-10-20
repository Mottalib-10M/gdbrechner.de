/**
 * Merkzeichen im Schwerbehindertenausweis: Kurzname und gesetzliche Voraussetzung im Wortlaut
 * (SGB IX § 228, § 229; SchwbAwV § 3; EStG § 33b; RBStV § 4 Abs. 2). Gelesen am 2026-10-20.
 */
import type { Merkzeichen } from '../lib/engine/rechte';
export interface MzInfo { name: string; kurz: string; voraussetzung: string; quelle: string; mindestGdb?: number }
export const MZ_INFO: Record<Merkzeichen, MzInfo> = {
  G: { name: 'Merkzeichen G', kurz: 'erheblich gehbehindert', quelle: '§ 229 Abs. 1 SGB IX', mindestGdb: 50,
    voraussetzung: 'Wer infolge einer Einschränkung des Gehvermögens, auch durch innere Leiden, Anfälle oder Störungen der Orientierung, Wegstrecken im Ortsverkehr nicht ohne erhebliche Schwierigkeiten oder nicht ohne Gefahren zurücklegen kann, die üblicherweise noch zu Fuß zurückgelegt werden.' },
  aG: { name: 'Merkzeichen aG', kurz: 'außergewöhnlich gehbehindert', quelle: '§ 229 Abs. 3 SGB IX', mindestGdb: 80,
    voraussetzung: 'Eine erhebliche mobilitätsbezogene Teilhabebeeinträchtigung, die einem GdB von mindestens 80 entspricht; man kann sich dauernd nur mit fremder Hilfe oder mit großer Anstrengung außerhalb des Fahrzeugs bewegen.' },
  B: { name: 'Merkzeichen B', kurz: 'Begleitperson', quelle: '§ 229 Abs. 2 SGB IX', mindestGdb: 50,
    voraussetzung: 'Wer bei der Benutzung öffentlicher Verkehrsmittel infolge der Behinderung regelmäßig auf Hilfe angewiesen ist. Das bedeutet nicht, dass man ohne Begleitung eine Gefahr darstellt.' },
  H: { name: 'Merkzeichen H', kurz: 'hilflos', quelle: '§ 33b Abs. 3 EStG, § 65 Abs. 2 EStDV',
    voraussetzung: 'Wer für eine Reihe häufig und regelmäßig wiederkehrender Verrichtungen zur Sicherung der persönlichen Existenz im Ablauf jedes Tages dauernd fremde Hilfe braucht. Steuerlich steht Pflegegrad 4 oder 5 dem Merkzeichen H gleich.' },
  Bl: { name: 'Merkzeichen Bl', kurz: 'blind', quelle: '§ 3 Abs. 1 Nr. 3 SchwbAwV, § 72 Abs. 5 SGB XII', mindestGdb: 100,
    voraussetzung: 'Blind ist, wem das Augenlicht vollständig fehlt, und wessen Sehschärfe auf keinem Auge und auch nicht beidäugig mehr als 0,02 (1/50) beträgt, oder wer eine gleich schwere andere Störung des Sehvermögens hat (VersMedV Teil A Nr. 6).' },
  TBl: { name: 'Merkzeichen TBl', kurz: 'taubblind', quelle: '§ 3 Abs. 1 Nr. 8 SchwbAwV', mindestGdb: 100,
    voraussetzung: 'Wegen einer Störung der Hörfunktion mindestens GdB 70 und wegen einer Störung des Sehvermögens GdB 100.' },
  Gl: { name: 'Merkzeichen Gl', kurz: 'gehörlos', quelle: '§ 228 SGB IX, VersMedV Teil D Nr. 4',
    voraussetzung: 'Gehörlos sind Menschen mit Taubheit beiderseits und Menschen mit einer an Taubheit grenzenden Schwerhörigkeit beiderseits, wenn daneben schwere Sprachstörungen bestehen.' },
  RF: { name: 'Merkzeichen RF', kurz: 'Rundfunkbeitrag ermäßigt', quelle: '§ 4 Abs. 2 RBStV',
    voraussetzung: 'Blinde oder wesentlich sehbehinderte Menschen mit GdB 60 allein wegen der Sehbehinderung, Hörgeschädigte ohne ausreichende Verständigung über das Gehör, oder GdB 80 und dauerhaft keine Teilnahme an öffentlichen Veranstaltungen möglich.' },
};
