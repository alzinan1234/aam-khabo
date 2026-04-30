'use client';

import React from 'react';
import { useLanguage } from '@/lib/languageContext';

const items = [
  { en: 'Himsagar', bn: 'হিমসাগর', emoji: '🥭' },
  { en: 'Langra', bn: 'ল্যাংড়া', emoji: '🥭' },
  { en: 'Fazli', bn: 'ফজলি', emoji: '🥭' },
  { en: 'Amrapali', bn: 'আম্রপালি', emoji: '🥭' },
  { en: 'Gopalbhog', bn: 'গোপালভোগ', emoji: '🥭' },
  { en: 'Khirsapat', bn: 'খিরসাপাত', emoji: '🥭' },
  { en: 'Ashwina', bn: 'আশ্বিনা', emoji: '🥭' },
  { en: 'Free Delivery', bn: 'বিনামূল্যে ডেলিভারি', emoji: '🚚' },
  { en: '100% Organic', bn: '১০০% অর্গানিক', emoji: '🌿' },
];

export default function MarqueeSection() {
  const { t } = useLanguage();
  const doubled = [...items, ...items];

  return (
    <div className="bg-gradient-to-r from-[#FFC324] via-[#FF8C00] to-[#FFC324] py-4 overflow-hidden">
      <div className="marquee-content gap-0">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-8 text-gray-900 font-bold text-sm">
            <span>{item.emoji}</span>
            <span className="bengali-text">{t(item.en, item.bn)}</span>
            <span className="w-1.5 h-1.5 bg-gray-900/30 rounded-full" />
          </span>
        ))}
      </div>
    </div>
  );
}
