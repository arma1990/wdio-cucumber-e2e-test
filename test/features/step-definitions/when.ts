import { When } from "@wdio/cucumber-framework";
import chai from "chai";
import logger from "../../helper/logger.js";

When(/^Search with (.*)$/, async function (searchItem) {
  console.log(`>> searchItem: ${searchItem}`);
  let searchEle = await $(`textarea[name='q']`);
  await searchEle.setValue(searchItem);
  await browser.keys("Enter");
});

When (/^Inventory page should list (.*)$/, async function (numOfProducts) {
  logger.info(`${this.testid}: checking the number of products...`)
    /** 1. Check the Number of Products */
  console.log(`The appid: ${this.appid}`);
  if (!numOfProducts) throw Error(`Invalid product count provided: ${numOfProducts}`);

  /** 2. Verify the number of products */
  let actualProductEleArr = await $$(`.inventory_item_name`);
  let actualProductCount = actualProductEleArr.length;
  chai.expect(actualProductCount).to.equal(parseInt(numOfProducts)); 
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

  // let ele = $(`//form[@id='checkboxes']/input[1]`)
  // let isChecked = await ele.isSelected()
  // if (!isChecked) {
  //   await ele.click()
  //   chai.expect(isChecked).to.be.true
  // }

  /**
   * Web Table:
   * What are going to cover:
   * 1. Check number of rows and columns
   * 2. Get whole table data
   * 3. Get single row (based on the condition)
   * 4. Get single column
   * 5. Get single cell vale (based on another cell)
   */

  /** 1. Check number of rows and columns */
  // let rowCount = await $$(`//table[@id='table1']/tbody/tr`).length;
  // chai.expect(rowCount).to.equal(4);
  // console.log(`Table consists rows: ${rowCount}`);

  // let colCount = await $$(`//table[@id='table1']/thead/tr/th`).length;
  // chai.expect(colCount).to.equal(6);
  // console.log(`Table consists rows: ${colCount}`);

  /** 2. Get whole table data */
  // let tableDataArr = []
  // for (let i = 0; i < rowCount; i++) {
  //   let tableObj = {
  //     lastName: "",
  //     firstName: "",
  //     email: "",
  //     due: "",
  //     webSite: ""
  //   }
  //   for (let j = 0; j < colCount; j++) {
  //     let cellValue = await $(`//table[@id='table1']/tbody/tr[${i + 1}]/td[${j + 1}]`).getText()
  //     if (j===0) tableObj.lastName = cellValue
  //     if (j===1) tableObj.firstName = cellValue
  //     if (j===2) tableObj.email = cellValue
  //     if (j===3) tableObj.due = cellValue
  //     if (j===4) tableObj.webSite = cellValue
  //   }
  //   tableDataArr.push(tableObj)
  // }
  // console.log(`The Table Data: ${JSON.stringify(tableDataArr)}`)

  /** 3. Get single row (based on the condition) */
  // let tableDataArr = []
  // for (let i = 0; i < rowCount; i++) {
  //   let tableObj = {
  //     lastName: "",
  //     firstName: "",
  //     email: "",
  //     due: "",
  //     webSite: ""
  //   }
  //   for (let j = 0; j < colCount; j++) {
  //     let cellValue = await $(`//table[@id='table1']/tbody/tr[${i + 1}]/td[${j + 1}]`).getText()
  //     let firstName = await $(`//table[@id='table1']/tbody/tr[${i + 1}]/td[2]`).getText()
  //     if (firstName === "Jason") {
  //       if (j===0) tableObj.lastName = cellValue
  //       if (j===1) tableObj.firstName = cellValue
  //       if (j===2) tableObj.email = cellValue
  //       if (j===3) tableObj.due = cellValue
  //       if (j===4) tableObj.webSite = cellValue
  //     }
  //   }

  //   if (tableObj.firstName) {
  //     tableDataArr.push(tableObj)
  //   }
  // }
  // console.log(`The Table Data: ${JSON.stringify(tableDataArr)}`)

  /** 4. Get single column */
  // let tableDataArr = []
  // for (let i = 0; i < rowCount; i++) {
  //   let dueCellValue = await $(`//table[@id='table1']/tbody/tr[${i + 1}]/td[4]`).getText()
  //   tableDataArr.push(dueCellValue)
  // }
  // console.log(`Single Cell Value: ${tableDataArr}`)

  /** 5. Get single cell vale (based on another cell) */
  // let tableDataArr = [];
  // for (let i = 0; i < rowCount; i++) {
  //   let due = await $(`//table[@id='table1']/tbody/tr[${i + 1}]/td[4]`).getText();
  //   let firstName = await $(`//table[@id='table1']/tbody/tr[${i + 1}]/td[2]`).getText();
  //   if (+due.replace("$", "") > 50) {
  //     let data = firstName + ":" + due
  //     tableDataArr.push(data);
  //   }
  // }
  // console.log(`Single Cell Value: ${JSON.stringify(tableDataArr)}`);

  /** Scrolling
   *  
   *  VISIBLE PORTION
   *  Windows Object
   *  1. ScrollBy
   *  Y -> [-]window.innerHeight
   */

  /** 
   * INVISIBLE PORTION
   * Windows Object
   * 1. scrollTo
   * Y -> document.body.scrollTop[scrollHeight] 
   */

});

