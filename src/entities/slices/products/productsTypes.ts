// Базовые типы товара
export interface IProductsBaseTypes {
  id: number;
  category: number;
  title: string;
  price: number;
  images: string[];
}

// Расширенные типы карточки товара
export interface IProductCardTypes extends IProductsBaseTypes {
  manufacturer: string;
  color: string;
  material: string;
  reason: string;
  season: string;
  heelSize: string;
  oldPrice: number;
  sizes: {
    size: string;
    available: boolean;
  }[];
}

// export type ProductsTypes = IProductsBaseTypes | IProductCardTypes;

// Типы для стейта товаров
export type InitialState = {
  fetchStatus: boolean;
  product?: IProductCardTypes;
  productList?: IProductsBaseTypes[];
};
