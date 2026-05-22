import { test, expect } from "@playwright/test";
import { SplashPOManager } from "../SplashPOManager";
import Credentials from "../Utilities/credentials.json";

test.describe("Section 15: Policy Pages", () => {

  test("[15.1] View Shipping Policy Page", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const policyPages = manager.getPolicyPagesPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await policyPages.navigateToShippingPolicy();

    await expect(policyPages.mainContent).toBeVisible();
    await expect(page).toHaveURL(/shipping-policy/);
  });

  test("[15.2] View Privacy Policy Page", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const policyPages = manager.getPolicyPagesPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await policyPages.navigateToPrivacyPolicy();

    await expect(policyPages.mainContent).toBeVisible();
    await expect(page).toHaveURL(/privacy-policy/);
  });

  test("[15.3] View Refund Policy Page", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const policyPages = manager.getPolicyPagesPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await policyPages.navigateToRefundPolicy();

    await expect(policyPages.mainContent).toBeVisible();
    await expect(page).toHaveURL(/refund-policy/);
  });

  test("[15.4] View Terms & Conditions Page", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const policyPages = manager.getPolicyPagesPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await policyPages.navigateToTerms();

    await expect(policyPages.mainContent).toBeVisible();
    await expect(page).toHaveURL(/term-of-use/);
  });

});
