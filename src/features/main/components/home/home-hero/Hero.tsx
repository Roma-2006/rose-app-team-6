import HeroAside from './hero-aside';
import HeroCards from './hero-cards';
import HeroCarousel from './hero-carousel';
import ServiceFeatures from './service-features';

export default function Hero() {
  return (
    <section>
      <div className="grid gap-4 lg:grid-cols-4 ">
        <div className="lg:col-span-1">
          <HeroAside />
        </div>
        <div className="lg:col-span-3">
          <HeroCarousel />
        </div>
        <div className="col-span-1 lg:col-span-4 mt-2">
          <HeroCards />
        </div>
        <div className="col-span-1 lg:col-span-4 mt-2">
          <ServiceFeatures />
        </div>
      </div>
    </section>
  );
}
