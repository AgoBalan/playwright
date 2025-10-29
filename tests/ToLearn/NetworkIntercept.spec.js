const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../../utils/APIUtils');
const loginPayLoad = {userEmail:"jehovabalan@gmail.com",userPassword:"12345678Q.A!f"};
const orderPayLoad = {orders: [{country: "India", productOrderedId: "68a961459320a140fe1ca57a"}]};
 
 
let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const APiUtils = new APIUtils(apiContext,loginPayLoad);
   response =  await APiUtils.createOrder(orderPayLoad);
 
})
 
 
//create order is success
test('mock the response', async ({ page }) => {
  page.addInitScript(value => {
 
    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
 
 
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      const fakePayLoadOrders = { data: [], message: "No Orders" };
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
        {
          response,
          body, 
 
        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });
 
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
 
  console.log(await page.locator(".mt-4").textContent());
});

 
test.only('@QW Security testing mock befpre hitting server', async ({ page }) => {
 
     page.addInitScript(value => {
 
    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");

  await page.route('**/*.jpg', route => route.abort()); // we are saying dont load any css , jpg files
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
 
    //we are tracing all request made
    page.on('request', request => console.log('>>', request.method(), request.url()));
    page.on('response', response => console.log('<<', response.status(), response.url()));

    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});