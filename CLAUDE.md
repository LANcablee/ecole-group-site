# Ecole Group — website

Static multi-page site for **Ecole Group Ltd**, an independent UK group.

**Marka mimarisi:** **SARDIS HOME** = grubun KENDI markasi (pamuklu ev/banyo tekstili; Turkiye'de uretilir) — eski "Ecole Textile" bolumunun yerine gecti. **ELY’S CURE** = distributorlugunu yaptigimiz marka. **Ecole Chemicals** = gelistirme asamasindaki tek bolum.
Site kendini distributor DEGIL, hem kendi markalarini kuran hem secili markalari temsil eden bir grup olarak konumlar; toptanci dili (marj, minimum siparis, stok yenileme, ticari kosullar) KULLANILMAZ.

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
- `sardis-home.html` — SARDIS HOME marka sayfasi (`.theme-sardis` alt temasi)
- `chemicals.html` — "in development" sayfasi
- `textile.html` KALDIRILDI — `_redirects` ile `/textile` → `/sardis-home` (301)
- `privacy.html`, `cookie.html`, `terms.html` — legal (STARTER templates: review + fill placeholders)

## Design tokens (CSS :root — tek dosya: `styles.css`)
- cream `#F5F1E8`, ink `#16130F`, body text `#433F38`, muted `#6B675D` (AA icin koyulastirildi), hairline `#DCD5C5`
- green accent `#39452D`, green-dark `#2A3320`
- Fonts (Google Fonts): Cormorant Garamond (display/serif), Jost (sans)

## URL kurali
- TUM ic linkler, canonical, hreflang ve sitemap UZANTISIZ URL kullanir: `/about`, `/tr/about`, ana sayfalar `/`, `/tr/` ...
- Cloudflare `.html` isteklerini uzantisiza 308 ile yonlendirir; eski `.html` linkler kirilmaz.

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

## Wordmark
- `wordmark.svg` (viewBox 622x183) = resmi logo: serif "Ecole" + ince dikey cizgi + tracked "GROUP".
- Header ve footer'da `<span class="w-mark">` olarak, CSS `mask-image` ile basilir; renk `currentColor`
  (header: ink, footer: cream). Boylece tek dosya iki zeminde de dogru renkte cikar ve keskin kalir.
- Boyut `.w-mark` icindeki `height` + `aspect-ratio` ile ayarlanir.

## Emblem watermark
- A mark of two interlocking "Z" letterforms (nested, crossing at centre, in a thin circle). Ic Z'nin yatay cubuklari dis Z'nin caprazina TAM DEGER (84->153 ust, 87->156 alt) — "original, inner bars meeting the diagonal" varyanti, thin uniform stroke `2`, green `#39452D`.
- Standalone file: `emblem.svg`. Also embedded **inline** as `<svg class="seal-bg">` (uses `currentColor`) so pages stay self-contained.
- Placed as a faint background watermark via `.seal-bg` (absolutely centred, low `opacity`): behind the **contact** section on `index.html` (opacity .07) and behind the centred content on `chemicals.html` (opacity .06).
- A repeating "chain" of the same seal (`.hero-chain` / `.soon-chain` — inline `<svg>` with a `<defs>` unit + `<use>`) runs faintly along the lower area: lower-right on `index.html` (fades left), centred on `chemicals.html` (fades both ends); opacity .08, hidden under 820px.
- Anasayfadaki editorial ayracin ortasindaki `.ed-seal` ORIJINAL amblemin BIREBIR ayni geometrisidir
  (cember 120,120 r96 + dis Z 76/164/72/168 + ic Z 84->153 ust, 87->156 alt). Kucuk boyutta okunsun diye
  yalnizca `stroke-width` 2 yerine 4; koordinatlar ASLA sadelestirilmez.
- To tune: change `opacity` (visibility) and `width` / `height` (size). Alternate seal layout available: `emblem-alt.svg` (farkli, ust uste binen duzen — sayfalarda KULLANILMIYOR, eski konsept).
- **Favicon:** `favicon.svg` (bold version of the mark — green tile, cream strokes) is linked in every page `<head>` via `<link rel="icon" type="image/svg+xml">`. Possible future use: letterhead, PNG/ICO fallback for older browsers.

## TODO
- Fill legal placeholders (registered office address, company number) and have the legal text reviewed
- Optional: dedicated `for-retailers.html` / `contact.html` (currently sections on Home)
- Deploy: GitHub repo → Cloudflare Pages; connect domain ecolegroup.co.uk

## SARDIS HOME alt tema
- Tokenlar `.theme-sardis` icine KAPSANMISTIR; global `:root`'a sizmaz.
  cream `#EDE6D9`, ink `#2E2E2B`, aksan clay `#6E3F33`, clay-d `#58322A`, line `#DCD2C0`, muted `#696258`.
  Zemin ve murekkep urun etiketinden (SARDIS-HOME-LONDON.pdf) dogrulanmistir.
- Wordmark AYRI DOSYA DEGIL: `.sardis-mark` + `.sardis-sub` ile Jost'tan harf araligiyla dizilir (etiketteki geometrik dizilisin ayni).
- `.origin-bar` = `.vegan-bar` muadili, kiremit zeminli, etiketteki bakim + mense bilgisi.

## Marka/hukuk kurallari (Sardis Home)
- SARDIS HOME yaninda ASLA `®` / `™` kullanma (tescil sureci devam ediyor).
- "Ecole Group" ibaresi Sardis wordmark'inin icine veya urun gorseline KONMAZ; yalnizca govde metni ve kurumsal katmanda gecer.
- YASAK: marka geneline yayilan "%100 pamuk" iddiasi; uydurma kurulus yili/miras; "dunyanin havlu baskenti" vb.
- Denizli ADI GECMEZ. Izin verilen tek register: urunun "koklu bir tekstil bolgesinde uretildigi". Miras sahiplenilmez.
- Ecole Group'un URETIM yaptigina dair iddia YOK. Mense yalnizca urune baglanir ("Made in Turkiye").
  FR'de `fabrication`, DE'de `Herstellung` gruba baglanacak sekilde KULLANILMAZ.
- Toptanci dili yasak: marj, minimum siparis, stok yenileme, ticari kosullar/hesaplar, "rafa hazir".
