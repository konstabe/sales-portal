import { Page } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { STATUS_CODES } from "data/statusCodes";
import { IProduct, IProductResponse } from "data/types/product.types";
import { expect } from "fixtures";

import _ from "lodash";
import { ProductsListPage } from "ui/pages/products";
import { UpdateProductPage } from "ui/pages/products/updateProduct.page";

export class UpdateProductUIService {
  private readonly updateProductPage: UpdateProductPage;
  private readonly productsListPage: ProductsListPage;

  constructor(private readonly page: Page) {
    this.updateProductPage = new UpdateProductPage(page);
    this.productsListPage = new ProductsListPage(page);
  }

  async openAddForm() {
    await this.updateProductPage.open("products/add");
    await this.updateProductPage.waitForOpened();
  }

  async update(overrides?: Partial<IProduct>) {
    const data = generateProductData(overrides);

    await this.updateProductPage.fillForm(data);

    const { status, body } = await this.updateProductPage.interceptResponse<IProductResponse, unknown[]>(
      apiConfig.endpoints.products,
      () => this.updateProductPage.clickSave()
    );

    expect(status).toBe(STATUS_CODES.OK);

    const { _id, createdOn, ...productWithoutMeta } = body.Product;
    expect(productWithoutMeta).toEqual(data);

    await this.productsListPage.waitForOpened();

    return body.Product;
  }
}
