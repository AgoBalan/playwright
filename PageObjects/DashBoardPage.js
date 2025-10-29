import { expect } from '@playwright/test';

class DashBoardPage{
    constructor(page){
        this.page=page;
        this.products = page.locator('.card-body');  
        this.productsText = page.locator('.card-body b');  
        this.cart = page.locator('[routerlink*=cart]');
    }

    async searchProductAndAddToCart(productName){
        await expect(this.page).toHaveTitle("Let's Shop");
        await this.products.first().waitFor();
        const count =  await this.productsText.count(); 
        for (let i = 0; i < count; ++i) {
            const text = await this.productsText.nth(i).textContent();
            console.log("From loop ",text);
            console.log("param ",productName);
            if (text.trim() === productName) {
                //add to cart
                await this.products.nth(i).locator("//button[contains(.,'Add To Cart')]").click();
                break;
            }
        }
    }
    async goToCartPage(){
        await this.cart.click();
        await this.page.waitForLoadState('networkidle');
    }

    async checkProductLoadedInCart(productName){
        const product = "h3:has-text('" + productName +"')";
        console.log("Product locator is ",product);
        await this.page.locator(product).first().waitFor();
        const bool = await this.page.locator(product).isVisible(); //locator provided by playwright
        expect(bool).toBeTruthy();
    }

}
module.exports =   {DashBoardPage};