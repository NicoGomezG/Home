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
  { path: '**', redirectTo: '' },
];
