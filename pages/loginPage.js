import { expect } from "@playwright/test";
import * as CF from "./common";

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = "//input[@placeholder='Username or Email']";
    this.passwordField = "//input[@placeholder='Password']";
    this.loginButton = "//input[@value='Login']";
    this.txtCreateAccount = "//a[normalize-space()='Create an account']";
  }

  async gotoLoginPage() {
    await this.page.goto("http://localhost:3000/login");
  }

  async fillUsername(username) {
    await CF.fillInput(this.page, this.usernameField, username);
  }

  async fillPassword(password) {
    await CF.fillInput(this.page, this.passwordField, password);
  }

  async verifyErrorMessage(expectedMessage) {
    this.page.once("dialog", async (dialog) => {
      const message = dialog.message();
      console.log("Nội dung alert:", message);
      expect(message).toContain(expectedMessage);
      await dialog.accept();
    });
  }

  async clickLoginButton() {
    await CF.clickElement(this.page, this.loginButton);
  }

  async clickCreateAccount() {
    await CF.clickElement(this.page, this.txtCreateAccount);
  }

  async loginPass() {
    await expect(this.page.locator(`xpath=${this.loginButton}`)).toBeHidden({
      timeout: 2000,
    });
  }

  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async readDataFromJSON(fileName) {
    return await CF.readJsonFile(fileName);
  }
}

export default LoginPage;
