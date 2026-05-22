import { Page, Locator } from "@playwright/test";

export class FooterPage {
  page: Page;
  footer: Locator;
  logo: Locator;
  shippingPolicyLink: Locator;
  privacyPolicyLink: Locator;
  refundPolicyLink: Locator;
  orderTrackingLink: Locator;
  faqsLink: Locator;
  termsLink: Locator;
  eliquidsLink: Locator;
  newArrivalsLink: Locator;
  vapeShopLink: Locator;
  smokeShopLink: Locator;
  thcProductsLink: Locator;
  mushroomLink: Locator;
  whipCreamLink: Locator;
  nicDisposableLink: Locator;
  locationText: Locator;
  phoneText: Locator;
  copyright: Locator;

  constructor(page: Page) {
    this.page = page;
    this.footer = page.locator("footer").first();
    this.logo = page.locator("footer img, footer .logo img").first();
    this.shippingPolicyLink = page.locator("footer a[href*='shipping-policy']").first();
    this.privacyPolicyLink = page.locator("footer a[href*='privacy-policy']").first();
    this.refundPolicyLink = page.locator("footer a[href*='refund-policy']").first();
    this.orderTrackingLink = page.locator("footer a[href*='Orders'], footer a:has-text('Order Tracking')").first();
    this.faqsLink = page.locator("footer a[href*='faqs'], footer a:has-text('Faq')").first();
    this.termsLink = page.locator("footer a[href*='term-of-use'], footer a:has-text('Terms')").first();
    this.eliquidsLink = page.locator("footer a[href*='eliquids']").first();
    this.newArrivalsLink = page.locator("footer a[href*='new-arrivals']").first();
    this.vapeShopLink = page.locator("footer a[href*='vape-shop']").first();
    this.smokeShopLink = page.locator("footer a[href*='smoke-shop']").first();
    this.thcProductsLink = page.locator("footer a[href*='thc-products']").first();
    this.mushroomLink = page.locator("footer a[href*='mushroom']").first();
    this.whipCreamLink = page.locator("footer a[href*='whip-cream']").first();
    this.nicDisposableLink = page.locator("footer a[href*='nic-disposable']").first();
    this.locationText = page.locator("footer").getByText("Oak Creek", { exact: false });
    this.phoneText = page.locator("footer").getByText("(414) 928-6959", { exact: false });
    this.copyright = page.getByText("2026 Splash Distributors", { exact: false });
  }

  async scrollToFooter(): Promise<void> {
    await this.footer.scrollIntoViewIfNeeded();
    await this.shippingPolicyLink.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
    await this.page.waitForLoadState("domcontentloaded");
  }

  async clickLink(link: Locator): Promise<void> {
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }
}
