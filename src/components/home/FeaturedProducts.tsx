'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/languageContext';
import { getFeaturedProducts, getBestsellerProducts, getNewProducts } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';
import { ArrowRight } from 'lucide-react';

const tabs = [
  { id: 'featured', en: 'Featured', bn: 'বিশেষ পণ্য' },
  { id: 'bestseller', en: 'Bestsellers', bn: 'বেস্টসেলার' },
  { id: 'new', en: 'New Arrivals', bn: 'নতুন' },
];

export default function FeaturedProducts() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('featured');

  const getProducts = () => {
    switch (activeTab) {
      case 'featured': return getFeaturedProducts().slice(0, 6);
      case 'bestseller': return getBestsellerProducts().slice(0, 6);
      case 'new': return getNewProducts().slice(0, 6);
      default: return getFeaturedProducts().slice(0, 6);
    }
  };

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F5E9] rounded-full text-xs font-medium text-[#2D5A3D] mb-3 border border-[#4A7C59]/20">
              <span className="w-1.5 h-1.5 bg-[#4A7C59] rounded-full" />
              <span className="bengali-text">{t('Our Products', 'আমাদের পণ্য')}</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
              <span className="bengali-text">{t('Fresh ', 'তাজা ')}</span>
              <span className="text-gradient-green bengali-text">{t('Mango Picks', 'আম বাছাই')}</span>
            </h2>
          </div>
          <Link href="/products" className="flex items-center gap-2 text-sm font-semibold text-[#CC9600] hover:gap-4 transition-all bengali-text shrink-0">
            {t('View All Products', 'সব পণ্য দেখুন')}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all bengali-text ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#FFC324] to-[#FF8C00] text-gray-900 shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t(tab.en, tab.bn)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {getProducts().map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#FFC324] text-[#CC9600] rounded-xl font-bold hover:bg-[#FFC324] hover:text-gray-900 transition-all bengali-text text-sm">
            {t('Explore All Mangoes', 'সব আম দেখুন')}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}