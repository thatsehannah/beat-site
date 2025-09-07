import { Track } from "./types";

export const mockPlaylist: Track[] = [
  {
    title: "Not Ready",
    src: "/audio/not-ready.mp3",
    video: "/videos/video3.mp4",
    sampleCredit: {
      title: "I'm Not Ready",
      artist: "Keith Sweat",
      spotifyUrl:
        "https://open.spotify.com/track/5n68p2dbjYnXNP9A2nLzbj?si=d83aec2ab8ea451c",
      albumCoverUrl: "/images/album-covers/keith-sweat.jpg",
    },
  },
  {
    title: "Outta My Mind",
    src: "/audio/outta my mind.mp3",
    video: "/videos/video2.mp4",
    sampleCredit: {
      title: "Poison",
      artist: "Bell Biv DeVoe",
      spotifyUrl:
        "https://open.spotify.com/track/6m59VvDUi0UQsB2eZ9wVbH?si=98fbfdc2f4584b58",
      albumCoverUrl: "/images/album-covers/bbd.jpg",
    },
  },
  {
    title: "Thank God",
    src: "/audio/thank god.mp3",
    video: "/videos/video1.mp4",
    sampleCredit: {
      title: "Thank You For My Mansion",
      artist: "Mississippi Mass Choir",
      spotifyUrl:
        "https://open.spotify.com/track/4ex5xkXqDeVdCOiKwMK80f?si=085e49c5e3414773",
      albumCoverUrl: "/images/album-covers/thank-you-for-my-mansion.jpg",
    },
  },
];
