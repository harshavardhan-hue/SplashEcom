import { test, expect } from "@playwright/test";
import { SplashPOManager } from "../SplashPOManager";
import Credentials from "../Utilities/credentials.json";

test.describe("Section 13: Footer", () => {

  test("[13.1] Verify Footer Content", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const footer = manager.getFooterPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await page.goto("/");
    await footer.scrollToFooter();

    await expect(footer.shippingPolicyLink).toBeVisible();
    await expect(footer.privacyPolicyLink).toBeVisible();
    await expect(footer.refundPolicyLink).toBeVisible();
    await expect(footer.faqsLink).toBeVisible();
    await expect(footer.termsLink).toBeVisible();
    await expect(footer.eliquidsLink).toBeVisible();
    await expect(footer.locationText).toBeVisible();
    await expect(footer.copyright).toBeVisible();
  });

  test("[13.2] Navigate to Shipping Policy via Footer", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const footer = manager.getFooterPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await page.goto("/");
    await footer.scrollToFooter();
    await footer.clickLink(footer.shippingPolicyLink);

    await expect(page).toHaveURL(/shipping-policy/);
  });

  test("[13.3] Navigate to Privacy Policy via Footer", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const footer = manager.getFooterPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await page.goto("/");
    await footer.scrollToFooter();
    await footer.clickLink(footer.privacyPolicyLink);

    await expect(page).toHaveURL(/privacy-policy/);
  });

  test("[13.4] Navigate to Refund Policy via Footer", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const footer = manager.getFooterPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await page.goto("/");
    await footer.scrollToFooter();
    await footer.clickLink(footer.refundPolicyLink);

    await expect(page).toHaveURL(/refund-policy/);
  });

  test("[13.5] Navigate to Order Tracking via Footer", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const footer = manager.getFooterPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await page.goto("/");
    await footer.scrollToFooter();
    await footer.clickLink(footer.orderTrackingLink);

    await expect(page).toHaveURL(/my-account.*Orders/);
  });

  test("[13.6] Navigate to FAQs via Footer", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const footer = manager.getFooterPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await page.goto("/");
    await footer.scrollToFooter();
    await footer.clickLink(footer.faqsLink);

    await expect(page).toHaveURL(/faqs/);
  });

  test("[13.7] Navigate to Terms & Conditions via Footer", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const footer = manager.getFooterPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await page.goto("/");
    await footer.scrollToFooter();
    await footer.clickLink(footer.termsLink);

    await expect(page).toHaveURL(/term-of-use/);
  });

  test("[13.8] Navigate to Popular Category via Footer", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const footer = manager.getFooterPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await page.goto("/");
    await footer.scrollToFooter();
    await footer.clickLink(footer.eliquidsLink);

    await expect(page).toHaveURL(/eliquids/);
  });

});
