import {browser, by, element, ElementFinder} from 'protractor';

export default class Favorites {
  url = '/favorites';

  navigateTo() {
    browser.driver.get(browser.baseUrl + this.url);
    browser.driver.switchTo().alert().sendKeys('1234');
    browser.driver.switchTo().alert().accept();
  }

  getTitleText(): Promise<string> {
    return browser.getTitle() as Promise<string>;
  }

  getResultList(){
    return element.all(by.css('app-repositories-list .mat-card'));
  }

  selectOption(option: string){
    element(by.css('.mat-form-field-type-mat-select')).click();
    element(by.cssContainingText('.mat-option-text', option)).click();
  }

  navigateToHome(){
    element(by.linkText('Home')).click();
  }

  navigateToFavorites(){
    element(by.linkText('Favorites')).click();
  }
}
