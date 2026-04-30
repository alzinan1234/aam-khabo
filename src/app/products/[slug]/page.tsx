"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/lib/languageContext";
import { useCartStore } from "@/lib/store";
import { useWishlistStore } from "@/lib/wishlistStore";
import { getProductBySlug, products } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import {
  ShoppingCart,
  Heart,
  Star,
  Leaf,
  Truck,
  ShieldCheck,
  ChevronLeft,
  Plus,
  Minus,
  Package,
  ZoomIn,
  X,
  ChevronRight,
} from "lucide-react";
import { formatPriceEn } from "@/lib/utils";
import toast from "react-hot-toast";

/* ── IMAGE GALLERY WITH ZOOM ───────────────────────────── */
function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [selected, setSelected] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [lightIdx, setLightIdx] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const mainRef = useRef<HTMLDivElement>(null);

  // Extend images to always show at least 3 thumbnails by repeating
  const displayImages =
    images.length >= 2 ? images : [...images, ...images, ...images].slice(0, 3);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainRef.current) return;
    const rect = mainRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }, []);

  const openLightbox = (idx: number) => {
    setLightIdx(idx);
    setLightbox(true);
  };

  const lightboxNext = () => setLightIdx((lightIdx + 1) % displayImages.length);
  const lightboxPrev = () =>
    setLightIdx((lightIdx - 1 + displayImages.length) % displayImages.length);

  // keyboard nav for lightbox
  useEffect(() => {
    if (!lightbox) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") lightboxNext();
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [lightbox, lightIdx]);

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main image */}
        <div
          ref={mainRef}
          className={`relative aspect-square rounded-3xl overflow-hidden bg-white shadow-xl cursor-zoom-in select-none ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
          onMouseEnter={() => setZoomed(true)}
          onMouseLeave={() => setZoomed(false)}
          onMouseMove={handleMouseMove}
          onClick={() => openLightbox(selected)}
        >
          <img
            src={displayImages[selected]}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-200"
            style={
              zoomed
                ? {
                    transform: "scale(2.2)",
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transition: "transform 0.1s ease-out",
                  }
                : { transform: "scale(1)", transition: "transform 0.3s ease" }
            }
            draggable={false}
          />

          {/* Zoom hint */}
          {!zoomed && (
            <div className="absolute bottom-4 right-4 bg-black/40 text-white text-xs px-2.5 py-1.5 rounded-full flex items-center gap-1.5 pointer-events-none">
              <ZoomIn size={12} />
              Hover to zoom
            </div>
          )}

          {/* Nav arrows on hover */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(
                    (selected - 1 + displayImages.length) %
                      displayImages.length,
                  );
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                style={{ opacity: zoomed ? 0 : undefined }}
              >
                <ChevronLeft size={18} className="text-gray-700" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected((selected + 1) % displayImages.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition-all"
                style={{ opacity: zoomed ? 0 : undefined }}
              >
                <ChevronRight size={18} className="text-gray-700" />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {displayImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(i);
                  }}
                  className={`rounded-full transition-all ${
                    i === selected ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {displayImages.length > 1 && (
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {displayImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                  selected === i
                    ? "border-[#FFC324] shadow-md scale-105"
                    : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── LIGHTBOX ─────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>

          {displayImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  lightboxPrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  lightboxNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <img
            src={displayImages[lightIdx]}
            alt={name}
            className="max-h-[90vh] max-w-full object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Thumbnail strip */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {displayImages.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightIdx(i);
                  }}
                  className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                    i === lightIdx
                      ? "border-[#FFC324] scale-110"
                      : "border-white/20 opacity-60"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

/* ── MAIN PAGE ──────────────────────────────────────────── */
export default function ProductDetailPage() {
  const params = useParams();
  const { t } = useLanguage();
  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();

  const product = getProductBySlug(params.slug as string);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🥭</div>
          <h2 className="font-display text-2xl font-bold text-gray-700 mb-4 bengali-text">
            {t("Product not found", "পণ্য পাওয়া যায়নি")}
          </h2>
          <Link
            href="/products"
            className="btn-primary px-6 py-3 inline-block rounded-xl font-semibold text-sm bengali-text"
          >
            {t("Back to Products", "পণ্যে ফিরে যান")}
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, qty);
    toast.success(
      `${t(product.name, product.nameBn)} ${t("added to cart!", "কার্টে যোগ হয়েছে!")}`,
      { icon: "🥭" },
    );
  };

  const handleWishlist = () => {
    toggleItem(product);
    toast.success(
      wishlisted
        ? t("Removed from wishlist", "উইশলিস্ট থেকে সরানো হয়েছে")
        : t("Added to wishlist!", "উইশলিস্টে যোগ হয়েছে!"),
      { icon: wishlisted ? "💔" : "❤️" },
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
          <Link
            href="/"
            className="hover:text-[#FFC324] transition-colors bengali-text"
          >
            {t("Home", "হোম")}
          </Link>
          <span>/</span>
          <Link
            href="/products"
            className="hover:text-[#FFC324] transition-colors bengali-text"
          >
            {t("Products", "পণ্য")}
          </Link>
          <span>/</span>
          <span className="text-gray-700 font-medium bengali-text line-clamp-1">
            {t(product.name, product.nameBn)}
          </span>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 mb-16">
          {/* ── LEFT: GALLERY ──────────────────────────────── */}
          <div className="group">
            {/* badges over gallery */}
            <div className="flex gap-2 mb-3 flex-wrap">
              {product.discount && (
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  -{product.discount}% {t("OFF", "ছাড়")}
                </span>
              )}
              {product.isOrganic && (
                <span className="bg-[#4A7C59] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Leaf size={11} /> {t("Organic", "অর্গানিক")}
                </span>
              )}
              {product.isBestseller && (
                <span className="badge-ripe">
                  {t("Bestseller", "বেস্টসেলার")}
                </span>
              )}
            </div>
            <ImageGallery
              images={product.images}
              name={t(product.name, product.nameBn)}
            />
          </div>

          {/* ── RIGHT: INFO ────────────────────────────────── */}
          <div className="flex flex-col">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 bengali-text leading-tight">
              {t(product.name, product.nameBn)}
            </h1>

            <p className="text-gray-500 text-sm mb-4 bengali-text">
              {t(product.variety.origin, product.variety.originBn)} &bull;{" "}
              {product.weight}
              {product.isNew && (
                <span className="ml-2 text-[#4A7C59] font-semibold badge-raw text-xs px-2 py-0.5 rounded-full">
                  {t("New", "নতুন")}
                </span>
              )}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={17}
                    className={
                      s <= Math.floor(product.rating)
                        ? "text-[#FFC324]"
                        : "text-gray-200"
                    }
                    fill={
                      s <= Math.floor(product.rating) ? "#FFC324" : "#E5E7EB"
                    }
                  />
                ))}
              </div>
              <span className="font-bold text-gray-900 text-sm">
                {product.rating}
              </span>
              <span className="text-gray-400 text-xs">
                ({product.reviewCount} {t("reviews", "রিভিউ")})
              </span>
              <span
                className={`ml-auto text-xs font-semibold px-2.5 py-1 rounded-full ${
                  product.stock > 10
                    ? "bg-green-100 text-green-700"
                    : product.stock > 0
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-600"
                } bengali-text`}
              >
                {product.stock > 0
                  ? `${product.stock} ${t("in stock", "টি আছে")}`
                  : t("Out of stock", "স্টক নেই")}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-5">
              <span className="text-3xl sm:text-4xl font-bold text-[#CC9600]">
                {formatPriceEn(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPriceEn(product.originalPrice)}
                </span>
              )}
              <span className="text-gray-500 text-sm mb-1 bengali-text">
                /{t("kg", "কেজি")}
              </span>
              {product.discount && (
                <span className="text-sm font-bold text-green-600 mb-1 bengali-text">
                  {t("Save", "বাঁচান")} ৳
                  {(product.originalPrice || 0) - product.price}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-5 text-sm bengali-text">
              {t(product.description, product.descriptionBn)}
            </p>

            {/* Harvest */}
            <div className="flex items-center gap-2 text-xs text-[#4A7C59] font-semibold mb-5 bengali-text">
              <Leaf size={13} />
              {t("Harvest Season", "ফলনের মৌসুম")}:{" "}
              {t(product.harvestSeason, product.harvestSeasonBn)}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-sm font-medium text-gray-700 bengali-text">
                {t("Qty", "পরিমাণ")}:
              </span>
              <div className="flex items-center gap-2 bg-gray-100 rounded-2xl p-1">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-[#FFC324] hover:text-white transition-colors"
                >
                  <Minus size={15} />
                </button>
                <span className="w-8 text-center font-bold text-sm">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-[#FFC324] hover:text-white transition-colors"
                  disabled={product.stock === 0}
                >
                  <Plus size={15} />
                </button>
              </div>
              <span className="text-xs text-gray-400 bengali-text">
                ৳{(product.price * qty).toLocaleString()} {t("total", "মোট")}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 btn-primary py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 bengali-text disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={18} />
                {product.stock === 0
                  ? t("Out of Stock", "স্টক নেই")
                  : t("Add to Cart", "কার্টে যোগ করুন")}
              </button>
              <button
                onClick={handleWishlist}
                className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${
                  wishlisted
                    ? "border-red-400 bg-red-50 text-red-500"
                    : "border-gray-200 text-gray-400 hover:border-red-400 hover:text-red-500 hover:bg-red-50"
                }`}
              >
                <Heart size={20} fill={wishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                {
                  icon: Truck,
                  en: "Free Delivery",
                  bn: "বিনামূল্যে ডেলিভারি",
                  sub_en: "Orders ৳1000+",
                  sub_bn: "৳১০০০+ অর্ডারে",
                },
                {
                  icon: ShieldCheck,
                  en: "Quality Assured",
                  bn: "মান নিশ্চিত",
                  sub_en: "100% guaranteed",
                  sub_bn: "১০০% গ্যারান্টি",
                },
                {
                  icon: Package,
                  en: "Safe Packaging",
                  bn: "নিরাপদ প্যাক",
                  sub_en: "Arrives fresh",
                  sub_bn: "তাজা পৌঁছে",
                },
              ].map(({ icon: Icon, en, bn, sub_en, sub_bn }) => (
                <div
                  key={en}
                  className="bg-[#FAFAF7] border border-gray-100 rounded-2xl p-3 text-center"
                >
                  <Icon size={18} className="text-[#4A7C59] mx-auto mb-1.5" />
                  <p className="text-[11px] font-bold text-gray-800 bengali-text">
                    {t(en, bn)}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5 bengali-text">
                    {t(sub_en, sub_bn)}
                  </p>
                </div>
              ))}
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-gray-900 bengali-text">
                {t("Related Products", "সম্পর্কিত পণ্য")}
              </h2>
              <Link
                href={`/products?category=${product.category}`}
                className="text-sm font-semibold text-[#CC9600] hover:underline bengali-text"
              >
                {t("View All →", "সব দেখুন →")}
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
