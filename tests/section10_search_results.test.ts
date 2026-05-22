import { test, expect } from "@playwright/test";
import { SplashPOManager } from "../SplashPOManager";
import Credentials from "../Utilities/credentials.json";
import TestData from "../Utilities/testdata.json";

test.describe("Section 10: Search Results Page", () => {

  test("[10.1] Verify Search Results Page Layout", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const header = manager.getHeaderPage();
    const searchResults = manager.getSearchResultsPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 30000 });
    await header.searchFor(TestData.searchProduct);

    await expect(page).toHaveURL(/allproducts\/vapetasia/);
    const count = await searchResults.getProductCount();
    expect(count).toBeGreaterThan(0);
    await expect(searchResults.splashPrices.first()).toBeVisible();
  });

  test("[10.2] Search for a Specific Brand", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const header = manager.getHeaderPage();
    const searchResults = manager.getSearchResultsPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 30000 });
    await header.searchFor(TestData.searchBrand);

    await expect(page).toHaveURL(/allproducts\/blazy/i);
    const count = await searchResults.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test("[10.3] Click a Search Result to View Product Detail", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const header = manager.getHeaderPage();
    const searchResults = manager.getSearchResultsPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 30000 });
    await header.searchFor(TestData.searchProduct);
    await searchResults.clickProductByName(TestData.vapetasiaProductName);

    await expect(page).toHaveURL(/vapetasia-e-liquid/);
  });

  test("[10.4] Paginate Search Results", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const header = manager.getHeaderPage();
    const searchResults = manager.getSearchResultsPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 30000 });
    await header.searchFor("e-liquid");

    const hasPagination = await searchResults.pagination.isVisible({ timeout: 5000 }).catch(() => false);
    if (hasPagination) {
      await searchResults.clickPageNumber(2);
      await expect(page).toHaveURL(/page=2|\/2/);
    }
  });

});
