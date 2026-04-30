'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { useLanguage } from '@/lib/languageContext';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { formatPriceEn } from '@/lib/utils';

export default function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();
  const { t } = useLanguage();

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
          onClick={toggleCart}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#FFC324]/20 rounded-xl flex items-center justify-center">
              <ShoppingBag size={18} className="text-[#E6A800]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-gray-900 bengali-text">
                {t('Your Cart', 'আপনার কার্ট')}
              </h2>
              <p className="text-xs text-gray-500 bengali-text">
                {getTotalItems()} {t('items', 'টি পণ্য')}
              </p>
            </div>
          </div>
          <button
            onClick={toggleCart}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="text-6xl animate-bounce-soft">🥭</div>
              <h3 className="font-display font-semibold text-gray-700 bengali-text">
                {t('Cart is Empty', 'কার্ট খালি')}
              </h3>
              <p className="text-sm text-gray-500 bengali-text">
                {t('Add some delicious mangoes!', 'কিছু সুস্বাদু আম যোগ করুন!')}
              </p>
              <button
                onClick={toggleCart}
                className="btn-primary px-6 py-2.5 text-sm font-semibold"
              >
                <Link href="/products">{t('Shop Now', 'কেনাকাটা করুন')}</Link>
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 p-3 bg-gray-50 rounded-2xl hover:bg-[#FFF8E7] transition-colors group"
              >
                {/* IMAGE */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* INFO */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate bengali-text">
                    {t(item.product.name, item.product.nameBn)}
                  </h4>
                  <p className="text-xs text-gray-500 bengali-text mt-0.5">
                    {item.product.weight}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    {/* QUANTITY */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-[#FFC324] hover:text-white transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-[#FFC324] hover:text-white transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    {/* PRICE */}
                    <span className="text-sm font-bold text-[#E6A800]">
                      {formatPriceEn(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 shrink-0 mt-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-5 space-y-4">
            {/* TOTALS */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span className="bengali-text">{t('Subtotal', 'সাবটোটাল')}</span>
                <span className="font-medium">{formatPriceEn(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span className="bengali-text">{t('Delivery', 'ডেলিভারি')}</span>
                <span className="font-medium text-[#4A7C59] bengali-text">
                  {getTotalPrice() >= 1000 ? t('Free', 'বিনামূল্যে') : formatPriceEn(80)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 pt-2 border-t">
                <span className="bengali-text">{t('Total', 'মোট')}</span>
                <span className="text-[#E6A800]">
                  {formatPriceEn(getTotalPrice() + (getTotalPrice() >= 1000 ? 0 : 80))}
                </span>
              </div>
            </div>

            {/* CHECKOUT */}
            <Link
              href="/checkout"
              onClick={toggleCart}
              className="flex items-center justify-center gap-2 w-full py-3.5 btn-primary text-sm font-bold rounded-2xl"
            >
              {t('Proceed to Checkout', 'চেকআউটে যান')}
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/products"
              onClick={toggleCart}
              className="block text-center text-sm text-gray-500 hover:text-[#FFC324] transition-colors bengali-text"
            >
              {t('Continue Shopping', 'কেনাকাটা চালিয়ে যান')}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
