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

When(/^Perform web interactions$/, async function() {
  /**
   * 1. Input Box
   *    Actions:
   *    1. Type into input box
   *    2. Clear the field and type or just add value
   *    3. Click and type
   *    4. Slow Typing
   */

  let num = 12345
  let strNum = num.toString()
  let ele = await $(`[type=number]`)
  await ele.click()

  for (let i = 0; i < strNum.length; i++) {
    let ch = strNum.charAt(i)
    await browser.pause(1000)
    await browser.keys(ch)
  }

  browser.debug()
})
