# Locataire Pro Launch Video

HyperFrames 16:9 launch composition for social networks.

## Files
- `index.html` - main 1080x1920 composition
- `preview.html` - browser preview wrapper
- `DESIGN.md` - scene timing and visual rules
- `assets/` - real screenshots captured from the local app

## Preview
```bash
cd launch-video
npx hyperframes lint
npx hyperframes preview --port 4567
```

## Render
```bash
cd launch-video
npx hyperframes render --output locataire-pro-launch.mp4 --fps 30 --quality standard
```

## Scene Timing
- `0.0s-4.0s` - New LP icon to full logo intro
- `4.0s-10.3s` - Launch promise, real hero screenshot, then smooth landing scroll
- `9.8s-14.4s` - Profile form and personalization
- `13.9s-19.0s` - Generated checklist
- `18.5s-24.0s` - Upload progress and final CTA

## Capture Note
The dossier screen was reached through the real `/start` form flow. The progress state uses the app's persisted checklist data to show uploaded items, matching the existing UI behavior without fabricating a new screen.
