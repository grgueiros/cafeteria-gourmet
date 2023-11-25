import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import { Cart } from "./cart";

import { createRemixStub } from "@remix-run/testing";
import { json } from "@remix-run/node";
import * as cartItems from "~/utils/cart-items";
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

vi.spyOn(cartItems, "useCartItems").mockImplementationOnce(() => []);

test("cart should open correctly", async () => {
  render(<RemixStub />);

  const triggerButton = await screen.findByTestId("trigger");

  await userEvent.click(triggerButton);

  expect(screen.getByText("Are you sure absolutely sure?")).toBeInTheDocument();
});
