# Locataire Pro Launch Video Design

## Format
- Landscape social video: 1920x1080
- Duration: 24 seconds
- Target: LinkedIn, YouTube, X, website launch teaser

## Source Of Truth
- Real local app screenshots captured from `http://localhost:3100`
- Screens used:
  - `assets/01-landing-wide.png`
  - `assets/02-start-wide.png`
  - `assets/03-dossier-wide.png`
  - `assets/04-progress-wide.png`
  - `assets/app-icon.svg`
  - `assets/logo-light.svg`

The app does not currently expose a post-export success screen, so the video uses the real progress/upload state as the payoff instead of inventing a fake success UI.

## Visual Identity
- Background / ink: `#1C1917`
- Cream: `#FEF3E2`
- Sun accent: `#FBBF24`
- Muted cream: `rgba(254, 243, 226, 0.72)`

## Typography
- Font: `Inter`, matching the new app layout
- Numeric UI labels use tabular numerals where relevant

## Motion
- New logo intro only: LP icon fades in, shifts left, wordmark slides in, lockup moves to header
- Original sequence preserved after intro with same relative scene timing
- Every app/site shot enters bottom-to-top with opacity
- Organic vertical scroll-like transitions with soft overlaps, no hard mask cuts
- Dark-background logo assets (`logo-dark*.svg`) are used on the dark video canvas
- Every scene has entrance motion
- No invented UI; captions describe only visible or documented MVP capabilities

## What Not To Do
- No fake screens
- No generated product UI
- No feature claims beyond checklist personalization, document upload tracking, PDF export, and zero storage
- No decorative gradients that obscure the captured UI
