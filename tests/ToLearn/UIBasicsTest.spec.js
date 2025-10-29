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

test('UI controls-drpdwn,radiobtn,chkbx', async function({page}) {
   
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
    expect(await page.locator('#terms').isChecked()).toBeTruthy();
    await page.locator('#terms').uncheck();
    //Action is performed isnide expext hence await inside
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await signIn.click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');

});

test('UI controls attribute', async function({page}) {
   
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
    //css-> preferred, not xpath
    const blinking = page.locator('.blinkingText');
    //get attribute value
    await expect(blinking).toHaveAttribute('href','https://rahulshettyacademy.com/documents-request');
   
});
test.only('New tab handling & textcontent() vs inputValue()', async function({browser}) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
    //css-> preferred, not xpath
    const blinking = page.locator('.blinkingText');
    //get attribute value
    await expect(blinking).toHaveAttribute('href','https://rahulshettyacademy.com/documents-request');

    //Its a listener from context to listen for another thing to happen
    //listen for any new page to open in background
    // const page2 = context.waitForEvent('page')  // this execution in javasvript retuns Promise pending, rejected, fulfilled
   
    //Defining areay with waitforevent and clikcing, so that both can go togather.Here dont use await.
    //if so each will wait for other to complete, that is not expectatation
    // expectation is parallel.
    //Among 2 execution, only waitevent return  promise , asssig that to newpage variable

    const [newpage] = await Promise.all([
        context.waitForEvent('page'),
        blinking.click(),
    ])
    await newpage.waitForLoadState();
    console.log(await newpage.title());
    console.log(  await newpage.url());
    expect(await newpage.title()).toBe('RS Academy');
    const email = await newpage.locator('.red').textContent();
  //  console.log(email);
    const domain = email.split('@')[1].split(' ')[0];
   // console.log(domain);
    const username = page.locator('#username');
    await username.fill(domain);
  //  await page.pause();
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
    // it retuens empty, even thugh we progaramtically entered value
    // textcontent(), considet what value was when page loads
    console.log(await username.textContent());
    console.log("--------------------")
     console.log(await username.inputValue());
});
test('PlayWright Inspector', async function({browser}) {
   /// RUn any test with --debug
   //npx playwright test --debug  
      console.log("Hello World");
});
test('PlayWright record and playback', async function({browser}) {
   /// To record and playback the script
   //npx playwright codegen http://www.google.com  
   console.log("Hello World");
});