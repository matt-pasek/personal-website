import { NextResponse } from 'next/server';
import { NowCodingResponse } from '@/types/now-coding';
import { buildNowCodingResponse, fallbackNowCoding, WakaTimeSummaryResponse } from './nowCoding';

function noStoreJson(response: NowCodingResponse): NextResponse<NowCodingResponse> {
  return NextResponse.json(response, { headers: { 'Cache-Control': 'no-store' } });
}

export async function GET(): Promise<NextResponse<NowCodingResponse>> {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    return noStoreJson(fallbackNowCoding);
  }

  const res = await fetch(`https://wakatime.com/api/v1/users/current/summaries?range=last_7_days&api_key=${apiKey}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return noStoreJson(fallbackNowCoding);
  }

  const raw = (await res.json()) as WakaTimeSummaryResponse;

  return noStoreJson(buildNowCodingResponse(raw));
}
