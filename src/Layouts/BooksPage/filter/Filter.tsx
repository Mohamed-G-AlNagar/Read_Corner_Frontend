import { useCategories } from '../../hooks/categoryHooks';
import toast from 'react-hot-toast';
import { ICategory } from '../../models/category';

import Spinner from '../spinner/Spinner';

interface FilterProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

// prettier-ignore
export default function Filter({ selectedCategory, setSelectedCategory }:FilterProps) {
  const {
    categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();


  function handleCategorySelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCategory(event.target.value);
  }

  if (categoriesLoading) return <Spinner />; // Return loading indicator if any of the data is still loading
  if (categoriesError) toast.error(categoriesError.message);

  return (
    <div className="btn-group filter-container m-2 w-50">
      <select
        className="form-select border border-info shadow-sm"
        value={selectedCategory}
        onChange={handleCategorySelect}
      >
        <option value="All">All</option>
        {categories.map((cat: ICategory) => (
          <option value={cat.categoryName} key={cat.id}>
            {cat.categoryName}
          </option>
        ))}
      </select>
    </div>
  );
}
