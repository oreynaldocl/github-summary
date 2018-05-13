export interface Repository {
  repoUrl: string;
  name: string;
  description: string;
  issues: number;
  openIssues: number;
  forks: number;
}

export interface Metadata {
  size: number;
}

export interface RepositoryList {
  metadata: Metadata;
  repositories: Repository[];
}
