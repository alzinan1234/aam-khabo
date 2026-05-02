'use client';

import React from 'react';
import { useLanguage } from '@/lib/languageContext';
import { ShieldCheck, Truck, Leaf, Award, Clock, Users } from 'lucide-react';

const features = [
  {
    icon: Award,
    en: 'Premium Quality',
    bn: 'প্রিমিয়াম মান',
    desc_en: 'Handpicked from the finest orchards in Rajshahi',
    desc_bn: 'রাজশাহীর সেরা বাগান থেকে হাতে বাছাই করা',
    color: '#FFC324',
    bg: '#FFF8E7',
  },
  {
    icon: Truck,
    en: 'Fast Delivery',
    bn: 'দ্রুত ডেলিভারি',
    desc_en: 'Delivered within 24-48 hours across Bangladesh',
    desc_bn: 'বাংলাদেশের সর্বত্র ২৪-৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    color: '#4A7C59',
    bg: '#E8F5E9',
  },
  {
    icon: Leaf,
    en: '100% Organic',
    bn: '১০০% অর্গানিক',
    desc_en: 'No harmful chemicals, naturally grown mangoes',
    desc_bn: 'কোনো ক্ষতিকর কেমিক্যাল নেই, প্রাকৃতিকভাবে চাষ করা',
    color: '#2E7D32',
    bg: '#F1F8E9',
  },
  {
    icon: ShieldCheck,
    en: 'Quality Guarantee',
    bn: 'মানের নিশ্চয়তা',
    desc_en: '100% money back guarantee if not satisfied',
    desc_bn: 'সন্তুষ্ট না হলে ১০০% অর্থ ফেরত দেওয়া হবে',
    color: '#FF8C00',
    bg: '#FFF3E0',
  },
  {
    icon: Clock,
    en: 'Fresh Always',
    bn: 'সবসময় তাজা',
    desc_en: 'Directly from the orchard to your doorstep',
    desc_bn: 'বাগান থেকে সরাসরি আপনার দরজায়',
    color: '#E91E63',
    bg: '#FCE4EC',
  },
  {
    icon: Users,
    en: '50K+ Happy Customers',
    bn: '৫০,০০০+ সন্তুষ্ট গ্রাহক',
    desc_en: 'Trusted by thousands of families across Bangladesh',
    desc_bn: 'বাংলাদেশ জুড়ে হাজার হাজার পরিবারের বিশ্বাস',
    color: '#9C27B0',
    bg: '#F3E5F5',
  },
];

export default function WhyChooseUs() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF8E7] rounded-full text-sm font-medium text-[#CC9600] mb-4 border border-[#FFC324]/20">
            <span className="w-2 h-2 bg-[#FFC324] rounded-full" />
            <span className="bengali-text">{t('Why Choose Us', 'কেন আমরা')}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bengali-text">{t('The ', '')}</span>
            <span className="text-gradient-mango bengali-text">{t('Aam Bazar ', 'আম বাজারের ')}</span>
            <span className="bengali-text">{t('Difference', 'বিশেষত্ব')}</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto bengali-text text-lg">
            {t(
              'We are committed to bringing you the freshest, most flavorful mangoes',
              'আমরা আপনার কাছে সবচেয়ে তাজা এবং সুস্বাদু আম পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ'
            )}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.en}
              className="group p-6 bg-white rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 cursor-default"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: feature.bg }}
              >
                <feature.icon size={26} style={{ color: feature.color }} />
              </div>
              <h3 className="font-display font-bold text-gray-900 text-lg mb-2 bengali-text">
                {t(feature.en, feature.bn)}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed bengali-text">
                {t(feature.desc_en, feature.desc_bn)}
              </p>
              <div
                className="h-1 rounded-full mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${feature.color}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
