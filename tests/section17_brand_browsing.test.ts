import { test, expect } from "@playwright/test";
import { SplashPOManager } from "../SplashPOManager";
import Credentials from "../Utilities/credentials.json";

test.describe("Section 17: Brand-Specific Browsing", () => {

  test("[17.1] Browse DESTROYER Brand Products", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const brandPage = manager.getBrandBrowsingPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await brandPage.navigateToDestroyer();

    const count = await brandPage.getProductCount();
    expect(count).toBeGreaterThan(0);
    await expect(page).toHaveURL(/brand=DESTROYER/);
  });

  test("[17.2] Browse TORCH Brand Products", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const brandPage = manager.getBrandBrowsingPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await brandPage.navigateToTorch();

    const count = await brandPage.getProductCount();
    expect(count).toBeGreaterThan(0);
    await expect(page).toHaveURL(/brand=TORCH/);
  });

  test("[17.3] Browse Hidden Hills Products", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const brandPage = manager.getBrandBrowsingPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await brandPage.navigateToHiddenHills();

    const count = await brandPage.getProductCount();
    expect(count).toBeGreaterThan(0);
    await expect(page).toHaveURL(/hidden-hills/);
  });

  test("[17.4] Browse Woodstock Blends Products", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const brandPage = manager.getBrandBrowsingPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await brandPage.navigateToWoodstock();

    const count = await brandPage.getProductCount();
    expect(count).toBeGreaterThan(0);
    await expect(page).toHaveURL(/woodstock-blends/);
  });

  test("[17.5] Browse FVKD Blends Products", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const brandPage = manager.getBrandBrowsingPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await brandPage.navigateToFVKD();

    const count = await brandPage.getProductCount();
    expect(count).toBeGreaterThan(0);
    await expect(page).toHaveURL(/fvkd-blends/);
  });

});
