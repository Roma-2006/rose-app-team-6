import CategoryList from '../category/category-list';
import OccasionList from '../occasion/occasion-list';

const Filter = () => {
  return (
    <div className="flex flex-col gap-6">
      <CategoryList />
      <OccasionList />
    </div>
  );
};
export default Filter;
