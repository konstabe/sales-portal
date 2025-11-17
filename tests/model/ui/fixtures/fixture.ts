import { test as base, expect } from "@playwright/test";
import { Login } from "../pages/login";
import { Products } from "../pages/products";
import { Home } from "../pages/home";

export const test = base.extend<{
    loginPage: Login;
    productsPage: Products;
    homePage: Home
}>({
    loginPage: async ({ page }, use) => {
        const loginPage = new Login(page);
        await use(loginPage);
    },

    productsPage: async ({ page }, use) => {
        const productsPage = new Products(page);
        await use(productsPage);
    },
    homePage: async ({ page }, use) => {
        const homePage = new Home(page);
        await use(homePage);
    },
});

export { expect };