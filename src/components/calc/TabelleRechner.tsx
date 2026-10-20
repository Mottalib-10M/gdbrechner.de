/**
 * GdB-Tabelle: Suche in einer Auswahl der Werte aus Teil B der Versorgungsmedizinischen Grundsätze
 * (src/data/tabelle.json), Übernahme einzelner Werte und Gesamt-GdB der Auswahl.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { gesamtGdb } from '../../lib/engine/gesamt';
import { SYSTEME, systemName } from '../../data/systeme';
import { EINTRAEGE, type Eintrag } from '../../lib/engine/tabelle';
import { readParams, str, updateURL } from '../../lib/url-state';
import { Zeilen, Aktionen, Kopf, Hinweis, kasten, rahmen, raster, type Zeile } from './kit';

interface Props { methodHref?: string; preset?: { system?: string; q?: string } }
interface Wahl { id: string; stufe: number; gdb: number }
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss');
/** Ohne Suchbegriff: drei häufig gesuchte Einträge. */
const HAEUFIG = ['wirbelsaeulenschaeden', 'depression', 'diabetes'];
const spanne = (v: number, b: number) => (v === b ? `${v}` : `${v} bis ${b}`);

export default function TabelleRechner({ methodHref, preset = {} }: Props) {
  const [q, setQ] = useState(preset.q ?? '');
  const [sys, setSys] = useState(preset.system ?? 'alle');
  const [wahl, setWahl] = useState<Wahl[]>([]);
  useEffect(() => {
    const u = readParams(window.location.search); if (![...u.keys()].length) return;
    setQ(str(u, 'q', preset.q ?? '')); setSys(str(u, 's', preset.system ?? 'alle'));
    const w = str(u, 'w', '').split('~').map((t) => t.split('.')).filter((p) => p.length === 3 && EINTRAEGE.some((e) => e.id === p[0]))
      .map(([id, s, g]) => ({ id, stufe: Number(s) || 0, gdb: Number(g) || 0 }));
    setWahl(w.slice(0, 6));
  }, []);
  useEffect(() => { updateURL({ q, s: sys === (preset.system ?? 'alle') ? undefined : sys, w: wahl.map((w) => `${w.id}.${w.stufe}.${w.gdb}`).join('~') }); }, [q, sys, wahl]);

  const treffer = useMemo(() => {
    const n = norm(q.trim());
    if (!n && sys === 'alle') return HAEUFIG.map((id) => EINTRAEGE.find((e) => e.id === id)!).filter(Boolean);
    return EINTRAEGE.filter((e) => (sys === 'alle' || e.system === sys) && (!n || norm([e.name, ...(e.suche ?? [])].join(' ')).includes(n))).slice(0, 12);
  }, [q, sys]);
  const nimm = (e: Eintrag, i: number, g: number) => setWahl((o) => [...o.filter((w) => w.id !== e.id), { id: e.id, stufe: i, gdb: g }].slice(-6));
  const res = gesamtGdb(wahl.map((w) => ({ system: EINTRAEGE.find((e) => e.id === w.id)!.system, gdb: w.gdb, beziehung: 'unabhaengig' })));
  const zeilen: Zeile[] = wahl.map((w) => { const e = EINTRAEGE.find((x) => x.id === w.id)!; return { label: e.name, value: `GdB ${w.gdb}` }; });
  const link = `/de/?r=${encodeURIComponent(wahl.map((w) => `${EINTRAEGE.find((e) => e.id === w.id)!.system}.${w.gdb}.u`).join('~'))}`;

  return (
    <div className={rahmen} data-chrome>
      <div className="srg h-1.5" aria-hidden="true" />
      <div className={raster}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
              <label htmlFor="t-q" className="mb-1 block text-sm font-medium text-navy-700">Erkrankung suchen</label>
              <input id="t-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="z. B. Bandscheibe, Diabetes"
                className="h-12 w-full rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
            </div>
            <SelectField id="t-s" label="Bereich" value={sys} onChange={setSys} options={[{ value: 'alle', label: 'alle Bereiche' }, ...SYSTEME.map((s) => ({ value: s.id, label: s.name }))]} />
          </div>
          <ul className="space-y-3">
            {treffer.map((e) => (
              <li key={e.id} className="rounded-lg border border-navy-200 p-3">
                <p className="text-sm font-semibold text-navy-900">{e.name} <span className="font-normal text-navy-600">· Teil B Nr. {e.nr}</span></p>
                <table className="mt-2 w-full text-sm"><tbody>
                  {e.stufen.map((s, i) => (
                    <tr key={i} className="border-t border-navy-100 align-top">
                      <td className="py-1.5 pr-2 text-navy-800">{s.text}</td>
                      <td className="whitespace-nowrap py-1.5 text-right tabular-nums">
                        {Array.from(new Set([s.von, s.bis])).filter((g) => g > 0).map((g) => (
                          <button key={g} type="button" onClick={() => nimm(e, i, g)} aria-pressed={wahl.some((w) => w.id === e.id && w.stufe === i && w.gdb === g)}
                            className={`ml-1 rounded border px-2 py-0.5 font-semibold ${wahl.some((w) => w.id === e.id && w.stufe === i && w.gdb === g) ? 'border-accent-600 bg-accent-600 text-white' : 'border-navy-300 text-navy-900 hover:bg-navy-50'}`}>{g}</button>
                        ))}
                        {s.von === 0 && s.bis === 0 && <span className="text-navy-600">0</span>}
                      </td>
                    </tr>
                  ))}
                </tbody></table>
                {e.hinweis && <p className="mt-1 text-xs text-navy-600">{e.hinweis}</p>}
              </li>
            ))}
            {!treffer.length && <li className="text-sm text-navy-700">Kein Eintrag in dieser Auswahl. Die vollständige Tabelle steht in Teil B der Versorgungsmedizin-Verordnung.</li>}
          </ul>
        </form>
        <div aria-live="polite" data-resultat className={kasten}>
          <Kopf label={wahl.length > 1 ? 'Gesamt-GdB Ihrer Auswahl, geschätzt' : 'Gewählter Wert'} wert={wahl.length ? String(res.richt) : 'noch keiner'}
            unter={wahl.length > 1 ? `Spanne ${spanne(res.min, res.max)}, wenn die Leiden unabhängig sind` : 'Tippen Sie auf einen Wert in der Tabelle'} />
          {wahl.length > 0 && <Zeilen rows={zeilen} caption="Ihre Auswahl" />}
          {wahl.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <a href={link} className="rounded-md bg-accent-600 px-3 py-2 font-medium text-white hover:bg-accent-700">Im Gesamt-GdB-Rechner prüfen</a>
              <button type="button" onClick={() => setWahl([])} className="rounded-md border border-navy-300 bg-white px-3 py-2 text-navy-800 hover:bg-navy-50">Auswahl leeren</button>
            </div>
          )}
          <p className="mt-3 text-xs text-navy-600">Die Werte sind Anhaltswerte aus Teil B; {res.systeme.length ? `${res.systeme.length} Bereich${res.systeme.length > 1 ? 'e' : ''}: ${res.systeme.map((s) => systemName(s.system)).join(', ')}.` : 'die Einstufung hängt von Befunden und Funktionseinschränkungen ab, nicht von der Diagnose allein.'}</p>
          <Aktionen lang="de" text={() => `GdB-Tabelle: ${wahl.map((w) => `${EINTRAEGE.find((e) => e.id === w.id)!.name} ${w.gdb}`).join(', ')}`} />
          <Hinweis lang="de" methodHref={methodHref} />
        </div>
      </div>
    </div>
  );
}
