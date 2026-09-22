<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# DR Kalsow — Website (migración Squarespace → Next.js)

Sitio completo de Dr. Sergei Kalsow, MD (www.drkalsow.com) migrado a Next.js.
Proyecto de Terra Agency. NO confundir con `../Dr-Kalsow-Landing-Page` (LP de
conversión para tráfico pago — repo aparte, no se toca desde acá).

## Estructura

- `app/(marketing)/` — todo el sitio público. Slugs 1:1 con el sitio vivo
  (incluidos los sufijos `-1`): el mapa de migración del SEO team prohíbe
  limpiar slugs durante el launch. Única excepción hasta ahora: About, que
  el roadmap de septiembre movió a `/about-dr-sergei-kalsow` con 301.
- `lib/seo/pages.ts` — **registro único de páginas**: rutas, labels de nav,
  categorías Face/Breast/Body/Hair, titles, descriptions y H1s. Fuente:
  `~/Downloads/DrKalsow_SEO_Migration_Audit_2026-08-25.xlsx` (columnas
  "propuesto" de la solapa 00), actualizada por
  `~/Downloads/Dr Kalsow - Septiembre.xlsx` (roadmap Awake Lipo 360, solapa
  01_Matriz_URLs: home y About siguen sus Title/H1). NO cambiar titles/H1s
  sin pasar por esos Excel.
- Redirects 301 en `next.config.mjs` (solapa 02): `/home → /`,
  `/hair-transplantation → /facelift`, `/procedure-breast-augmentation →
  /breast-augmentation`, `/about-1 → /about-dr-sergei-kalsow` (rename
  pedido en el roadmap de septiembre) y `/new-page-1 → /awake-lipo-360-nyc`
  (la página de Awake Lipo del doctor en Squarespace). `/new-page` devuelve
  410 (`app/new-page/route.ts`).
  `/cart` y `/procedures` no se migran (404). Los procedimientos se navegan
  directamente desde el mega menú, sin página hub intermedia.
- Sitemap (`app/sitemap.ts`): solo URLs 200 indexables finales.
  `/dreamsplasticsurgery` y `/testimonials-1` quedan fuera de sitemap y nav
  (páginas vivas huérfanas que el SEO team no mapeó — pregunta abierta).
- **Páginas Phase 2 (NO crear en launch, escalonadas por el SEO team):**
  `/plastic-surgeon-upper-east-side` (2-4 sem post-launch),
  `/mommy-makeover` y `/tummy-tuck` (4-8 sem), `/breast-reduction`,
  `/brazilian-butt-lift`, `/plastic-surgery-for-men` (Phase 2, algunas solo
  si el servicio se ofrece realmente). La página madre de Awake Lipo 360 va
  en `/awake-lipo-360-nyc` con 301 desde `/new-page-1` (roadmap de
  septiembre). Ya existe: es la landing de Awake Lipo 360.
- `lib/site-config.ts` — facts de la práctica (teléfono, dirección, boards,
  testimonios, IDs de tracking, URL de Dreams). Single source of truth del
  copy compartido.
- `lib/seo/schema.tsx` — grafo JSON-LD: Person (el cirujano) y Physician (la
  práctica) son nodos separados con `@id` estables, más Dreams como
  MedicalClinic fundada por él. Nunca Review/AggregateRating.
- `app/llms.txt/route.ts` — guía para LLMs generada desde el registro de
  páginas (solo URLs vivas).
- `app/globals.css` — design system **Aubergine** completo (tokens `@theme` +
  clases de componentes), portado de la LP. Una sola dirección visual, no
  mezclar variantes.
- `components/layout/page-placeholder.tsx` — stub que renderiza toda página
  aún no construida (el metadata sí es real).
- **Landings SEO + paid** (`/awake-lipo-360-nyc`, `/breast-reduction-nyc`):
  un solo template en `components/marketing/landing/`, copy tipado en
  `lib/landings/content.ts`. La fuente son los HTML del SEO team
  (`~/Downloads/Dr_Kalsow_*_SEO_Paid_v*.html`): se toma el copy, se limpian
  las notas de producción que dejan inline y se rediseña sobre Aubergine.
  Las landings pagas van PG: solo before/after con ropa interior (los dos
  pares de espalda del Drive de septiembre), el resto vive en la galería.
  Llevan el header y footer completos del sitio (decisión 20 sep 2026: son
  también las páginas pilar de SEO, y la nav completa suma confianza y
  calidad de landing en Ads). El form de estas páginas manda `source` con
  el path para saber de dónde vino el lead.
- **Thank-you page (`/thank-you`):** los tres forms redirigen ahí tras un
  envío exitoso con navegación completa (`window.location.replace`, no
  `router.replace`) para que GTM, GA4 y Meta Pixel vean un pageview real:
  la conversión de lead se dispara por URL desde GTM, sin eventos custom.
  Llega `?source=<path>` con la página de origen y la X vuelve ahí. Vive en
  `app/thank-you/`, FUERA de `(marketing)`: una sola pantalla sin header ni
  footer del sitio (logo, X, titular, dos líneas y "Follow us"). En el
  registro es `group: "utility"` con `noindex` e `inSitemap: false`: fuera
  de sitemap, nav y llms.txt. Sin JSON-LD. Componentes en
  `components/marketing/thank-you/`.
- **Prioridad lipo:** carousel del home, `/beforeafter` y `/testimonials`
  arrancan siempre por liposucción (Awake Lipo 360, Lipo 360 + BBL, Skinny
  BBL, Arm Lipo, Chin Lipo). No reordenar hacia cara o mama.
- **Fotos before/after nuevas:** vienen del Drive "Web" del cliente (ver
  vault). Son 1080x1350 con footer de marca: recortar a 1080x1010 y
  componer before | after cuadrado (1000 galería, 1100 carousel). Solo se
  publican vistas con ropa interior; nada con pezones, glúteos desnudos ni
  barras negras, y nunca las capturas de Instagram ni el retrato IA.

## Reglas

- **Tokens, no hex sueltos:** todo color/font/spacing sale de `globals.css`.
- **Tipografía:** Cormorant Garamond (display, `--font-display`) + Inter
  (sans). No agregar familias.
- **Sin before/after explícitos en `public/`** — las imágenes de galería se
  curan con Nico antes de subirse (algunas del sitio viejo son explícitas).
- **Solo NYC** (635 Madison Ave). Miami se descartó — el cliente no tiene
  oficina ahí, aunque el sitio viejo la mencione.
- **Claims verificables:** nada de "15+ years" ni fechas de fundación
  inventadas. "5,000+ surgeries" sí está aprobado.
- **Sin em dashes (—) en el copy** del sitio (pedido del cliente).
- **NO commitear ni pushear** sin OK explícito de Nico.
- Construcción página por página: cada página se diseña y revisa con Nico
  antes de pasar a la siguiente.
- **Staging:** proteger con HTTP auth + noindex hasta el cutover; el sitemap
  se envía a GSC recién en producción (checklist solapa 07).
