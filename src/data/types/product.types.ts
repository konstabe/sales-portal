import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { ID, IResponseFields, SortOrder } from "./core.types";

export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}

export interface ICreatedOn {
  createdOn: string;
}

// export type IProductInTable = Pick<IProduct, "name" | "manufacturer" | "price"> & { createdOn: string };
export interface IProductInTable extends Pick<IProduct, "name" | "manufacturer" | "price">, ICreatedOn {}

export interface IProductDetails extends Required<IProduct>, ICreatedOn {}

export interface IProductFromResponse extends Required<IProduct>, ICreatedOn, ID {}

export interface IProductResponse extends IResponseFields {
  Product: IProductFromResponse;
}

export interface IProductsResponse extends IResponseFields {
  Products: IProductFromResponse[];
}

export interface IProductsSortedResponse extends IProductsResponse {
  total: number;
  page: number;
  limit: number;
  search: string;
  manufacturer: string[];
  sorting: {
    sortField: ProductsSortField;
    sortOrder: SortOrder;
  };
}



export type ProductsSortField = "createdOn" | "manufacturer" | "price" | "name";

export interface IGetProductsParams {
  manufacturer: MANUFACTURERS[];
  search: string;
  sortField: ProductsSortField;
  sortOrder: SortOrder;
  page: number;
  limit: number;
}

export type ProductsTableHeader = "Name" | "Price" | "Manufacturer" | "Created On";

export interface IProductsResponse extends IResponseFields {
  Products: IProductFromResponse[];
}

export interface IMetricDate {
  year: number;
  month: number;
  day: number;
}

export interface ICustomerGrowth {
  date: IMetricDate;
  count: number;
}

export interface IOrdersMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCanceledOrders: number;
  recentOrders: any[];
  ordersCountPerDay: any[];
}

export interface ICustomersMetrics {
  totalNewCustomers: number;
  topCustomers: any[];
  customerGrowth: ICustomerGrowth[];
}

export interface IProductsMetrics {
  topProducts: any[];
}

export interface IMetrics {
  orders: IOrdersMetrics;
  customers: ICustomersMetrics;
  products: IProductsMetrics;
}

export interface IMetricsResponse extends IResponseFields {
  Metrics: IMetrics;
}

export type IMetricsResponseMockParams = Partial<{
  Metrics: Partial<{
    orders: Partial<IOrdersMetrics>;
    customers: Partial<ICustomersMetrics>;
    products: Partial<IProductsMetrics>;
  }>;
  IsSuccess: boolean;
  ErrorMessage: string | null;
}>;