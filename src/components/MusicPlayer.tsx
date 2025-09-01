"use client";

import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";
import { FastForward, Pause, Play, Rewind } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [background, setBackground] = useState("bg-primary");

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

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current?.pause();
    } else {
      setIsPlaying(true);
      audioRef.current?.play();
    }
  };

  //This useEffect will listen for 'timeupdate' events
  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", handleTimeUpdate);

    return () =>
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <div className='bg-background p-4 w-80 rounded-xl text-foreground'>
      <p className='font-semibold mb-4'>Not Ready</p>
      <input
        type='range'
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleSeek}
        className='w-full h-[5px] accent-accent'
      />
      <audio
        ref={audioRef}
        src='/audio/not-ready copy.mp3'
      />
      <div className='flex items-center justify-between mt-2 text-sm'>
        <p>{formatDuration(currentTime)}</p>
        <p>{formatDuration(duration)}</p>
      </div>
      <div className='flex items-center justify-around mt-8'>
        <Button className='text-accent-foreground bg-accent'>
          <Rewind />
        </Button>
        <Button
          className='text-accent-foreground bg-accent'
          onClick={handlePlayPause}
        >
          {isPlaying ? <Pause /> : <Play />}
        </Button>
        <Button className='text-accent-foreground bg-accent'>
          <FastForward />
        </Button>
      </div>
    </div>
  );
};

export default MusicPlayer;
