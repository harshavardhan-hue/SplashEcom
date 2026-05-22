import { test, expect } from "@playwright/test";
import { SplashPOManager } from "../SplashPOManager";
import Credentials from "../Utilities/credentials.json";

test.describe("Section 11: My Account â€“ Dashboard", () => {

  test("[11.1] Navigate to My Account Dashboard", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const myAccount = manager.getMyAccountPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await myAccount.navigateToDashboard();

    await expect(myAccount.heading).toBeVisible();
    await expect(myAccount.ordersTab).toBeVisible();
    await expect(myAccount.addressTab).toBeVisible();
    await expect(myAccount.wishlistTab).toBeVisible();
    await expect(myAccount.logoutButton).toBeVisible();
    await expect(myAccount.accountName).toBeVisible();
    await expect(myAccount.accountEmail).toBeVisible();
    await expect(myAccount.accountRole).toBeVisible();
  });

  test("[11.2] View Orders Tab", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const myAccount = manager.getMyAccountPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await myAccount.navigateToOrders();

    await expect(myAccount.ordersTable).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "ORDER" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "DATE" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "STATUS" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "TOTAL" })).toBeVisible();
  });

  test("[11.3] View Order Detail", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const myAccount = manager.getMyAccountPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await myAccount.navigateToOrders();

    const rowCount = await myAccount.orderRows.count();
    if (rowCount > 0) {
      await myAccount.clickViewOrder(0);
      await expect(page.locator("[class*='order_commonStyleText']").first()).toBeVisible();
      await expect(myAccount.backToListButton).toBeVisible();
    }
  });

  test("[11.4] Return to Orders List from Order Detail", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const myAccount = manager.getMyAccountPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await myAccount.navigateToOrders();

    const rowCount = await myAccount.orderRows.count();
    if (rowCount > 0) {
      await myAccount.clickViewOrder(0);
      await myAccount.clickBackToList();
      await expect(myAccount.ordersTable).toBeVisible({ timeout: 15000 });
    }
  });

  test("[11.5] Paginate Orders List", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const myAccount = manager.getMyAccountPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await myAccount.navigateToOrders();

    const hasPagination = await myAccount.paginationPage2.isVisible({ timeout: 5000 }).catch(() => false);
    if (hasPagination) {
      await myAccount.clickPage2();
      await expect(myAccount.ordersTable).toBeVisible({ timeout: 15000 });
    }
  });

  test("[11.6] Navigate to Address Tab", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const myAccount = manager.getMyAccountPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await myAccount.navigateToAddress();

    await expect(page).toHaveURL(/tab=Address/);
  });

  test("[11.7] Navigate to Wishlist Tab", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const myAccount = manager.getMyAccountPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await myAccount.navigateToWishlist();

    await expect(page).toHaveURL(/tab=Wishlist/);
  });

});
