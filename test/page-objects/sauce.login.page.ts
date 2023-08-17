import Page from "./page.js";
import chai from "chai";
import reporter from "../helper/reporter.js";

class LoginPage extends Page {
  constructor() {
    super();
  }

  /** 
     * await $(`#user-name`).setValue(dt[0].Username);
  await $(`#password`).setValue(process.env.TEST_STD_PASSWORD);
  await $(`#login-button`).click();
     */

  /** Creating Page Objects for Login Page */
  get usernameTextbox() { return $(`#user-name`) }
  get passwordTextbox() { return $(`#password`) }
  get loginButton() { return $(`#login-button`) }

  /** Creating Functions and Actions */
  async enterUsername(testid: string, username: string) {
    if (!username) throw Error(`Given username: ${username} is not valid`);
    try {
      username = username.trim();
      await this.typeInto(await this.usernameTextbox, username);
      reporter.addStep(testid,"info",`Username: ${username} entered successfully`);
    } catch (err) {
      err.message = `Error entering username: ${username}, ${err.message}`;
      throw err;
    }
  }

  async enterPassword(testid: string, password: string) {
    if (!password) throw Error(`Given password is not valid`);
    try {
      password = password.trim();
      await this.typeInto(await this.passwordTextbox, password);
      reporter.addStep(testid, "info", `Password entered successfully`);
    } catch (err) {
      err.message = `Error entering password, ${err.message}`;
      throw err;
    }
  }

  async clickLoginButton(testid: string) {
    try {
      await this.click(await this.loginButton);
      reporter.addStep(testid, "info", `Login button clicked`);
    } catch (err) {
      err.message = `Error clicking login button, ${err.message}`;
      throw err;
    }
  }

  async loginToSauceApp(testid: string, username: string, password: string) {
    try {
        await this.enterUsername(testid, username)
        await this.enterPassword(testid, password)
        await this.clickLoginButton(testid)
    } catch (err) {
        throw err
    }
  }
}

export default new LoginPage();
