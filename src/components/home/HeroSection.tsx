'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/languageContext';
import { ArrowRight, ShieldCheck, Truck, Star, ChevronLeft, ChevronRight, TrendingUp, Award, Clock } from 'lucide-react';

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

const heroSlides = [
  {
    id: 1,
    title_en: "Bangladesh's Finest Mangoes",
    title_bn: 'বাংলাদেশের সেরা আম',
    subtitle_en: 'Delivered Fresh',
    subtitle_bn: 'আপনার দরজায়',
    description_en: 'Hand-picked Himsagar, Langra, Fazli and more — straight from the legendary orchards of Rajshahi and Chapai Nawabganj.',
    description_bn: 'হাতে বাছাই করা হিমসাগর, ল্যাংড়া, ফজলি এবং আরও অনেক — রাজশাহী ও চাঁপাইনবাবগঞ্জের বিখ্যাত বাগান থেকে সরাসরি।',
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&h=600&fit=crop',
    price: '580',
    rating: 4.9,
    variety: 'Himsagar',
    region_en: 'Rajshahi',
    region_bn: 'রাজশাহী',
    badge: 'Premium',
    bgGradient: 'from-[#FFF8E7] to-[#FFE4B5]',
  },
  {
    id: 2,
    title_en: 'Sweet & Juicy Langra',
    title_bn: 'মিষ্টি ও রসালো ল্যাংড়া',
    subtitle_en: 'King of Mangoes',
    subtitle_bn: 'আমের রাজা',
    description_en: 'Our signature Langra mangoes are known for their unique sweet taste and fiberless texture. Perfect for everyone!',
    description_bn: 'আমাদের সিগনেচার ল্যাংড়া আম তাদের অনন্য মিষ্টি স্বাদ এবং আঁশহীন টেক্সচারের জন্য পরিচিত। সবার জন্য উপযুক্ত!',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=600&fit=crop',
    price: '550',
    rating: 4.8,
    variety: 'Langra',
    region_en: 'Chapai Nawabganj',
    region_bn: 'চাঁপাইনবাবগঞ্জ',
    badge: 'Bestseller',
    bgGradient: 'from-[#E8F5E9] to-[#C8E6C9]',
  },
  {
    id: 3,
    title_en: 'Royal Fazli',
    title_bn: 'রoyal ফজলি',
    subtitle_en: 'The Giant Mango',
    subtitle_bn: 'দৈত্যাকার আম',
    description_en: 'Experience the royal taste of Fazli mangoes - large in size, rich in flavor, and absolutely delicious!',
    description_bn: 'ফজলি আমের রাজকীয় স্বাদ অনুভব করুন - আকারে বড়, স্বাদে সমৃদ্ধ এবং একেবারে সুস্বাদু!',
    image: 'https://media.istockphoto.com/id/1154538189/photo/raw-green-mangoes-hanging-in-bunch-on-tree.jpg?s=612x612&w=0&k=20&c=tNMNGi8n3px8IU3FARvNJzNSNJo7laycWNOaHSu9EOw=',
    price: '620',
    rating: 4.9,
    variety: 'Fazli',
    region_en: 'Rajshahi',
    region_bn: 'রাজশাহী',
    badge: 'Royal',
    bgGradient: 'from-[#FFF3E0] to-[#FFE0B2]',
  },
  {
    id: 4,
    title_en: 'Organic Himsagar',
    title_bn: 'অর্গানিক হিমসাগর',
    subtitle_en: 'Pure & Natural',
    subtitle_bn: 'শুদ্ধ ও প্রাকৃতিক',
    description_en: 'The most sought-after mango variety with an unmatched aroma and melt-in-mouth texture. 100% organic!',
    description_bn: 'সবচেয়ে চাওয়া-পাওয়া আমের জাত যার অতুলনীয় সুগন্ধ এবং মুখে গলে যাওয়া টেক্সচার। ১০০% অর্গানিক!',
    image: 'https://t4.ftcdn.net/jpg/00/14/71/15/360_F_14711535_o3MgCpenxtKxNX5bw3iAzfoUfWBAKLuy.jpg',
    price: '650',
    rating: 5.0,
    variety: 'Himsagar',
    region_en: 'Kushtia',
    region_bn: 'কুষ্টিয়া',
    badge: 'Organic',
    bgGradient: 'from-[#F1F8E9] to-[#DCEDC8]',
  },
];

export default function HeroSection() {
  const { t, language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
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
  }, [currentSlide]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const minSwipeDistance = 50;
    if (touchStart - touchEnd > minSwipeDistance) {
      nextSlide();
    }
    if (touchEnd - touchStart > minSwipeDistance) {
      prevSlide();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* BACKGROUND GRADIENT - Dynamic based on slide */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-1000">
        <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} opacity-30`} />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#FFF8E7] rounded-full blur-3xl opacity-80 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#E8F5E9] rounded-full blur-3xl opacity-60 translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFC324]/5 rounded-full blur-3xl" />
      </div>

      {/* FLOATING EMOJI ELEMENTS */}
      {floatingElements.map((el, i) => (
        <div
          key={i}
          className={`absolute hidden xl:block ${el.size} select-none pointer-events-none z-0`}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-12 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
            {/* BADGE */}
            <div className="hero-animate inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-[#FFC324]/30 rounded-full text-sm font-medium text-[#CC9600] mb-6 shadow-sm">
              <span className="w-2 h-2 bg-[#FFC324] rounded-full animate-pulse" />
              <span className="bengali-text text-xs sm:text-sm">
                {t('Mango Season 2024 is Here!', 'আমের মৌসুম ২০২৪ শুরু হয়েছে!')}
              </span>
            </div>

            {/* SLIDE TITLE */}
            <div className="hero-animate">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 leading-tight">
                {language === 'bn' ? (
                  <>
                    <span className="bengali-text">{slide.title_bn}</span>
                    <br />
                    <span className="text-gradient-mango bengali-text">{slide.subtitle_bn}</span>
                  </>
                ) : (
                  <>
                    {slide.title_en}
                    <br />
                    <span className="text-gradient-mango">{slide.subtitle_en}</span>
                  </>
                )}
              </h1>
            </div>

            {/* SUBTEXT */}
            <p className="hero-animate text-base sm:text-lg text-gray-500 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed bengali-text">
              {t(slide.description_en, slide.description_bn)}
            </p>

            {/* PRICE & RATING */}
            <div className="hero-animate flex flex-wrap gap-4 justify-center lg:justify-start mb-6">
              <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-[#FFC324]" fill="#FFC324" />
                  <span className="font-bold text-gray-900">{slide.rating}</span>
                  <span className="text-xs text-gray-500">(1,200+ reviews)</span>
                </div>
                <div className="w-px h-4 bg-gray-200" />
                <div>
                  <span className="text-xs text-gray-500 bengali-text">{t('Starting from', 'শুরু মাত্র')}</span>
                  <span className="font-bold text-gray-900 ml-1">৳{slide.price}</span>
                  <span className="text-xs text-gray-500">/kg</span>
                </div>
              </div>
            </div>

            {/* CTA BUTTONS */}
            <div className="hero-animate flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <Link
                href="/products"
                className="btn-primary inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold rounded-2xl transition-all hover:scale-105"
              >
                {t('Shop Fresh Mangoes', 'তাজা আম কিনুন')}
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/products?category=ripe"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-2xl border-2 border-gray-200 text-gray-700 hover:border-[#FFC324] hover:text-[#CC9600] hover:bg-[#FFF8E7] transition-all bengali-text"
              >
                {t('View Categories', 'ক্যাটাগরি দেখুন')}
              </Link>
            </div>

            {/* TRUST BADGES */}
            <div className="hero-animate flex flex-wrap gap-4 justify-center lg:justify-start">
              {trustBadges.map(({ icon: Icon, en, bn, color }) => (
                <div key={en} className="flex items-center gap-2 text-sm text-gray-600 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <Icon size={14} style={{ color }} />
                  </div>
                  <span className="font-medium text-xs sm:text-sm bengali-text">{t(en, bn)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - SLIDER CONTENT */}
          <div className="relative flex items-center justify-center">
            {/* GLOW BACKGROUND */}
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-[#FFC324]/30 to-[#FF8C00]/20 rounded-full blur-3xl animate-pulse-glow" />

            {/* MAIN MANGO CARD - Animated */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[480px] lg:h-[480px] transition-all duration-500">
              {/* ORBITING CIRCLES */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#FFC324]/20 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-[#4A7C59]/10" />
              <div className="absolute inset-8 rounded-full border border-[#FFC324]/10 animate-spin-slow" style={{ animationDirection: 'reverse' }} />

              {/* CENTER MANGO IMAGE */}
              <div className="absolute inset-10 rounded-3xl overflow-hidden shadow-2xl mango-3d transition-all duration-700">
                <Image
                  src={slide.image}
                  alt={slide.variety}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 480px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* BADGE ON IMAGE */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-[#FFC324] to-[#FF8C00] text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  {t(slide.badge, slide.badge === 'Premium' ? 'প্রিমিয়াম' : slide.badge === 'Bestseller' ? 'বেস্টসেলার' : slide.badge === 'Royal' ? 'রাজকীয়' : 'অর্গানিক')}
                </div>
              </div>

              {/* FLOATING INFO CARDS */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 animate-float-slow z-20">
                <div className="w-8 h-8 bg-[#FFF8E7] rounded-xl flex items-center justify-center text-lg">🏆</div>
                <div>
                  <p className="text-xs font-bold text-gray-900">{slide.variety}</p>
                  <p className="text-[10px] text-[#4A7C59] bengali-text font-medium">{t(slide.region_en, slide.region_bn)}</p>
                </div>
              </div>

              <div className="absolute -bottom-2 -left-6 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 animate-float z-20" style={{ animationDelay: '1s' }}>
                <div className="w-8 h-8 bg-[#E8F5E9] rounded-xl flex items-center justify-center">
                  <Star size={14} className="text-[#FFC324]" fill="#FFC324" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">{slide.rating} / 5.0</p>
                  <p className="text-[10px] text-gray-500 bengali-text">১২০০+ রিভিউ</p>
                </div>
              </div>

              <div className="absolute top-1/2 -left-10 -translate-y-1/2 bg-gradient-to-br from-[#FFC324] to-[#FF8C00] rounded-2xl shadow-xl p-3 text-white animate-bounce-soft z-20 hidden sm:block">
                <p className="text-xs font-bold">৳{slide.price}</p>
                <p className="text-[10px] opacity-80 bengali-text">প্রতি কেজি</p>
              </div>
            </div>

            {/* SLIDER CONTROLS - DOTS */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === idx
                      ? 'w-8 h-2 bg-gradient-to-r from-[#FFC324] to-[#FF8C00]'
                      : 'w-2 h-2 bg-gray-300 hover:bg-[#FFC324]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* NAVIGATION ARROWS */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 hover:scale-110 z-20 -ml-4 sm:-ml-6"
              aria-label="Previous"
            >
              <ChevronLeft size={20} className="text-gray-700 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 hover:scale-110 z-20 -mr-4 sm:-mr-6"
              aria-label="Next"
            >
              <ChevronRight size={20} className="text-gray-700 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#1A1A1A] to-[#2D5A3D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center text-white">
            {[
              { icon: TrendingUp, en: '50,000+', bn: '৫০,০০০+', label_en: 'Happy Customers', label_bn: 'সন্তুষ্ট গ্রাহক' },
              { icon: Award, en: '12+', bn: '১২+', label_en: 'Mango Varieties', label_bn: 'আমের জাত' },
              { icon: ShieldCheck, en: '100%', bn: '১০০%', label_en: 'Chemical Free', label_bn: 'কেমিক্যাল মুক্ত' },
              { icon: Clock, en: '24hrs', bn: '২৪ ঘণ্টা', label_en: 'Fast Delivery', label_bn: 'দ্রুত ডেলিভারি' },
            ].map((stat, idx) => (
              <div key={idx} className="group cursor-pointer">
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFC324] mx-auto mb-1 opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-[#FFC324] bengali-text">
                  {t(stat.en, stat.bn)}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 bengali-text">
                  {t(stat.label_en, stat.label_bn)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(-50%) translateY(0px); }
          50% { transform: translateY(-50%) translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
        .animate-bounce-soft {
          animation: bounce-soft 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        .text-gradient-mango {
          background: linear-gradient(135deg, #FFC324 0%, #FF8C00 50%, #FF6F00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .mango-3d {
          transform: perspective(1000px) rotateY(0deg);
          transition: transform 0.5s ease;
        }
        .mango-3d:hover {
          transform: perspective(1000px) rotateY(5deg) rotateX(5deg);
        }
        .btn-primary {
          background: linear-gradient(135deg, #FFC324 0%, #FF8C00 100%);
          color: #1A1A1A;
          box-shadow: 0 10px 20px -5px rgba(255, 140, 0, 0.3);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(255, 140, 0, 0.4);
        }
      `}</style>
    </section>
  );
}