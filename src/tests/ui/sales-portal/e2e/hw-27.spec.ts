import { test,expect } from "fixtures/index";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { TAGS } from "data/tags";

test.describe("[Sales Portal] [Products]", () => {

  test("HW_27_TASK_1 Add new product with services",{tag: TAGS.SMOKE}, async ({
    loginUIService,
    productsListPage,
    productsListUIService,
    updateProductUIService,
productsApiService
  }) => {

    const token = await loginUIService.loginAsAdmin();
    const created = await productsApiService.create(token);

    try {
      await productsListUIService.open();
      await productsListUIService.clickEdit(created.name);

      const updated = await updateProductUIService.update();

      await expect(productsListPage.toastMessage)
        .toContainText(NOTIFICATIONS.PRODUCT_UPDATED);

      await expect(
        productsListPage.tableRowByName(updated.name)
      ).toBeVisible();

      await productsListUIService.openDetailsModal(updated.name);

      const actual = await productsListPage.detailsModal.getData();
      productsListUIService.assertDetailsData(actual, updated);

    } finally {
      await productsApiService.delete(token, created._id);
    }
  });

  test("HW_27_TASK_2 Update product with services",{tag: TAGS.SMOKE}, async ({
    loginUIService,
    productsApiService,
    productsListPage,
    productsListUIService,
    updateProductUIService
  }) => {

    const token = await loginUIService.loginAsAdmin();
    const created = await productsApiService.create(token);

    try {
      await productsListUIService.open();
      await productsListUIService.clickEdit(created.name);

      const updated = await updateProductUIService.update();

      await expect(productsListPage.toastMessage)
        .toContainText(NOTIFICATIONS.PRODUCT_UPDATED);

      await expect(
        productsListPage.tableRowByName(updated.name)
      ).toBeVisible();

      await productsListUIService.openDetailsModal(updated.name);

      const actual = await productsListPage.detailsModal.getData();
      productsListUIService.assertDetailsData(actual, updated);

    } finally {
      await productsApiService.delete(token, created._id);
    }
});

});
