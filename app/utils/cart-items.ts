import { useRouteLoaderData } from "@remix-run/react";
import type { loader as rootLoader } from "app/root";

export function useCart() {
  const res = useRouteLoaderData<typeof rootLoader>("root");

  return res?.cart;
}
