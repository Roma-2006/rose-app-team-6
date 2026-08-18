import { ClipboardList, Gift, Headset, House, Info, PartyPopper } from 'lucide-react';
import LinkComponent from './link-component';

export default function SecondaryNavigation() {
  return (
    <nav className="flex flex-nowrap md:flex-wrap justify-start md:justify-center items-center   gap-1 md:gap-4 bg-bg-primary-saturated ">
      <LinkComponent
        href="/"
        title="nav.home"
        icon={<House className="hidden sm:block" size={20} />}
      />
      <LinkComponent
        href="/products"
        title="nav.products"
        icon={<Gift className="hidden sm:block" size={20} />}
      />
      <LinkComponent
        href="/categories"
        title="nav.categories"
        icon={<ClipboardList className="hidden sm:block" size={20} />}
      />
      <LinkComponent
        href="/occasions"
        title="nav.occasions"
        icon={<PartyPopper className="hidden sm:block" size={20} />}
      />
      <LinkComponent
        href="/contact"
        title="nav.contact"
        icon={<Headset className="hidden sm:block" size={20} />}
      />
      <LinkComponent
        href="/about"
        title="nav.about"
        icon={<Info className="hidden sm:block" size={20} />}
      />
    </nav>
  );
}
