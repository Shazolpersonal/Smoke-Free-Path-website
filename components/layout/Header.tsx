"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CTAButton } from "@/components/ui/CTAButton";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let frameId: number | null = null;

    const handleScroll = () => {
      if (frameId !== null) return;

      // ⚡ Bolt: Throttled state update using requestAnimationFrame to prevent scroll jank
      // and respect 60 FPS refresh rate.
      frameId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
        frameId = null;
      });
    };

    // ⚡ Bolt: Added { passive: true } to prevent blocking main thread scroll
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      // ⚡ Bolt: Cleanup frame to prevent memory leaks
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  // Absolute paths (with leading "/") so in-page anchors also work when
  // the user is currently on a sub-page like /checkout or /story.
  const navLinks = [
    { href: "/#hero", label: "হোম" },
    { href: "/#story", label: "গল্প" },
    { href: "/#faq", label: "FAQ" },
    { href: "/contact", label: "যোগাযোগ" },
  ];

  // Header is ALWAYS rendered on a white-glass background so brand & menu
  // icon remain visible regardless of the section underneath (dark hero,
  // cream parchment, etc.). Elevation/shadow strengthens slightly on scroll.
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        "bg-white-pure/90 backdrop-blur-md",
        isScrolled ? "shadow-luxe-md" : "shadow-sm",
      )}
    >
      {/* Gold hairline — always visible, subtle at top, stronger on scroll */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 right-0 bottom-0 h-px transition-opacity duration-500",
          "bg-gradient-to-r from-transparent via-gold-royal/60 to-transparent",
          isScrolled ? "opacity-100" : "opacity-60",
        )}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 md:gap-3 transition-opacity hover:opacity-95 font-hind-siliguri focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-royal focus-visible:ring-offset-4 rounded-lg"
            aria-label="ধোঁয়া-মুক্ত পথ হোম"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logomark.svg"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 md:h-10 md:w-10 drop-shadow-sm transition-transform duration-500 group-hover:rotate-[-3deg]"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-lg md:text-xl font-bold font-hind-siliguri relative inline-block text-emerald-deep">
                ধোঁয়া-মুক্ত পথ
                {/* Animated gold underline on hover */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 -bottom-0.5 h-px w-0 bg-gold-royal group-hover:w-full transition-[width] duration-500"
                />
              </span>
              <span className="hidden md:inline text-[10px] font-semibold tracking-[0.26em] text-gold-royal/80">
                SMOKE · FREE · PATH
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative font-medium transition-colors duration-300 font-noto-bengali text-charcoal hover:text-emerald-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-royal focus-visible:ring-offset-4 rounded-sm"
              >
                <span className="relative inline-block group">
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 -bottom-1 h-px w-0 bg-gold-royal group-hover:w-full transition-[width] duration-400"
                  />
                </span>
              </a>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Desktop CTA */}
            <div className="hidden md:block">
              <CTAButton href="/checkout" variant="luxe" size="sm">
                ৳৩৬৯
              </CTAButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 transition-colors text-charcoal hover:text-emerald-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-royal rounded-md"
              aria-label="মেনু খুলুন"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-emerald-abyss/98 backdrop-blur-lg border-t border-gold-royal/20 overflow-hidden"
          >
            <nav className="px-4 py-6 space-y-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg text-white-pure/90 hover:text-gold-glow transition-colors font-medium font-noto-bengali py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-royal focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-abyss rounded-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-3">
                <CTAButton href="/checkout" variant="luxe" fullWidth>
                  ৳৩৬৯ — এখনই শুরু করুন
                </CTAButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
