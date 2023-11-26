import { useFetcher } from "@remix-run/react";
import Button from "~/components/button";
import type { CartProduct } from "~/root";

type CartItemProps = {
  product: CartProduct;
};

export function CartItem({ product }: CartItemProps) {
  const fetcher = useFetcher();

  const loading = fetcher.state === "loading";

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center mt-4">
      <img
        className="w-100 sm:w-[130px] aspect-square shrink-0 object-cover"
        src={product.thumbnail}
        alt={product.title}
      />
      <div className="flex-1">
        <h2 className="text-xl">{product.title}</h2>
        <p className="text-3xl">
          R$ {product.price.toFixed(2).replace(/\./g, ",")}
        </p>
        <p className="sm:max-w-[240px]">
          {product.description.substring(0, 72)}...
        </p>
      </div>
      <div>
        <p className="text-3xl sm:text-center mb-1">Qtd x{product.qtd}</p>
        <fetcher.Form method="POST" action="/action/remove-item">
          <input type="hidden" name="itemId" value={product.id} />
          <Button>{loading ? "Removendo..." : "Remover"}</Button>
        </fetcher.Form>
      </div>
    </div>
  );
}
