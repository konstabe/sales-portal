import { Page } from "@playwright/test";
import { waitForResponseJson } from "../common/helpers";

export class Login {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async logWith(email: string, password: string) {
        await this.page.locator("#emailinput").fill(email);
        await this.page.locator("#passwordinput").fill(password);

        const [loginResponse] = await Promise.all([
            waitForResponseJson<LoginResponse>(this.page, {url: /login/, method: "POST", timeout: 5000}),
            this.page.locator("button[type='submit']").click()
        ]);

        if (!loginResponse || !loginResponse.IsSuccess) {
            throw new Error(`Ошибка авторизации ${loginResponse ? loginResponse.ErrorMessage : "неизвестна"}`);
        }
    }
}