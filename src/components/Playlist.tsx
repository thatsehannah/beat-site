"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Playlist = () => {
  useGSAP(() => {
    const disclaimerTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".disclaimer",
        start: "top center",
        end: "bottom center",
      },
    });

    disclaimerTl.fromTo(
      ".disclaimer-text",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.inOut",
      }
    );
  }, []);

  return (
    <section className='disclaimer h-screen w-screen bg-primary bg-[url("/images/noise.png")] p-4 size-full text-accent-foreground'>
      <div className='h-full w-full border-background rounded-2xl border-2 flex items-center flex-col p-8'>
        <div className='disclaimer-text border-accent text-center max-w-[50%] flex flex-col items-center gap-5'>
          <p className='text-7xl uppercase font-black text-accent'>
            Disclaimer!
          </p>
          <p className='text-lg font-semibold'>
            The samples I used have{" "}
            <span className='text-2xl font-extrabold'>NOT</span> been cleared. I
            am not looking to sell these beats; it is strictly for promotional
            purposes and to showcase my favorite hobby. If you like what you
            hear and want to work with me, I&apos;d be happy to connect. My
            email is <span>elliotchannah@outlook.com</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Playlist;
