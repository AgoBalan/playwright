class LoginPage {

    constructor(page) {
        //intialize all locators inside the constructor, page to be accessed in all methods
        this.page = page; 
        this.loginButton = page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.passwordField = page.locator("#userPassword"); 
     }

     async validLogin(Username, Password) { 
       await this.userName.fill(Username);
       await this.passwordField.fill(Password);
       await this.loginButton.click();
     }  

     async goto(url) {
         await this.page.goto(url);
         await this.page.waitForLoadState('networkidle');
     }

}
module.exports = { LoginPage };      
