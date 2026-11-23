const DEFAULT_TIMEOUT = 10000;

class Element {
    constructor(page, locatorString) {
        this.page = page;
        this.locatorString = locatorString;
    }

    locator() {
        return this.page.locator(this.locatorString);
    }

    async element() {
        const loc = this.locator();
        await loc.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
        return loc;
    }

    async exists() {
        try {
            await this.page.waitForSelector(this.locatorString, { state: 'visible', timeout: DEFAULT_TIMEOUT });
            return true;
        } catch {
            return false;
        }
    }
}

class Button extends Element {
    constructor(page, locatorString, waitFor = null) {
        super(page, locatorString);
        this.waitLocator = waitFor;
    }

    async click() {
        const loc = this.locator();
        await loc.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
        await loc.click();
        if (this.waitLocator) {
            await this.page.waitForSelector(this.waitLocator, { state: 'visible', timeout: DEFAULT_TIMEOUT });
        }
    }
}

class Link extends Element {
    async click() {
        const loc = this.locator();
        await loc.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
        await loc.click();
    }
}

class Field extends Element {
    async click() {
        await (await this.element()).click();
    }

    async input(keys) {
        await (await this.element()).fill(keys);
    }

    async clear() {
        await (await this.element()).clear();
    }
}

class ReactiveMenu extends Element {
    constructor(page, locatorString, wrapperLocator = null) {
        super(page, locatorString);
        this.wrapperLoc = wrapperLocator;
    }

    async wrapper() {
        await this.page.waitForSelector(this.wrapperLoc, { state: 'attached', timeout: DEFAULT_TIMEOUT });
        return this.page.locator(this.wrapperLoc);
    }

    async open() {
        await (await this.element()).click();
    }

    async select(itemSelector) {
        await (await this.element()).click();

        let item;
        if (this.wrapperLoc) {
            const wrap = await this.wrapper();
            if (typeof itemSelector === 'number') {
                item = wrap.locator('xpath=.//a').nth(itemSelector - 1);
            } else if (typeof itemSelector === 'string') {
                item = wrap.locator(`xpath=.//*[.='${itemSelector}']`);
            }
        } else {
            item = this.page.locator(`xpath=//*[.='${itemSelector}']`);
        }

        try {
            const tagName = await item.evaluate(el => el.tagName.toLowerCase());
            if (tagName !== 'a') {
                const parent = item.locator('xpath=..');
                const parentTagName = await parent.evaluate(el => el.tagName.toLowerCase());
                if (parentTagName === 'a') {
                    item = parent;
                }
            }
        } catch {
            // Fallback to direct click if tag evaluation fails
        }

        await item.click();
    }
}

module.exports = { Element, Button, Link, Field, ReactiveMenu };
