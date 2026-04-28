"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitOrder, OrderData } from "@/lib/order";

const checkoutSchema = z.object({
  name: z.string().min(2, "নাম অন্তত ২ অক্ষরের হতে হবে"),
  email: z.string().email("সঠিক ইমেইল ঠিকানা দিন"),
  phone: z.string().regex(/^01[3-9]\d{8}$/, "সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 01712345678)"),
  purpose: z.enum(["self", "gift"]),
  trxId: z.string().min(5, "সঠিক ট্রানজেকশন আইডি দিন"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad">("bkash");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      purpose: "self",
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    submitOrder(data as OrderData);
  };

  const isGift = watch("purpose") === "gift";

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* 1. Basic Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-charcoal font-hind-siliguri border-b border-charcoal/10 pb-2">
                ১. আপনার তথ্য
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2 font-noto-sans-bengali">আপনার নাম</label>
                  <input
                    {...register("name")}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-alert bg-red-alert/5' : 'border-charcoal/20 bg-charcoal/5'} focus:outline-none focus:ring-2 focus:ring-emerald-deep transition-all`}
                    placeholder="আপনার পুরো নাম"
                  />
                  {errors.name && <p className="text-red-alert text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2 font-noto-sans-bengali">ইমেইল ঠিকানা</label>
                  <input
                    {...register("email")}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-alert bg-red-alert/5' : 'border-charcoal/20 bg-charcoal/5'} focus:outline-none focus:ring-2 focus:ring-emerald-deep transition-all`}
                    placeholder="example@email.com"
                    type="email"
                  />
                  {errors.email && <p className="text-red-alert text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-charcoal mb-2 font-noto-sans-bengali">মোবাইল নম্বর (বাংলাদেশ)</label>
                  <input
                    {...register("phone")}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-alert bg-red-alert/5' : 'border-charcoal/20 bg-charcoal/5'} focus:outline-none focus:ring-2 focus:ring-emerald-deep transition-all`}
                    placeholder="01XXXXXXXXX"
                    type="tel"
                  />
                  {errors.phone && <p className="text-red-alert text-sm mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="mt-4 p-4 bg-charcoal/5 rounded-xl border border-charcoal/10">
                <label className="block text-sm font-bold text-charcoal mb-3 font-noto-sans-bengali">আপনি কার জন্য কিনছেন?</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value="self" {...register("purpose")} className="w-5 h-5 text-emerald-deep focus:ring-emerald-deep" />
                    <span className="font-noto-sans-bengali">নিজের জন্য</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value="gift" {...register("purpose")} className="w-5 h-5 text-emerald-deep focus:ring-emerald-deep" />
                    <span className="font-noto-sans-bengali">উপহার হিসেবে</span>
                  </label>
                </div>
              </div>

              {isGift && (
                <div className="mt-4 p-4 bg-gold-royal/10 rounded-xl border border-gold-royal/30">
                  <p className="text-charcoal/80 font-noto-sans-bengali">
                    উপহার দেওয়ার জন্য অনুগ্রহ করে <a href="/gift" className="text-emerald-deep font-bold underline hover:text-gold-royal">উপহার পেজে</a> যান।
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
                  className={`flex-1 py-4 rounded-xl font-bold transition-all ${paymentMethod === "bkash" ? "bg-[#E2136E] text-white-pure shadow-lg scale-105" : "bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10"}`}
                >
                  bKash
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("nagad")}
                  className={`flex-1 py-4 rounded-xl font-bold transition-all ${paymentMethod === "nagad" ? "bg-[#ED1C24] text-white-pure shadow-lg scale-105" : "bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10"}`}
                >
                  Nagad
                </button>
              </div>

              <div className="bg-charcoal/5 p-6 md:p-8 rounded-xl border border-charcoal/10">
                <ol className="space-y-4 font-noto-sans-bengali text-lg text-charcoal/90">
                  <li className="flex gap-4"><span className="font-bold text-emerald-deep">১.</span> <span>আপনার {paymentMethod === "bkash" ? "বিকাশ" : "নগদ"} অ্যাপে যান।</span></li>
                  <li className="flex gap-4"><span className="font-bold text-emerald-deep">২.</span> <span><strong className="text-xl block my-1">017XXXXXXXX</strong> এই পার্সোনাল নম্বরে <strong>Send Money</strong> করুন।</span></li>
                  <li className="flex gap-4"><span className="font-bold text-emerald-deep">৩.</span> <span>অ্যামাউন্ট দিন: <strong>৳৩৬৯</strong></span></li>
                  <li className="flex gap-4"><span className="font-bold text-emerald-deep">৪.</span> <span>রেফারেন্সে আপনার নাম লিখুন।</span></li>
                  <li className="flex gap-4"><span className="font-bold text-emerald-deep">৫.</span> <span>পেমেন্ট সফল হলে Transaction ID (TrxID) নিচে দিন।</span></li>
                </ol>
              </div>

              <div>
                <label className="block text-sm font-bold text-charcoal mb-2 font-noto-sans-bengali">Transaction ID (TrxID)</label>
                <input
                  {...register("trxId")}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.trxId ? 'border-red-alert bg-red-alert/5' : 'border-charcoal/20 bg-charcoal/5'} focus:outline-none focus:ring-2 focus:ring-emerald-deep transition-all uppercase`}
                  placeholder="e.g. 9E5BXXXXXXXX"
                />
                {errors.trxId && <p className="text-red-alert text-sm mt-1">{errors.trxId.message}</p>}
              </div>
            </div>

            {/* 3. Submit */}
            <div className="pt-8 border-t border-charcoal/10 text-center">
              <p className="text-sm text-charcoal/60 mb-6 font-noto-sans-bengali">
                আমরা ৬ ঘণ্টার মধ্যে আপনার ইমেইলে ডাউনলোড লিংক পাঠাব।<br/>স্প্যাম ফোল্ডার চেক করতে ভুলবেন না।
              </p>
              <button
                type="submit"
                disabled={isSubmitting || isGift}
                className={`w-full py-4 rounded-xl font-bold text-lg text-white-pure font-noto-sans-bengali transition-all shadow-lg hover:-translate-y-1 ${isSubmitting || isGift ? 'bg-charcoal/30 cursor-not-allowed' : 'bg-emerald-deep hover:shadow-emerald-deep/30'}`}
              >
                {isSubmitting ? "প্রসেস হচ্ছে..." : "অর্ডার নিশ্চিত করুন"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
