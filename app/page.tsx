import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { PainMirror } from "@/components/sections/PainMirror";
import { Reality } from "@/components/sections/Reality";
import { NewHope } from "@/components/sections/NewHope";
import { ThreePillars } from "@/components/sections/ThreePillars";

const LiveDemo = dynamic(() => import("@/components/sections/LiveDemo").then((mod) => mod.LiveDemo));
const FounderStory = dynamic(() => import("@/components/sections/FounderStory").then((mod) => mod.FounderStory));
const PriceComparison = dynamic(() => import("@/components/sections/PriceComparison").then((mod) => mod.PriceComparison));
const PromiseSection = dynamic(() => import("@/components/sections/Promise").then((mod) => mod.Promise));
const IslamicInspiration = dynamic(() => import("@/components/sections/IslamicInspiration").then((mod) => mod.IslamicInspiration));
const FAQ = dynamic(() => import("@/components/sections/FAQ").then((mod) => mod.FAQ));
const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA").then((mod) => mod.FinalCTA));

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
      <PromiseSection />
      <IslamicInspiration />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
