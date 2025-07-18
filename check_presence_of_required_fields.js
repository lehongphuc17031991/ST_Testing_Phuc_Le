const {
  checkVisibilityAndValidateFieldNameEmail,
} = require("./check_visibility_and_validate_field_name_email");
const {
  checkVisibilityAndValidatePhoneNumber,
} = require("./check_visibility_and_validate_phone_number");
const {
  checkVisibilityAndValidateResume,
} = require("./check_visibility_and_validate_resume");

async function checkPresenceOfRequiredFields(page) {
  // Check visibility and validate email
  await checkVisibilityAndValidateFieldNameEmail(page, "Email");

  // Check visibility and validate country code
  await checkVisibilityAndValidateFieldNameEmail(page, "country code");

  // Check visibility and validate phone number
  await checkVisibilityAndValidatePhoneNumber(page, "phone");

  // Check visibility and validate resume upload
  await checkVisibilityAndValidateResume(page, "resume");
}

module.exports = { checkPresenceOfRequiredFields };
