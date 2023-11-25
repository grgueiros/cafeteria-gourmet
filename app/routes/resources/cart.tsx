import { ShoppingCart } from "@phosphor-icons/react";
import * as S from "../../components/sheet";
import { useCart } from "~/utils/cart-items";
import { useFetcher } from "@remix-run/react";
import { CartItem } from "./cart-item";

export function Cart() {
  const cartInfo = useCart();
  const fetcher = useFetcher({ key: "cart_fetcher" });
  const itemFetcher = useFetcher({ key: "cart_item" });

  if (!cartInfo) {
    return null;
  }

  const { cartItems, cartOpened } = cartInfo;

  const opened =
    !!itemFetcher.formData ||
    fetcher.formData?.get("open") === "true" ||
    (!fetcher.formData && cartOpened);

  return (
    <>
      <S.Sheet
        open={opened}
        onOpenChange={(open) => {
          fetcher.submit(
            { open },
            { method: "POST", action: "/action/toggle-cart" }
          );
        }}
      >
        <S.SheetTrigger>
          <div className="relative">
            <ShoppingCart data-testid="trigger" size={24} color="white" />
            {cartItems.length ? (
              <span className="absolute bg-red-700 rounded-full text-white w-4 h-4 text-xs">
                {cartItems.length}
              </span>
            ) : null}
          </div>
        </S.SheetTrigger>
        <S.SheetContent>
          <S.SheetHeader>
            <S.SheetTitle className="text-4xl mb-4">Meu carrinho</S.SheetTitle>
            {cartItems.length ? (
              cartItems.map((product) => (
                <CartItem key={product.id} product={product} />
              ))
            ) : (
              <p>Nenhum produto selecionado</p>
            )}
          </S.SheetHeader>
        </S.SheetContent>
      </S.Sheet>
    </>
  );
}
