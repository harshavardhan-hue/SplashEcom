import { Page, Locator } from "@playwright/test";

export class AgeGatePage {
  page: Page;
  heading: Locator;
  message: Locator;
  yesButton: Locator;
  noButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByText("Age Verification");
    this.message = page.getByText("You must be 21 years old to enter");
    this.yesButton = page.getByRole("button", { name: "YES" });
    this.noButton = page.getByRole("button", { name: "NO" });
  }

  async isVisible(): Promise<boolean> {
    return this.yesButton.isVisible({ timeout: 8000 }).catch(() => false);
  }

  async clickYes(): Promise<void> {
    await this.yesButton.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async clickNo(): Promise<void> {
    await this.noButton.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async handleIfPresent(): Promise<void> {
    const visible = await this.isVisible();
    if (visible) await this.clickYes();
  }
}
