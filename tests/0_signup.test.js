import { test } from "@playwright/test";
import SignupPage from "../pages/signupPage";
import LoginPage from "../pages/loginPage";

test.describe.configure({ mode: "serial" });

test.describe("Signup Tests", () => {
  let signupPage;
  const timestamp = Date.now();

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    await signupPage.gotoLoginPgae();
  });

  test("0_signup fail", async ({ page }) => {
    await signupPage.signup("validUser", "test@gmail.com", "123456", "123678");
    // await page.pause();

    await signupPage.verifyErrorMessage("Mật khẩu xác nhận không khớp.");
  });

  test("1_SignUp successfully and login", async ({ page }) => {
    const username = `user${timestamp}`;
    const email = `user${timestamp}@gmail.com`;
    const password = "123456";
    await signupPage.signup(username, email, password, password);

    // đăng nhập sau khi đăng kí thành công
    const loginPage = new LoginPage(page);
    await loginPage.login(username, password);
    await loginPage.loginPass();
    await signupPage.writeDataToJSON(
      {
        username: username,
        password: password,
        isValid: true,
      },
      "./data/loginData.json"
    );
    // await page.pause();
  });
});
