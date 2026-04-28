import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bgVariant?: "white" | "emerald" | "dark" | "sepia";
}

const bgVariants = {
  white: "bg-white-pure",
  emerald: "bg-emerald-deep/5",
  dark: "bg-charcoal text-white-pure",
  sepia: "bg-[#f4f1ea]",
};

export function SectionWrapper({
  children,
  className,
  id,
  bgVariant = "white",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24 px-4 md:px-8",
        bgVariants[bgVariant],
        className
      )}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
