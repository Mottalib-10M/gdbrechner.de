/** Typisierter Zugriff auf params-2026.json: jeder Rechtswert der Seite steht dort, nie in Seiten oder Code. */
import raw from '../../data/params-2026.json';

export type SourceKey = keyof typeof raw.sources;
export type Params = typeof raw;
export const P: Params = raw;
