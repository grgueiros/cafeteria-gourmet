import { test, expect } from "@playwright/test";

test.describe("Cart", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://cafeteria.gabrielgueiros.com.br/");
    await page
      .getByRole("button", { name: "Adicionar ao Carrinho" }) 
      .first()
      .click();
  });

  test("rendered opened cart", async ({ page }) => {
    const title = page.getByRole("heading", { name: "Meu carrinho" });
    await expect(title).toBeVisible();
  });

  test("buy product success flow", async ({ page }) => {
    const total = page.getByText("Total R$ 549,00");
    const paymentButton = page.getByRole("button", {
      name: "Efetuar Pagamento",
    });

    await expect(total).toBeVisible();

    await paymentButton.click();

    await expect(page.getByRole("heading", { name: "Parabéns" })).toBeVisible();
  });

  test("remove product from cart", async ({ page }) => {
    const deleteButton = page.getByRole("button", {
      name: "Remover",
    });

    await deleteButton.click();

    await expect(page.getByText("Nenhum produto selecionado")).toBeVisible();
  });
});
