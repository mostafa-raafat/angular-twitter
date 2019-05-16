import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';

import { ProductPage } from '../pages/productsPage';

let page: ProductPage;

Before(() => {
  page = new ProductPage();
});

Given(/^I am on the product page & search box is empty$/, async () => {
  await page.navigateTo();
});

When(/^I type ([\w|\s]+) on search input$/, async (text) => {
    await page.search(text);
});

Then(/^I should see ID = (\d+) displayed$/, async count => {
  expect(await page.rowTitle()).to.equal(count);
});
