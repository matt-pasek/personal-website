import { GithubStatsResponse } from '@/types/github-stats';

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

type ResolveGithubStatsInput = {
  user?: GithubUser | null;
  repos?: GithubRepo[] | null;
  yearlyContributions?: YearlyContributions[] | null;
  now?: Date;
};

const resolveNumber = (value: number | null | undefined) =>
  typeof value === 'number' && Number.isFinite(value) ? value.toLocaleString('en-US') : GITHUB_STATS_FALLBACK;

const resolveYear = (date: string | null | undefined) => {
  if (!date) return GITHUB_STATS_FALLBACK;

  const year = new Date(date).getUTCFullYear();
  return Number.isFinite(year) ? year.toString() : GITHUB_STATS_FALLBACK;
};

const resolveTopLanguage = (repos: GithubRepo[]) => {
  const languageCounts = repos.reduce<Record<string, number>>((acc, repo) => {
    if (repo.fork || !repo.language) return acc;

    acc[repo.language] = (acc[repo.language] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(languageCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ?? GITHUB_STATS_FALLBACK;
};

const resolveLongestStreak = (years: YearlyContributions[]) => {
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
};

const resolveLastYearContributions = (years: YearlyContributions[], now: Date) => {
  const from = new Date(now);
  from.setUTCFullYear(from.getUTCFullYear() - 1);

  const total = years
    .flatMap((year) => year.days ?? [])
    .filter((day) => {
      const date = new Date(`${day.date}T00:00:00Z`);
      return date >= from && date <= now;
    })
    .reduce((sum, day) => sum + day.contributionCount, 0);

  return total > 0 ? total.toLocaleString('en-US') : GITHUB_STATS_FALLBACK;
};

export const resolveGithubStats = ({
  user,
  repos,
  yearlyContributions,
  now = new Date(),
}: ResolveGithubStatsInput): GithubStatsResponse => {
  const safeRepos = repos ?? [];
  const safeYearlyContributions = yearlyContributions ?? [];
  const currentYear = now.getUTCFullYear();
  const thisYearContributions =
    safeYearlyContributions.find((year) => year.year === currentYear)?.totalContributions ?? null;

  return {
    memberSince: resolveYear(user?.created_at),
    publicRepos: resolveNumber(user?.public_repos),
    totalCommits: resolveLastYearContributions(safeYearlyContributions, now),
    thisYear: resolveNumber(thisYearContributions),
    topLanguage: resolveTopLanguage(safeRepos),
    longestStreak: resolveLongestStreak(safeYearlyContributions),
    mostActive: 'late nights',
    abandonedRepos: 'honestly, most',
  };
};
