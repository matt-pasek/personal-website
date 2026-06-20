import { NowCodingResponse } from '@/types/now-coding';

type WakaTimeEntity = {
  name?: string | null;
};

export type WakaTimeSummary = {
  range?: {
    date?: string | null;
  } | null;
  projects?: WakaTimeEntity[];
  languages?: WakaTimeEntity[];
  editors?: WakaTimeEntity[];
  grand_total?: {
    text?: string | null;
    total_seconds?: number | null;
  } | null;
};

export type WakaTimeSummaryResponse = {
  data?: WakaTimeSummary[];
};

export const fallbackNowCoding: NowCodingResponse = {
  topProject: null,
  topLanguage: null,
  topEditor: null,
  totalText: '0 mins',
  totalSeconds: 0,
  dailyTotals: [],
};

export function buildNowCodingResponse(raw: WakaTimeSummaryResponse): NowCodingResponse {
  const summaries = raw.data ?? [];
  const latestSummary = summaries.at(-1);

  return {
    topProject: latestSummary?.projects?.[0]?.name ?? null,
    topLanguage: latestSummary?.languages?.[0]?.name ?? null,
    topEditor: latestSummary?.editors?.[0]?.name ?? null,
    totalText: latestSummary?.grand_total?.text ?? fallbackNowCoding.totalText,
    totalSeconds: latestSummary?.grand_total?.total_seconds ?? fallbackNowCoding.totalSeconds,
    dailyTotals: summaries
      .map((summary) => ({
        date: summary.range?.date ?? null,
        totalSeconds: summary.grand_total?.total_seconds ?? 0,
      }))
      .filter((summary): summary is { date: string; totalSeconds: number } => summary.date !== null),
  };
}
