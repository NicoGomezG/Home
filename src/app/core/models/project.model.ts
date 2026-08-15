export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  logoUrl?: string;
  liveUrl?: string;
  liveUrlLabel?: string;
  secondaryUrl?: string;
  secondaryUrlLabel?: string;
  repoUrl?: string;
  featured?: boolean;
}

export interface Bot {
  id: string;
  name: string;
  description: string;
  tags: string[];
  requiresAuth: boolean;
  downloadUrl?: string;
  inviteUrl?: string;
}
