const { test, expect } = require('@playwright/test');
const { SigninPage } = require('../Pages/SigninPage');

const AUTH_CHALLENGE_URL_REGEX = /oauth_challenge|\/signin\/2fa|\/two-factor/;

test.describe('Coinbase Login Automation Suite', () => {

    test('Confirm that logging in reached 2-Factor Authentication', async ({ page }) => {
        const signInPage = new SigninPage(page);
        await signInPage.goto();
        
        await signInPage.login();
        await expect(page).toHaveURL(AUTH_CHALLENGE_URL_REGEX);
    });

    test('Confirm that logging in succeeds', async ({ page }) => {
        const signInPage = new SigninPage(page);
        await signInPage.goto();
        
        await signInPage.login();
        await expect(page).toHaveURL('https://www.coinbase.com/home', { timeout: 120000 });
    });

});
