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

export interface GithubRepo {
  name: string;
  description: string | null;
  url: string;
  pushedAt: string;
  language: string | null;
}

interface GithubRepoApiResponse {
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
  language: string | null;
  fork: boolean;
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

  async getRecentRepos(username: string, limit = 3): Promise<GithubRepo[]> {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=pushed&per_page=10`,
    );

    if (!response.ok) {
      throw new Error(`No se pudo obtener los repositorios de GitHub (${response.status})`);
    }

    const repos = (await response.json()) as GithubRepoApiResponse[];

    return repos
      .filter((repo) => !repo.fork && repo.name.toLowerCase() !== username.toLowerCase())
      .slice(0, limit)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        pushedAt: repo.pushed_at,
        language: repo.language,
      }));
  }
}
