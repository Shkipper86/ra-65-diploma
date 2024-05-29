import { Catalog } from "../features/catalog/ui/catalog";
import { TopSales } from "../features/top-sales/ui/top-sales";
import { Banner } from "../shared/ui/layout/banner";

export const MainPage = () => {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            <TopSales />
          </section>
          <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            <Catalog />
          </section>
        </div>
      </div>
    </main>
  );
};
