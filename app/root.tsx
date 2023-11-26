import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStyles from "./tailwind.css";
import Header from "./components/header";
import { getCartItems, getCartOpened } from "./utils/cart.server";
import type { ProductType } from "./routes/_index/route";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles },
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Crafty+Girls&display=swap",
  },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export type CartProduct = {
  qtd: number;
} & ProductType;

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search");
  let queryString = "https://dummyjson.com/products";
  if (searchQuery)
    queryString = `https://dummyjson.com/products/search?q=${searchQuery}`;

  const res = await fetch(queryString);

  return json({
    items: (await res.json()) as { products: ProductType[] },
    cart: {
      cartItems: (await getCartItems(request)) as CartProduct[],
      cartOpened: await getCartOpened(request),
    },
  });
}

export default function App() {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-default">
        <Header />
        <main className="w-100 max-w-[1472px] mx-auto px-4 py-20">
          <Outlet />
        </main>
        <ScrollRestoration
          getKey={(location) => {
            return location.pathname;
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
