import { Browser } from "puppeteer";

export interface IAction<T> {
    execute(browser: Browser): Promise<T>;
}
