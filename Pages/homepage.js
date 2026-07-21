const config = require('../config');
const { Link, ReactiveMenu, Button } = require('../elements');

class HomePage {
    constructor(page, spawn = true) {
        this.page = page;
        
        this.home_link_loc = "xpath=//a[@title='Home']";
        this.prices_link_loc = "xpath=//a[@title='Prices']";
        this.products_menu_loc = "xpath=//button[contains(text(),'Products')]";
        this.company_menu_loc = "xpath=//button[contains(text(),'Company')]";
        this.earn_crypto_link_loc = "xpath=//a[@title='Earn crypto']";
        this.sign_in_link_loc = "xpath=//a[@title='Sign in']";
        this.header_get_started_button_loc = "xpath=//a[.='Get started']";
    }

    async init(spawn = true) {
        if (spawn) {
            await this.page.goto(config.homepage_domain);
        }
        this.build_elements();
        return this;
    }

    build_elements() {
        this.home_link = new Link(this.page, this.home_link_loc);
        this.prices_link = new Link(this.page, this.prices_link_loc);
        this.products_menu = new ReactiveMenu(this.page, this.products_menu_loc);
        this.company_menu = new ReactiveMenu(this.page, this.company_menu_loc);
        this.earn_crypto_link = new Link(this.page, this.earn_crypto_link_loc);
        this.sign_in_link = new Link(this.page, this.sign_in_link_loc);
        this.header_get_started_button = new Button(this.page, this.header_get_started_button_loc);
    }
}

module.exports = { HomePage };
