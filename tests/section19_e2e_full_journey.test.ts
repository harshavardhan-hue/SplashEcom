import { test, expect } from "@playwright/test";
import { SplashPOManager } from "../SplashPOManager";
import Credentials from "../Utilities/credentials.json";
import TestData from "../Utilities/testdata.json";

test.describe("Section 19: End-to-End Full Order Journey", () => {

  test("[19.1] Complete Full Purchase Flow", async ({ page, context }) => {
    await context.clearCookies();
    const manager = new SplashPOManager(page);
    const ageGate = manager.getAgeGatePage();
    const loginPage = manager.getLoginPage();
    const homePage = manager.getHomePage();
    const categoryPage = manager.getProductCategoryPage();
    const pdp = manager.getProductDetailPage();
    const header = manager.getHeaderPage();
    const cartDrawer = manager.getCartDrawerPage();
    const cartPage = manager.getCartPage();
    const checkoutPage = manager.getCheckoutPage();
    const myAccount = manager.getMyAccountPage();
    const footer = manager.getFooterPage();
    const faqsPage = manager.getFAQsPage();
    const logoutPage = manager.getLogoutPage();

    // Step 1-4: Login and handle age gate
    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();

    // Step 5: Verify home page loaded with cart icon
    await homePage.navigateTo();
    await expect(homePage.logo).toBeVisible();
    await expect(homePage.cartIcon).toBeVisible();

    // Step 6â€“7: Navigate to Eliquids category
    await categoryPage.navigateTo(TestData.eliquidsURL);
    const productCount = await categoryPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    // Step 8â€“9: Navigate to Vapetasia product
    await pdp.navigateTo();
    await expect(pdp.productName).toContainText("VAPETASIA", { ignoreCase: true });
    await expect(pdp.splashPrice).toBeVisible();
    await expect(pdp.variantsTable).toBeVisible();

    // Step 10â€“12: Set quantities and click Bulk Cart
    await pdp.setFlavorQuantity(TestData.flavor1, TestData.flavor1Qty);
    await pdp.setFlavorQuantity(TestData.flavor2, TestData.flavor2Qty);
    await pdp.clickBulkCart();

    // Step 13: Verify cart alert
    await expect(pdp.addedToCartAlert).toBeVisible({ timeout: 15000 });

    // Step 14â€“16: Open cart drawer and verify
    await header.clickCartIcon();
    await expect(cartDrawer.heading).toBeVisible({ timeout: 10000 });
    await expect(cartDrawer.cartItems.first()).toBeVisible();
    await expect(cartDrawer.subTotal).toBeVisible();

    // Step 17â€“19: Navigate to cart page
    await cartDrawer.clickViewCart();
    await expect(page).toHaveURL(/\/cart/);
    await expect(cartPage.stepper).toBeVisible();
    await expect(cartPage.cartTable).toBeVisible();

    // Step 20â€“21: Verify cart totals
    await expect(cartPage.cartTotalsSection).toBeVisible();
    await expect(cartPage.shippingRow).toBeVisible();
    await expect(cartPage.taxRow).toBeVisible();
    await expect(cartPage.totalRow).toBeVisible();
    await expect(cartPage.warningMessage).toBeVisible();

    // Step 22â€“27: Proceed to checkout
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout/);
    await expect(checkoutPage.informationHeading).toBeVisible();
    await expect(checkoutPage.welcomeMessage).toBeVisible();
    await expect(checkoutPage.shippingAddressHeading).toBeVisible();
    await expect(checkoutPage.firstNameField).toBeVisible();
    await expect(checkoutPage.cartSidebar).toBeVisible();

    // Step 28â€“29: Navigate to My Account
    await myAccount.navigateToDashboard();
    await expect(myAccount.heading).toBeVisible();
    await expect(myAccount.accountName).toBeVisible();
    await expect(myAccount.accountEmail).toBeVisible();
    await expect(myAccount.accountRole).toBeVisible();

    // Step 30â€“33: View orders
    await myAccount.navigateToOrders();
    await expect(myAccount.ordersTable).toBeVisible();
    const rowCount = await myAccount.orderRows.count();
    if (rowCount > 0) {
      await myAccount.clickViewOrder(0);
      await expect(myAccount.backToListButton).toBeVisible();

      // Step 34: Go back to orders list
      await myAccount.clickBackToList();
      await expect(myAccount.ordersTable).toBeVisible({ timeout: 15000 });
    }

    // Step 35â€“36: Verify footer
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 30000 });
    await footer.scrollToFooter();
    await expect(footer.shippingPolicyLink).toBeVisible();
    await expect(footer.eliquidsLink).toBeVisible();
    await expect(footer.locationText).toBeVisible();

    // Step 37â€“38: Click FAQs from footer
    await footer.clickLink(footer.faqsLink);
    await expect(page).toHaveURL(/faqs/);
    await expect(faqsPage.heading).toBeVisible();

    // Step 39â€“40: Logout
    await myAccount.navigateToDashboard();
    await logoutPage.clickLogout();
    await expect(loginPage.loginButton).toBeVisible({ timeout: 15000 });
  });

});
