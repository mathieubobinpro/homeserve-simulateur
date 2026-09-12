# HomeServe — Simulateur de remplacement chauffage

Micro-simulateur de 4 écrans destiné aux clients existants d'HomeServe (base
de dépannage) pour les orienter vers des alternatives de remplacement de
leur équipement de chauffage vieillissant, avec coût estimé, économies
projetées et aides mobilisables le cas échéant.

Point d'entrée : un QR code scanné sur smartphone après une intervention de
dépannage, ou un lien reçu par email/SMS à J+2.

**Lien vers le Google Sheet de collecte des leads :**
`https://docs.google.com/spreadsheets/d/[SHEET_ID]`
_(à remplacer par l'URL réelle une fois le Sheet créé — ce lien permet à
HomeServe de consulter les leads en temps réel directement dans le Sheet,
sans accès technique nécessaire)._

**URL de production Vercel :** `https://[à-remplacer].vercel.app`

## Stack technique

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- Tailwind CSS v4
- React Context pour le state partagé entre écrans (persisté en
  `sessionStorage` pour survivre à un rafraîchissement de page)
- Google Sheets API (`googleapis`) pour la collecte des leads, appelée
  uniquement côté serveur

## Architecture des routes

| Route             | Écran                                                          |
| ------------------ | --------------------------------------------------------------- |
| `/`                 | Accroche — CTA vers le simulateur                                |
| `/equipement`       | Sélection de l'équipement actuel (gaz / fioul / PAC air-eau / autre) |
| `/details`          | Âge de l'équipement, code postal, fréquence de dépannage         |
| `/resultat`         | Alternatives de remplacement + formulaire de contact             |
| `/merci`            | Confirmation d'envoi                                             |
| `/non-eligible`     | Écran alternatif pour les équipements hors périmètre (PAC air-air, électrique...) |
| `/api/submit-lead`  | API Route serveur — écrit le lead dans Google Sheets             |

Logique de navigation depuis `/equipement` :

- **Chaudière gaz**, **Chaudière fioul** ou **PAC air-eau** → `/details` → `/resultat`
- **Autre** → `/non-eligible` (formulaire de contact optionnel, marqué `eligible = false`)

### Structure de fichiers

```
/app                        Routes Next.js (App Router)
  /api/submit-lead/route.ts API Route serveur (écriture Google Sheets)
/components                 Composants réutilisables (Header, CTAButton, Card, Badge, FormField, LeadForm)
/context                    SimulatorContext.tsx — state partagé entre écrans
/lib
  google-sheets.ts          Client Google Sheets (Service Account)
  offers.ts                 Données des offres (prix, économies, aides) — voir ci-dessous
  validation.ts             Validateurs email / téléphone / code postal
/public                     Assets statiques
```

## Où modifier les chiffres affichés

Toutes les fourchettes de prix, pourcentages d'économies et montants d'aides
sont codés en dur (pas d'API de calcul) dans **[`lib/offers.ts`](lib/offers.ts)**.
C'est le seul fichier à modifier pour ajuster les montants affichés sur
l'écran `/resultat`.

## Installation

```bash
npm install
cp .env.example .env.local
# puis renseigner .env.local avec les identifiants Google (voir ci-dessous)
npm run dev
```

L'application est disponible sur `http://localhost:3000`.

## Configuration Google Sheets (collecte des leads)

L'écriture des leads se fait exclusivement côté serveur, via
`app/api/submit-lead/route.ts` — les identifiants ne sont jamais exposés au
navigateur.

### 1. Créer le Google Sheet

Créer un Google Sheet vide. La ligne d'en-têtes (`Horodatage`, `Nom`,
`Email`, `Téléphone`, `Code postal`, `Équipement`, `Âge équipement`,
`Fréquence intervention`, `Éligible`) est créée automatiquement par
l'application au premier envoi si elle est absente.

Récupérer l'ID du Sheet dans son URL :
`https://docs.google.com/spreadsheets/d/<GOOGLE_SHEET_ID>/edit`

### 2. Créer un Service Account Google

1. Aller sur [Google Cloud Console](https://console.cloud.google.com/).
2. Créer un projet (ou en réutiliser un existant) et activer l'**API Google Sheets**.
3. Créer un **Service Account** (IAM & Admin → Comptes de service).
4. Générer une **clé JSON** pour ce compte de service et la conserver en
   lieu sûr (elle ne doit jamais être committée dans le dépôt).

### 3. Partager le Sheet avec le Service Account

Ouvrir le Google Sheet créé à l'étape 1, cliquer sur **Partager**, et
ajouter l'email du Service Account (ex. `xxx@xxx.iam.gserviceaccount.com`)
en tant qu'**éditeur**.

### 4. Configurer les variables d'environnement

Dans `.env.local` (en local) et dans les paramètres du projet Vercel (en
production) :

```
GOOGLE_SHEET_ID=<id_de_la_feuille>
GOOGLE_SERVICE_ACCOUNT_EMAIL=<email_du_service_account>
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=<clé_privée_du_json>
```

La clé privée du JSON contient des retours à la ligne (`\n`) : lors de la
saisie dans Vercel, coller la valeur telle quelle (avec des `\n` littéraux)
— le code se charge de les convertir en vrais retours à la ligne.

> En cas d'échec de l'écriture dans le Sheet (identifiants manquants ou
> invalides, quota dépassé, etc.), l'utilisateur n'est jamais bloqué :
> l'erreur est loguée côté serveur et le parcours se poursuit normalement
> vers l'écran de confirmation.

## Déploiement sur Vercel

1. Pousser le dépôt sur GitHub.
2. Importer le dépôt dans [Vercel](https://vercel.com/new) — Next.js est
   détecté automatiquement, aucune configuration supplémentaire n'est
   nécessaire.
3. Renseigner les 3 variables d'environnement ci-dessus dans les
   paramètres du projet Vercel (Settings → Environment Variables).
4. Déployer.

## Build

```bash
npm run build
```
