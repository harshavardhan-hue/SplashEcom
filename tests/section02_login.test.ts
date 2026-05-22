import { test, expect } from "@playwright/test";
import { SplashPOManager } from "../SplashPOManager";
import Credentials from "../Utilities/credentials.json";

test.describe("Section 2: Login", () => {

  test("[2.1] Navigate to Login Page", async ({ page, context }) => {
    await context.clearCookies();
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();

    await expect(page).toHaveURL(/my-account.*tab=login/);
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.loginTab).toBeVisible();
    await expect(loginPage.registrationTab).toBeVisible();
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
  });

  test("[2.2] Successful Login", async ({ page, context }) => {
    await context.clearCookies();
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();

    await expect(page).not.toHaveURL(/tab=login/, { timeout: 15000 });
    await expect(page).toHaveURL(/express\.splashdistributors\.com/);
  });

  test("[2.3] View Benefits of Creating an Account (Registration Panel)", async ({ page, context }) => {
    await context.clearCookies();
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();

    await expect(loginPage.benefitsHeading).toBeVisible();
    await expect(loginPage.benefitCheckoutFaster).toBeVisible();
    await expect(loginPage.benefitShippingAddresses).toBeVisible();
    await expect(loginPage.benefitOrderHistory).toBeVisible();
    await expect(loginPage.benefitTrackOrders).toBeVisible();
    await expect(loginPage.benefitWishlist).toBeVisible();
  });

  test("[2.4] Switch to Registration Tab", async ({ page, context }) => {
    await context.clearCookies();
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.clickRegistrationTab();

    await expect(loginPage.registrationForm).toBeVisible({ timeout: 10000 });
  });

});
