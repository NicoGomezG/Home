import { Injectable } from '@angular/core';

export interface GithubContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface GithubContributions {
  total: number;
  days: GithubContributionDay[];
}

@Injectable({ providedIn: 'root' })
export class GithubService {
  async getContributions(username: string): Promise<GithubContributions> {
    const response = await fetch(
      `/api/github-contributions?username=${encodeURIComponent(username)}`,
    );

    if (!response.ok) {
      throw new Error(`No se pudo obtener el historial de GitHub (${response.status})`);
    }

    return (await response.json()) as GithubContributions;
  }
}
