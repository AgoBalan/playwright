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

test('Page context', async function({page}) {
   
    /** we jsust going to create empty browser context and page, this can be done by passing 2nd parameter page to test method
    // assign browser to context variable const or let is data type
    const context = await browser.newContext(); // Craeting browser instance same as incognito mode
    // open url
    const page = await context.newPage(); // creating new tab
    ***/
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
    //css-> preferred, not xpath
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('learning1');
    await page.locator('#signInBtn').click();
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    password.fill('learning');
    await signIn.click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    const cards = page.locator('.card-body');
    const cardCount = await cards.first().textContent();
    console.log(cardCount);
    const cardCount2 = await cards.nth(1).textContent();
    console.log(cardCount2);
    //allTextContents() is array of text contents of all the elements
    //it will not wait until page is laoded explicetly, to be aware of it
     const All = await cards.allTextContents();
    console.log(All);

});

test('Dynamic Wait for API calsls to compelte network idle', async function({page}) {
   
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
    //css-> preferred, not xpath
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    await page.locator('#username').fill('rahulshettyacademy');
    password.fill('learning');
    await signIn.click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    const cards = page.locator('.card-body b');

    // if it is one element ,you can wait using
    //  await cards.waitFor();

    // if it is multi element ,you can wait until last using
    await cards.first().waitFor(); // dont use last(), it will keep on waiitng, coz it doesnt know wich is last, it keeps on changing
   
    //wait until behind the api call complete
    //  await page.waitForLoadState('networkidle');
   
    //allTextContents() is array of text contents of all the elements
    //it will not wait until page is laoded explicetly, to be aware of it
     const All = await cards.allTextContents();
  
    console.log(All);

});

test.only('UI controls-drpdwn,radiobtn,chkbx', async function({page}) {
   
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
    //css-> preferred, not xpath
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    const dropDown = page.locator('select.form-control');
    const radioButtons = page.locator('.radiotextsty');

   
    await page.locator('#username').fill('rahulshettyacademy');
    password.fill('learning');
    dropDown.selectOption('consult');
     await expect(radioButtons).toHaveCount(2);
    await radioButtons.nth(2).click();
    // OR
    // await radioButtons.last().click();
     //handling alert
    await page.locator('#okayBtn').click();

    await expect(radioButtons.last()).toBeChecked();
    await expect(radioButtons.first()).not.toBeChecked();

    await radioButtons.last().isChecked(); // return true or false
   
        page.pause();
    await page.locator('#terms').check();
     await expect(page.locator('#terms').isChecked).toBeTruthy();
    await page.locator('#terms').uncheck();
    await expect(page.locator('#terms').isChecked).toBeFalsy();
    await signIn.click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');


});