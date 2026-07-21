const config = require('../config');
const creds = require('../secure/creds');
const { Element, Button, Link, Field, ReactiveMenu } = require('../elements');

class SigninPage {
    constructor(page) {
        this.page = page;

        this.home_link_loc = '.Header__Logo';
        this.products_menu_loc = 'text=Products';
        this.help_link_loc = 'text=Help';
        this.prices_link_loc = 'text=Prices';
        this.sign_in_link_loc = 'text=Sign In';
        this.sign_up_button_loc = 'text=Sign Up';

        this.email_field_loc = 'cds-textinput-label-:r2:';   //new id cds-textinput-label-:r2:   old id cds-textinput-label-\\:r7\\:
        this.continue_email_button_loc = "xpath=//*[@id='two-factor']//button[@data-testid='email-submit-button']";
        this.pass_field_loc = '#current-password';
        this.continue_pass_button_loc = "xpath=//*[@data-testid='password-submit-button']";
        this.stay_signed_in_checkbox_loc = '#stay_signed_in';
        this.sign_in_button_loc = '#signin_button';
        this.forgot_password_link_loc = 'text=Forgot password?';
        this.no_account_link_loc = "text=Don't have an account?";
        this.privacy_policy_link_loc = 'text=Privacy Policy';
        this.two_factor_link_loc = 'text=Have an issue with 2-factor authentication?';

        this.sign_in_error_alert_loc = '.alert';
    }

    async init(spawn = false, bypass_auth = true) {
        if (spawn) {
            await this.page.goto(config.coinbase_domain + '/signin');
        }
        this.build_elements();
        return this;
    }

    build_elements() {
        this.home_link = new Link(this.page, this.home_link_loc);
        this.products_menu = new ReactiveMenu(this.page, this.products_menu_loc);
        this.help_link = new Link(this.page, this.help_link_loc);
        this.prices_link = new Link(this.page, this.prices_link_loc);
        this.sign_in_link = new Link(this.page, this.sign_in_link_loc);
        this.sign_up_button = new Button(this.page, this.sign_up_button_loc);

        this.email_field = new Field(this.page, this.email_field_loc);
        this.continue_email_button = new Button(this.page, this.continue_email_button_loc);
        this.pass_field = new Field(this.page, this.pass_field_loc);
        this.continue_pass_button = new Button(this.page, this.continue_pass_button_loc);
        this.stay_signed_in_checkbox = '';
        this.sign_in_button = new Button(this.page, this.sign_in_button_loc);
        this.forgot_password_link = '';
        this.no_account_link = '';
        this.privacy_policy_link = '';
        this.two_factor_link = '';

        this.sign_in_error_alert = new Element(this.page, this.sign_in_error_alert_loc);
    }

    async login(bypass_auth = false) {
        await this.email_field.input(creds.CBuser);
        await this.continue_email_button.click();
        await this.pass_field.input(creds.CBpass);
        await this.continue_pass_button.click();
    }
}

module.exports = { SigninPage };
