interface LastFmImage {
  size: 'small' | 'medium' | 'large' | 'extralarge';
  '#text': string;
}

interface LastFmArtist {
  mbid: string;
  '#text': string;
}

interface LastFmAlbum {
  mbid: string;
  '#text': string;
}

interface LastFmTrackAttr {
  nowplaying: 'true';
}

interface LastFmTrack {
  artist: LastFmArtist;
  streamable: string;
  image: LastFmImage[];
  mbid: string;
  album: LastFmAlbum;
  name: string;
  url: string;
  '@attr'?: LastFmTrackAttr;
  date?: {
    uts: string;
    '#text': string;
  };
}

interface LastFmRecentTracksAttr {
  user: string;
  totalPages: string;
  page: string;
  perPage: string;
  total: string;
}

export interface RecentTracksResponseModel {
  recenttracks: {
    track: LastFmTrack[];
    '@attr': LastFmRecentTracksAttr;
  };
}
