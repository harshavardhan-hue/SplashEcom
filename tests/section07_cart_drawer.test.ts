import { test, expect } from "@playwright/test";
import { SplashPOManager } from "../SplashPOManager";
import Credentials from "../Utilities/credentials.json";
import TestData from "../Utilities/testdata.json";

test.describe("Section 7: Cart Drawer", () => {

  async function loginAndAddToCart(page: any) {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const pdp = manager.getProductDetailPage();
    const header = manager.getHeaderPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await pdp.navigateTo();
    await pdp.setFlavorQuantity(TestData.flavor1, 1);
    await pdp.clickBulkCart();
    return manager;
  }

  test("[7.1] View Cart Drawer After Adding Product", async ({ page }) => {
    const manager = await loginAndAddToCart(page);
    const header = manager.getHeaderPage();
    const cartDrawer = manager.getCartDrawerPage();

    await header.clickCartIcon();

    await expect(cartDrawer.heading).toBeVisible({ timeout: 10000 });
    await expect(cartDrawer.cartItems.first()).toBeVisible();
    await expect(cartDrawer.subTotal).toBeVisible();
    await expect(cartDrawer.viewCartButton).toBeVisible();
    await expect(cartDrawer.checkoutButton).toBeVisible();
  });

  test("[7.2] Increase Quantity in Cart Drawer", async ({ page }) => {
    const manager = await loginAndAddToCart(page);
    const header = manager.getHeaderPage();
    const cartDrawer = manager.getCartDrawerPage();

    await header.clickCartIcon();
    await expect(cartDrawer.heading).toBeVisible({ timeout: 10000 });
    await cartDrawer.increaseItemQty(0);

    await expect(cartDrawer.subTotal).toBeVisible();
  });

  test("[7.3] Decrease Quantity in Cart Drawer", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const pdp = manager.getProductDetailPage();
    const header = manager.getHeaderPage();
    const cartDrawer = manager.getCartDrawerPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await pdp.navigateTo();
    await pdp.setFlavorQuantity(TestData.flavor1, 2);
    await pdp.clickBulkCart();
    await header.clickCartIcon();
    await expect(cartDrawer.heading).toBeVisible({ timeout: 10000 });
    await cartDrawer.decreaseItemQty(0);

    await expect(cartDrawer.subTotal).toBeVisible();
  });

  test("[7.4] Close Cart Drawer", async ({ page }) => {
    const manager = await loginAndAddToCart(page);
    const header = manager.getHeaderPage();
    const cartDrawer = manager.getCartDrawerPage();

    await header.clickCartIcon();
    await expect(cartDrawer.heading).toBeVisible({ timeout: 10000 });
    await cartDrawer.close();

    await expect(cartDrawer.heading).not.toBeVisible({ timeout: 5000 });
  });

  test("[7.5] Navigate to Cart Page from Drawer", async ({ page }) => {
    const manager = await loginAndAddToCart(page);
    const header = manager.getHeaderPage();
    const cartDrawer = manager.getCartDrawerPage();

    await header.clickCartIcon();
    await expect(cartDrawer.heading).toBeVisible({ timeout: 10000 });
    await cartDrawer.clickViewCart();

    await expect(page).toHaveURL(/\/cart/);
  });

  test("[7.6] Proceed to Checkout from Cart Drawer", async ({ page }) => {
    const manager = await loginAndAddToCart(page);
    const header = manager.getHeaderPage();
    const cartDrawer = manager.getCartDrawerPage();

    await header.clickCartIcon();
    await expect(cartDrawer.heading).toBeVisible({ timeout: 10000 });
    await cartDrawer.clickCheckout();

    await expect(page).toHaveURL(/\/cart/);
  });

});
