import { Then } from "@wdio/cucumber-framework";
import chai from "chai";
import logger from "../../helper/logger.js";

Then(/^Click on the first search result$/, async function () {
  let firstSearchEle = await $(`<h3>`);
  firstSearchEle.click();
});

Then(/^Url should be match (.*)$/, async function (expectedUrl) {
  console.log(`>> expectedUrl: ${expectedUrl}`);
  let actualUrl = await browser.getUrl();
  chai.expect(actualUrl).to.equal(expectedUrl);
});

Then(/^Validate all products have valid price$/, async function () {
  logger.info(`${this.testid}: getting the price of products...`)
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
