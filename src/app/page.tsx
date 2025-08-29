"use client";

import DesktopHero from "@/components/DesktopHero";
import MobileHero from "@/components/MobileHero";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const Hero = () => {
    if (isMobile) {
      return <MobileHero />;
    }

    return <DesktopHero />;
  };

  return (
    <main>
      <Hero />
    </main>
  );
}
