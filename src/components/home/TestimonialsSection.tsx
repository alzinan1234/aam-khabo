'use client';

import React from 'react';
import { useLanguage } from '@/lib/languageContext';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'রহিমা বেগম',
    nameEn: 'Rahima Begum',
    location: 'ঢাকা',
    locationEn: 'Dhaka',
    rating: 5,
    comment: 'হিমসাগর আম অসাধারণ ছিল! এতো মিষ্টি আম আগে কখনো খাইনি। পরিবারের সবাই খুব খুশি।',
    commentEn: 'The Himsagar mango was absolutely amazing! Never tasted such sweet mangoes before. The whole family loved it.',
    avatar: 'র',
    avatarColor: '#FFC324',
  },
  {
    name: 'করিম সাহেব',
    nameEn: 'Karim Saheb',
    location: 'চট্টগ্রাম',
    locationEn: 'Chittagong',
    rating: 5,
    comment: 'ডেলিভারি অনেক দ্রুত হয়েছে এবং প্যাকেজিং খুব ভালো ছিল। আমের মান শতভাগ সন্তোষজনক।',
    commentEn: 'Delivery was very fast and packaging was excellent. The quality of mangoes was 100% satisfactory.',
    avatar: 'ক',
    avatarColor: '#4A7C59',
  },
  {
    name: 'নাজমা খানম',
    nameEn: 'Najma Khanam',
    location: 'সিলেট',
    locationEn: 'Sylhet',
    rating: 5,
    comment: 'ল্যাংড়া আমের আচার দারুণ! ঘরে বসেই রাজশাহীর আমের স্বাদ পাওয়া যাচ্ছে। অবশ্যই আবার অর্ডার করব।',
    commentEn: 'The Langra mango pickle is wonderful! Getting the taste of Rajshahi mangoes from home. Will definitely order again.',
    avatar: 'ন',
    avatarColor: '#FF8C00',
  },
  {
    name: 'আব্দুল হাকিম',
    nameEn: 'Abdul Hakim',
    location: 'রাজশাহী',
    locationEn: 'Rajshahi',
    rating: 4,
    comment: 'অর্গানিক আম পেয়ে মন ভরে গেল। কোনো কেমিক্যাল নেই, একদম প্রাকৃতিক স্বাদ। দাম একটু বেশি মনে হলেও মানের কারণে ঠিকই আছে।',
    commentEn: 'So happy to get organic mangoes. No chemicals, completely natural taste. Price is a bit high but justified by quality.',
    avatar: 'আ',
    avatarColor: '#9C27B0',
  },
];

export default function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF8E7] rounded-full text-sm font-medium text-[#CC9600] mb-4 border border-[#FFC324]/20">
            <span className="w-2 h-2 bg-[#FFC324] rounded-full animate-pulse" />
            <span className="bengali-text">{t('Customer Reviews', 'গ্রাহকদের মতামত')}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bengali-text">{t('What Our ', 'আমাদের ')}</span>
            <span className="text-gradient-mango bengali-text">{t('Customers Say', 'গ্রাহকরা বলেন')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((review, i) => (
            <div
              key={review.nameEn}
              className="group p-6 bg-[#FAFAF7] rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-[#FFC324]/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: review.avatarColor }}
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 bengali-text">
                      {t(review.nameEn, review.name)}
                    </h4>
                    <p className="text-xs text-gray-500 bengali-text">
                      {t(review.locationEn, review.location)}
                    </p>
                  </div>
                </div>
                <Quote size={24} className="text-[#FFC324]/40 group-hover:text-[#FFC324]/70 transition-colors" />
              </div>

              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className={star <= review.rating ? 'text-[#FFC324]' : 'text-gray-200'}
                    fill={star <= review.rating ? '#FFC324' : '#E5E7EB'}
                  />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed bengali-text">
                {t(review.commentEn, review.comment)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#FFF8E7] to-[#E8F5E9] rounded-3xl p-8 text-center border border-[#FFC324]/20">
          <div className="flex items-center justify-center gap-2 mb-2">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} size={24} className="text-[#FFC324]" fill="#FFC324" />
            ))}
          </div>
          <h3 className="font-display text-3xl font-bold text-gray-900 mb-1 bengali-text">
            {t('4.9 out of 5.0', '৫.০-এর মধ্যে ৪.৯')}
          </h3>
          <p className="text-gray-500 text-sm bengali-text">
            {t('Based on 1,200+ verified reviews', '১,২০০+ যাচাইকৃত রিভিউর উপর ভিত্তি করে')}
          </p>
        </div>
      </div>
    </section>
  );
}
