"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import MusicPlayer from "@/components/MusicPlayer";
import { useEffect, useRef, useState } from "react";
import { usePlaylist } from "@/lib/context";
import { getAllTracks } from "@/lib/playlistService";

gsap.registerPlugin(ScrollTrigger);

const Playlist = () => {
  const { state, dispatch } = usePlaylist();
  const [loading, setLoading] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
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

  //fetching the tracks from firestore
  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);

      try {
        const response = await getAllTracks();

        console.log("setting playlist...");
        dispatch({ type: "setPlaylist", payload: { playlist: response } });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchTracks();
  }, [dispatch]);

  useEffect(() => {
    const bgVideo = bgVideoRef.current;
    if (!bgVideo) {
      return;
    }

    const handleVideoReady = () => {
      setIsVideoReady(true);
    };

    bgVideo.addEventListener("canplaythrough", handleVideoReady);

    return () => {
      bgVideo.addEventListener("canplaythrough", handleVideoReady);
    };
  }, [state.playlist, state.currentIndex]);

  //controlling how the video animation starts and stops
  useEffect(() => {
    if (!isVideoReady) {
      return;
    }

    if (state.seeked && state.isPlaying) {
      dispatch({ type: "reset" });
      playAnimRef.current?.restart(true); //play animation when song changes
    } else if (state.isPlaying) {
      bgVideoRef.current?.play().then(() => playAnimRef.current?.play()); //when playing, play video first, then run animation
    } else {
      playAnimRef.current?.reverse().then(() => bgVideoRef.current?.pause()); //when pausing, reverse the animation, then pause the video
    }
  }, [state.isPlaying, state.seeked, dispatch, isVideoReady]);

  // if (loading) {
  //   return <p>Loading media...</p>;
  // }

  return (
    <section
      id='playlist'
      className='disclaimer md:h-auto lg:h-screen h-screen w-screen bg-primary bg-[url("/images/noise.png")] size-full text-accent-foreground z-20 relative'
    >
      <div className='w-full h-full absolute -z-10 brightness-[0.35] vid-bg opacity-0 mask-y-from-75% mask-y-to-90% lg:mask-x-from-75% lg:mask-x-to-90% lg:mask-y-from-100% lg:mask-y-to-100% '>
        <video
          src={state.playlist[state.currentIndex]?.video}
          muted
          loop
          autoPlay
          ref={bgVideoRef}
          className='w-full h-full object-cover inset-0'
          preload='metadata'
        />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] mix-blend-overlay pointer-events-none" />
      </div>
      <div className='h-full w-full rounded-2xl flex items-center flex-col z-30 overflow-hidden'>
        <div className='disclaimer-text border-accent text-center xl:max-w-[50%] md:max-w-[80%] flex flex-col lg:items-center gap-5 p-6 lg:p-16'>
          <p className='xl:text-7xl md:text-6xl text-5xl uppercase font-black text-accent text-shadow-lg'>
            Disclaimer!
          </p>
          <p className='md:text-lg text-[1rem] font-semibold text-left'>
            The beats showcased here contain samples that have not been cleared.
            These beats are shared for promotional and personal portfolio
            purposes only and are not intended for sale, distribution, or
            commerical use. If you enjoy the work and are interested in
            collaborating (or would like for me to remove a beat from this
            site), feel free to reach out{" "}
            <a href='mailto:elliotchannah@outlook.com'>
              elliotchannah@outlook.com
            </a>
          </p>
        </div>
        <div className='music-player flex flex-col items-center my-16 lg:my-4'>
          {loading ? <p>Loading media...</p> : <MusicPlayer />}
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
