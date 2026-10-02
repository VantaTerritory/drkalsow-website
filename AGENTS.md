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
- `components/ui/stat-bento.tsx` — **bento de tres cifras** (la primera lidera
  en un tile oscuro a dos filas; `lead="light"` invierte la paleta sobre
  aubergine). Regla de Nico (22 sep 2026): tiles solo para datos puntuales
  (cantidades, tarifas, hechos de una palabra) intercalados con texto
  legible; nunca convertir secciones enteras en cards. Lo usan el bloque
  del doctor y el approach de las landings, "Why patients choose" del home,
  la intro de los 12 procedimientos (`PROCEDURE_FACTS`, apagable con
  `facts: false`) y las tres vías de consulta del contacto. Las tarifas
  salen siempre de `siteConfig.consultation` (también en el FAQ compartido).
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
  **El orden de secciones es data** (`sections` en cada landing). Awake
  Lipo 360 va "authority-first" desde el 22 sep 2026 (revisión del cliente
  del 21 sep): hero → doctor con sus cifras (5,000+ awake lipo, 8,000+
  awake, 10,000+ cirugías, dichas por el doctor) y el form AL COSTADO, en
  la misma sección (`surgeon-consult`, 2 oct, pedido del cliente vía Nico:
  llegar al form sin bajar; en phones va presentación + cifras → form →
  resto de los datos; el form no es sticky porque mide ~810 px) → casos
  numerados (Case 01, 02…,
  before | after, videos como tiles) → cicatrices → detalle del
  procedimiento → FAQ → banda final. Breast
  Reduction conserva el orden original del SEO team hasta que el cliente
  la revise; los cambios se replican una landing a la vez.
- **Thank-you page (`/thank-you`):** los tres forms redirigen ahí tras un
  envío exitoso con navegación completa (`window.location.replace`, no
  `router.replace`) para que GTM, GA4 y Meta Pixel vean un pageview real:
  la conversión de lead se dispara por URL desde GTM, sin eventos custom.
  Llega `?source=<path>` con la página de origen y el botón primario
  "Back to <página>" vuelve ahí. Vive en `app/thank-you/`, FUERA de
  `(marketing)`: una sola pantalla sin header ni footer del sitio, con una
  card blanca flotante centrada (logo, eyebrow, titular, una línea, botones
  Back + Call y fila "Follow us"). Tiene que entrar sin scroll en laptops
  (1280x720 incluido). En el
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
  barras negras, y nunca el retrato IA. Capturas de testimonios: las 4 del
  prototipo del doctor tienen consentimiento de los pacientes (28 sep 2026)
  y están en la B (bloque "Why", no se abren al tocar, pedido del
  cliente); las historias de Instagram del Drive (bikini o lencería) no
  van en páginas pagas.
- **Variante B de Awake Lipo 360 (`/lipo-360-v2`, test A/B de Google Ads,
  sep 2026):** la A (`/awake-lipo-360-nyc`) es el control y no se toca, ni
  su HTML ni el CSS que descarga, salvo pedido explícito de Nico (2 oct:
  form al costado del doctor). La B es el diseño Aubergine con el
  contenido y el orden del doctor: bloques tipados en
  `lib/landings/lipo-360-v2.ts` (se reordenan, quitan o duplican ahí),
  componentes en `components/marketing/lipo-v2/` y **CSS propio en
  `components/marketing/lipo-v2/lipo-v2.css`** (y `lipo-v2-guide.css`),
  hojas de la ruta y no `globals.css`, para que la A no baje ni un byte de
  B. Todo selector lleva `lv2-`. Desde la ronda 2 (29 sep, revisión de
  Andrés) el orden sigue el "draft 2" del doctor: hero (solo su retrato IA;
  el clip de marcación pasó al bloque del procedimiento) → "Why thousands
  of patients choose" (6 razones + capturas) → filosofía → galería → "An
  honest assessment" → form → qué es Lipo 360 → … → FAQ → form. **Dos
  forms:** `#consultation` después de la galería (ahí llevan el hero, la
  galería y la barra fija de phones, que es compartida con la A y apunta a
  ese id) y `#consultation-end` al pie, que toma el look que la A le da a
  su `#consultation`. Las secciones largas del draft 2 son bloques genéricos
  (`prose`, `points`, `disclosure`, `lessons`, `revision`) con el copy en
  `lib/landings/lipo-360-v2-guide.ts` y los componentes en `guide.tsx`; si
  la página queda larga, se mueven a otras páginas desde ahí. **Esos
  bloques se montan en el cliente después del `load`** (`lazy-guide.tsx`,
  `next/dynamic` sin SSR): con su texto en el HTML (y repetido en el
  payload RSC) el documento duplicaba al de la A y el LCP del hero perdía
  en Lighthouse. Las imágenes que quedan justo bajo el primer pantallazo en
  phones (capturas, foto de la filosofía) montan recién cerca del viewport
  (`deferred.tsx`): el lazy nativo las bajaba con la página. Tailwind v4 escanea el código y los .md: una palabra suelta que
  coincida con una utilidad (p. ej. un valor de `display` en un comentario)
  agrega esa regla al CSS global de todo el sitio; después de tocar B,
  comprobar que el CSS que baja la A sigue siendo el de `main`. En el
  registro es `group: "experiment"`
  (noindex, fuera de sitemap, nav y llms.txt, sin JSON-LD de página;
  `/thank-you` sí vuelve a ella). Tracking: `landing_variant: "B"` y
  `click_to_call` al dataLayer (`variant-tracker.tsx`); las conversiones
  del test se miden igual en A y B (trigger de GTM en links `tel:` y page
  view de `/thank-you` con `source`). Microsoft Clarity (`clarity.tsx`, con su id
  ahí y no en `siteConfig`, que llega a los chunks de la A) va solo en la B desde el 30 sep: producción,
  solo en el dominio `drkalsow.com`, `lazyOnload`, y los dos forms
  enmascarados con `data-clarity-mask`.
- **Fotos clínicas de la B, sin velo desde el 29 sep 2026 (excepción a la
  regla PG):** los before/after del doctor, sin recortar y con la censura
  que ya traen, viven en `public/img/lipo-v2/ba/full/` y la grilla los
  muestra directo (el velo de la ronda 1 se sacó por pedido del cliente;
  Nico aceptó el riesgo de la revisión de Google Ads). Un toque abre el
  original en el lightbox. `next.config.mjs` les pone
  `X-Robots-Tag: noindex`, pero en Hostinger los archivos de `public/` los
  sirve LiteSpeed directo, sin pasar por Next: ahí el header solo llega vía
  `/_next/image` (que es lo que usa la grilla). Los nombres de archivo del
  Drive (`source`) nunca llegan al cliente. `docs/referencia-web-doctor/`
  (capturas del prototipo del doctor, con desnudez) está en `.gitignore`:
  el repo es público.
- **Fotos stock de la B (`public/img/lipo-v2/stock/`):** las eligió el
  cliente (sitio viejo y draft 2), licencia desconocida; Nico aceptó el
  riesgo de copyright y de Ads (29 sep 2026). Siempre con el caption
  "Illustrative image. Not a patient.". Las chicas se mejoran con
  Real-ESRGAN x4 antes de usarlas.

## Reglas

- **Tokens, no hex sueltos:** todo color/font/spacing sale de `globals.css`.
- **Tipografía:** Cormorant Garamond (display, `--font-display`) + Inter
  (sans). No agregar familias.
- **Sin before/after explícitos en `public/`** — las imágenes de galería se
  curan con Nico antes de subirse (algunas del sitio viejo son explícitas).
  Única excepción: `public/img/lipo-v2/ba/full/`, que la B muestra sin
  velo desde el 29 sep 2026 (decisión de Nico).
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
