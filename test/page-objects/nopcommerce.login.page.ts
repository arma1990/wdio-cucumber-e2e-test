import Page from "./page.js";
import reporter from "../helper/reporter.js";

class NopCommerceLoginPage extends Page {
  constructor() {
    super();
  }

  /** Creating Page Objects for Login Page */
  get usernameTextbox() { return $(`#Email`) }
  get passwordTextbox() { return $(`#Password`) }
  get loginButton() { return $(`button=Log in`) }

  async loginTonopcommerceWeb(testid: string, url: string, username: string, password: string) {
    if (!url || !username || !password) {
      throw Error(`Given data, url: ${url}, username: ${username} or password is not valid`)
    }
    url = url.trim()
    username = username.trim()
    try {
      // @ts-ignore
      reporter.addStep(testid, "info", `Login to: ${url} with ${username}`)
      await this.navigateTo(url)
      await this.typeInto(await this.usernameTextbox, username)
      await this.typeInto(await this.passwordTextbox, password)
      await this.click(await this.loginButton)
      reporter.addStep(testid, "info", `Login to: ${url} with ${username} is successful`)
    } catch (err) {
      err.message = `Failed login to nopcommerce web: ${url}, with username: ${username}`
      throw err
    }
  }
}

export default new NopCommerceLoginPage();
