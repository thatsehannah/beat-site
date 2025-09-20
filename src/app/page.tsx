"use client";

import Hero from "@/app/_sections/Hero";
import Playlist from "@/app/_sections/Playlist";
import Footer from "@/components/Footer";
import MiniMusicPlayer from "@/components/MiniMusicPlayer";
import { PlaylistProvider } from "@/lib/context";

export default function Home() {
  return (
    <PlaylistProvider>
      <main>
        <Hero />
        <Playlist />
        <MiniMusicPlayer />
        <Footer />
      </main>
    </PlaylistProvider>
  );
}
