"use client";

import React from "react";
import Link from "next/link";
import { useWishlistStore } from "@/lib/wishlistStore";
import { useCartStore } from "@/lib/store";
import { useLanguage } from "@/lib/languageContext";
import {
  Heart,
  ShoppingCart,
  Trash2,
  X,
  ArrowRight,
  Star,
  Leaf,
} from "lucide-react";
import { formatPriceEn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { t } = useLanguage();
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleAddToCart = (product: (typeof items)[0]) => {
    addItem(product);
    toast.success(
      `${t(product.name, product.nameBn)} ${t("added to cart!", "কার্টে যোগ হয়েছে!")}`,
      { icon: "🥭" },
    );
  };

  const handleRemove = (product: (typeof items)[0]) => {
    removeItem(product.id);
    toast.success(t("Removed from wishlist", "উইশলিস্ট থেকে সরানো হয়েছে"), {
      icon: "💔",
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1A1A1A] via-[#2D5A3D] to-[#1A1A1A] py-12 relative overflow-hidden">
        <div className="absolute -top-8 right-0 w-48 h-48 bg-red-400/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-500/20 rounded-2xl flex items-center justify-center">
              <Heart size={20} className="text-red-400" fill="currentColor" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white bengali-text">
              {t("My Wishlist", "আমার উইশলিস্ট")}
            </h1>
          </div>
          <p className="text-gray-400 text-sm bengali-text ml-13">
            {items.length} {t("saved products", "টি সেভ করা পণ্য")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {items.length === 0 ? (
          /* Empty State */
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-red-300" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-700 mb-3 bengali-text">
              {t("Your wishlist is empty", "আপনার উইশলিস্ট খালি")}
            </h2>
            <p className="text-gray-500 mb-8 bengali-text text-sm max-w-sm mx-auto">
              {t(
                "Save your favourite mango products to buy later",
                "পছন্দের আমের পণ্য সেভ করুন, পরে কিনুন",
              )}
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#FFC324] to-[#FF8C00] text-gray-900 rounded-full font-bold text-sm hover:shadow-lg transition-all bengali-text"
            >
              {t("Explore Products", "পণ্য দেখুন")}
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500 bengali-text">
                <span className="font-bold text-gray-800">{items.length}</span>{" "}
                {t("items saved", "টি পণ্য সেভ করা")}
              </p>
              <button
                onClick={() => {
                  clearWishlist();
                  toast.success(t("Wishlist cleared", "উইশলিস্ট মুছে গেছে"));
                }}
                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 font-medium transition-colors bengali-text"
              >
                <Trash2 size={14} />
                {t("Clear All", "সব মুছুন")}
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative"
                >
                  {/* Remove button */}
                  <button
                    onClick={() => handleRemove(product)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 shadow transition-all"
                  >
                    <X size={14} />
                  </button>

                  {/* Image */}
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.discount && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          -{product.discount}%
                        </span>
                      )}
                      {product.isOrganic && (
                        <span className="absolute bottom-3 left-3 bg-white/90 text-[#4A7C59] text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Leaf size={9} /> {t("Organic", "অর্গানিক")}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="p-3">
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-1 mb-1 hover:text-[#CC9600] transition-colors bengali-text">
                        {t(product.name, product.nameBn)}
                      </h3>
                    </Link>

                    <p className="text-xs text-gray-400 mb-2 bengali-text">
                      {t(product.variety.origin, product.variety.originBn)} ·{" "}
                      {product.weight}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={10}
                            className={
                              s <= Math.floor(product.rating)
                                ? "text-[#FFC324]"
                                : "text-gray-200"
                            }
                            fill={
                              s <= Math.floor(product.rating)
                                ? "#FFC324"
                                : "#E5E7EB"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-400">
                        ({product.reviewCount})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="font-bold text-[#CC9600] text-base">
                        {formatPriceEn(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatPriceEn(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Add to cart */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="w-full py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#FFC324] to-[#FF8C00] text-gray-900 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed bengali-text"
                    >
                      <ShoppingCart size={13} />
                      {product.stock === 0
                        ? t("Out of Stock", "স্টক নেই")
                        : t("Add to Cart", "কার্টে যোগ করুন")}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue shopping */}
            <div className="text-center mt-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#FFC324] text-[#CC9600] rounded-full font-semibold text-sm hover:bg-[#FFF8E7] transition-colors bengali-text"
              >
                {t("Continue Shopping", "আরও কেনাকাটা করুন")}
                <ArrowRight size={15} />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
