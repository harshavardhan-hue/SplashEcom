import { Page, Locator } from "@playwright/test";

export class FAQsPage {
  page: Page;
  heading: Locator;
  whenWillOrderShipQuestion: Locator;
  shippingAnswer: Locator;
  returnPolicyQuestion: Locator;
  returnPolicyAnswer: Locator;
  faqItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "FAQ's" });
    this.whenWillOrderShipQuestion = page.getByText("When will my order ship?", { exact: false });
    this.shippingAnswer = page.getByText("Most orders usually ship within 2-3 days", { exact: false });
    this.returnPolicyQuestion = page.getByText("Return Policy", { exact: false });
    this.returnPolicyAnswer = page.getByText("info@splashdistributors.com", { exact: false });
    this.faqItems = page.locator("[class*='faq-item'], [class*='accordion-item'], [class*='faq']");
  }

  async navigateTo(): Promise<void> {
    await this.page.goto("/faqs", { waitUntil: "domcontentloaded", timeout: 30000 });
  }
}
