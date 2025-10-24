import test, { expect } from "playwright/test"
import dotenv from "dotenv";

dotenv.config();

// Разработать е2е теста со следующими шагами:
//  - Открыть Sales Portal локально поднятый в докере
//  - Войти в приложения используя учетные данные указанные в readme к проекту
//  - Создать продукт (модуль Products)
//  - Верифицировать появившуюся нотификацию
//  - Верифицировать созданный продукт в таблице (сравнить все имеющиеся поля, продукт должен быть самым верхним)

test("e2e", async ({page}) => {
    const { faker } = await import("@faker-js/faker");

    const product = {
        name: faker.animal.type(),
        price: faker.finance.amount({dec:0}),
        amount: faker.finance.amount({max:10, dec: 0})
    }

    await page.goto(`${process.env.BASE_URL}/#/login`);
    await page.getByRole('textbox', { name: 'Email address *' }).fill(process.env.ADMIN_USER );
    await page.getByRole('textbox', { name: 'Password *' }).fill(process.env.ADMIN_PASS);
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('link', { name: 'View Products' }).click();
    await page.getByRole('link', { name: '+ Add Product' }).click();

    await page.getByRole('textbox', { name: 'Name *' }).fill(product.name);
    await page.getByLabel('Manufacturer').selectOption('Xiaomi');
    await page.getByRole('textbox', { name: 'Price *' }).fill(product.price);
    await page.getByRole('textbox', { name: 'Amount *' }).fill(product.amount);

    await page.getByRole('button', { name: 'Save New Product' }).click();
    await expect(page.locator(".toast-body"), "Success flash is visible").toBeVisible();

    const resultTable = page.locator("#table-products");
    const addedRaw = resultTable.locator("tbody tr").first();

    await Promise.all(
        (Object.keys(product) as (keyof typeof product)[]).map(field =>
            expect(addedRaw.getByText(product[field]), `${field} - ${product[field]}`).toBeVisible()
        )
    );
})