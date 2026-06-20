import { NextResponse } from 'next/server';
import { NowCodingResponse } from '@/types/now-coding';

type WakaTimeSummary = {
  projects?: { name?: string | null }[];
  languages?: { name?: string | null }[];
  editors?: { name?: string | null }[];
  grand_total?: {
    text?: string | null;
    total_seconds?: number | null;
  } | null;
};

type WakaTimeSummaryResponse = {
  data?: WakaTimeSummary[];
};

const fallbackNowCoding: NowCodingResponse = {
  topProject: null,
  topLanguage: null,
  topEditor: null,
  totalText: '0 mins',
  totalSeconds: 0,
};

function noStoreJson(response: NowCodingResponse): NextResponse<NowCodingResponse> {
  return NextResponse.json(response, { headers: { 'Cache-Control': 'no-store' } });
}

export async function GET(): Promise<NextResponse<NowCodingResponse>> {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    return noStoreJson(fallbackNowCoding);
  }

  const res = await fetch(`https://wakatime.com/api/v1/users/current/summaries?range=today&api_key=${apiKey}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return noStoreJson(fallbackNowCoding);
  }

  const raw = (await res.json()) as WakaTimeSummaryResponse;
  const data = raw.data?.[0];

  return noStoreJson({
    topProject: data?.projects?.[0]?.name ?? null,
    topLanguage: data?.languages?.[0]?.name ?? null,
    topEditor: data?.editors?.[0]?.name ?? null,
    totalText: data?.grand_total?.text ?? fallbackNowCoding.totalText,
    totalSeconds: data?.grand_total?.total_seconds ?? fallbackNowCoding.totalSeconds,
  });
}
