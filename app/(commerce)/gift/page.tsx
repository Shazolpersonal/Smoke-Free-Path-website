"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitOrder, OrderData } from "@/lib/order";

const giftSchema = z.object({
  name: z.string().min(2, "নাম অন্তত ২ অক্ষরের হতে হবে"),
  email: z.string().email("সঠিক ইমেইল ঠিকানা দিন"),
  phone: z.string().regex(/^01[3-9]\d{8}$/, "সঠিক বাংলাদেশি মোবাইল নম্বর দিন"),
  recipientName: z.string().min(2, "প্রাপকের নাম দিন"),
  recipientEmail: z.string().email("প্রাপকের সঠিক ইমেইল ঠিকানা দিন"),
  message: z.string().max(500, "মেসেজ ৫০০ অক্ষরের মধ্যে হতে হবে").optional(),
  trxId: z.string().min(5, "সঠিক ট্রানজেকশন আইডি দিন"),
  purpose: z.literal("gift"),
});

type GiftFormValues = z.infer<typeof giftSchema>;

export default function GiftPage() {
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad">("bkash");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<GiftFormValues>({
    resolver: zodResolver(giftSchema),
    defaultValues: {
      purpose: "gift",
    },
  });

  const onSubmit = async (data: GiftFormValues) => {
    submitOrder(data as OrderData);
  };

  const recipientName = watch("recipientName") || "[প্রাপকের নাম]";
  const customMessage = watch("message") || "ধূমপান ছাড়ার এই যাত্রায় আমি তোমার পাশে আছি।";

  return (
    <div className="bg-[#f4f1ea] min-h-screen py-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto bg-white-pure rounded-2xl shadow-xl overflow-hidden border border-gold-royal/20">
        <div className="bg-gold-royal text-charcoal p-8 md:p-12 text-center relative">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-hind-siliguri relative z-10">
            প্রিয়জনকে উপহার দিন 🎁
          </h1>
          <p className="text-lg text-charcoal/80 font-noto-sans-bengali relative z-10">
            আপনার উপহার হতে পারে সদকায়ে জারিয়া
          </p>
        </div>

        <div className="p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            
            {/* 1. Basic Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-charcoal font-hind-siliguri border-b border-charcoal/10 pb-2">
                ১. আপনার তথ্য
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2 font-noto-sans-bengali">আপনার নাম</label>
                  <input {...register("name")} className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-alert bg-red-alert/5' : 'border-charcoal/20 bg-charcoal/5'} focus:outline-none focus:ring-2 focus:ring-gold-royal transition-all`} placeholder="আপনার পুরো নাম" />
                  {errors.name && <p className="text-red-alert text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2 font-noto-sans-bengali">ইমেইল ঠিকানা</label>
                  <input {...register("email")} className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-alert bg-red-alert/5' : 'border-charcoal/20 bg-charcoal/5'} focus:outline-none focus:ring-2 focus:ring-gold-royal transition-all`} placeholder="example@email.com" type="email" />
                  {errors.email && <p className="text-red-alert text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-charcoal mb-2 font-noto-sans-bengali">মোবাইল নম্বর</label>
                  <input {...register("phone")} className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-alert bg-red-alert/5' : 'border-charcoal/20 bg-charcoal/5'} focus:outline-none focus:ring-2 focus:ring-gold-royal transition-all`} placeholder="01XXXXXXXXX" type="tel" />
                  {errors.phone && <p className="text-red-alert text-sm mt-1">{errors.phone.message}</p>}
                </div>
              </div>
            </div>

            {/* 2. Recipient Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-charcoal font-hind-siliguri border-b border-charcoal/10 pb-2">
                ২. প্রাপকের তথ্য
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2 font-noto-sans-bengali">প্রাপকের নাম</label>
                  <input {...register("recipientName")} className={`w-full px-4 py-3 rounded-xl border ${errors.recipientName ? 'border-red-alert bg-red-alert/5' : 'border-charcoal/20 bg-charcoal/5'} focus:outline-none focus:ring-2 focus:ring-gold-royal transition-all`} placeholder="যার জন্য কিনছেন" />
                  {errors.recipientName && <p className="text-red-alert text-sm mt-1">{errors.recipientName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2 font-noto-sans-bengali">প্রাপকের ইমেইল</label>
                  <input {...register("recipientEmail")} className={`w-full px-4 py-3 rounded-xl border ${errors.recipientEmail ? 'border-red-alert bg-red-alert/5' : 'border-charcoal/20 bg-charcoal/5'} focus:outline-none focus:ring-2 focus:ring-gold-royal transition-all`} placeholder="প্রাপকের ইমেইল" type="email" />
                  {errors.recipientEmail && <p className="text-red-alert text-sm mt-1">{errors.recipientEmail.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-charcoal mb-2 font-noto-sans-bengali">বিশেষ বার্তা (ঐচ্ছিক)</label>
                  <textarea {...register("message")} className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-alert bg-red-alert/5' : 'border-charcoal/20 bg-charcoal/5'} focus:outline-none focus:ring-2 focus:ring-gold-royal transition-all min-h-[100px]`} placeholder="তাকে উৎসাহিত করতে কিছু লিখুন..." />
                  {errors.message && <p className="text-red-alert text-sm mt-1">{errors.message.message}</p>}
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="bg-charcoal/5 p-6 rounded-2xl border border-charcoal/10">
              <h3 className="text-sm font-bold text-charcoal/60 mb-4 uppercase tracking-wider">ইমেইল প্রিভিউ</h3>
              <div className="bg-white-pure p-6 rounded-xl border border-charcoal/5 shadow-sm">
                <p className="text-lg font-bold text-charcoal mb-4">প্রিয় {recipientName},</p>
                <p className="text-charcoal/80 mb-4 italic border-l-4 border-gold-royal pl-4">{customMessage}</p>
                <p className="text-charcoal/80">আপনার জন্য ৩টি অ্যাপ উপহার হিসেবে পাঠানো হয়েছে। নিচে ক্লিক করে ডাউনলোড করুন।</p>
              </div>
            </div>

            {/* 3. Payment */}
            <div className="space-y-6 pt-4">
              <h2 className="text-2xl font-bold text-charcoal font-hind-siliguri border-b border-charcoal/10 pb-2">
                ৩. পেমেন্ট করুন
              </h2>
              <div className="flex gap-4 mb-6">
                <button type="button" onClick={() => setPaymentMethod("bkash")} className={`flex-1 py-4 rounded-xl font-bold transition-all ${paymentMethod === "bkash" ? "bg-[#E2136E] text-white-pure shadow-lg scale-105" : "bg-charcoal/5 text-charcoal/60"}`}>bKash</button>
                <button type="button" onClick={() => setPaymentMethod("nagad")} className={`flex-1 py-4 rounded-xl font-bold transition-all ${paymentMethod === "nagad" ? "bg-[#ED1C24] text-white-pure shadow-lg scale-105" : "bg-charcoal/5 text-charcoal/60"}`}>Nagad</button>
              </div>
              <div className="bg-charcoal/5 p-6 rounded-xl border border-charcoal/10">
                <ol className="space-y-4 font-noto-sans-bengali text-lg text-charcoal/90">
                  <li className="flex gap-4"><span className="font-bold text-gold-royal">১.</span> <span>আপনার {paymentMethod === "bkash" ? "বিকাশ" : "নগদ"} অ্যাপে যান।</span></li>
                  <li className="flex gap-4"><span className="font-bold text-gold-royal">২.</span> <span><strong className="text-xl block my-1">017XXXXXXXX</strong> এই নম্বরে <strong>Send Money</strong> করুন।</span></li>
                  <li className="flex gap-4"><span className="font-bold text-gold-royal">৩.</span> <span>অ্যামাউন্ট দিন: <strong>৳৩৬৯</strong></span></li>
                </ol>
              </div>
              <div>
                <label className="block text-sm font-bold text-charcoal mb-2 font-noto-sans-bengali">Transaction ID (TrxID)</label>
                <input {...register("trxId")} className={`w-full px-4 py-3 rounded-xl border ${errors.trxId ? 'border-red-alert bg-red-alert/5' : 'border-charcoal/20 bg-charcoal/5'} focus:outline-none focus:ring-2 focus:ring-gold-royal transition-all uppercase`} placeholder="e.g. 9E5BXXXXXXXX" />
                {errors.trxId && <p className="text-red-alert text-sm mt-1">{errors.trxId.message}</p>}
              </div>
            </div>

            {/* 4. Submit */}
            <div className="pt-8 border-t border-charcoal/10 text-center">
              <button type="submit" disabled={isSubmitting} className={`w-full py-4 rounded-xl font-bold text-lg text-charcoal font-noto-sans-bengali transition-all shadow-lg hover:-translate-y-1 ${isSubmitting ? 'bg-gold-royal/50 cursor-not-allowed' : 'bg-gold-royal hover:shadow-gold-royal/30'}`}>
                {isSubmitting ? "প্রসেস হচ্ছে..." : "উপহার পাঠান"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
