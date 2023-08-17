import { Given, When, Then } from "@wdio/cucumber-framework";
import reporter from "../../helper/reporter.js";
import loginPage from "../../page-objects/sauce.login.page.js";
import logger from "../../helper/logger.js";

Given(/^As (a|an) (.*) user I login to inventory web page$/,async function (prefixTxt, userType, dataTable) {
    try {
      reporter.addStep(this.testid, "info", "Login to sauce demo");
      let dt = dataTable.hashes();
      // @ts-ignore
      await loginPage.navigateTo(browser.options.sauceDemoURL);
      await loginPage.loginToSauceApp(
        this.testid,
        process.env.TEST_STD_USERNAME,
        process.env.TEST_STD_PASSWORD
      );
    } catch (err) {
      err.message = `Failed at login step, ${err.message}`;
      throw err;
    }
  });

When(/^Inventory page should list (.*)$/, async function (numOfProducts) {
  logger.info(`${this.testid}: checking the number of products...`);
  /** 1. Check the Number of Products */
  console.log(`The appid: ${this.appid}`);
  if (!numOfProducts)
    throw Error(`Invalid product count provided: ${numOfProducts}`);

  /** 2. Verify the number of products */
  let actualProductEleArr = await $$(`.inventory_item_name`);
  let actualProductCount = actualProductEleArr.length;
  chai.expect(actualProductCount).to.equal(parseInt(numOfProducts));
});

Then(/^Validate all products have valid price$/, async function () {
  logger.info(`${this.testid}: getting the price of products...`);
  /** 1. Get Price List of Products */
  let priceListEle = await $$(`.inventory_item_price`);
  let priceListStrArr = [];
  for (let i = 0; i < priceListEle.length; i++) {
    let price = await priceListEle[i].getText();
    priceListStrArr.push(price);
  }
  console.log(`>> Price List in String: ${priceListStrArr}`);

  /** 2. Convert price from String to Number */
  let priceListNumArr = priceListStrArr.map((ele) => +ele.replace("$", ""));
  console.log(`>> Price List in Number: ${priceListNumArr}`);

  /** 3. Assert if any value is <=0 */
  let invalidPriceArr = priceListNumArr.filter((ele) => ele <= 0);
  chai.expect(invalidPriceArr.length).to.equal(0);
});
