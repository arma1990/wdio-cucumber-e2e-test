import { Given, When, Then} from "@wdio/cucumber-framework";
import reporter from "../../helper/reporter.js";
import chai from "chai";
import constants from "../../../data/constants.json" assert { type: "json" };
import apiHelper from "../../helper/api-helper.js";
import fs from "fs"
import nopcommerceLoginPage from "../../page-objects/nopcommerce.login.page.js";
import nopcommerceHomePage from "../../page-objects/nopcommerce.home.page.js";

/** 
 * Get list of users from reqres api
 * Decription:
 * 1. Get payload data
 * 2. Make get call by using API helper
 * 3. Store the results
 * */

Given(/^Get list of (.*) from reqres.in$/, async function (endpointRef) {
    try {
        if (!endpointRef) throw Error(`Given endpoint ref: ${endpointRef} is not valid`)
        
        /** 1. Get payload data */
        reporter.addStep(this.testid, "info", `Getting the payload data for endpoint: ${endpointRef}`)
        let endpoint = ""
        if (endpointRef.trim().toUpperCase() === "USERS") {
            endpoint = constants.REQRES.GET_USERS
        }
        if (!endpoint) throw Error(`Error getting endpoint: ${endpoint} from the constants.json`)
    
        /** 2. Make get call by using API helper */
        let res
        let testid = this.testid
        await browser.call(async function () {
            // @ts-ignore
            res = await apiHelper.GET(testid, browser.options.reqresBaseUrl, endpoint, "", constants.REQRES.QUERY_PARAM)
        })
        // @ts-ignore
        if (res.status !== 200) chai.expect.fail(`Failed getting users from: ${browser.options.reqresBaseUrl}/${endpoint}`)
        reporter.addStep(this.testid, "debug", `API response received, data: ${JSON.stringify(res.body)}`)
    
        /** 3. Store the results */
        let data = JSON.stringify(res.body, undefined, 4)
        let filename = `${process.cwd()}/data/api-response/users.json`
        fs.writeFileSync(filename, data)
        reporter.addStep(this.testid, "info", `API response from ${endpoint} stored in json file`)
    } catch (err) {
        err.message = `${this.testid}: failed at getting API users from reqres, ${err.message}`
        throw err
    }
});

/** Login to Nopcommerce Website
 *  Description:
 *  1. Locate the web elements of login page of website
 *  2. Enter the username, password and click on login button
 */

When(/^An as (.*) user login to nopcommerce site$/, async function (user){
    if (!user) throw Error(`Given user: ${user} is not valid`)
    user = user.trim().toUpperCase()
    try {
        reporter.addStep(this.testid, "info", `Login to nopcommerce site...`)
        await nopcommerceLoginPage.loginTonopcommerceWeb(
            this.testid,
            // @ts-ignore
            browser.options.nopCommerceBaseURL, 
            process.env[`TEST_NOP_${user}_USERNAME`],
            process.env[`TEST_NOP_${user}_PASSWORD`])
    } catch (err) {
        err.message = `${this.testid}: Failed at nopcommerce login step, ${err.message}`
        throw err
    }
});

/** Verify if given user exists in customers list
 *  Description:
 *  1. Navigate and select Customer options from left menu
 *  2. Read API response from /data folder
 *  3. For each user object in API response
 *     3.1. Enter first name and last name
 *     3.2. Search and confirm if user exists
 *  4. In case user does not exit write it to error file 
 */
Then(/^Verify if all users exist in customers list$/,async function () {
    try {
        /** 1. Navigate and select Customer options from left menu */
        browser.pause(5000)
        browser.debug()
        // @ts-ignore
        await browser.url(`${browser.options.nopCommerceBaseURL}/Admin/Customer/List`)
        reporter.addStep(this.testid, "info", `Navigated to customer list screen...`)
    
        /** 2. Read API response from /data folder */
        let filename = `${process.cwd()}/data/api-response/users.json`
        let data = fs.readFileSync(filename, "utf8")
        let dataObj = JSON.parse(data)
    
        /** 3. For each user object in API response
         *     3.1. Enter first name and last name
         *     3.2. Search and confirm if user exists 
         * */
        let numOfObj = dataObj.data.length
        let custNotFoundArr = []
        for (let i = 0; i < numOfObj; i++) {
            let custNotFoundObj = {}
            let firstname = dataObj.data[i].first_name
            let lastname = dataObj.data[i].last_name
            let custNotFound = await nopcommerceHomePage.searchNameAndConfirm(this.testid, firstname, lastname)
            if (custNotFound) {
                custNotFoundObj["first_name"] = firstname
                custNotFoundObj["last_name"] = lastname
                custNotFoundArr.push(custNotFoundObj)
            }
        }
    
        /** 4. In case user does not exit write it to error file */
        if (custNotFoundArr.length > 1) {
            let filePath = `${process.cwd()}/results/cust_not_found.json`
            let data = JSON.stringify(custNotFoundArr, undefined, 4)
            fs.writeFileSync(filePath, data)
        }
    } catch (err) {
        err.message = `${this.testid}: Failed at checking users in nopcommerce site, ${err.message}`
        throw err
    }
});


