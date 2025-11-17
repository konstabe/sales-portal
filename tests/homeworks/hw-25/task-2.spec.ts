// Используя DDT подход, напишите тест сьют для проверки эндпоинта создания продукта:
//   - с негативыми проверками
import { test } from "./common/fixtures";
import dotenv from "dotenv";
import { createProductNegativeData } from "./common/negative.data";


dotenv.config();

test.describe(`products positive`, () =>{
    let token = "";

    test.beforeEach(async ({APILogin}) => {
        token = await APILogin.loginWith({
            username: "admin@example.com",
            password: "admin123"
        });
    });

    for (const data of createProductNegativeData) {
        test(data.title, async ({APIProducts}) => {
            await APIProducts.createProduct(token, data.checkingValue, true);
        });
    }
});