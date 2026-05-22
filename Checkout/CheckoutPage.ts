import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
  page: Page;
  informationHeading: Locator;
  welcomeMessage: Locator;
  shippingAddressHeading: Locator;
  firstNameField: Locator;
  lastNameField: Locator;
  streetAddressField: Locator;
  aptSuiteField: Locator;
  countryDropdown: Locator;
  stateDropdown: Locator;
  zipCodeField: Locator;
  cityField: Locator;
  phoneField: Locator;
  continueButton: Locator;
  continueShoppingButton: Locator;
  cartSidebar: Locator;
  promoCodeLink: Locator;
  promoCodeInput: Locator;
  applyPromoButton: Locator;
  stepperActive: Locator;

  constructor(page: Page) {
    this.page = page;
    this.informationHeading = page.locator("h4:has-text('INFORMATION')").first();
    this.welcomeMessage = page.getByText("Welcome back, abhisek", { exact: false });
    this.shippingAddressHeading = page.getByText("SHIPPING ADDRESS", { exact: false });
    this.firstNameField = page.locator("input[name='firstName']").first();
    this.lastNameField = page.locator("input[name='lastName']").first();
    this.streetAddressField = page.locator("input[name='streetAddress']").first();
    this.aptSuiteField = page.locator("input[name='apartment']").first();
    this.countryDropdown = page.locator("[id='country'][role='combobox']").first();
    this.stateDropdown = page.locator("[id='state'][role='combobox']").first();
    this.zipCodeField = page.locator("input[name='zip']").first();
    this.cityField = page.locator("input[name='town']").first();
    this.phoneField = page.locator("input[name='phone']").first();
    this.continueButton = page.locator("form button[type='submit']").first();
    this.continueShoppingButton = page.locator("button:has-text('Continue Shopping')").first();
    this.cartSidebar = page.locator("[class*='your-cart-content']").first();
    this.promoCodeLink = page.getByText("Have a promo code", { exact: false });
    this.promoCodeInput = page.getByLabel("Coupon code");
    this.applyPromoButton = page.locator("button:has-text('APPLY COUPON')").first();
    this.stepperActive = page.getByText("INFORMATION", { exact: true }).first();
  }

  async navigateTo(): Promise<void> {
    await this.page.goto("/checkout", { waitUntil: "domcontentloaded", timeout: 30000 });
  }

  async fillShippingAddress(data: {
    firstName: string; lastName: string; street: string; apt?: string;
    country?: string; state?: string; zip: string; city: string; phone: string;
  }): Promise<void> {
    await this.firstNameField.fill(data.firstName);
    await this.lastNameField.fill(data.lastName);
    await this.streetAddressField.fill(data.street);
    if (data.apt) await this.aptSuiteField.fill(data.apt);
    if (data.country) {
      await this.countryDropdown.click();
      await this.page.locator(`[role='option']:has-text('${data.country}')`).first().click();
    }
    if (data.state) {
      await this.stateDropdown.click();
      await this.page.locator(`[role='option']:has-text('${data.state}')`).first().click();
    }
    await this.zipCodeField.fill(data.zip);
    await this.cityField.fill(data.city);
    await this.phoneField.fill(data.phone);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  }

  async openPromoCodeField(): Promise<void> {
    await this.promoCodeLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}
