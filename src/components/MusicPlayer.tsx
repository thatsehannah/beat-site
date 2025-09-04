"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { FastForward, Pause, Play, Rewind } from "lucide-react";
import { Track } from "@/lib/types";
import { State } from "@/lib/reducer";

type MusicPlayerProps = {
  track: Track;
  state: State;
  onPlay: () => void;
  onPause: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
};

const MusicPlayer = ({
  track,
  state,
  onPlay,
  onPause,
  onNextTrack,
  onPrevTrack,
}: MusicPlayerProps) => {
  const { src, title } = track;

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
    onPause();
    onNextTrack();
  };

  const handlePrevTrack = () => {
    onPause();
    onPrevTrack();
  };

  const handlePlayPause = () => {
    if (state.isPlaying) {
      onPause();
      audioRef.current?.pause();
    } else {
      onPlay();
      audioRef.current?.play();
    }
  };

  //This useEffect will listen for 'timeupdate' & 'loadedmetadata' events
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  return (
    <div className='bg-background p-4 w-80 rounded-xl text-foreground'>
      <p className='font-semibold mb-4'>{title}</p>
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
  );
};

export default MusicPlayer;
