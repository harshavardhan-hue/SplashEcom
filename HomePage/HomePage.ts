import { Page, Locator } from "@playwright/test";

export class HomePage {
  page: Page;
  warningBanner: Locator;
  logo: Locator;
  cartIcon: Locator;
  marquee: Locator;
  heroBanner: Locator;
  categoryTiles: Locator;
  eliquidsTile: Locator;
  brandCarousel: Locator;
  paginationDots: Locator;
  brandCardCaps: Locator;
  blazySusanCard: Locator;
  newsletterSection: Locator;
  newsletterEmailInput: Locator;
  newsletterSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.warningBanner = page.getByText("WARNING: SOME PRODUCTS ON THIS WEBSITE MAY CONTAIN NICOTINE", { exact: false });
    this.logo = page.locator("img[alt='logo']").first();
    this.cartIcon = page.locator("svg.icons").first();
    this.marquee = page.locator("[class*='notice-bar'], [class*='scroll-content']").first();
    this.heroBanner = page.locator("img[alt='GIF banner']").first();
    this.categoryTiles = page.locator("a[href*='product-category']");
    this.eliquidsTile = page.locator("a[href*='eliquids']").first();
    this.brandCarousel = page.locator(".carousel-root").first();
    this.paginationDots = page.locator("li[role='button'][aria-label*='slide item']");
    this.brandCardCaps = page.locator("img[alt='Card cap']");
    this.blazySusanCard = page.locator("a[href*='blazy']").first();
    this.newsletterSection = page.getByText("Sign Up For Newsletters", { exact: false });
    this.newsletterEmailInput = page.getByRole("textbox", { name: "Enter email address" });
    this.newsletterSubmitButton = page.locator("span.input-group-text:has-text('Sign up')").first();
  }

  async navigateTo(): Promise<void> {
    await this.page.goto("/", { waitUntil: "domcontentloaded", timeout: 30000 });
    await this.page.waitForLoadState("load", { timeout: 30000 }).catch(() => {});
    await this.heroBanner.waitFor({ state: 'visible', timeout: 30000 }).catch(() => {});
  }

  async clickEliquidsTile(): Promise<void> {
    await this.eliquidsTile.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async clickBlazyCard(): Promise<void> {
    await this.blazySusanCard.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async submitNewsletter(email: string): Promise<void> {
    await this.newsletterSection.scrollIntoViewIfNeeded();
    await this.newsletterEmailInput.fill(email);
    await this.newsletterSubmitButton.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }
}
