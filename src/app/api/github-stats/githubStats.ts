import { GithubHeatmapLevel, GithubStatsResponse } from '@/types/github-stats';

export const GITHUB_STATS_FALLBACK = '———';

export type GithubUser = {
  created_at?: string | null;
  public_repos?: number | null;
};

export type GithubRepo = {
  archived?: boolean | null;
  fork?: boolean | null;
  language?: string | null;
  pushed_at?: string | null;
};

export type ContributionDay = {
  date: string;
  contributionCount: number;
};

export type YearlyContributions = {
  year: number;
  totalContributions?: number | null;
  days?: ContributionDay[] | null;
};

export type RecentContributions = {
  totalCommitContributions?: number | null;
  days?: ContributionDay[] | null;
};

type ResolveGithubStatsInput = {
  user?: GithubUser | null;
  repos?: GithubRepo[] | null;
  yearlyContributions?: YearlyContributions[] | null;
  recentContributions?: RecentContributions | null;
};

function resolveNumber(value: number | null | undefined) {
  return typeof value === 'number' && Number.isFinite(value) ? value.toLocaleString('en-US') : GITHUB_STATS_FALLBACK;
}

function resolveYear(date: string | null | undefined) {
  if (!date) return GITHUB_STATS_FALLBACK;

  const year = new Date(date).getUTCFullYear();
  return Number.isFinite(year) ? year.toString() : GITHUB_STATS_FALLBACK;
}

function resolveTopLanguage(repos: GithubRepo[]) {
  const languageCounts = repos.reduce<Record<string, number>>((acc, repo) => {
    if (repo.fork || !repo.language) return acc;

    acc[repo.language] = (acc[repo.language] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(languageCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ?? GITHUB_STATS_FALLBACK;
}

function resolveLongestStreak(years: YearlyContributions[]) {
  const days = years.flatMap((year) => year.days ?? []).sort((a, b) => a.date.localeCompare(b.date));

  let current = 0;
  let longest = 0;

  for (const day of days) {
    if (day.contributionCount > 0) {
      current += 1;
      longest = Math.max(longest, current);
    } else {
      current = 0;
    }
  }

  return longest > 0 ? `${longest.toLocaleString('en-US')} days` : GITHUB_STATS_FALLBACK;
}

function resolveHeatmap(days: ContributionDay[]): GithubHeatmapLevel[] {
  return days.map((day) => {
    const count = day.contributionCount;

    if (count <= 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 9) return 3;
    return 4;
  });
}

export function resolveGithubStats({
  user,
  repos,
  yearlyContributions,
  recentContributions,
}: ResolveGithubStatsInput): GithubStatsResponse {
  const safeRepos = repos ?? [];
  const safeYearlyContributions = yearlyContributions ?? [];
  const safeRecentDays = recentContributions?.days ?? [];
  const currentYear = new Date().getUTCFullYear();
  const thisYearContributions =
    safeYearlyContributions.find((year) => year.year === currentYear)?.totalContributions ?? null;

  return {
    memberSince: resolveYear(user?.created_at),
    publicRepos: resolveNumber(user?.public_repos),
    totalCommits: resolveNumber(recentContributions?.totalCommitContributions),
    thisYear: resolveNumber(thisYearContributions),
    topLanguage: resolveTopLanguage(safeRepos),
    longestStreak: resolveLongestStreak(safeYearlyContributions),
    heatmap: resolveHeatmap(safeRecentDays),
    mostActive: 'late nights',
    abandonedRepos: 'honestly, most',
  };
}
