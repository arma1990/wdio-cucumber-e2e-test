import { Given, When, Then } from "@wdio/cucumber-framework";
import chai from "chai";

Given(/^Go to google page$/, async function () {
  await browser.url("https://www.google.com");
  await browser.pause(5000);
});

When(/^Search with (.*)$/, async function (searchItem) {
  console.log(`>> searchItem: ${searchItem}`);
  let searchEle = await $(`input[name='q']`);
  await searchEle.setValue(searchItem);
  await browser.keys("Enter");
});

Then(/^Click on the first search result$/, async function () {
  let firstSearchEle = await $(`<h3>`);
  firstSearchEle.click();
});

Then(/^Url shoul be match (.*)$/, async function (expectedUrl) {
  console.log(`>> expectedUrl: ${expectedUrl}`);
  let actualUrl = await browser.getUrl();
  chai.expect(actualUrl).to.equal(expectedUrl);
});

/**
 * Web Interactions
 */
Given(/^A webpage is opened$/, async function () {
  await browser.url("/checkboxes");
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  await browser.maximizeWindow();
});

When(/^Perform web interactions$/, async function () {
  /**
   * 1. Input Box
   *    Actions:
   *    1. Type into input box
   *    2. Clear the field and type or just add value
   *    3. Click and type
   *    4. Slow Typing
   */

  //   let num = 12345;
  //   let strNum = num.toString();
  //   let ele = await $(`[type=number]`);
  //   await ele.click();

  //   for (let i = 0; i < strNum.length; i++) {
  //     let ch = strNum.charAt(i);
  //     await browser.pause(1000);
  //     await browser.keys(ch);
  //   }

  /**
   * 2. Dropdown
   *    Actions:
   *    1. Assert default option is selected
   *    2. Select by attribute, text, index
   *    3. Get a list of options
   */

  //   // 1. Assert default option is selected
  //   let ele = await $(`select option[selected='selected']`);
  //   let val = await ele.getText();
  //   chai.expect(val).to.equal("Please select an option");

  //   // 2. Select by attribute, text, index
  //   let dropdownEle = await $(`#dropdown`);
  //   await dropdownEle.selectByAttribute("value", "1"); // By attribute
  //   await dropdownEle.selectByVisibleText("Option 2"); // By text
  //   await dropdownEle.selectByIndex(1); // By index

  //   // 3. Get a list of options
  //   let valArr = [];
  //   let eleArr = await $$(`select option`);
  //   for (let i = 0; i < eleArr.length; i++) {
  //     let ele = eleArr[i];
  //     let val = await ele.getText();
  //     valArr.push(val);
  //   }
  //   console.log(`The Options are: ${valArr}`);

  /**
   * 3. Checkbox
   *    Actions:
   *    1. Select an option
   *    2. Unselect an option (if selected)
   *    3. Assert if option is selected
   *    4. Select all options
   */

  let ele = $(`//form[@id='checkboxes']/input[1]`)
  let isChecked = await ele.isSelected()
  if (!isChecked) {
    await ele.click()
    chai.expect(isChecked).to.be.true
  }

  await browser.pause(5000);
  browser.debug();
});
