import { ShoppingCart, CreditCard, Money, Bank } from "@phosphor-icons/react";
import * as S from "../../components/sheet";
import { useCart } from "~/utils/cart-items";
import { useFetcher } from "@remix-run/react";
import { CartItem } from "./cart-item";
import Button from "~/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/dialog";
import { Skeleton } from "~/components/skeleton";

export function Cart() {
  const cartInfo = useCart();
  const fetcher = useFetcher({ key: "cart_fetcher" });
  const itemFetcher = useFetcher({ key: "cart_item" });
  const cartFetcher = useFetcher();

  if (!cartInfo) {
    return null;
  }

  const { cartItems, cartOpened } = cartInfo;

  const pendingNewItem =
    !!itemFetcher.formData &&
    !cartItems.some((item) => item.id == itemFetcher.formData?.get("item"));

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
            {
              method: "POST",
              action: "/action/toggle-cart",
              preventScrollReset: true,
            }
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
          </S.SheetHeader>
          {pendingNewItem && (
            <div className="flex gap-3 items-center">
              <Skeleton className=" bg-slate-300 h-[130px] w-[130px] shrink-0 " />
              <div className="flex-1">
                <Skeleton className=" bg-slate-300 w-[240px] h-7 rounded-sm mb-2" />
                <Skeleton className=" bg-slate-300 w-[240px] h-9 rounded-sm mb-2" />
                <Skeleton className=" bg-slate-300 w-[240px] h-7 rounded-sm" />
              </div>
              <div>
                <Skeleton className=" bg-slate-300 w-[112px] h-8 mx-auto mb-3" />
                <Skeleton className=" bg-slate-300 w-[140px] h-12 mx-auto rounded" />
              </div>
            </div>
          )}
          {cartItems.length ? (
            <>
              {cartItems.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
              <h4 className="text-2xl mt-4 mb-3">Confirme seu pedido</h4>
              <div className="sm:flex justify-between">
                <div>
                  <p>métodos de pagamento</p>
                  <div className="flex">
                    <CreditCard size={42} />
                    <Money size={42} />
                    <Bank size={42} />
                  </div>
                </div>
                <div>
                  <p className="mb-2">
                    Produtos: R${" "}
                    {cartItems
                      .reduce((acc, curr) => (acc += curr.price * curr.qtd), 0)
                      .toFixed(2)
                      .replace(/\./g, ",")}
                  </p>
                  <p className="mb-2">
                    Frete: <span className="text-green-700">grátis</span>
                  </p>
                  <p className="mb-3">
                    Total R${" "}
                    {cartItems
                      .reduce((acc, curr) => (acc += curr.price * curr.qtd), 0)
                      .toFixed(2)
                      .replace(/\./g, ",")}
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="success">Efetuar Pagamento</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-center text-5xl">
                          Parabéns
                        </DialogTitle>
                        <DialogDescription className="text-black text-center text-lg mt-5">
                          Sua compra foi realizada com sucesso, você receberá um
                          e-mail com a confirmação do seu pedido e com as
                          informações sobre como acompanhar a sua entrega.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4"></div>
                      </div>
                      <DialogFooter className="flex sm:items-center sm:justify-center">
                        <cartFetcher.Form
                          method="POST"
                          action="/action/reset-cart"
                        >
                          <Button type="submit">Fechar</Button>
                        </cartFetcher.Form>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </>
          ) : (
            <>{!pendingNewItem ? <p>Nenhum produto selecionado</p> : null}</>
          )}
        </S.SheetContent>
      </S.Sheet>
    </>
  );
}
