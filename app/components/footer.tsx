import { NavLink } from "@remix-run/react";

const Separator = () => (
  <span className="block border-b-black border-b-2 w-full  max-w-[250px] mb-6" />
);

export default function Footer() {
  return (
    <footer className="bg-cream w-100 py-12 px-4">
      <div className="w-100 max-w-[1440px] mx-auto">
        <NavLink to={"/"}>
          <h1 className="text-3xl">Logo</h1>
        </NavLink>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-6">
          <div>
            <p className="text-3xl mb-6">Info de contato</p>
            <Separator />
            <Separator />
            <Separator />
          </div>
          <div>
            <p className="text-3xl mb-6">Veja também</p>
            <Separator />
            <Separator />
            <Separator />
          </div>
          <div>
            <p className="text-3xl mb-6">Privacidade</p>
            <Separator />
            <Separator />
            <Separator />
          </div>
        </div>
      </div>
    </footer>
  );
}
