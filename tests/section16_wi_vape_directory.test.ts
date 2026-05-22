import { test, expect } from "@playwright/test";
import { SplashPOManager } from "../SplashPOManager";
import Credentials from "../Utilities/credentials.json";

test.describe("Section 16: WI Vape Directory", () => {

  test("[16.1] Navigate to WI Vape Directory", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const wiVape = manager.getWIVapeDirectoryPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await wiVape.navigateTo();

    const count = await wiVape.productCards.count();
    expect(count).toBeGreaterThan(0);
    await expect(wiVape.splashPrices.first()).toBeVisible();
  });

  test("[16.2] View WI Vape Directory Product", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const wiVape = manager.getWIVapeDirectoryPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await wiVape.navigateTo();
    await wiVape.clickCoastalClouds();

    await expect(page).toHaveURL(/product\//);
  });

});
