/** Merkzeichen und ihre Folgen: welche Nachteilsausgleiche ein GdB mit bestimmten Merkzeichen auslöst, mit den gesetzlichen Voraussetzungen. */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { rechte, MERKZEICHEN, type Merkzeichen } from '../../lib/engine/rechte';
import { MZ_INFO } from '../../data/merkzeichen';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import { Zeilen, Aktionen, Kopf, Rechenweg, Hinweis, kasten, rahmen, raster, type Zeile } from './kit';

interface Props { methodHref?: string; preset?: { mz?: string; gdb?: number } }
const mzLesen = (x: string) => x.split('.').filter((m): m is Merkzeichen => (MERKZEICHEN as string[]).includes(m));

export default function MerkzeichenRechner({ methodHref, preset = {} }: Props) {
  const d = { g: preset.gdb ?? 70, m: preset.mz ?? 'G' };
  const [gdb, setGdb] = useState(d.g);
  const [mz, setMz] = useState<Merkzeichen[]>(() => mzLesen(d.m));
  useEffect(() => {
    const u = readParams(window.location.search); if (![...u.keys()].length) return;
    setGdb(num(u, 'g', d.g)); setMz(mzLesen(str(u, 'm', d.m)));
  }, []);
  useEffect(() => { updateURL({ g: gdb, m: mz.join('.') }); }, [gdb, mz]);
  const toggle = (m: Merkzeichen) => setMz((o) => (o.includes(m) ? o.filter((x) => x !== m) : [...o, m]));
  const liste = useMemo(() => rechte(gdb, mz).filter((r) => ['pauschbetrag', 'fahrtkosten', 'freifahrt', 'kfz', 'begleitung', 'parken', 'rundfunk'].includes(r.id)), [gdb, mz]);
  const zeilen: Zeile[] = liste.map((r) => ({ label: r.titel, value: r.wert, strong: r.gilt, muted: !r.gilt }));
  const anzahl = liste.filter((r) => r.gilt).length;
  const steps = [
    ...mz.map((m) => `${MZ_INFO[m].name}: ${MZ_INFO[m].voraussetzung}`),
    ...liste.filter((r) => r.gilt).map((r) => `${r.titel}: ${r.text}`),
  ];
  const warn = mz.filter((m) => MZ_INFO[m].mindestGdb && gdb < MZ_INFO[m].mindestGdb!);
  return (
    <div className={rahmen} data-chrome>
      <div className="srg h-1.5" aria-hidden="true" />
      <div className={raster}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <SelectField id="m-g" label="Grad der Behinderung" value={String(gdb)} onChange={(v) => setGdb(Number(v))} options={[20, 30, 40, 50, 60, 70, 80, 90, 100].map((g) => ({ value: String(g), label: `GdB ${g}` }))} />
          </div>
          <div role="group" aria-labelledby="m-mz-l">
            <p id="m-mz-l" className="mb-1 text-sm font-medium text-navy-700">Merkzeichen im Ausweis</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {MERKZEICHEN.map((m) => (
                <button key={m} type="button" aria-pressed={mz.includes(m)} onClick={() => toggle(m)}
                  className={`rounded-md border px-3 py-2 text-left text-sm ${mz.includes(m) ? 'border-accent-600 bg-accent-600 text-white' : 'border-navy-300 bg-white text-navy-800 hover:bg-navy-50'}`}>
                  <span className="font-semibold">{m}</span> <span className="opacity-90">{MZ_INFO[m].kurz}</span>
                </button>
              ))}
            </div>
          </div>
        </form>
        <div aria-live="polite" data-resultat className={kasten}>
          <Kopf label="Nachteilsausgleiche aus GdB und Merkzeichen" wert={`${anzahl} von ${liste.length}`} unter={mz.length ? `GdB ${gdb} mit ${mz.join(', ')}` : `GdB ${gdb} ohne Merkzeichen`} />
          {warn.length > 0 && <p className="mt-2 text-sm font-medium text-navy-900">{warn.map((m) => `${m} setzt in der Regel mindestens GdB ${MZ_INFO[m].mindestGdb} voraus.`).join(' ')}</p>}
          <Zeilen rows={zeilen} />
          <Rechenweg lang="de" steps={steps} />
          <Aktionen lang="de" text={() => `GdB ${gdb}${mz.length ? ` mit ${mz.join(', ')}` : ''}: ${liste.filter((r) => r.gilt).map((r) => `${r.titel} ${r.wert}`).join('; ')}`} />
          <Hinweis lang="de" methodHref={methodHref} />
        </div>
      </div>
    </div>
  );
}
