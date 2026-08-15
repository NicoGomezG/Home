import { Component } from '@angular/core';
import { GithubCalendar } from '../../shared/github-calendar/github-calendar';

interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  description: string;
}

interface EducationItem {
  institution: string;
  program: string;
  period: string;
}

interface CourseItem {
  name: string;
  period: string;
  detail: string;
}

@Component({
  selector: 'app-profile',
  imports: [GithubCalendar],
  templateUrl: './profile.html',
})
export class Profile {
  protected readonly skillGroups: { label: string; items: string[] }[] = [
    {
      label: 'Lenguajes de programación',
      items: ['Java', 'Python', 'C', 'C++', 'HTML', 'CSS', 'JavaScript', 'Angular', 'Dart'],
    },
    { label: 'Sistemas operativos', items: ['Linux', 'Windows'] },
    { label: 'Bases de datos', items: ['SQL', 'MySQL', 'Power BI (básico)'] },
    { label: 'Otros', items: ['Microsoft Excel', 'Microsoft Office'] },
  ];

  protected readonly experience: ExperienceItem[] = [
    {
      role: 'Área de TI',
      org: 'Notifica Legal',
      period: 'Abril 2025 — Actualidad',
      description: 'Desarrollo, gestión y mejora continua de plataforma web.',
    },
    {
      role: 'Jefe de TI',
      org: 'Sinapsis Clínica',
      period: 'Sept 2024 — Dic 2024',
      description: 'Desarrollo, gestión y mejora continua de plataforma de e-learning.',
    },
    {
      role: 'Área de operaciones',
      org: 'GodTier SPA',
      period: '2021 — 2023',
      description: 'Gestión y producción de eventos.',
    },
  ];

  protected readonly education: EducationItem[] = [
    {
      institution: 'Universidad Andrés Bello',
      program: 'Ingeniería Civil Informática',
      period: '2017 — 2023',
    },
    {
      institution: 'Universidad Javeriana de Cali',
      program: 'Intercambio online — Programación paralela y seguridad informática',
      period: 'Feb 2021 — Jul 2021',
    },
  ];

  protected readonly courses: CourseItem[] = [
    {
      name: 'Tableau',
      period: 'Septiembre 2021',
      detail: 'Análisis de datos y visualizaciones.',
    },
    {
      name: 'IBM Skills Academy',
      period: 'Julio y Octubre 2022',
      detail: 'Ciencia de datos · Artificial Intelligence Practitioners.',
    },
    {
      name: 'Platzi',
      period: 'Octubre 2022',
      detail: 'Organización y productividad con Notion.',
    },
    {
      name: 'Coursera',
      period: 'Noviembre 2024',
      detail: 'Preparación de datos para el análisis con Microsoft Excel.',
    },
  ];

  protected readonly languages: { label: string; level: string }[] = [
    { label: 'Español', level: 'Nativo' },
    { label: 'Inglés', level: 'Intermedio' },
    { label: 'Italiano', level: 'Básico' },
  ];

  protected readonly email = 'n.gomezgodoy@uandresbello.edu';

  protected readonly githubUsername = 'NicoGomezG';

  protected readonly socialLinks: { label: string; href: string; icon: 'github' | 'linkedin' }[] = [
    { label: 'GitHub', href: 'https://github.com/NicoGomezG', icon: 'github' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/nicolas-gomez-godoy-5589ab210/',
      icon: 'linkedin',
    },
  ];
}
