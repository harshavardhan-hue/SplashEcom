import { Page, Locator } from "@playwright/test";

export class ProductCategoryPage {
  page: Page;
  breadcrumb: Locator;
  productCards: Locator;
  productNames: Locator;
  inStockBadges: Locator;
  splashPrices: Locator;
  wishlistIcons: Locator;
  filtersButton: Locator;
  filterPanel: Locator;
  sortGroup: Locator;
  paginationContainer: Locator;
  paginationFirst: Locator;
  paginationPrev: Locator;
  paginationNext: Locator;
  paginationLast: Locator;
  gridViewIcon: Locator;
  listViewIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.breadcrumb = page.locator("[class*='breadcrumb']").first();
    this.productCards = page.locator("[class*='explore-box']");
    this.productNames = page.locator("h6[class*='text-dark']");
    this.inStockBadges = page.locator("span.badge:has-text('instock')");
    this.splashPrices = page.locator("button.btn-secondary:has-text('Splash Price')");
    this.wishlistIcons = page.locator("[class*='bookmark-icon']");
    this.filtersButton = page.locator("button:has-text('Filters')").first();
    this.filterPanel = page.locator("[class*='mobile-filter-sidebar']").first();
    this.sortGroup = page.locator("[class*='sort-head']").first();
    this.paginationContainer = page.locator("div.custom-pagination").first();
    this.paginationFirst = page.locator("button[aria-label='First page']").first();
    this.paginationPrev = page.locator("button[aria-label='Previous page']").first();
    this.paginationNext = page.locator("button[aria-label='Next page']").first();
    this.paginationLast = page.locator("button[aria-label='Last page']").first();
    this.gridViewIcon = page.locator("[class*='grid-view']").first();
    this.listViewIcon = page.locator("[class*='list-view']").first();
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path, { waitUntil: "domcontentloaded", timeout: 30000 });
    await this.productCards.first().waitFor({ state: "attached", timeout: 60000 }).catch(() => {});
  }

  async openFilters(): Promise<void> {
    await this.filtersButton.waitFor({ state: 'visible', timeout: 30000 }).catch(() => {});
    await this.filtersButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async selectSortOption(optionText: string): Promise<void> {
    await this.openFilters();
    await this.page.locator("[class*='mobile-filter-sidebar'] span:has-text('Sort')").click();
    await this.page.getByText(optionText, { exact: true }).click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async clickPageNumber(num: number): Promise<void> {
    await this.page.locator(`button.custom-pagination__page:text('${num}'), button[aria-label='Page ${num}']`).first().click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async clickProductByName(name: string): Promise<void> {
    await this.page.locator(`a:has-text('${name}'), [class*='product-name']:has-text('${name}')`).first().click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async addFirstProductToWishlist(): Promise<void> {
    await this.wishlistIcons.first().click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async switchToListView(): Promise<void> {
    const visible = await this.listViewIcon.isVisible().catch(() => false);
    if (visible) {
      await this.listViewIcon.click();
      await this.page.waitForLoadState("domcontentloaded");
      await this.productCards.first().waitFor({ state: "attached", timeout: 10000 }).catch(() => {});
    }
  }

  async switchToGridView(): Promise<void> {
    const visible = await this.gridViewIcon.isVisible().catch(() => false);
    if (visible) {
      await this.gridViewIcon.click();
      await this.page.waitForLoadState("domcontentloaded");
      await this.productCards.first().waitFor({ state: "attached", timeout: 10000 }).catch(() => {});
    }
  }

  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }
}
