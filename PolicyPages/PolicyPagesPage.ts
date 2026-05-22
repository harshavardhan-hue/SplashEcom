import { Page, Locator } from "@playwright/test";

export class PolicyPagesPage {
  page: Page;
  mainContent: Locator;
  pageHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainContent = page.locator("h1:visible").first();
    this.pageHeader = page.locator("h1:visible").first();
  }

  async navigateToShippingPolicy(): Promise<void> {
    await this.page.goto("/shipping-policy", { waitUntil: "domcontentloaded", timeout: 30000 });
    await this.mainContent.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  }

  async navigateToPrivacyPolicy(): Promise<void> {
    await this.page.goto("/privacy-policy", { waitUntil: "domcontentloaded", timeout: 30000 });
    await this.mainContent.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  }

  async navigateToRefundPolicy(): Promise<void> {
    await this.page.goto("/refund-policy", { waitUntil: "domcontentloaded", timeout: 30000 });
    await this.mainContent.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  }

  async navigateToTerms(): Promise<void> {
    await this.page.goto("/term-of-use", { waitUntil: "domcontentloaded", timeout: 30000 });
    await this.mainContent.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  }
}
