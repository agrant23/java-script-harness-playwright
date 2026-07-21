const { test, expect, chromium } = require('@playwright/test');
const config = require('../config');
const { SigninPage } = require('../Pages/signin');

test.describe('Login', () => {
    let browser;
    let context;
    let page;
    let sign_in_page;

    test.beforeEach(async () => {
        browser = await chromium.launch({
            args: ['--log-level=3']
        });
        context = await browser.newContext();
        page = await context.newPage();
        
        sign_in_page = new SigninPage(page);
        await sign_in_page.init(true);
    });

    test('Confirm that logging in succeeds', async () => {
        test.setTimeout(150000); 
        
        // Just use sign_in_page directly - no 'new' keyword
        await sign_in_page.login(false);
        
        await page.waitForTimeout(120000);

        await expect(page).toHaveURL(config.coinbase_domain + '/home');
        await expect(page).toHaveTitle('Home · Coinbase');
        
        expect('user is').toBe('logged in');
    });

    test.afterEach(async () => {
        await browser.close();
    });
});