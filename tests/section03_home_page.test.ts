import { test, expect } from "@playwright/test";
import { SplashPOManager } from "../SplashPOManager";
import Credentials from "../Utilities/credentials.json";
import TestData from "../Utilities/testdata.json";

test.describe("Section 3: Home Page", () => {

  test("[3.1] Verify Home Page Layout After Login", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const homePage = manager.getHomePage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await homePage.navigateTo();

    await expect(homePage.warningBanner).toBeVisible();
    await expect(homePage.logo).toBeVisible();
    await expect(homePage.cartIcon).toBeVisible();
    await expect(homePage.marquee).toBeVisible();
  });

  test("[3.2] Verify Hero Banner Section", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const homePage = manager.getHomePage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await homePage.navigateTo();

    await expect(homePage.heroBanner).toBeVisible();
  });

  test("[3.3] Verify Category Tiles Grid", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const homePage = manager.getHomePage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await homePage.navigateTo();

    await expect(homePage.categoryTiles.first()).toBeVisible();
    await homePage.clickEliquidsTile();
    await expect(page).toHaveURL(/eliquids/);
  });

  test("[3.4] Verify Brand Carousel Slider", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const homePage = manager.getHomePage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await homePage.navigateTo();

    await expect(homePage.brandCarousel).toBeVisible();
    const dotCount = await homePage.paginationDots.count();
    expect(dotCount).toBeGreaterThan(0);
  });

  test("[3.5] Verify Brand Card Caps Section", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const homePage = manager.getHomePage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await homePage.navigateTo();

    await expect(homePage.brandCardCaps.first()).toBeVisible();
  });

  test("[3.6] Newsletter Sign-Up", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const homePage = manager.getHomePage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await homePage.navigateTo();

    await expect(homePage.newsletterSection).toBeVisible();
    await homePage.submitNewsletter(TestData.newsletterEmail);
  });

});
