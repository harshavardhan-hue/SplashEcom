import { test, expect } from "@playwright/test";
import { SplashPOManager } from "../SplashPOManager";
import Credentials from "../Utilities/credentials.json";
import TestData from "../Utilities/testdata.json";

test.describe("Section 8: Cart Page", () => {

  async function loginAndGoToCart(page: any) {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const pdp = manager.getProductDetailPage();
    const cartPage = manager.getCartPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await pdp.navigateTo();
    await pdp.setFlavorQuantity(TestData.flavor1, 1);
    await pdp.setFlavorQuantity(TestData.flavor2, 1);
    await pdp.clickBulkCart();
    await cartPage.navigateTo();
    return manager;
  }

  test("[8.1] Verify Cart Page Layout", async ({ page }) => {
    const manager = await loginAndGoToCart(page);
    const cartPage = manager.getCartPage();

    await expect(cartPage.stepper).toBeVisible();
    await expect(cartPage.cartTable).toBeVisible();
    await expect(cartPage.cartTotalsSection).toBeVisible();
    await expect(cartPage.warningMessage).toBeVisible();
    await expect(cartPage.proceedToCheckoutButton).toBeVisible();
    const rowCount = await cartPage.cartRows.count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test("[8.2] Update Product Quantity in Cart", async ({ page }) => {
    const manager = await loginAndGoToCart(page);
    const cartPage = manager.getCartPage();

    await cartPage.increaseItemQty(0);
    await cartPage.clickUpdateCart();

    await expect(cartPage.cartTotalsSection).toBeVisible();
  });

  test("[8.3] Remove Item from Cart", async ({ page }) => {
    const manager = await loginAndGoToCart(page);
    const cartPage = manager.getCartPage();

    const initialCount = await cartPage.cartRows.count();
    await cartPage.removeItem(0);

    const finalCount = await cartPage.cartRows.count();
    expect(finalCount).toBeLessThan(initialCount);
  });

  test("[8.4] Empty Cart", async ({ page }) => {
    const manager = await loginAndGoToCart(page);
    const cartPage = manager.getCartPage();

    await cartPage.emptyCart();

    await expect(page.getByText("RETURN TO SHOP", { exact: false })).toBeVisible({ timeout: 15000 });
  });

  test("[8.5] Apply Coupon Code", async ({ page }) => {
    const manager = await loginAndGoToCart(page);
    const cartPage = manager.getCartPage();

    await cartPage.applyCoupon(TestData.couponCode);

    await expect(cartPage.cartTotalsSection).toBeVisible();
  });

  test("[8.6] Verify Cart Totals Section", async ({ page }) => {
    const manager = await loginAndGoToCart(page);
    const cartPage = manager.getCartPage();

    await expect(cartPage.cartTotalsSection).toBeVisible();
    await expect(cartPage.subtotalRow).toBeVisible();
    await expect(cartPage.shippingRow).toBeVisible();
    await expect(cartPage.flatRateRadio).toBeVisible();
    await expect(cartPage.taxRow).toBeVisible();
    await expect(cartPage.totalRow).toBeVisible();
    await expect(cartPage.warningMessage).toBeVisible();
    await expect(cartPage.proceedToCheckoutButton).toBeVisible();
  });

  test("[8.7] Proceed to Checkout from Cart Page", async ({ page }) => {
    const manager = await loginAndGoToCart(page);
    const cartPage = manager.getCartPage();

    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout/);
  });

  test("[8.8] Navigate Back to Shopping from Cart", async ({ page }) => {
    const manager = await loginAndGoToCart(page);

    await page.locator("a:has(img[alt='logo'])").first().click();
    await page.waitForLoadState("domcontentloaded", { timeout: 30000 });

    await expect(page).toHaveURL(/express\.splashdistributors\.com/);
  });

});
