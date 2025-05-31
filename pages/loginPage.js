import { expect } from "@playwright/test";
import fs from "fs";

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = "//input[@placeholder='Username or Email']";
    this.passwordField = "//input[@placeholder='Password']";
    this.loginButton = "//input[@value='Login']";
    this.txtCreateAccount = "//a[normalize-space()='Create an account']";
  }

  async gotoLoginPgae() {
    await this.page.goto("http://localhost:3000/login");
  }

  async fillUsername(username) {
    await this.page.locator(this.usernameField).fill(username);
  }

  async fillPassword(password) {
    await this.page.locator(this.passwordField).fill(password);
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
    await this.page.locator(this.loginButton).click();
  }

  async clickCreateAccount() {
    await this.page.locator(this.txtCreateAccount).click();
  }

  async loginPass() {
    const element = await this.page.locator(this.loginButton);
    await expect(element).toBeHidden({ timeout: 2000 });
  }

  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  readDataFromJSON(fileName) {
    try {
      const rawData = fs.readFileSync(fileName);
      return JSON.parse(rawData);
    } catch (err) {
      return [];
    }
  }
}

module.exports = LoginPage;
