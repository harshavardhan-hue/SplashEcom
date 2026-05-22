import { Page, Locator } from "@playwright/test";

export class BrandBrowsingPage {
  page: Page;
  productCards: Locator;
  splashPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator("[class*='explore-box']");
    this.splashPrices = page.locator("button.btn-secondary:has-text('Splash Price')");
  }

  async navigateToDestroyer(): Promise<void> {
    await this.page.goto("/product-category/thc-products?page=1&perPage=20&sort=latest&brand=DESTROYER", { waitUntil: "domcontentloaded", timeout: 60000 });
    await this.productCards.first().waitFor({ state: "attached", timeout: 60000 }).catch(() => {});
  }

  async navigateToTorch(): Promise<void> {
    await this.page.goto("/product-category/thc-products?page=1&perPage=20&sort=latest&brand=TORCH", { waitUntil: "domcontentloaded", timeout: 60000 });
    await this.productCards.first().waitFor({ state: "attached", timeout: 60000 }).catch(() => {});
  }

  async navigateToHiddenHills(): Promise<void> {
    await this.page.goto("/product-category/hidden-hills?perPage=20&sort=latest", { waitUntil: "domcontentloaded", timeout: 60000 });
    await this.productCards.first().waitFor({ state: "attached", timeout: 60000 }).catch(() => {});
  }

  async navigateToWoodstock(): Promise<void> {
    await this.page.goto("/product-category/woodstock-blends?perPage=15&sort=latest", { waitUntil: "domcontentloaded", timeout: 60000 });
    await this.productCards.first().waitFor({ state: "attached", timeout: 60000 }).catch(() => {});
  }

  async navigateToFVKD(): Promise<void> {
    await this.page.goto("/product-category/fvkd-blends?perPage=20&sort=latest", { waitUntil: "domcontentloaded", timeout: 60000 });
    await this.productCards.first().waitFor({ state: "attached", timeout: 60000 }).catch(() => {});
  }

  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }
}
