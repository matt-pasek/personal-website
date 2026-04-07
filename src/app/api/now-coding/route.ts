import { NextResponse } from 'next/server';
import { NowCodingResponse } from '@/types/now-coding';

export async function GET(): Promise<NextResponse<NowCodingResponse>> {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    throw new Error('WAKATIME_API_KEY not configured');
  }

  const res = await fetch(`https://wakatime.com/api/v1/users/current/summaries?range=today&api_key=${apiKey}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`WakaTime API error: ${res.status}`);
  }

  const raw = await res.json();
  const data = raw.data?.[0];

  return NextResponse.json(
    {
      topProject: data?.projects?.[0]?.name ?? null,
      topLanguage: data?.languages?.[0]?.name ?? null,
      topEditor: data?.editors?.[0]?.name ?? null,
      totalText: data?.grand_total?.text ?? '0 mins',
      totalSeconds: data?.grand_total?.total_seconds ?? 0,
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
