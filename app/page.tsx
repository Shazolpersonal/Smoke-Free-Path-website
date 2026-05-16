import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

// ⚡ Bolt: Lazy load all below-the-fold components to reduce initial JS payload and improve First Contentful Paint.
const PainMirror = dynamic(() => import("@/components/sections/PainMirror").then((mod) => mod.PainMirror));
const Reality = dynamic(() => import("@/components/sections/Reality").then((mod) => mod.Reality));
const NewHope = dynamic(() => import("@/components/sections/NewHope").then((mod) => mod.NewHope));
const ThreePillars = dynamic(() => import("@/components/sections/ThreePillars").then((mod) => mod.ThreePillars));
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
