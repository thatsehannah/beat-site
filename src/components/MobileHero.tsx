"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { Button } from "./ui/button";

gsap.registerPlugin(ScrollTrigger);

const MobileHero = () => {
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(() => {
    const maskTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-mobile",
        start: "top top",
        end: "bottom center",
        scrub: 8,
        pin: true,
      },
    });

    maskTimeLine
      .to(bgVideoRef.current, {
        scale: 1,
        maskSize: "68%",
        maskPosition: "50% 8%",
        duration: 8,
        ease: "expo.out",
      })
      .to(".title-mobile", {
        opacity: 1,
        duration: 2.2,
        ease: "expo.out",
      })
      .fromTo(
        ".subtitle-mobile",
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
      .to(".call-to-action-mobile", {
        opacity: 1,
        ease: "expo.out",
        duration: 4,
      });
  }, []);

  return (
    <div className='h-screen w-screen relative hero-mobile'>
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
      <div className='absolute z-50 bottom-[7%] w-full text-center'>
        <p className='title-mobile text-4xl font-black uppercase opacity-0'>
          that&apos;s e. hannah
        </p>
        <p className='subtitle-mobile uppercase font-light text-lg mt-3 opacity-0'>
          beat-making hobbyist
        </p>
        <div className='call-to-action-mobile flex justify-center mt-13 items-center opacity-0'>
          <Button
            className='p-6 cursor-pointer hover:scale-110 ease-in-out transition-all duration-500'
            size='lg'
          >
            <p className='text-lg font-bold'>
              LISTEN TO MY BEATS <span className='animate-pulse'>👇🏾</span>
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileHero;
