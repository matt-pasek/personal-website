export type GithubHeatmapLevel = 0 | 1 | 2 | 3 | 4;

export type GithubStatsResponse = {
  memberSince: string;
  publicRepos: string;
  totalCommits: string;
  thisYear: string;
  topLanguage: string;
  longestStreak: string;
  heatmap: GithubHeatmapLevel[];
  mostActive: string;
  abandonedRepos: string;
};
