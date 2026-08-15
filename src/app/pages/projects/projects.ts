import { Component, inject, signal } from '@angular/core';
import { ProjectsService } from '../../core/services/projects.service';
import { Project } from '../../core/models/project.model';
import { ProjectCard } from '../../shared/project-card/project-card';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard],
  templateUrl: './projects.html',
})
export class Projects {
  private readonly projectsService = inject(ProjectsService);

  protected readonly projects = signal<Project[]>([]);
  protected readonly loading = signal(true);

  constructor() {
    this.projectsService.getProjects().then((projects) => {
      this.projects.set(projects);
      this.loading.set(false);
    });
  }
}
