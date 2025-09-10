export type Track = {
  id?: string;
  src: string;
  title: string;
  video: string;
  sampleCredit: {
    spotifyUrl: string;
    title: string;
    artist: string;
    albumCoverUrl: string;
  };
};
