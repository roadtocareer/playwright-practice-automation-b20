import { Locator, Page } from "@playwright/test";

export interface LoginModel{
    email:string,
    password:string
}
export class UserLogin{
    readonly page:Page;
    readonly emailInput:Locator;
    readonly passwordInput:Locator;
    readonly loginButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.emailInput=page.getByPlaceholder("you@example.com");
        this.passwordInput=page.getByPlaceholder("Enter password");
        this.loginButton=page.getByRole("button",{name:"Login"});
    }
    async visitPage(){
        await this.page.goto("/");
    }
    async login(loginModel:LoginModel){
        await this.emailInput.fill(loginModel.email);
        await this.passwordInput.fill(loginModel.password);
        await this.loginButton.click();
    }
}
