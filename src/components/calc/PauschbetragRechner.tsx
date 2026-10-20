/**
 * Steuerwirkung des Behinderten-Pauschbetrags (§ 33b EStG) und der Fahrtkostenpauschale (§ 33 Abs. 2a EStG),
 * Tarif 2026 (§ 32a EStG), mit Solidaritätszuschlag und Kirchensteuer.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import NumberField from '../ui/NumberField';
import Toggle from '../ui/Toggle';
import { pauschbetrag, fahrtkosten, type Merkzeichen } from '../../lib/engine/rechte';
import { steuerwirkung } from '../../lib/engine/steuer';
import { P } from '../../lib/engine/params';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import { Zeilen, Aktionen, Kopf, Rechenweg, Hinweis, kasten, rahmen, raster, fm, type Zeile } from './kit';

interface Props { methodHref?: string; preset?: { gdb?: number; kind?: boolean } }
const GDB_OPT = [20, 30, 40, 50, 60, 70, 80, 90, 100].map((g) => ({ value: String(g), label: `GdB ${g}` }));
const MZ_OPT = [
  { value: '-', label: 'keines davon' },
  { value: 'G', label: 'G' },
  { value: 'aG', label: 'aG' },
  { value: 'H', label: 'H (hilflos)' },
  { value: 'Bl', label: 'Bl (blind)' },
  { value: 'TBl', label: 'TBl (taubblind)' },
];
const KIRCHE = [{ value: '0', label: 'keine' }, { value: '8', label: '8 % (Bayern, Baden-Württemberg)' }, { value: '9', label: '9 % (übrige Länder)' }];

export default function PauschbetragRechner({ methodHref, preset = {} }: Props) {
  const f = fm('de');
  const d = { g: preset.gdb ?? 50, z: 40000 };
  const [gdb, setGdb] = useState(d.g);
  const [mz, setMz] = useState('-');
  const [zve, setZve] = useState(d.z);
  const [split, setSplit] = useState('0');
  const [kirche, setKirche] = useState('0');
  const [kinder, setKinder] = useState(0);
  const [weitere, setWeitere] = useState(0);
  useEffect(() => {
    const u = readParams(window.location.search); if (![...u.keys()].length) return;
    setGdb(num(u, 'g', d.g)); setMz(str(u, 'm', '-')); setZve(num(u, 'z', d.z)); setSplit(str(u, 's', '0'));
    setKirche(str(u, 'k', '0')); setKinder(num(u, 'c', 0)); setWeitere(num(u, 'w', 0));
  }, []);
  useEffect(() => { updateURL({ g: gdb, m: mz, z: zve, s: split, k: kirche, c: kinder, w: weitere }); }, [gdb, mz, zve, split, kirche, kinder, weitere]);

  const liste = (mz === '-' ? [] : [mz]) as Merkzeichen[];
  const pb = pauschbetrag(gdb, liste);
  const fk = fahrtkosten(gdb, liste);
  const r = useMemo(() => steuerwirkung({ zve, splitting: split === '1', kirche: Number(kirche) / 100, pauschbetrag: pb, fahrtkosten: fk, weitereAgB: weitere, kinder }), [zve, split, kirche, pb, fk, weitere, kinder]);
  const rows: Zeile[] = [
    { label: 'Pauschbetrag nach § 33b', value: f.eur(pb) },
    { label: 'Fahrtkostenpauschale nach § 33 Abs. 2a', value: f.eur(fk) },
    { label: 'Zumutbare Belastung', value: f.eur(r.zumutbar), muted: true },
    { label: 'Davon über der zumutbaren Belastung', value: f.eur(r.abzug33) },
    { label: 'Steuer ohne diese Abzüge', value: f.eur(r.ohne), sep: true },
    { label: 'Steuer mit den Abzügen', value: f.eur(r.mit) },
    { label: 'Ersparnis im Jahr', value: f.eur(r.ersparnis), strong: true },
  ];
  const steps = [
    pb === P.pauschbetrag.erhoeht && liste.length
      ? `Mit Merkzeichen ${mz} gilt unabhängig vom GdB der erhöhte Pauschbetrag von ${f.eur(pb)} (§ 33b Abs. 3 Satz 3 EStG).`
      : `GdB ${gdb}: Pauschbetrag ${f.eur(pb)} (§ 33b Abs. 3 Satz 2 EStG, Beträge seit 2021 unverändert).`,
    fk
      ? `Fahrtkostenpauschale ${f.eur(fk)} (§ 33 Abs. 2a EStG). Sie gehört zu den außergewöhnlichen Belastungen und wird mit weiteren Kosten von ${f.eur(weitere)} um die zumutbare Belastung von ${f.eur(r.zumutbar)} gekürzt (§ 33 Abs. 3, stufenweise nach BFH VI R 75/14): abziehbar ${f.eur(r.abzug33)}.`
      : `Keine Fahrtkostenpauschale: Sie setzt GdB ${P.fahrtkosten.gdb_klein}, GdB ${P.fahrtkosten.gdb_klein_mit_g} mit G oder eines der Merkzeichen aG, Bl, TBl, H voraus.`,
    `Einkommensteuer nach dem Tarif 2026 (§ 32a EStG${split === '1' ? ', Splitting' : ''}) auf ${f.eur(zve)}: ${f.eur(r.ohne)} mit Solidaritätszuschlag${kirche !== '0' ? ' und Kirchensteuer' : ''}; nach Abzug ${f.eur(r.mit)}.`,
    `Ersparnis ${f.eur(r.ersparnis)}, davon ${f.eur(r.ausPauschbetrag)} durch den Pauschbetrag. Grenzsteuersatz rund ${f.pct(r.grenzsteuersatz)}.`,
  ];
  return (
    <div className={rahmen} data-chrome>
      <div className="srg h-1.5" aria-hidden="true" />
      <div className={raster}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <SelectField id="p-g" label="Grad der Behinderung" value={String(gdb)} onChange={(v) => setGdb(Number(v))} options={GDB_OPT} />
            <SelectField id="p-m" label="Merkzeichen" value={mz} onChange={setMz} options={MZ_OPT} />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <NumberField id="p-z" label="Zu versteuerndes Einkommen" value={zve} onChange={setZve} unit="€" max={2000000} help="ohne Pauschbetrag, laut letztem Bescheid" />
            <Toggle id="p-s" label="Veranlagung" value={split} onChange={setSplit} options={[{ value: '0', label: 'Einzeln' }, { value: '1', label: 'Zusammen' }]} />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <SelectField id="p-k" label="Kirchensteuer" value={kirche} onChange={setKirche} options={KIRCHE} />
            <NumberField id="p-c" label="Kinder" value={kinder} onChange={setKinder} max={12} plain help="für die zumutbare Belastung" />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <NumberField id="p-w" label="Weitere Krankheitskosten" value={weitere} onChange={setWeitere} unit="€" max={500000} help="selbst gezahlt, ohne Erstattung" />
          </div>
        </form>
        <div aria-live="polite" data-resultat className={kasten}>
          <Kopf label="Steuerersparnis im Jahr, geschätzt" wert={f.eur(r.ersparnis)} unter={`Pauschbetrag ${f.eur(pb)}, Grenzsteuersatz ${f.pct(r.grenzsteuersatz)}`} />
          <Zeilen rows={rows} />
          <Rechenweg lang="de" steps={steps} />
          <Aktionen lang="de" text={() => `Pauschbetrag ${f.eur(pb)} bei GdB ${gdb}: Steuerersparnis rund ${f.eur(r.ersparnis)} im Jahr (Tarif 2026)`} />
          <Hinweis lang="de" methodHref={methodHref} />
        </div>
      </div>
    </div>
  );
}
