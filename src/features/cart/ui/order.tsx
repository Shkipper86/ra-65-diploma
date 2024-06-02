import { useRef, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../entities/hooks/storeHooks";
import { postOrder } from "../../../entities/slices/products/cartSlice";
import ApiShared from "../../../shared/api/shared";

export const Order = () => {
  const [agreement, setAgreement] = useState(false);
  const dispatch = useAppDispatch();
  const CartItems = useAppSelector((state) => state.cart.cart);

  const adressRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);

  const checkOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = JSON.stringify({
      owner: {
        phone: telRef.current?.value,
        address: adressRef.current?.value,
      },
      items: CartItems?.map((item) => {
        return {
          id: item.id,
          price: item.price,
          count: item.quantity,
        };
      }),
    });
    await ApiShared.post("http://localhost:7070/api/order", body).then(() =>
      dispatch(postOrder())
    );
    adressRef.current!.value = "";
    telRef.current!.value = "";
    setAgreement(false);
  };

  const agreementCheck = () => {
    agreement ? setAgreement(false) : setAgreement(true);
  };
  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
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
              ref={adressRef}
              className="form-control"
              id="address"
              placeholder="Адрес доставки"
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreement"
              checked={agreement}
              onChange={agreementCheck}
            />
            <label className="form-check-label" htmlFor="agreement">
              Согласен с правилами доставки
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-outline-secondary"
            disabled={!agreement}
          >
            Оформить
          </button>
        </form>
      </div>
    </section>
  );
};
