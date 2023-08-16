import { config as baseConfig } from "../wdio.conf.js"
export const config = Object.assign(baseConfig, {
    // All test env specific key value pairs
    environment: "TEST",
    sauceDemoURL: "https://www.saucedemo.com"
})