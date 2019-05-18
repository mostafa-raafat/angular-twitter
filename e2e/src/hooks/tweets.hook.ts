import { After, BeforeAll, AfterAll, setDefaultTimeout, Status } from 'cucumber';
import * as path from 'path';
import { browser } from 'protractor';
import { Reporter } from '../support/reporter';

const config = require('../../protractor.conf.js');

setDefaultTimeout(5000);

BeforeAll({ timeout: 100 * 1000 }, async () => {
  const jsonReports = path.join(process.cwd(), '/e2e/src/reports/json');
  Reporter.createReporterFile(jsonReports);
});

After(async function(scenario) {
  if (scenario.result.status === Status.FAILED) {
    // screenShot is a base-64 encoded PNG
    const screenShot = await browser.takeScreenshot();
    this.attach(screenShot, 'image/png');
  }
});

AfterAll({ timeout: 100 * 1000 }, async () => {
  await browser.quit();
});
