import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../entities/hooks/storeHooks";
import { Banner } from "../shared/ui/layout/banner";
import { useLocation, useNavigate } from "react-router-dom";
import { IProductCardTypes } from "../entities/slices/products/productsTypes";
import { getCartKeys } from "../entities/slices/products/cartSlice";
import { getItemProperties } from "../entities/slices/products/catalogSlice";
import { Preloader } from "../shared/ui/layout/preloader";

export const Product = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const productProperties: IProductCardTypes | undefined = useAppSelector(state => state.catalog.product)
  const prodictPropertiesFetchStatus: boolean = useAppSelector(state => state.catalog.prodictPropertiesFetchStatus)
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const incrementHandler = () => {
    quantity < 10 && setQuantity((quantity) => quantity + 1);
  };

  const decrementHandler = () => {
    quantity > 1 && setQuantity((quantity) => quantity - 1);
  };

  useEffect(() => {
    dispatch(getItemProperties(`${location.pathname.split("/").pop()}`))
  }, []);

  const addInCart = () => {
    localStorage.setItem(
      `${productProperties?.id}`,
      `${JSON.stringify({
        title: productProperties?.title,
        size: selectedSize,
        price: productProperties?.price,
        quantity: quantity,
      })}`
    );
    dispatch(getCartKeys());
    navigate('/cart')
  };

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          {prodictPropertiesFetchStatus ? <Preloader />
            :
            <section className="catalog-item">
              <h2 className="text-center">{productProperties?.title}</h2>
              <div className="row">
                <div className="col-5">
                  <img
                    src={productProperties?.images[0]}
                    className="img-fluid"
                    alt={productProperties?.title}
                  />
                </div>
                <div className="col-7">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td>Артикул</td>
                        <td>{productProperties?.sku}</td>
                      </tr>
                      <tr>
                        <td>Производитель</td>
                        <td>{productProperties?.manufacturer}</td>
                      </tr>
                      <tr>
                        <td>Цвет</td>
                        <td>{productProperties?.color}</td>
                      </tr>
                      <tr>
                        <td>Материалы</td>
                        <td>{productProperties?.material}</td>
                      </tr>
                      <tr>
                        <td>Сезон</td>
                        <td>{productProperties?.season}</td>
                      </tr>
                      <tr>
                        <td>Повод</td>
                        <td>{productProperties?.reason}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-center">
                    <p>
                      Размеры в наличии:
                      {productProperties?.sizes.map((size) => {
                        return size.available ? (
                          <span
                            className={
                              selectedSize === size.size
                                ? "catalog-item-size selected"
                                : "catalog-item-size"
                            }
                            key={size.size}
                            onClick={() => setSelectedSize(size.size)}
                          >
                            {size.size}
                          </span>
                        ) : (
                          ""
                        );
                      })}
                    </p>
                    {productProperties?.sizes.some((size) => size.available) && (
                      <p>
                        Количество:
                        <span className="btn-group btn-group-sm pl-2">
                          <button
                            className="btn btn-secondary"
                            onClick={decrementHandler}
                          >
                            -
                          </button>
                          <span className="btn btn-outline-primary">
                            {quantity}
                          </span>
                          <button
                            className="btn btn-secondary"
                            onClick={incrementHandler}
                          >
                            +
                          </button>
                        </span>
                      </p>
                    )}
                  </div>
                  <button
                    className="btn btn-danger btn-block btn-lg"
                    disabled={selectedSize === ""}
                    onClick={addInCart}
                  >
                    В корзину
                  </button>
                </div>
              </div>
            </section>
          }
        </div>
      </div>
    </main>
  );
};
