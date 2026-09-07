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
  limpiar slugs durante el launch.
- `lib/seo/pages.ts` — **registro único de páginas**: rutas, labels de nav,
  categorías Face/Breast/Body/Hair, titles, descriptions y H1s. Fuente:
  `~/Downloads/DrKalsow_SEO_Migration_Audit_2026-08-25.xlsx` (columnas
  "propuesto" de la solapa 00). NO cambiar titles/H1s sin pasar por el Excel.
- Redirects 301 en `next.config.ts` (solapa 02): `/home → /`,
  `/hair-transplantation → /facelift`, `/procedure-breast-augmentation →
  /breast-augmentation`. `/new-page` devuelve 410 (`app/new-page/route.ts`).
  `/cart` y `/procedures` no se migran (404). Los procedimientos se navegan
  directamente desde el mega menú, sin página hub intermedia.
- Sitemap (`app/sitemap.ts`): solo URLs 200 indexables finales.
  `/dreamsplasticsurgery` y `/testimonials-1` quedan fuera de sitemap y nav
  (páginas vivas huérfanas que el SEO team no mapeó — pregunta abierta).
- **Páginas Phase 2 (NO crear en launch, escalonadas por el SEO team):**
  `/plastic-surgeon-upper-east-side` (2-4 sem post-launch),
  `/mommy-makeover` y `/tummy-tuck` (4-8 sem), `/breast-reduction`,
  `/brazilian-butt-lift`, `/awake-lipo-360` y `/plastic-surgery-for-men`
  (Phase 2, algunas solo si el servicio se ofrece realmente).
- `lib/site-config.ts` — facts de la práctica (teléfono, dirección, boards,
  testimonios). Single source of truth del copy compartido.
- `app/globals.css` — design system **Aubergine** completo (tokens `@theme` +
  clases de componentes), portado de la LP. Una sola dirección visual, no
  mezclar variantes.
- `components/layout/page-placeholder.tsx` — stub que renderiza toda página
  aún no construida (el metadata sí es real).

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
