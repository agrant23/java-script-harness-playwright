const config = require('../config');
const creds = require('../secure/creds');
const { ReactiveMenu } = require('../elements');

const EMAIL_FIELD_LOCATOR = 'input[type="email"]';
const PASS_FIELD_LOCATOR = '#current-password';
const CONTINUE_EMAIL_LOCATOR = '#two-factor [data-testid="email-submit-button"]';
const CONTINUE_PASS_LOCATOR = '[data-testid="password-submit-button"]';
const SIGNIN_BUTTON_LOCATOR = '#signin_button';
const STAY_SIGNED_IN_LOCATOR = '#stay_signed_in';
const ERROR_ALERT_LOCATOR = '.alert';

class SigninPage {
    constructor(page) {
        this.page = page;

        this.homeLink = this.page.locator('.Header__Logo');
        this.productsMenu = new ReactiveMenu(this.page, 'text=Products');
        this.helpLink = this.page.locator('text=Help');
        this.pricesLink = this.page.locator('text=Prices');
        this.signInLink = this.page.locator('text=Sign In');
        this.signUpBtn = this.page.locator('text=Sign Up');

        this.emailField = this.page.locator(EMAIL_FIELD_LOCATOR);
        this.continueEmailBtn = this.page.locator(CONTINUE_EMAIL_LOCATOR);
        this.passField = this.page.locator(PASS_FIELD_LOCATOR);
        this.continuePassBtn = this.page.locator(CONTINUE_PASS_LOCATOR);
        this.staySignedInBox = this.page.locator(STAY_SIGNED_IN_LOCATOR);
        this.signInBtn = this.page.locator(SIGNIN_BUTTON_LOCATOR);
        this.forgotPassLink = this.page.locator('text=Forgot password?');
        this.noAccountLink = this.page.locator("text=Don't have an account?");
        this.privacyPolicyLink = this.page.locator('text=Privacy Policy');
        this.twoFactorLink = this.page.locator('text=Have an issue with 2-factor authentication?');

        this.signInErrorAlert = this.page.locator(ERROR_ALERT_LOCATOR);
    }

    async init(spawn = false) {
        if (spawn) {
            await this.page.goto(config.coinbaseDomain + '/signin');
        }
        return this;
    }

    async login() {
        await this.emailField.fill(creds.cbUser);
        await this.continueEmailBtn.click();
        await this.passField.fill(creds.cbPass);
        await this.continuePassBtn.click();
    }
}

module.exports = { SigninPage };
