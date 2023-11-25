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
import { getCartItems } from "./utils/cart.server";
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
  return json({
    data: {
      cartItems: (await getCartItems(request)) as CartProduct[],
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
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
