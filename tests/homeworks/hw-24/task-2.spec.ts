// Написать смоук API тест на получение всех продуктов (без фильтрационных параметров) со следующими шагами:
//   - проверить, что в массиве тела респонса есть созданный продукт

import { test, expect } from "../../model/fixtures/fixture";
import { loginAndReturnToken } from "../../model/api/methods/apiLogin";
import { createRandomProductData } from "../../model/api/methods/createProductData";
import { apiConfig, STATUS_CODES } from "../../model/api/config";
import { validateResponse } from "../../model/common/utils";
import { createProductSchema, getProductsSchema } from "../../model/schemas/product/productSchema";
import { getTypedJson } from "../../model/api/methods/getTypedJson";


test(`product_api`,{tag:["@smoke, @api"]}, async({request}) => {
    const token = await loginAndReturnToken(request);
    
    const createProductResponse = await test.step(`create product`, async () => {
        const createProductResponse = await request.post(apiConfig.baseURL + apiConfig.endpoints.product.create, {
            data: createRandomProductData(),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        await validateResponse(createProductResponse, {
            status: STATUS_CODES.CREATED,
            schema: createProductSchema,
            IsSuccess: true,
            ErrorMessage: null,
        });    

        return createProductResponse;    
    });


    const getAllProductResponse = await test.step(`get products`, async () => {
        const getAllProductResponse =  await request.get(apiConfig.baseURL + apiConfig.endpoints.product.get, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        await validateResponse(getAllProductResponse, {
            status: STATUS_CODES.SUCCESS,
            schema: getProductsSchema,
            IsSuccess: true,
            ErrorMessage: null,
        });

        return getAllProductResponse;
    });

    await test.step(`check created product in product list`, async () => {
        const createProductResponseBody = await getTypedJson<ProductResponse>(createProductResponse);
        const createdProducId = createProductResponseBody.Product._id

        const getAllProductResponseBody = await getTypedJson<ProductListResponse>(getAllProductResponse);
        const productIds = getAllProductResponseBody.Products.map(product => product._id);

        expect(productIds).toContain(createdProducId)
    });
})