'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/languageContext';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  {
    id: 'ripe',
    en: 'Ripe Mango',
    bn: 'পাকা আম',
    desc_en: 'Sweet & juicy, hand-picked at peak ripeness',
    desc_bn: 'মিষ্টি ও রসালো, সেরা পাকা অবস্থায় বাছাই',
    image: 'https://t4.ftcdn.net/jpg/00/14/71/15/360_F_14711535_o3MgCpenxtKxNX5bw3iAzfoUfWBAKLuy.jpg',
    color: '#FFC324',
    href: '/products?category=ripe',
    count: '8 varieties',
  },
  {
    id: 'raw',
    en: 'Raw Mango',
    bn: 'কাঁচা আম',
    desc_en: 'Fresh & tangy for cooking and pickles',
    desc_bn: 'রান্না ও আচারের জন্য তাজা টক আম',
    image: 'https://media.istockphoto.com/id/1154538189/photo/raw-green-mangoes-hanging-in-bunch-on-tree.jpg?s=612x612&w=0&k=20&c=tNMNGi8n3px8IU3FARvNJzNSNJo7laycWNOaHSu9EOw=',
    color: '#4A7C59',
    href: '/products?category=raw',
    count: '4 varieties',
  },
  {
    id: 'dried',
    en: 'Dried Mango',
    bn: 'শুকনো আম',
    desc_en: 'Healthy snacks, no added sugar',
    desc_bn: 'স্বাস্থ্যকর স্ন্যাক, চিনি ছাড়া',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRytg6qeikgY-eUUOiThQ3aHZg72XzGV4aakw&s',
    color: '#FF8C00',
    href: '/products?category=dried',
    count: '3 types',
  },
  {
    id: 'juice',
    en: 'Mango Juice',
    bn: 'আমের জুস',
    desc_en: 'Pure 100% natural mango juice',
    desc_bn: '১০০% প্রাকৃতিক আমের রস',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=800',
    color: '#FFB347',
    href: '/products?category=juice',
    count: '5 flavors',
  },
  {
    id: 'pickle',
    en: 'Pickle & Achar',
    bn: 'আচার',
    desc_en: 'Traditional Bengali mango pickles',
    desc_bn: 'ঐতিহ্যবাহী বাংলা আমের আচার',
    image: 'https://www.shajgoj.com/wp-content/uploads/2016/04/mango.jpg',
    color: '#8B4513',
    href: '/products?category=pickle',
    count: '6 varieties',
  },
  {
    id: 'candy',
    en: 'Mango Candy',
    bn: 'আমের ক্যান্ডি',
    desc_en: 'Chewy & delicious mango candy',
    desc_bn: 'মজাদার চুইংগামি আমের ক্যান্ডি',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOE9VaJxuQSeksvV5zdfgnnYiurYM_GQQLFw&s',
    color: '#E91E63',
    href: '/products?category=candy',
    count: '4 types',
  },
  {
    id: 'powder',
    en: 'Mango Powder',
    bn: 'আমের পাউডার',
    desc_en: 'Amchur powder for cooking',
    desc_bn: 'রান্নার জন্য আমচুর পাউডার',
    image: 'https://organiconline.com.bd/wp-content/uploads/2018/11/protein-powder-600x600.webp',
    color: '#9C27B0',
    href: '/products?category=powder',
    count: '2 types',
  },
  {
    id: 'shake',
    en: 'Mango Shake',
    bn: 'ম্যাঙ্গো শেক',
    desc_en: 'Thick creamy milkshake',
    desc_bn: 'ঘন ক্রিমি মিল্কশেক',
    image: 'https://images.unsplash.com/photo-1571006682881-229202573229?auto=format&fit=crop&q=80&w=800',
    color: '#1565C0',
    href: '/products?category=shake',
    count: '3 flavors',
  },
  {
    id: 'chutney',
    en: 'Mango Chutney',
    bn: 'আমের চাটনি',
    desc_en: 'Sweet & spicy Bengali-style',
    desc_bn: 'মিষ্টি-ঝাল বাংলা স্টাইল',
    image: 'https://www.daringgourmet.com/wp-content/uploads/2013/03/Mango-Chutney-2-square-edit-scaled.jpg',
    color: '#D84315',
    href: '/products?category=chutney',
    count: '5 varieties',
  },
  {
    id: 'gift',
    en: 'Gift Boxes',
    bn: 'গিফট বক্স',
    desc_en: 'Premium mango gift hampers',
    desc_bn: 'প্রিমিয়াম আমের গিফট হ্যাম্পার',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800',
    color: '#3949AB',
    href: '/products?category=gift',
    count: '4 sets',
  },
];

export default function CategorySlider() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [windowWidth, setWindowWidth] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (width < 640) setItemsToShow(2);
      else if (width < 768) setItemsToShow(3);
      else if (width < 1024) setItemsToShow(4);
      else setItemsToShow(5);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality - always on
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = categories.length - itemsToShow;
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [itemsToShow]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const maxIndex = categories.length - itemsToShow;
      if (prev >= maxIndex) {
        return 0;
      }
      return prev + 1;
    });
  }, [itemsToShow]);

  const goToSlide = useCallback((index: number) => {
    const maxIndex = categories.length - itemsToShow;
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
  }, [itemsToShow]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchEndX.current - touchStartX.current;
    const minSwipeDistance = 50; // Minimum distance for swipe

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && currentIndex > 0) {
        // Swipe right - go to previous
        handlePrev();
      } else if (swipeDistance < 0 && currentIndex < categories.length - itemsToShow) {
        // Swipe left - go to next
        handleNext();
      }
    }

    // Reset touch positions
    touchStartX.current = 0;
    touchEndX.current = 0;
  };
  const totalSlides = categories.length - itemsToShow + 1;
  const cardWidth = windowWidth > 0 ? 100 / itemsToShow : 33.33;

  return (
    <section
      className="py-16 md:py-24 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FEF9E7 0%, #FFFFFF 100%)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#FFC324]/30 px-5 py-2 mb-5 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFC324] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFC324]"></span>
            </span>
            <span className="text-sm font-semibold text-[#CC9600] tracking-wide uppercase">
              {t('Premium Collection', 'প্রিমিয়াম কালেকশন')}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gray-900">{t('Explore Our ', 'আমাদের ')}</span>
            <span className="bg-gradient-to-r from-[#FFC324] via-[#FF8C00] to-[#FF6F00] bg-clip-text text-transparent">
              {t('Mango World', 'আমের বিশ্ব')}
            </span>
          </h2>
          
          <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg">
            {t(
              'Discover the finest mango products from Bangladesh',
              'বাংলাদেশের সেরা আমের পণ্য আবিষ্কার করুন'
            )}
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative group">
          {/* Slider Wrapper with touch events */}
          <div 
            className="overflow-hidden rounded-3xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * cardWidth}%)`,
                transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex-shrink-0 px-2 md:px-3"
                  style={{ width: `${cardWidth}%` }}
                >
                  <Link href={cat.href}>
                    <div className="group/card relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
                      {/* Image */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
                        <Image
                          src={cat.image}
                          alt={t(cat.en, cat.bn)}
                          fill
                          className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover/card:opacity-90 transition-all duration-500" />
                        
                        {/* Count Badge */}
                        <div 
                          className="absolute top-3 right-3 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-xs font-bold shadow-lg transform transition-all duration-300 group-hover/card:scale-105"
                          style={{ color: cat.color }}
                        >
                          {t(cat.count, cat.count)}
                        </div>
                        
                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform transition-transform duration-500">
                          <h3 className="text-lg md:text-xl font-bold mb-1 line-clamp-1">
                            {t(cat.en, cat.bn)}
                          </h3>
                          <p className="text-xs md:text-sm text-white/90 line-clamp-2 mb-3">
                            {t(cat.desc_en, cat.desc_bn)}
                          </p>
                          <div className="flex items-center gap-2 text-sm font-semibold group-hover/card:gap-3 transition-all duration-300">
                            <span>{t('Shop Now', 'কিনুন')}</span>
                            <ArrowRight size={16} className="transition-transform duration-300 group-hover/card:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - hide on mobile, show on desktop */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-10 opacity-0 group-hover:opacity-100 hidden md:inline-flex"
              aria-label="Previous"
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>
          )}
          
          {currentIndex < categories.length - itemsToShow && (
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-10 opacity-0 group-hover:opacity-100 hidden md:inline-flex"
              aria-label="Next"
            >
              <ChevronRight size={24} className="text-gray-700" />
            </button>
          )}
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === idx
                  ? 'w-8 h-2 bg-gradient-to-r from-[#FFC324] to-[#FF8C00]'
                  : 'w-2 h-2 bg-gray-300 hover:bg-[#FFC324]'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}