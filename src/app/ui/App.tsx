import { Route, Routes } from "react-router-dom";
import { MainPage } from "../../pages/main-page";
import { CatalogPage } from "../../pages/catalog-page";
import { About } from "../../pages/about-page";
import { Product } from "../../pages/product-page";
import { Cart } from "../../pages/cart-page";
import { Error404_page } from "../../pages/error404-page";
import { Layout } from "../../shared/ui/layout/layout";
import { Contacts } from "../../pages/contacts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Главная страница */}
        <Route index element={<MainPage />} />
        {/* Каталог */}
        <Route path="catalog" element={<CatalogPage />} />
        {/* О магазине */}
        <Route path="about" element={<About />} />
        {/* Сраница товара */}
        <Route path="product/:id" element={<Product />} />
        {/* Корзина */}
        <Route path="cart" element={<Cart />} />
        {/* Контакты */}
        <Route path="contacts" element={<Contacts />} />
        {/* 404 */}
        <Route path="*" element={<Error404_page />} />
      </Route>
    </Routes>
  );
}

export default App;
