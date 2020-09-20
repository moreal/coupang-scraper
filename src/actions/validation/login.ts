import { Browser } from "puppeteer";
import { IAction } from "../../interfaces/action";

export class LoginValidation implements IAction<LoginValidationResult> {
    constructor(
        private readonly _email: string,
        private readonly _password: string) {}

    public async execute(browser: Browser): Promise<LoginValidationResult> {
        const page = await browser.newPage();
        await page.goto(COUPANG_URL.toString());
        const loginHref: string = await (await (await page.$('a[class=login]'))!.getProperty("href")).jsonValue() as string;
        await page.goto(loginHref);
        await page.evaluate((email: string, password: string) => {    
            const loginEmailInput: HTMLInputElement = document.getElementById("login-email-input") as HTMLInputElement;
            loginEmailInput.value = email;
            const loginPasswordInput: HTMLInputElement = document.getElementById("login-password-input") as HTMLInputElement;
            loginPasswordInput.value = password;
            const loginButton: HTMLButtonElement = document.querySelector('button[type=submit]')! as HTMLButtonElement;
            loginButton.click();
        }, this._email, this._password);

        await page.waitForNavigation();
        const pageURL = new URL(page.url());
        return {
            success: pageURL.hostname === COUPANG_URL.host,
        }
    }
}

export interface LoginValidationResult {
    success: boolean;
}
