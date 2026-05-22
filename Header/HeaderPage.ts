import { Page, Locator } from "@playwright/test";

export class HeaderPage {
  page: Page;
  hamburgerButton: Locator;
  searchInput: Locator;
  logo: Locator;
  cartIcon: Locator;
  cartCountBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hamburgerButton = page.locator("button.MuiIconButton-root").first();
    this.searchInput = page.locator("input[placeholder*='Search' i], input[type='search']").first();
    this.logo = page.locator("img[alt='logo']").first();
    this.cartIcon = page.locator("svg.icons").first();
    this.cartCountBadge = page.locator(".navbar-top span.absolute").first();
  }

  async openSearch(): Promise<void> {
    await this.hamburgerButton.waitFor({ state: 'visible', timeout: 30000 }).catch(() => {});
    await this.hamburgerButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async searchFor(term: string): Promise<void> {
    await this.openSearch();
    await this.searchInput.waitFor({ state: "visible", timeout: 10000 });
    await this.searchInput.fill(term);
    await this.page.keyboard.press("Enter");
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async clickLogo(): Promise<void> {
    await this.logo.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async clickCartIcon(): Promise<void> {
    await this.cartIcon.click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}
