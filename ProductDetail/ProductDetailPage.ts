import { Page, Locator } from "@playwright/test";

export class ProductDetailPage {
  page: Page;
  productName: Locator;
  splashPrice: Locator;
  regularPrice: Locator;
  sku: Locator;
  refundNotice: Locator;
  imageGallery: Locator;
  nextImageButton: Locator;
  prevImageButton: Locator;
  variantsTable: Locator;
  flavorHeader: Locator;
  stockHeader: Locator;
  priceHeader: Locator;
  quantityHeader: Locator;
  flavorSearchInput: Locator;
  bulkCartButton: Locator;
  addedToCartAlert: Locator;
  recommendedSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator("h6.text-dark").first();
    this.splashPrice = page.locator(".overlay-text").first();
    this.regularPrice = page.locator("p.price span[style*='line-through'], del, .price del").first();
    this.sku = page.locator("[class*='sku'], span:has-text('SKU')").first();
    this.refundNotice = page.getByText("All purchases are final and non-refundable", { exact: false });
    this.imageGallery = page.locator("img[alt='Product Image']").first();
    this.nextImageButton = page.locator("button.arrow-button.right-arrow").first();
    this.prevImageButton = page.locator("button.arrow-button.left-arrow").first();
    this.variantsTable = page.locator("table.table-bordered").first();
    this.flavorHeader = page.locator("th:has-text('Flavor')").first();
    this.stockHeader = page.locator("th:has-text('Stock')").first();
    this.priceHeader = page.locator("th:has-text('Price')").first();
    this.quantityHeader = page.locator("th:has-text('Quantity')").first();
    this.flavorSearchInput = page.locator("input[placeholder='Search...']").first();
    this.bulkCartButton = page.locator("button.btn-danger, button:has-text('Bulk Cart')").first();
    this.addedToCartAlert = page.locator("div.relative.flex.flex-row.gap-4.cursor-pointer").first();
    this.recommendedSection = page.locator("h1:has-text('Recommended')").first();
  }

  async navigateTo(): Promise<void> {
    await this.page.goto("/product/vapetasia-e-liquid-100ml", { waitUntil: "domcontentloaded", timeout: 30000 });
    await this.variantsTable.waitFor({ state: "attached", timeout: 20000 }).catch(() => {});
    await this.imageGallery.waitFor({ state: "attached", timeout: 10000 }).catch(() => {});
  }

  async searchFlavor(term: string): Promise<void> {
    await this.flavorSearchInput.fill(term);
    await this.page.waitForTimeout(500);
  }

  async clickPlusForFlavor(flavorText: string): Promise<void> {
    await this.page
      .locator(`tr:has-text('${flavorText}') button:has-text('+'), tr:has-text('${flavorText}') [class*='plus'], tr:has-text('${flavorText}') [class*='increment']`)
      .first()
      .click();
  }

  async clickMinusForFlavor(flavorText: string): Promise<void> {
    await this.page
      .locator(`tr:has-text('${flavorText}') button:has-text('-'), tr:has-text('${flavorText}') [class*='minus'], tr:has-text('${flavorText}') [class*='decrement']`)
      .first()
      .click();
  }

  async setFlavorQuantity(flavorText: string, qty: number): Promise<void> {
    for (let i = 0; i < qty; i++) {
      await this.clickPlusForFlavor(flavorText);
    }
  }

  async getFlavorQuantityInput(flavorText: string): Promise<Locator> {
    return this.page
      .locator(`tr:has-text('${flavorText}') input[type='text']`)
      .first();
  }

  async clickBulkCart(): Promise<void> {
    await this.bulkCartButton.click();
    await this.addedToCartAlert.waitFor({ state: 'visible', timeout: 20000 }).catch(() => {});
    await this.page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() =>
      this.page.waitForLoadState("domcontentloaded", { timeout: 10000 })
    );
  }

  async clickNextImage(): Promise<void> {
    await this.nextImageButton.evaluate((el: HTMLElement) => el.click());
    await this.page.waitForTimeout(500);
  }

  async clickPrevImage(): Promise<void> {
    await this.prevImageButton.evaluate((el: HTMLElement) => el.click());
    await this.page.waitForTimeout(500);
  }
}
