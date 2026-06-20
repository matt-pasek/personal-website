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
