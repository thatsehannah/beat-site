export type Track = {
  id?: string;
  src: string;
  title: string;
  video: string;
  sampleSpotifyId: string;
};

export type SpotifyTrack = {
  artist: string;
  albumCoverUrl: string;
  trackUri: string;
  name: string;
};
