import { Hero } from "@/components/sections/Hero";
import { PainMirror } from "@/components/sections/PainMirror";
import { Reality } from "@/components/sections/Reality";
import { NewHope } from "@/components/sections/NewHope";
import { ThreePillars } from "@/components/sections/ThreePillars";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { FounderStory } from "@/components/sections/FounderStory";
import { PriceComparison } from "@/components/sections/PriceComparison";
import { Promise } from "@/components/sections/Promise";
import { IslamicInspiration } from "@/components/sections/IslamicInspiration";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <PainMirror />
      <Reality />
      <NewHope />
      <ThreePillars />
      <LiveDemo />
      <FounderStory />
      <PriceComparison />
      <Promise />
      <IslamicInspiration />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
