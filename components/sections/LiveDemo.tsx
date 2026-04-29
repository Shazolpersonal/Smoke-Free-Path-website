"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui";
import { copyBn } from "@/content";

/**
 * LiveDemo — showcases the three apps with static posters.
 *
 * NOTE (2026 refactor): Previously rendered <video> with 0-byte demo .mp4
 * files which broke playback on all devices. We now ship editable SVG
 * posters that render crisply at every DPI and are tiny (~5KB each).
 *
 * To bring videos back later, replace <Image ... /> with <video poster={...}>
 * and add the .mp4 files to /public/demos/. The poster SVGs remain useful
 * as the `poster` attribute.
 */
export function LiveDemo() {
  const demos = [
    {
      title: "মুহূর্ত ব্রেথ",
      description: "তাৎক্ষণিক শান্তির কৌশল",
      poster: "/demos/app-1-poster.svg",
      alt:
        "মুহূর্ত ব্রেথ অ্যাপ পোস্টার — ২১ সেকেন্ডের শ্বাস-প্রশ্বাস ব্যায়াম, যখন তলব আসে তখন ব্যবহারের জন্য।",
    },
    {
      title: "ধোঁয়া-মুক্ত পথ: পদক্ষেপ",
      description: "৪১ দিনের যাত্রা",
      poster: "/demos/app-2-poster.svg",
      alt:
        "পদক্ষেপ অ্যাপ পোস্টার — ৪১ দিনের সূর্যোদয় পথ, দৈনিক চ্যালেঞ্জ ও প্রগতি ট্র্যাকার।",
    },
    {
      title: "ধোঁয়া-মুক্ত পথ: ৩৬৯",
      description: "আধ্যাত্মিক রূপান্তর",
      poster: "/demos/app-3-poster.svg",
      alt:
        "৩৬৯ অ্যাপ পোস্টার — টেসলার ৩৬৯ মেথড অনুসারে ৩ বার সকালে, ৬ বার দুপুরে, ৯ বার রাতে জিকিরের ভিজ্যুয়াল।",
    },
  ];

  return (
    <SectionWrapper id="live-demo" bgVariant="emerald">
      {/* Section Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 font-hind-siliguri">
          {copyBn.liveDemo.heading}
        </h2>
        <p className="text-lg md:text-xl text-charcoal/70 font-noto-sans-bengali">
          {copyBn.liveDemo.subtext}
        </p>
      </motion.div>

      {/* Demo Posters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {demos.map((demo, index) => (
          <motion.div
            key={demo.title}
            className="relative rounded-xl overflow-hidden bg-white-pure shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
          >
            {/* Poster container — 9:16 aspect */}
            <div className="relative aspect-[9/16] bg-charcoal/5">
              <Image
                src={demo.poster}
                alt={demo.alt}
                width={1080}
                height={1920}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="absolute inset-0 w-full h-full object-cover"
                priority={index === 0}
                unoptimized
              />

              {/* "Coming soon" ribbon — visible until real video ships */}
              <div
                className="absolute top-3 right-3 bg-gold-royal text-charcoal text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-noto-sans-bengali shadow-md"
                aria-hidden="true"
              >
                ভিডিও শীঘ্রই
              </div>
            </div>

            {/* Info */}
            <div className="p-4 bg-white-pure">
              <h3 className="text-lg font-bold text-charcoal mb-1 font-hind-siliguri">
                {demo.title}
              </h3>
              <p className="text-sm text-charcoal/70 font-noto-sans-bengali">
                {demo.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-sm text-charcoal/60 mt-8 font-noto-sans-bengali">
        ডেমো ভিডিও শীঘ্রই যুক্ত হবে। আপাতত প্রতিটি অ্যাপের পূর্ণাঙ্গ বিবরণ উপরের পোস্টারে।
      </p>
    </SectionWrapper>
  );
}
