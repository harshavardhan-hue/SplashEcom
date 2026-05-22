import { Page, Locator } from "@playwright/test";

export class WishlistPage {
  page: Page;
  wishlistItems: Locator;
  removeButtons: Locator;
  emptyWishlistMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.wishlistItems = page.locator(".wishlist-content table tbody tr");
    this.removeButtons = page.locator("button:has-text('Empty Wishlist'), button[class*='emptyBtn']");
    this.emptyWishlistMessage = page.locator(".wishlist-content table tbody").filter({ has: page.locator("tr") }).first();
  }

  async removeFirstItem(): Promise<void> {
    const emptyBtn = this.page.locator("button:has-text('Empty Wishlist'), button[class*='emptyBtn']").first();
    await emptyBtn.click();
    const confirmBtn = this.page.locator("button:has-text('Yes'), button:has-text('Confirm')").first();
    await confirmBtn.waitFor({ state: "visible", timeout: 3000 }).catch(() => {});
    if (await confirmBtn.isVisible().catch(() => false)) await confirmBtn.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async getItemCount(): Promise<number> {
    return this.wishlistItems.count();
  }
}
