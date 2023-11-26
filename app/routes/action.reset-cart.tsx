import { json } from "@remix-run/node";
import { setCartOpened } from "~/utils/cart.server";
import cookie from "cookie";

export async function action() {
  const headers = new Headers();
  headers.append("Set-Cookie", await setCartOpened(false));
  headers.append(
    "Set-Cookie",
    cookie.serialize("cart_items", JSON.stringify([]), {
      path: "/",
    })
  );

  const responseInit = {
    headers,
  };

  return json({ success: true }, responseInit);
}
