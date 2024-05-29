import { useEffect } from "react";
import {
  getCatalog,
  getCategories,
} from "../../../entities/slices/products/catalogSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../entities/hooks/storeHooks";
import {
  IProductCategories,
  IQueryParams,
} from "../../../entities/slices/products/productsTypes";

export const Categories = () => {
  const dispatch = useAppDispatch();
  const categories: IProductCategories[] | undefined = useAppSelector(
    (state) => state.catalog.categories
  );
  const selectedCategory: number | string | undefined = useAppSelector(
    (state) => state.catalog.category
  );

  const searchString: string = useAppSelector(
    (state) => state.header.search.searchString
  );

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const getCatalogWithCategory = (categoryId: number) => (): void => {
    const qParams: IQueryParams = {
      offset: 0,
      category: categoryId,
      searchString: searchString,
    };
    selectedCategory != categoryId && dispatch(getCatalog(qParams));
  };

  const categoriesList = categories?.map((category) => {
    return (
      <li
        className="nav-item"
        key={category.id}
        onClick={getCatalogWithCategory(category.id)}
      >
        <span
          className={
            category.id === selectedCategory
              ? "category-item active"
              : "category-item"
          }
        >
          {category.title}
        </span>
      </li>
    );
  });

  return (
    <ul className="catalog-categories nav justify-content-center">
      {categoriesList}
    </ul>
  );
};
