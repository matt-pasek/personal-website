import { RecentTracksResponseModel } from '@/app/api/now-playing/recentTracksResponse.model';
import { NextResponse } from 'next/server';
import { NowPlayingResponse } from '@/types/now-playing';

export const dynamic = 'force-dynamic';

const LASTFM_USER_NAME = 'matt_ugh';

const fallbackNowPlaying: NowPlayingResponse = {
  name: 'Track title',
  artist: 'Artist',
  imageUrl: '',
  thumbnailUrl: '',
  album: '',
  nowPlaying: false,
  scrobbledSongs: '',
  songUrl: '',
};

function noStoreJson(response: NowPlayingResponse): NextResponse<NowPlayingResponse> {
  return NextResponse.json(response, { headers: { 'Cache-Control': 'no-store' } });
}

export async function GET(): Promise<NextResponse<NowPlayingResponse>> {
  const apiKey = process.env.LASTFM_API_KEY;

  if (!apiKey) {
    return noStoreJson(fallbackNowPlaying);
  }

  const todayMidnightUnix = Math.floor(new Date(new Date().toISOString().split('T')[0]).getTime() / 1000);

  const [recentTracks, todayTracks] = await Promise.all([
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER_NAME}&api_key=${apiKey}&format=json&limit=1`,
      { cache: 'no-store' },
    ),
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER_NAME}&api_key=${apiKey}&format=json&limit=1&from=${todayMidnightUnix}`,
      { cache: 'no-store' },
    ),
  ]);

  if (!recentTracks.ok) {
    return noStoreJson(fallbackNowPlaying);
  }

  const { recenttracks }: RecentTracksResponseModel = await recentTracks.json();
  const track = recenttracks.track?.[0];

  if (!track) {
    return noStoreJson(fallbackNowPlaying);
  }

  let listeningTimeText: string | undefined;
  if (todayTracks.ok) {
    const todayData: RecentTracksResponseModel = await todayTracks.json();
    const count = parseInt(todayData.recenttracks['@attr'].total, 10) || 0;
    const totalMins = Math.round(count * 3.5);
    const hrs = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    listeningTimeText = hrs > 0 ? `${hrs} hrs ${mins} mins` : `${mins} mins`;
  }

  const imageUrls = track.image.map((img) => img['#text']).filter(Boolean);

  return noStoreJson({
    name: track.name,
    artist: track.artist['#text'],
    imageUrl: imageUrls.find((url) => url.includes('174s')) ?? imageUrls.at(-1) ?? '',
    thumbnailUrl: imageUrls.find((url) => url.includes('300x300')) ?? imageUrls.at(-1) ?? '',
    album: track.album['#text'],
    nowPlaying: track['@attr']?.nowplaying === 'true',
    scrobbledSongs: recenttracks['@attr'].total,
    playedDate: track.date?.['#text'],
    songUrl: track.url,
    listeningTimeText,
  });
}
