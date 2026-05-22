import { Page, Locator } from "@playwright/test";

export class LogoutPage {
  page: Page;
  logoutButton: Locator;
  loginForm: Locator;
  accountTabs: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.getByRole("button", { name: "Logout" });
    this.loginForm = page.locator("[class*='login'], form:has(input[type='password'])").first();
    this.accountTabs = page.locator("li").filter({ hasText: /^(Dashboard|Orders|Address|Wishlist)$/ });
  }

  async clickLogout(): Promise<void> {
    await this.logoutButton.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }
}
