export interface NowPlayingResponse {
  name: string;
  artist: string;
  imageUrl: string;
  thumbnailUrl: string;
  album: string;
  nowPlaying: boolean;
  scrobbledSongs: string;
  playedDate?: string;
  songUrl: string;
}
