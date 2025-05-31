import fs from "fs/promises";
import path from "path";

// Element actions
export async function clickElement(page, xpath, timeout = 10000) {
  await page.locator(`xpath=${xpath}`).waitFor({ state: "visible", timeout });
  await page.locator(`xpath=${xpath}`).click();
}

export async function fillInput(page, xpath, value, timeout = 10000) {
  await page.locator(`xpath=${xpath}`).waitFor({ state: "visible", timeout });
  await page.locator(`xpath=${xpath}`).fill(value);
}

export async function clearInput(page, xpath, timeout = 10000) {
  await page.locator(`xpath=${xpath}`).waitFor({ state: "visible", timeout });
  await page.locator(`xpath=${xpath}`).fill("");
}

export async function selectDropdownOption(
  page,
  xpath,
  value,
  timeout = 10000
) {
  await page.locator(`xpath=${xpath}`).waitFor({ state: "visible", timeout });
  await page.locator(`xpath=${xpath}`).selectOption(value);
}

// Element assertions
export async function verifyElementVisible(page, xpath, timeout = 10000) {
  await page.locator(`xpath=${xpath}`).waitFor({ state: "visible", timeout });
}

export async function verifyElementNotVisible(page, xpath, timeout = 10000) {
  await page.locator(`xpath=${xpath}`).waitFor({ state: "detached", timeout });
}

export async function verifyElementContainsText(
  page,
  xpath,
  text,
  timeout = 10000
) {
  await page.locator(`xpath=${xpath}`).waitFor({ state: "visible", timeout });
  await expect(page.locator(`xpath=${xpath}`)).toContainText(text);
}

export async function verifyElementNotContainsText(
  page,
  xpath,
  text,
  timeout = 10000
) {
  await page.locator(`xpath=${xpath}`).waitFor({ state: "visible", timeout });
  await expect(page.locator(`xpath=${xpath}`)).not.toContainText(text);
}

// File handling
export async function readJsonFile(fileName) {
  const absolutePath = path.join("testdata", fileName);
  const content = await fs.readFile(absolutePath, "utf-8");
  return JSON.parse(content);
}

export async function writeJsonFile(fileName, data) {
  const absolutePath = path.join("testdata", fileName);
  await fs.writeFile(absolutePath, JSON.stringify(data, null, 2), "utf-8");
}
