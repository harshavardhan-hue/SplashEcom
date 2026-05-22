import { test, expect } from '../fixtures/base.fixtures';
import { allure } from 'allure-playwright';

test.describe('Splash Distributors - Homepage', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('should load homepage successfully', async ({ homePage }) => {
    await allure.epic('Homepage');
    await allure.feature('Page Load');
    await allure.story('Basic Navigation');

    const title = await homePage.getTitle();
    expect(title).toBeTruthy();
  });

  test('should display navigation links', async ({ homePage }) => {
    await allure.epic('Homepage');
    await allure.feature('Navigation');
    await allure.story('Nav Links Visible');

    const links = await homePage.getNavLinkTexts();
    expect(links.length).toBeGreaterThan(0);
  });

  test('should have correct page URL', async ({ page }) => {
    await allure.epic('Homepage');
    await allure.feature('Navigation');
    await allure.story('URL Validation');

    expect(page.url()).toContain('splashdistributors');
  });
});
