"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { Button } from "../../components/ui/button";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { Vault } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Hero = () => {
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });

  const maskSize = isMobile ? "80%" : isTablet ? "60%" : "32%";

  //First value: horizontal position. Second value: vertical position
  const maskPosition = isMobile ? "50% 8%" : isTablet ? "56% 10%" : "95% 50%";

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
      .to(".logo", {
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

  const spinVault = () => {
    gsap.to(".vault", {
      duration: 1,
      rotation: "+=180",
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
      <div className='absolute z-50 xl:top-[6%] bottom-[14%] xl:left-76 w-full xl:w-auto flex flex-col justify-center items-center'>
        {/* <p className='title xl:text-6xl md:text-5xl text-4xl font-black opacity-0 uppercase text-center xl:text-left'>
          That&apos;s E. Hannah
        </p> */}
        <div className='relative xl:w-[32rem] md:w-[21rem] w-[16rem] xl:h-[14rem] md:h-[9rem] h-[7rem] opacity-0 logo'>
          <Image
            src='/images/logo.png'
            alt='beats by e. hannah logo'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            quality={100}
          />
        </div>
        <p className='subtitle text-center md:text-xl text-lg mt-4 font-light opacity-0 uppercase'>
          Sample-chopping Hobbyist
        </p>
        <div className='call-to-action flex justify-center items-center xl:mt-20 mt-13 opacity-0'>
          <Button
            className='xl:p-8 p-6 cursor-pointer hover:scale-110 hover:shadow-lg ease-in-out transition-all duration-500 flex gap-2 items-center justify-center'
            size='lg'
            onClick={() => {
              scrollToPlaylist();
              spinVault();
            }}
          >
            <div className='flex justify-center items-baseline gap-4'>
              <p className='xl:text-xl text-lg font-bold uppercase'>
                open the vault
              </p>
              <Vault className='vault xl:scale-200 scale-150' />
            </div>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
