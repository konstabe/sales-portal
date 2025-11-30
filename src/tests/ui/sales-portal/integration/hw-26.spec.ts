import { TAGS } from 'data/tags';
import { test, expect } from 'fixtures/business.fixture';
import { generateMetricsResponse } from 'utils/generateMetricsResponse';

const formatShort = (val: number) => {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })
    .format(val)
    .toLowerCase();
};

test.describe('[Integration] [Sales Portal] [Home] Metrics', () => {
  const metricsMock = generateMetricsResponse({
    Metrics: {
      orders: {
        totalOrders: 25,
        totalRevenue: 125,
        averageOrderValue: 500,
        totalCanceledOrders: 3,
      },
      customers: {
        totalNewCustomers: 7,
      },
    },
  });

  const {
    orders: { totalOrders, totalRevenue, averageOrderValue, totalCanceledOrders },
    customers: { totalNewCustomers },
  } = metricsMock.Metrics;

  const cases = [
    ['HW_26_Orders This Year metric', 'orderThisYearMetric', totalOrders.toString()],
    ['HW_26_New Customers metric', 'newCustomerMetric', totalNewCustomers.toString()],
    ['HW_26_Canceled Orders metric', 'canceledOrdersMetric', totalCanceledOrders.toString()],
    ['HW_26_Total Revenue metric', 'totalRevenueMetric', '$' + formatShort(totalRevenue)],
    ['HW_26_Avg Order Value metric', 'avgOrdersValue', '$' + formatShort(averageOrderValue)],
  ] as const;

  test.beforeEach(async ({ homePage, mock, loginAsAdmin }) => {
    await mock.homePageMetrics(metricsMock);
    await loginAsAdmin();
    await homePage.waitForOpened();
  });

  for (const [title, locator, expected] of cases) {
    test(title, {tag: TAGS.VISUAL},async ({ homePage, page }) => {
        await page.pause();
      await expect(homePage[locator]).toHaveText(expected);
    });
  }
});
