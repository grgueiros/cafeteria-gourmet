import Button from "~/components/button";
import type { CartProduct } from "~/root";

type CartItemProps = {
  product: CartProduct;
};

export function CartItem({ product }: CartItemProps) {
  return (
    <div className="flex gap-3 items-center">
      <img
        className="h-[130px] aspect-square shrink-0 object-cover"
        src={product.thumbnail}
        alt={product.title}
      />
      <div className="flex-1">
        <h2 className="text-xl">{product.title}</h2>
        <p className="text-3xl">
          R$ {product.price.toFixed(2).replace(/\./g, ",")}
        </p>
        <p className="max-w-[240px]">{product.description}</p>
      </div>
      <div>
        <p className="text-3xl text-center mb-1">Qtd x{product.qtd}</p>
        <Button>Remover</Button>
      </div>
    </div>
  );
}
