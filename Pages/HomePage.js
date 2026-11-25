const config = require('../config');

class HomePage {
    constructor(page) {
        this.page = page;
    }

    async init() {
        await this.page.goto(config.coinbaseDomain);
        return this;
    }
}

module.exports = { HomePage };
