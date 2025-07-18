This is to check:
1. Login to Linked Jobs
2. Search jobs with Easy Apply
3. Click on the 1st Job with Easy Apply
4. Click Easy Apply button
5. Check visibility and enforcement of some required fields: email, country code, phone number, upload resume

Note:
1. This needs Linked account, so you need to provide email and password of Linked account. Go to resources.js and enter credentials in order to Login
2. For debugImage constant in resources.js, you need to provide the path in order to save the images of failed cases
3. To run test, cmd to the parent folder, type node main.js (main.js is the main file, contains all main flows)
4. To run on Edge, type main.js edge (or main.js chrome if running on chrome, or simply main.js to run on chrome by default)

5. I do not have (much) experience in these areas, so these may not run as expected:
    - Mobile
    - Multiple sessions
    - Multiple users
    - CI CD
    - Handle error, logging: may not be done very well on some places
6. I also have a workaround when the "upload resume" may not be in the 1st page with email, phone, but in 2nd page instead