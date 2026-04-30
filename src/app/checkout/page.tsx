'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/languageContext';
import { useCartStore } from '@/lib/store';
import { formatPriceEn } from '@/lib/utils';
import { ShieldCheck, Truck, ArrowRight, ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { t } = useLanguage();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '', city: '', district: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const delivery = getTotalPrice() >= 1000 ? 0 : 80;
  const total = getTotalPrice() + delivery;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!form.name || !form.phone || !form.address) {
      toast.error(t('Please fill all required fields', 'সব তথ্য পূরণ করুন'), { icon: '⚠️' });
      return;
    }
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-xl">
          <div className="text-6xl mb-6 animate-bounce-soft">🎉</div>
          <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} className="text-[#4A7C59]" />
          </div>
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-3 bengali-text">
            {t('Order Confirmed!', 'অর্ডার নিশ্চিত হয়েছে!')}
          </h2>
          <p className="text-gray-500 mb-2 bengali-text">
            {t('Your mango order has been placed successfully.', 'আপনার আমের অর্ডার সফলভাবে দেওয়া হয়েছে।')}
          </p>
          <p className="text-sm text-gray-400 mb-8 bengali-text">
            {t('Order ID: #AAM', 'অর্ডার আইডি: #AAM')}{Math.floor(Math.random() * 90000 + 10000)}
          </p>
          <div className="bg-[#FFF8E7] rounded-2xl p-4 mb-6 text-left">
            <div className="flex items-center gap-3">
              <Truck size={20} className="text-[#FFC324]" />
              <div>
                <p className="font-semibold text-gray-900 text-sm bengali-text">{t('Estimated Delivery', 'আনুমানিক ডেলিভারি')}</p>
                <p className="text-gray-600 text-xs bengali-text">{t('Within 24-48 hours', '২৪-৪৮ ঘণ্টার মধ্যে')}</p>
              </div>
            </div>
          </div>
          <Link href="/products" className="btn-primary w-full py-3.5 rounded-2xl font-bold text-sm inline-block bengali-text text-center">
            {t('Continue Shopping', 'কেনাকাটা চালিয়ে যান')}
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="font-display text-2xl font-bold text-gray-700 mb-4 bengali-text">
            {t('Your cart is empty', 'কার্ট খালি আছে')}
          </h2>
          <Link href="/products" className="btn-primary px-8 py-3 rounded-xl font-semibold inline-block bengali-text">
            {t('Shop Now', 'কেনাকাটা করুন')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Link href="/products" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#FFC324] transition-colors mb-8 bengali-text">
          <ChevronLeft size={16} />
          {t('Continue Shopping', 'কেনাকাটা চালিয়ে যান')}
        </Link>

        <h1 className="font-display text-4xl font-bold text-gray-900 mb-10 bengali-text">
          {t('Checkout', 'চেকআউট')}
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FORM */}
          <div className="lg:col-span-2 space-y-6">
            {/* DELIVERY INFO */}
            <div className="bg-white rounded-3xl p-6 shadow-card">
              <h2 className="font-display font-bold text-xl text-gray-900 mb-5 bengali-text">
                {t('Delivery Information', 'ডেলিভারির তথ্য')}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: 'name', en: 'Full Name *', bn: 'পুরো নাম *', type: 'text' },
                  { name: 'phone', en: 'Phone Number *', bn: 'ফোন নম্বর *', type: 'tel' },
                  { name: 'email', en: 'Email Address', bn: 'ইমেইল ঠিকানা', type: 'email' },
                  { name: 'district', en: 'District *', bn: 'জেলা *', type: 'text' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 bengali-text">
                      {t(field.en, field.bn)}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={(form as any)[field.name]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#FFC324] focus:ring-2 focus:ring-[#FFC324]/20 bengali-text"
                      placeholder={t(field.en.replace(' *', ''), field.bn.replace(' *', ''))}
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 bengali-text">
                    {t('Full Address *', 'সম্পূর্ণ ঠিকানা *')}
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#FFC324] focus:ring-2 focus:ring-[#FFC324]/20 resize-none bengali-text"
                    placeholder={t('House, Road, Area...', 'বাড়ি, রাস্তা, এলাকা...')}
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-white rounded-3xl p-6 shadow-card">
              <h2 className="font-display font-bold text-xl text-gray-900 mb-5 bengali-text">
                {t('Payment Method', 'পেমেন্ট পদ্ধতি')}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'bkash', label: 'bKash', color: '#E2136E' },
                  { id: 'nagad', label: 'Nagad', color: '#F05A22' },
                  { id: 'rocket', label: 'Rocket', color: '#8B1C62' },
                  { id: 'cod', label: t('Cash on Delivery', 'ক্যাশ অন ডেলিভারি'), color: '#4A7C59' },
                ].map(method => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-3 rounded-2xl border-2 text-sm font-semibold transition-all bengali-text ${
                      paymentMethod === method.id
                        ? 'border-[#FFC324] bg-[#FFF8E7]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ color: paymentMethod === method.id ? method.color : '#6B7280' }}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div>
            <div className="bg-white rounded-3xl p-6 shadow-card sticky top-24">
              <h2 className="font-display font-bold text-xl text-gray-900 mb-5 bengali-text">
                {t('Order Summary', 'অর্ডার সারসংক্ষেপ')}
              </h2>
              <div className="space-y-3 mb-5">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate bengali-text">
                        {t(item.product.name, item.product.nameBn)}
                      </p>
                      <p className="text-xs text-gray-500">x{item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-[#CC9600] shrink-0">
                      {formatPriceEn(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span className="bengali-text">{t('Subtotal', 'সাবটোটাল')}</span>
                  <span>{formatPriceEn(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 bengali-text">{t('Delivery', 'ডেলিভারি')}</span>
                  <span className={delivery === 0 ? 'text-[#4A7C59] font-medium bengali-text' : ''}>
                    {delivery === 0 ? t('Free', 'বিনামূল্যে') : formatPriceEn(delivery)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 pt-2 border-t text-lg">
                  <span className="bengali-text">{t('Total', 'মোট')}</span>
                  <span className="text-[#CC9600]">{formatPriceEn(total)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full btn-primary py-4 rounded-2xl font-bold text-base mt-5 flex items-center justify-center gap-2 bengali-text"
              >
                {t('Place Order', 'অর্ডার দিন')}
                <ArrowRight size={20} />
              </button>

              <div className="flex items-center gap-2 justify-center mt-4 text-xs text-gray-400">
                <ShieldCheck size={14} />
                <span className="bengali-text">{t('Secure checkout guaranteed', 'নিরাপদ চেকআউট নিশ্চিত')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
