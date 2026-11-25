import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { generateRandomNumber } from '../utils/randomNumber';

test.skip('User login', async ({ page }) => {
    await page.goto('/');
    //await page.getByRole("textbox", { name: "you@example.com" }).fill("admin@test.com");
    //await page.getByRole("textbox", { name: "Enter password" }).fill("1234");
    await page.getByPlaceholder("you@example.com").fill("admin@test.com");
    await page.getByPlaceholder("Enter password").fill("1234");

    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForURL(/dashboard/)
    await page.context().storageState({ path: 'auth.json' });
});
test("User Registration",async({page})=>{
    await page.goto("/dashboard/add-user");
    await page.getByPlaceholder("John",{exact:true}).fill(`${faker.person.firstName()}`);
    await page.getByPlaceholder("Doe").fill(`${faker.person.lastName()}`);
    await page.getByPlaceholder("john@example.com").fill(`${faker.internet.email()}`);
    await page.getByPlaceholder("01500000000").fill(`0160${generateRandomNumber(1000000,9999999)}`);
    await page.waitForTimeout(1000);
    let cbBloodGroup= await page.getByRole('combobox').first();
    await cbBloodGroup.press("ArrowDown");
    page.getByPlaceholder("Create a password").fill("1234");
    let birthDate=await page.getByPlaceholder("MM/dd/yyyy");
    await birthDate.click();
    await page.waitForTimeout(1000);
    //await birthDate.fill("01/04/2026");
    await birthDate.pressSequentially("01/04/2026",{delay:100});
    await page.waitForTimeout(1000);
    await birthDate.press("Enter");
    await page.getByRole("combobox").nth(1).selectOption("Dhaka");
    await page.locator("#genderMale").check();
    await page.locator("[type=checkbox]").check();
    await page.locator("#photoInput").setInputFiles("resources/bg.png");
    await page.getByRole("button",{name:"Create User"}).click();
    await page.pause();
})