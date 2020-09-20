import {Browser} from "puppeteer";
import { LoginValidation, LoginValidationResult } from "./actions/validation/login";
import { IAction } from "./interfaces/action";

export class Coupang {
    public constructor(private readonly _browser: Browser) {}

    public async login(email: string, password: string): Promise<LoginValidationResult> {
        const action = new LoginValidation(email, password);
        return this._execute(action);
    }

    private async _execute<T>(action: IAction<T>): Promise<T> {
        return action.execute(this._browser);
    }
}
