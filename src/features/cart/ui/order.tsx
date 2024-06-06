import { useEffect, useRef, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../entities/hooks/storeHooks";
import { postOrder } from "../../../entities/slices/products/cartSlice";

export const Order = () => {
  const [agreement, setAgreement] = useState(false);
  const dispatch = useAppDispatch();
  const CartItems = useAppSelector((state) => state.cart.cart);


  const adressRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);

  const checkOrder = (e: React.FormEvent) => {
    e.preventDefault();
    adressRef.current!.value != "" ||
      telRef.current!.value != "" ? (() => {
        let date: string = new Date(Date.now() + 90321000).toUTCString();
        document.cookie = `phoneNumber=${telRef.current!.value}; expires=${date}; secure`
        document.cookie = `adress=${adressRef.current!.value}; expires=${date}; secure`
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
        dispatch(postOrder(body))
        adressRef.current!.value = "";
        telRef.current!.value = "";
        setAgreement(false);
      })()
      : (
        adressRef.current!.value === "" ? adressRef.current!.classList.add('error') : '',
        telRef.current!.value === "" ? telRef.current!.classList.add('error') : ''
      )
  };

  useEffect(() => {
    const cookies = document.cookie
      .split(';')
      .map(item => { return { [item.split('=')[0].trim()]: item.split('=')[1].trim() } })
      .reduce((acc, item) => { return { ...acc, ...item } }, {})
    cookies.adress != undefined && (adressRef.current!.value = `${cookies.adress}`)
    cookies.phoneNumber != undefined && (telRef.current!.value = `${cookies.phoneNumber}`)

  }, [])

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
            disabled={!agreement || CartItems?.length == 0}
          >
            Оформить
          </button>
        </form>
      </div>
    </section>
  );
};
