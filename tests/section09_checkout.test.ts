import { test, expect } from "@playwright/test";
import { SplashPOManager } from "../SplashPOManager";
import Credentials from "../Utilities/credentials.json";
import TestData from "../Utilities/testdata.json";

test.describe("Section 9: Checkout â€“ Information Step", () => {

  async function loginAndGoToCheckout(page: any) {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const pdp = manager.getProductDetailPage();
    const checkoutPage = manager.getCheckoutPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await pdp.navigateTo();
    await pdp.setFlavorQuantity(TestData.flavor1, 1);
    await pdp.clickBulkCart();
    await checkoutPage.navigateTo();
    return manager;
  }

  test("[9.1] Verify Checkout Information Page", async ({ page }) => {
    const manager = await loginAndGoToCheckout(page);
    const checkoutPage = manager.getCheckoutPage();

    await expect(checkoutPage.informationHeading).toBeVisible();
    await expect(checkoutPage.welcomeMessage).toBeVisible();
    await expect(checkoutPage.shippingAddressHeading).toBeVisible();
    await expect(checkoutPage.firstNameField).toBeVisible();
    await expect(checkoutPage.lastNameField).toBeVisible();
    await expect(checkoutPage.streetAddressField).toBeVisible();
    await expect(checkoutPage.zipCodeField).toBeVisible();
    await expect(checkoutPage.cityField).toBeVisible();
    await expect(checkoutPage.phoneField).toBeVisible();
    await expect(checkoutPage.cartSidebar).toBeVisible();
  });

  test("[9.2] Fill in Shipping Address", async ({ page }) => {
    const manager = await loginAndGoToCheckout(page);
    const checkoutPage = manager.getCheckoutPage();

    await checkoutPage.fillShippingAddress({
      firstName: Credentials.shippingFirstName,
      lastName: Credentials.shippingLastName,
      street: Credentials.shippingStreet,
      apt: Credentials.shippingApt,
      country: Credentials.shippingCountry,
      state: Credentials.shippingState,
      zip: Credentials.shippingZip,
      city: Credentials.shippingCity,
      phone: Credentials.shippingPhone,
    });

    await expect(checkoutPage.firstNameField).toHaveValue(Credentials.shippingFirstName);
    await expect(checkoutPage.lastNameField).toHaveValue(Credentials.shippingLastName);
    await expect(checkoutPage.zipCodeField).toHaveValue(Credentials.shippingZip);
  });

  test("[9.3] Apply Promo Code at Checkout", async ({ page }) => {
    const manager = await loginAndGoToCheckout(page);
    const checkoutPage = manager.getCheckoutPage();

    await checkoutPage.openPromoCodeField();

    await expect(checkoutPage.promoCodeInput).toBeVisible({ timeout: 10000 });
  });

});
