import { IProductsBaseTypes } from "../../../entities/slices/products/productsTypes";
import { Link } from "react-router-dom";
export const CatalogItem = (props: { product: IProductsBaseTypes }) => {
  const product = props.product;

  return (
    <>
      <img
        src={product.images[0]}
        className="card-img-top img-fluid"
        alt={product.title}
      />
      <div className="card-body">
        <p className="card-text">{product.title}</p>
        <p className="card-text">{product.price} руб.</p>
        <Link to={`/product/${product.id}`} className="btn btn-outline-primary">
          Заказать
        </Link>
      </div>
    </>
  );
};
