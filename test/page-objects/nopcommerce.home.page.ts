import Page from "./page.js";
import reporter from "../helper/reporter.js";

class NopCommerceHomePage extends Page {
  constructor() {
    super();
  }

  /** Creating Page Objects for Login Page */
  get firstNameInputBox() { return $(`#SearchFirstName`) }
  get lastNameInputBox() { return $(`#SearchLastName`) }
  get searchButton() { return $(`#search-customers`) }
  get noResultsMessage() {return $(`td=No data available in table`)}

  async searchNameAndConfirm(testid: string, firstname: string, lastname: string): Promise<boolean> {
    if (!firstname || !lastname) {
      throw Error(`Invalid firstname: ${firstname}, lastname: ${lastname} to search`)
    }
    let nameNotExist = false
    firstname = firstname.trim()
    lastname = lastname.trim()
    reporter.addStep(testid, "info", `Searching user: ${firstname} ${lastname}`)
    try {
      await this.typeInto(await this.firstNameInputBox, firstname)
      await this.typeInto(await this.lastNameInputBox, lastname)
      await this.click(await this.searchButton)
      browser.pause(1000)
      let isNotDispalyed = await this.noResultsMessage.isDisplayed()
      if (isNotDispalyed) nameNotExist = true
    }
    catch (err) {
      throw `Failed searching given firstname: ${firstname}, and lastname: ${lastname} on customer page, ${err}`
    }
    return nameNotExist
  }
}

export default new NopCommerceHomePage();
