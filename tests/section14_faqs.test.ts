import { test, expect } from "@playwright/test";
import { SplashPOManager } from "../SplashPOManager";
import Credentials from "../Utilities/credentials.json";

test.describe("Section 14: FAQs Page", () => {

  test("[14.1] Verify FAQs Page Content", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const faqsPage = manager.getFAQsPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await faqsPage.navigateTo();

    await expect(faqsPage.heading).toBeVisible();
    await expect(faqsPage.whenWillOrderShipQuestion).toBeVisible();
    await expect(faqsPage.returnPolicyQuestion).toBeVisible();
  });

  test("[14.2] Read Shipping FAQ Answer", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const faqsPage = manager.getFAQsPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await faqsPage.navigateTo();

    await expect(faqsPage.shippingAnswer).toBeVisible();
  });

  test("[14.3] Read Return Policy FAQ", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const faqsPage = manager.getFAQsPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await faqsPage.navigateTo();

    await expect(faqsPage.returnPolicyAnswer).toBeVisible();
  });

});
