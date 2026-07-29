import { Link } from '@/i18n/navigation';
import { ClipboardList, Gift, Headset, House, Info, PartyPopper } from 'lucide-react';

export default function SecondaryNavigation() {
  return (
    <>
      <nav className="flex justify-center items-center gap-4 bg-bg-primary-saturated ">
        <Link className="flex p-3 gap-" href="/">
          <House />
          Home
        </Link>
        <Link className="flex" href="/products">
          <Gift />
          Products
        </Link>
        <Link className="flex" href="/categories">
          <ClipboardList />
          Categories
        </Link>
        <Link className="flex" href="/occasions">
          <PartyPopper />
          Occasions
        </Link>
        <Link className="flex" href="/contact">
          <Headset />
          Contact
        </Link>
        <Link className="flex" href="/about">
          <Info />
          About
        </Link>
      </nav>
    </>
  );
}
