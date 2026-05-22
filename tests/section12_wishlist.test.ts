import { test, expect } from "@playwright/test";
import { SplashPOManager } from "../SplashPOManager";
import Credentials from "../Utilities/credentials.json";
import TestData from "../Utilities/testdata.json";

test.describe("Section 12: Wishlist", () => {

  test("[12.1] Add Product to Wishlist from Product Card", async ({ page }) => {
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

  test("[12.2] View Wishlist", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const categoryPage = manager.getProductCategoryPage();
    const myAccount = manager.getMyAccountPage();
    const wishlist = manager.getWishlistPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await categoryPage.navigateTo(TestData.eliquidsURL);
    await categoryPage.addFirstProductToWishlist();
    await myAccount.navigateToWishlist();

    await expect(page).toHaveURL(/tab=Wishlist/);
  });

  test("[12.3] Remove Product from Wishlist", async ({ page }) => {
    const manager = new SplashPOManager(page);
    const loginPage = manager.getLoginPage();
    const ageGate = manager.getAgeGatePage();
    const categoryPage = manager.getProductCategoryPage();
    const myAccount = manager.getMyAccountPage();
    const wishlist = manager.getWishlistPage();

    await loginPage.navigateTo();
    await ageGate.handleIfPresent();
    await loginPage.login(Credentials.email, Credentials.password);
    await ageGate.handleIfPresent();
    await categoryPage.navigateTo(TestData.eliquidsURL);
    await categoryPage.addFirstProductToWishlist();
    await myAccount.navigateToWishlist();

    const itemCount = await wishlist.getItemCount();
    if (itemCount > 0) {
      await wishlist.removeFirstItem();
    }
  });

});
