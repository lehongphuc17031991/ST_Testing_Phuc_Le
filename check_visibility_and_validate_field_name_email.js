async function checkVisibilityAndValidateFieldNameEmail(page, fieldName) {
  const xpathField = `//div[@id="artdeco-modal-outlet"]//div//span[1][contains(text(), "${fieldName}")]`;
  const title = await page.locator(xpathField);
  const input = await page.locator(
    `${xpathField}/ancestor::label/following-sibling::select`
  );
  // Check visibility
  try {
    console.log(`\nChecking ${fieldName} field...`);
    await title.waitFor({ state: "visible", timeout: 10000 });

    await input.waitFor({ state: "visible", timeout: 10000 });
    console.log(
      `${fieldName} is visible. Now to validate Required field enforcement... `
    );
  } catch (error) {
    console.error(
      `\nError checking visibility of ${fieldName} address field: `,
      error
    );
  }

  // Validate enforcement of required field
  try {
    // Get the current value of the select input
    const currentValue = await input.inputValue();
    console.log("Current select value:", currentValue);

    // Switch to the "Select an option" value - the default state
    await input.selectOption({
      value: "Select an option",
    });

    // Check the error message visibility
    const error = await page.locator(
      `${xpathField}/ancestor::label/following-sibling::div//span`
    );
    await error.waitFor({ state: "visible", timeout: 10000 });
    const rawText = await error.textContent();
    const errorText = rawText ? rawText.trim().toLowerCase() : "";
    if (errorText.includes("enter a valid")) {
      console.log(
        `Email address field is required with error message when not selecting value: ${errorText}`
      );
    }

    // Now to switch back to the original value
    await input.selectOption({
      value: currentValue,
    });
    console.log("Switched back to the original value:", currentValue);
  } catch (error) {
    console.error("Error validating Email address field: ", error);
  }
}

module.exports = { checkVisibilityAndValidateFieldNameEmail };
