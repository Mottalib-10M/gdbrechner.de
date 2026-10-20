/** Zusatzurlaub für schwerbehinderte Menschen (§ 208 SGB IX): Tage je Woche und Monate im Jahr. */
import { useEffect, useState } from 'react';
import SelectField from '../ui/SelectField';
import NumberField from '../ui/NumberField';
import Toggle from '../ui/Toggle';
import { zusatzurlaub, zusatzurlaubAnteilig } from '../../lib/engine/rechte';
import { P } from '../../lib/engine/params';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import { Zeilen, Aktionen, Kopf, Rechenweg, Hinweis, kasten, rahmen, raster, fm, type Zeile } from './kit';

interface Props { methodHref?: string; preset?: Record<string, never> }
const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

export default function UrlaubRechner({ methodHref }: Props) {
  const f = fm('de');
  const [tage, setTage] = useState(5);
  const [ganz, setGanz] = useState('1');
  const [ab, setAb] = useState(0);
  const [gdb, setGdb] = useState(50);
  useEffect(() => {
    const u = readParams(window.location.search); if (![...u.keys()].length) return;
    setTage(num(u, 't', 5)); setGanz(str(u, 'v', '1')); setAb(num(u, 'a', 0)); setGdb(num(u, 'g', 50));
  }, []);
  useEffect(() => { updateURL({ t: tage, v: ganz, a: ab, g: gdb }); }, [tage, ganz, ab, gdb]);
  const t = Math.min(7, Math.max(0, tage));
  const jahr = zusatzurlaub(gdb, t);
  const monate = ganz === '1' ? 12 : 12 - ab;
  const anteil = ganz === '1' ? jahr : zusatzurlaubAnteilig(jahr, monate);
  const rows: Zeile[] = [
    { label: 'Anspruch im vollen Jahr', value: `${f.num(jahr, Number.isInteger(jahr) ? 0 : 1)} Tage` },
    { label: 'Volle Monate mit Schwerbehinderung', value: `${monate}` },
    { label: 'Zusatzurlaub in diesem Jahr', value: `${f.num(anteil, Number.isInteger(anteil) ? 0 : 1)} Tage`, strong: true },
  ];
  const steps = gdb < P.schwelle.schwerbehinderung
    ? [`Bei GdB ${gdb} besteht kein Anspruch: Zusatzurlaub gibt es erst ab GdB ${P.schwelle.schwerbehinderung}, auch Gleichgestellte erhalten ihn nicht (§ 151 Abs. 3 SGB IX).`]
    : [
      `${P.urlaub.tage_bei_5} Arbeitstage bei der Fünftagewoche; bei ${t} Arbeitstagen in der Woche ${P.urlaub.tage_bei_5} × ${t} ÷ 5 = ${f.num(jahr, 1)} Tage (§ 208 Abs. 1 SGB IX).`,
      ganz === '1'
        ? 'Die Schwerbehinderung bestand das ganze Jahr: voller Anspruch.'
        : `Schwerbehinderung ab ${MONATE[ab]}: ${monate} volle Monate, also ${monate}/12 des Anspruchs; ein Bruchteil von mindestens einem halben Tag wird aufgerundet (§ 208 Abs. 2 SGB IX).`,
      'Wird die Schwerbehinderung rückwirkend festgestellt, richtet sich die Übertragung des Zusatzurlaubs ins nächste Jahr nach den Urlaubsregeln Ihres Arbeitsverhältnisses (§ 208 Abs. 3 SGB IX).',
    ];
  return (
    <div className={rahmen} data-chrome>
      <div className="srg h-1.5" aria-hidden="true" />
      <div className={raster}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <SelectField id="u-g" label="Grad der Behinderung" value={String(gdb)} onChange={(v) => setGdb(Number(v))} options={[30, 40, 50, 60, 70, 80, 90, 100].map((g) => ({ value: String(g), label: `GdB ${g}` }))} />
            <NumberField id="u-t" label="Arbeitstage je Woche" value={tage} onChange={setTage} max={7} plain />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <Toggle id="u-v" label="Schwerbehindert im ganzen Jahr?" value={ganz} onChange={setGanz} options={[{ value: '1', label: 'Ja' }, { value: '0', label: 'Nein' }]} />
            {ganz === '0' && <SelectField id="u-a" label="Ab Beginn des Monats" value={String(ab)} onChange={(v) => setAb(Number(v))} options={MONATE.map((m, i) => ({ value: String(i), label: m }))} />}
          </div>
        </form>
        <div aria-live="polite" data-resultat className={kasten}>
          <Kopf label="Zusatzurlaub in diesem Jahr" wert={`${f.num(anteil, Number.isInteger(anteil) ? 0 : 1)} Tage`} unter={jahr ? `zusätzlich zum Urlaub aus Vertrag oder Tarif` : `kein Anspruch unter GdB ${P.schwelle.schwerbehinderung}`} />
          <Zeilen rows={rows} />
          <Rechenweg lang="de" steps={steps} />
          <Aktionen lang="de" text={() => `Zusatzurlaub nach § 208 SGB IX: ${f.num(anteil, 1)} Tage in diesem Jahr`} />
          <Hinweis lang="de" methodHref={methodHref} />
        </div>
      </div>
    </div>
  );
}
