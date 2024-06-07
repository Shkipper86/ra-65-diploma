import { Banner } from "../shared/ui/layout/banner";
import { Catalog } from "../features/catalog/ui/catalog";
import { useAppDispatch, useAppSelector } from "../entities/hooks/storeHooks";
import { changeSearchString } from "../entities/slices/header/headerSlice";
import { searchProducts } from "../entities/slices/products/catalogSlice";
import { IQueryParams } from "../entities/slices/products/productsTypes";

export const CatalogPage = () => {
  const headerState = useAppSelector((state) => state.header);
  const category: number = useAppSelector((state) => state.catalog.category);
  const dispatch = useAppDispatch();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const qParams: IQueryParams = {
      offset: 0,
      category: category,
      searchString: headerState.search.searchString,
    };
    dispatch(searchProducts(qParams));
  };

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            <form
              className="catalog-search-form form-inline"
              onSubmit={submitHandler}
            >
              <input
                className="form-control"
                placeholder="Поиск"
                value={headerState.search.searchString}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(changeSearchString(e.target.value))
                }
              />
            </form>
            <Catalog />
          </section>
        </div>
      </div>
    </main>
  );
};
