import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { setCartOpened } from "~/utils/cart.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const headers = new Headers();

  headers.append(
    "Set-Cookie",
    await setCartOpened(formData.get("open") === "true")
  );

  return json({ success: true }, { headers });
}
