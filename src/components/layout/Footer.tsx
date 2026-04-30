'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/languageContext';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* NEWSLETTER */}
      <div className="bg-gradient-to-r from-[#FFC324] to-[#FF8C00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-gray-900 bengali-text">
                {t('Get Mango Season Updates', 'আমের মৌসুমের আপডেট পান')}
              </h3>
              <p className="text-gray-800 mt-1 text-sm bengali-text">
                {t('Early bird offers, harvest news & exclusive deals', 'আর্লি বার্ড অফার, ফসল কাটার খবর এবং বিশেষ ডিল')}
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder={t('Your email address', 'আপনার ইমেইল ঠিকানা')}
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/30 bengali-text"
              />
              <button className="px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2">
                <Send size={16} />
                {t('Subscribe', 'সাবস্ক্রাইব')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* BRAND */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FFC324] to-[#FF8C00] flex items-center justify-center text-xl">
                🥭
              </div>
              <div>
                <div className="font-display font-bold text-lg">
                  {t('Aam Bazar', 'আম বাজার')}
                </div>
                <div className="text-[10px] text-[#FFC324] tracking-widest uppercase">
                  {t('Fresh from Orchard', 'বাগান থেকে সরাসরি')}
                </div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed bengali-text">
              {t(
                'Premium quality fresh mangoes delivered from the orchards of Rajshahi directly to your doorstep.',
                'রাজশাহীর বাগান থেকে সরাসরি আপনার দরজায় প্রিমিয়াম মানের তাজা আম।'
              )}
            </p>
            {/* <div className="flex gap-3 mt-6">
              {[
                 { icon: Facebook, color: '#1877F2', href: '#', label: 'Facebook' },
  { icon: Twitter, color: '#1DA1F2', href: '#', label: 'Twitter' },
  { icon: Send,    color: '#0088CC', href: '#', label: 'Telegram' }, 
              ].map(({ icon: Icon, color, href }) => (
                <a
                  key={href + color}
                  href={href}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  style={{ color }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div> */}
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold mb-5 text-white bengali-text">{t('Quick Links', 'দ্রুত লিংক')}</h4>
            <ul className="space-y-3">
              {[
                { href: '/products?category=ripe', en: 'Ripe Mangoes', bn: 'পাকা আম' },
                { href: '/products?category=raw', en: 'Raw Mangoes', bn: 'কাঁচা আম' },
                { href: '/products?category=dried', en: 'Dried Mango', bn: 'শুকনো আম' },
                { href: '/products?category=juice', en: 'Mango Juice', bn: 'আমের জুস' },
                { href: '/products?category=pickle', en: 'Pickle & Achar', bn: 'আচার' },
                { href: '/offers', en: 'Special Offers', bn: 'বিশেষ অফার' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#FFC324] transition-colors text-sm bengali-text flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#FFC324]/40 group-hover:bg-[#FFC324] transition-colors" />
                    {t(link.en, link.bn)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <h4 className="font-semibold mb-5 text-white bengali-text">{t('Customer Service', 'কাস্টমার সার্ভিস')}</h4>
            <ul className="space-y-3">
              {[
                { href: '/about', en: 'About Us', bn: 'আমাদের সম্পর্কে' },
                { href: '/contact', en: 'Contact Us', bn: 'যোগাযোগ করুন' },
                { href: '/faq', en: 'FAQ', bn: 'সাধারণ প্রশ্ন' },
                { href: '/shipping', en: 'Shipping Policy', bn: 'ডেলিভারি নীতি' },
                { href: '/returns', en: 'Return Policy', bn: 'রিটার্ন নীতি' },
                { href: '/privacy', en: 'Privacy Policy', bn: 'গোপনীয়তা নীতি' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#FFC324] transition-colors text-sm bengali-text flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#FFC324]/40 group-hover:bg-[#FFC324] transition-colors" />
                    {t(link.en, link.bn)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold mb-5 text-white bengali-text">{t('Contact', 'যোগাযোগ')}</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-gray-400">
                <MapPin size={16} className="text-[#FFC324] shrink-0 mt-0.5" />
                <span className="bengali-text">
                  {t('Rajshahi, Bangladesh', 'রাজশাহী, বাংলাদেশ')}
                </span>
              </li>
              <li className="flex gap-3 text-sm text-gray-400">
                <Phone size={16} className="text-[#FFC324] shrink-0 mt-0.5" />
                <a href="tel:+8801700000000" className="hover:text-[#FFC324] transition-colors">
                  +880 1700-000000
                </a>
              </li>
              <li className="flex gap-3 text-sm text-gray-400">
                <Mail size={16} className="text-[#FFC324] shrink-0 mt-0.5" />
                <a href="mailto:info@aambazar.com" className="hover:text-[#FFC324] transition-colors">
                  info@aambazar.com
                </a>
              </li>
            </ul>

            {/* PAYMENT METHODS */}
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-3 bengali-text">{t('We Accept', 'পেমেন্ট পদ্ধতি')}</p>
              <div className="flex gap-2 flex-wrap">
                {['bKash', 'Nagad', 'Rocket', 'Card'].map((method) => (
                  <span
                    key={method}
                    className="px-3 py-1.5 bg-white/10 rounded-lg text-xs text-gray-300 font-medium"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span className="bengali-text">
            © 2024 {t('Aam Bazar. All rights reserved.', 'আম বাজার। সমস্ত অধিকার সংরক্ষিত।')}
          </span>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-[#FFC324] transition-colors bengali-text">
              {t('Terms', 'শর্তাবলী')}
            </Link>
            <Link href="/privacy" className="hover:text-[#FFC324] transition-colors bengali-text">
              {t('Privacy', 'গোপনীয়তা')}
            </Link>
            <Link href="/sitemap" className="hover:text-[#FFC324] transition-colors bengali-text">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
