"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { Button } from "./ui/button";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(() => {
    const maskTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom center",
        scrub: 8,
        pin: true,
      },
    });

    maskTimeLine
      .to(bgVideoRef.current, {
        scale: 1,
        maskSize: "36%",
        maskPosition: "95% 50%",
        duration: 8,
        ease: "power1.inOut",
      })
      .to(".title", {
        opacity: 1,
        duration: 2.2,
        ease: "expo.out",
      })
      .fromTo(
        ".subtitle",
        {
          yPercent: -100,
        },
        {
          opacity: 1,
          yPercent: 0,
          duration: 4,
          ease: "expo.out",
        }
      )
      .to(".call-to-action", {
        opacity: 1,
        ease: "expo.out",
        duration: 4,
      });
  }, []);

  return (
    <div className='w-screen h-screen relative hero'>
      <video
        ref={bgVideoRef}
        src='/videos/hero-bg.mp4'
        autoPlay
        loop
        muted
        className='h-full w-full object-cover z-10 brightness-50 masked-img'
        preload='metadata'
        playsInline
      />
      <div className='z-50 absolute top-[20%] left-36'>
        <p className='title text-6xl font-black opacity-0 uppercase'>
          That's E. Hannah
        </p>
        <p className='subtitle text-center text-xl mt-3 font-light opacity-0 uppercase'>
          Beat-making Hobbyist
        </p>
        <div className='call-to-action flex justify-center items-center mt-20 opacity-0'>
          <Button
            className='p-8 cursor-pointer hover:scale-110 ease-in-out transition-all duration-500'
            size='lg'
          >
            <p className='text-xl'>
              LISTEN TO MY BEATS <span className='animate-pulse'>👇🏾</span>
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
