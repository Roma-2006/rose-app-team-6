import CategoryList from '../category/category-list';
import OccasionList from '../occasion/occasion-list';
import RatingFilter from '../rating/rating-filter';

const Filter = () => {
  return (
    <div className="flex flex-col gap-6">
      <CategoryList />
      <OccasionList />
      <RatingFilter />
    </div>
  );
};
export default Filter;
