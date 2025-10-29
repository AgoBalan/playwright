const {test,expect,request} = require('@playwright/test');

//We have provison to customize the test object of playwright
const {customTest} = require('../utils/test-base');
const {LoginPage} = require('../PageObjects/LoginPage');
const {DashBoardPage} = require('../PageObjects/DashBoardPage');
const {CartPage} = require('../PageObjects/CartPage');
const {PaymentPage} = require('../PageObjects/PaymentPage');
const {ConfirmationPage} = require('../PageObjects/ConfirmationPage');
const {OrderHistoryPage} = require('../PageObjects/OrderHistoryPage');
const {PageObjectManager} = require('../PageObjectManager/PageObjectManager');
//COnvert json to string using stringyfy and then parse it back to object, to avoid reference issues
const dataSet = JSON.parse(JSON.stringify(require('../data/PlaceOrderData')));  

//dataset is an array, run this test case for each array index,Data Driven Testing!!!
for (const dataset of dataSet) {
  test.only(`POM Based test case for ${dataset.productName} `, async function({page}) {
    let orderId;
    //Creating the object of PageObjectManager
    const pageObjectManager = new PageObjectManager(page);

    
    //**********Using POM model for login****************** */
    const loginPage = pageObjectManager.getLoginPage();
    await loginPage.goto(dataset.url);
    await loginPage.validLogin(dataset.email,dataset.password);
    //************************************************************************************* */
    //validation
    const dashBoardPage = pageObjectManager.getDashBoardPage();
    await dashBoardPage.searchProductAndAddToCart(dataset.productName);
    await dashBoardPage.goToCartPage();
    await dashBoardPage.checkProductLoadedInCart(dataset.productName);
    
    const cartPage = pageObjectManager.getCartPage();
    await cartPage.proceedToCheckout();

    const paymentPage = pageObjectManager.getPaymentPage();
    await paymentPage.selectCountry(dataset.country);
    await paymentPage.submitOrder();

    const confirmationPage = pageObjectManager.getConfirmationPage();
    await confirmationPage.verifyConfirmationMessage();
    orderId = await confirmationPage.getOrderId();
    await confirmationPage.goToOrdersPage();

    const orderHistoryPage = pageObjectManager.getOrderHistoryPage();
    await orderHistoryPage.findOrderAndViewDetails(orderId);

    });
}


