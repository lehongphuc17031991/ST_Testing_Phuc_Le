async function find1stEasyApply(page) {
  const easyApply = await page.locator(`//span[text()="Easy Apply"]`);
  await easyApply.first().waitFor({ state: "visible", timeout: 10000 });
  await easyApply.first().click();
  console.log("\nClicked on the first Easy Apply job");

  // Click on the Easy Apply button
  const easyApplyButton = await page.locator(
    `//div[@class="mt4"]/div[@class="display-flex"]//span[text()="Easy Apply"]`
  );
  await easyApplyButton.waitFor({ state: "visible", timeout: 10000 });
  await easyApplyButton.click();
  console.log("Clicked on the Easy Apply button");
}

module.exports = { find1stEasyApply };
