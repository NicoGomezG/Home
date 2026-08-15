import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
    title: 'Nicolás Gómez — Perfil',
  },
  {
    path: 'proyectos',
    loadComponent: () => import('./pages/projects/projects').then((m) => m.Projects),
    title: 'Proyectos — Nicolás Gómez',
  },
  {
    path: 'bots',
    loadComponent: () => import('./pages/bots/bots').then((m) => m.Bots),
    title: 'Bots de Discord — Nicolás Gómez',
  },
  { path: '**', redirectTo: '' },
];
