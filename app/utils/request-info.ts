import { useRouteLoaderData } from "@remix-run/react";
import type { loader as rootLoader } from "app/root";

export function useCartItems() {
  const res = useRouteLoaderData<typeof rootLoader>("root");

  return res?.data.cartItems || [];
}
