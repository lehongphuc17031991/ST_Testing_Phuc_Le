async function searchJob(page, searchJobText) {
  const searchJobBar = page.locator(
    `xpath=//input[contains(@id, "jobs-search-box-keyword-id")]`
  );

  // Wait for the search job bar to be visible (max 30s)
  await searchJobBar.waitFor({ state: "visible", timeout: 30000 });
  const isEnabled = await searchJobBar.isEnabled();

  if (isEnabled) {
    try {
      await searchJobBar.fill(searchJobText);
      console.log(`\nEntered "${searchJobText}" to search job bar`);
      await searchJobBar.press("Enter");
    } catch (error) {
      console.error(`Search job failed: ${error.message}`);
    }
  } else {
    console.log("Search job bar is not enabled at this time");
  }
}

module.exports = { searchJob };
