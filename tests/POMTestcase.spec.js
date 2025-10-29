const {test,expect,request} = require('@playwright/test');
const {LoginPage} = require('../PageObjects/LoginPage');
const {DashBoardPage} = require('../PageObjects/DashBoardPage');
const {CartPage} = require('../PageObjects/CartPage');
const {PaymentPage} = require('../PageObjects/PaymentPage');
const {ConfirmationPage} = require('../PageObjects/ConfirmationPage');
const {OrderHistoryPage} = require('../PageObjects/OrderHistoryPage');


test.only('POM Based test case', async function({page}) {
   const productName = 'ZARA COAT 3';
   const email = "jehovabalan@gmail.com";
   const password = "12345678Q.A!f";
   let orderId;
   
   //**********Using POM model for login****************** */
   const loginPage = new LoginPage(page);
   await loginPage.goto('https://rahulshettyacademy.com/client/');
   await loginPage.validLogin(email,password);
    //************************************************************************************* */
    //validation
    const dashBoardPage = new DashBoardPage(page);
    await dashBoardPage.searchProductAndAddToCart("ZARA COAT 3");
    await dashBoardPage.goToCartPage();
    await dashBoardPage.checkProductLoadedInCart("ZARA COAT 3");
    
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();

    const paymentPage = new PaymentPage(page);
    await paymentPage.selectCountry("India");
    await paymentPage.submitOrder();

    const confirmationPage = new ConfirmationPage(page);
    await confirmationPage.verifyConfirmationMessage();
    orderId = await confirmationPage.getOrderId();
    await confirmationPage.goToOrdersPage();

    const orderHistoryPage = new OrderHistoryPage(page);
    await orderHistoryPage.findOrderAndViewDetails(orderId);

});


