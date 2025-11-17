import { Page } from "@playwright/test";
import { AbstractPage } from "./abstract/abstract";

import { faker } from "@faker-js/faker";
import { waitForResponseJson } from "../common/helpers";


export class Products extends AbstractPage {
    super(page: Page) {}
    
    private async navigateToProductCreate () {
        await this.page.locator("[href='#/products/add']").click();
        await this.page.locator("#add-new-product-form").waitFor({state:"visible"});
    }

    async createRandomProduct() {
        const product = {
            name: faker.food.fruit(),
            price: faker.finance.amount({dec:0}),
            amount: faker.finance.amount({max:10, dec: 0})
        }
        await this.navigateToProductCreate();

        await this.page.fill("#inputName", product.name);
        await this.page.fill("#inputPrice", product.price);
        await this.page.fill("#inputAmount", product.amount);

        const select = this.page.locator("#inputManufacturer");
        const options = await select.locator("option").evaluateAll((opts) =>
            opts.map((opt) => (opt as HTMLOptionElement).value)
        );

        const randomValue = options[Math.floor(Math.random() * options.length)];
        await select.selectOption(randomValue);

        const [addProductResponse] = await Promise.all([
            waitForResponseJson<ProductResponse>(this.page, {url:/product/, method:"POST", timeout: 5000}),
            this.page.locator("#save-new-product").click()
        ]);

        if (!addProductResponse || !addProductResponse.IsSuccess) {
            throw new Error(`Ошибка добавления продукта`);
        }
        return addProductResponse.Product;
    }

    async getRowByName(name: string) {
        const resultTable = this.page.locator("#table-products");
        const addedRow = resultTable.locator("tbody tr", {
            has: this.page.locator("td:first-child", { hasText: name }),
        }).first();

        return addedRow;
    }

    async deleteItemByName(name: string) {
        const row = await this.getRowByName(name);
        const deleteButton = row.locator("button[title='Delete']");

        await deleteButton.click();
    }
}