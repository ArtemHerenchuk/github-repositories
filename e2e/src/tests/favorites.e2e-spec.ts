import {browser, by, element, logging, protractor} from 'protractor';
import Favorites from '../pages/favorites.po';
import LocalStorage from '../common/local.storage';

describe('Favorites', () => {
  let page: Favorites;

  beforeEach(() => {
    page = new Favorites();
    page.navigateTo();
  });

  it('check favorites', () => {
    const favorites = '{"repoList":[{"id":338291782,"avatar":"https://avatars.githubusercontent.com/u/11585236?v=4","name":"vereniaTestTaskRepoName3be2c944-6372-4d2f-91d5-3356c52bed67","stargazersCount":0,"description":"Description6821d0eb-b98d-4921-9445-3fef419cb3f6","url":"https://github.com/supfeer/vereniaTestTaskRepoName3be2c944-6372-4d2f-91d5-3356c52bed67","language":null}]}';
    new LocalStorage().setItem('favorites', favorites);
    page.navigateTo();
    expect(element(by.css('.repo-list__name')).getText()).toEqual('vereniaTestTaskRepoName3be2c944-6372-4d2f-91d5-3356c52bed67');
  });


  it('check favorites1', () => {
    const favotites = '{"repoList":[{"id":338291782,"avatar":"https://avatars.githubusercontent.com/u/11585236?v=4","name":"vereniaTestTaskRepoName3be2c944-6372-4d2f-91d5-3356c52bed67","stargazersCount":0,"description":"Description6821d0eb-b98d-4921-9445-3fef419cb3f6","url":"https://github.com/supfeer/vereniaTestTaskRepoName3be2c944-6372-4d2f-91d5-3356c52bed67","language":null}]}';
    browser.driver.executeScript('window.localStorage.setItem(\'favorites\', \'' + favotites + '\');');
    browser.driver.get(browser.baseUrl + '/favorites');
    browser.driver.switchTo().alert().sendKeys('1234');
    browser.driver.switchTo().alert().accept();

    expect(element(by.css('.repo-list__name')).getText()).toEqual('vereniaTestTaskRepoName3be2c944-6372-4d2f-91d5-3356c52bed67');
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
    browser.executeScript('window.localStorage.clear();');
  });
});
