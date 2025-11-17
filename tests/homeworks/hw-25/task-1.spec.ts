// Используя DDT подход, напишите тест сьют для проверки эндпоинта создания продукта:
//   - с позитивными проверками



//   Используйте LoginApiService, ProductsApi, после каждого теста, где создастся продукт - удаляйте его.

//   Требования:
//   Name: обязательное, уникальное, Products's name should contain only 3-40 alphanumerical characters and one space between
//   Manufacturer: обязательное
//   Price: обязательное, Price should be in range 1-99999
//   Amount: обязательное, Amount should be in range 0-999
//   Notes: Notes should be in range 0-250 and without < or > symbols
import { test } from "./common/fixtures";
import dotenv from "dotenv";
import { createProductValidData } from "./common/positive.data";

dotenv.config();

test.describe(`products positive`, () =>{
    let token = "";
    let lastProductId = "";

    test.beforeEach(async ({APILogin}) => {
        token = await APILogin.loginWith({
            username: "admin@example.com",
            password: "admin123"
        });
    });

    test.afterEach(async ({APIProducts}) => {
        await APIProducts.deleteProductById(lastProductId, token);
    });

    for (const data of createProductValidData) {
        test(data.title, async ({APIProducts}) => {
            const createdProductResponse = await APIProducts.createProduct(token, data.checkingValue);
            lastProductId = (await APIProducts.getTypedJson<ProductResponse>(createdProductResponse)).Product._id;
        });
    }
});