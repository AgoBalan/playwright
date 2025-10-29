const {test,expect,request} = require('@playwright/test');
const {LoginPage} = require('../PageObjects/LoginPage');
const {DashBoardPage} = require('../PageObjects/DashBoardPage');
const {CartPage} = require('../PageObjects/CartPage');
const {PaymentPage} = require('../PageObjects/PaymentPage');
const {ConfirmationPage} = require('../PageObjects/ConfirmationPage');
const {OrderHistoryPage} = require('../PageObjects/OrderHistoryPage');
const {PageObjectManager} = require('../PageObjectManager/PageObjectManager');


test.only('POM Based test case', async function({page}) {
   const productName = 'ZARA COAT 3';
   const email = "jehovabalan@gmail.com";
   const password = "12345678Q.A!f";
   let orderId;
   //Creating the object of PageObjectManager
   const pageObjectManager = new PageObjectManager(page);
   
   //**********Using POM model for login****************** */
   const loginPage = pageObjectManager.getLoginPage();
   await loginPage.goto('https://rahulshettyacademy.com/client/');
   await loginPage.validLogin(email,password);
    //************************************************************************************* */
    //validation
    const dashBoardPage = pageObjectManager.getDashBoardPage();
    await dashBoardPage.searchProductAndAddToCart("ZARA COAT 3");
    await dashBoardPage.goToCartPage();
    await dashBoardPage.checkProductLoadedInCart("ZARA COAT 3");
    
    const cartPage = pageObjectManager.getCartPage();
    await cartPage.proceedToCheckout();

    const paymentPage = pageObjectManager.getPaymentPage();
    await paymentPage.selectCountry("India");
    await paymentPage.submitOrder();

    const confirmationPage = pageObjectManager.getConfirmationPage();
    await confirmationPage.verifyConfirmationMessage();
    orderId = await confirmationPage.getOrderId();
    await confirmationPage.goToOrdersPage();

    const orderHistoryPage = pageObjectManager.getOrderHistoryPage();
    await orderHistoryPage.findOrderAndViewDetails(orderId);

});


