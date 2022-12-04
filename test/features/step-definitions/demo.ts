import { Given, When, Then} from "@wdio/cucumber-framework";
import chai from "chai";

Given(/^Go to google page$/, async function () {
    await browser.url("https://www.google.com")
    await browser.pause(5000)
})

When(/^Search with (.*)$/, async function (searchItem) {
    console.log(`>> searchItem: ${searchItem}`)
    let searchEle = await $(`input[name='q']`)
    await searchEle.setValue(searchItem)
    await browser.keys("Enter")
})

Then(/^Click on the first search result$/, async function () {
    let firstSearchEle = await $(`<h3>`)
    firstSearchEle.click()
})

Then(/^Url shoul be match (.*)$/, async function (expectedUrl) {
    console.log(`>> expectedUrl: ${expectedUrl}`)
    let actualUrl = await browser.getUrl();
    chai.expect(actualUrl).to.equal(expectedUrl)
})