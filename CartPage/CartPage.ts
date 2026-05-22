import { Page, Locator } from "@playwright/test";

export class CartPage {
  page: Page;
  stepper: Locator;
  cartStepActive: Locator;
  priceUpdateNotice: Locator;
  cartTable: Locator;
  cartRows: Locator;
  emptyCartButton: Locator;
  updateCartButton: Locator;
  couponInput: Locator;
  applyCouponButton: Locator;
  cartTotalsSection: Locator;
  subtotalRow: Locator;
  shippingRow: Locator;
  flatRateRadio: Locator;
  taxRow: Locator;
  totalRow: Locator;
  warningMessage: Locator;
  proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.stepper = page.locator("[class*='MuiStepper-root']").first();
    this.cartStepActive = page.locator("[class*='Mui-completed'] span:has-text('CART'), [class*='MuiStepLabel'] span:has-text('CART')").first();
    this.priceUpdateNotice = page.locator("p:has-text('contact your sales representative')").first();
    this.cartTable = page.locator("table.responsive-table").first();
    this.cartRows = page.locator("table.responsive-table tbody tr");
    this.emptyCartButton = page.locator("button:has-text('Empty Cart')").first();
    this.updateCartButton = page.locator("button:has-text('Update Cart')").first();
    this.couponInput = page.locator("input[placeholder='Enter coupon']").first();
    this.applyCouponButton = page.locator("button:has-text('APPLY')").first();
    this.cartTotalsSection = page.locator("[class*='taxStyle']").first();
    this.subtotalRow = page.locator("[class*='hidingShip']:has-text('Subtotal')").first();
    this.shippingRow = page.locator("[class*='taxStyle']:has-text('Shipping')").first();
    this.flatRateRadio = page.locator("[class*='radioBtnStyle']").first();
    this.taxRow = page.locator("[class*='taxStyle']:has-text('Tax')").first();
    this.totalRow = page.locator("[class*='taxStyle2']").first();
    this.warningMessage = page.getByText("Review your items carefully, all sales are final", { exact: false });
    this.proceedToCheckoutButton = page.locator("button[class*='proceedBtn'], button:has-text('PROCEED TO CHECKOUT')").first();
  }

  async navigateTo(): Promise<void> {
    await this.page.goto("/cart", { waitUntil: "domcontentloaded", timeout: 30000 });
    await this.cartTable.waitFor({ state: "attached", timeout: 30000 }).catch(() => {});
    await this.couponInput.waitFor({ state: "attached", timeout: 30000 }).catch(() => {});
  }

  async increaseItemQty(rowIndex: number = 0): Promise<void> {
    await this.cartRows.nth(rowIndex).locator("button[class*='symbol-left'], button:has-text('+')").first().click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async clickUpdateCart(): Promise<void> {
    await this.updateCartButton.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async removeItem(rowIndex: number = 0): Promise<void> {
    const initialCount = await this.cartRows.count();
    await this.cartRows.nth(rowIndex).locator("div.cursor-pointer").first().click();
    await this.page.waitForFunction(
      (n: number) => document.querySelectorAll("table.responsive-table tbody tr").length < n,
      initialCount,
      { timeout: 15000 }
    ).catch(async () => {
      await this.page.waitForLoadState("domcontentloaded", { timeout: 15000 });
    });
  }

  async emptyCart(): Promise<void> {
    await this.emptyCartButton.click();
    const confirmBtn = this.page.locator("button:has-text('Yes, empty it!')");
    await confirmBtn.waitFor({ state: "visible", timeout: 5000 }).catch(() => {});
    if (await confirmBtn.isVisible().catch(() => false)) await confirmBtn.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async applyCoupon(code: string): Promise<void> {
    await this.couponInput.fill(code);
    await this.applyCouponButton.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.scrollIntoViewIfNeeded();
    await this.proceedToCheckoutButton.click();
    await this.page.goto("/checkout");
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }
}
