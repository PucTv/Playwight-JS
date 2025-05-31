import { expect } from "@playwright/test";
import fs from "fs";

class SignupPage {
  constructor(page) {
    this.page = page;
    this.usernameField = "//input[@placeholder='Username']";
    this.emailField = "//input[@placeholder='Email Address']";
    this.passwordField = "//input[@placeholder='Create Password']";
    this.confirmpasswordField = "//input[@placeholder='Confirm Password']";
    this.signupButton = "//input[@value='Sign Up']";
  }
  async gotoLoginPgae() {
    await this.page.goto("http://localhost:3000/register");
  }

  async fillUsername(username) {
    await this.page.locator(this.usernameField).fill(username);
  }

  async fillPassword(password) {
    await this.page.locator(this.passwordField).fill(password);
  }

  async confirmPassword(password) {
    await this.page.locator(this.confirmpasswordField).fill(password);
  }

  async fillEmail(email) {
    await this.page.locator(this.emailField).fill(email);
  }

  async clickSignupButton() {
    await this.page.locator(this.signupButton).click();
  }

  async verifyErrorMessage(expectedMessage) {
    this.page.once("dialog", async (dialog) => {
      const message = dialog.message();
      console.log("Nội dung alert:", message);
      expect(message).toContain(expectedMessage);
      await dialog.accept();
    });
  }

  async signup(username, email, password, confirmPassword) {
    await this.fillUsername(username);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.confirmPassword(confirmPassword);
    await this.clickSignupButton();
  }

  writeDataToJSON(data, fileName) {
    try {
      const existingData = JSON.parse(
        fs.readFileSync(fileName, "utf-8") || "[]"
      );
      existingData.push(data);
      fs.writeFileSync(
        fileName,
        JSON.stringify(existingData, null, 2),
        "utf-8"
      );
    } catch (err) {
      fs.writeFileSync(fileName, JSON.stringify([data], null, 2), "utf-8");
    }
  }
}

export default SignupPage;
