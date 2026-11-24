const { test, expect } = require('@playwright/test');
const { SigninPage } = require('../Pages/SigninPage');

const TEST_TIMEOUT = 240000;
const WAIT_2FA_TIMEOUT = 120000;
const WAIT_HOME_TIMEOUT = 30000;
const AUTH_CHALLENGE_URL_REGEX = /login\.coinbase\.com\/signin|oauth_challenge/;
const HOME_URL_REGEX = /.*coinbase\.com\/(home|dashboard)(\/|\?|$).*/;

test.describe('Coinbase Login Automation Suite', () => {

    test('Confirm that logging in reached 2-Factor Authentication', async ({ page }) => {
        test.setTimeout(TEST_TIMEOUT);
        
        const signInPage = new SigninPage(page);
        await signInPage.init(true);
        
        await signInPage.login();
        await expect(page).toHaveURL(AUTH_CHALLENGE_URL_REGEX);
    });

    test('Confirm that logging in succeeds', async ({ page }) => {
        test.setTimeout(TEST_TIMEOUT);
        
        const signInPage = new SigninPage(page);
        await signInPage.init(true);
        
        await signInPage.login();
        await expect(page).toHaveURL(AUTH_CHALLENGE_URL_REGEX);
        
        await page.waitForURL(HOME_URL_REGEX, { timeout: WAIT_2FA_TIMEOUT });
        await expect(page).toHaveTitle(/Home|Coinbase/, { timeout: WAIT_HOME_TIMEOUT });
    });

});
