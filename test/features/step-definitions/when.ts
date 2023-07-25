import { When } from "@wdio/cucumber-framework";
import chai from "chai";

When(/^Inventory page should list (.*)$/, async function (numOfProducts) {
  /** 1. Check the Number of Products */  
  if (!numOfProducts) throw Error(`Invalid product count provided: ${numOfProducts}`);

  /** 2. Verify the number of products */
  let actualProductEleArr = await $$(`.inventory_item_name`);
  let actualProductCount = actualProductEleArr.length;
  chai.expect(actualProductCount).to.equal(parseInt(numOfProducts)); 
});
