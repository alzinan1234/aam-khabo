'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/languageContext';
import { ArrowRight, Clock } from 'lucide-react';

export default function OfferBanner() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({ h: 11, m: 45, s: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="section-padding bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* RIPE MANGO OFFER */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF8E7] via-[#FFF3CC] to-[#FFE066] p-8 group cursor-pointer">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFC324]/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute -bottom-8 -right-8 text-[120px] opacity-20 group-hover:opacity-30 transition-opacity group-hover:scale-110 transform duration-500">🥭</div>
            
            <div className="relative">
              <span className="inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                {t('Limited Time', 'সীমিত সময়')}
              </span>
              <h3 className="font-display text-3xl font-bold text-gray-900 mb-2 bengali-text">
                {t('Ripe Mango Special', 'পাকা আমের স্পেশাল')}
              </h3>
              <p className="text-gray-600 mb-4 text-sm bengali-text">
                {t('Up to 25% off on all Himsagar & Langra varieties', 'হিমসাগর ও ল্যাংড়া আমে ২৫% পর্যন্ত ছাড়')}
              </p>
              
              {/* COUNTDOWN */}
              <div className="flex items-center gap-3 mb-6">
                <Clock size={16} className="text-[#CC9600]" />
                <div className="flex gap-2">
                  {[timeLeft.h, timeLeft.m, timeLeft.s].map((val, i) => (
                    <React.Fragment key={i}>
                      <div className="bg-gray-900 text-[#FFC324] rounded-xl px-3 py-2 text-center min-w-[48px]">
                        <div className="text-xl font-bold font-display leading-none">{pad(val)}</div>
                        <div className="text-[9px] opacity-60 mt-1">{['HRS','MIN','SEC'][i]}</div>
                      </div>
                      {i < 2 && <span className="text-gray-900 font-bold text-xl self-center">:</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <Link href="/products?category=ripe" className="inline-flex items-center gap-2 btn-primary px-6 py-3 rounded-xl text-sm font-bold">
                {t('Shop Now', 'এখনই কিনুন')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* RAW MANGO OFFER */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E8F5E9] via-[#C8E6C9] to-[#A5D6A7] p-8 group cursor-pointer">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#4A7C59]/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute -bottom-8 -right-8 text-[120px] opacity-20 group-hover:opacity-30 transition-opacity group-hover:scale-110 transform duration-500">🌿</div>

            <div className="relative">
              <span className="inline-block bg-[#2D5A3D] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                {t('New Arrival', 'নতুন এসেছে')}
              </span>
              <h3 className="font-display text-3xl font-bold text-gray-900 mb-2 bengali-text">
                {t('Raw Mango Season', 'কাঁচা আমের মৌসুম')}
              </h3>
              <p className="text-gray-700 mb-4 text-sm bengali-text">
                {t('Fresh, tangy & perfect for pickles and cooking', 'তাজা, টক ও আচার-রান্নার জন্য আদর্শ')}
              </p>

              <div className="flex gap-3 mb-6">
                {['আচার', 'চাটনি', 'ডাল', 'ভর্তা'].map((tag) => (
                  <span key={tag} className="text-xs bg-white/60 text-[#2D5A3D] font-semibold px-2.5 py-1 rounded-full bengali-text">
                    {tag}
                  </span>
                ))}
              </div>

              <Link href="/products?category=raw" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#2D5A3D] text-white hover:bg-[#4A7C59] transition-colors">
                {t('Explore Raw Mangoes', 'কাঁচা আম দেখুন')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
