"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui";
import { copyBn } from "@/content";

export function LiveDemo() {
  const demos = [
    {
      title: "মুহূর্ত ব্রেথ",
      videoSrc: "/demos/app-1-demo.mp4",
      posterSrc: "/demos/app-1-poster.svg",
      description: "তাৎক্ষণিক শান্তির কৌশল",
    },
    {
      title: "ধোঁয়া-মুক্ত পথ: পদক্ষেপ",
      videoSrc: "/demos/app-2-demo.mp4",
      posterSrc: "/demos/app-2-poster.svg",
      description: "৪১ দিনের যাত্রা",
    },
    {
      title: "ধোঁয়া-মুক্ত পথ: ৩৬৯",
      videoSrc: "/demos/app-3-demo.mp4",
      posterSrc: "/demos/app-3-poster.svg",
      description: "আধ্যাত্মিক রূপান্তর",
    },
  ];

  return (
    <SectionWrapper
      id="live-demo"
      bgVariant="emerald"
    >
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

      {/* Demo Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {demos.map((demo, index) => (
          <motion.div
            key={index}
            className="relative rounded-xl overflow-hidden bg-white-pure shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
          >
            {/* Video Container */}
            <div className="relative aspect-[9/16] bg-charcoal/5">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster={demo.posterSrc}
                aria-label={`${demo.title} ডেমো ভিডিও`}
              >
                <source src={demo.videoSrc} type="video/mp4" />
                {/* Fallback placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-deep/20 to-gold-royal/20">
                  <div className="text-center text-charcoal/50">
                    <svg
                      className="w-16 h-16 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm">Demo Video</p>
                  </div>
                </div>
              </video>
            </div>

            {/* Demo Info */}
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
    </SectionWrapper>
  );
}
