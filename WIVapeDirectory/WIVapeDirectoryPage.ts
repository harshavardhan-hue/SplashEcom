import { Page, Locator } from "@playwright/test";

export class WIVapeDirectoryPage {
  page: Page;
  productCards: Locator;
  splashPrices: Locator;
  coastalCloudsProduct: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator("[class*='explore-box']");
    this.splashPrices = page.locator("button.btn-secondary:has-text('Splash Price')");
    this.coastalCloudsProduct = page.locator("a:has-text('COASTAL CLOUDS'), [class*='product-name']:has-text('COASTAL CLOUDS')").first();
  }

  async navigateTo(): Promise<void> {
    await this.page.goto("/product-category/wi-vape-directory?perPage=20&sort=latest", { waitUntil: "domcontentloaded", timeout: 30000 });
    await this.productCards.first().waitFor({ state: "attached", timeout: 30000 }).catch(() => {});
  }

  async clickCoastalClouds(): Promise<void> {
    await this.coastalCloudsProduct.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }
}
