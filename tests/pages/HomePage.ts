import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly logo: Locator;
  readonly navLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.logo = page.locator('header img, .logo, [alt*="logo" i]').first();
    this.navLinks = page.locator('nav a');
  }

  async open() {
    await this.navigateTo('/');
    await this.waitForPageLoad();
  }

  async getNavLinkTexts(): Promise<string[]> {
    return this.navLinks.allTextContents();
  }
}
