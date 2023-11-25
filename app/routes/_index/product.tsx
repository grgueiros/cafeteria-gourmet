import { Link, useFetcher } from "@remix-run/react";
import type { ProductType } from "./route";
import Button from "~/components/button";

type ProductProps = {
  product: ProductType;
};

export function Product({ product }: ProductProps) {
  const { id, price, thumbnail, title } = product;
  const fetcher = useFetcher();

  return (
    <li key={id}>
      <Link prefetch="intent" to={`/produto/${product.id}`}>
        <img
          className="w-full aspect-square object-cover"
          src={thumbnail}
          alt={title}
        />
      </Link>
      <Link
        prefetch="intent"
        className="text-right inline-block w-full underline text-base text-blue-800"
        to={`/produto/${product.id}`}
      >
        ver detalhes
      </Link>
      <h3 className="text-right text-2xl mt-1 mb-2">
        Preço R$ {price.toFixed(2).toString().replace(/\./, ",")}
      </h3>
      <fetcher.Form method="POST" action="/action/add-item">
        <input type="hidden" name="item" value={id} />
        <Button type="submit" className="w-full">Comprar</Button>
      </fetcher.Form>
    </li>
  );
}
