import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Project } from '../models/project.model';
import { PROJECTS } from '../data/projects.data';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly supabase = inject(SupabaseService);

  async getProjects(): Promise<Project[]> {
    if (!this.supabase.client) {
      return PROJECTS;
    }

    const { data, error } = await this.supabase.client
      .from('projects')
      .select('*')
      .order('featured', { ascending: false });

    if (error || !data || data.length === 0) {
      return PROJECTS;
    }

    return data as Project[];
  }
}
