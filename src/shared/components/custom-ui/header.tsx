import { User } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="py-4.5 px-9 gap-4">
      <div className="w-21.25 h-20 relative">
        <Image
          src="/assets/images/logo.png"
          alt="Rose app logo"
          fill
          //priority
          className="object-cover object-center "
        />
      </div>
      {/* search input */}
      <div>
        <span className="flex gap-1.5 px-4 py-4.5 ">
          <User size={20} /> Login
        </span>
      </div>
    </header>
  );
}
