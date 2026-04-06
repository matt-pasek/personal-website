import { RecentTracksResponseModel } from '@/app/api/now-playing/recentTracksResponse.model';
import { NextResponse } from 'next/server';
import { NowPlayingResponse } from '@/types/now-playing';

export async function GET(): Promise<NextResponse<NowPlayingResponse>> {
  const USER_NAME = 'matt_ugh';

  const recentTracks = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USER_NAME}&api_key=${process.env.LASTFM_API_KEY}&format=json&limit=1`,
  );
  const { recenttracks }: RecentTracksResponseModel = await recentTracks.json();
  const track = recenttracks.track[0];

  return NextResponse.json({
    name: track.name,
    artist: track.artist['#text'],
    imageUrl:
      track.image.map((img) => img['#text']).find((url) => url.includes('174s')) ??
      track.image[track.image.length - 1]['#text'],
    thumbnailUrl:
      track.image.map((img) => img['#text']).find((url) => url.includes('300x300')) ??
      track.image[track.image.length - 1]['#text'],
    album: track.album['#text'],
    nowPlaying: track['@attr']?.nowplaying === 'true',
    scrobbledSongs: recenttracks['@attr'].total,
    playedDate: track.date?.['#text'],
    songUrl: track.url,
  });
}

export const revalidate = 60;
