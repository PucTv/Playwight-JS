const { chromium } = require("playwright");

async function setupBrowser() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  return { browser, page };
}

module.exports = { setupBrowser };
