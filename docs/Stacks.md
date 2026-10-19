# Stacks websites
## Kyoto-website
 - Framework: Next.js 16 con App Router y export estático.
  - Lenguaje: TypeScript 5.9.
  - Runtime y gestor de paquetes: Bun, nunca npm ni npx.
  - Escena 3D: three, R3F, drei, postprocessing y shaders GLSL escritos a mano.
  - Animación y scroll: GSAP con ScrollTrigger, más Lenis, ambos bajo un solo requestAnimationFrame. El audio es Web Audio sintetizado, sin archivos.
  - Resto: React 19.2.8 (clavado), next-intl, Zustand, Tailwind 4, los scripts de fuentes, modelos, geo, mapas y kanji, las tres tipografías locales, los comandos y el despliegue.
## La Huesera
- Languages: C# (servidor), JavaScript (cliente), HTML/CSS (vistas)
- Framework / runtime: ASP.NET MVC + ASP.NET Web API sobre .NET Framework (solution: LaHuesera.sln)
- Notable libraries:
    - Entity Framework (EDMX - Database First) — proyecto Conector contiene el modelo .edmx y clases generadas
    - Bootstrap / jQuery (interfaz de las vistas Razor)
    - NuGet para gestión de paquetes (packages.config en ambos proyectos)
## Proyecto Rick Y Morty

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| .NET | 10.0 | Framework principal |
| Blazor | .NET 10 | Frontend interactivo |
| Bootstrap | 5.3.8 | Framework CSS |
| Bootstrap Icons | 1.11.0 | Iconografía |
| C# | 12.0 | Lenguaje de programación |
| Rick and Morty API | v1 | Fuente de datos |
## Streaming app
### Lenguaje

- **TypeScript** — tipado estático en todo el monorepo (web, servidor y tipos compartidos).

### Runtime y gestor de paquetes

- **Bun** — ejecuta TypeScript directamente (sin paso de build), corre los tests y gestiona
  los workspaces del monorepo. Reemplaza a Node y npm.

### Frontend (`apps/web`)

- **React 19** — biblioteca de UI.
- **Vite** — dev server y build de producción.
- **Tailwind CSS v4** — utilidades de estilo, configuradas en CSS (`@theme`) a partir de los
  tokens de color de cada tema.
- **TanStack Router** — enrutado con rutas tipadas por archivo.
- **TanStack Query** — fetching, caché e invalidación de los datos que vienen del servidor
  (búsqueda, metadata).
- **Zustand** — estado de la UI que persiste en `localStorage` (tema, historial de búsquedas).
- **Radix UI** — primitivas accesibles sin estilos propios (diálogo, menú contextual, slider,
  scroll area, tooltip).
- **lucide-react** — set de iconos.

### Backend (`apps/server`)

- **Hono** — framework HTTP sobre Bun; expone las rutas `/api/...`.
- **Zod** — valida las variables de entorno, los parámetros de las rutas y normaliza las
  respuestas crudas del proveedor de metadata a los tipos compartidos.
- **Drizzle ORM + SQLite de Bun** — persistencia local tipada para la biblioteca, las
  playlists, sus pistas y el caché de metadata.
## FutStats (en el repo quedó con el nombre de mundial-app)
Bun · Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · TanStack Query v5
