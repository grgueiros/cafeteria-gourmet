import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import type { ProductType } from "../_index/route";
import Button from "~/components/button";

export async function loader({ params }: LoaderFunctionArgs) {
  const res = await fetch(`https://dummyjson.com/products/${params.productId}`);

  return json({ product: (await res.json()) as ProductType });
}

export default function ProductPage() {
  const { product } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const { price, title, thumbnail, description, id } = product;

  return (
    <div>
      <img src={thumbnail} alt={title} />
      <div>
        <h1>{title}</h1>
        <h2>Descrição</h2>
        <p>{description}</p>

        <span>Preço: R$ {price.toFixed(2).toString().replace(/\./, ",")}</span>
        <fetcher.Form method="POST" action="/action/add-item">
          <input type="hidden" name="item" value={id} />
          <Button type="submit">Adicionar ao Carrinho</Button>
        </fetcher.Form>
      </div>
    </div>
  );
}
