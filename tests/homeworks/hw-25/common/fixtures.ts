import {test as base} from "@playwright/test";
import { APILogin } from "../../../model/api/api/login/apiLogin";
import { APIProducts } from "../../../model/api/api/products/apiProducts";

export const test = base.extend<{
    APILogin: APILogin;
    APIProducts: APIProducts;
}>({
    APILogin: async ({ request }, use) => {
        const api = new APILogin(request)
        await use(api);
    },
    APIProducts: async ({ request }, use) => {
        const api = new APIProducts(request);
        await use(api);
    }
})