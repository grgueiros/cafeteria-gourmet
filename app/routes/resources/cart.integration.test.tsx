import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import { Cart } from "./cart";

import { createRemixStub } from "@remix-run/testing";
import { json } from "@remix-run/node";
import * as cartItems from "~/utils/cart-items";
import * as reactRemix from "@remix-run/react";
import userEvent from "@testing-library/user-event";

const RemixStub = createRemixStub([
  {
    path: "/",
    Component: Cart,
    loader() {
      return json({ message: "hello" });
    },
  },
]);

vi.spyOn(cartItems, "useCart").mockImplementation(() => ({
  cartItems: [
    {
      id: "1",
      description: "test",
      price: 29.9,
      qtd: 2,
      thumbnail: "/image.png",
      title: "title",
    },
  ],
  cartOpened: true,
}));

vi.spyOn(reactRemix, "useFetcher").mockImplementation(() => {
  return {
    state: "idle",
    submit: () => {},
    Form: "form",
  } as unknown as reactRemix.FetcherWithComponents<unknown>;
});

test("cart should open correctly", async () => {
  render(<RemixStub />);

  expect(await screen.findByText(/meu carrinho/i)).toBeInTheDocument();
  expect(screen.getByText(/qtd x2/i)).toBeInTheDocument();
  expect(screen.getByText(/Total R\$ 59,80/)).toBeInTheDocument();

  const paymentButton = screen.getByRole("button", {
    name: /efetuar pagamento/i,
  });

  await userEvent.click(paymentButton);

  expect(await screen.findByText(/parabéns/i)).toBeInTheDocument();
});
