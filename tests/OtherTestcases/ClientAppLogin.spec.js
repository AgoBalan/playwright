const {test,expect,request} = require('@playwright/test');


const payload = {
  "name":"test","salary":"123","age":"23"
}

const loginPayload = { userEmail: "jehovabalan@gmail.com", userPassword: "12345678Q.A!f" };
let token;

test.beforeAll(async ()=> {
  //login into applciation and get token and set teh token to the browser context
  const ApiContext = await request.newContext();
  const response = await ApiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
     {
       data: loginPayload
     }
    );
    console.log("Response received : ", response);
    expect(response.ok()).toBeTruthy(); //200,201,204
    const jsonResponse = await response.json();
    token = jsonResponse.token;

   

});
test.afterAll(async ()=> {
    console.log("I will execute after all tests");
});

test("Dummy test", async ({page})=> {
    console.log("I am the dummy test");
});

test.only('Skip login by token from Before Class', async function({page}) {
      const productName = 'ZARA COAT 3';
      const email = "jehovabalan@gmail.com";
   
    //comment ogin and use the token from Befreo hook to pass the auth cookie into broweser lcoal storage
 // playwright can execute any java script by using
      await page.addInitScript(value => {window.localStorage.setItem('token', value);}, token);
   //   await page.addInitScript(value => {window.sessionStorage.setItem('token', value);}, token);

      await page.goto('https://rahulshettyacademy.com/client/');

   //  await page.locator('#userEmail').fill('jehovabalan@gmail.com');
   //  await page.locator('#userPassword').fill('12345678Q.A!f');
   //  await page.locator('#login').click();
    //2 waits
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor()
    //************************************************************************************* */
    //validation
    await expect(page).toHaveTitle("Let's Shop");
    page.locator('.card-body').first().waitFor();
    const products = page.locator('.card-body');    
    const count = await products.count(); 
     for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
    await page.locator('[routerlink*="cart"]').click();
    await page.locator('h3:has-text("ZARA COAT 3")').first().waitFor();
    const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible(); //locator provided by playwright
    expect(bool).toBeTruthy();
    await page.locator('text=Checkout').click();
    //await page.locator('[placeholder="Select Country"]').pressSequentially('ind'); //to simulate human typing
    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    //Here, a delay of 150 milliseconds is introduced between each key press.
    //That means it enters  i → (delay 150 ms) → enters n → (delay 150 ms) → enters d

    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();
    for(let i=0;i<optionsCount;i++) {
        const text = await dropdown.locator('button').nth(i).textContent(); 
        if(text.trim() == "India") {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    } 
       expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

        page.pause();
    

});

test('selector', async function({page}) {
      const productName = 'ZARA COAT 3';
      const email = "jehovabalan@gmail.com";
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.getByLabel("I Agree to the").click();
    page.pause();
    // await page.getByLabel("form").selectOption("Teacher");
//     await page.getByRole("button", { name: "Sign In" }).click();
     await page.locator("input").filter({hasText: 'Username'}).getByRole("button").click();
     page.pause();
  //  await page.locator('#userEmail').fill('jehovabalan@gmail.com');
   // await page.locator('#userPassword').fill('12345678Q.A!f');
   // await page.locator('#login').click();
    
})
test('Alert and hover', async function({page}) {

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.on('dialog', dialog => dialog.accept()); // on waits for eevent to occur
    page.locator('#search-field').hover();
})

test('Frames', async function({page}) {
   const frame1 = page.frameLocator('#search-field');
   frame1.locator('.input:visible').fill('hello');   // : visible-> to handle multiple same locators in frames
})

test('POSt API', async function({page}) {
     console.log("POST method call");
    const ApiContext = await request.newContext();
    const response = await ApiContext.post('https://dummy.restapiexample.com/api/v1/create',
       {
         data: payload
       }
      );
      console.log("Response received : ", response);
      expect(response.ok()).toBeTruthy(); //200,201,204
      expect(response.status).toBe(200);

      const responsejson = await response.body;
    //  const token = responsejson.textContent();
      console.log(responsejson);
})
