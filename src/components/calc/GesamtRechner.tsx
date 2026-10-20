/**
 * Gesamt-GdB-Rechner: Einzel-GdB je Beeinträchtigung → Gesamt-GdB als Spanne und Richtwert nach
 * VersMedV Teil A Nr. 3 (Fassung ab 03.10.2025) → Rechte nach GdB und Merkzeichen.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import NumberField from '../ui/NumberField';
import { gesamtGdb, BEZIEHUNGEN, type Beziehung } from '../../lib/engine/gesamt';
import { rechte, MERKZEICHEN, MZ_NAME, type Merkzeichen } from '../../lib/engine/rechte';
import { SYSTEME, systemName } from '../../data/systeme';
import { readParams, str, num, updateURL } from '../../lib/url-state';
import { Zeilen, Aktionen, Kopf, Rechenweg, Hinweis, kasten, rahmen, raster, type Zeile } from './kit';

interface Row { s: string; g: number; b: Beziehung }
interface Props { methodHref?: string; preset?: { rows?: string; mz?: string } }

export const BEZ_TEXT: Record<Beziehung, string> = {
  unabhaengig: 'betrifft andere Lebensbereiche',
  nachteilig: 'verstärkt die stärkste',
  teilweise: 'überschneidet sich teilweise',
  vollstaendig: 'hat dieselben Folgen',
};
const BEZ_KURZ: Record<string, Beziehung> = { u: 'unabhaengig', n: 'nachteilig', t: 'teilweise', v: 'vollstaendig' };
const kurz = (b: Beziehung) => b[0];
const GDB_OPT = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((g) => ({ value: String(g), label: `GdB ${g}` }));
const DEFAULT = 'wirbelsaeule.30.u~psyche.30.u~stoffwechsel.20.u';

function lesen(x: string): Row[] {
  const rows = x.split('~').map((t) => t.split('.')).filter((p) => p.length >= 2)
    .map(([s, g, b]) => ({ s: SYSTEME.some((y) => y.id === s) ? s : SYSTEME[0].id, g: Math.min(100, Math.max(10, Math.round(Number(g) / 10) * 10 || 10)), b: BEZ_KURZ[b] ?? 'unabhaengig' }));
  return rows.length ? rows.slice(0, 6) : lesen(DEFAULT);
}
const schreiben = (rows: Row[]) => rows.map((r) => `${r.s}.${r.g}.${kurz(r.b)}`).join('~');
const mzLesen = (x: string) => x.split('.').filter((m): m is Merkzeichen => (MERKZEICHEN as string[]).includes(m));

export default function GesamtRechner({ methodHref, preset = {} }: Props) {
  const start = preset.rows ?? DEFAULT;
  const [rows, setRows] = useState<Row[]>(() => lesen(start));
  const [mz, setMz] = useState<Merkzeichen[]>(() => mzLesen(preset.mz ?? ''));
  const [jahr, setJahr] = useState(1970);
  useEffect(() => {
    const u = readParams(window.location.search); if (![...u.keys()].length) return;
    setRows(lesen(str(u, 'r', start))); setMz(mzLesen(str(u, 'm', preset.mz ?? ''))); setJahr(num(u, 'j', 1970));
  }, []);
  useEffect(() => { updateURL({ r: schreiben(rows), m: mz.join('.'), j: jahr }); }, [rows, mz, jahr]);

  const res = useMemo(() => gesamtGdb(rows.map((r) => ({ system: r.s, gdb: r.g, beziehung: r.b }))), [rows]);
  const liste = useMemo(() => rechte(res.richt, mz, jahr), [res.richt, mz, jahr]);
  const set = (i: number, p: Partial<Row>) => setRows((o) => o.map((r, k) => (k === i ? { ...r, ...p } : r)));
  const add = () => setRows((o) => (o.length >= 6 ? o : [...o, { s: SYSTEME.find((y) => !o.some((r) => r.s === y.id))?.id ?? SYSTEME[0].id, g: 20, b: 'unabhaengig' }]));
  const del = (i: number) => setRows((o) => (o.length <= 1 ? o : o.filter((_, k) => k !== i)));
  const toggle = (m: Merkzeichen) => setMz((o) => (o.includes(m) ? o.filter((x) => x !== m) : [...o, m]));

  const zeilen: Zeile[] = liste.map((r) => ({ label: r.titel, value: r.wert, strong: r.gilt && r.id !== 'status', muted: !r.gilt }));
  const steps: string[] = [];
  for (const s of res.systeme) if (s.teile > 1) steps.push(`${systemName(s.system)}: ${s.teile} Beeinträchtigungen im selben Funktionssystem ergeben zusammen GdB ${s.gdb} (Teil A Nr. 3.1, dieselben Regeln wie beim Gesamt-GdB).`);
  res.schritte.forEach((s, i) => {
    const g = res.systeme.find((y) => y.system === s.text)?.gdb ?? 0;
    const zeile = rows.find((r) => r.s === s.text);
    if (i === 0) steps.push(`Ausgangswert ist der höchste Einzel-GdB: ${systemName(s.text)} mit ${g} (Nr. 3.2). Addition und Mittelung sind nicht zulässig.`);
    else {
      const regel = s.regel === '3.5' ? (g <= 10 ? `Nr. 3.5: ein GdB von 10 führt in der Regel nicht zu einer Erhöhung` : `Nr. 3.5: ein GdB von 20 erhöht vielfach nicht, ist aber zu prüfen`) : `Nr. ${s.regel}: ${BEZ_TEXT[zeile?.b ?? 'unabhaengig']}`;
      steps.push(`${systemName(s.text)} mit ${g}, ${regel}. Stand danach: ${s.min === s.max ? s.min : `${s.min} bis ${s.max}`}, Richtwert ${s.richt}.`);
    }
  });
  if (res.max > 0) steps.push(`Die Behörde entscheidet innerhalb dieser Spanne nach dem Gesamtbild (Teil A Nr. 3.4: Vergleich mit den Werten aus Teil B). Die Größe der Schritte im Richtwert ist eine Annahme dieser Seite, siehe Methodik.`);
  const schwelle = res.min < 50 && res.max >= 50;

  return (
    <div className={rahmen} data-chrome>
      <div className="srg h-1.5" aria-hidden="true" />
      <div className={raster}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          {rows.map((r, i) => (
            <fieldset key={i} className="rounded-lg border border-navy-200 p-3">
              <legend className="px-1 text-sm font-semibold text-navy-900">Beeinträchtigung {i + 1}</legend>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <SelectField id={`g-s${i}`} label="Bereich" value={r.s} onChange={(v) => set(i, { s: v })} options={SYSTEME.map((y) => ({ value: y.id, label: y.name }))} />
                <SelectField id={`g-g${i}`} label="Einzel-GdB" value={String(r.g)} onChange={(v) => set(i, { g: Number(v) })} options={GDB_OPT} />
                {rows.length > 1 && (
                  <SelectField id={`g-b${i}`} className="col-span-2" label="Zusammenhang mit der stärksten" value={r.b} onChange={(v) => set(i, { b: v as Beziehung })}
                    options={BEZIEHUNGEN.map((b) => ({ value: b, label: BEZ_TEXT[b] }))} />
                )}
              </div>
              {rows.length > 1 && <button type="button" onClick={() => del(i)} className="mt-2 text-sm text-navy-600 underline hover:text-navy-900">Entfernen</button>}
            </fieldset>
          ))}
          {rows.length < 6 && <button type="button" onClick={add} className="rounded-md border border-navy-300 bg-white px-3 py-2 text-sm font-medium text-navy-800 hover:bg-navy-50">Weitere Beeinträchtigung</button>}
          <div role="group" aria-labelledby="g-mz-l">
            <p id="g-mz-l" className="mb-1 text-sm font-medium text-navy-700">Merkzeichen (falls schon festgestellt)</p>
            <div className="flex flex-wrap gap-2">
              {MERKZEICHEN.map((m) => (
                <button key={m} type="button" aria-pressed={mz.includes(m)} title={MZ_NAME[m]} onClick={() => toggle(m)}
                  className={`h-10 min-w-[3rem] rounded-md border px-3 text-sm font-semibold ${mz.includes(m) ? 'border-accent-600 bg-accent-600 text-white' : 'border-navy-300 bg-white text-navy-800 hover:bg-navy-50'}`}>{m}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <NumberField id="g-j" label="Geburtsjahr (für die Rente)" value={jahr} onChange={setJahr} min={1940} max={2025} plain />
          </div>
        </form>
        <div aria-live="polite" data-resultat className={kasten}>
          <Kopf label="Gesamt-GdB, geschätzt" wert={res.max ? String(res.richt) : '0'} unter={res.max ? (res.min === res.max ? 'keine Spanne: der Wert ergibt sich aus den Regeln' : `Spanne ${res.min} bis ${res.max}, die Behörde entscheidet`) : 'Bitte einen Einzel-GdB wählen'} />
          <div className="spanne-bar relative mt-3 h-3 rounded-full" aria-hidden="true">
            <div className="spanne-fill absolute inset-y-0 rounded-full" style={{ left: `${res.min}%`, width: `${Math.max(1, res.max - res.min)}%` }} />
            <div className="spanne-punkt absolute -top-0.5 h-4 w-1.5 rounded" style={{ left: `calc(${res.richt}% - 3px)` }} />
            <div className="absolute -top-1 h-5 border-l-2 border-dashed border-navy-700" style={{ left: '50%' }} />
          </div>
          <p className="mt-1 text-xs text-navy-600">Gestrichelt: GdB 50, Schwelle der Schwerbehinderung.</p>
          {schwelle && <p className="mt-2 text-sm font-medium text-navy-900">Die Schwelle 50 liegt in Ihrer Spanne: Ob Sie als schwerbehindert gelten, hängt von der Würdigung der Behörde ab.</p>}
          <Zeilen rows={zeilen} caption={`Rechte bei GdB ${res.richt}`} />
          <Rechenweg lang="de" steps={steps} />
          <Aktionen lang="de" text={() => `Gesamt-GdB geschätzt ${res.richt} (Spanne ${res.min} bis ${res.max}) nach VersMedV Teil A Nr. 3`} />
          <Hinweis lang="de" methodHref={methodHref} />
        </div>
      </div>
    </div>
  );
}
