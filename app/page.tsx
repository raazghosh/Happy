"use client";

import { useState } from "react";
import config from "@/content/birthday";
import BirthdayHero from "@/components/BirthdayHero";
import SurpriseReveal from "@/components/SurpriseReveal";
import Countdown from "@/components/Countdown";
import MemoryGallery from "@/components/MemoryGallery";
import MemoryTimeline from "@/components/MemoryTimeline";
import LoveReasons from "@/components/LoveReasons";
import LoveLetter from "@/components/LoveLetter";
import MusicPlayer from "@/components/MusicPlayer";
import BirthdayCake from "@/components/BirthdayCake";

export default function Home() {
  const [revealed, setRevealed] = useState(false);

  return (
    <main>
      {!revealed ? (
        <BirthdayHero
          config={config}
          onReveal={() => setRevealed(true)}
        />
      ) : (
        <>
          <SurpriseReveal config={config} />
          <Countdown config={config} />
          <MemoryGallery config={config} />
          <MemoryTimeline config={config} />
          <LoveReasons config={config} />
          <LoveLetter config={config} />
          {config.music && <MusicPlayer config={config} />}
          <BirthdayCake config={config} onRestart={() => setRevealed(false)} />
        </>
      )}
    </main>
  );
}
