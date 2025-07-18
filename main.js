const { chromium } = require("playwright");
const {
  URLLink,
  email,
  password,
  signInButton,
  searchJobText,
  debugImage,
} = require("./resouces");
const { login } = require("./login");
const { searchJob } = require("./search_job");
const { find1stEasyApply } = require("./find1steasyapply");
const {
  checkPresenceOfRequiredFields,
} = require("./check_presence_of_required_fields");

// Get browser name from terminal argument, default to 'chrome'
const browserName = (process.argv[2] || "chrome").toLowerCase();

async function launchBrowser() {
  let channel;
  if (browserName === "chrome") channel = "chrome";
  else if (browserName === "edge") channel = "msedge";
  return await chromium.launch({
    headless: false,
    args: ["--start-maximized"],
    channel,
  });
}

// Load page completely in a load state
async function PageLoadCompletely(NameOfPage, page) {
  await page.waitForLoadState("load");
  console.log(`${NameOfPage} is fully loaded`);
  await page.waitForTimeout(2000);
}

(async () => {
  const browser = await launchBrowser();

  const context = await browser.newContext({
    viewport: null,
  });

  const page = await context.newPage();
  await page.setDefaultTimeout(180000); // Set default timeout to 180 seconds

  try {
    // Login to LinkedIn
    await page.goto(`${URLLink}`);
    await PageLoadCompletely("Linked Job page", page);
    await login(page, signInButton, email, password);
    console.log("Login successfully");
    await PageLoadCompletely("Linked Home page", page);
    await page.waitForTimeout(2000); // Wait for 2 seconds after login

    // Search for jobs
    await searchJob(page, searchJobText);
    console.log(`Searched ${searchJobText} successfully`);
    await PageLoadCompletely("Search Result page", page);
    await page.waitForTimeout(2000); // Wait for 2 seconds after searched

    // Click on the first Easy Apply job
    await find1stEasyApply(page);

    // Check presence of required fields
    console.log(
      "\n\nChecking presence of required fields: Email, Phone Code, Phone Number, Upload Resume\n\n"
    );
    await checkPresenceOfRequiredFields(page);
  } catch (error) {
    console.log("taking screenshot of failure:");
    await page.screenshot({
      path: `${debugImage}\\debug.png`,
    });
    console.error(`Error: ${error.message}`);
    throw error; // Rethrow the error to ensure the script fails
  } finally {
    await browser.close();
    console.log("Close browser");
  }
})();
