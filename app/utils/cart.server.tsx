import * as cookie from "cookie";
import type { ProductType } from "~/routes/_index/route";

const cookieName = "cart_items";

export async function getCartItems(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const cookieValue = cookieHeader && cookie.parse(cookieHeader)[cookieName];

  const parsed: { id: string; qtd: number }[] = JSON.parse(cookieValue || "[]");

  if (parsed.length) {
    const products: ProductType[] = await Promise.all(
      parsed.map(async (item) =>
        (await fetch(`https://dummyjson.com/products/${item.id}`)).json()
      )
    );
    return products.map((product, index) => ({
      ...product,
      qtd: parsed[index].qtd,
    }));
  }
  return [];
}

export async function setCartItem(request: Request, itemId: string) {
  const cookieHeader = request.headers.get("cookie");
  const cookieValue = cookieHeader && cookie.parse(cookieHeader)[cookieName];

  const parsed: { id: string; qtd: number }[] = JSON.parse(cookieValue || "[]");

  if (!parsed.find((item) => item.id === itemId)) {
    parsed.push({ id: itemId, qtd: 1 });
  } else {
    parsed[parsed.findIndex((item) => item.id === itemId)].qtd += 1;
  }

  return cookie.serialize(cookieName, JSON.stringify(parsed), {
    path: "/",
  });
}
