'use client';

import React from 'react';
import { useLanguage } from '@/lib/languageContext';
import { Leaf, Award, Users, Heart } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#FFF8E7] to-[#E8F5E9] py-20 px-4 text-center">
        <h1 className="font-display text-5xl font-bold text-gray-900 mb-4 bengali-text">
          {t('About ', 'আমাদের সম্পর্কে — ')}
          <span className="text-gradient-mango">{t('Aam Bazar', 'আম বাজার')}</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg bengali-text">
          {t(
            'Bringing the finest mangoes from the orchards of Bangladesh directly to your home since 2020.',
            'বাংলাদেশের বাগান থেকে ২০২০ সাল থেকে সরাসরি আপনার ঘরে সেরা আম পৌঁছে দিচ্ছি।'
          )}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4 bengali-text">
              {t('Our Story', 'আমাদের গল্প')}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4 bengali-text">
              {t(
                'Aam Bazar was born from a simple dream: to connect the mango growers of Rajshahi with mango lovers across Bangladesh. We work directly with farmers to ensure the freshest, highest-quality mangoes reach your table.',
                'আম বাজার একটি সহজ স্বপ্ন থেকে জন্ম নিয়েছে: রাজশাহীর আম চাষীদের সাথে সারা বাংলাদেশের আমপ্রেমীদের সংযুক্ত করা। আমরা সরাসরি কৃষকদের সাথে কাজ করি।'
              )}
            </p>
            <p className="text-gray-600 leading-relaxed bengali-text">
              {t(
                'Every mango is hand-picked, quality-checked, and carefully packaged to ensure it arrives at your doorstep in perfect condition.',
                'প্রতিটি আম হাতে বাছাই করা, মান পরীক্ষিত এবং সাবধানে প্যাক করা হয়।'
              )}
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-video">
            <img src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800" alt="Mango Orchard" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: Users, value: '50K+', label_en: 'Happy Customers', label_bn: 'সন্তুষ্ট গ্রাহক', color: '#FFC324' },
            { icon: Leaf, value: '100%', label_en: 'Organic Options', label_bn: 'অর্গানিক পণ্য', color: '#4A7C59' },
            { icon: Award, value: '12+', label_en: 'Mango Varieties', label_bn: 'আমের জাত', color: '#FF8C00' },
            { icon: Heart, value: '4.9★', label_en: 'Customer Rating', label_bn: 'গ্রাহক রেটিং', color: '#E91E63' },
          ].map(({ icon: Icon, value, label_en, label_bn, color }) => (
            <div key={label_en} className="bg-[#FAFAF7] rounded-3xl p-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${color}20` }}>
                <Icon size={24} style={{ color }} />
              </div>
              <div className="font-display text-3xl font-bold text-gray-900 mb-1" style={{ color }}>{value}</div>
              <div className="text-sm text-gray-500 bengali-text">{t(label_en, label_bn)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
