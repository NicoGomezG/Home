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
