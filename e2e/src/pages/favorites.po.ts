import {browser, by, element, ElementFinder} from 'protractor';

export default class Favorites {
  url = '/favorites';
  repoNames = element.all(by.css('.repo-list__name'));

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
}
