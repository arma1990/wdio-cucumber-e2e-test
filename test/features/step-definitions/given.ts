import { Given } from "@wdio/cucumber-framework";
import chai from "chai";
import logger from "../../helper/logger.js";

Given (/^Go to google page$/, async function () {
  await browser.url("https://www.google.com");
  await browser.pause(5000);
});

Given(/^A webpage is opened$/, async function () {
  await browser.url("/tables");
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  await browser.maximizeWindow();
});

Given(/^As (a|an) (.*) user I login to inventory web page$/, async function (prefixTxt, userType, dataTable) {
  logger.info(`${this.testid}: started to login sauce demo app...`)

  // Get testid
  console.log(`TestID: ${this.testid}`);

  // Getting values from dataTable
  let dt = dataTable.hashes()
  /** 1. Go to Inventory App and launch browser*/
  // @ts-ignore
  await browser.url(browser.options.sauceDemoURL);

  /** 2. Login to Inventory App */
  await $(`#user-name`).setValue(dt[0].Username);
  await $(`#password`).setValue(process.env.TEST_STD_PASSWORD);
  await $(`#login-button`).click();

  this.appid = "ABC123"
});
