import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Product } from "./product";
import { getCartItems } from "~/utils/cart.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Cafeteria Gourmet" },
    {
      name: "Site da Cafeteria Gourmet desenvolvido para projeto integrador transdicisplinar",
      content: "Lista de Produtos",
    },
  ];
};

export type ProductType = {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search");
  let queryString = "https://dummyjson.com/products";
  if (searchQuery)
    queryString = `https://dummyjson.com/products/search?q=${searchQuery}`;

  const res = await fetch(queryString);

  return json({
    data: {
      items: (await res.json()) as { products: ProductType[] },
      cartItems: (await getCartItems(request)) as ProductType[],
    },
  });
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="bg-[#010101] py-6 mb-12">
        <h2 className="font-sans text-white text-center text-[64px]">
          Black Friday
          <br />
          50% OFF
        </h2>
      </div>
      <div className="mb-10 text-center">
        <Form>
          <input
            className="border border-black w-full max-w-[720px] rounded-[8px] px-6 py-1"
            placeholder="encontre seu produto..."
            type="text"
            name="search"
          />
        </Form>
      </div>
      {data.items.products?.length ? (
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {data.items.products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <p>Nenhum produto encontrado</p>
      )}
    </>
  );
}
