'use client';
import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] px-4">
      <div className="text-center">
        <div className="text-8xl mb-6 animate-float">🥭</div>
        <h1 className="font-display text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-500 text-lg mb-8 bengali-text">পেজটি পাওয়া যায়নি</p>
        <Link href="/" className="btn-primary px-8 py-3.5 rounded-2xl font-bold inline-block bengali-text">হোমে ফিরুন</Link>
      </div>
    </div>
  );
}
