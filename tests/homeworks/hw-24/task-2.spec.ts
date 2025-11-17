// Написать смоук API тест на получение всех продуктов (без фильтрационных параметров) со следующими шагами:
//   - проверить, что в массиве тела респонса есть созданный продукт

import { test } from "./common/fixtures";
import { expect } from "@playwright/test";


test(`product_api`,{tag:["@smoke, @api"]}, async({APILogin, APIProducts}) => {
    const token = await APILogin.loginWith({
        username: process.env.ADMIN_USER, 
        password: process.env.ADMIN_PASS
    });
    
    const createProductResponse = await test.step(`create product`, async () => {
        return await APIProducts.createProduct(token);
    });

    const getAllProductResponse = await test.step(`get products`, async () => {
        return await APIProducts.getAllProduct(token);
    });

    await test.step(`check created product in product list`, async () => {
        const createProductResponseBody = await APIProducts.getTypedJson<ProductResponse>(createProductResponse);
        const createdProducId = createProductResponseBody.Product._id

        const getAllProductResponseBody = await APIProducts.getTypedJson<ProductListResponse>(getAllProductResponse);
        const productIds = getAllProductResponseBody.Products.map(product => product._id);

        expect(productIds).toContain(createdProducId)
    });
})