# HomeServe — Simulateur de remplacement chauffage

Micro-simulateur de 4 écrans destiné aux clients existants d'HomeServe (base
de dépannage) pour les orienter vers des alternatives de remplacement de
leur équipement de chauffage vieillissant, avec coût estimé, économies
projetées et aides mobilisables le cas échéant.

Point d'entrée : un QR code scanné sur smartphone après une intervention de
dépannage, ou un lien reçu par email/SMS à J+2.

**Dashboard Formspree de collecte des leads :**
https://formspree.io/forms/mnpqyrww/submissions
_(accessible au compte Formspree propriétaire du formulaire — ce lien
permet à HomeServe de consulter les leads en temps réel, sans accès
technique nécessaire, et de les exporter en CSV)._

**URL de production Vercel :** https://homeserve-simulateur.vercel.app

> Ce projet est un POC : la collecte de leads passe par
> [Formspree](https://formspree.io) plutôt que par une intégration Google
> Sheets, pour éviter la mise en place d'un Service Account / d'un projet
> Google Cloud. Migrer vers un stockage plus robuste (Google Sheets, base de
> données) reste possible en ne touchant qu'à `lib/leads.ts`.

## Stack technique

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- Tailwind CSS v4
- React Context pour le state partagé entre écrans (persisté en
  `sessionStorage` pour survivre à un rafraîchissement de page)
- [Formspree](https://formspree.io) pour la collecte des leads, appelé
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
| `/api/submit-lead`  | API Route serveur — envoie le lead à Formspree                   |

Logique de navigation depuis `/equipement` :

- **Chaudière gaz**, **Chaudière fioul** ou **PAC air-eau** → `/details` → `/resultat`
- **Autre** → `/non-eligible` (formulaire de contact optionnel, marqué `eligible = false`)

### Structure de fichiers

```
/app                        Routes Next.js (App Router)
  /api/submit-lead/route.ts API Route serveur (envoi du lead à Formspree)
/components                 Composants réutilisables (Header, CTAButton, Card, Badge, FormField, LeadForm)
/context                    SimulatorContext.tsx — state partagé entre écrans
/lib
  leads.ts                  Client Formspree (envoi des leads)
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
# puis renseigner .env.local avec l'identifiant du formulaire Formspree (voir ci-dessous)
npm run dev
```

L'application est disponible sur `http://localhost:3000`.

## Configuration Formspree (collecte des leads)

L'envoi des leads se fait exclusivement côté serveur, via
`app/api/submit-lead/route.ts`.

1. Créer un compte sur [formspree.io](https://formspree.io) (gratuit).
2. Créer un nouveau formulaire (**+ New Form**).
3. Récupérer son identifiant dans l'URL du formulaire :
   `https://formspree.io/f/<FORMSPREE_FORM_ID>`
4. Renseigner cet identifiant dans `.env.local` (en local) et dans les
   paramètres du projet Vercel (en production) :

   ```
   FORMSPREE_FORM_ID=<identifiant_du_formulaire>
   ```

5. Chaque lead envoyé apparaît dans le dashboard Formspree du formulaire
   (**Submissions**), avec export CSV possible, et déclenche une
   notification email à l'adresse du compte Formspree.

> En cas d'échec de l'envoi à Formspree (identifiant manquant ou invalide,
> quota dépassé, etc.), l'utilisateur n'est jamais bloqué : l'erreur est
> loguée côté serveur et le parcours se poursuit normalement vers l'écran
> de confirmation.

## Déploiement sur Vercel

Le projet `homeserve-simulateur` est déjà créé sur Vercel et déployé en
production (déploiement fait depuis la CLI, sans connexion GitHub
automatique). Pour que chaque `git push` déclenche un déploiement
automatique, connecter le dépôt depuis le dashboard Vercel :

**Project → Settings → Git → Connect Git Repository**, puis sélectionner
`mathieubobinpro/homeserve-simulateur` (autoriser l'app GitHub de Vercel si
demandé).

Pour repartir de zéro sur un autre compte Vercel :

1. Pousser le dépôt sur GitHub.
2. Importer le dépôt dans [Vercel](https://vercel.com/new) — Next.js est
   détecté automatiquement, aucune configuration supplémentaire n'est
   nécessaire.
3. Renseigner la variable d'environnement `FORMSPREE_FORM_ID` dans les
   paramètres du projet Vercel (Settings → Environment Variables).
4. Déployer.

## Build

```bash
npm run build
```
