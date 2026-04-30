'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { useLanguage } from '@/lib/languageContext';
import { Product } from '@/types';
import { ShoppingCart, Heart, Star, Leaf, Eye } from 'lucide-react';
import { formatPriceEn, cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { t } = useLanguage();
  const { addItem } = useCartStore();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddingToCart(true);
    addItem(product);
    toast.success(
      `${t(product.name, product.nameBn)} ${t('added to cart!', 'কার্টে যোগ হয়েছে!')}`,
      { icon: '🥭' }
    );
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  const categoryColor = product.category === 'ripe' ? '#FFC324' : '#4A7C59';
  const categoryBg = product.category === 'ripe' ? '#FFF8E7' : '#E8F5E9';

  return (
    <div className={cn('product-card bg-white group', className)}>
      {/* IMAGE */}
      <div className="relative overflow-hidden aspect-square bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image w-full h-full object-cover"
        />
        
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.discount && (
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#4A7C59] text-white text-xs font-bold px-2.5 py-1 rounded-full bengali-text">
              {t('New', 'নতুন')}
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#FFC324] text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full bengali-text">
              {t('Bestseller', 'বেস্টসেলার')}
            </span>
          )}
          {product.isOrganic && (
            <span className="bg-white/90 text-[#4A7C59] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Leaf size={10} />
              {t('Organic', 'অর্গানিক')}
            </span>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
              toast.success(isWishlisted ? t('Removed from wishlist', 'উইশলিস্ট থেকে সরানো হয়েছে') : t('Added to wishlist!', 'উইশলিস্টে যোগ হয়েছে!'), { icon: '❤️' });
            }}
            className={`w-9 h-9 bg-white rounded-xl shadow-lg flex items-center justify-center transition-colors ${
              isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="w-9 h-9 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-400 hover:text-[#FFC324] transition-colors"
          >
            <Eye size={16} />
          </Link>
        </div>

        {/* ADD TO CART OVERLAY */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || product.stock === 0}
            className={`w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              isAddingToCart
                ? 'bg-[#4A7C59] text-white scale-95'
                : product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            <ShoppingCart size={16} />
            <span className="bengali-text">
              {isAddingToCart
                ? t('Adding...', 'যোগ হচ্ছে...')
                : product.stock === 0
                ? t('Out of Stock', 'স্টক নেই')
                : t('Add to Cart', 'কার্টে যোগ করুন')}
            </span>
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <Link href={`/products/${product.slug}`} className="block p-4">
        {/* CATEGORY TAG */}
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full inline-block mb-2"
          style={{ backgroundColor: categoryBg, color: categoryColor }}
        >
          <span className="bengali-text">
            {product.category === 'ripe' ? t('Ripe Mango', 'পাকা আম') :
             product.category === 'raw' ? t('Raw Mango', 'কাঁচা আম') :
             product.category === 'dried' ? t('Dried', 'শুকনো') :
             product.category === 'juice' ? t('Juice', 'জুস') : t('Pickle', 'আচার')}
          </span>
        </span>

        {/* NAME */}
        <h3 className="font-display font-bold text-gray-900 text-sm sm:text-base mb-1 line-clamp-1 bengali-text group-hover:text-[#CC9600] transition-colors">
          {t(product.name, product.nameBn)}
        </h3>

        {/* VARIETY & ORIGIN */}
        <p className="text-xs text-gray-400 mb-2 bengali-text">
          {t(product.variety.origin, product.variety.originBn)} &bull; {product.weight}
        </p>

        {/* RATING */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={12}
                className={star <= Math.floor(product.rating) ? 'text-[#FFC324]' : 'text-gray-200'}
                fill={star <= Math.floor(product.rating) ? '#FFC324' : '#E5E7EB'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#CC9600]">
            {formatPriceEn(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPriceEn(product.originalPrice)}
            </span>
          )}
          <span className="text-xs text-gray-400 bengali-text">/{t('kg', 'কেজি')}</span>
        </div>
      </Link>
    </div>
  );
}
