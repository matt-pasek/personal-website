import { NextResponse } from 'next/server';
import type { ContributionDay, GithubRepo, GithubUser, YearlyContributions } from '@/app/api/github-stats/githubStats';
import { resolveGithubStats } from '@/app/api/github-stats/githubStats';
import type { GithubStatsResponse } from '@/types/github-stats';

const GITHUB_USERNAME = 'matt-pasek';

export const revalidate = 3600;

function githubHeaders(token?: string) {
  return {
    Accept: 'application/vnd.github+json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function fetchGithubJson<T>(url: string, token?: string): Promise<T> {
  const res = await fetch(url, {
    headers: githubHeaders(token),
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`GitHub REST API error: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

async function fetchContributionYears(token: string): Promise<number[]> {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query ContributionYears($login: String!) {
          user(login: $login) {
            contributionsCollection {
              contributionYears
            }
          }
        }
      `,
      variables: { login: GITHUB_USERNAME },
    }),
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL API error: ${res.status}`);
  }

  const raw = (await res.json()) as {
    data?: { user?: { contributionsCollection?: { contributionYears?: number[] } } };
  };

  return raw.data?.user?.contributionsCollection?.contributionYears ?? [];
}

async function fetchYearlyContributions(token: string, year: number): Promise<YearlyContributions> {
  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query YearlyContributions($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `,
      variables: { login: GITHUB_USERNAME, from, to },
    }),
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL API error: ${res.status}`);
  }

  const raw = (await res.json()) as {
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: {
            totalContributions?: number;
            weeks?: { contributionDays?: ContributionDay[] }[];
          };
        };
      };
    };
  };
  const collection = raw.data?.user?.contributionsCollection;

  return {
    year,
    totalContributions: collection?.contributionCalendar?.totalContributions ?? null,
    days: collection?.contributionCalendar?.weeks?.flatMap((week) => week.contributionDays ?? []) ?? [],
  };
}

async function fetchAllYearlyContributions(token?: string): Promise<YearlyContributions[]> {
  if (!token) return [];

  const years = await fetchContributionYears(token);
  return Promise.all(years.map((year) => fetchYearlyContributions(token, year)));
}

export async function GET(): Promise<NextResponse<GithubStatsResponse>> {
  const token = process.env.GITHUB_TOKEN;

  try {
    const [user, repos, yearlyContributions] = await Promise.all([
      fetchGithubJson<GithubUser>(`https://api.github.com/users/${GITHUB_USERNAME}`, token),
      fetchGithubJson<GithubRepo[]>(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
        token,
      ),
      fetchAllYearlyContributions(token),
    ]);

    return NextResponse.json(resolveGithubStats({ user, repos, yearlyContributions }));
  } catch (error) {
    console.error(error);
    return NextResponse.json(resolveGithubStats({}));
  }
}
