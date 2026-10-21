/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://gdbrechner.de";
export const SITE_NAMES: Record<string, string> = {"de": "GdB-Rechner", "en": "GdB-Rechner"};
export const LANG_TAGS: Record<string, string> = {"de": "de-DE", "en": "en-DE"};
export const OG_LOCALES: Record<string, string> = {"de": "de_DE", "en": "en_GB"};
export const LOCALE_TAG = 'de-DE';
export const LOCALE_BY_LANG: Record<string, string> = { de: 'de-DE' };
export const CURRENCY = 'EUR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-20';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"de": "Herausgeber eines Rechners für den Gesamt-GdB nach der Versorgungsmedizin-Verordnung und der Nachteilsausgleiche je GdB und Merkzeichen", "en": "Publisher of a calculator for the overall degree of disability under the German medical assessment ordinance and the entitlements it unlocks"};
export const AUTHOR_DESC: Record<string, string> = {"de": "Radif Partners liest die Versorgungsmedizin-Verordnung, das SGB IX, § 33b EStG und die Schwerbehindertenausweisverordnung im Wortlaut und baut daraus einen Rechner, der den Gesamt-GdB so schätzt, wie es Teil A Nummer 3 vorgibt: vom höchsten Einzelwert aus, ohne Addition. Wir stellen keine Diagnosen, beraten nicht medizinisch und vermitteln keine Anwälte oder Beratungsstellen. Entscheiden wird beim Versorgungsamt.", "en": "Radif Partners reads the German medical assessment ordinance, Social Code IX and the Income Tax Act in the original wording and turns them into an estimate of the overall degree of disability, starting from the highest single value and never adding. No diagnosis, no medical advice, no referrals: the pension office decides."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"de": ["Versorgungsmedizin-Verordnung (Versorgungsmedizinische Grundsätze, Teil A bis D)", "Feststellung des Grades der Behinderung nach § 152 SGB IX", "Behinderten-Pauschbetrag nach § 33b EStG", "Nachteilsausgleiche und Merkzeichen nach der Schwerbehindertenausweisverordnung"], "en": ["German medical assessment ordinance (VersMedV)", "Assessment of the degree of disability under Social Code IX", "Disability lump sum under section 33b Income Tax Act", "Disability card markers and entitlements"]};
export const CONTACT_EMAIL = "kontakt@gdbrechner.de";
export const THEME_COLOR = '#8B1E2D';
export const LOGO_SYMBOL = 'GdB';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = 'G-VS99DZTMGH';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = 'z16vu00thb';
export const INDEXNOW_KEY = '4143f40fbcc55d7f53e0cd9acbbdaffe';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',  // vide : comme les autres sites du portefeuille
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "Frankreich / France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "USt-IdNr.",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city']; // legalForm vide à dessein, comme les autres sites du portefeuille

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
