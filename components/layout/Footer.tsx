import Link from "next/link";
import {
  WHATSAPP_NUMBER,
  SUPPORT_EMAIL,
  toIntlBdPhone,
  formatBdPhoneDisplay,
} from "@/lib/config";

export function Footer() {
  const productLinks = [
    { href: "/checkout", label: "অ্যাপসমূহ কিনুন" },
    { href: "/gift", label: "উপহার দিন" },
  ];

  const resourcesLinks = [
    { href: "/#faq", label: "FAQ" },
    { href: "/#story", label: "আমাদের গল্প" },
    { href: "/contact", label: "যোগাযোগ" },
  ];

  const legalLinks = [
    { href: "/policy/privacy", label: "প্রাইভেসি পলিসি" },
    { href: "/policy/refund", label: "রিফান্ড পলিসি" },
    { href: "/policy/terms", label: "শর্তাবলী" },
  ];

  const whatsappIntl = toIntlBdPhone(WHATSAPP_NUMBER);
  const whatsappDisplay = formatBdPhoneDisplay(WHATSAPP_NUMBER);

  return (
    <footer className="relative bg-[linear-gradient(180deg,var(--color-charcoal)_0%,var(--color-emerald-abyss)_100%)] text-white-pure overflow-hidden">
      {/* Top gold hairline */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-royal/70 to-transparent"
      />

      {/* Subtle noise */}
      <div
        aria-hidden="true"
        className="absolute inset-0 luxe-noise pointer-events-none opacity-60"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="text-2xl font-bold inline-block mb-4 font-hind-siliguri text-luxe-gradient focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-royal focus-visible:ring-offset-4 focus-visible:ring-offset-emerald-abyss rounded-sm"
            >
              ধোঁয়া-মুক্ত পথ
            </Link>
            <p className="text-white-pure/75 font-noto-bengali leading-relaxed text-sm md:text-base">
              ধূমপান ছাড়ার একটি ইসলামিক এবং বিজ্ঞানভিত্তিক গাইড।
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold text-base mb-6 font-hind-siliguri text-gold-royal uppercase tracking-[0.18em]">
              প্রোডাক্ট
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-white-pure/75 hover:text-gold-glow transition-colors font-noto-bengali inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-royal focus-visible:ring-offset-4 focus-visible:ring-offset-emerald-abyss rounded-sm"
                  >
                    <span
                      aria-hidden="true"
                      className="w-0 h-px bg-gold-royal transition-[width] duration-300 group-hover:w-3"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-base mb-6 font-hind-siliguri text-gold-royal uppercase tracking-[0.18em]">
              রিসোর্স
            </h3>
            <ul className="space-y-3">
              {resourcesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-white-pure/75 hover:text-gold-glow transition-colors font-noto-bengali inline-flex items-center gap-1.5"
                  >
                    <span
                      aria-hidden="true"
                      className="w-0 h-px bg-gold-royal transition-[width] duration-300 group-hover:w-3"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-base mb-6 font-hind-siliguri text-gold-royal uppercase tracking-[0.18em]">
              পলিসি
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-white-pure/75 hover:text-gold-glow transition-colors font-noto-bengali inline-flex items-center gap-1.5"
                  >
                    <span
                      aria-hidden="true"
                      className="w-0 h-px bg-gold-royal transition-[width] duration-300 group-hover:w-3"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-base mb-6 font-hind-siliguri text-gold-royal uppercase tracking-[0.18em]">
              যোগাযোগ
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`https://wa.me/${whatsappIntl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-white-pure/75 hover:text-gold-glow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-royal focus-visible:ring-offset-4 focus-visible:ring-offset-emerald-abyss rounded-sm"
                  aria-label={`WhatsApp ${whatsappDisplay}`}
                >
                  <svg
                    className="w-5 h-5 text-gold-royal/80 group-hover:text-gold-glow transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="group flex items-center gap-2 text-white-pure/75 hover:text-gold-glow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-royal focus-visible:ring-offset-4 focus-visible:ring-offset-emerald-abyss rounded-sm"
                  aria-label={`ইমেইল ${SUPPORT_EMAIL}`}
                >
                  <svg
                    className="w-5 h-5 text-gold-royal/80 group-hover:text-gold-glow transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>ইমেইল</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gold-royal/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white-pure/55">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} ধোঁয়া-মুক্ত পথ | আবদুল করিমের স্মৃতিতে নিবেদিত
            </p>
            <p className="italic flex items-center gap-3 font-playfair">
              <span
                aria-hidden="true"
                className="w-1 h-1 rounded-full bg-gold-royal/60"
              />
              Built with sincerity and compassion
              <span
                aria-hidden="true"
                className="w-1 h-1 rounded-full bg-gold-royal/60"
              />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
