import { NavLink } from "@remix-run/react";
import Button from "./button";
import { Cart } from "../routes/resources/cart";

export default function Header() {
  return (
    <header className="bg-coffee w-100 py-4 px-4">
      <div className="w-100 max-w-[1440px] flex justify-between mx-auto">
        <NavLink className="flex items-center justify-center" to={"/"}>
          <h1 className="text-3xl text-white">Logo</h1>
        </NavLink>
        <nav className="flex gap-4 items-center">
          <Button variant="secondary">login</Button>
          <Cart />
        </nav>
      </div>
    </header>
  );
}
