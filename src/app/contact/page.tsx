'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/languageContext';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('Message sent! We will reply soon.', 'বার্তা পাঠানো হয়েছে! আমরা শীঘ্রই জবাব দেব।'), { icon: '✅' });
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2D5A3D] py-16 text-center">
        <h1 className="font-display text-5xl font-bold text-white mb-4 bengali-text">
          {t('Contact Us', 'যোগাযোগ করুন')}
        </h1>
        <p className="text-gray-400 bengali-text">{t('We are here to help you', 'আমরা আপনাকে সাহায্য করতে এখানে আছি')}</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 bengali-text">{t('Get in Touch', 'যোগাযোগ করুন')}</h2>
          <div className="space-y-5">
            {[
              { icon: MapPin, en: 'Rajshahi, Bangladesh', bn: 'রাজশাহী, বাংলাদেশ', color: '#FFC324' },
              { icon: Phone, en: '+880 1700-000000', bn: '+৮৮০ ১৭০০-০০০০০০', color: '#4A7C59' },
              { icon: Mail, en: 'info@aambazar.com', bn: 'info@aambazar.com', color: '#FF8C00' },
            ].map(({ icon: Icon, en, bn, color }) => (
              <div key={en} className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-card">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <span className="font-medium text-gray-700 bengali-text">{t(en, bn)}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-7 shadow-card space-y-4">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-2 bengali-text">{t('Send Message', 'বার্তা পাঠান')}</h2>
          {[
            { name: 'name', en: 'Your Name', bn: 'আপনার নাম', type: 'text' },
            { name: 'email', en: 'Email', bn: 'ইমেইল', type: 'email' },
            { name: 'phone', en: 'Phone', bn: 'ফোন', type: 'tel' },
          ].map(f => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 bengali-text">{t(f.en, f.bn)}</label>
              <input
                type={f.type}
                name={f.name}
                value={(form as any)[f.name]}
                onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#FFC324] bengali-text"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 bengali-text">{t('Message', 'বার্তা')}</label>
            <textarea
              name="message"
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#FFC324] resize-none bengali-text"
            />
          </div>
          <button type="submit" className="w-full btn-primary py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 bengali-text">
            <Send size={18} />
            {t('Send Message', 'বার্তা পাঠান')}
          </button>
        </form>
      </div>
    </div>
  );
}
