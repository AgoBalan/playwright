const {test,expect,request} = require('@playwright/test');

let newContext;

test.beforeAll( async( {browser} )=> {
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto('https://rahulshettyacademy.com/client/');
   await page.locator('#userEmail').fill('jehovabalan@gmail.com');
   await page.locator('#userPassword').fill('12345678Q.A!f');
   await page.locator('#login').click();
   await page.waitForLoadState('networkidle');
   await context.storageState({path: 'state.json'});  // storing all localstorage,sessionstorage and cookies in json file
    newContext = await browser.newContext({storageState: 'state.json'}); // using the stored state to new context
});

test.only('Here no page is passed as parameter', async function() {
   const  page = await newContext.newPage();
     await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    //************************************************************************************* */
});

// test('TC2 -Here no page is passed as parameter', async function() {
//    const  page = await newContext.newPage();
//      await page.goto('https://rahulshettyacademy.com/client/');
//     await page.locator("button[routerlink*='myorders']").click();
//     await page.locator("tbody").waitFor();
//     const rows = await page.locator("tbody tr");
//     //************************************************************************************* */
// });

test.only('TC3 -Here no page is passed as parameter', async function() {
    //To debug API an UI
    // GOto package.json, Inside script create test property
      });