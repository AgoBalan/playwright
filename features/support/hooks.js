const {PageObjectManager} = require('../../PageObjectManager/PageObjectManager');
const { chromium } = require('playwright');
const {Before,After} = require("@cucumber/cucumber");

// Synchronous
Before( async function () {
    this.browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    //World object to share data across steps, should start with this.
    this.pageObjectManager = new PageObjectManager(page);
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});