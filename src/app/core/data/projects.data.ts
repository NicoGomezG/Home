import { Project } from '../models/project.model';

/**
 * Fallback usado por `ProjectsService` mientras no está conectada la tabla
 * `projects` en Supabase (o si está vacía).
 */
export const PROJECTS: Project[] = [
  {
    id: 'notifica-legal',
    title: 'Notifica Legal',
    description:
      'Plataforma SaaS diseñada para que abogados y receptores puedan llevar a cabo sus gestiones, control financiero y otros servicios, con un CRM interno.',
    tags: ['Angular', 'SaaS', 'CRM'],
    logoUrl: '/logos/notifica-legal.png',
    liveUrl: 'https://notificalegal.cl',
    liveUrlLabel: 'notificalegal.cl',
    secondaryUrl: 'https://app.notificalegal.cl',
    secondaryUrlLabel: 'app.notificalegal.cl',
    featured: true,
  },
  {
    id: 'lonche',
    title: 'Lonche',
    description: 'Landing page de local de comidas.',
    tags: ['Landing page'],
    logoUrl: '/logos/lonche.png',
    liveUrl: 'https://lonche.cl',
    liveUrlLabel: 'lonche.cl',
  },
  {
    id: 'cgl-producciones',
    title: 'CGL Producciones',
    description:
      'Landing page de productora de eventos y prestadora de servicios relacionados.',
    tags: ['Landing page'],
    logoUrl: '/logos/cgl-producciones.png',
    liveUrl: 'https://cgl-producciones.vercel.app/',
    liveUrlLabel: 'cgl-producciones.vercel.app',
  },
  {
    id: 'hubbert',
    title: 'Hubbert',
    description: 'Bot de Discord con saludos de cumpleaños automáticos, creación de embeds y otras utilidades para servidores.',
    tags: ['Discord', 'Bot', 'Node.js'],
    logoUrl: '/logos/hubbert.png',
    liveUrl: 'https://hubbert.vercel.app/',
    liveUrlLabel: 'hubbert.vercel.app',
  },
];
