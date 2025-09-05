"use client";

import Hero from "@/app/_sections/Hero";
import Playlist from "@/app/_sections/Playlist";
import MiniMusicPlayer from "@/components/MiniMusicPlayer";
import { mockPlaylist } from "@/lib/mockPlaylist";
import { musicPlayerReducer, State } from "@/lib/reducer";
import { useReducer } from "react";

const initialState: State = {
  isPlaying: false,
  seeked: false,
  currentIndex: 0,
};

export default function Home() {
  const [state, dispatch] = useReducer(musicPlayerReducer, initialState);
  const playlist = mockPlaylist;

  return (
    <main>
      <Hero />
      <Playlist
        playlist={playlist}
        state={state}
        dispatch={dispatch}
      />
      <MiniMusicPlayer
        playlistLength={playlist.length}
        state={state}
        dispatch={dispatch}
      />
    </main>
  );
}
