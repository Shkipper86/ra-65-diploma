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
  sku: string;
  sizes: {
    size: string;
    available: boolean;
  }[];
}

export interface IProductCategories {
  id: number;
  title: string;
}

export interface IQueryParams {
  category: number;
  offset: number;
  searchString?: string;
}

// Типы для стейта товаров
export type InitialStateTypes = {
  fetchStatus: boolean;
  prodictPropertiesFetchStatus: boolean;
  product?: IProductCardTypes;
  topProductList?: IProductsBaseTypes[];
  productList?: IProductsBaseTypes[];
  category: number;
  categories?: IProductCategories[];
  offset: number;
  offsetMorestatus?: boolean;
};

export type CartItemTypes = {
  id: number;
  title: string;
  size: string;
  quantity: number;
  price: number;
  totalPrice: number;
};

export type CartTypes = {
  cartKeys: string[];
  cart?: CartItemTypes[];
};
