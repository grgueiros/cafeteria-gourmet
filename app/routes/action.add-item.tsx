import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { setCartItem, setCartOpened } from "~/utils/cart.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const item = formData.get("item") as string;

  const headers = new Headers();
  headers.append("Set-Cookie", await setCartItem(request, item));
  headers.append("Set-Cookie", await setCartOpened(true));

  const responseInit = {
    headers,
  };

  return json({ success: true }, responseInit);
}
