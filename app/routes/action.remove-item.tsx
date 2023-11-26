import { json, type ActionFunctionArgs } from "@remix-run/node";
import cookie from "cookie";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const itemId = formData.get("itemId");

  const cookieHeader = request.headers.get("cookie");
  const cookieValue = cookieHeader && cookie.parse(cookieHeader)["cart_items"];

  const currentItems: { id: string; qtd: number }[] = JSON.parse(
    cookieValue || "[]"
  );

  const existingItem = currentItems.findIndex((item) => item.id === itemId);
  let resultItems = [...currentItems];

  if (existingItem !== -1 && resultItems[existingItem].qtd > 1) {
    resultItems[existingItem].qtd -= 1;
  } else {
    resultItems = resultItems.filter((item) => item.id !== itemId);
  }

  return json(
    { success: true },
    {
      headers: {
        "Set-Cookie": cookie.serialize(
          "cart_items",
          JSON.stringify(resultItems),
          {
            path: "/",
          }
        ),
      },
    }
  );
}
