import { test, expect } from "../../model/fixtures/fixture";
import dotenv from "dotenv";

dotenv.config();

test.describe("tests", () => {
    test("add_product", async ({productsPage, loginPage, homePage, page}) => {
        await page.goto(`${process.env.BASE_URL}/#/login`);

        await loginPage.logWith();
        
        await homePage.navigateTo("Products");

        const product = await productsPage.createRandomProduct();

        await expect(page.locator(".toast-body"), "Success flash is visible").toBeVisible();
        const addedRaw = await productsPage.getRowByName(product.name);

        for (const field of [product.name, product.price]){
            expect(addedRaw.getByText(String(field))).toBeVisible();
        }

        await productsPage.deleteItemByName(product.name);
        await expect(page.getByTestId(product.name)).not.toBeVisible();
    });
});
