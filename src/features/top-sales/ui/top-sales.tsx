import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../entities/hooks/storeHooks";
import { getTopSalesList } from "../../../entities/slices/products/topSalesSlice";
import { IProductsBaseTypes } from "../../../entities/slices/products/productsTypes";
import { Link } from "react-router-dom";
import { Preloader } from "../../../shared/ui/layout/preloader";

export const TopSales = () => {
  const topProductState: IProductsBaseTypes[] | undefined = useAppSelector(
    (state) => state.topSales.productList
  );
  const topProductsFetchStatus: boolean = useAppSelector(
    (state) => state.topSales.fetchStatus
  );
  const dispatch = useAppDispatch();

  const productList = topProductState?.map((product) => {
    return (
      <>
        <div className="col-4" key={product.id}>
          <div className="card">
            <img
              src={product.images[0]}
              className="card-img-top img-fluid"
              alt={product.title}
            />
            <div className="card-body">
              <p className="card-text">{product.title}</p>
              <p className="card-text">{product.price} руб.</p>
              <Link
                to={`/product/${product.id}`}
                className="btn btn-outline-primary"
              >
                Заказать
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  });

  useEffect(() => {
    dispatch(getTopSalesList());
  }, []);

  return (
    <>
      {topProductsFetchStatus && <Preloader />}
      <div className="row">{productList}</div>
    </>
  );
};
