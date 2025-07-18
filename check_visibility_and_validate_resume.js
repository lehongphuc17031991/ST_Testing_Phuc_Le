async function checkVisibilityAndValidateResume(page, fieldName) {
  const resumeUpload = `//input[contains(@id, "${fieldName}")]//preceding-sibling::label/span`;
  const errorMessageResume = await page.locator(
    `${resumeUpload}//ancestor::label[1]/following-sibling::div//span`
  );
  const nextButton = await page.locator(`//footer//button/span[text()="Next"]`);

  // ################# Check visibility of the "Upload resume" #################
  try {
    const uploadResumeButton = await page.locator(resumeUpload);
    let visible;
    try {
      await uploadResumeButton.waitFor({ state: "visible", timeout: 5000 });

      // This is for times when the upload resume button is already visible in the 1st place along with email, phone etc
      isVisible = await uploadResumeButton.isVisible(); // true
      console.log(
        "Upload resume is visible. Now to validate Required field enforcement..."
      );
    } catch (error) {
      // This is for times when the upload resume button is NOT visible in the 1st place, but in 2nd place instead
      isVisible = await uploadResumeButton.isVisible(); // false

      await nextButton.click();
      await uploadResumeButton.waitFor({ state: "visible", timeout: 5000 });

      isVisible = await uploadResumeButton.isVisible(); // true
      console.log(
        "Upload resume is visible. Now to validate Required field enforcement..."
      );
    }
  } catch (error) {
    console.error(
      "\nError checking visibility of Upload resume field: ",
      error
    );
  }

  await nextButton.click();
  console.log(
    "\nClicked Next button to get error message for not uploading resume..."
  );

  try {
    await errorMessageResume.waitFor({
      state: "visible",
      timeout: 10000,
    });

    const rawText = await errorMessageResume.textContent();
    const resumeErrorText = rawText ? rawText.trim().toLowerCase() : "";
    if (resumeErrorText.includes("resume is required")) {
      console.log(
        `Upload Resume field is required with error message when not selecting value: ${resumeErrorText}`
      );
    }
  } catch (error) {
    console.error("Error validating Upload Resume field: ", error);
  }
}

module.exports = { checkVisibilityAndValidateResume };
