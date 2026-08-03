'use client';
import { ClipboardList, Gift, Headset, House, Info, PartyPopper } from 'lucide-react';
import LinkComponent from './link-component';

export default function SecondaryNavigation() {
  return (
    <nav className="flex justify-center items-center gap-4 bg-bg-primary-saturated ">
      <LinkComponent href="/" title="nav.home" icon={<House size={20} />} />
      <LinkComponent href="/products" title="nav.products" icon={<Gift size={20} />} />
      <LinkComponent href="/categories" title="nav.categories" icon={<ClipboardList size={20} />} />
      <LinkComponent href="/occasions" title="nav.occasions" icon={<PartyPopper size={20} />} />
      <LinkComponent href="/contact" title="nav.contact" icon={<Headset size={20} />} />
      <LinkComponent href="/about" title="nav.about" icon={<Info size={20} />} />
    </nav>
  );
}
