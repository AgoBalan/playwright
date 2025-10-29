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


test.only('Screenshot and visiual Testing', async function({page}) {
   const productName = 'ZARA COAT 3';
   const email = "jehovabalan@gmail.com";
   
   await page.addInitScript(value => {window.localStorage.setItem('token', value);}, token);


   await page.goto('https://rahulshettyacademy.com/client/');

    //2 waits
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor()
    //************************************************************************************* */
    //Scrrenshot
    await page.screenshot({path:'screenshot.png',fullPage:true});
    expect(await page.screenshot()).toMatchSnapshot('FullScreen.png');  //image comparision!!!!
    await expect(page).toHaveTitle("Let's Shop");
    //locator level screnshot
    await page.locator('[routerlink*="cart"]').screenshot({path:'cartImage.png'});

});
