class PaymentPage {
    constructor(page) {
        this.page = page;
        this.countryInput = page.locator("[placeholder*='Country']");
        this.submitButton = page.locator(".action__submit");
    }       
    async selectCountry(countryName) {
        await this.countryInput.pressSequentially(countryName, { delay: 200 });
        const dropdown = this.page.locator('.ta-results');
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator('button').count();      
        for(let i=0;i<optionsCount;i++) {
            const text = await dropdown.locator('button').nth(i).textContent();
            if(text.trim() == countryName) {
                await dropdown.locator('button').nth(i).click();
                break;
            }
        }
    }
    async submitOrder() {
        await this.page.waitForTimeout(2000);
        await this.submitButton.waitFor();
        await this.submitButton.click();
        await this.page.waitForLoadState('networkidle');
    }

}
module.exports = { PaymentPage };