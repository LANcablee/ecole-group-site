# Ecole Group — website

Static multi-page site for **Ecole Group Ltd**, an independent UK distribution company.
Active brand: **ELY’S CURE** (natural skincare, distributed in the UK). **Ecole Textile** and **Ecole Chemicals** divisions are in development.

## i18n
- Kok dizin = EN (varsayilan), `/tr/`, `/fr/`, `/de/` = birebir kopyalar (8 sayfa x 3 dil).
- Her sayfada canonical + `hreflang` (en / tr / fr / de / x-default) uclusu var; sitemap.xml `xhtml:link` alternatifleriyle iki dili de listeler.
- Header sag ustte dil acilir menusu (`.lang` / `#langBtn` / `#langMenu`, mantik site.js icinde). Her sayfa kendi karsiligina linkler.
- TR/FR/DE yasal sayfalarda "baglayici surum Ingilizcedir" notu var. Icerik degisikliklerinde DORT dili birden guncelle (EN, TR, FR, DE).
- TR/FR/DE sayfalar asset'lere kok-goreli baglanir (`/styles.css`, `/site.js`, `/favicon.svg`).

## Pages
- `index.html` — Home (hero, brands, "for retailers" section, contact section)
- `about.html` — About
- `elys-cure.html` — ELY’S CURE brand page
- `textile.html`, `chemicals.html` — "in development" pages
- `privacy.html`, `cookie.html`, `terms.html` — legal (STARTER templates: review + fill placeholders)

## Design tokens (CSS :root — tek dosya: `styles.css`)
- cream `#F5F1E8`, ink `#16130F`, body text `#433F38`, muted `#6B675D` (AA icin koyulastirildi), hairline `#DCD5C5`
- green accent `#39452D`, green-dark `#2A3320`
- Fonts (Google Fonts): Cormorant Garamond (display/serif), Jost (sans)

## Structure
- Shared CSS: `styles.css` (tum sayfalar `<link>` ile kullanir; olu kurallar temizlendi)
- Shared JS: `site.js` (`defer`; menu + focus trap + inert + scroll reveal). `<head>`'te tek satirlik inline script `.js` sinifini ekler — CSP hash'i `_headers` icinde.
- `_headers`: guvenlik basliklari (CSP, nosniff, frame-ancestors, Referrer/Permissions-Policy) + styles/site.js cache. Repo kokunde durmali.

## Conventions
- Centered wordmark header; full-screen menu (hamburger morphs to ×)
- Restrained, Rothschild-style register; text links with arrows, no filled buttons
- All CTAs route to the single contact point: info@ecolegroup.co.uk
- Tracked-caps eyebrows with a small green vertical "tick" (logo motif)
- Active brand uses green; in-development items stay neutral

## Emblem watermark
- A spiritual mark of two interlocking "Z" letterforms (nested, crossing at centre, in a thin circle), thin uniform stroke `1.5`, green `#39452D`.
- Standalone file: `emblem.svg`. Also embedded **inline** as `<svg class="seal-bg">` (uses `currentColor`) so pages stay self-contained.
- Placed as a faint background watermark via `.seal-bg` (absolutely centred, low `opacity`): behind the **contact** section on `index.html` (opacity .07) and behind the centred content on `textile.html` / `chemicals.html` (opacity .06).
- A repeating "chain" of the same seal (`.hero-chain` / `.soon-chain` — inline `<svg>` with a `<defs>` unit + `<use>`) runs faintly along the lower area: lower-right on `index.html` (fades left), centred on `textile.html` / `chemicals.html` (fades both ends); opacity .08, hidden under 820px.
- To tune: change `opacity` (visibility) and `width` / `height` (size). Alternate seal layout available: `bg-z-B-stacked.svg`.
- **Favicon:** `favicon.svg` (bold version of the mark — green tile, cream strokes) is linked in every page `<head>` via `<link rel="icon" type="image/svg+xml">`. Possible future use: letterhead, PNG/ICO fallback for older browsers.

## TODO
- Fill legal placeholders (registered office address, company number) and have the legal text reviewed
- Optional: dedicated `for-retailers.html` / `contact.html` (currently sections on Home)
- Deploy: GitHub repo → Cloudflare Pages; connect domain ecolegroup.co.uk
