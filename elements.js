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
        await loc.waitFor({ state: 'visible', timeout: 100000 });
        return loc;
    }

    async exists() {
        try {
            await this.page.waitForSelector(this.locatorString, { state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
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
        await loc.waitFor({ state: 'visible', timeout: 10000 });
        await loc.click();
        if (this.waitLocator) {
            await this.page.waitForSelector(this.waitLocator, { state: 'visible', timeout: 10000 });
        }
    }
}

class Link extends Element {
    async click() {
        const loc = this.locator();
        await loc.waitFor({ state: 'visible', timeout: 10000 });
        await loc.click();
    }
}

class Field extends Element {
    async click() {
        const loc = await this.element();
        await loc.click();
    }

    async input(keys) {
        const loc = await this.element();
        await loc.fill(keys);
    }

    async clear() {
        const loc = await this.element();
        await loc.clear();
    }
}

class ReactiveMenu extends Element {
    constructor(page, locatorString, wrapperLocator = null) {
        super(page, locatorString);
        this.wrapperLoc = wrapperLocator;
    }

    async wrapper() {
        await this.page.waitForSelector(this.wrapperLoc, { state: 'attached', timeout: 10000 });
        return this.page.locator(this.wrapperLoc);
    }

    async open() {
        const loc = await this.element();
        await loc.click();
    }

    async select(itemSelector) {
        const loc = await this.element();
        await loc.click();

        let item;
        if (this.wrapperLoc) {
            const wrap = await this.wrapper();
            if (typeof itemSelector === 'number') {
                const items = wrap.locator('xpath=.//a');
                item = items.nth(itemSelector - 1);
            } else if (typeof itemSelector === 'string') {
                item = wrap.locator(`xpath=.//*[.='${itemSelector}']`);
            }
        } else {
            item = this.page.locator(`xpath=//*[.='${itemSelector}']`);
        }

        const tagName = await item.evaluate(el => el.tagName.toLowerCase());
        if (tagName !== 'a') {
            const parent = item.locator('xpath=..');
            const parentTagName = await parent.evaluate(el => el.tagName.toLowerCase());
            if (parentTagName === 'a') {
                item = parent;
            }
        }

        await item.click();
    }
 }
 
 module.exports = { Element, Button, Link, Field, ReactiveMenu };
 