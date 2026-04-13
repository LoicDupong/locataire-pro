# App UI Harmonization — Design Spec

**Date:** 2026-04-12  
**Scope:** UI refactor — app flow (`/start`, `/dossier`) aligned with landing page  
**Approach:** Markup + SCSS refactor only, zero changes to business logic  
**Stack:** Next.js App Router, SCSS Modules, no external UI lib

---

## Context

The landing page (`/`) uses a dark, SaaS-grade aesthetic (Bricolage Grotesque + Figtree, CSS variables, dark sections). The app flow (`/start`, `/dossier`) was built separately and looks disconnected — hardcoded colors, basic borders, native radio inputs, no dark theme.

Goal: make the app feel like part of the same product as the landing, without refactoring any business logic.

---

## Design Decisions (from brainstorming)

| Topic | Choice |
|---|---|
| App layout structure | Stepper horizontal en haut, page épurée sans navbar |
| Theme | Dark mode — `#0D1117` background, `#161B27` surfaces |
| ChecklistItem style | Dark mode avec checkbox custom, badges dim |
| Progress + Export | Progression inline discrète + section export en bas de page |

---

## Section 1 — Tokens & Page Shells

### New CSS variables in `globals.scss`

```scss
--app-bg: #0D1117;
--app-surface: #161B27;
--app-border: rgba(255, 255, 255, 0.08);
--app-muted: rgba(255, 255, 255, 0.35);
--success: #22c55e;
--success-dim: rgba(34, 197, 94, 0.15);
--success-border: rgba(34, 197, 94, 0.3);
--warning-dim: rgba(253, 224, 71, 0.15);
--warning-text: #fcd34d;
```

### `app/start/page.module.scss`

- `background: var(--app-bg)`, `min-height: 100vh`
- Stepper horizontal centré en haut : deux cercles numérotés (1 → 2) reliés par une ligne, **étape 1 active** (`--primary`), étape 2 inactive (`--app-border`)
- Contenu centré : `max-width: 520px`, `margin: 0 auto`, `padding: 32px 16px`
- Pas de navbar. Le back link `← Accueil` existant est **supprimé** — le stepper suffit comme orientation

### `app/dossier/page.module.scss`

- Même fond `--app-bg`
- Stepper identique en haut, mais **étape 2 active**, étape 1 inactive (grisée avec checkmark vert)
- `max-width: 640px`, `margin: 0 auto`, `padding: 32px 16px 80px`
- Header : `display: flex`, `justify-content: space-between`, `align-items: flex-start`

---

## Section 2 — ProfileForm

**File:** `components/ProfileForm.tsx` + `ProfileForm.module.scss`

Logic untouched. Only markup structure and SCSS change.

### Layout

Card centrée : `background: var(--app-surface)`, `border: 1px solid var(--app-border)`, `border-radius: 16px`, `padding: 32px`.

### Champ Pays

- Deux pill cards côte à côte (`display: flex`, `gap: 10px`)
- Chaque pill : `flex: 1`, `border-radius: 10px`, `border: 1.5px solid var(--app-border)`, `padding: 12px`, texte centré, flag + label
- État sélectionné : `border-color: var(--primary)`, `background: rgba(29, 78, 216, 0.1)`
- Radio `<input>` masqué (`display: none`), pill cliquable via `<label>`

### Champ Nom

- Label au-dessus, `font-size: 0.8rem`, `color: var(--app-muted)`, `font-weight: 500`
- Input : `background: var(--app-bg)`, `border: 1px solid var(--app-border)`, `border-radius: 8px`, `padding: 11px 14px`, `color: #fff`
- Focus : `border-color: var(--primary)`, `box-shadow: 0 0 0 3px rgba(29,78,216,0.2)`

### Champ Situation

- Grille 2×2 de pill cards (même style que Pays)
- Labels : Salarié(e) / Étudiant(e) / Indépendant(e) / Sans emploi

### Notice garant

- Bandeau `background: rgba(29,78,216,0.08)`, `border: 1px solid rgba(29,78,216,0.2)`, `border-radius: 8px`, `padding: 10px 14px`
- Texte `0.82rem`, `color: #93c5fd`

### Champs Email / Téléphone (BE)

- Même style que Nom complet
- `animation: fadeIn 0.2s ease` à l'apparition

### CTA

- Bouton pleine largeur, `background: var(--primary)`, `border-radius: 10px`, `padding: 14px`, `font-weight: 700`, `font-size: 1rem`
- Hover : `background: var(--primary-hover)`, `transform: translateY(-1px)`

---

## Section 3 — Page Dossier + Checklist

### Header dossier (`app/dossier/page.module.scss`)

- `h1` : nom du candidat, Bricolage Grotesque, `font-size: 1.5rem`, `color: #fff`
- Situation : pill tag, `background: var(--app-surface)`, `border: 1px solid var(--app-border)`, `font-size: 0.75rem`, `color: var(--app-muted)`, `border-radius: 100px`, `padding: 3px 10px`
- Bouton "Recommencer" : ghost, `border: 1px solid var(--app-border)`, `color: var(--app-muted)`, `border-radius: 8px`, `font-size: 0.8rem`

### Checklist groups (`Checklist.module.scss`)

- Titre de groupe : `font-size: 0.7rem`, `text-transform: uppercase`, `letter-spacing: 0.1em`, `color: var(--app-muted)`, `font-weight: 600`
- `gap: 36px` entre sections candidat et garant

### ChecklistItem (`ChecklistItem.module.scss`)

**Container :**
- `background: var(--app-surface)`, `border: 1px solid var(--app-border)`, `border-radius: 10px`, `padding: 12px 16px`
- `display: flex`, `align-items: center`, `justify-content: space-between`, `gap: 12px`

**État `uploaded` :**
- `border-color: var(--success-border)`, `background: var(--success-dim)`

**État `optional` :**
- `opacity: 0.55`, `border-style: dashed`

**Checkbox custom (div) :**
- 16×16px, `border-radius: 4px`, `border: 1.5px solid rgba(255,255,255,0.2)`, `flex-shrink: 0`
- État uploadé : `background: var(--success-dim)`, `border-color: var(--success-border)`, contient "✓" vert

**Label :**
- `font-size: 0.875rem`, `font-weight: 500`, `color: rgba(255,255,255,0.85)`

**Nom de fichier :**
- `font-size: 0.72rem`, `color: var(--app-muted)`, `overflow: hidden`, `text-overflow: ellipsis`

**Badges :**
- En attente : `background: var(--warning-dim)`, `color: var(--warning-text)`
- Uploadé : `background: var(--success-dim)`, `color: var(--success)`
- Optionnel : `background: rgba(255,255,255,0.05)`, `color: var(--app-muted)`
- Tous : `border-radius: 100px`, `padding: 2px 8px`, `font-size: 0.7rem`, `font-weight: 600`

**Bouton upload :**
- `background: rgba(29,78,216,0.2)`, `border: 1px solid rgba(96,165,250,0.25)`, `color: #93c5fd`, `border-radius: 7px`, `padding: 5px 11px`, `font-size: 0.75rem`
- Hover : `background: rgba(29,78,216,0.35)`
- Texte : "Ajouter" (pending) / "Remplacer" (uploaded) / "Ajouter" (multi, pas au max)

### ProgressBar (`ProgressBar.module.scss`)

- Track : `height: 4px`, `background: rgba(255,255,255,0.06)`, `border-radius: 2px`
- Fill : `background: var(--primary)`, `transition: width 0.4s ease`
- Label : `display: flex`, `justify-content: space-between`, `font-size: 0.75rem`, `color: var(--app-muted)`
- Compteur X/Y à droite en `color: #60a5fa`
- Si garant : deux ProgressBar empilées avec label à gauche ("Candidat" / "Garant")

---

## Section 4 — Export + Notices

### ExportButton (`ExportButton.module.scss`)

**Card wrapper :**
- `background: var(--app-surface)`, `border: 1px solid var(--app-border)`, `border-radius: 14px`, `padding: 24px`

**Bouton désactivé :**
- `background: rgba(255,255,255,0.05)`, `color: rgba(255,255,255,0.2)`, `border: 1px solid var(--app-border)`, `cursor: not-allowed`
- Message sous le bouton : `color: var(--app-muted)`, `font-size: 0.8rem`, centré

**Bouton actif :**
- `background: var(--primary)`, `color: #fff`, `border: none`, `border-radius: 10px`, `padding: 15px`, `font-weight: 700`, `width: 100%`
- Hover : `background: var(--primary-hover)`, `transform: translateY(-2px)`, `box-shadow: 0 12px 32px rgba(29,78,216,0.4)`

**Bouton loading :**
- Désactivé + spinner CSS (pseudo-element `border` animé `rotate 0.7s linear infinite`), texte "Export en cours..."

**Erreur :**
- `color: #f87171`, `font-size: 0.82rem`, sous le bouton, pas de card

### Notices (`app/dossier/page.module.scss`)

- Deux lignes de texte simples, `font-size: 0.75rem`, `color: var(--app-muted)`, `line-height: 1.5`
- Pas de card wrapper — discret, en bas de page
- Gap `6px` entre les deux

---

## Files Changed

| File | Type de changement |
|---|---|
| `app/globals.scss` | Ajout tokens dark app |
| `app/start/page.module.scss` | Refactor complet + stepper |
| `app/start/page.tsx` | Ajout markup stepper, suppression back link |
| `app/dossier/page.module.scss` | Refactor complet |
| `app/dossier/page.tsx` | Header + situation pill + layout |
| `components/ProfileForm.module.scss` | Refactor complet dark |
| `components/ProfileForm.tsx` | Pills pays/situation (markup) |
| `components/ChecklistItem.module.scss` | Refactor complet dark |
| `components/ChecklistItem.tsx` | Checkbox custom div |
| `components/Checklist.module.scss` | Titres de groupe |
| `components/ProgressBar.module.scss` | Refactor inline dark |
| `components/ExportButton.module.scss` | Refactor dark + états |
| `components/ExportButton.tsx` | Card wrapper + spinner |

---

## Out of Scope

- Aucun changement aux handlers, store Zustand, API routes
- Aucun changement aux types/dossier.ts, lib/checklist.ts, lib/pdfExport.ts
- Pas de nouveau composant réutilisable (YAGNI)
- Pas d'animation complexe — uniquement `transition` CSS sur les états
