# Seiten des GdB-Rechners (de-grad-der-behinderung) schreiben und erweitern

Notice pour les agents qui prolongent le site (Grad der Behinderung, Gesamt-GdB, droits 2026 ; allemand seul).
À lire avec `~/Documents/GitHub/RECETTE-SITE.md` et **`research/fakten.md`** (faits vérifiés le 2026-10-20, seuls
autorisés) ; règle du Gesamt-GdB et levée de la réserve : `research/reserve-gesamt-gdb.md`.

## Principe : une page = un fichier

- `src/content/guides/<id>.ts` : guide (champ `mini`, ≥ 1 100 mots resume + FAQ + corps) ;
- `src/content/rechner/<id>.ts` : page outil (champ `tool`, ≥ 450 mots).

Modèles : guide `src/content/guides/gdb-50.ts`, outil `src/content/rechner/behinderten-pauschbetrag.ts`.
Copier la structure, jamais les phrases (`check-unique` ≤ 30 %). Une question de FAQ n'existe qu'une fois.
`tests/pages.test.ts` contrôle titres, descriptions, longueurs, liens, sources et minis ; les IDs prévus mais pas
encore écrits sont dans `tests/planned-ids.json`.

## Données et moteur

| Fichier | Contenu |
|---|---|
| `src/data/params-2026.json` | Seuils, Pauschbeträge, Fahrtkosten, Zusatzurlaub, Kündigung, Rente (§ 236a), Wertmarke, Rundfunk, tarif § 32a 2026, Soli, zumutbare Belastung, **annahme du Gesamt-GdB** (hypothèse du site, publiée sur /de/methodik/), sources |
| `src/data/tabelle.json` | 150 entrées de Teil B (texte abrégé, `von`/`bis`, `heilungsbewaehrung`) ; quelques valeurs 15/25 et 8 entrées sans `stufen` sont voulues |
| `src/data/dog-tabelle.json` | MdE-Tabelle der DOG complète (Teil B Nr. 4.3, 14 × 14, symétrique), lue par `engine/augen.ts` et le mini `augen` (page `/de/gdb-augen/`) |
| `src/data/systeme.ts`, `src/data/merkzeichen.ts` | Funktionssysteme ; Merkzeichen avec condition légale |

Moteur `src/lib/engine/` : `gesamt.ts` (Teil A Nr. 3 : système, plus haut Einzel-GdB, relations 3.3.1 à 3.3.4,
règle 3.5, sortie min/richt/max), `rechte.ts` (droits par GdB et Merkzeichen, Rente), `steuer.ts` (tarif 2026,
Soli, zumutbare Belastung stufenweise), `tabelle.ts`.
Calculateurs : `src/components/calc/{Gesamt,Tabelle,Pauschbetrag,Merkzeichen,Urlaub}Rechner.tsx` ; minis :
`src/lib/minis/<kind>.ts`. Tests : `tests/engine.test.ts`, `tests/pages.test.ts`.

## Interdits propres au site

- Jamais de conseil médical ni « vous aurez GdB X » : le site estime, la Behörde décide.
- Ne pas traiter en détail : Kfz-Steuer (bussgeldrechnen.de), Altersrente (rentenfenster.de), Pflege-Pauschbetrag
  (pflegegradrechnen.de). Ne pas lier ces sites (règle du portefeuille).
- `scripts/typo-nbsp.mjs` : la liste des mots qui protègent un nombre à point (« Nr. 3.2 », « Nummer 3.1 ») a été
  complétée pour ce site ; écrire « Nr. 18.9 », pas « (18.9) » seul, sinon le point devient virgule.
- `check-anglais.py` est retiré de `npm run check` : le site est allemand seul (brief du lot c).

## Ajouts du 2026-10-21 (SERP google.de)

- `/de/gdb-augen/` (Teil B Nr. 4, mini `augen`) et `/de/gdb-adhs-autismus/` (Teil B Nr. 3.5, mini `kind`), angles des recherches associées « GdB Rechner Augen / ADHS / Kinder ».
- « Grad der Behinderung » en toutes lettres dans le H1 de l'accueil, le titre et le H1 de la GdB-Tabelle, le H1 de « beantragen ».
