export interface NowCodingResponse {
  topProject: string | null;
  topLanguage: string | null;
  topEditor: string | null;
  totalText: string;
  totalSeconds: number;
  dailyTotals: NowCodingDailyTotal[];
}

export interface NowCodingDailyTotal {
  date: string;
  totalSeconds: number;
}
