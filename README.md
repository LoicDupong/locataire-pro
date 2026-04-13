# Locataire Pro

Outil web pour constituer un dossier de location complet, adapté à votre profil et exportable en PDF.

## Fonctionnalités

- **Checklist personnalisée** selon le pays (Belgique / France), la situation professionnelle et la présence d'un garant
- **Upload de documents** par glisser-déposer ou clic — stockage temporaire en session
- **Barre de progression** en temps réel (requis / optionnels)
- **Export PDF** : tous les documents fusionnés en un seul fichier, supprimés du serveur immédiatement après
- **Aucune donnée persistée** — tout est perdu au rechargement (usage intentionnellement éphémère)

## Stack

- [Next.js 16](https://nextjs.org/) — App Router (server + client components)
- [React 19](https://react.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/) — state management
- [pdf-lib](https://pdf-lib.js.org/) — génération PDF côté serveur
- SCSS Modules — styling (pas de Tailwind, pas d'UI lib)
- [Vitest](https://vitest.dev/) — tests unitaires

## Lancer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run test` | Tests unitaires (Vitest) |
| `npm run lint` | ESLint |

## Structure

```
app/
  page.tsx          # Landing page
  start/            # Étape 1 — saisie du profil
  dossier/          # Étape 2 — checklist + upload + export
  api/export/       # Route API — fusion PDF + nettoyage
components/
  landing/          # Composants de la page d'accueil
  ProfileForm       # Formulaire de profil (pays, situation, garant)
  Checklist         # Liste des documents à fournir
  ChecklistItem     # Item individuel avec upload
  ProgressBar       # Progression des documents requis
  ExportButton      # Déclencheur d'export PDF
lib/
  checklist.ts      # Génération de la checklist selon le profil
  pdfExport.ts      # Logique de fusion PDF
store/
  dossierStore.ts   # Store Zustand (profil + session + checklist)
types/
  dossier.ts        # Types partagés
```

## Profils supportés

| Pays | Situations |
|---|---|
| Belgique | Salarié, Étudiant, Indépendant, Sans emploi |
| France | Salarié, Étudiant, Indépendant, Sans emploi |

Chaque situation génère une checklist différente (documents requis + optionnels). Le profil étudiant et sans emploi inclut automatiquement les documents du garant si l'option est activée.

## Vie privée

Les fichiers uploadés sont stockés dans un dossier temporaire (`/tmp/<sessionId>`) côté serveur. Ils sont supprimés immédiatement après la génération du PDF. Aucune base de données, aucun stockage persistant.

---

Projet portfolio — [LoicDupong](https://github.com/LoicDupong)
