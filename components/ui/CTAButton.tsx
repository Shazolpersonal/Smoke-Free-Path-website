"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

const variants = {
  primary:
    "bg-gold-royal text-white-pure shadow-[0_4px_12px_rgba(212,160,23,0.3)] hover:shadow-[0_6px_16px_rgba(212,160,23,0.4)]",
  secondary:
    "border-2 border-emerald-deep text-emerald-deep bg-transparent hover:bg-emerald-deep/5",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function CTAButton({
  variant = "primary",
  href,
  onClick,
  children,
  icon,
  size = "md",
  fullWidth = false,
  className,
}: CTAButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2",
    "rounded-lg font-semibold",
    "transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-gold-royal focus:ring-offset-2",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );

  const content = (
    <>
      {children}
      {icon && <span>{icon}</span>}
    </>
  );

  const MotionComponent = motion(href ? Link : "button");

  return (
    <MotionComponent
      href={href || ""}
      onClick={onClick}
      className={baseClasses}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {content}
    </MotionComponent>
  );
}
