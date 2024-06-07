import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";
import { useAppDispatch } from "../../../entities/hooks/storeHooks";
import { useLayoutEffect } from "react";
import { getCartKeys } from "../../../entities/slices/products/cartSlice";

export const Layout = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getCartKeys());
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
