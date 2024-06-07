import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../entities/hooks/storeHooks";
import { getTopSalesList } from "../../../entities/slices/products/topSalesSlice";
import { IProductsBaseTypes } from "../../../entities/slices/products/productsTypes";
import { Preloader } from "../../../shared/ui/layout/preloader";
import { CatalogItem } from "../../../shared/ui/layout/catalogItem";
import { Error } from "../../../shared/ui/layout/error";

export const TopSales = () => {
  const topProductState: IProductsBaseTypes[] | undefined = useAppSelector(
    (state) => state.topSales.topProductList
  );
  const topProductsFetchStatus: boolean = useAppSelector(
    (state) => state.topSales.fetchStatus
  );
  const fetchErrorStatus = useAppSelector(state => state.topSales.fetchTopError)
  const dispatch = useAppDispatch();

  const productList = topProductState?.map((product) => {
    return (
      <div className="col-4" key={product.id}>
        <div className="card">
          <CatalogItem product={product} />
        </div>
      </div>
    );
  });

  useEffect(() => {
    dispatch(getTopSalesList());
  }, []);

  return (
    <>
      {
        fetchErrorStatus ? <><Error request={getTopSalesList()} />
        </>
          :
          <>
            {topProductsFetchStatus && <Preloader />}
            <div className="row">{productList}</div>
          </>
      }
    </>
  );
};
