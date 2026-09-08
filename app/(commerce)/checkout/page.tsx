"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitOrder, OrderData } from "@/lib/order";
import {
  BKASH_NUMBER,
  NAGAD_NUMBER,
  formatBdPhoneDisplay,
} from "@/lib/config";
const checkoutSchema = z.object({
  name: z.string().min(2, "নাম অন্তত ২ অক্ষরের হতে হবে"),
  email: z.string().email("সঠিক ইমেইল ঠিকানা দিন"),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 01712345678)"),
  purpose: z.enum(["self", "gift"]),
  trxId: z.string().min(5, "সঠিক ট্রানজেকশন আইডি দিন"),
});
type CheckoutFormValues = z.infer<typeof checkoutSchema>;
type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string; mailtoFallback: boolean; orderId?: string }
  | { kind: "error"; message: string };
export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad">("bkash");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      purpose: "self",
    },
  });
  const purpose = useWatch({
    control,
    name: "purpose",
    defaultValue: "self",
  });
  const onSubmit = async (data: CheckoutFormValues) => {
    // Guard against double-submission while a request is in flight.
    if (status.kind === "submitting" || status.kind === "success") return;
    setStatus({ kind: "submitting" });
    try {
      const res = await submitOrder(data as OrderData);
      if (res.ok) {
        setStatus({
          kind: "success",
          message: res.message,
          mailtoFallback: res.mailtoFallback,
          orderId: res.id,
        });
        reset();
      } else {
        setStatus({
          kind: "error",
          message:
            res.message ||
            "অর্ডার পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
        });
      }
    } catch (err) {
      console.error("[checkout] submit failed", err);
      setStatus({
        kind: "error",
        message:
          "নেটওয়ার্ক সমস্যা হয়েছে। আপনার ইন্টারনেট সংযোগ চেক করে আবার চেষ্টা করুন।",
      });
    }
  };
  const isGift = purpose === "gift";
  const activeNumber = paymentMethod === "bkash" ? BKASH_NUMBER : NAGAD_NUMBER;
  const busy = status.kind === "submitting" || isSubmitting;
  const locked = status.kind === "success";
  return (
    <div className="bg-[#f4f1ea] min-h-screen py-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto bg-white-pure rounded-2xl shadow-xl overflow-hidden border border-gold-royal/20">
        <div className="bg-charcoal text-white-pure p-8 md:p-12 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-deep/20 to-transparent pointer-events-none"></div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-hind-siliguri relative z-10">
            নিরাপদ চেকআউট
          </h1>
          <p className="text-lg text-white-pure/80 font-noto-sans-bengali relative z-10">
            তিনটি অ্যাপ। সারাজীবনের অ্যাক্সেস। মাত্র ৳৩৬৯।
          </p>
        </div>
        <div className="p-8 md:p-12">
          {/* Global status banners (appear above the form) */}
          {status.kind === "success" && (
            <div
              role="status"
              aria-live="polite"
              className="mb-8 rounded-xl border-2 border-emerald-deep bg-emerald-deep/5 p-6 text-center"
            >
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-deep/15 text-emerald-deep">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-emerald-deep font-hind-siliguri">
                অর্ডার গৃহীত হয়েছে ✨
              </h2>
              <p className="mb-4 text-charcoal/80 font-noto-sans-bengali">
                {status.message}
              </p>
              {status.orderId && (
                <p className="mb-4 text-xs font-mono text-charcoal/50">
                  Order ID: {status.orderId}
                </p>
              )}
              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
                <Link
                  href="/thank-you"
                  className="inline-block rounded-xl bg-emerald-deep px-6 py-3 font-bold text-white-pure transition-all hover:shadow-lg hover:shadow-emerald-deep/30 hover:-translate-y-0.5"
                >
                  পরবর্তী ধাপ দেখুন →
                </Link>
                <Link
                  href="/"
                  className="inline-block rounded-xl border-2 border-charcoal/20 px-6 py-3 font-bold text-charcoal transition-all hover:border-emerald-deep hover:text-emerald-deep"
                >
                  হোমে ফিরে যান
                </Link>
              </div>
            </div>
          )}
          {status.kind === "error" && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-8 rounded-xl border-2 border-red-alert bg-red-alert/5 p-5 text-center"
            >
              <p className="font-bold text-red-alert font-noto-sans-bengali">
                ⚠️ {status.message}
              </p>
              <button
                type="button"
                onClick={() => setStatus({ kind: "idle" })}
                className="mt-3 text-sm font-bold text-emerald-deep underline hover:text-emerald-deep/80"
              >
                বন্ধ করুন
              </button>
            </div>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`space-y-8 ${locked ? "opacity-50 pointer-events-none" : ""}`}
          >
            {/* 1. Basic Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-charcoal font-hind-siliguri border-b border-charcoal/10 pb-2">
                ১. আপনার তথ্য
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-charcoal mb-2 font-noto-sans-bengali">
                    আপনার নাম
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    disabled={busy}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-required="true"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.name
                        ? "border-red-alert bg-red-alert/5"
                        : "border-charcoal/20 bg-charcoal/5"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-deep transition-all disabled:cursor-not-allowed`}
                    placeholder="আপনার পুরো নাম"
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-alert text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-charcoal mb-2 font-noto-sans-bengali">
                    ইমেইল ঠিকানা
                  </label>
                  <input
                    id="email"
                    {...register("email")}
                    disabled={busy}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-required="true"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.email
                        ? "border-red-alert bg-red-alert/5"
                        : "border-charcoal/20 bg-charcoal/5"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-deep transition-all disabled:cursor-not-allowed`}
                    placeholder="example@email.com"
                    type="email"
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-alert text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-bold text-charcoal mb-2 font-noto-sans-bengali">
                    মোবাইল নম্বর (বাংলাদেশ)
                  </label>
                  <input
                    id="phone"
                    {...register("phone")}
                    disabled={busy}
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    aria-required="true"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.phone
                        ? "border-red-alert bg-red-alert/5"
                        : "border-charcoal/20 bg-charcoal/5"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-deep transition-all disabled:cursor-not-allowed`}
                    placeholder="01XXXXXXXXX"
                    type="tel"
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-red-alert text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>
              <div className="mt-4 p-4 bg-charcoal/5 rounded-xl border border-charcoal/10">
                <fieldset>
                  <legend className="block text-sm font-bold text-charcoal mb-3 font-noto-sans-bengali">
                    আপনি কার জন্য কিনছেন?
                  </legend>
                  <div className="flex gap-6">
                    <label htmlFor="purpose-self" className="flex items-center gap-2 cursor-pointer">
                      <input
                        id="purpose-self"
                        type="radio"
                        value="self"
                        {...register("purpose")}
                        disabled={busy}
                        className="w-5 h-5 text-emerald-deep focus:ring-emerald-deep"
                      />
                      <span className="font-noto-sans-bengali">নিজের জন্য</span>
                    </label>
                    <label htmlFor="purpose-gift" className="flex items-center gap-2 cursor-pointer">
                      <input
                        id="purpose-gift"
                        type="radio"
                        value="gift"
                        {...register("purpose")}
                        disabled={busy}
                        className="w-5 h-5 text-emerald-deep focus:ring-emerald-deep"
                      />
                      <span className="font-noto-sans-bengali">উপহার হিসেবে</span>
                    </label>
                  </div>
                </fieldset>
              </div>
              {isGift && (
                <div className="mt-4 p-4 bg-gold-royal/10 rounded-xl border border-gold-royal/30">
                  <p className="text-charcoal/80 font-noto-sans-bengali">
                    উপহার দেওয়ার জন্য অনুগ্রহ করে{" "}
                    <Link href="/gift" className="text-emerald-deep font-bold underline hover:text-gold-royal">
                      উপহার পেজে
                    </Link>{" "}
                    যান।
                  </p>
                </div>
              )}
            </div>
            {/* 2. Payment */}
            <div className="space-y-6 pt-4">
              <h2 className="text-2xl font-bold text-charcoal font-hind-siliguri border-b border-charcoal/10 pb-2">
                ২. পেমেন্ট করুন
              </h2>
              <div className="flex gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bkash")}
                  disabled={busy}
                  aria-pressed={paymentMethod === "bkash"}
                  className={`flex-1 py-4 rounded-xl font-bold transition-all disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2136E] focus-visible:ring-offset-2 ${
                    paymentMethod === "bkash"
                      ? "bg-[#E2136E] text-white-pure shadow-lg scale-105"
                      : "bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10"
                  }`}
                >
                  bKash
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("nagad")}
                  disabled={busy}
                  aria-pressed={paymentMethod === "nagad"}
                  className={`flex-1 py-4 rounded-xl font-bold transition-all disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ED1C24] focus-visible:ring-offset-2 ${
                    paymentMethod === "nagad"
                      ? "bg-[#ED1C24] text-white-pure shadow-lg scale-105"
                      : "bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10"
                  }`}
                >
                  Nagad
                </button>
              </div>
              <div className="bg-charcoal/5 p-6 md:p-8 rounded-xl border border-charcoal/10">
                <ol className="space-y-4 font-noto-sans-bengali text-lg text-charcoal/90">
                  <li className="flex gap-4">
                    <span className="font-bold text-emerald-deep">১.</span>
                    <span>আপনার {paymentMethod === "bkash" ? "বিকাশ" : "নগদ"} অ্যাপে যান।</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-bold text-emerald-deep">২.</span>
                    <span>
                      <strong
                        className="text-2xl block my-1 select-all tracking-wider text-charcoal"
                        aria-label={`${paymentMethod === "bkash" ? "বিকাশ" : "নগদ"} পার্সোনাল নম্বর ${activeNumber}`}
                      >
                        {formatBdPhoneDisplay(activeNumber)}
                      </strong>
                      এই <strong>পার্সোনাল</strong> নম্বরে <strong>Send Money</strong> করুন।
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-bold text-emerald-deep">৩.</span>
                    <span>অ্যামাউন্ট দিন: <strong>৳৩৬৯</strong></span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-bold text-emerald-deep">৪.</span>
                    <span>রেফারেন্সে আপনার নাম লিখুন।</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-bold text-emerald-deep">৫.</span>
                    <span>পেমেন্ট সফল হলে Transaction ID (TrxID) নিচে দিন।</span>
                  </li>
                </ol>
              </div>
              <div>
                <label htmlFor="trxId" className="block text-sm font-bold text-charcoal mb-2 font-noto-sans-bengali">
                  Transaction ID (TrxID)
                </label>
                <input
                  id="trxId"
                  {...register("trxId")}
                  disabled={busy}
                  aria-invalid={errors.trxId ? "true" : "false"}
                  aria-describedby={errors.trxId ? "trxId-error" : undefined}
                  aria-required="true"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.trxId
                      ? "border-red-alert bg-red-alert/5"
                      : "border-charcoal/20 bg-charcoal/5"
                  } focus:outline-none focus:ring-2 focus:ring-emerald-deep transition-all uppercase disabled:cursor-not-allowed`}
                  placeholder="e.g. 9E5BXXXXXXXX"
                />
                {errors.trxId && (
                  <p id="trxId-error" className="text-red-alert text-sm mt-1">{errors.trxId.message}</p>
                )}
              </div>
            </div>
            {/* 3. Submit */}
            <div className="pt-8 border-t border-charcoal/10 text-center">
              <p className="text-sm text-charcoal/60 mb-6 font-noto-sans-bengali">
                আমরা ৬ ঘণ্টার মধ্যে আপনার ইমেইলে ডাউনলোড লিংক পাঠাব।
                <br />
                স্প্যাম ফোল্ডার চেক করতে ভুলবেন না।
              </p>
              <button
                type="submit"
                disabled={busy || isGift || locked}
                aria-busy={busy}
                className={`w-full py-4 rounded-xl font-bold text-lg text-white-pure font-noto-sans-bengali transition-all shadow-lg ${
                  busy || isGift || locked
                    ? "bg-charcoal/30 cursor-not-allowed"
                    : "bg-emerald-deep hover:shadow-emerald-deep/30 hover:-translate-y-1"
                }`}
              >
                {busy ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="h-5 w-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    অর্ডার পাঠানো হচ্ছে...
                  </span>
                ) : (
                  "অর্ডার নিশ্চিত করুন"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
