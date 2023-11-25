import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { setCartItem } from "~/utils/cart.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const item = formData.get("item") as string;

  const responseInit = {
    headers: {
      "set-cookie": await setCartItem(request, item),
    },
  };

  return json({ success: true }, responseInit);
}
