async function login(page, signInButton, email, password) {
  const isEnabled = await page.locator(signInButton).isEnabled();
  console.log("Linked Job page is ready. Now to input credentials");
  if (isEnabled) {
    try {
      await page.fill('xpath=//input[@id="session_key"]', email);
      await page.fill('xpath=//input[@id="session_password"]', password);

      // Click the login button
      await page.click(`xpath=${signInButton}`);
      console.log("Sign in button clicked\n");
    } catch (error) {
      console.error(`Login failed: ${error.message}`);
    }
  }
}

module.exports = { login };
