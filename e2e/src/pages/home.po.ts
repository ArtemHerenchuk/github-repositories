import {browser, by, element, ElementFinder} from 'protractor';

export default class Home {
  url = '/';
  searchInput = element(by.css('input[formcontrolname="searchQuery"]'));
  resultRowsLanguageText = element.all(by.css('.mat-card-content > table > tr:nth-child(1) > td'));
  navigateTo(): Promise<unknown> {
    return browser.get(this.url) as Promise<unknown>;
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
