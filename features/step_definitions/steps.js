const {Given, When, Then} = require("@cucumber/cucumber");



    Given('User logs into the ecommerce application {string} and {string}', {timeout:10 * 1000},async function (string, string2) {
    // Write code here that turns the phrase above into concrete actions
     //Creating the object of PageObjectManager

   

    //**********Using POM model for login****************** */
    const loginPage = this.pageObjectManager.getLoginPage();
    await loginPage.goto("https://rahulshettyacademy.com/client/");
    await loginPage.validLogin(string,string2);
    //************************************************************************************* */
    });

    When('User add item {string} to the cart', {timeout: 6*1000}, async function (string) {
    const dashBoardPage = this.pageObjectManager.getDashBoardPage();
    await dashBoardPage.searchProductAndAddToCart(string);
    await dashBoardPage.goToCartPage();
    await dashBoardPage.checkProductLoadedInCart(string);
    });

    Then('User goes to the cart page and validate the item {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
    });
