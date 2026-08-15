# Portfolio personal

Sitio personal (perfil / CV + proyectos + bots de Discord descargables) hecho en
Angular 21 + Tailwind CSS, con Supabase como base de datos y Vercel como hosting.

## Estructura

```
src/app/
  layout/           navbar y footer
  pages/
    profile/        página de perfil / CV
    projects/        listado de proyectos (páginas y otros desarrollos)
    bots/            listado de bots de Discord (control de acceso pendiente)
  core/
    models/          interfaces (Project, Bot)
    data/            datos placeholder usados como fallback
    services/        SupabaseService, ProjectsService
  shared/
    project-card/    tarjeta reutilizable de proyecto
```

Todo el contenido (nombre, bio, skills, experiencia, proyectos, bots) es
placeholder por ahora — está pensado para reemplazarse fácilmente.

## Desarrollo local

```bash
npm install
ng serve
```

Abre `http://localhost:4200`.

## Conectar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. En **Project Settings → API**, copia la `Project URL` y la `anon public key`.
3. Pégalas en `src/environments/environment.ts` y
   `src/environments/environment.development.ts`.
   > La `anon key` de Supabase está diseñada para exponerse en el frontend; la
   > seguridad real se controla con Row Level Security (RLS) en las tablas, no
   > ocultando esta clave.
4. Crea la tabla `projects` (columnas: `id`, `title`, `description`, `tags`
   `text[]`, `logo_url`, `live_url`, `live_url_label`, `secondary_url`,
   `secondary_url_label`, `repo_url`, `featured` `bool`). Mientras la tabla no
   exista o esté vacía, `ProjectsService` muestra los proyectos de
   `core/data/projects.data.ts` automáticamente.
5. Para los bots de Discord (tabla `bots` + descargas protegidas) falta
   definir el mecanismo de acceso (login por email, Discord OAuth, etc.) —
   ver `pages/bots`.

## Desplegar en Vercel

1. Sube el repo a GitHub.
2. En Vercel, "Import Project" y selecciona el repo (detecta Angular
   automáticamente vía `angular.json`).
3. `vercel.json` ya incluye el rewrite para que las rutas de Angular Router
   (`/proyectos`, `/bots`, etc.) funcionen al recargar o entrar directo.
4. Las credenciales de Supabase quedan compiladas en el bundle (son públicas
   por diseño), así que no hace falta configurar variables de entorno en
   Vercel para que funcione.

## Comandos

```bash
ng serve      # desarrollo
ng build      # build de producción en dist/portfolio
ng test       # tests unitarios (Vitest)
```
