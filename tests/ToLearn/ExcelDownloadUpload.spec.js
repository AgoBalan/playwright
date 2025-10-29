const {test,expect,request} = require('@playwright/test');


test.only('@excel excel download and upload', async function({page}) {

   await page.goto('https://rahulshettyacademy.com/upload-download-test/');

    //download
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button',{name:'Download'}).click(); 
    //wait for download to complete
    await downloadPromise;   
   //upload
    const filePath = './data/download.xlsx';
    //setinputfile will work only if element has type='file'in the html attribute
    await page.locator('#fileinput').setInputFiles(filePath);
    await page.waitForTimeout(5000);
});
