import { test } from "@playwright/test";
import LoginPage from "../pages/loginPage";

test.describe.configure({ mode: "serial" });

test.describe("Login Tests", () => {
  let loginPage;
  let testData;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    testData = loginPage.readDataFromJSON("./data/loginData.json");
    await loginPage.gotoLoginPgae();
  });

  test("0_Login fail", async ({ page }) => {
    const validUser = testData.find((user) => !user.isValid);
    console.log(validUser);

    if (!validUser) {
      throw new Error("Không tìm thấy dữ liệu hợp lệ trong tệp JSON");
    }

    await loginPage.login(validUser.username, validUser.password);
    // await page.pause();

    await loginPage.verifyErrorMessage("Đăng nhập không thành công.");
  });

  test("1_Login successfully", async ({ page }) => {
    const invalidUser = testData.find((user) => user.isValid);

    if (!invalidUser) {
      throw new Error("Không tìm thấy dữ liệu không hợp lệ trong tệp JSON");
    }

    await loginPage.login(invalidUser.username, invalidUser.password);
    // await page.pause();
    await loginPage.loginPass();
  });
});
