const config = require('../config');

class HomePage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto(config.coinbaseDomain);
    }
}

module.exports = { HomePage };
