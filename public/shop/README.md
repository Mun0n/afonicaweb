# Afonica PrestaShop child theme

Dark child theme for **shop.afonicanaranjo.com** (PrestaShop 8.1.x, parent: Classic). Matches the main site brand (`#000` + `#FF5733`).

## URLs

| Resource | URL |
|----------|-----|
| Storefront | https://shop.afonicanaranjo.com |
| Theme zip (deploy) | https://afonicanaranjo.com/shop/afonica-child-theme.zip |
| Live CSS patch (CDN) | https://afonicanaranjo.com/shop/afonica-live-patch.css |

## Current version

**v1.2.5** — `display_name: Afonica Dark 1.2.5`

Verify before import:

```bash
unzip -p public/shop/afonica-child-theme.zip config/theme.yml | grep -E '^(version|display_name):'
```

## File layout

```
public/shop/
├── README.md                    # this file
├── build-theme.sh               # builds afonica-child-theme.zip from theme-src/
├── afonica-child-theme.zip      # ✅ import this zip in PrestaShop admin
├── afonica-dark-child-theme.zip # ❌ obsolete — do not use
├── afonica-prestashop.css       # source CSS (copied into zip as afonica-dark.css)
├── afonica-live-patch.css       # CDN fallback overrides (served from main site)
├── inject-snippet.html          # legacy ps_customtext snippet (optional)
└── theme-src/                   # source of truth for the child theme
    ├── config/theme.yml
    ├── assets/css/afonica-dark.css   # generated at build time
    ├── assets/js/afonica-shop.js
    ├── templates/
    │   ├── index.tpl                 # hero + {widget ps_featuredproducts}
    │   ├── _partials/head.tpl        # cache-busted CSS/JS
    │   ├── _partials/header.tpl      # utility bar
    │   └── _partials/footer.tpl      # trust bar + minimal footer
    └── modules/ps_featuredproducts/... # "Los más vendidos" home section
```

## Build

```bash
./public/shop/build-theme.sh
```

Copies `afonica-prestashop.css` → `theme-src/assets/css/afonica-dark.css` and zips `theme-src/` into `afonica-child-theme.zip`.

After changing CSS or templates: rebuild, push to `main` (for CDN zip), then reimport in PrestaShop.

## Import checklist (PrestaShop admin)

**Design → Theme & Logo**

1. Activate **Classic** (parent theme).
2. **Eliminar** the existing Afonica Dark theme (required — reimport over an existing theme may not replace files).
3. **Importar tema** → upload `afonica-child-theme.zip` (or import from `https://afonicanaranjo.com/shop/afonica-child-theme.zip`).
4. Click **Utilizar** on Afonica Dark (runs `theme.yml`: modules, hooks, `HOME_FEATURED_CAT`, etc.).
5. **Advanced parameters → Performance** → **Vaciar caché**.

### What `theme.yml` applies on **Utilizar**

- Enables `ps_featuredproducts`, disables carousel/banner/newsletter.
- Hooks `ps_featuredproducts` to `displayHome`.
- Sets `HOME_FEATURED_CAT: 3` (Camisetas) and `HOME_FEATURED_NBR: 8`.

## Featured products (homepage)

`ps_featuredproducts` only renders products from **one configured category**. If that category has no direct products, the home block is empty (hook works, output is blank).

- Default PrestaShop category is **Inicio** (root) — usually empty.
- This shop's products live in **Camisetas** (category id `3`, URL `/3-merch-afonica-naranjo`).

**Manual fix (no reimport):** Modules → *Productos destacados* → **Configurar** → select **Camisetas** → Save → clear cache.

**Automatic fix:** `HOME_FEATURED_CAT: 3` in `theme.yml` (applied when you click **Utilizar** after import).

`index.tpl` also calls `{widget name='ps_featuredproducts'}` so the section renders even if Posiciones is misconfigured.

## CSS delivery & Cloudflare cache

PrestaShop loads `afonica-dark.css` from `theme.yml` **without** a query string. Cloudflare may serve a stale file (≈10 KB old vs ≈22 KB current).

`templates/_partials/head.tpl` appends versioned assets:

- `afonica-dark.css?v=1.2.5`
- `afonica-live-patch.css?v=1.2.5` (from main site CDN)
- `afonica-shop.js?v=1.2.5`

Bump the `?v=` strings in `head.tpl` and `theme.yml` version on each release.

**Verify live:**

```bash
# Stale (may be cached)
curl -s "https://shop.afonicanaranjo.com/themes/afonica/assets/css/afonica-dark.css" | wc -c

# Current (with cache bust)
curl -s "https://shop.afonicanaranjo.com/themes/afonica/assets/css/afonica-dark.css?v=1.2.5" | wc -c
# expect ~22727
```

If the unversioned URL stays stale, purge Cloudflare for `/themes/afonica/assets/css/*` and `/js/*`.

## Homepage QA

After import + cache clear, confirm:

- [ ] Black background, orange accents (`#FF5733`)
- [ ] Utility bar (Contacto, Envíos, ← Web)
- [ ] Hero with tour image
- [ ] **Los más vendidos** — 3 product cards, 4-column grid
- [ ] Trust bar (envíos, pago, oficial, atención)
- [ ] No carousel, banner, or newsletter on home
- [ ] HTML includes `afonica-dark.css?v=1.2.5`

## E2E tests

```bash
PS_ADMIN_EMAIL=... PS_ADMIN_PASSWORD=... npx playwright test e2e/import-shop-theme.spec.ts
PS_ADMIN_EMAIL=... PS_ADMIN_PASSWORD=... npx playwright test e2e/configure-shop-theme.spec.ts
```

Optional env vars: `PS_ADMIN_URL`, `PS_THEME_ZIP_URL`.

## Known pitfalls

| Issue | Cause | Fix |
|-------|--------|-----|
| White / broken layout | CSS not loaded or CF cache | `head.tpl` versioned URLs; purge CF |
| `stylesheets.tpl` ignored | Wrong block in Classic child theme | Use `head.tpl` → `{block name='stylesheets' append}` |
| Reimport keeps old version | Import over existing theme | Delete theme first, then import |
| Home products missing | `HOME_FEATURED_CAT` points to empty category | Config module → Camisetas, or **Utilizar** v1.2.5+ |
| `{block name='head' append}` in header | Classic does not render it | Load assets via `head.tpl` + `theme.yml` |

## Release checklist

1. Edit `theme-src/` and/or `afonica-prestashop.css`, `afonica-live-patch.css`.
2. Bump `version` / `display_name` in `config/theme.yml`.
3. Bump `?v=` in `templates/_partials/head.tpl`.
4. Run `./public/shop/build-theme.sh`.
5. Push to `main` (updates CDN zip + live-patch).
6. PrestaShop: delete → import → **Utilizar** → clear cache.
