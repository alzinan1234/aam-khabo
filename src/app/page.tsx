import HeroSection from '@/components/home/HeroSection';
import MarqueeSection from '@/components/home/MarqueeSection';
import CategorySection from '@/components/home/CategorySection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import OfferBanner from '@/components/home/OfferBanner';
import TestimonialsSection from '@/components/home/TestimonialsSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <CategorySection />
      <FeaturedProducts />
      <OfferBanner />
      <WhyChooseUs />
      <TestimonialsSection />
    </>
  );
}
