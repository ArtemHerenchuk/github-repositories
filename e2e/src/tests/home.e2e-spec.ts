import {browser, by, element, logging, protractor} from 'protractor';
import Home from '../pages/home.po';
import LocalStorage from '../common/local.storage';

describe('workspace-project App', () => {
  let page: Home;

  beforeEach(() => {
    page = new Home();
    page.navigateTo();
  });

  it('should display welcome message', () => {
    expect(page.getTitleText()).toEqual('Verenia test');
  });

  it('should find by a repo name', () => {
    const repoName = 'vereniaTestTaskRepoName3be2c944-6372-4d2f-91d5-3356c52bed67';
    page.searchInput.sendKeys(repoName);

    expect(page.getResultList().first().getText()).toContain(repoName);
  });

  it('should find by a description', () => {
    const description = 'Description6821d0eb-b98d-4921-9445-3fef419cb3f6';
    page.searchInput.sendKeys(description);

    expect(page.getResultList().first().getText()).toContain(description);
  });

  it('should contains 30 results', () => {
    const query = 'java';
    const count = 30;
    page.searchInput.sendKeys(query);

    expect(page.getResultList().count()).toEqual(count);
  });

  it('should filter by language', () => {
    const query = 'java';
    const optionParameter = 'HTML';
    const expectedCountResultRows = 2;
    page.searchInput.sendKeys(query);
    page.selectOption(optionParameter);
    // tslint:disable-next-line:only-arrow-functions no-shadowed-variable
    const actualCountResultRows = page.resultRowsLanguageText.filter(function(element, index) {
      // tslint:disable-next-line:only-arrow-functions
      return element.getText().then(function(text) {
        return text === optionParameter;
      });
    }).count();

    expect(actualCountResultRows).toEqual(expectedCountResultRows);
  });

  it('should add to favorites', () => {
    const expectedFavorites = '{"repoList":[{"id":338291782,"avatar":"https://avatars.githubusercontent.com/u/11585236?v=4","name":"vereniaTestTaskRepoName3be2c944-6372-4d2f-91d5-3356c52bed67","stargazersCount":0,"description":"Description6821d0eb-b98d-4921-9445-3fef419cb3f6","url":"https://github.com/supfeer/vereniaTestTaskRepoName3be2c944-6372-4d2f-91d5-3356c52bed67","language":null}]}';
    const query = 'vereniaTestTaskRepoName3be2c944-6372-4d2f-91d5-3356c52bed67';
    page.searchInput.sendKeys(query);
    element(by.cssContainingText('i', 'Add to favorite')).click();
    const actualFavorites = new LocalStorage().getItem('favorites');

    expect(actualFavorites).toEqual(expectedFavorites);
  });

  it('should remove from favorites', () => {
    const favorites = '{"repoList":[{"id":338291782,"avatar":"https://avatars.githubusercontent.com/u/11585236?v=4","name":"vereniaTestTaskRepoName3be2c944-6372-4d2f-91d5-3356c52bed67","stargazersCount":0,"description":"Description6821d0eb-b98d-4921-9445-3fef419cb3f6","url":"https://github.com/supfeer/vereniaTestTaskRepoName3be2c944-6372-4d2f-91d5-3356c52bed67","language":null}]}';
    const expectedFavorites = '{"repoList":[]}';
    const query = 'vereniaTestTaskRepoName3be2c944-6372-4d2f-91d5-3356c52bed67';
    new LocalStorage().setItem('favorites', favorites);
    page.searchInput.sendKeys(query);
    element(by.cssContainingText('i', 'Remove from favorite')).click();
    const actualFavorites = new LocalStorage().getItem('favorites');

    expect(actualFavorites).toEqual(expectedFavorites);
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
