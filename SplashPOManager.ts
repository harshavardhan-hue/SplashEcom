import { Page } from "@playwright/test";
import { AgeGatePage } from "./AgeVerification/AgeGatePage";
import { LoginPage } from "./Login/LoginPage";
import { HomePage } from "./HomePage/HomePage";
import { HeaderPage } from "./Header/HeaderPage";
import { ProductCategoryPage } from "./ProductCategory/ProductCategoryPage";
import { ProductDetailPage } from "./ProductDetail/ProductDetailPage";
import { CartDrawerPage } from "./CartDrawer/CartDrawerPage";
import { CartPage } from "./CartPage/CartPage";
import { CheckoutPage } from "./Checkout/CheckoutPage";
import { SearchResultsPage } from "./SearchResults/SearchResultsPage";
import { MyAccountPage } from "./MyAccount/MyAccountPage";
import { WishlistPage } from "./Wishlist/WishlistPage";
import { FooterPage } from "./Footer/FooterPage";
import { FAQsPage } from "./FAQs/FAQsPage";
import { PolicyPagesPage } from "./PolicyPages/PolicyPagesPage";
import { WIVapeDirectoryPage } from "./WIVapeDirectory/WIVapeDirectoryPage";
import { BrandBrowsingPage } from "./BrandBrowsing/BrandBrowsingPage";
import { LogoutPage } from "./Logout/LogoutPage";

export class SplashPOManager {
  private page: Page;
  private ageGatePage: AgeGatePage;
  private loginPage: LoginPage;
  private homePage: HomePage;
  private headerPage: HeaderPage;
  private productCategoryPage: ProductCategoryPage;
  private productDetailPage: ProductDetailPage;
  private cartDrawerPage: CartDrawerPage;
  private cartPage: CartPage;
  private checkoutPage: CheckoutPage;
  private searchResultsPage: SearchResultsPage;
  private myAccountPage: MyAccountPage;
  private wishlistPage: WishlistPage;
  private footerPage: FooterPage;
  private faqsPage: FAQsPage;
  private policyPagesPage: PolicyPagesPage;
  private wiVapeDirectoryPage: WIVapeDirectoryPage;
  private brandBrowsingPage: BrandBrowsingPage;
  private logoutPage: LogoutPage;

  constructor(page: Page) {
    this.page = page;
    this.ageGatePage = new AgeGatePage(page);
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
    this.headerPage = new HeaderPage(page);
    this.productCategoryPage = new ProductCategoryPage(page);
    this.productDetailPage = new ProductDetailPage(page);
    this.cartDrawerPage = new CartDrawerPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.searchResultsPage = new SearchResultsPage(page);
    this.myAccountPage = new MyAccountPage(page);
    this.wishlistPage = new WishlistPage(page);
    this.footerPage = new FooterPage(page);
    this.faqsPage = new FAQsPage(page);
    this.policyPagesPage = new PolicyPagesPage(page);
    this.wiVapeDirectoryPage = new WIVapeDirectoryPage(page);
    this.brandBrowsingPage = new BrandBrowsingPage(page);
    this.logoutPage = new LogoutPage(page);
  }

  getAgeGatePage(): AgeGatePage { return this.ageGatePage; }
  getLoginPage(): LoginPage { return this.loginPage; }
  getHomePage(): HomePage { return this.homePage; }
  getHeaderPage(): HeaderPage { return this.headerPage; }
  getProductCategoryPage(): ProductCategoryPage { return this.productCategoryPage; }
  getProductDetailPage(): ProductDetailPage { return this.productDetailPage; }
  getCartDrawerPage(): CartDrawerPage { return this.cartDrawerPage; }
  getCartPage(): CartPage { return this.cartPage; }
  getCheckoutPage(): CheckoutPage { return this.checkoutPage; }
  getSearchResultsPage(): SearchResultsPage { return this.searchResultsPage; }
  getMyAccountPage(): MyAccountPage { return this.myAccountPage; }
  getWishlistPage(): WishlistPage { return this.wishlistPage; }
  getFooterPage(): FooterPage { return this.footerPage; }
  getFAQsPage(): FAQsPage { return this.faqsPage; }
  getPolicyPagesPage(): PolicyPagesPage { return this.policyPagesPage; }
  getWIVapeDirectoryPage(): WIVapeDirectoryPage { return this.wiVapeDirectoryPage; }
  getBrandBrowsingPage(): BrandBrowsingPage { return this.brandBrowsingPage; }
  getLogoutPage(): LogoutPage { return this.logoutPage; }
}
