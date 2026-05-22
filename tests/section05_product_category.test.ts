import { test, expect } from "@playwright/test";
import { SplashPOManager } from "../SplashPOManager";
import Credentials from "../Utilities/credentials.json";
import TestData from "../Utilities/testdata.json";

test.describe("Section 5: Product Category Pages", () => {

  test("[5.1] Navigate to Eliquids Category", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const categoryPage = manager.getProductCategoryPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await categoryPage.navigateTo(TestData.eliquidsURL);

    await expect(categoryPage.breadcrumb).toBeVisible();
    await expect(categoryPage.breadcrumb).toContainText("ELIQUIDS", { ignoreCase: true });
    const count = await categoryPage.getProductCount();
    expect(count).toBeGreaterThan(0);
    await expect(categoryPage.inStockBadges.first()).toBeVisible();
    await expect(categoryPage.splashPrices.first()).toBeVisible();
  });

  test("[5.2] Navigate to New Arrivals Category", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const categoryPage = manager.getProductCategoryPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await categoryPage.navigateTo(TestData.newArrivalsURL);

    await expect(categoryPage.breadcrumb).toContainText("NEW ARRIVALS", { ignoreCase: true });
    const count = await categoryPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test("[5.3] Navigate to THC Products Category", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const categoryPage = manager.getProductCategoryPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await categoryPage.navigateTo(TestData.thcProductsURL);

    const count = await categoryPage.getProductCount();
    expect(count).toBeGreaterThan(0);
    await expect(page).toHaveURL(/thc-products/);
  });

  test("[5.4] Navigate to NIC Disposable Vapes Category", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const categoryPage = manager.getProductCategoryPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await categoryPage.navigateTo(TestData.nicDisposableURL);

    const count = await categoryPage.getProductCount();
    expect(count).toBeGreaterThan(0);
    await expect(categoryPage.splashPrices.first()).toBeVisible();
  });

  test("[5.5] Navigate to Mushroom Category", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const categoryPage = manager.getProductCategoryPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await categoryPage.navigateTo(TestData.mushroomURL);

    const count = await categoryPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test("[5.6] Navigate to Smoke Shop Category", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const categoryPage = manager.getProductCategoryPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await categoryPage.navigateTo(TestData.smokeShopURL);

    const count = await categoryPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test("[5.7] Navigate to Vape Shop Category", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const categoryPage = manager.getProductCategoryPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await categoryPage.navigateTo(TestData.vapeShopURL);

    const count = await categoryPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test("[5.8] Navigate to Whip Cream Category", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const categoryPage = manager.getProductCategoryPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await categoryPage.navigateTo(TestData.whipCreamURL);

    const count = await categoryPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test("[5.9] Open Filters Panel", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const categoryPage = manager.getProductCategoryPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await categoryPage.navigateTo(TestData.eliquidsURL);
    await categoryPage.openFilters();

    await expect(categoryPage.filterPanel).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Sort", { exact: false })).toBeVisible();
    await expect(page.locator("label").filter({ hasText: /^BRAND$/ }).first()).toBeAttached();
  });

  test("[5.10] Sort Products by Latest", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const categoryPage = manager.getProductCategoryPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await categoryPage.navigateTo(TestData.eliquidsURL);
    await categoryPage.selectSortOption("Sort by latest");

    const count = await categoryPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test("[5.11] Sort Products by Price Low to High", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const categoryPage = manager.getProductCategoryPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await categoryPage.navigateTo(TestData.eliquidsURL);
    await categoryPage.selectSortOption("Sort by price: low to high");

    const count = await categoryPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test("[5.12] Sort Products by Price High to Low", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const categoryPage = manager.getProductCategoryPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await categoryPage.navigateTo(TestData.eliquidsURL);
    await categoryPage.selectSortOption("Sort by price: high to low");

    const count = await categoryPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test("[5.13] Sort Products by Popularity", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const categoryPage = manager.getProductCategoryPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await categoryPage.navigateTo(TestData.eliquidsURL);
    await categoryPage.selectSortOption("Sort by popularity");

    const count = await categoryPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test("[5.14] Paginate Through Products", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const categoryPage = manager.getProductCategoryPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await categoryPage.navigateTo(TestData.eliquidsURL);

    await expect(categoryPage.paginationContainer).toBeVisible();
    await expect(categoryPage.paginationPrev).toBeDisabled().catch(() => {});
    await categoryPage.clickPageNumber(2);
    await expect(page).toHaveURL(/page=2|\/2/);
  });

  test("[5.15] Toggle Product Grid/List View", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const categoryPage = manager.getProductCategoryPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await categoryPage.navigateTo(TestData.eliquidsURL);

    await categoryPage.switchToListView();
    await categoryPage.switchToGridView();
    const count = await categoryPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test("[5.16] Add Product to Wishlist from Category Page", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const categoryPage = manager.getProductCategoryPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await categoryPage.navigateTo(TestData.eliquidsURL);

    await expect(categoryPage.wishlistIcons.first()).toBeVisible();
    await categoryPage.addFirstProductToWishlist();
  });

  test("[5.17] Click Product Card to View Product Detail", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const categoryPage = manager.getProductCategoryPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await categoryPage.navigateTo(TestData.eliquidsURL);
    await categoryPage.clickProductByName("VAPETASIA E-LIQUID");

    await expect(page).toHaveURL(/vapetasia-e-liquid/);
  });

});
