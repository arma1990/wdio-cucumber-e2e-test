import { Given } from "@wdio/cucumber-framework";
import chai from "chai";

Given(/^Login to inventory web page$/, async function () {
  /** 1. Go to Inventory App and launch browser*/
  await browser.url(`https://www.saucedemo.com/`);
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });

  /** 2. Login to Inventory App */
  await $(`#user-name`).setValue(`standard_user`);
  await $(`#password`).setValue(`secret_sauce`);
  await $(`#login-button`).click();
});

/**
 * Web Interactions
 */
Given(/^A webpage is opened$/, async function () {
  await browser.url("/inputs");
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  await browser.maximizeWindow();
});
