import { ShoppingCart } from "@phosphor-icons/react";
import * as S from "../../components/sheet";
import { useCartItems } from "~/utils/cart-items";

export function Cart() {
  const cartItems = useCartItems();

  return (
    <>
      <S.Sheet>
        <S.SheetTrigger>
          <div className="relative">
            <ShoppingCart data-testid="trigger" size={24} color="white" />
            {cartItems.length ? (
              <span className="absolute bg-red-700 rounded-full text-white w-4 h-4 text-xs">{cartItems.length}</span>
            ) : null}
          </div>
        </S.SheetTrigger>
        <S.SheetContent>
          <S.SheetHeader>
            <S.SheetTitle>Are you sure absolutely sure?</S.SheetTitle>
            {cartItems.length ? (
              cartItems.map((product) => (
                <p key={product.id}>{product.title}<span>{product.qtd}</span></p>
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
