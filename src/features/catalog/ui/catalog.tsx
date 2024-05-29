import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../entities/hooks/storeHooks";
import { Categories } from "./categories";
import {
  getCatalog,
  loadNextItems,
} from "../../../entities/slices/products/catalogSlice";
import {
  IProductsBaseTypes,
  IQueryParams,
} from "../../../entities/slices/products/productsTypes";
import { CatalogItem } from "../../../shared/ui/layout/catalogItem";
import { Preloader } from "../../../shared/ui/layout/preloader";

export const Catalog = () => {
  const dispatch = useAppDispatch();
  const catalog: IProductsBaseTypes[] | undefined = useAppSelector(
    (state) => state.catalog.productList
  );
  const catalogFetchStatus: boolean = useAppSelector(
    (state) => state.catalog.fetchStatus
  );
  const offset: number = useAppSelector((state) => state.catalog.offset);
  const category: number = useAppSelector((state) => state.catalog.category);
  const offasetMoreStatus: boolean | undefined = useAppSelector(
    (state) => state.catalog.offsetMorestatus
  );
  const searchString: string = useAppSelector(
    (state) => state.header.search.searchString
  );

  useEffect(() => {
    const qParams: IQueryParams = {
      offset: offset,
      category: 11,
      searchString: searchString,
    };
    dispatch(getCatalog(qParams));
  }, []);

  const loadNext = () => {
    const qParams: IQueryParams = {
      offset: offset + 6,
      category: category,
      searchString: searchString,
    };
    dispatch(loadNextItems(qParams));
  };

  const catalogList = catalog?.map((product) => {
    return (
      <div className="col-4" key={product.id}>
        <div className="card catalog-item-card">
          <CatalogItem product={product} />
        </div>
      </div>
    );
  });

  return (
    <>
      <Categories />
      <div className="row">{catalogList}</div>
      {catalogFetchStatus && <Preloader />}
      <div className="text-center">
        {offasetMoreStatus && (
          <button
            className="btn btn-outline-primary"
            onClick={loadNext}
            disabled={catalogFetchStatus}
          >
            Загрузить ещё
          </button>
        )}
      </div>
    </>
  );
};
