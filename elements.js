class Element {
    constructor(page, locatorString) {
        this.page = page;
        this.locatorString = locatorString;
    }

    locator() {
        return this.page.locator(this.locatorString);
    }

    async exists() {
        return await this.locator().isVisible();
    }
}

class Button extends Element {
    async click() {
        await this.locator().click();
    }
}

class Link extends Element {
    async click() {
        await this.locator().click();
    }
}

class Field extends Element {
    async click() {
        await this.locator().click();
    }

    async input(keys) {
        await this.locator().fill(keys);
    }

    async clear() {
        await this.locator().clear();
    }
}

class ReactiveMenu extends Element {
    constructor(page, locatorString, wrapperLocator = null) {
        super(page, locatorString);
        this.wrapperLoc = wrapperLocator;
    }

    async open() {
        await this.locator().click();
    }

    async select(itemSelector) {
        await this.locator().click();

        const container = this.wrapperLoc ? this.page.locator(this.wrapperLoc) : this.page;

        if (typeof itemSelector === 'number') {
            await container.locator('xpath=.//a').nth(itemSelector - 1).click();
        } else {
            await container.locator(`text=${itemSelector}`).click();
        }
    }
}

module.exports = { Element, Button, Link, Field, ReactiveMenu };
