import { Locator, Page } from "@playwright/test";

export interface UserData{
    firstName:string,
    lastName:string,
    email:string,
    phoneNumber:string,
    password:string,
    birthDate:string,
    city:string,
    profileImage:string
}
export class UserPage{
    readonly page:Page;
    readonly firstNameInput:Locator;
    readonly lastNameInput:Locator;
    readonly emailInput:Locator;
    readonly phoneNumberInput:Locator;
    readonly bloodGroupDropdown:Locator;
    readonly passwordInput:Locator;
    readonly birthDateInput:Locator;
    readonly cityDropdown:Locator;
    readonly genderMaleRadio:Locator;
    readonly checkbox:Locator;
    readonly profileImageInput:Locator;
    readonly createUserButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.firstNameInput=page.getByPlaceholder("John",{exact:true});
        this.lastNameInput=page.getByPlaceholder("Doe");
        this.emailInput=page.getByPlaceholder("john@example.com");
        this.phoneNumberInput=page.getByPlaceholder("01500000000");
        this.bloodGroupDropdown=page.getByRole("combobox").first();
        this.passwordInput=page.getByPlaceholder("Create a password");
        this.birthDateInput=page.getByPlaceholder("MM/dd/yyyy");
        this.cityDropdown=page.getByRole("combobox").nth(1);
        this.genderMaleRadio=page.locator("#genderMale");
        this.checkbox=page.locator("[type=checkbox]");
        this.profileImageInput=page.locator("#photoInput");
        this.createUserButton=page.getByRole("button",{name:"Create User"});
    }
    async visitPage(){
        await this.page.goto("/dashboard/add-user");
    }
    async createUser(userModel:UserData){
        await this.firstNameInput.fill(userModel.firstName);
        await this.lastNameInput.fill(userModel.lastName);
        await this.emailInput.fill(userModel.email);
        await this.phoneNumberInput.fill(userModel.phoneNumber);
        await this.bloodGroupDropdown.press("ArrowDown");
        await this.passwordInput.fill(userModel.password);
        await this.birthDateInput.click();
        await this.birthDateInput.pressSequentially(userModel.birthDate,{delay:100});
        await this.birthDateInput.press("Enter");
        await this.cityDropdown.selectOption(userModel.city);
        await this.genderMaleRadio.check();
        await this.checkbox.check();
        await this.profileImageInput.setInputFiles(userModel.profileImage);
        await this.createUserButton.click();
    }
}