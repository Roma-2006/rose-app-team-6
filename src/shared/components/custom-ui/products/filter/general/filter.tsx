import CategoryList from '../category/category-list';
import OccasionList from '../occasion/occasion-list';
import PriceFilter from '../price/price-filter';
import RatingFilter from '../rating/rating-filter';
import ResetAllButton from './reset-all-button';

const Filter = () => {
  return (
    <aside className="flex flex-col gap-6">
      <CategoryList />
      <OccasionList />
      <RatingFilter />
      <PriceFilter />
      <ResetAllButton />
    </aside>
  );
};
export default Filter;
