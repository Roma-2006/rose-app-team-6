import { SidebarGroup } from '@/shared/components/ui/sidebar';
import CategoryList from '../category/category-list';
import OccasionList from '../occasion/occasion-list';
import PriceFilter from '../price/price-filter';
import RatingFilter from '../rating/rating-filter';
import ResetAllButton from './reset-all-button';

const Filter = () => {
  return (
    <aside className="flex flex-col">
      <SidebarGroup className="p-0">
        <CategoryList />
      </SidebarGroup>
      <SidebarGroup className="p-0">
        <OccasionList />
      </SidebarGroup>
      <SidebarGroup className="p-0">
        <RatingFilter />
      </SidebarGroup>
      <SidebarGroup className="p-0">
        <PriceFilter />
      </SidebarGroup>
      <SidebarGroup className="p-0 pt-4">
        <ResetAllButton />
      </SidebarGroup>
    </aside>
  );
};
export default Filter;
