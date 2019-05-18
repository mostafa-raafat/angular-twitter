import { browser, by, element } from 'protractor';

export class TweetsPage {
  navigateTo() {
    return browser.get('/');
  }

  async navigateByTabId(tabId: string) {
    await element(by.id(tabId)).click();
  }

  async TypeSearch(value: string) {
    await element(by.className('tweets__search')).element(by.tagName('input')).sendKeys(value);
  }

  async getFirstRow() {
    const row = element(by.className('tweets__table-body'))
      .element(by.tagName('tr')).first().map(column => {
      return column.getText();
    });
  }

  async nextPage() {
    await element(by.className('mat-paginator-navigation-next')).click();
  }

  async previousPage() {
    await element(by.className('mat-paginator-navigation-previous')).click();
  }

  async getFirstRowHashtag() {
    const rowId = await element.all(by.tagName('mat-cell')).first().getText();
    return Number(rowId);
  }

  async getTableLength() {
    const tableLength = await element(by.className('tweets__table-body'))
      .element(by.tagName('tr')).count();
    return Number(tableLength);
  }

}
