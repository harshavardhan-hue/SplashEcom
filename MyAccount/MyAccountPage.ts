import { Page, Locator } from "@playwright/test";

export class MyAccountPage {
  page: Page;
  heading: Locator;
  dashboardTab: Locator;
  ordersTab: Locator;
  addressTab: Locator;
  wishlistTab: Locator;
  logoutButton: Locator;
  accountName: Locator;
  accountEmail: Locator;
  accountRole: Locator;
  ordersTable: Locator;
  orderRows: Locator;
  orderColumns: Locator;
  backToListButton: Locator;
  paginationPage2: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByText("MY ACCOUNT");
    this.dashboardTab = page.locator("li").filter({ hasText: /^Dashboard$/ }).first();
    this.ordersTab = page.locator("li").filter({ hasText: /^Orders$/ }).first();
    this.addressTab = page.locator("li").filter({ hasText: /^Address$/ }).first();
    this.wishlistTab = page.locator("li").filter({ hasText: /^Wishlist$/ }).first();
    this.logoutButton = page.getByRole("button", { name: "Logout" });
    this.accountName = page.locator("p").filter({ hasText: /Name:\s*abhisek/i }).first();
    this.accountEmail = page.getByText("abhisek@phantasm.co.in", { exact: false });
    this.accountRole = page.locator("span").filter({ hasText: "Gold" }).first();
    this.ordersTable = page.locator("table:has(th:has-text('ORDER'))").first();
    this.orderRows = page.locator("table:has(th:has-text('ORDER')) tbody tr");
    this.orderColumns = page.locator("th:has-text('ORDER'), th:has-text('DATE'), th:has-text('STATUS'), th:has-text('TOTAL'), th:has-text('ACTIONS')");
    this.backToListButton = page.locator("button:has-text('Back'), a:has-text('Back'), button:has-text('List')").first();
    this.paginationPage2 = page.locator("button:has-text('2'), [class*='pagination'] button:has-text('2')").first();
  }

  async navigateToDashboard(): Promise<void> {
    await this.page.goto("/my-account", { waitUntil: "domcontentloaded", timeout: 30000 });
  }

  async navigateToOrders(): Promise<void> {
    await this.page.goto("/my-account?tab=Orders", { waitUntil: "domcontentloaded", timeout: 30000 });
  }

  async navigateToAddress(): Promise<void> {
    await this.page.goto("/my-account?tab=Address", { waitUntil: "domcontentloaded", timeout: 30000 });
  }

  async navigateToWishlist(): Promise<void> {
    await this.page.goto("/my-account?tab=Wishlist", { waitUntil: "domcontentloaded", timeout: 30000 });
  }

  async clickViewOrder(rowIndex: number = 0): Promise<void> {
    await this.orderRows.nth(rowIndex).locator("button:has-text('View'), a:has-text('View')").first().click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async clickBackToList(): Promise<void> {
    await this.backToListButton.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async clickLogout(): Promise<void> {
    await this.logoutButton.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async clickPage2(): Promise<void> {
    await this.paginationPage2.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }
}
