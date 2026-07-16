import { heroCards } from '@/features/dashboard/constants/home';
import CategoryCards from './category-card';

export default function HeroCards() {
  return (
    <div className="grid grid-cols-1 gap-6   sm:grid-cols-2 lg:grid-cols-3 ">
      {heroCards.map((card) => (
        <CategoryCards
          key={card.id}
          image={card.image}
          badge={card.badge}
          title={card.title}
          href={card.href}
        />
      ))}
    </div>
  );
}
