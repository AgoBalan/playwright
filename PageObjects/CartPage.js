class CartPage {
    
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator('button:has-text("Checkout")');
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { CartPage };
