'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/lib/languageContext';
import { products } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';
import { MangoCategory, SortOption } from '@/types';
import { SlidersHorizontal, Search, X } from 'lucide-react';

const categories = [
  { id: 'all', en: 'All', bn: 'সব' },
  { id: 'ripe', en: 'Ripe Mango', bn: 'পাকা আম' },
  { id: 'raw', en: 'Raw Mango', bn: 'কাঁচা আম' },
  { id: 'dried', en: 'Dried', bn: 'শুকনো' },
  { id: 'juice', en: 'Juice', bn: 'জুস' },
  { id: 'pickle', en: 'Pickle', bn: 'আচার' },
];

const sortOptions = [
  { id: 'newest', en: 'Newest', bn: 'নতুন' },
  { id: 'price-low', en: 'Price: Low to High', bn: 'দাম: কম থেকে বেশি' },
  { id: 'price-high', en: 'Price: High to Low', bn: 'দাম: বেশি থেকে কম' },
  { id: 'rating', en: 'Top Rated', bn: 'সেরা রেটিং' },
  { id: 'popular', en: 'Most Popular', bn: 'সবচেয়ে জনপ্রিয়' },
];

export default function ProductsPage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as MangoCategory) || 'all';

  const [category, setCategory] = useState<MangoCategory>(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [search, setSearch] = useState('');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (category !== 'all') result = result.filter(p => p.category === category);
    if (organicOnly) result = result.filter(p => p.isOrganic);
    if (search) result = result.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.nameBn.includes(search)
    );
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'popular': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }
    return result;
  }, [category, sortBy, search, organicOnly]);

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* PAGE HEADER */}
      <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2D5A3D] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 bengali-text">
            {t('All ', 'সব ')}
            <span className="text-[#FFC324]">{t('Mango Products', 'আমের পণ্য')}</span>
          </h1>
          <p className="text-gray-400 bengali-text">
            {t('Discover our complete range of premium mango products', 'আমাদের প্রিমিয়াম আমের পণ্যের সম্পূর্ণ সংগ্রহ আবিষ্কার করুন')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* CONTROLS */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* SEARCH */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('Search mangoes...', 'আম খুঁজুন...')}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#FFC324] focus:ring-2 focus:ring-[#FFC324]/20 bengali-text"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            )}
          </div>

          {/* SORT */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortOption)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#FFC324] bengali-text cursor-pointer"
          >
            {sortOptions.map(opt => (
              <option key={opt.id} value={opt.id}>{t(opt.en, opt.bn)}</option>
            ))}
          </select>

          {/* FILTER TOGGLE */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors bengali-text ${
              showFilters ? 'bg-[#FFC324] text-gray-900' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#FFC324]'
            }`}
          >
            <SlidersHorizontal size={16} />
            {t('Filters', 'ফিল্টার')}
          </button>
        </div>

        {/* FILTER PANEL */}
        {showFilters && (
          <div className="bg-white rounded-2xl p-5 mb-6 border border-gray-100 shadow-sm">
            <label className="flex items-center gap-3 cursor-pointer group w-fit">
              <div
                onClick={() => setOrganicOnly(!organicOnly)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${organicOnly ? 'bg-[#4A7C59]' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${organicOnly ? 'left-7' : 'left-1'}`} />
              </div>
              <span className="text-sm font-medium text-gray-700 bengali-text">
                {t('Organic Only', 'শুধু অর্গানিক')}
              </span>
            </label>
          </div>
        )}

        {/* CATEGORY TABS */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id as MangoCategory)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all bengali-text ${
                category === cat.id
                  ? 'bg-gradient-to-r from-[#FFC324] to-[#FF8C00] text-gray-900 shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-[#FFC324] hover:text-[#CC9600]'
              }`}
            >
              {t(cat.en, cat.bn)}
            </button>
          ))}
        </div>

        {/* RESULTS COUNT */}
        <p className="text-sm text-gray-500 mb-6 bengali-text">
          {filteredProducts.length} {t('products found', 'টি পণ্য পাওয়া গেছে')}
        </p>

        {/* PRODUCTS GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🥭</div>
            <h3 className="font-display text-2xl font-bold text-gray-700 mb-2 bengali-text">
              {t('No products found', 'কোনো পণ্য পাওয়া যায়নি')}
            </h3>
            <p className="text-gray-500 bengali-text">
              {t('Try changing your filters', 'আপনার ফিল্টার পরিবর্তন করুন')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
