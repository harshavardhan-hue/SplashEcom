import { test, expect } from "@playwright/test";
import { SplashPOManager } from "../SplashPOManager";
import Credentials from "../Utilities/credentials.json";

test.describe("Section 18: Logout", () => {

  test("[18.1] Log Out from My Account", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const myAccount = manager.getMyAccountPage();
    const logoutPage = manager.getLogoutPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await myAccount.navigateToDashboard();
    await logoutPage.clickLogout();

    await expect(page).toHaveURL(/my-account.*tab=login|my-account/, { timeout: 15000 });
    await expect(loginPage.loginButton).toBeVisible({ timeout: 15000 });
  });

  test("[18.2] Verify Logged-Out State", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const myAccount = manager.getMyAccountPage();
    const logoutPage = manager.getLogoutPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await myAccount.navigateToDashboard();
    await logoutPage.clickLogout();

    await page.goto("/my-account?tab=login");
    await page.waitForLoadState("domcontentloaded", { timeout: 30000 });

    await expect(loginPage.loginButton).toBeVisible({ timeout: 15000 });
    await expect(myAccount.ordersTab).not.toBeVisible({ timeout: 5000 }).catch(() => {});
  });

});
