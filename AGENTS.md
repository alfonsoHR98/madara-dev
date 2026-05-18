# AGENTS.md

## Project Shape
- Single Astro 5 portfolio app with React 19 dependencies still installed via `@astrojs/react`, but current app windows are `.astro` components; there is no monorepo/workspace config.
- UI copy and content are mostly Spanish. Keep Spanish wording unless the user asks for a language change.
- `src/pages/index.astro` is the real shell entrypoint: it composes the desktop, windows, dock, start menu, and owns the inline DOM script for open/minimize/drag/focus, keyboard shortcuts, and terminal app-open events.
- `src/layouts/OSLayout.astro` imports the only global stylesheet, `src/styles/globals.css`; there is no CSS framework or component-scoped styling pattern here.

## Commands
- Dev server: `npm run dev` (`astro dev`, default `http://localhost:4321`).
- Production build / main verification: `npm run build`.
- Preview a built site: `npm run preview`.
- Astro CLI passthrough: `npm run astro -- <command>`.
- No lint, test, typecheck, formatter, CI, or pre-commit config is currently defined; do not claim those checks passed unless you add/run them.

## Package Manager
- `pnpm-lock.yaml` is present, but `package.json` has no `packageManager` and README documents `npm install`. Avoid accidentally adding a second lockfile during dependency work.
- Dependencies in the lockfile include `@astrojs/react` with Node `>=22.12.0`; old Node versions may fail install/build even though the root package has no `engines` field.

## App Wiring Gotchas
- To add a desktop app/window, update all relevant registries: `WindowFrame` usage and imports in `src/pages/index.astro`, `APP_META` in that file, `src/components/shell/DesktopIcons.astro`, `src/components/shell/StartMenu.astro`, and `TerminalApp.astro`'s `open <app>` map if terminal launch should work.
- `src/data/resume.json` is the primary portfolio source for About, Projects, Contact, and Terminal output. Prefer updating it before hardcoding duplicated personal/project data.
- `BrowserApp.astro` is wired into `index.astro`, desktop icons, start menu, dock metadata, and terminal `open browser`.
- Window control selectors depend on Spanish `aria-label` values (`Cerrar`, `Minimizar`, `Maximizar`); changing those labels without updating `index.astro` breaks controls.
