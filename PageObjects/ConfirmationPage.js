import { expect } from "@playwright/test";

class ConfirmationPage {
    constructor(page) {
        this.page = page;
        this.confirmationMessage = page.locator(".hero-primary");
        this.orderIdLocator = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myorders = page.locator("label[routerlink*='myorders']");
    }   
    async verifyConfirmationMessage() {
          const message = await this.confirmationMessage.textContent();
         expect(message.trim()).toBe("Thankyou for the order.");
    }   
    async getOrderId() {
        const orderId = await this.orderIdLocator.textContent();
        console.log("Order ID is ", orderId);
        return orderId;
    }

    async goToOrdersPage() {
        await this.myorders.click();
        await this.page.waitForLoadState('networkidle');
    }

}
module.exports = { ConfirmationPage };