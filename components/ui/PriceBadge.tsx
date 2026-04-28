import { cn } from "@/lib/utils";

interface PriceBadgeProps {
  original: number;
  discount: number;
  label?: string;
  currency?: string;
  className?: string;
}

export function PriceBadge({
  original,
  discount,
  label,
  currency = "৳",
  className,
}: PriceBadgeProps) {
  const discountPercent = Math.round((1 - discount / original) * 100);

  return (
    <div
      className={cn(
        "inline-flex flex-col items-center gap-1 p-4 rounded-lg",
        "bg-white-pure shadow-md border-2 border-gold-royal/20",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg text-charcoal/50 line-through">
          {currency}
          {original}
        </span>
        <span className="text-3xl font-bold text-gold-royal">
          {currency}
          {discount}
        </span>
        <span className="text-sm font-semibold text-red-alert bg-red-alert/10 px-2 py-1 rounded">
          {discountPercent}% ছাড়
        </span>
      </div>
      {label && (
        <p className="text-sm text-charcoal/70 text-center mt-1">{label}</p>
      )}
    </div>
  );
}
