'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/languageContext';
import { ArrowRight, ShieldCheck, Truck, Star } from 'lucide-react';

const floatingElements = [
  { emoji: '🥭', size: 'text-6xl', top: '15%', left: '8%', delay: '0s', duration: '6s' },
  { emoji: '🌿', size: 'text-4xl', top: '70%', left: '5%', delay: '1s', duration: '7s' },
  { emoji: '🥭', size: 'text-3xl', top: '25%', right: '6%', delay: '2s', duration: '5s' },
  { emoji: '⭐', size: 'text-2xl', top: '80%', right: '10%', delay: '0.5s', duration: '8s' },
  { emoji: '🌱', size: 'text-5xl', top: '55%', right: '4%', delay: '1.5s', duration: '6.5s' },
];

const trustBadges = [
  { icon: ShieldCheck, en: '100% Organic', bn: '১০০% অর্গানিক', color: '#4A7C59' },
  { icon: Truck, en: 'Fast Delivery', bn: 'দ্রুত ডেলিভারি', color: '#FFC324' },
  { icon: Star, en: '4.9 Rated', bn: '৪.৯ রেটিং', color: '#FF8C00' },
];

export default function HeroSection() {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero elements
    const elements = heroRef.current?.querySelectorAll('.hero-animate');
    elements?.forEach((el, i) => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(30px)';
      setTimeout(() => {
        (el as HTMLElement).style.transition = 'all 0.8s cubic-bezier(0.4,0,0.2,1)';
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'translateY(0)';
      }, i * 150);
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-white"
    >
      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#FFF8E7] rounded-full blur-3xl opacity-80 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#E8F5E9] rounded-full blur-3xl opacity-60 translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFC324]/5 rounded-full blur-3xl" />
      </div>

      {/* FLOATING EMOJI ELEMENTS */}
      {floatingElements.map((el, i) => (
        <div
          key={i}
          className={`absolute hidden lg:block ${el.size} select-none pointer-events-none`}
          style={{
            top: el.top,
            left: (el as any).left,
            right: (el as any).right,
            animationDelay: el.delay,
            animationDuration: el.duration,
            animation: `float ${el.duration} ease-in-out ${el.delay} infinite`,
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
          }}
        >
          {el.emoji}
        </div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
            {/* BADGE */}
            <div className="hero-animate inline-flex items-center gap-2 px-4 py-2 bg-[#FFF8E7] border border-[#FFC324]/30 rounded-full text-sm font-medium text-[#CC9600] mb-6">
              <span className="w-2 h-2 bg-[#FFC324] rounded-full animate-pulse" />
              <span className="bengali-text">
                {t('Mango Season 2024 is Here!', 'আমের মৌসুম ২০২৪ শুরু হয়েছে!')}
              </span>
            </div>

            {/* HEADLINE */}
            <h1 className="hero-animate font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {language === 'bn' ? (
                <>
                  <span className="bengali-text">বাংলাদেশের</span>
                  <br />
                  <span className="text-gradient-mango bengali-text">সেরা আম</span>
                  <br />
                  <span className="bengali-text">আপনার দরজায়</span>
                </>
              ) : (
                <>
                  Bangladesh's
                  <br />
                  <span className="text-gradient-mango">Finest Mangoes</span>
                  <br />
                  Delivered Fresh
                </>
              )}
            </h1>

            {/* SUBTEXT */}
            <p className="hero-animate text-lg text-gray-500 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed bengali-text">
              {t(
                'Hand-picked Himsagar, Langra, Fazli and more — straight from the legendary orchards of Rajshahi and Chapai Nawabganj.',
                'হাতে বাছাই করা হিমসাগর, ল্যাংড়া, ফজলি এবং আরও অনেক — রাজশাহী ও চাঁপাইনবাবগঞ্জের বিখ্যাত বাগান থেকে সরাসরি।'
              )}
            </p>

            {/* CTA BUTTONS */}
            <div className="hero-animate flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
              <Link
                href="/products"
                className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-2xl"
              >
                {t('Shop Fresh Mangoes', 'তাজা আম কিনুন')}
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/products?category=ripe"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-2xl border-2 border-gray-200 text-gray-700 hover:border-[#FFC324] hover:text-[#CC9600] hover:bg-[#FFF8E7] transition-all bengali-text"
              >
                {t('View Categories', 'ক্যাটাগরি দেখুন')}
              </Link>
            </div>

            {/* TRUST BADGES */}
            <div className="hero-animate flex flex-wrap gap-4 justify-center lg:justify-start">
              {trustBadges.map(({ icon: Icon, en, bn, color }) => (
                <div key={en} className="flex items-center gap-2 text-sm text-gray-600">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <span className="font-medium bengali-text">{t(en, bn)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - 3D VISUAL */}
          <div className="relative flex items-center justify-center">
            {/* GLOW BACKGROUND */}
            <div className="absolute w-80 h-80 bg-gradient-to-br from-[#FFC324]/30 to-[#FF8C00]/20 rounded-full blur-3xl animate-pulse-glow" />

            {/* MAIN MANGO CARD */}
            <div className="relative w-80 h-80 sm:w-96 sm:h-96">
              {/* ORBITING CIRCLES */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#FFC324]/20 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-[#4A7C59]/10" />

              {/* CENTER MANGO IMAGE */}
              <div className="absolute inset-8 rounded-3xl overflow-hidden shadow-2xl mango-3d">
                <img
                  src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600"
                  alt="Premium Mango"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFC324]/30 to-transparent" />
              </div>

              {/* FLOATING INFO CARDS */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 animate-float-slow">
                <div className="w-8 h-8 bg-[#FFF8E7] rounded-xl flex items-center justify-center text-lg">🏆</div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Himsagar</p>
                  <p className="text-[10px] text-[#4A7C59] bengali-text font-medium">রাজশাহীর সেরা</p>
                </div>
              </div>

              <div className="absolute -bottom-2 -left-6 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 animate-float" style={{ animationDelay: '1s' }}>
                <div className="w-8 h-8 bg-[#E8F5E9] rounded-xl flex items-center justify-center">
                  <Star size={14} className="text-[#FFC324]" fill="#FFC324" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">4.9 / 5.0</p>
                  <p className="text-[10px] text-gray-500 bengali-text">১২০০+ রিভিউ</p>
                </div>
              </div>

              <div className="absolute top-1/2 -left-10 -translate-y-1/2 bg-gradient-to-br from-[#FFC324] to-[#FF8C00] rounded-2xl shadow-xl p-3 text-white animate-bounce-soft">
                <p className="text-xs font-bold">৳580</p>
                <p className="text-[10px] opacity-80 bengali-text">প্রতি কেজি</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#1A1A1A] to-[#2D5A3D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { en: '50,000+', bn: '৫০,০০০+', label_en: 'Happy Customers', label_bn: 'সন্তুষ্ট গ্রাহক' },
              { en: '12+', bn: '১২+', label_en: 'Mango Varieties', label_bn: 'আমের জাত' },
              { en: '100%', bn: '১০০%', label_en: 'Chemical Free', label_bn: 'কেমিক্যাল মুক্ত' },
              { en: '24hrs', bn: '২৪ ঘণ্টা', label_en: 'Fast Delivery', label_bn: 'দ্রুত ডেলিভারি' },
            ].map((stat) => (
              <div key={stat.en}>
                <div className="text-2xl md:text-3xl font-display font-bold text-[#FFC324] bengali-text">
                  {t(stat.en, stat.bn)}
                </div>
                <div className="text-xs text-gray-400 mt-1 bengali-text">
                  {t(stat.label_en, stat.label_bn)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
