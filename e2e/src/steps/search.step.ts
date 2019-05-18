import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';

import { TweetsPage } from '../pages/tweetsPage';
import { browser } from 'protractor';

let page: TweetsPage;

Before(() => {
  page = new TweetsPage();
});

Given('I am on the hashtag tab', async () => {
  await page.navigateTo();
});

When('I type {string} in the search input', async (text) => {
  await page.TypeSearch(text);
});

Then('I should see {string} in hashtag column', async (result) => {
  console.log('rows', await page.getFirstRow());
  expect(await page.getFirstRow()).to.equal(result);
});

// Given('I am on the user tab', async () => {
//   await page.navigateTo();
// });

// When('I type {string} in the search box', async (text) => {
//   await page.TypeSearch(text);
// });

// Then('I should see {int} as a search result', async (result) => {
//   expect(await page.getTweetsRow()).to.equal(result);
// });