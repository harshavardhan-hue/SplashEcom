import { test, expect } from "@playwright/test";
import { SplashPOManager } from "../SplashPOManager";
import Credentials from "../Utilities/credentials.json";

test.describe("Section 1: Age Verification Gate", () => {

  // Age gate is stored in sessionStorage and appears on first home page visit after login.
  // Each test gets a fresh browser context so sessionStorage is always empty.

  test("[1.1] Verify Age Gate Appears on First Visit", async ({ page, context }) => {
    await context.clearCookies();
    const manager = new SplashPOManager(page);
    const ageGate = manager.getAgeGatePage();
    const loginPage = manager.getLoginPage();

    // Login navigates to home page where age gate auto-appears (fresh sessionStorage)
    await loginPage.navigateTo();
    await loginPage.login(Credentials.email, Credentials.password);

    await expect(ageGate.heading).toBeVisible({ timeout: 15000 });
    await expect(ageGate.message).toBeVisible();
    await expect(ageGate.yesButton).toBeVisible();
    await expect(ageGate.noButton).toBeVisible();
  });

  test("[1.2] Confirm Age (YES)", async ({ page, context }) => {
    await context.clearCookies();
    const manager = new SplashPOManager(page);
    const ageGate = manager.getAgeGatePage();
    const loginPage = manager.getLoginPage();

    await loginPage.navigateTo();
    await loginPage.login(Credentials.email, Credentials.password);

    await expect(ageGate.yesButton).toBeVisible({ timeout: 15000 });
    await ageGate.clickYes();

    await expect(ageGate.yesButton).not.toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL(/express\.splashdistributors\.com/);
  });

  test("[1.3] Decline Age (NO)", async ({ page, context }) => {
    await context.clearCookies();
    const manager = new SplashPOManager(page);
    const ageGate = manager.getAgeGatePage();
    const loginPage = manager.getLoginPage();

    await loginPage.navigateTo();
    await loginPage.login(Credentials.email, Credentials.password);

    await expect(ageGate.yesButton).toBeVisible({ timeout: 15000 });
    await ageGate.clickNo();

    await page.waitForLoadState("domcontentloaded", { timeout: 30000 });
    const isStillBlocked = await ageGate.yesButton.isVisible({ timeout: 5000 }).catch(() => false);
    const redirectedAway = !page.url().includes("express.splashdistributors.com");
    expect(isStillBlocked || redirectedAway).toBeTruthy();
  });

});
