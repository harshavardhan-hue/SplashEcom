import { Page, Locator } from "@playwright/test";

export class SearchResultsPage {
  page: Page;
  productCards: Locator;
  inStockBadges: Locator;
  splashPrices: Locator;
  pagination: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator("[class*='explore-box']");
    this.inStockBadges = page.locator("span.badge:has-text('instock')");
    this.splashPrices = page.locator("button.btn-secondary:has-text('Splash Price')");
    this.pagination = page.locator("div.custom-pagination").first();
  }

  async clickProductByName(name: string): Promise<void> {
    await this.page.locator(`a:has-text('${name}'), [class*='product-name']:has-text('${name}')`).first().click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async clickPageNumber(num: number): Promise<void> {
    await this.page.locator(`button.custom-pagination__page:text('${num}'), button[aria-label='Page ${num}']`).first().click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async getProductCount(): Promise<number> {
    await this.productCards.first().waitFor({ state: "attached", timeout: 15000 }).catch(() => {});
    return this.productCards.count();
  }
}
