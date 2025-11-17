# DWE Creation – Synthese des evolutions design 2025-10-05

## Design system & themes
- Palette revisee : fond sombre (#0B0F1C) et declinaison light (#F6F3EB), accents primary (#6274FF) et highlight (#4DD2FF).
- Typographies : Space Grotesk (titres), Plus Jakarta Sans (corps), IBM Plex Mono (code et meta), charges via lib/fonts.ts.
- Tokens Tailwind : nouveaux radius (--radius-2xl = 1.5rem), ombres (shadow-elevated), motion (--motion-fast/base/slow) et classes associees.
- shadcn/ui : variants rafraichis pour Button (primary, soft, dark), Badge, Card, Input/Textarea, Dropdown, Navigation, Accordion, Avatar.

## Composants majeurs
- Header : gradient blur, CTA arrondi, bouton commande (⌘K) et menu mobile revise.
- Hero : configurateur secteur -> services recommandes, visuel interactif, gradient noise controle prefers-reduced-motion.
- Services : filtres impact/chrono/stack, cartes modulaires (modules + stack + impact tag).
- Process : timeline verticale premium (durations, checkpoints).
- Case studies : filtres secteur/objectifs, avant/apres, KPIs animes.
- Team : cartes tilt, badges localisation/expertise.
- Contact : estimateur rapide (react-hook-form + zod), timeline livrables, CTA mail/rendez-vous.
- Footer : social chips, navigation legale, resume contact.

## Accessibilite & perf
- Skip-link (#main), focus states renforces, contraste AA sur tokens.
- usePrefersMotion pour adoucir animations (hero, background, timeline).
- Simplification textuelle (ASCII) pour eviter artefacts encodage.
- Command palette (cmdk) dynamique (navigation, services, cas, CTA).
- Hero background leger (div + blur) sans canvas lourd.

## Tests recommends
1. 
pm install (cmdk ajoute) puis 
pm run lint / 
pm run build.
2. Lighthouse desktop mobile (cible LCP < 2.5s, CLS < 0.1).
3. Axe DevTools (focus management, roles) et verification prefers-reduced-motion.
4. Controle visuel dark/light, responsive >=320px.

## Next steps possibles
- Integrer API interne pour estimateur + envoi vers CRM.
- Uploader assets visuels (Hero canvas WebGL) lorsque pret.
- Completer pages detail (services/[slug], cases/[slug]) avec nouvelle charte.
