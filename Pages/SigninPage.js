const config = require('../config');
const creds = require('../secure/creds');
const { Element, Button, Link, Field, ReactiveMenu } = require('../elements');

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
    }

    async init(spawn = false) {
        if (spawn) {
            await this.page.goto(config.coinbaseDomain + '/signin');
        }
        this.buildElements();
        return this;
    }

    buildElements() {
        this.homeLink = new Link(this.page, '.Header__Logo');
        this.productsMenu = new ReactiveMenu(this.page, 'text=Products');
        this.helpLink = new Link(this.page, 'text=Help');
        this.pricesLink = new Link(this.page, 'text=Prices');
        this.signInLink = new Link(this.page, 'text=Sign In');
        this.signUpBtn = new Button(this.page, 'text=Sign Up');

        this.emailField = new Field(this.page, EMAIL_FIELD_LOCATOR);
        this.continueEmailBtn = new Button(this.page, CONTINUE_EMAIL_LOCATOR);
        this.passField = new Field(this.page, PASS_FIELD_LOCATOR);
        this.continuePassBtn = new Button(this.page, CONTINUE_PASS_LOCATOR);
        this.staySignedInBox = new Element(this.page, STAY_SIGNED_IN_LOCATOR);
        this.signInBtn = new Button(this.page, SIGNIN_BUTTON_LOCATOR);
        this.forgotPassLink = new Link(this.page, 'text=Forgot password?');
        this.noAccountLink = new Link(this.page, "text=Don't have an account?");
        this.privacyPolicyLink = new Link(this.page, 'text=Privacy Policy');
        this.twoFactorLink = new Link(this.page, 'text=Have an issue with 2-factor authentication?');

        this.signInErrorAlert = new Element(this.page, ERROR_ALERT_LOCATOR);
    }

    async login() {
        await this.emailField.input(creds.cbUser);
        await this.continueEmailBtn.click();
        await this.passField.input(creds.cbPass);
        await this.continuePassBtn.click();
    }
}

module.exports = { SigninPage };
