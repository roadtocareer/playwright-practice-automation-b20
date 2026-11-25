import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { UserData, UserPage } from '../pages/UserPage.pom';
import { LoginModel, UserLogin } from '../pages/UserLogin.pom';
import { generateRandomNumber } from '../utils/randomNumber';

test('User login', async ({ page }) => {
    const userLogin = new UserLogin(page);
    const loginModel: LoginModel = {
        email: "admin@test.com",
        password: "1234"
    };
    await userLogin.visitPage();
    await userLogin.login(loginModel);
    await page.waitForURL(/dashboard/);
    await page.context().storageState({ path: 'auth.json' });
});

test("Create a new user", async ({ page }) => {
    const userPage = new UserPage(page);
    const userModel: UserData = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: `0160${generateRandomNumber(1000000, 9999999)}`,
        password: "1234",
        birthDate: "01/04/2026",
        city: "Dhaka",
        profileImage: "resources/bg.png"
    };

    await userPage.visitPage();
    await userPage.createUser(userModel);
});
