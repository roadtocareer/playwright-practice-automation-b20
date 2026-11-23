import { test, expect } from '@playwright/test';

test('User login', async ({ page }) => {
    await page.goto('http://localhost:3000');
    //await page.getByRole("textbox", { name: "you@example.com" }).fill("admin@test.com");
    //await page.getByRole("textbox", { name: "Enter password" }).fill("1234");
    await page.getByPlaceholder("you@example.com").fill("admin@test.com");
    await page.getByPlaceholder("Enter password").fill("1234");

    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForURL(/dashboard/)
    await page.context().storageState({ path: 'auth.json' });
});
test("Double click", async ({ page }) => {
    await page.goto("/dashboard/practice-components");
    await page.getByRole("button", { name: "Double Click Me" }).dblclick();
})
test("Right click", async ({ page }) => {
    await page.goto("/dashboard/practice-components");
    await page.getByRole("button", { name: "Right Click Me" }).click({ button: 'right' });
})
test("Open New Tab", async ({ page, context }) => {
    await page.goto("/dashboard/practice-components");
    const newPagePromise = context.waitForEvent('page');
    await page.getByRole("button", { name: "Open New Tab" }).click();
    const newPage = await newPagePromise;
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain("example.com")
    await newPage.close();

})
test("Open New Window", async ({ page, context }) => {
    await page.goto("/dashboard/practice-components");
    const newPagePromise = context.waitForEvent('page');
    await page.getByRole("button", { name: "Open New Window" }).click();
    const newPage = await newPagePromise;
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain("example.com")
})
test("Open Modal", async ({ page }) => {
    await page.goto("/dashboard/practice-components");
    await page.getByRole("button", { name: "Open Modal" }).click();
    await page.getByRole("button", { name: "Close" }).nth(0).click();
    const actualValue = await page.getByText("Modal Closed!").textContent();
    expect(actualValue?.includes("Modal Closed"));
})

test("NextJS Date Time Picker",async({page})=>{
    await page.goto("/dashboard/practice-components");
    let dateTimeInput= await page.locator('[type="datetime-local"]');
    await dateTimeInput.fill("2027-01-01T20:46")
})

test("Readonly date field",async({page})=>{
    await page.goto("/dashboard/practice-components");
    const readonlyElem= await page.locator("[readonly]").elementHandle();
    await readonlyElem.evaluate((el:HTMLInputElement)=>{
        el.removeAttribute('readonly');
        el.value='2024-01-05';
        el.dispatchEvent(new Event('change',{bubbles:true}))
    })
    let value= await readonlyElem.getProperty('value');
    expect(await value.jsonValue()).toBe('2024-01-05');
})

test("Set react datetime",async({page})=>{
    await page.goto("/dashboard/practice-components");
    let reactDatePicker= await page.getByPlaceholder("Select date");
    await reactDatePicker.click();
    await reactDatePicker.press('Control+a');
    await reactDatePicker.fill('10/05/2024');
    await page.keyboard.press("Enter");
})
test("iFrame test",async({page})=>{
    await page.goto("/dashboard/practice-components");
    const iFrame=await page.frameLocator('iframe');
    let headerValue= await iFrame.getByRole("heading",{name:"Welcome Back"}).textContent();
    console.log(headerValue);
    //await expect(headerValue).toContain("Welcome Back");
    await expect(headerValue?.includes("Welcome Back"));
    //await page.pause();

})