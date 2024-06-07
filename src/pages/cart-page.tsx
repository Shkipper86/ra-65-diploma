import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../entities/hooks/storeHooks";
import {
  deleteCartItems,
  getCartItems,
} from "../entities/slices/products/cartSlice";
import { Banner } from "../shared/ui/layout/banner";
import { Link } from "react-router-dom";
import { Order } from "../features/cart/ui/order";
import { Preloader } from "../shared/ui/layout/preloader";

export const Cart = () => {
  const dispatch = useAppDispatch();
  const CartItems = useAppSelector((state) => state.cart.cart);
  const cartFetchStatus = useAppSelector((state) => state.cart.fetchStatus);
  const orderSendStatus = useAppSelector(state => state.cart.orderSendStatus)

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
          {cartFetchStatus ? <Preloader />
            : orderSendStatus ?
              <div className="successful">
                <h2>Благодарим за заказ!</h2>
              </div>
              : <Order />
          }
        </div>
      </div>
    </main>
  );
};
