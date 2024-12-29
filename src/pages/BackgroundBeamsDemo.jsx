import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { AnimatedModalDemo } from "./AnimatedModalDemo";
import { HeroParallaxDemo } from "./HeroParallaxDemo";
import { CardHoverEffectDemo } from "./common/CardHoverEffectDemo";

export function BackgroundBeamsDemo({ children }) {
  return (
    <div className="h-[35rem] w-full rounded-md bg-black relative antialiased z-10 flex justify-center items-center">
      <div className="max-w-full mx-auto p-4">
        {children}
       
      </div>
      <BackgroundBeams />
    
    </div>
  );
}
