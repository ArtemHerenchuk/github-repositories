import {browser} from 'protractor';

export default class LocalStorage {
  getItem(key: string): Promise<string> {
    return browser.driver.executeScript('return window.localStorage.getItem("' + key + '");') as Promise<string>;
  }

  setItem(key: string, value: string): Promise<string> {
    return browser.driver.executeScript('window.localStorage.setItem(\'' + key + '\', \'' + value + '\');') as Promise<string>;
  }
}
