Coinbase QA Automation Suite (JavaScript / Playwright)

A test automation framework for the Coinbase web app, built with JavaScript and Playwright using the Page Object Model. 
The elements.js wraps Playwright locators in small reusable classes (Button, Link, Field, ReactiveMenu).

It's a port of my Python/Selenium framework: https://github.com/agrant23/python_harness-h

My background is Python and C# with Selenium. 
I wrote this to show I can move to a different language and toolset quickly. I ported the original in about 6 hours with no prior professional JavaScript or Playwright experience.


Running the tests:

The login tests run against the live Coinbase site, so you need your own account.

1. Create a Coinbase account with your own email, password, and phone number.
2. Copy secure/creds.template.js to secure/creds.js and fill in cbUser and cbPass.
3. Run the tests in a visible Chrome window:
   npx playwright test coinbase_tests.spec.js
4. Keep your phone nearby. Coinbase will send you a 2 Factor authentication code. 
   The test waits about two minutes for you to enter it. You may also need to complete an image puzzle.


Acknowledgment of this project:
I used LLMs to port my Python Selenium repository to JavaScript Playwright. As I used agentic AI technology to review, debug, and optimize the code, I improved my OpenClaw agent's ability to consistently generate code in the same style, modularity, and format. This test suite currently passes. I reviewed the code and understand it fully. I'm confident I can quickly create tests in this language and framework.