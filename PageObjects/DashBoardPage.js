//import { expect } from '@playwright/test';
const assert = require('assert'); // nodj assert alternate to above expect

class DashBoardPage{
    constructor(page){
        this.page=page;
        this.products = page.locator('.card-body');  
        this.productsText = page.locator('.card-body b');  
        this.cart = page.locator('[routerlink*=cart]');
    }

    async searchProductAndAddToCart(productName){
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

    async searchProductAndAddToCartOptimized(productName) {
        assert.strictEqual(await this.page.title(), "Let's Shop");
        await this.products.first().waitFor();
        // Use Playwright's locator filter to find the product card directly
        const productCard = this.products.filter({ has: this.productsText.filter({ hasText: productName }) });
        // Wait for the product card to be visible
        await productCard.first().waitFor();
        // Click the 'Add To Cart' button inside the product card
        await productCard.first().locator("button:has-text('Add To Cart')").click();
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
       // expect(bool).toBeTruthy();
        assert.strictEqual(bool,true);
    }

}
module.exports =   {DashBoardPage};