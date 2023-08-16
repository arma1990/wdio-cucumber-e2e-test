import { setWorldConstructor } from "@wdio/cucumber-framework";
import chai from "chai";

class CustomWorld {
    appid: string
    testid: string

    constructor() {
        this.appid = "",
        this.testid = ""
    }
}

setWorldConstructor(CustomWorld)