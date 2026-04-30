// ============================================
// PRODUCT TYPES
// ============================================
export type MangoCategory = 'ripe' | 'raw' | 'dried' | 'juice' | 'pickle' | 'all';

export interface MangoVariety {
  id: string;
  name: string;
  nameBn: string;
  origin: string;
  originBn: string;
}

export interface Product {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  description: string;
  descriptionBn: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: MangoCategory;
  variety: MangoVariety;
  images: string[];
  weight: string;
  weightBn: string;
  stock: number;
  rating: number;
  reviewCount: number;
  isOrganic: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  harvestSeason: string;
  harvestSeasonBn: string;
  tags: string[];
  nutritionFacts?: NutritionFacts;
}

export interface NutritionFacts {
  calories: number;
  carbohydrates: number;
  fiber: number;
  sugar: number;
  vitaminC: number;
  vitaminA: number;
}

// ============================================
// CART TYPES
// ============================================
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// ============================================
// USER TYPES
// ============================================
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: Address;
  avatar?: string;
}

export interface Address {
  street: string;
  city: string;
  district: string;
  division: string;
  postalCode: string;
  country: string;
}

// ============================================
// ORDER TYPES
// ============================================
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: Address;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  trackingId?: string;
}

// ============================================
// REVIEW TYPES
// ============================================
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  comment: string;
  commentBn?: string;
  createdAt: string;
  helpful: number;
}

// ============================================
// FILTER TYPES
// ============================================
export interface ProductFilters {
  category: MangoCategory;
  priceRange: [number, number];
  isOrganic: boolean;
  minRating: number;
  sortBy: SortOption;
  search: string;
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular';

// ============================================
// NAV TYPES
// ============================================
export interface NavItem {
  label: string;
  labelBn: string;
  href: string;
  children?: NavItem[];
}

// ============================================
// LANGUAGE
// ============================================
export type Language = 'en' | 'bn';
