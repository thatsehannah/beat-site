"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { Button } from "../../components/ui/button";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Hero = () => {
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });

  const maskSize = isMobile ? "86%" : isTablet ? "68%" : "36%";

  //First value: horizontal position. Second value: vertical position
  const maskPosition = isMobile ? "50% 8%" : isTablet ? "60% 10%" : "95% 50%";

  useGSAP(() => {
    const maskTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom center",
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });

    maskTimeLine
      .to(bgVideoRef.current, {
        scale: 1,
        maskSize: maskSize,
        maskPosition: maskPosition,
        duration: 8,
        ease: "power1.inOut",
      })
      .to(".title", {
        opacity: 1,
        duration: 2.2,
        ease: "power1.inOut",
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
          ease: "power1.inOut",
        }
      )
      .to(".call-to-action", {
        opacity: 1,
        ease: "expo.out",
        duration: 4,
      });
  });

  const scrollToPlaylist = () => {
    gsap.to(window, {
      duration: 2,
      scrollTo: "#playlist",
      ease: "power2.inOut",
    });
  };

  return (
    <section className='w-screen h-screen relative hero bg-background'>
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
      <div className='absolute z-50 xl:top-[20%] bottom-[14%] xl:left-36 w-full xl:w-auto'>
        <p className='title xl:text-6xl md:text-5xl text-4xl font-black opacity-0 uppercase text-center xl:text-left'>
          That&apos;s E. Hannah
        </p>
        <p className='subtitle text-center xl:text-left md:text-xl text-lg mt-3 font-light opacity-0 uppercase'>
          Beat-making Hobbyist
        </p>
        <div className='call-to-action flex justify-center items-center xl:mt-20 mt-13 opacity-0'>
          <Button
            className='xl:p-8 p-6 cursor-pointer hover:scale-110 ease-in-out transition-all duration-500'
            size='lg'
            onClick={scrollToPlaylist}
          >
            <p className='xl:text-xl text-lg font-bold'>
              LISTEN TO MY BEATS <span className='animate-pulse'>👇🏾</span>
            </p>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
