const {test,expect} = require('@playwright/test');
// require('@playwright/test');  is module or package
// test is a method of the package

//
test('anonomious function', async ()=>{});

//test method knows browser fixture,Hence no need to declare or import browser,
// just pass as parameter, enclosed in {}, 
// so that test udnererstand it is a fixture from playwright else it ill be mere string
test('Browser Context', async function({browser}) {

    // assign browser to context variable const or let is data type
    const context = await browser.newContext(); // Craeting browser instance same as incognito mode
    // open url
    const page = await context.newPage(); // creating new tab
    await page.goto('https://www.google.com/')
});

test.only('Page context', async function({page}) {
   
    /** we jsust going to create empty browser context and page, this can be done by passing 2nd parameter page to test method
    // assign browser to context variable const or let is data type
    const context = await browser.newContext(); // Craeting browser instance same as incognito mode
    // open url
    const page = await context.newPage(); // creating new tab
    ***/
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
});