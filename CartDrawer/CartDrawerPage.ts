import { Page, Locator } from "@playwright/test";

export class CartDrawerPage {
  page: Page;
  heading: Locator;
  closeButton: Locator;
  cartItems: Locator;
  checkoutMessage: Locator;
  subTotal: Locator;
  viewCartButton: Locator;
  checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator("h5.offcanvas-title").first();
    this.closeButton = page.locator("button.btn-close").first();
    this.cartItems = page.locator(".acitivity-timeline div.mb-2.card");
    this.checkoutMessage = page.getByText("Awesome! Your cart is ready for checkout", { exact: false });
    this.subTotal = page.locator("h6:has-text('Sub Total')").first();
    this.viewCartButton = page.locator("a.cart-button[href*='cart']").first();
    this.checkoutButton = page.locator("div.cart-button.black").first();
  }

  async isOpen(): Promise<boolean> {
    return this.heading.isVisible({ timeout: 8000 }).catch(() => false);
  }

  async close(): Promise<void> {
    await this.closeButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async increaseItemQty(itemIndex: number = 0): Promise<void> {
    await this.cartItems.nth(itemIndex).locator("button.symbol-left").first().click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async decreaseItemQty(itemIndex: number = 0): Promise<void> {
    await this.cartItems.nth(itemIndex).locator("button.symbol-right").first().click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async clickViewCart(): Promise<void> {
    await this.viewCartButton.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }
}
