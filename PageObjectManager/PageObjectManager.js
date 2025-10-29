class PageObjectManager{
    constructor(page){
        this.page = page;   
        this.loginPage = null;
        this.dashBoardPage = null;
        this.cartPage = null;
        this.paymentPage = null;
        this.confirmationPage = null;
        this.orderHistoryPage = null;
    }
    getLoginPage(){
        if(this.loginPage == null){
            const {LoginPage} = require('../PageObjects/LoginPage');
            this.loginPage = new LoginPage(this.page);
        }
        return this.loginPage;
    }
    getDashBoardPage(){
        if(this.dashBoardPage == null){
            const {DashBoardPage} = require('../PageObjects/DashBoardPage');
            this.dashBoardPage = new DashBoardPage(this.page);
        }
        return this.dashBoardPage;
    }
    getCartPage(){
        if(this.cartPage == null){
            const {CartPage} = require('../PageObjects/CartPage');
            this.cartPage = new CartPage(this.page);
        }
        return this.cartPage;
    }
    getPaymentPage(){
        if(this.paymentPage == null){
            const {PaymentPage} = require('../PageObjects/PaymentPage');
            this.paymentPage = new PaymentPage(this.page);
        }
        return this.paymentPage;
    }
    getConfirmationPage(){
        if(this.confirmationPage == null){
            const {ConfirmationPage} = require('../PageObjects/ConfirmationPage');
            this.confirmationPage = new ConfirmationPage(this.page);
        }
        return this.confirmationPage;
    }
    getOrderHistoryPage(){
        if(this.orderHistoryPage == null){
            const {OrderHistoryPage} = require('../PageObjects/OrderHistoryPage');
            this.orderHistoryPage = new OrderHistoryPage(this.page);
        }
        return this.orderHistoryPage;
    }
}
module.exports = {PageObjectManager};