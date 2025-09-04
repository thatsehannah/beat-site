"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import MusicPlayer from "@/components/MusicPlayer";
import { mockPlaylist } from "@/lib/mockPlaylist";
import { useEffect, useReducer, useState } from "react";
import { Track } from "@/lib/types";
import { musicPlayerReducer, type State } from "@/lib/reducer";

gsap.registerPlugin(ScrollTrigger);

const initialState: State = { isPlaying: false };

const Playlist = () => {
  const playlist = mockPlaylist;

  const [state, dispatch] = useReducer(musicPlayerReducer, initialState);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<Track>(playlist[0]);

  const handleNextTrack = () => {
    setCurrentTrackIndex((curr) =>
      curr + 1 <= playlist.length - 1 ? curr + 1 : 0
    );
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((curr) => (curr - 1 > 0 ? curr - 1 : 0));
  };

  const handlePlay = () => {
    dispatch({ type: "play" });
  };

  const handlePause = () => {
    dispatch({ type: "pause" });
  };

  useGSAP(() => {
    const disclaimerTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".disclaimer",
        start: "top center",
        end: "bottom center",
      },
    });

    disclaimerTl.fromTo(
      ".disclaimer-text",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.inOut",
      }
    );
  }, []);

  useEffect(() => {
    setCurrentTrack(playlist[currentTrackIndex]);
  }, [currentTrackIndex, playlist]);

  useGSAP(() => {
    const bgPlayAnimation = gsap.to(".vid-bg", {
      opacity: 1,
      duration: 1.2,
      ease: "power2.inOut",
      paused: true,
    });

    const bgPauseAnimation = gsap.to(".vid-bg", {
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut",
      paused: true,
    });

    if (state.isPlaying) {
      bgPlayAnimation.play();
    } else {
      bgPauseAnimation.play();
    }
  }, [state.isPlaying]);

  return (
    <section className='disclaimer h-screen w-screen bg-primary bg-[url("/images/noise.png")] p-4 size-full text-accent-foreground z-20'>
      <div className='h-full w-full border-background rounded-2xl border-2 flex items-center flex-col z-30 relative overflow-hidden'>
        <div className='w-full h-full absolute -z-10 brightness-[0.25] vid-bg'>
          <video
            src={playlist[currentTrackIndex].video}
            muted
            loop
            autoPlay
            className='w-full h-full object-fill'
          />
        </div>
        <div className='disclaimer-text border-accent text-center max-w-[50%] flex flex-col items-center gap-5'>
          <p className='text-7xl uppercase font-black text-accent'>
            Disclaimer!
          </p>
          <p className='text-lg font-semibold'>
            The samples I used have{" "}
            <span className='text-2xl font-extrabold'>NOT</span> been cleared. I
            am not looking to sell these beats; it is strictly for promotional
            purposes and to showcase my favorite hobby. If you like what you
            hear and want to work with me, I&apos;d be happy to connect. My
            email is <span>elliotchannah@outlook.com</span>
          </p>
        </div>
        <div className='my-auto mx-auto'>
          <MusicPlayer
            track={currentTrack}
            state={state}
            onPlay={handlePlay}
            onPause={handlePause}
            onNextTrack={handleNextTrack}
            onPrevTrack={handlePrevTrack}
          />
        </div>
      </div>
    </section>
  );
};

export default Playlist;
