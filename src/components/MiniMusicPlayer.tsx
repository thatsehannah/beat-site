"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FastForward, Pause, Play, Rewind } from "lucide-react";
import { usePlaylist } from "@/lib/context";

gsap.registerPlugin(ScrollToPlugin);

const MiniMusicPlayer = () => {
  const { state, dispatch } = usePlaylist();

  const [isVisible, setIsVisible] = useState(false);

  const handlePlayPause = () => {
    if (state.isPlaying) {
      dispatch({ type: "pause" });
    } else {
      dispatch({ type: "play" });
    }
  };

  const handleNextTrack = () => {
    dispatch({ type: "nextTrack", payload: { playlist: state.playlist } });
  };

  const handlePrevTrack = () => {
    dispatch({ type: "prevTrack", payload: { playlist: state.playlist } });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 800 && state.isPlaying) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div
      className={`rounded-full lg:p-4 p-3 bg-primary/50 bg-[url("/images/noise.png")] fixed right-0 top-5 z-50 lg:w-72 w-56 shadow-2xl ${
        isVisible ? "opacity-100 right-6" : "opacity-0 -right-6"
      } transition-all ease-in-out duration-500`}
    >
      <div className='flex items-center justify-around'>
        <Button
          className='text-accent-foreground bg-accent'
          onClick={handlePrevTrack}
        >
          <Rewind />
        </Button>
        <Button
          className='text-accent-foreground bg-accent'
          onClick={handlePlayPause}
        >
          {state.isPlaying ? <Pause /> : <Play />}
        </Button>
        <Button
          className='text-accent-foreground bg-accent'
          onClick={handleNextTrack}
        >
          <FastForward />
        </Button>
      </div>
    </div>
  );
};

export default MiniMusicPlayer;
