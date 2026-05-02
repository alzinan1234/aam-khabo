"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/store";
import { useWishlistStore } from "@/lib/wishlistStore";
import { useLanguage } from "@/lib/languageContext";
import {
  ShoppingCart,
  Menu,
  X,
  Search,
  Heart,
  User,
  ChevronDown,
  Leaf,
  Sun,
  Package,
  Droplets,
  Zap,
  Home,
  Phone,
  Info,
  ChevronRight,
} from "lucide-react";

const categories = [
  {
    href: "/products?category=ripe",
    en: "Ripe Mango",
    bn: "পাকা আম",
    icon: Sun,
    color: "#FFC324",
  },
  {
    href: "/products?category=raw",
    en: "Raw Mango",
    bn: "কাঁচা আম",
    icon: Leaf,
    color: "#4A7C59",
  },
  {
    href: "/products?category=dried",
    en: "Dried Mango",
    bn: "শুকনো আম",
    icon: Zap,
    color: "#FF8C00",
  },
  {
    href: "/products?category=juice",
    en: "Mango Juice",
    bn: "আমের জুস",
    icon: Droplets,
    color: "#FFB347",
  },
  {
    href: "/products?category=pickle",
    en: "Pickle & Achar",
    bn: "আচার",
    icon: Package,
    color: "#8B4513",
  },
];

const navLinks = [
  { href: "/", en: "Home", bn: "হোম", icon: Home },
  {
    href: "/products",
    en: "Products",
    bn: "পণ্যসমূহ",
    icon: Package,
    hasDropdown: true,
  },
  { href: "/wishlist", en: "Wishlist", bn: "উইশলিস্ট", icon: Heart },
  { href: "/about", en: "About Us", bn: "আমাদের সম্পর্কে", icon: Info },
  { href: "/contact", en: "Contact", bn: "যোগাযোগ", icon: Phone },
];

/* ── ANNOUNCEMENT BAR ──────────────────────────────────── */
function AnnouncementBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    (async () => {
      try {
        const mod = await import("gsap");
        const gsap = (mod as any).gsap ?? (mod as any).default;
        if (!gsap || !wrapRef.current) return;

        ctx = gsap.context(() => {
          // entrance
          gsap.from(barRef.current, {
            height: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.3,
          });

          // horizontal marquee on inner text
          const el = wrapRef.current;
          if (!el) return;
          const totalW = el.scrollWidth / 2;
          gsap.fromTo(
            el,
            { x: 0 },
            { x: -totalW, duration: 22, repeat: -1, ease: "none" },
          );
        });
      } catch {}
    })();
    return () => {
      try {
        ctx?.revert();
      } catch {}
    };
  }, []);

  const msg =
    "  ৳১০০০-এর উপরে অর্ডারে বিনামূল্যে ডেলিভারি  ✦  রাজশাহী থেকে তাজা আম  ✦  Free Delivery on orders above ৳1000  ✦  Fresh mangoes from Rajshahi  ✦  ";

  return (
    <div
      ref={barRef}
      className="overflow-hidden py-2 text-white text-xs font-medium"
      style={{ background: 'linear-gradient(90deg,#1A1A1A 0%,#2D5A3D 100%)', padding: '10px 0' }}
    >
      <div
        ref={wrapRef}
        className="flex whitespace-nowrap bengali-text"
        style={{ width: "max-content" }}
      >
        <span>{msg}</span>
        <span aria-hidden>{msg}</span>
      </div>
    </div>
  );
}

/* ── MAIN NAVBAR ────────────────────────────────────────── */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [catExpanded, setCatExpanded] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { getTotalItems, toggleCart } = useCartStore();
  const { getTotalItems: wCount } = useWishlistStore();
  const pathname = usePathname();
  const cartCount = getTotalItems();
  const wishCount = wCount();

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <AnnouncementBar />

      <nav
        className={`sticky top-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-white/96 backdrop-blur-xl shadow-md border-b border-[#FFC324]/20"
            : "bg-white/90 backdrop-blur-md border-b border-gray-100/80"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 ">
            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group flex-shrink-0"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFC324] to-[#FF8C00] flex items-center justify-center text-lg shadow group-hover:scale-110 transition-transform">
                🥭
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-bold text-base text-gray-900 leading-tight">
                  {t("Aam Bazar", "আম বাজার")}
                </div>
                <div className="text-[9px] text-[#4A7C59] font-semibold tracking-widest uppercase bengali-text">
                  {t("Fresh Orchard", "বাগান থেকে সরাসরি")}
                </div>
              </div>
            </Link>

            {/* DESKTOP LINKS */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <div key={link.href} className="relative group">
                  {link.hasDropdown ? (
                    <button
                      className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 bengali-text ${isActive(link.href) ? "text-[#FFC324]" : "text-gray-700 hover:text-[#FFC324]"}`}
                      onMouseEnter={() => setDropOpen(true)}
                      onMouseLeave={() => setDropOpen(false)}
                    >
                      {t(link.en, link.bn)}
                      <ChevronDown
                        size={13}
                        className="transition-transform group-hover:rotate-180"
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1.5 text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#FFC324] after:transition-all bengali-text ${
                        isActive(link.href)
                          ? "text-[#FFC324] after:w-full"
                          : "text-gray-700 hover:text-[#FFC324] after:w-0 hover:after:w-full"
                      }`}
                    >
                      {link.href === "/wishlist" && wishCount > 0 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                      )}
                      {t(link.en, link.bn)}
                    </Link>
                  )}

                  {link.hasDropdown && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 transition-all duration-200 ${
                        dropOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      }`}
                      onMouseEnter={() => setDropOpen(true)}
                      onMouseLeave={() => setDropOpen(false)}
                    >
                      {categories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${cat.color}22` }}
                          >
                            <cat.icon size={14} style={{ color: cat.color }} />
                          </div>
                          <span className="text-sm font-medium text-gray-700 bengali-text">
                            {t(cat.en, cat.bn)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setLanguage(language === "en" ? "bn" : "en")}
                className="hidden sm:flex items-center px-2.5 py-1.5 rounded-full border border-[#FFC324]/40 text-[11px] font-bold text-gray-600 hover:bg-[#FFF8E7] transition-all"
              >
                {language === "en" ? "বাং" : "EN"}
              </button>

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-[#FFC324]"
              >
                <Search size={17} />
              </button>

              <Link
                href="/wishlist"
                className="relative hidden sm:flex w-9 h-9 items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-red-500"
              >
                <Heart size={17} />
                {wishCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishCount}
                  </span>
                )}
              </Link>

              <button
                onClick={toggleCart}
                className="relative w-9 h-9 flex items-center justify-center rounded-full bg-[#FFC324] hover:bg-[#E6A800] transition-all hover:scale-105 shadow"
              >
                <ShoppingCart size={16} className="text-gray-900" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2D5A3D] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-700"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div
            className={`overflow-hidden transition-all duration-300 ${searchOpen ? "max-h-16 pb-3 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="relative">
              <input
                type="text"
                placeholder={t("Search for mangoes...", "আম খুঁজুন...")}
                className="w-full py-2.5 pl-11 pr-4 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#FFC324] focus:ring-2 focus:ring-[#FFC324]/20 text-sm bengali-text"
                autoFocus={searchOpen}
              />
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* ── LEFT DRAWER ──────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${drawerOpen ? "visible" : "invisible"}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setDrawerOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-[300px] max-w-[85vw] bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-out ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#1A1A1A] to-[#2D5A3D]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-lg">
                🥭
              </div>
              <div>
                <div className="font-display font-bold text-white text-base">
                  {t("Aam Bazar", "আম বাজার")}
                </div>
                <div className="text-[10px] text-green-300 bengali-text">
                  {t("Fresh from Orchard", "বাগান থেকে সরাসরি")}
                </div>
              </div>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Scroll area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-3 pt-4">
              {navLinks.map((link) => (
                <div key={link.href}>
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setCatExpanded(!catExpanded)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all mb-1 bengali-text ${
                          isActive(link.href)
                            ? "bg-[#FFF8E7] text-[#CC9600]"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive(link.href) ? "bg-[#FFC324]/20" : "bg-gray-100"}`}
                          >
                            <link.icon
                              size={15}
                              className={
                                isActive(link.href)
                                  ? "text-[#CC9600]"
                                  : "text-gray-500"
                              }
                            />
                          </div>
                          {t(link.en, link.bn)}
                        </div>
                        <ChevronDown
                          size={14}
                          className={`text-gray-400 transition-transform ${catExpanded ? "rotate-180" : ""}`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${catExpanded ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        <div className="pl-4 pr-2 mb-2 space-y-0.5">
                          {categories.map((cat) => (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              onClick={() => setDrawerOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                              <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${cat.color}22` }}
                              >
                                <cat.icon
                                  size={13}
                                  style={{ color: cat.color }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 bengali-text">
                                {t(cat.en, cat.bn)}
                              </span>
                              <ChevronRight
                                size={11}
                                className="text-gray-300 ml-auto"
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all mb-1 bengali-text ${
                        isActive(link.href)
                          ? "bg-[#FFF8E7] text-[#CC9600]"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive(link.href) ? "bg-[#FFC324]/20" : "bg-gray-100"}`}
                      >
                        {link.href === "/wishlist" ? (
                          <Heart
                            size={15}
                            className={
                              isActive(link.href)
                                ? "text-red-500"
                                : "text-gray-500"
                            }
                          />
                        ) : (
                          <link.icon
                            size={15}
                            className={
                              isActive(link.href)
                                ? "text-[#CC9600]"
                                : "text-gray-500"
                            }
                          />
                        )}
                      </div>
                      {t(link.en, link.bn)}
                      {link.href === "/wishlist" && wishCount > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {wishCount}
                        </span>
                      )}
                    </Link>
                  )}
                </div>
              ))}

              <div className="h-px bg-gray-100 my-3" />

              <Link
                href="/account"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all mb-1 bengali-text"
              >
                <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center">
                  <User size={15} className="text-gray-500" />
                </div>
                {t("My Account", "আমার অ্যাকাউন্ট")}
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 space-y-2.5">
            <button
              onClick={() => setLanguage(language === "en" ? "bn" : "en")}
              className="w-full py-2.5 rounded-2xl border border-[#FFC324]/50 text-sm font-semibold text-[#CC9600] hover:bg-[#FFF8E7] transition-colors bengali-text"
            >
              {language === "en" ? "🇧🇩 বাংলায় দেখুন" : "🇬🇧 View in English"}
            </button>
            <button
              onClick={() => {
                setDrawerOpen(false);
                toggleCart();
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#FFC324] to-[#FF8C00] text-gray-900 font-bold text-sm flex items-center justify-center gap-2 bengali-text shadow-md"
            >
              <ShoppingCart size={16} />
              {t("View Cart", "কার্ট দেখুন")}
              {cartCount > 0 && (
                <span className="bg-gray-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
