/** Regeln von VersMedV Teil A Nr. 3, Pauschbeträge, Fristen und Tarif 2026 als Testfälle. */
import { describe, expect, it } from 'vitest';
import { gesamtGdb, stufe } from '../src/lib/engine/gesamt';
import { pauschbetrag, fahrtkosten, zusatzurlaub, zusatzurlaubAnteilig, rente, rechte } from '../src/lib/engine/rechte';
import { estGrund, est, soli, zumutbar, steuerwirkung } from '../src/lib/engine/steuer';
import { EINTRAEGE } from '../src/lib/engine/tabelle';
import { SYSTEME } from '../src/data/systeme';

const g = (...xs: Array<[string, number, any?]>) => gesamtGdb(xs.map(([system, gdb, beziehung]) => ({ system, gdb, beziehung })));

describe('Gesamt-GdB nach Teil A Nr. 3', () => {
  it('keine Addition: 30 und 30 unabhängig ergeben 30 bis 40, nie 60', () => {
    const r = g(['a', 30], ['b', 30, 'unabhaengig']);
    expect([r.min, r.richt, r.max]).toEqual([30, 40, 40]);
  });
  it('Ausgang ist der höchste Einzelwert, unabhängig von der Reihenfolge', () => {
    expect(g(['a', 20], ['b', 50, 'unabhaengig']).ausgang).toBe(50);
  });
  it('GdB 10 erhöht in der Regel nicht (3.5)', () => {
    for (const b of ['nachteilig', 'unabhaengig', 'teilweise', 'vollstaendig']) expect(g(['a', 40], ['b', 10, b]).max).toBe(40);
  });
  it('GdB 20 erhöht vielfach nicht, nur der Richtwert bei Verstärkung', () => {
    expect(g(['a', 50], ['b', 20, 'unabhaengig'])).toMatchObject({ min: 50, richt: 50, max: 60 });
    expect(g(['a', 50], ['b', 20, 'nachteilig'])).toMatchObject({ min: 50, richt: 60, max: 60 });
    expect(g(['a', 50], ['b', 20, 'vollstaendig'])).toMatchObject({ min: 50, richt: 50, max: 50 });
  });
  it('vollständige Überschneidung erhöht nicht (3.3.4)', () => {
    expect(g(['a', 40], ['b', 40, 'vollstaendig'])).toMatchObject({ min: 40, richt: 40, max: 40 });
  });
  it('Verstärkung erhöht in der Regel (3.3.1), mindestens um 10', () => {
    expect(g(['a', 40], ['b', 30, 'nachteilig'])).toMatchObject({ min: 50, richt: 50, max: 60 });
  });
  it('gleiches Funktionssystem wird zuerst zusammengefasst (3.1)', () => {
    const r = g(['wirbelsaeule', 30], ['wirbelsaeule', 20, 'teilweise'], ['psyche', 30, 'unabhaengig']);
    expect(r.systeme.find((s) => s.system === 'wirbelsaeule')).toMatchObject({ gdb: 30, teile: 2 });
  });
  it('Obergrenze 100, Zehnerstufen', () => {
    expect(g(['a', 90], ['b', 80, 'nachteilig'], ['c', 70, 'nachteilig']).max).toBe(100);
    expect(stufe(25)).toBe(30); expect(stufe(-5)).toBe(0); expect(stufe(NaN)).toBe(0);
  });
  it('leere Liste ergibt 0', () => { expect(g().richt).toBe(0); });
});

describe('Rechte 2026', () => {
  it('Pauschbeträge § 33b Abs. 3 EStG', () => {
    expect([20, 30, 40, 50, 60, 70, 80, 90, 100].map((x) => pauschbetrag(x))).toEqual([384, 620, 860, 1140, 1440, 1780, 2120, 2460, 2840]);
    expect(pauschbetrag(10)).toBe(0);
    expect(pauschbetrag(50, ['H'])).toBe(7400); expect(pauschbetrag(100, ['Bl'])).toBe(7400); expect(pauschbetrag(100, ['TBl'])).toBe(7400);
  });
  it('Fahrtkostenpauschale § 33 Abs. 2a EStG', () => {
    expect(fahrtkosten(70)).toBe(0); expect(fahrtkosten(70, ['G'])).toBe(900); expect(fahrtkosten(80)).toBe(900);
    expect(fahrtkosten(50, ['aG'])).toBe(4500); expect(fahrtkosten(100, ['H'])).toBe(4500); expect(fahrtkosten(60, ['G'])).toBe(0);
  });
  it('Zusatzurlaub § 208 SGB IX', () => {
    expect(zusatzurlaub(40)).toBe(0); expect(zusatzurlaub(50)).toBe(5); expect(zusatzurlaub(50, 4)).toBe(4); expect(zusatzurlaub(50, 6)).toBe(6);
    expect(zusatzurlaubAnteilig(5, 12)).toBe(5); expect(zusatzurlaubAnteilig(5, 6)).toBe(3); expect(zusatzurlaubAnteilig(5, 1)).toBeCloseTo(0.42, 2);
    expect(zusatzurlaubAnteilig(5, 3)).toBe(1.25); expect(zusatzurlaubAnteilig(5, 0)).toBe(0);
  });
  it('Altersrente § 37 und § 236a SGB VI', () => {
    expect(rente(1964)).toMatchObject({ ohneJ: 65, ohneM: 0, fruehJ: 62, fruehM: 0 });
    expect(rente(1975)).toMatchObject({ ohneJ: 65, fruehJ: 62 });
    expect(rente(1963)).toMatchObject({ ohneJ: 64, ohneM: 10, fruehJ: 61, fruehM: 10 });
    expect(rente(1958)).toMatchObject({ ohneJ: 64, ohneM: 0 });
    expect(rente(1964)!.abschlagMax).toBeCloseTo(0.108, 3);
    expect(rente(1940)).toBeNull();
  });
  it('Kfz-Steuer: H, Bl, aG befreit; G halbe Steuer; TBl allein nicht im Gesetz', () => {
    const k = (m: any[]) => rechte(80, m).find((r) => r.id === 'kfz')!.wert;
    expect(k(['aG'])).toBe('befreit'); expect(k(['G'])).toMatch(/50/); expect(k(['TBl'])).toBe('nein'); expect(k([])).toBe('nein');
  });
  it('Gleichgestellte: kein Zusatzurlaub, Status bei 30 und 40', () => {
    expect(rechte(40).find((r) => r.id === 'urlaub')!.gilt).toBe(false);
    expect(rechte(30).find((r) => r.id === 'status')!.wert).toMatch(/Gleichstellung/);
    expect(rechte(50).find((r) => r.id === 'status')!.wert).toBe('schwerbehindert');
  });
});

describe('Einkommensteuer 2026 (§ 32a EStG)', () => {
  it('Grundfreibetrag und stetige Zonengrenzen', () => {
    expect(estGrund(12348)).toBe(0);
    expect(estGrund(12349)).toBeLessThanOrEqual(1);
    for (const x of [17799, 69878, 277825]) expect(Math.abs(estGrund(x + 1) - estGrund(x))).toBeLessThanOrEqual(2);
  });
  it('Splitting verdoppelt die Steuer auf die Hälfte', () => {
    expect(est(80000, true)).toBe(2 * estGrund(40000));
  });
  it('Solidaritätszuschlag: Freigrenze und Milderung', () => {
    expect(soli(20350, false)).toBe(0);
    expect(soli(21000, false)).toBeCloseTo((21000 - 20350) * 0.119, 1);
    expect(soli(100000, false)).toBeCloseTo(5500, 0);
  });
  it('zumutbare Belastung stufenweise', () => {
    expect(zumutbar(15340, false, 0)).toBe(Math.floor(15340 * 0.05));
    expect(zumutbar(30000, false, 0)).toBe(Math.floor(15340 * 0.05 + (30000 - 15340) * 0.06));
    expect(zumutbar(60000, true, 3)).toBe(Math.floor(15340 * 0.01 + (51130 - 15340) * 0.01 + (60000 - 51130) * 0.02));
  });
  it('Pauschbetrag senkt die Steuer, nie negativ', () => {
    const r = steuerwirkung({ zve: 40000, splitting: false, kirche: 0, pauschbetrag: 1140, fahrtkosten: 0, weitereAgB: 0, kinder: 0 });
    expect(r.ersparnis).toBeGreaterThan(250); expect(r.ersparnis).toBeLessThan(500);
    expect(steuerwirkung({ zve: 5000, splitting: false, kirche: 0, pauschbetrag: 2840, fahrtkosten: 900, weitereAgB: 0, kinder: 0 }).ersparnis).toBe(0);
  });
});

describe('GdB-Tabelle', () => {
  it('jeder Eintrag gehört zu einem bekannten Funktionssystem, IDs eindeutig', () => {
    const ids = new Set(SYSTEME.map((s) => s.id));
    for (const e of EINTRAEGE) expect(ids.has(e.system), e.id).toBe(true);
    expect(new Set(EINTRAEGE.map((e) => e.id)).size).toBe(EINTRAEGE.length);
    for (const e of EINTRAEGE) for (const s of e.stufen) { expect(s.von).toBeLessThanOrEqual(s.bis); expect(s.bis).toBeLessThanOrEqual(100); }
  });
});
