# Design System Refonte Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer l'ancien système visuel (bleu/vert/gris) par le design system LocatairePro strict (ink/cream/sun + Inter).

**Architecture:** Approche globals-first — on remplace les variables CSS dans `globals.scss`, on switch la font dans `layout.tsx`, puis on met à jour chaque module SCSS composant par composant. Les fichiers TSX ne sont touchés que pour le logo (Navbar, Footer).

**Tech Stack:** Next.js App Router, SCSS Modules, next/font/google (Inter)

---

## Fichiers modifiés / créés

| Action | Fichier |
|---|---|
| Create | `public/logo-dark.svg` |
| Create | `public/logo-light.svg` |
| Create | `public/app-icon.svg` |
| Create | `public/favicon.svg` |
| Modify | `app/layout.tsx` |
| Modify | `app/globals.scss` |
| Modify | `components/landing/Navbar.module.scss` |
| Modify | `components/landing/Navbar.tsx` |
| Modify | `components/landing/Hero.module.scss` |
| Modify | `components/landing/ProblemBanner.module.scss` |
| Modify | `components/landing/HowItWorks.module.scss` |
| Modify | `components/landing/FeaturesGrid.module.scss` |
| Modify | `components/landing/LandingCta.module.scss` |
| Modify | `components/landing/LandingFooter.module.scss` |
| Modify | `components/landing/LandingFooter.tsx` |
| Modify | `app/start/page.module.scss` |
| Modify | `app/dossier/page.module.scss` |
| Modify | `components/ProfileForm.module.scss` |
| Modify | `components/Checklist.module.scss` |
| Modify | `components/ChecklistItem.module.scss` |
| Modify | `components/ExportButton.module.scss` |
| Modify | `components/ProgressBar.module.scss` |

---

## Task 1: Assets publics

**Files:**
- Create: `public/logo-dark.svg`
- Create: `public/logo-light.svg`
- Create: `public/app-icon.svg`
- Create: `public/favicon.svg`

- [ ] **Step 1: Copier les 4 SVGs dans `public/`**

Créer `public/logo-dark.svg` (logo cream sur transparent — pour fonds ink) :
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1459.8 169.7">
  <defs>
    <style>
      .cls-1 { fill: #fbbf24; }
      .cls-2 { fill: #fef3e2; }
    </style>
  </defs>
  <g>
    <polygon class="cls-2" points="35.6 36.64 0 36.64 0 167.94 88.65 167.94 88.65 139.21 35.6 139.21 35.6 36.64"/>
    <path class="cls-2" d="M185.36,42.59c-9.64-5.14-20.41-7.71-32.34-7.71s-22.72,2.57-32.38,7.71c-9.66,5.14-17.32,12.73-22.96,22.78-5.64,10.05-8.46,22.38-8.46,37.01s2.82,26.77,8.46,36.79c5.64,10.02,13.29,17.61,22.96,22.78,9.66,5.17,20.46,7.75,32.38,7.75s22.7-2.57,32.34-7.71c9.63-5.14,17.28-12.72,22.96-22.73,5.67-10.02,8.5-22.31,8.5-36.88s-2.83-26.96-8.5-37.01c-5.67-10.05-13.32-17.64-22.96-22.78ZM177.08,122.2c-2.06,5.4-5.1,9.5-9.12,12.29-4.02,2.79-9,4.19-14.94,4.19s-10.83-1.4-14.85-4.19c-4.02-2.79-7.08-6.89-9.16-12.29-2.09-5.4-3.13-12.01-3.13-19.83s1.04-14.53,3.13-19.96c2.08-5.43,5.14-9.55,9.16-12.34,4.02-2.79,8.97-4.19,14.85-4.19s10.91,1.4,14.94,4.19c4.02,2.79,7.06,6.9,9.12,12.34,2.06,5.43,3.08,12.09,3.08,19.96s-1.03,14.42-3.08,19.83Z"/>
    <path class="cls-2" d="M310.63,120c-.41,2.82-1.22,5.38-2.42,7.67-1.2,2.29-2.78,4.26-4.71,5.9s-4.2,2.91-6.79,3.79c-2.59.88-5.52,1.32-8.81,1.32-5.82,0-10.77-1.35-14.85-4.05-4.09-2.7-7.21-6.76-9.38-12.16-2.17-5.4-3.26-12.1-3.26-20.09s1.06-14.17,3.17-19.61,5.24-9.61,9.38-12.51,9.18-4.36,15.11-4.36c3.29,0,6.24.44,8.86,1.32,2.61.88,4.86,2.14,6.74,3.79,1.88,1.64,3.39,3.61,4.54,5.9s1.89,4.85,2.25,7.67h36.13c-.82-7.93-2.85-14.98-6.08-21.15-3.23-6.17-7.46-11.37-12.69-15.6-5.23-4.23-11.29-7.45-18.2-9.65-6.91-2.2-14.44-3.3-22.6-3.3-11.75,0-22.41,2.57-31.99,7.71-9.58,5.14-17.18,12.73-22.82,22.78s-8.46,22.38-8.46,37.01,2.78,26.77,8.33,36.79c5.55,10.02,13.1,17.61,22.65,22.78,9.55,5.17,20.31,7.75,32.3,7.75,9.63,0,18.08-1.51,25.33-4.54,7.26-3.03,13.36-7.01,18.33-11.94,4.96-4.93,8.78-10.31,11.46-16.13,2.67-5.82,4.22-11.51,4.63-17.1h-36.13Z"/>
    <path class="cls-2" d="M387.52,36.64l-42.56,131.3h39.83l7.19-25.2h40.42l7.54,25.2h40.36l-44.15-131.3h-48.64ZM424.45,116.12h-24.88c3.07-10.78,5.84-21.95,8.3-33.53,1.21-5.68,2.38-11.28,3.57-16.93,1.3,5.63,2.63,11.27,4,16.93,2.8,11.58,5.8,22.75,9,33.53Z"/>
    <polygon class="cls-2" points="581.26 36.64 467.23 36.64 467.23 65.37 506.44 65.37 506.44 167.94 542.04 167.94 542.04 65.37 581.26 65.37 581.26 36.64"/>
    <path class="cls-2" d="M610.74,36.64l-42.56,131.3h39.83l7.19-25.2h40.42l7.54,25.2h40.36l-44.15-131.3h-48.64ZM647.67,116.12h-24.88c3.07-10.78,5.84-21.95,8.3-33.53,1.21-5.68,2.38-11.28,3.57-16.93,1.3,5.63,2.63,11.27,4,16.93,2.8,11.58,5.8,22.75,9,33.53Z"/>
    <rect class="cls-2" x="710.63" y="36.64" width="35.6" height="131.3"/>
    <path class="cls-2" d="M856.87,105.02c4.17-6.46,6.26-14.39,6.26-23.79s-2.04-17.26-6.12-23.92-9.78-11.78-17.1-15.33-15.85-5.33-25.6-5.33h-56.57v131.3h35.6v-43.35h12.35l23.07,43.35h38.77l-26.78-48.97c6.83-3.27,12.21-7.91,16.11-13.95ZM793.33,65.19h12.51c4.23,0,7.84.56,10.84,1.67s5.29,2.85,6.87,5.2,2.38,5.4,2.38,9.16-.79,6.79-2.38,9.08-3.88,3.97-6.87,5.02-6.61,1.59-10.84,1.59h-12.51v-31.72Z"/>
    <polygon class="cls-2" points="872.86 167.94 967.15 167.94 967.15 139.21 908.46 139.21 908.46 115.59 962.57 115.59 962.57 87.57 908.46 87.57 908.46 65.37 967.5 65.37 967.5 36.64 872.86 36.64 872.86 167.94"/>
    <path class="cls-2" d="M1121.29,42.41c-7.31-3.85-15.85-5.77-25.6-5.77h-56.57v131.3h35.6v-38.95h19.74c9.99,0,18.74-1.87,26.26-5.6,7.52-3.73,13.36-9.02,17.54-15.86s6.26-14.97,6.26-24.37-2.04-17.51-6.12-24.5-9.78-12.41-17.1-16.26ZM1104.94,92.77c-1.59,2.7-3.88,4.8-6.87,6.3s-6.61,2.25-10.84,2.25h-12.51v-36.13h12.51c4.23,0,7.84.7,10.84,2.11s5.29,3.45,6.87,6.12,2.38,5.92,2.38,9.74-.79,6.9-2.38,9.61Z"/>
    <path class="cls-2" d="M1251.27,105.02c4.17-6.46,6.26-14.39,6.26-23.79s-2.04-17.26-6.12-23.92c-4.08-6.67-9.78-11.78-17.1-15.33s-15.85-5.33-25.6-5.33h-56.57v131.3h35.6v-43.35h12.35l23.07,43.35h38.77l-26.78-48.97c6.83-3.27,12.21-7.91,16.11-13.95ZM1187.74,65.19h12.51c4.23,0,7.84.56,10.84,1.67s5.29,2.85,6.87,5.2,2.38,5.4,2.38,9.16-.79,6.79-2.38,9.08-3.88,3.97-6.87,5.02-6.61,1.59-10.84,1.59h-12.51v-31.72Z"/>
    <path class="cls-2" d="M1384.07,65.37c-5.67-10.05-13.32-17.64-22.96-22.78s-20.41-7.71-32.34-7.71-22.72,2.57-32.38,7.71-17.32,12.73-22.96,22.78c-5.64,10.05-8.46,22.38-8.46,37.01s2.82,26.77,8.46,36.79,13.29,17.61,22.96,22.78c9.66,5.17,20.46,7.75,32.38,7.75s22.71-2.57,32.34-7.71,17.29-12.72,22.96-22.73c5.67-10.02,8.5-22.31,8.5-36.88s-2.83-26.96-8.5-37.01ZM1352.83,122.2c-2.06,5.4-5.1,9.5-9.12,12.29-4.02,2.79-9,4.19-14.94,4.19s-10.82-1.4-14.85-4.19c-4.02-2.79-7.08-6.89-9.16-12.29s-3.13-12.01-3.13-19.83,1.04-14.53,3.13-19.96,5.14-9.55,9.16-12.34c4.02-2.79,8.97-4.19,14.85-4.19s10.91,1.4,14.94,4.19c4.02,2.79,7.06,6.9,9.12,12.34s3.08,12.09,3.08,19.96-1.03,14.42-3.08,19.83Z"/>
  </g>
  <circle class="cls-1" cx="1432.22" cy="27.57" r="27.57"/>
</svg>
```

Créer `public/logo-light.svg` (logo ink sur transparent — pour fonds cream) — même SVG mais `.cls-2` = `#1c1917`.

Créer `public/app-icon.svg` :
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="112" fill="#1c1917"/>
  <text x="84" y="372" font-family="Inter, 'Helvetica Neue', system-ui, sans-serif" font-size="288" font-weight="800" fill="#fef3e2" letter-spacing="-12">LP</text>
  <circle cx="412" cy="128" r="44" fill="#fbbf24"/>
</svg>
```

Créer `public/favicon.svg` :
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="6" fill="#1c1917"/>
  <text x="7" y="25" font-family="Inter, 'Helvetica Neue', system-ui, sans-serif" font-size="22" font-weight="800" fill="#fef3e2" letter-spacing="-1">L</text>
  <circle cx="25" cy="8" r="3" fill="#fbbf24"/>
</svg>
```

- [ ] **Step 2: Commit**

```bash
git add public/
git commit -m "feat: add brand assets to public/"
```

---

## Task 2: Font + favicon (layout.tsx)

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Remplacer le contenu de `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Locataire Pro',
  description: 'Constituez votre dossier de location en quelques minutes.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: switch font to Inter, add favicon"
```

---

## Task 3: Variables globales (globals.scss)

**Files:**
- Modify: `app/globals.scss`

- [ ] **Step 1: Remplacer le contenu complet de `app/globals.scss`**

```scss
:root {
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

  --font-sans: 'Inter', 'Helvetica Neue', system-ui, sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
  color: var(--ink);
  background: var(--cream);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-sans);
  line-height: 1.15;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  cursor: pointer;
  font-family: inherit;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.scss
git commit -m "feat: replace CSS variables with ink/cream/sun design system"
```

---

## Task 4: Navbar

**Files:**
- Modify: `components/landing/Navbar.module.scss`
- Modify: `components/landing/Navbar.tsx`

- [ ] **Step 1: Remplacer `Navbar.module.scss`**

```scss
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--cream);
  border-bottom: 1px solid var(--ink-15);
}

.inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  height: 28px;
  width: auto;
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 20px;
  background: var(--ink);
  color: var(--cream);
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: opacity 0.15s, transform 0.1s;

  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
}
```

- [ ] **Step 2: Remplacer `Navbar.tsx`**

```tsx
import Link from 'next/link'
import Image from 'next/image'
import styles from './Navbar.module.scss'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Image
          src="/logo-light.svg"
          alt="Locataire Pro"
          width={220}
          height={28}
          className={styles.logo}
          priority
        />
        <Link href="/start" className={styles.cta}>
          Commencer <span aria-hidden="true">→</span>
        </Link>
      </div>
    </nav>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/landing/Navbar.module.scss components/landing/Navbar.tsx
git commit -m "feat: apply design system to Navbar"
```

---

## Task 5: Hero

**Files:**
- Modify: `components/landing/Hero.module.scss`

- [ ] **Step 1: Remplacer `Hero.module.scss`**

```scss
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(10px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes fillBar {
  to { width: 75%; }
}

.hero {
  background: var(--cream);
  color: var(--ink);
  padding: 96px 24px 112px;
  overflow: hidden;
}

.inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 55% 1fr;
  gap: 64px;
  align-items: center;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 52px;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  background: var(--ink-08);
  border: 1px solid var(--ink-15);
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--ink-60);
  width: fit-content;

  opacity: 0;
  animation: fadeUp 0.5s ease forwards 0.05s;
}

.headline {
  font-size: clamp(2.6rem, 5.5vw, 4.2rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.03;
  color: var(--ink);

  em {
    font-style: normal;
    color: var(--sun);
  }

  opacity: 0;
  animation: fadeUp 0.6s ease forwards 0.15s;
}

.sub {
  font-size: 1.1rem;
  line-height: 1.75;
  color: var(--ink-60);
  max-width: 440px;

  opacity: 0;
  animation: fadeUp 0.6s ease forwards 0.3s;
}

.actions {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;

  opacity: 0;
  animation: fadeUp 0.6s ease forwards 0.45s;
}

.primaryCta {
  display: inline-flex;
  align-items: center;
  padding: 14px 30px;
  background: var(--ink);
  color: var(--cream);
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  transition: opacity 0.15s, transform 0.12s;

  &:hover {
    opacity: 0.85;
    transform: translateY(-2px);
  }
}

.secondaryCta {
  font-size: 0.9rem;
  color: var(--ink-60);
  font-weight: 600;
  border-bottom: 2px solid var(--ink-15);
  padding-bottom: 2px;
  transition: color 0.15s, border-color 0.15s;

  &:hover {
    color: var(--ink);
    border-color: var(--ink);
  }
}

.mockWrap {
  display: flex;
  justify-content: center;

  opacity: 0;
  animation: fadeUp 0.7s ease forwards 0.25s;
}

.mockCard {
  background: var(--cream);
  border: 1.5px solid var(--ink);
  border-radius: 18px;
  padding: 26px;
  width: 100%;
  max-width: 360px;
  box-shadow: 6px 6px 0 var(--ink);
}

.mockHeader {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mockAvatar {
  width: 42px;
  height: 42px;
  background: var(--sun);
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--ink);
  flex-shrink: 0;
  letter-spacing: 0.02em;
}

.mockMeta {
  flex: 1;
}

.mockName {
  font-weight: 700;
  font-size: 0.92rem;
  color: var(--ink);
}

.mockRole {
  font-size: 0.72rem;
  color: var(--ink-60);
  margin-top: 2px;
}

.mockStatus {
  padding: 4px 10px;
  background: var(--sun);
  color: var(--ink);
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 700;
  white-space: nowrap;
}

.mockDivider {
  height: 1px;
  background: var(--ink-15);
  margin: 18px 0;
}

.mockItems {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.mockItem {
  display: flex;
  align-items: center;
  gap: 11px;
  font-size: 0.875rem;
  color: var(--ink-60);

  opacity: 0;
  animation: slideIn 0.4s ease forwards;

  &.done {
    color: var(--ink);

    .mockCheck {
      background: var(--sun);
      color: var(--ink);
      border-color: var(--sun);
      font-weight: 800;
    }
  }
}

.mockCheck {
  width: 24px;
  height: 24px;
  border: 1.5px solid var(--ink-15);
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.mockFooter {
  margin-top: 22px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.mockBarTrack {
  flex: 1;
  height: 6px;
  background: var(--ink-08);
  border-radius: 100px;
  overflow: hidden;
}

.mockBarFill {
  height: 100%;
  width: 0;
  background: var(--sun);
  border-radius: 100px;
  animation: fillBar 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: 1.6s;
}

.mockBarLabel {
  font-size: 0.72rem;
  color: var(--ink-60);
  white-space: nowrap;
}
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/Hero.module.scss
git commit -m "feat: apply design system to Hero"
```

---

## Task 6: ProblemBanner

**Files:**
- Modify: `components/landing/ProblemBanner.module.scss`

- [ ] **Step 1: Remplacer `ProblemBanner.module.scss`**

```scss
.section {
  background: var(--ink);
  color: var(--cream);
  padding: 96px 24px;
}

.inner {
  max-width: 960px;
  margin: 0 auto;
}

.label {
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--cream-60);
  margin-bottom: 14px;
}

.title {
  font-size: clamp(1.9rem, 3.8vw, 2.9rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  color: var(--cream);
  margin-bottom: 52px;
  max-width: 600px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 660px) {
    grid-template-columns: 1fr;
    max-width: 420px;
  }
}

.item {
  background: var(--cream-15);
  border: 1px solid var(--cream-15);
  border-radius: 14px;
  padding: 30px 26px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--cream-60);
  }
}

.icon {
  font-size: 1.8rem;
}

.itemTitle {
  font-size: 1rem;
  font-weight: 700;
  color: var(--cream-90);
  letter-spacing: -0.01em;
}

.itemDesc {
  font-size: 0.875rem;
  line-height: 1.7;
  color: var(--cream-60);
}
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/ProblemBanner.module.scss
git commit -m "feat: apply design system to ProblemBanner"
```

---

## Task 7: HowItWorks

**Files:**
- Modify: `components/landing/HowItWorks.module.scss`

- [ ] **Step 1: Remplacer `HowItWorks.module.scss`**

```scss
.section {
  padding: 104px 24px;
  background: var(--cream);
  border-top: 1px solid var(--ink-15);
}

.inner {
  max-width: 960px;
  margin: 0 auto;
}

.header {
  margin-bottom: 64px;
}

.label {
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--ink-60);
  margin-bottom: 14px;
}

.title {
  font-size: clamp(1.9rem, 3.8vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  color: var(--ink);
}

.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;

  @media (max-width: 660px) {
    grid-template-columns: 1fr;
    gap: 44px;
  }
}

.step {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.stepTop {
  display: flex;
  align-items: center;
  gap: 0;
}

.stepNumber {
  width: 54px;
  height: 54px;
  background: var(--sun);
  color: var(--ink);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans);
  font-weight: 800;
  font-size: 1rem;
  letter-spacing: -0.02em;
  flex-shrink: 0;
}

.connector {
  flex: 1;
  height: 1px;
  background: var(--ink-15);
  margin: 0 12px;

  @media (max-width: 660px) {
    display: none;
  }
}

.stepContent {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stepTitle {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.stepDesc {
  font-size: 0.9rem;
  line-height: 1.75;
  color: var(--ink-60);
}
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/HowItWorks.module.scss
git commit -m "feat: apply design system to HowItWorks"
```

---

## Task 8: FeaturesGrid

**Files:**
- Modify: `components/landing/FeaturesGrid.module.scss`

- [ ] **Step 1: Remplacer `FeaturesGrid.module.scss`**

```scss
.section {
  padding: 104px 24px;
  background: var(--cream);
  border-top: 1px solid var(--ink-15);
  border-bottom: 1px solid var(--ink-15);
}

.inner {
  max-width: 960px;
  margin: 0 auto;
}

.header {
  margin-bottom: 56px;
}

.label {
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--ink-60);
  margin-bottom: 14px;
}

.title {
  font-size: clamp(1.9rem, 3.8vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  color: var(--ink);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
}

.card {
  background: var(--cream);
  border: 1.5px solid var(--ink);
  border-radius: 14px;
  padding: 32px 30px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: default;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 6px 6px 0 var(--ink);
  }
}

.icon {
  font-size: 1.8rem;
}

.cardTitle {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--ink);
}

.cardDesc {
  font-size: 0.875rem;
  line-height: 1.75;
  color: var(--ink-60);
}
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/FeaturesGrid.module.scss
git commit -m "feat: apply design system to FeaturesGrid"
```

---

## Task 9: LandingCta

**Files:**
- Modify: `components/landing/LandingCta.module.scss`

- [ ] **Step 1: Remplacer `LandingCta.module.scss`**

```scss
.section {
  background: var(--ink);
  color: var(--cream);
  padding: 128px 24px;
  position: relative;
  overflow: hidden;
}

.inner {
  position: relative;
  z-index: 1;
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
}

.kicker {
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--sun);
}

.title {
  font-size: clamp(2.4rem, 5.5vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: var(--cream);
}

.sub {
  font-size: 1rem;
  color: var(--cream-60);
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 40px;
  background: var(--sun);
  color: var(--ink);
  border-radius: 10px;
  font-weight: 700;
  font-size: 1.05rem;
  margin-top: 10px;
  transition: opacity 0.15s, transform 0.12s;

  &:hover {
    opacity: 0.88;
    transform: translateY(-3px);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/LandingCta.module.scss
git commit -m "feat: apply design system to LandingCta"
```

---

## Task 10: LandingFooter

**Files:**
- Modify: `components/landing/LandingFooter.module.scss`
- Modify: `components/landing/LandingFooter.tsx`

- [ ] **Step 1: Remplacer `LandingFooter.module.scss`**

```scss
.footer {
  background: var(--ink);
  border-top: 1px solid var(--cream-15);
  padding: 36px 24px;
}

.inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }
}

.logo {
  height: 22px;
  width: auto;
  opacity: 0.85;
}

.copy {
  font-size: 0.8rem;
  color: var(--cream-60);
}

.pills {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  span {
    padding: 4px 12px;
    background: var(--cream-15);
    border: 1px solid var(--cream-15);
    border-radius: 100px;
    font-size: 0.72rem;
    color: var(--cream-60);
    font-weight: 500;
  }
}
```

- [ ] **Step 2: Remplacer `LandingFooter.tsx`**

```tsx
import Image from 'next/image'
import styles from './LandingFooter.module.scss'

export default function LandingFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Image
          src="/logo-dark.svg"
          alt="Locataire Pro"
          width={180}
          height={22}
          className={styles.logo}
        />
        <p className={styles.copy}>© {year} — Fait pour les locataires 🇧🇪 et 🇫🇷</p>
        <div className={styles.pills}>
          <span>Gratuit</span>
          <span>Sans compte</span>
          <span>Zéro stockage</span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/landing/LandingFooter.module.scss components/landing/LandingFooter.tsx
git commit -m "feat: apply design system to LandingFooter"
```

---

## Task 11: App flow — stepper pages (start + dossier)

**Files:**
- Modify: `app/start/page.module.scss`
- Modify: `app/dossier/page.module.scss`

- [ ] **Step 1: Remplacer `app/start/page.module.scss`**

```scss
.main {
  min-height: 100vh;
  background: var(--ink);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 16px 80px;
}

.stepper {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 36px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.stepCircle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px solid var(--cream-15);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--cream-60);
}

.stepLabel {
  font-size: 0.7rem;
  color: var(--cream-60);
  font-weight: 500;
}

.stepActive .stepCircle {
  border-color: var(--sun);
  background: rgba(251, 191, 36, 0.15);
  color: var(--cream);
}

.stepActive .stepLabel {
  color: var(--cream);
}

.stepLine {
  width: 48px;
  height: 1px;
  background: var(--cream-15);
  margin: 0 8px;
  margin-bottom: 22px;
}

.content {
  width: 100%;
  max-width: 520px;
}
```

- [ ] **Step 2: Remplacer `app/dossier/page.module.scss`**

```scss
.main {
  min-height: 100vh;
  background: var(--ink);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 16px 80px;
}

.stepper {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 36px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.stepCircle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px solid var(--cream-15);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--cream-60);
}

.stepLabel {
  font-size: 0.7rem;
  color: var(--cream-60);
  font-weight: 500;
}

.stepActive .stepCircle {
  border-color: var(--sun);
  background: rgba(251, 191, 36, 0.15);
  color: var(--cream);
}

.stepActive .stepLabel {
  color: var(--cream);
}

.stepDone .stepCircle {
  border-color: var(--sun);
  background: rgba(251, 191, 36, 0.15);
  color: var(--sun);
}

.stepLine {
  width: 48px;
  height: 1px;
  background: var(--cream-15);
  margin: 0 8px;
  margin-bottom: 22px;
}

.content {
  width: 100%;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.headerLeft {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--cream);
  letter-spacing: -0.02em;
}

.situationTag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--cream-15);
  border: 1px solid var(--cream-15);
  border-radius: 100px;
  padding: 3px 10px;
  font-size: 0.75rem;
  color: var(--cream-60);
  font-weight: 500;
  width: fit-content;
}

.restart {
  padding: 7px 14px;
  background: transparent;
  border: 1px solid var(--cream-15);
  border-radius: 8px;
  font-size: 0.8rem;
  color: var(--cream-60);
  flex-shrink: 0;
  transition: border-color 0.15s, color 0.15s;

  &:hover {
    border-color: var(--cream-60);
    color: var(--cream);
  }
}

.notices {
  display: flex;
  flex-direction: column;
  gap: 6px;

  p {
    font-size: 0.75rem;
    color: var(--cream-60);
    line-height: 1.5;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add app/start/page.module.scss app/dossier/page.module.scss
git commit -m "feat: apply design system to app flow stepper pages"
```

---

## Task 12: ProfileForm

**Files:**
- Modify: `components/ProfileForm.module.scss`

- [ ] **Step 1: Remplacer `ProfileForm.module.scss`**

```scss
.form {
  background: var(--cream-15);
  border: 1px solid var(--cream-15);
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.title {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--cream);
  letter-spacing: -0.02em;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;

  > label:not(.pill) {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--cream-60);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  input[type='text'],
  input[type='email'],
  input[type='tel'] {
    background: var(--ink);
    border: 1.5px solid var(--cream-15);
    border-radius: 8px;
    padding: 11px 14px;
    color: var(--cream);
    font-size: 0.95rem;
    font-family: inherit;
    width: 100%;
    transition: border-color 0.15s, outline 0.15s;

    &::placeholder {
      color: var(--cream-60);
    }

    &:focus {
      outline: 3px solid var(--sun);
      outline-offset: 2px;
      border-color: var(--cream-60);
    }
  }
}

.pills {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.pill {
  flex: 1;
  min-width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 11px 10px;
  background: var(--ink);
  border: 1.5px solid var(--cream-15);
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--cream-60);
  transition: border-color 0.15s, color 0.15s;
  text-align: center;

  &:hover {
    border-color: var(--cream-60);
    color: var(--cream);
  }

  &Active {
    border-color: var(--sun) !important;
    background: rgba(251, 191, 36, 0.12);
    color: var(--cream);
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
}

.notice {
  background: var(--cream-15);
  border: 1px solid var(--cream-15);
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.82rem;
  color: var(--cream-60);
}

.noticeNeutral {
  background: var(--cream-15);
  border: 1px solid var(--cream-15);
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.82rem;
  color: var(--cream-60);
}

.fadeIn {
  animation: fadeIn 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.submit {
  padding: 14px;
  background: var(--sun);
  color: var(--ink);
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  transition: opacity 0.15s, transform 0.12s;

  &:hover {
    opacity: 0.88;
    transform: translateY(-1px);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ProfileForm.module.scss
git commit -m "feat: apply design system to ProfileForm"
```

---

## Task 13: Checklist + ChecklistItem

**Files:**
- Modify: `components/Checklist.module.scss`
- Modify: `components/ChecklistItem.module.scss`

- [ ] **Step 1: Remplacer `Checklist.module.scss`**

```scss
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.groupTitle {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--cream-60);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}

.list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
```

- [ ] **Step 2: Remplacer `ChecklistItem.module.scss`**

```scss
.item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--cream-15);
  border: 1px solid var(--cream-15);
  border-radius: 10px;
  transition: border-color 0.15s, background 0.15s;

  &.uploaded {
    border-color: var(--sun);
    background: rgba(251, 191, 36, 0.08);
  }

  &.optional {
    opacity: 0.55;
    border-style: dashed;
  }
}

.checkbox {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1.5px solid var(--cream-15);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  font-weight: 700;
  transition: background 0.15s, border-color 0.15s;

  &.checked {
    background: var(--sun);
    border-color: var(--sun);
    color: var(--ink);
  }
}

.info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--cream-90);
}

.fileList {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.fileName {
  font-size: 0.72rem;
  color: var(--cream-60);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.badge {
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 100px;
  font-weight: 600;
  white-space: nowrap;

  &_pending  { background: rgba(251, 191, 36, 0.15); color: var(--sun); }
  &_uploaded { background: rgba(251, 191, 36, 0.15); color: var(--sun); }
  &_optional { background: var(--cream-15); color: var(--cream-60); }
}

.uploadBtn {
  padding: 5px 11px;
  background: var(--cream-15);
  border: 1px solid var(--cream-15);
  border-radius: 7px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--cream);
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: var(--cream-60);
    border-color: var(--cream-60);
    color: var(--ink);
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Checklist.module.scss components/ChecklistItem.module.scss
git commit -m "feat: apply design system to Checklist components"
```

---

## Task 14: ExportButton + ProgressBar

**Files:**
- Modify: `components/ExportButton.module.scss`
- Modify: `components/ProgressBar.module.scss`

- [ ] **Step 1: Remplacer `ExportButton.module.scss`**

```scss
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.card {
  background: var(--cream-15);
  border: 1px solid var(--cream-15);
  border-radius: 14px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.12s;
  position: relative;

  &.active {
    background: var(--sun);
    color: var(--ink);

    &:hover {
      opacity: 0.88;
      transform: translateY(-2px);
    }
  }

  &.disabled {
    background: var(--cream-15);
    color: var(--cream-60);
    border: 1px solid var(--cream-15);
    cursor: not-allowed;
  }

  &.loading {
    background: rgba(251, 191, 36, 0.4);
    color: var(--ink);
    cursor: not-allowed;

    &::after {
      content: '';
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(28, 25, 23, 0.2);
      border-top-color: var(--ink);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      margin-left: 8px;
      vertical-align: middle;
    }
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.hint {
  font-size: 0.8rem;
  color: var(--cream-60);
  text-align: center;
}

.error {
  font-size: 0.82rem;
  color: var(--cream);
  text-align: center;
  font-weight: 600;
}
```

- [ ] **Step 2: Remplacer `ProgressBar.module.scss`**

```scss
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: var(--cream-60);

  strong {
    color: var(--cream-90);
    font-weight: 600;
  }
}

.count {
  color: var(--sun);
  font-weight: 600;
  font-size: 0.75rem;
}

.track {
  height: 4px;
  background: var(--cream-15);
  border-radius: 2px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background: var(--sun);
  border-radius: 2px;
  transition: width 0.4s ease;
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ExportButton.module.scss components/ProgressBar.module.scss
git commit -m "feat: apply design system to ExportButton and ProgressBar"
```

---

## Task 15: Vérification visuelle finale

- [ ] **Step 1: Lancer le serveur de dev**

```bash
npm run dev
```

- [ ] **Step 2: Vérifier landing page** (http://localhost:3000)

Checklist :
- [ ] Navbar : fond cream, logo ink visible, bouton ink
- [ ] Hero : fond cream, H1 ink, card avec shadow dure ink, avatar sun
- [ ] ProblemBanner : fond ink, texte cream, cards cream-15
- [ ] HowItWorks : fond cream, numéros sun dans carré sun
- [ ] FeaturesGrid : fond cream, cards avec hover shadow dure
- [ ] LandingCta : fond ink, bouton sun + ink text
- [ ] Footer : fond ink, logo cream visible

- [ ] **Step 3: Vérifier app flow** (http://localhost:3000/start → http://localhost:3000/dossier)

Checklist :
- [ ] Fond ink partout
- [ ] Stepper : cercle actif avec border sun
- [ ] Formulaire : inputs ink avec focus ring sun
- [ ] Pills de sélection : actif avec border sun
- [ ] Checklist items : checked = sun background
- [ ] ProgressBar fill = sun
- [ ] Export button active = sun + ink text

- [ ] **Step 4: Commit final si tout est bon**

```bash
git add -A
git commit -m "feat: complete design system refonte — ink/cream/sun palette"
```
