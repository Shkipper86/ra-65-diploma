import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../entities/hooks/storeHooks";
import {
  deleteCartItems,
  getCartItems,
} from "../entities/slices/products/cartSlice";
import { Banner } from "../shared/ui/layout/banner";
import { Link } from "react-router-dom";
import { Order } from "../features/cart/ui/order";

export const Cart = () => {
  const dispatch = useAppDispatch();
  const CartItems = useAppSelector((state) => state.cart.cart);

  useEffect(() => {
    dispatch(getCartItems());

  }, []);

  const tBody = CartItems?.map((cart, index) => {
    return (
      <tr key={cart.id}>
        <td scope="row">{index + 1}</td>
        <td>
          <Link to={`/product/${cart.id}`}>{cart.title}</Link>
        </td>
        <td>{cart.size}</td>
        <td>{cart.quantity}</td>
        <td>{cart.price}</td>
        <td>{cart.totalPrice}</td>
        <td>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => dispatch(deleteCartItems(cart.id))}
          >
            Удалить
          </button>
        </td>
      </tr>
    );
  });

  let totalCost: number = 0;
  CartItems?.forEach((item) => {
    totalCost = totalCost + item.totalPrice;
  });

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>
                {tBody}
                <tr>
                  <td colSpan={5} className="text-right">
                    Общая стоимость
                  </td>
                  <td>{totalCost}</td>
                </tr>
              </tbody>
            </table>
          </section>
          <Order />
          {/* <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div
              className="card"
              style={{ maxWidth: "30rem", margin: "0 auto" }}
            >
              <form className="card-body" onSubmit={checkOrder}>
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input
                    ref={telRef}
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="Ваш телефон"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input
                    ref={orederRef}
                    className="form-control"
                    id="address"
                    placeholder="Адрес доставки"
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    ref={checkRef}
                    type="checkbox"
                    className="form-check-input"
                    id="agreement"
                  />
                  <label className="form-check-label" htmlFor="agreement">
                    Согласен с правилами доставки
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-secondary"
                  disabled={checkRef.current?.checked}
                >
                  Оформить
                </button>
              </form>
            </div>
          </section> */}
        </div>
      </div>
    </main>
  );
};
