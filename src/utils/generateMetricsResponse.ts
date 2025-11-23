import { faker } from '@faker-js/faker';
import { IMetricsResponseMockParams, IMetricsResponse } from 'data/types/product.types';


const randomInt = () => faker.number.int({ min: 0, max: 100 });

export function generateMetricsResponse(
  params: IMetricsResponseMockParams = {}
): IMetricsResponse {
  const {
    Metrics: {
      orders = {},
      customers = {},
      products = {},
    } = {},
  } = params;

  return {
    Metrics: {
      orders: {
        totalRevenue: randomInt(),
        totalOrders: randomInt(),
        averageOrderValue: randomInt(),
        totalCanceledOrders: randomInt(),
        recentOrders: [],
        ordersCountPerDay: [],
        ...orders,
      },
      customers: {
        totalNewCustomers: randomInt(),
        topCustomers: [],
        customerGrowth: [],
        ...customers,
      },
      products: {
        topProducts: [],
        ...products,
      },
    },
    ErrorMessage: null,
    IsSuccess: true,
  };
}
