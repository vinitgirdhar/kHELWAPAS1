import Hero from '@/components/home/hero';
import FeatureCards from '@/components/home/feature-cards';
import FeaturedProducts from '@/components/home/featured-products';
import SeasonalBanner from '@/components/home/seasonal-banner';
import Testimonials from '@/components/home/testimonials';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeatureCards />
      <FeaturedProducts />
      <SeasonalBanner />
      <Testimonials />
    </div>
  );
}
