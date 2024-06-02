import { useEffect, useState } from "react";
import { useAppDispatch } from "../entities/hooks/storeHooks";
import { Banner } from "../shared/ui/layout/banner";
import ApiShared from "../shared/api/shared";
import { useLocation } from "react-router-dom";
import { IProductCardTypes } from "../entities/slices/products/productsTypes";
import { getCartKeys } from "../entities/slices/products/cartSlice";

export const Product = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [productProperties, setProductProperties] =
    useState<IProductCardTypes>();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const incrementHandler = () => {
    quantity < 10 && setQuantity((quantity) => quantity + 1);
  };

  const decrementHandler = () => {
    quantity > 1 && setQuantity((quantity) => quantity - 1);
  };

  useEffect(() => {
    ApiShared.get(
      `http://localhost:7070/api/items/${location.pathname.split("/").pop()}`
    ).then((response) => setProductProperties(response));
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
  };

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
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
        </div>
      </div>
    </main>
  );
};
