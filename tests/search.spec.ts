import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("https://cafeteria.gabrielgueiros.com.br/");
  });
  test("has title", async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/cafeteria gourmet/i);
  });

  test("has initial elements", async ({ page }) => {
    const buttons = await page.locator("li").all();

    expect(buttons.length).toBe(30);
  });

  test("search working properly", async ({ page }) => {
    const textBox = page.getByRole("textbox");
    await textBox.fill("cereal");
    await textBox.press("Enter");
    await page.waitForResponse(
      "https://cafeteria.gabrielgueiros.com.br/?search=cereal&_data=root"
    );

    expect(await page.locator("li").all()).toHaveLength(1);
  });
});
