const {PageObjectManager} = require('../../PageObjectManager/PageObjectManager');
const { chromium } = require('playwright');
const {Before,After,AfterStep} = require("@cucumber/cucumber");

// Synchronous
Before( async function () {
    this.browser = await chromium.launch({ headless: false });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
    //World object to share data across steps, should start with this.
    this.pageObjectManager = new PageObjectManager(this.page);
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

AfterStep( async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
 // if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: `screenshots/CucumberSshot/screenshot-failed-step.png` });
  //}
});