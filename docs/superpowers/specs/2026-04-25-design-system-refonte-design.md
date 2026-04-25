# Design System Refonte — LocatairePro

**Date:** 2026-04-25  
**Scope:** Full app — landing + app flow (start, dossier)

---

## Objectif

Appliquer le nouveau design system LocatairePro (palette 3 couleurs strict, Inter, composants) à l'ensemble du projet. Remplacer l'ancien système de variables CSS (blues, verts, grays) par la palette ink/cream/sun.

---

## Palette

```css
--ink:   #1C1917;
--cream: #FEF3E2;
--sun:   #FBBF24;

--ink-90:   rgba(28, 25, 23, 0.90);
--ink-60:   rgba(28, 25, 23, 0.60);
--ink-15:   rgba(28, 25, 23, 0.15);
--ink-08:   rgba(28, 25, 23, 0.08);

--cream-90: rgba(254, 243, 226, 0.90);
--cream-60: rgba(254, 243, 226, 0.60);
--cream-15: rgba(254, 243, 226, 0.15);
```

Aucune autre couleur autorisée. Pas de bleu, vert, rouge sémantique.

---

## Typographie

- Police unique : **Inter** (next/font/google)
- Remplace Bricolage Grotesque + Figtree
- Variable CSS : `--font-sans`
- Weights : 400, 500, 600, 700, 800

---

## Assets

Fichiers à placer dans `public/` :
- `logo-dark.svg` — logo cream sur transparent (sections ink)
- `logo-light.svg` — logo ink sur transparent (sections cream)
- `app-icon.svg` — icône app LP
- `favicon.svg` — favicon 32×32

`layout.tsx` : pointer `<link rel="icon" href="/favicon.svg" />` dans les metadata.

---

## Mapping couleurs

| Ancien | Nouveau |
|---|---|
| `--bg`, `--surface` | `--cream` |
| `--fg` | `--ink` |
| `--primary`, `--primary-hover` | `--ink` |
| `--muted` | `--ink-60` |
| `--border` | `--ink-15` |
| `--dark`, `--app-bg`, `--app-surface` | `--ink` |
| `--app-border` | `--cream-15` |
| `--app-muted` | `--cream-60` |
| `--success`, verts (#34d399, #22c55e) | `--sun` |
| `--warning-text`, ambers (#fcd34d) | `--sun` |
| Blues durs (#1d4ed8, #60a5fa, etc.) | `--ink` ou `--cream` selon fond |
| Rouge erreur (#f87171) | `--ink` (croix seule, pas de couleur) |

---

## Architecture des surfaces

- **Landing (cream)** : Navbar, Hero, FeaturesGrid → fond `--cream`
- **Landing (ink)** : ProblemBanner, HowItWorks, LandingCta, Footer → fond `--ink`
- **App flow** : start, dossier → fond `--ink`, contenu sur cards cream

---

## Composants — changements

### Navbar
- Fond `--cream`, border-bottom `--ink-15`
- Logo : `logo-light.svg` (ink sur cream)
- Liens : `--ink`, hover `--ink-60`

### Hero
- Fond `--cream`
- H1 : `--ink`, poids 800
- Sous-titre : `--ink-60`
- CTA primaire : `--ink` bg + `--cream` text
- CTA ghost : border `--ink`, text `--ink`
- Carte checklist : border `--ink`, box-shadow `6px 6px 0 var(--ink)`

### ProblemBanner
- Fond `--ink`
- Texte `--cream`
- Cards : border `--cream-15`, bg transparent ou `--cream-15`

### HowItWorks
- Fond `--ink`
- Numéros (01/02/03) : `--sun`, 96px+
- Titres : `--cream`
- Descriptions : `--cream-60`

### FeaturesGrid
- Fond `--cream`
- Cards elevated : border `1.5px solid --ink`, box-shadow `6px 6px 0 var(--ink)`

### LandingCta
- Fond `--ink`
- Bouton accent : `--sun` bg + `--ink` text (jamais cream sur sun)

### LandingFooter
- Fond `--ink`
- Logo : `logo-dark.svg` (cream sur transparent)
- Liens : `--cream-60`, hover `--cream`

### start/page (app flow)
- Fond `--ink`
- Cards/sections : border `--cream-15`
- Inputs : bg `--cream`, border `--ink-15`, focus ring `3px solid --sun`
- Labels : `--cream`

### dossier/page (app flow)
- Fond `--ink`
- Checklist card : bg `--cream`, border `--ink`

### Checklist / ChecklistItem
- Item done : check circle `--sun` bg + `--ink` text
- Item pending : circle border `--cream-15` (sur ink) ou `--ink-15` (sur cream)
- Texte done : `--ink` (sur cream) ou `--cream` (sur ink)

### ExportButton
- `--sun` bg + `--ink` text
- Hover : légèrement plus sombre (filter brightness)

### ProgressBar
- Track : `--cream-15`
- Fill : `--sun`
- Texte compteur : `--cream`

---

## Règles hard

- Jamais `cream` sur `sun` (ratio 1.9:1)
- Jamais de section fond `sun` plein écran
- Jamais de shadow floue rgba — uniquement shadows dures en `--ink`
- Jamais de gradient
- Un seul élément `--sun` plein par viewport visible
- Logo jamais posé sur fond `sun`
