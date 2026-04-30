import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `৳${price.toLocaleString('bn-BD')}`;
}

export function formatPriceEn(price: number): string {
  return `৳${price.toLocaleString('en-BD')}`;
}

export function calculateDiscount(original: number, discounted: number): number {
  return Math.round(((original - discounted) / original) * 100);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getCategoryLabel(category: string, lang: 'en' | 'bn'): string {
  const labels: Record<string, { en: string; bn: string }> = {
    all: { en: 'All Products', bn: 'সব পণ্য' },
    ripe: { en: 'Ripe Mango', bn: 'পাকা আম' },
    raw: { en: 'Raw Mango', bn: 'কাঁচা আম' },
    dried: { en: 'Dried Mango', bn: 'শুকনো আম' },
    juice: { en: 'Mango Juice', bn: 'আমের জুস' },
    pickle: { en: 'Mango Pickle', bn: 'আমের আচার' },
  };
  return labels[category]?.[lang] || category;
}
