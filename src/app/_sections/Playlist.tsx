"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import MusicPlayer from "@/components/MusicPlayer";
import { useEffect, useRef } from "react";
import { usePlaylist } from "@/lib/context";

gsap.registerPlugin(ScrollTrigger);

const Playlist = () => {
  const { state, dispatch } = usePlaylist();
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const disclaimerTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".disclaimer",
        start: "top center",
        end: "bottom center",
      },
    });

    disclaimerTl
      .fromTo(
        ".disclaimer-text",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.inOut",
        }
      )
      .fromTo(
        ".music-player",
        {
          opacity: 0,
        },
        { opacity: 1, duration: 1.2, ease: "power2.inOut" }
      );
  }, []);

  const playAnimRef = useRef<gsap.core.Tween>(null);

  useGSAP(() => {
    playAnimRef.current = gsap.to(".vid-bg", {
      opacity: 1,
      duration: 1.2,
      ease: "power2.inOut",
      delay: 0.7,
      paused: true,
    });
  }, []);

  useEffect(() => {
    if (state.seeked && state.isPlaying) {
      dispatch({ type: "reset" });
      playAnimRef.current?.restart(true);
    } else if (state.isPlaying) {
      bgVideoRef.current?.play().then(() => playAnimRef.current?.play());
    } else {
      playAnimRef.current?.reverse().then(() => bgVideoRef.current?.pause());
    }
  }, [state.isPlaying, state.seeked, dispatch]);

  return (
    <section
      id='playlist'
      className='disclaimer md:h-auto lg:h-screen h-screen w-screen bg-primary bg-[url("/images/noise.png")] size-full text-accent-foreground z-20 relative'
    >
      <div className='w-full h-full absolute -z-10 brightness-[0.35] vid-bg opacity-0 mask-y-from-75% mask-y-to-90% lg:mask-x-from-75% lg:mask-x-to-90% lg:mask-y-from-100% lg:mask-y-to-100% '>
        <video
          src={state.playlist[state.currentIndex].video}
          muted
          loop
          autoPlay
          ref={bgVideoRef}
          className='w-full h-full object-cover inset-0'
          playsInline
        />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] mix-blend-overlay pointer-events-none" />
      </div>
      <div className='h-full w-full rounded-2xl flex items-center flex-col z-30 overflow-hidden'>
        <div className='disclaimer-text border-accent text-center xl:max-w-[50%] md:max-w-[80%] flex flex-col lg:items-center gap-5 p-6 lg:p-16'>
          <p className='xl:text-7xl md:text-6xl text-5xl uppercase font-black text-accent text-shadow-lg'>
            Disclaimer!
          </p>
          <p className='md:text-lg text-[1rem] font-semibold text-left'>
            The samples I used have{" "}
            <span className='text-2xl font-extrabold'>NOT</span> been cleared. I
            am not looking to sell these beats; it is strictly for promotional
            purposes and to showcase my favorite hobby. If you like what you
            hear and want to work with me, I&apos;d be happy to connect. My
            email is <span>elliotchannah@outlook.com.</span>
          </p>
        </div>
        <div className='music-player flex flex-col items-center my-16 lg:my-4'>
          <MusicPlayer />
          <p className='text-sm text-center my-8'>
            Click on the <span className='font-bold'>title</span> to flip the
            player to view my other beats.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Playlist;
