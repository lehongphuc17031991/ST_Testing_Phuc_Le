async function checkVisibilityAndValidatePhoneNumber(page, fieldName) {
  console.log("\nChecking Mobile Phone Number field...");
  const xpathField = `//div[@id="artdeco-modal-outlet"]//div//label[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), "${fieldName}")]`;
  const mobilePhoneNumberTitle = await page.locator(xpathField);
  const mobilePhoneNumberInput = await page.locator(
    `${xpathField}/following-sibling::input`
  );

  try {
    await mobilePhoneNumberTitle.waitFor({
      state: "visible",
      timeout: 10000,
    });
    await mobilePhoneNumberInput.waitFor({
      state: "visible",
      timeout: 10000,
    });
    console.log(
      "Mobile Phone Number is visible. Now to validate Required field enforcement..."
    );
  } catch (error) {
    console.error(
      "\nError checking visibility of Mobile Phone Number field: ",
      error
    );
  }

  try {
    await mobilePhoneNumberInput.fill("1");
    await mobilePhoneNumberInput.fill(""); // Remove to get the error message
    // Check the error message visibility
    const mobilePhoneNumberError = await page.locator(
      `${xpathField}/ancestor::div[2]/following-sibling::div//span`
    );
    await mobilePhoneNumberError.waitFor({
      state: "visible",
      timeout: 10000,
    });
    const mobilePhoneNumberrawText = await mobilePhoneNumberError.textContent();
    const mobilePhoneNumberErrorText = mobilePhoneNumberrawText
      ? mobilePhoneNumberrawText.trim().toLowerCase()
      : "";
    if (mobilePhoneNumberErrorText.includes("enter a valid")) {
      console.log(
        `Mobile Phone Number field is required with error message when not selecting value: ${mobilePhoneNumberErrorText}`
      );
    }

    await mobilePhoneNumberInput.fill("123456789"); // Fill with a dummy number
  } catch (error) {
    console.error("Error validating Mobile Phone Number field: ", error);
  }
}

module.exports = { checkVisibilityAndValidatePhoneNumber };
