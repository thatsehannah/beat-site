"use client";

import { ChangeEvent, Dispatch, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { FastForward, Pause, Play, Rewind } from "lucide-react";
import { Track } from "@/lib/types";
import { Action, State } from "@/lib/reducer";
import gsap from "gsap";

//TODO: Note to self: figure out if i need to move the current track state logic out of playlist component and move it here so changing the track via the playlist can be done here. (think that makes sense, but need to think more)

type MusicPlayerProps = {
  track: Track;
  playlistLength: number;
  state: State;
  dispatch: Dispatch<Action>;
};

const MusicPlayer = ({
  track,
  playlistLength,
  state,
  dispatch,
}: MusicPlayerProps) => {
  const { src, title } = track;

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const formatDuration = (input: number) => {
    const minutes = Math.floor(input / 60);
    const seconds = Math.floor(input % 60);

    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekedTime = parseInt(e.target.value);
      audioRef.current.currentTime = seekedTime;
      setCurrentTime(seekedTime);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleNextTrack = () => {
    dispatch({ type: "nextTrack", payload: { playlistLength } });
  };

  const handlePrevTrack = () => {
    dispatch({ type: "prevTrack" });
  };

  const handlePlayPause = () => {
    if (state.isPlaying) {
      dispatch({ type: "pause" });
      audioRef.current?.pause();
    } else {
      dispatch({ type: "play" });
      audioRef.current?.play();
    }
  };

  const toggleFlip = () => {
    setShowPlaylist((prevState) => !prevState);

    gsap.to(".player-card", {
      rotateY: showPlaylist ? 0 : 180,
      ease: "power2.inOut",
      duration: 0.4,
    });
  };

  //This useEffect will listen for 'timeupdate' events
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  // If a new track loads and "isPlaying" is still true, start it automatically
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      if (state.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [track, state.isPlaying]);

  //this useEffect
  useEffect(() => {
    if (currentTime === duration) {
      dispatch({ type: "pause" });
    }
  }, [currentTime, duration, dispatch]);

  return (
    <div
      className={`relative bg-background w-96 h-48 rounded-xl text-foreground shadow-2xl ${
        state.isPlaying ? "shadow-none" : "shadow-white"
      } ease-in-out duration-700 player-card perspective-distant transform-3d`}
    >
      {/* front of music player */}
      <div className='absolute w-full h-full backface-hidden p-4'>
        <p
          className='font-semibold mb-4 hover:cursor-pointer'
          onClick={toggleFlip}
        >
          {title}
        </p>
        <input
          type='range'
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className='w-full h-[5px] accent-accent'
        />
        <audio
          ref={audioRef}
          src={src}
          preload='metadata'
        />
        <div className='flex items-center justify-between mt-2 text-sm'>
          <p>{formatDuration(currentTime)}</p>
          <p>{formatDuration(duration || 0)}</p>
        </div>
        <div className='flex items-center justify-around mt-8'>
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
      {/* back of music player */}
      <div className='bg-amber-200 absolute w-full h-full backface-hidden rotate-y-180'>
        <p onClick={toggleFlip}>
          Back of card that will show a list of all of the beats available to
          play
        </p>
      </div>
    </div>
  );
};

export default MusicPlayer;
