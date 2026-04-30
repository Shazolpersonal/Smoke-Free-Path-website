"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { CTAButton } from "@/components/ui/CTAButton";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Absolute paths (with leading "/") so in-page anchors also work when
  // the user is currently on a sub-page like /checkout or /story.
  const navLinks = [
    { href: "/#hero", label: "হোম" },
    { href: "/#story", label: "গল্প" },
    { href: "/#faq", label: "FAQ" },
    { href: "/contact", label: "যোগাযোগ" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white-pure/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo — premium wordmark (logomark + Bengali text + English subscript) */}
          <Link
            href="/"
            className="group flex items-center gap-2 md:gap-3 transition-opacity hover:opacity-90"
            aria-label="ধোঁয়া-মুক্ত পথ হোম"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logomark.svg"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 md:h-10 md:w-10 drop-shadow-sm transition-transform group-hover:rotate-[-3deg]"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-lg md:text-xl font-bold text-emerald-deep font-hind-siliguri">
                ধোঁয়া-মুক্ত পথ
              </span>
              <span className="hidden md:inline text-[10px] font-semibold tracking-[0.24em] text-gold-royal/80">
                SMOKE · FREE · PATH
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-charcoal hover:text-emerald-deep transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <LanguageToggle />

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <CTAButton href="/checkout" size="sm">
                ৳৩৬৯
              </CTAButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-charcoal hover:text-emerald-deep transition-colors"
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
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white-pure border-t border-charcoal/10"
          >
            <nav className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg text-charcoal hover:text-emerald-deep transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
              <CTAButton href="/checkout" fullWidth>
                ৳৩৬৯
              </CTAButton>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
