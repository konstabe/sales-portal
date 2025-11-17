import { Page } from "@playwright/test";

enum NAV_PATHS {
    Home = "#/home",
    Orders = "#/orders",
    Products = "#/products",
    Customers = "#/customers",
    Managers = "#/managers"
}

export class AbstractPage { 
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(target: keyof typeof NAV_PATHS) {
        const path = NAV_PATHS[target];
        await this.page.locator("#main-header").locator(`[href='${path}']`).click();
    }
}