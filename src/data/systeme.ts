/**
 * Funktionssysteme nach den Kapiteln der Versorgungsmedizinischen Grundsätze, Teil B (VersMedV, Anlage).
 * Die Haltungs- und Bewegungsorgane (Teil B Nr. 18) sind wie in der Praxis der Versorgungsämter in
 * Wirbelsäule, Arme und Beine getrennt. Die IDs sind dieselben wie in `tabelle.json`.
 */
export interface System { id: string; name: string; teilB: string }
export const SYSTEME: System[] = [
  { id: 'wirbelsaeule', name: 'Wirbelsäule und Rumpf', teilB: '18.9' },
  { id: 'beine', name: 'Beine, Hüfte, Knie, Füße', teilB: '18.14' },
  { id: 'arme', name: 'Arme, Schulter, Hände', teilB: '18.13' },
  { id: 'rheuma', name: 'Rheuma und Gelenke allgemein', teilB: '18.2' },
  { id: 'psyche', name: 'Gehirn, Nerven und Psyche', teilB: '3' },
  { id: 'herz', name: 'Herz und Kreislauf', teilB: '9' },
  { id: 'lunge', name: 'Atmung und Lunge', teilB: '8' },
  { id: 'stoffwechsel', name: 'Stoffwechsel und Hormone', teilB: '15' },
  { id: 'verdauung', name: 'Verdauung und Bauch', teilB: '10' },
  { id: 'harn', name: 'Nieren und Harnwege', teilB: '12' },
  { id: 'geschlecht', name: 'Geschlechtsorgane und Brust', teilB: '13, 14' },
  { id: 'blut', name: 'Blut und Immunsystem', teilB: '16' },
  { id: 'augen', name: 'Augen', teilB: '4' },
  { id: 'ohren', name: 'Ohren und Gleichgewicht', teilB: '5' },
  { id: 'nase-mund', name: 'Nase, Mund, Kiefer, Hals', teilB: '6, 7' },
  { id: 'haut', name: 'Haut', teilB: '17' },
  { id: 'kopf', name: 'Kopf und Gesicht', teilB: '2' },
];
export const systemName = (id: string) => SYSTEME.find((s) => s.id === id)?.name ?? id;
