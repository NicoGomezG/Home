import { Component, inject, signal } from '@angular/core';
import { GithubCalendar } from '../../shared/github-calendar/github-calendar';
import { GithubRepo, GithubService } from '../../core/services/github.service';
import { PROJECTS } from '../../core/data/projects.data';
import { ProjectCard } from '../../shared/project-card/project-card';

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

const RELATIVE_TIME = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

@Component({
  selector: 'app-profile',
  imports: [GithubCalendar, ProjectCard],
  templateUrl: './profile.html',
})
export class Profile {
  private readonly github = inject(GithubService);

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

  // Más reciente primero — se usa para "3 más recientes + ver más".
  protected readonly courses: CourseItem[] = [
    {
      name: 'Coursera',
      period: 'Noviembre 2024',
      detail: 'Preparación de datos para el análisis con Microsoft Excel.',
    },
    {
      name: 'Platzi',
      period: 'Octubre 2022',
      detail: 'Organización y productividad con Notion.',
    },
    {
      name: 'IBM Skills Academy',
      period: 'Julio y Octubre 2022',
      detail: 'Ciencia de datos · Artificial Intelligence Practitioners.',
    },
    {
      name: 'Tableau',
      period: 'Septiembre 2021',
      detail: 'Análisis de datos y visualizaciones.',
    },
  ];

  protected readonly recentCourses = this.courses.slice(0, 3);
  protected readonly moreCourses = this.courses.slice(3);
  protected readonly showAllCourses = signal(false);

  protected readonly languages: { label: string; level: string }[] = [
    { label: 'Español', level: 'Nativo' },
    { label: 'Inglés', level: 'Intermedio' },
    { label: 'Italiano', level: 'Básico' },
  ];

  protected readonly email = 'n.gomezgodoy@uandresbello.edu';

  protected readonly githubUsername = 'NicoGomezG';

  // Repos con logo propio (ya usado en Proyectos) en vez de la imagen
  // auto-generada de GitHub.
  private readonly knownRepoLogos: Record<string, string> = {
    'notifica-legal-ui': '/logos/notifica-legal.png',
    Lonche: '/logos/lonche.png',
    CGL: '/logos/cgl-producciones.png',
  };

  protected readonly socialLinks: { label: string; href: string; icon: 'github' | 'linkedin' }[] = [
    { label: 'GitHub', href: 'https://github.com/NicoGomezG', icon: 'github' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/nicolas-gomez-godoy-5589ab210/',
      icon: 'linkedin',
    },
  ];

  protected readonly featuredProjects = PROJECTS.slice(0, 3);
  protected readonly yearsExperience = new Date().getFullYear() - 2021;

  protected readonly githubTotal = signal<number | null>(null);
  protected readonly recentRepos = signal<GithubRepo[]>([]);
  protected readonly recentReposLoading = signal(true);
  protected readonly recentReposError = signal(false);

  constructor() {
    this.github
      .getContributions(this.githubUsername)
      .then(({ total }) => this.githubTotal.set(total))
      .catch(() => this.githubTotal.set(null));

    this.github
      .getRecentRepos(this.githubUsername, 3)
      .then((repos) => this.recentRepos.set(repos))
      .catch(() => this.recentReposError.set(true))
      .finally(() => this.recentReposLoading.set(false));
  }

  protected toggleCourses(): void {
    this.showAllCourses.set(!this.showAllCourses());
  }

  protected relativePush(dateStr: string): string {
    const diffMs = new Date(dateStr).getTime() - Date.now();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'hoy';
    if (Math.abs(diffDays) < 30) return RELATIVE_TIME.format(diffDays, 'day');

    const diffMonths = Math.round(diffDays / 30);
    return RELATIVE_TIME.format(diffMonths, 'month');
  }

  protected logoFor(repo: GithubRepo): string {
    return (
      this.knownRepoLogos[repo.name] ??
      `https://opengraph.githubassets.com/1/${this.githubUsername}/${repo.name}`
    );
  }
}
