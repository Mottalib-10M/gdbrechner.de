/**
 * Register der Mini-Rechner (RECETTE §9.3): eine Datei je Thema in `lib/minis/<kind>.ts`, hier automatisch
 * geladen. Jede Datei exportiert `default`: () => MiniSpec und ruft den Motor der Seite (lib/engine), nie eine zweite Rechnung.
 */
import type { MiniSpec } from './mini-types';
export type Lang = 'de';
type Factory = (l?: Lang) => MiniSpec;
const mods = import.meta.glob<{ default: Factory }>(['./minis/*.ts', '!./minis/_*.ts'], { eager: true });
export const MINIS: Record<string, Factory> = Object.fromEntries(
  Object.entries(mods).map(([f, m]) => [f.split('/').pop()!.replace(/\.ts$/, ''), m.default]),
);
export function getSpec(kind: string, _lang?: string): MiniSpec {
  const f = MINIS[kind];
  if (!f) throw new Error(`Unbekannter Mini-Rechner: ${kind} (src/lib/minis/${kind}.ts anlegen)`);
  return f('de');
}
