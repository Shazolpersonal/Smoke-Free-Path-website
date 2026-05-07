"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui";
import { copyBn } from "@/content";
import { EASE_LUXE } from "@/lib/motion";

/**
 * LiveDemo — showcases the three apps with static posters.
 *
 * NOTE: Previously rendered <video> with 0-byte demo .mp4 files which broke
 * playback. We ship editable SVG posters that render crisply at every DPI
 * and are tiny (~5KB each). PRESERVED EXACTLY — only the surrounding visual
 * styling is elevated.
 */
export function LiveDemo() {
  const demos = [
    {
      title: "মুহূর্ত ব্রেথ",
      description: "তাৎক্ষণিক শান্তির কৌশল",
      poster: "/demos/app-1-poster.svg",
      video: "/demos/app-1-demo.webm",
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
    <SectionWrapper
      id="live-demo"
      bgVariant="transparent"
      className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-cream-deep)_0%,var(--color-cream-parchment)_100%)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 luxe-noise-light pointer-events-none"
      />

      {/* Section Heading */}
      <motion.div
        className="relative z-10 text-center mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: EASE_LUXE }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-deep mb-4 font-hind-siliguri tracking-tight">
          {copyBn.liveDemo.heading}
        </h2>
        <p className="text-lg md:text-xl text-charcoal/70 font-noto-bengali">
          {copyBn.liveDemo.subtext}
        </p>
      </motion.div>

      {/* Demo Posters Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {demos.map((demo, index) => (
          <motion.div
            key={demo.title}
            className={[
              "relative rounded-2xl overflow-hidden",
              "bg-white-pure",
              "border border-gold-royal/25",
              "shadow-luxe-md",
              "transition-all duration-500",
              "hover:-translate-y-1 hover:shadow-luxe-lg hover:border-gold-royal/45",
            ].join(" ")}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.65, delay: index * 0.1, ease: EASE_LUXE }}
          >
            {/* Gold top bar */}
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-soft/0 via-gold-royal to-gold-soft/0 z-20"
            />

            <div className="relative aspect-[9/16] bg-charcoal/5">
              {demo.video ? (
                <video
                  src={demo.video}
                  poster={demo.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  aria-label={demo.alt}
                />
              ) : (
                <>
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

                  {/* Ribbon */}
                  <div
                    className={[
                      "absolute top-3 right-3 z-10",
                      "bg-[linear-gradient(135deg,var(--color-gold-glow)_0%,var(--color-gold-royal)_100%)]",
                      "text-charcoal text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider",
                      "font-noto-bengali shadow-gold-glow-soft",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    ভিডিও শীঘ্রই
                  </div>
                </>
              )}
            </div>

            <div className="p-5 bg-white-pure relative">
              <h3 className="text-lg font-bold text-emerald-deep mb-1.5 font-hind-siliguri">
                {demo.title}
              </h3>
              <p className="text-sm text-charcoal/70 font-noto-bengali">
                {demo.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="relative z-10 text-center text-sm text-charcoal/60 mt-10 font-noto-bengali italic">
        ডেমো ভিডিও শীঘ্রই যুক্ত হবে। আপাতত প্রতিটি অ্যাপের পূর্ণাঙ্গ বিবরণ উপরের পোস্টারে।
      </p>
    </SectionWrapper>
  );
}
