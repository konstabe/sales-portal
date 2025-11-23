import { generateProductResponseData } from "data/salesPortal/products/generateProductData";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { TAGS } from "data/tags";
import { IProductFromResponse } from "data/types/product.types";
import { test, expect } from "fixtures/business.fixture";

test.describe("[Sales Portal] [Visual]", () => {
  test(
    "Product Details Modal",
    { tag: TAGS.VISUAL },
    async function ({ productsListPage, productsListUIService, mock }) {
      const expectedProductResponse: IProductFromResponse = {
        ...generateProductResponseData(),
        name: "Test Product",
        manufacturer: MANUFACTURERS.GOOGLE,
        amount: 3,
        notes: "Test notes",
        price: 1,
        createdOn: "2025-11-14T18:19:18.000Z",
      };

      await mock.productsPage({
        Products: [expectedProductResponse],
        IsSuccess: true,
        ErrorMessage: null,
        total: 1,
        page: 1,
        limit: 10,
        search: "",
        manufacturer: [],
        sorting: {
          sortField: "createdOn",
          sortOrder: "desc",
        },
      });

      await mock.productDetailsModal({
        Product: expectedProductResponse,
        IsSuccess: true,
        ErrorMessage: null,
      });

      await productsListUIService.open();
      await productsListUIService.openDetailsModal(expectedProductResponse.name);
      await expect(productsListPage.detailsModal.uniqueElement).toHaveScreenshot();
    },
  );

  test("Products Page", { tag: TAGS.VISUAL }, async function ({ page, productsListUIService, mock }) {
    await mock.productsPage({
      Products: [],
      IsSuccess: true,
      ErrorMessage: null,
      total: 1,
      page: 1,
      limit: 10,
      search: "",
      manufacturer: [],
      sorting: {
        sortField: "createdOn",
        sortOrder: "desc",
      },
    });

    await productsListUIService.open();
    await expect(page).toHaveScreenshot();
  });

  test(
    "Products Page components",
    { tag: TAGS.VISUAL },
    async function ({ productsListPage, productsListUIService, mock }) {
      await mock.productsPage({
        Products: [],
        IsSuccess: true,
        ErrorMessage: null,
        total: 1,
        page: 1,
        limit: 10,
        search: "",
        manufacturer: [],
        sorting: {
          sortField: "createdOn",
          sortOrder: "desc",
        },
      });

      await productsListUIService.open();
      await expect(productsListPage.headerContainer).toHaveScreenshot();
      await expect(productsListPage.navBar).toHaveScreenshot();
      await expect(productsListPage.table).toHaveScreenshot({ maxDiffPixels: 20 });
    },
  );
});
