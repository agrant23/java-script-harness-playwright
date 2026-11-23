const { test, expect } = require('@playwright/test');
const config = require('../config');
const { SigninPage } = require('../Pages/SigninPage');

const TEST_TIMEOUT = 240000;
const WAIT_2FA_ENTRY = 120000;
const WAIT_HOME_TIMEOUT = 30000;
const AUTH_CHALLENGE_URL_REGEX = /login\.coinbase\.com\/signin|oauth_challenge/;

test.describe('Coinbase Login Automation Suite', () => {

    test('Assert login flow reaches 2-Factor Authentication', async ({ page }) => {
        test.setTimeout(TEST_TIMEOUT);
        
        const signInPage = new SigninPage(page);
        await signInPage.init(true);
        
        await signInPage.login();
        await expect(page).toHaveURL(AUTH_CHALLENGE_URL_REGEX);
    });

    test('Verify login completion after 2FA entry', async ({ page }) => {
        test.setTimeout(TEST_TIMEOUT);
        
        const signInPage = new SigninPage(page);
        await signInPage.init(true);
        
        await signInPage.login();
        await expect(page).toHaveURL(AUTH_CHALLENGE_URL_REGEX);
        
        await page.waitForTimeout(WAIT_2FA_ENTRY);

        await expect(page).toHaveURL(config.homepageDomain + '/home', { timeout: WAIT_HOME_TIMEOUT });
        await expect(page).toHaveTitle(/Home|Coinbase/);
    });

});
