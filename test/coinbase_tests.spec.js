const { test, expect } = require('@playwright/test');
const config = require('../config');
const { SigninPage } = require('../Pages/SigninPage');

const TEST_TIMEOUT = 240000;
const AUTH_CHALLENGE_URL_REGEX = /login\.coinbase\.com\/signin|oauth_challenge/;
const HOME_URL_REGEX = /.*coinbase\.com\/(home|dashboard)(\/|\?|$).*/;

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
        
        // Dynamic wait: Automatically resolves the moment Coinbase completes 2FA redirect to /home
        await page.waitForURL(HOME_URL_REGEX, { timeout: 120000 });
        await expect(page).toHaveTitle(/Home|Coinbase/, { timeout: 30000 });
    });

});
