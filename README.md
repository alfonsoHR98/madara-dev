# MadaraOS Portfolio

Portafolio personal con estética de sistema operativo (inspiración macOS), construido con Astro + React.

Incluye:
- Menubar glass en la parte superior
- Dock interactivo con efecto de magnificación
- Ventanas arrastrables (About, Projects, Contact, Terminal)
- Terminal interactiva con comando `neofetch`
- Wallpaper estático personalizado

## Stack

- Astro 5
- React 19
- TypeScript
- CSS custom (sin framework UI)
- Lucide Icons

## Ejecutar en local

```bash
npm install
npm run dev
```

La app corre en `http://localhost:4321`.

## Scripts

```bash
npm run dev      # desarrollo
npm run build    # build producción
npm run preview  # preview local del build
```

## Estructura principal

```text
src/
  components/
    apps/          # apps renderizadas dentro de ventanas
    shell/         # menubar, desktop, dock, wallpaper, start-menu
    windows/       # frame base de ventana
  layouts/
    OSLayout.astro
  pages/
    index.astro    # orquestación del shell + lógica de interacción
  styles/
    globals.css
public/
  wallpapers/
    back.png
```

## Personalización rápida

- Fondo: reemplaza `public/wallpapers/back.png`
- Dock y ventanas: estilos en `src/styles/globals.css`
- Comandos de terminal: `src/components/apps/TerminalApp.astro`
- Apps y contenido: `src/components/apps/*`

## Objetivo del proyecto

Mostrar perfil profesional y proyectos en una interfaz inmersiva, con foco en experiencia visual, interacción fluida y branding técnico personal.
