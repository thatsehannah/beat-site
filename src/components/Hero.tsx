"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(() => {
    const maskTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom center",
        scrub: 2,
        pin: true,
      },
    });

    maskTimeLine
      .to(bgVideoRef.current, {
        scale: 1,
        maskSize: "35%",
        maskPosition: "center",
        duration: 1.8,
        ease: "power1.inOut",
      })
      .to(".title", {
        opacity: 1,
        duration: 1.2,
        ease: "expo.out",
      })
      .to(".subtitle", {
        opacity: 1,
        duration: 1.2,
        ease: "expo.out",
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
      <div className='z-50 absolute top-[20%] left-12'>
        <p className='title text-6xl font-black opacity-0'>That's E. Hannah</p>
        <p className='subtitle text-center text-xl mt-3 font-light opacity-0'>
          Beat-making Hobbyist
        </p>
      </div>
      <div></div>
    </div>
  );
};

export default Hero;
