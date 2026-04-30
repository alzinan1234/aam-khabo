'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/languageContext';
import { Sun, Leaf, Zap, Droplets, Package, ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'ripe',
    en: 'Ripe Mango',
    bn: 'পাকা আম',
    desc_en: 'Sweet & juicy, hand-picked at peak ripeness',
    desc_bn: 'মিষ্টি ও রসালো, সেরা পাকা অবস্থায় বাছাই করা',
    icon: Sun,
    emoji: '🥭',
    bg: 'from-[#FFF8E7] to-[#FFF0CC]',
    iconBg: '#FFC324',
    textColor: '#CC9600',
    href: '/products?category=ripe',
    count_en: '8 varieties',
    count_bn: '৮ রকম',
    featured: true,
  },
  {
    id: 'raw',
    en: 'Raw Mango',
    bn: 'কাঁচা আম',
    desc_en: 'Fresh & tangy for cooking and pickles',
    desc_bn: 'রান্না ও আচারের জন্য তাজা টক আম',
    icon: Leaf,
    emoji: '🌿',
    bg: 'from-[#E8F5E9] to-[#C8E6C9]',
    iconBg: '#4A7C59',
    textColor: '#2D5A3D',
    href: '/products?category=raw',
    count_en: '4 varieties',
    count_bn: '৪ রকম',
    featured: false,
  },
  {
    id: 'dried',
    en: 'Dried Mango',
    bn: 'শুকনো আম',
    desc_en: 'Healthy snacks, no added sugar',
    desc_bn: 'স্বাস্থ্যকর স্ন্যাক, চিনি ছাড়া',
    icon: Zap,
    emoji: '✨',
    bg: 'from-[#FFF3E0] to-[#FFE0B2]',
    iconBg: '#FF8C00',
    textColor: '#E65100',
    href: '/products?category=dried',
    count_en: '3 types',
    count_bn: '৩ রকম',
    featured: false,
  },
  {
    id: 'juice',
    en: 'Mango Juice',
    bn: 'আমের জুস',
    desc_en: 'Pure 100% natural mango juice',
    desc_bn: '১০০% প্রাকৃতিক আমের রস',
    icon: Droplets,
    emoji: '🧃',
    bg: 'from-[#FFF8E7] to-[#FFECB3]',
    iconBg: '#FFB347',
    textColor: '#FF6F00',
    href: '/products?category=juice',
    count_en: '5 flavors',
    count_bn: '৫ ফ্লেভার',
    featured: false,
  },
  {
    id: 'pickle',
    en: 'Pickle & Achar',
    bn: 'আচার',
    desc_en: 'Traditional Bengali mango pickles',
    desc_bn: 'ঐতিহ্যবাহী বাংলা আমের আচার',
    icon: Package,
    emoji: '🫙',
    bg: 'from-[#EFEBE9] to-[#D7CCC8]',
    iconBg: '#8B4513',
    textColor: '#5D4037',
    href: '/products?category=pickle',
    count_en: '6 varieties',
    count_bn: '৬ রকম',
    featured: false,
  },
];

export default function CategorySection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.cat-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-[#FAFAF7]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF8E7] rounded-full text-sm font-medium text-[#CC9600] mb-4 border border-[#FFC324]/20">
            <span className="w-2 h-2 bg-[#FFC324] rounded-full" />
            <span className="bengali-text">{t('Categories', 'ক্যাটাগরি')}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bengali-text">{t('Explore Our ', 'আমাদের ')}</span>
            <span className="text-gradient-mango bengali-text">{t('Mango Collection', 'আমের সংগ্রহ')}</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto bengali-text text-lg">
            {t(
              'From fresh ripe mangoes to pickles and juices — we have it all',
              'তাজা পাকা আম থেকে আচার এবং জুস — সব কিছুই আছে আমাদের কাছে'
            )}
          </p>
        </div>

        {/* CATEGORY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* FEATURED RIPE MANGO (large) */}
          <Link
            href={categories[0].href}
            className="cat-card sm:col-span-2 lg:col-span-1 lg:row-span-2 group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-[#FFF8E7] via-[#FFF3CC] to-[#FFE880] min-h-64 lg:min-h-auto flex flex-col justify-between cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
            style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)' }}
          >
            {/* BG GLOW */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFC324]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            
            <div>
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-500 inline-block">🥭</div>
              <span className="badge-ripe text-xs mb-3 inline-block">
                {t(categories[0].count_en, categories[0].count_bn)}
              </span>
              <h3 className="font-display text-3xl font-bold text-gray-900 mb-3 bengali-text">
                {t(categories[0].en, categories[0].bn)}
              </h3>
              <p className="text-gray-600 text-sm bengali-text leading-relaxed">
                {t(categories[0].desc_en, categories[0].desc_bn)}
              </p>
            </div>

            <div className="flex items-center gap-2 text-[#CC9600] font-semibold text-sm mt-6 group-hover:gap-4 transition-all bengali-text">
              {t('Shop Now', 'কিনুন')}
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          {/* OTHER CATEGORIES */}
          {categories.slice(1).map((cat, i) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`cat-card group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${cat.bg} flex flex-col justify-between min-h-40 cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-1`}
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                transition: `all 0.7s cubic-bezier(0.4,0,0.2,1) ${(i + 1) * 0.1}s`,
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {cat.emoji}
                  </div>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full inline-block mb-2"
                    style={{ backgroundColor: `${cat.iconBg}20`, color: cat.textColor }}
                  >
                    {t(cat.count_en, cat.count_bn)}
                  </span>
                  <h3 className="font-display text-xl font-bold text-gray-900 bengali-text">
                    {t(cat.en, cat.bn)}
                  </h3>
                  <p className="text-gray-600 text-xs mt-1 bengali-text">
                    {t(cat.desc_en, cat.desc_bn)}
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0"
                  style={{ backgroundColor: `${cat.iconBg}20` }}
                >
                  <cat.icon size={20} style={{ color: cat.iconBg }} />
                </div>
              </div>

              <div
                className="flex items-center gap-1 text-xs font-semibold mt-4 group-hover:gap-3 transition-all"
                style={{ color: cat.textColor }}
              >
                <span className="bengali-text">{t('Explore', 'দেখুন')}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
