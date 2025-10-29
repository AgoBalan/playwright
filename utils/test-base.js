const { test } = require('@playwright/test');

const customtest = test.extend({
  dataset: async ({}, use) => {
    await use(
        {
      url: "https://rahulshettyacademy.com/client/",
      name: "Agoben",
      country: "India",
      city: "Bangalore",
      creditCard: "1234 5678 9876 5432",
      month: "12",
      year: "2025",
      productName: "ZARA COAT 3",
      email: "jehovabalan@gmail.com",
      password: "12345678Q.A!f"
    });
  }
});
module.exports = { customtest };