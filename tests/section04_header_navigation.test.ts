import { test, expect } from "@playwright/test";
import { SplashPOManager } from "../SplashPOManager";
import Credentials from "../Utilities/credentials.json";
import TestData from "../Utilities/testdata.json";

test.describe("Section 4: Header & Navigation", () => {

  test("[4.1] Open Search Bar via Hamburger Button", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const header = manager.getHeaderPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 30000 });

    await header.openSearch();

    await expect(header.searchInput).toBeVisible({ timeout: 10000 });
  });

  test("[4.2] Search for a Product by Name", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const header = manager.getHeaderPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 30000 });

    await header.searchFor(TestData.searchProduct);

    await expect(page).toHaveURL(/allproducts\/vapetasia/);
  });

  test("[4.3] Search for a Brand", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const header = manager.getHeaderPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 30000 });

    await header.searchFor(TestData.searchBrand);

    await expect(page).toHaveURL(/allproducts\/blazy/i);
  });

  test("[4.4] Click Logo to Return Home", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const header = manager.getHeaderPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await page.goto(TestData.eliquidsURL, { waitUntil: "domcontentloaded", timeout: 30000 });

    await header.clickLogo();

    await expect(page).toHaveURL(/express\.splashdistributors\.com\/?$/);
  });

  test("[4.5] Click Cart Icon to View Cart Drawer", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const header = manager.getHeaderPage();
    const cartDrawer = manager.getCartDrawerPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 30000 });

    await header.clickCartIcon();

    await expect(cartDrawer.heading).toBeVisible({ timeout: 10000 });
  });

});
