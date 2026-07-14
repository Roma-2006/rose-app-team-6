'use client';
import { ClipboardList, Gift, Headset, House, Info, PartyPopper } from 'lucide-react';
import LinkComponent from './link-component';

export default function SecondaryNavigation() {
  return (
    <nav className="flex justify-center items-center gap-4 bg-bg-primary-saturated ">
      <LinkComponent href="/" title="Home" icon={<House size={20} />} />
      <LinkComponent href="/products" title="Products" icon={<Gift size={20} />} />
      <LinkComponent href="/categories" title="Categories" icon={<ClipboardList size={20} />} />
      <LinkComponent href="/occasions" title="Occasions" icon={<PartyPopper size={20} />} />
      <LinkComponent href="/contact" title=" Contact" icon={<Headset size={20} />} />
      <LinkComponent href="/about" title="About" icon={<Info size={20} />} />
    </nav>
  );
}
