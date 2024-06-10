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
  fetchTopError?: boolean;
  fetchCatalogError?: boolean;
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
  priceTitle: string;
  price: number;
  totalPrice: number;
};

export type CartTypes = {
  fetchCartError?: boolean;
  fetchStatus: boolean;
  cartKeys: string[];
  cart?: CartItemTypes[];
  orderSendStatus?: boolean;
  checkPriceStatus?: boolean;
  equalityPrice?: boolean
};
