class OrderHistoryPage{
    constructor(page){
        this.page = page;
        this.orderTable = page.locator("tbody tr");
        this.orderDetailsButton = "button:has-text('View')";
    }
    async findOrderAndViewDetails(orderId){
        await this.page.waitForLoadState('networkidle');
        const rows = await this.orderTable;
        const count = await rows.count();
        for(let i=0; i < count; ++i){
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if(orderId.includes(rowOrderId)){
                await rows.nth(i).locator(this.orderDetailsButton).click();
                break;
            }
        }
    }
}
module.exports = {OrderHistoryPage};