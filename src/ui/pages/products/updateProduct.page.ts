import { IProduct } from "data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";

export class UpdateProductPage extends SalesPortalPage {
  readonly title = this.page.getByRole("heading", { level: 2 });
  readonly nameInput = this.page.locator("#inputName");
  readonly manufacturerSelect = this.page.locator("#inputManufacturer");
  readonly priceInput = this.page.locator("#inputPrice");
  readonly amountInput = this.page.locator("#inputAmount");
  readonly notesInput = this.page.locator("#textareaNotes");
  readonly saveButton = this.page.locator("#save-product-changes");

  readonly uniqueElement = this.title;

  async fillForm(data: Partial<IProduct>) {
    const entries: [keyof IProduct, unknown][] = Object.entries(data) as any;

    for (const [field, value] of entries) {
      if (value == null) continue;

      switch (field) {
        case "name":
          await this.nameInput.fill(String(value));
          break;
        case "manufacturer":
          await this.manufacturerSelect.selectOption(String(value));
          break;
        case "price":
          await this.priceInput.fill(String(value));
          break;
        case "amount":
          await this.amountInput.fill(String(value));
          break;
        case "notes":
          await this.notesInput.fill(String(value));
          break;
      }
    }
  }

  async clickSave() {
    await Promise.all([
      this.page.waitForResponse(res =>
        res.url().includes("/products") && res.status() < 500
      ),
      this.saveButton.click(),
    ]);
  }
}
