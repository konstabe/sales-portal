import { Locator, Page } from "@playwright/test";

export class Modal {
    private root: Locator;

    constructor(page: Page) {
        this.root = page.locator("[class*='modal-dialog']");
    }

    async submit(){
        await this.root.locator("button[type='submit']").click();
    }
}