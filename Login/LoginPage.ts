import { Page, Locator } from "@playwright/test";

export class LoginPage {
  page: Page;
  heading: Locator;
  loginTab: Locator;
  registrationTab: Locator;
  usernameField: Locator;
  passwordField: Locator;
  loginButton: Locator;
  forgotPasswordLink: Locator;
  benefitsHeading: Locator;
  benefitCheckoutFaster: Locator;
  benefitShippingAddresses: Locator;
  benefitOrderHistory: Locator;
  benefitTrackOrders: Locator;
  benefitWishlist: Locator;
  registrationForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByText("MY ACCOUNT");
    this.loginTab = page.locator("li").filter({ hasText: /^Login$/ }).first();
    this.registrationTab = page.locator("li").filter({ hasText: /^Registration$/ }).first();
    this.usernameField = page.getByRole("textbox", { name: "Email *" });
    this.passwordField = page.getByRole("textbox", { name: "Password *" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.forgotPasswordLink = page.getByText("Forgot Password", { exact: false });
    this.benefitsHeading = page.getByText("Create an account with us");
    this.benefitCheckoutFaster = page.getByText("Check out faster");
    this.benefitShippingAddresses = page.getByText("shipping addresses", { exact: false });
    this.benefitOrderHistory = page.getByText("order history", { exact: false });
    this.benefitTrackOrders = page.getByText("Track new orders", { exact: false });
    this.benefitWishlist = page.getByText("wish list", { exact: false });
    this.registrationForm = page.locator("div[class*='registerform']").first();
  }

  async navigateTo(): Promise<void> {
    await this.page.goto("/my-account?tab=login", { waitUntil: "domcontentloaded", timeout: 30000 });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await Promise.all([
      this.page.waitForURL(
        url => !url.href.includes('tab=login'),
        { timeout: 60000, waitUntil: 'domcontentloaded' }
      ).catch(() => {}),
      this.loginButton.click(),
    ]);
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  }

  async clickRegistrationTab(): Promise<void> {
    await this.registrationTab.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 15000 });
  }
}
