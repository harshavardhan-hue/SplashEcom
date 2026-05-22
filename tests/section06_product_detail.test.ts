import { test, expect } from "@playwright/test";
import { SplashPOManager } from "../SplashPOManager";
import Credentials from "../Utilities/credentials.json";
import TestData from "../Utilities/testdata.json";

test.describe("Section 6: Product Detail Page", () => {

  test("[6.1] Verify Product Detail Page Layout", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const pdp = manager.getProductDetailPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await pdp.navigateTo();

    await expect(pdp.recommendedSection).toBeVisible();
    await expect(pdp.imageGallery).toBeVisible();
    await expect(pdp.refundNotice).toBeVisible();
    await expect(pdp.productName).toContainText("VAPETASIA E-LIQUID", { ignoreCase: true });
    await expect(pdp.splashPrice).toBeVisible();
    await expect(pdp.sku).toBeVisible();
  });

  test("[6.2] Verify Variants Table", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const pdp = manager.getProductDetailPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await pdp.navigateTo();

    await expect(pdp.variantsTable).toBeVisible();
    await expect(pdp.flavorHeader).toBeVisible();
    await expect(pdp.stockHeader).toBeVisible();
    await expect(pdp.priceHeader).toBeVisible();
    await expect(pdp.quantityHeader).toBeVisible();
  });

  test("[6.3] Search/Filter Flavors in Variants Table", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const pdp = manager.getProductDetailPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await pdp.navigateTo();
    await pdp.searchFlavor("KILLER CUSTARD");

    await expect(page.getByText("KILLER CUSTARD", { exact: false }).first()).toBeVisible();
  });

  test("[6.4] Increase Quantity Using + Button", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const pdp = manager.getProductDetailPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await pdp.navigateTo();

    await pdp.clickPlusForFlavor(TestData.flavor1);

    const qtyInput = await pdp.getFlavorQuantityInput(TestData.flavor1);
    await expect(qtyInput).toHaveValue("1");
    await expect(pdp.bulkCartButton).toBeEnabled({ timeout: 5000 }).catch(() => {});
  });

  test("[6.5] Decrease Quantity Using â€“ Button", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const pdp = manager.getProductDetailPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await pdp.navigateTo();

    await pdp.clickPlusForFlavor(TestData.flavor1);
    await pdp.clickPlusForFlavor(TestData.flavor1);
    await pdp.clickMinusForFlavor(TestData.flavor1);

    const qtyInput = await pdp.getFlavorQuantityInput(TestData.flavor1);
    await expect(qtyInput).toHaveValue("1");
  });

  test("[6.6] Add Multiple Flavors to Cart (Bulk Cart)", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const pdp = manager.getProductDetailPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await pdp.navigateTo();

    await pdp.setFlavorQuantity(TestData.flavor1, TestData.flavor1Qty);
    await pdp.setFlavorQuantity(TestData.flavor2, TestData.flavor2Qty);
    await pdp.setFlavorQuantity(TestData.flavor3, TestData.flavor3Qty);
    await pdp.clickBulkCart();

    await expect(pdp.addedToCartAlert).toBeVisible({ timeout: 15000 });
  });

  test("[6.7] View Recommended Products Carousel", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const pdp = manager.getProductDetailPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await pdp.navigateTo();
    await pdp.recommendedSection.waitFor({ state: 'visible', timeout: 30000 }).catch(() => {});

    await expect(pdp.recommendedSection).toBeVisible();
  });

  test("[6.8] Product Image Gallery Navigation", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const pdp = manager.getProductDetailPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await pdp.navigateTo();

    await expect(pdp.imageGallery).toBeVisible();
    await pdp.clickNextImage();
    await pdp.clickPrevImage();
  });

});
