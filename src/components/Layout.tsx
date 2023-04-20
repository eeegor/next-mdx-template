import Link from "next/link";
import React from "react";
import { IoBookOutline } from "react-icons/io5";

const Logo = () => {
  return (
    <div className="flex">
      <Link href="/">
        <div className="font-extrabold italic text-3xl flex gap-3 items-center">
          <IoBookOutline className="text-green-500" />
          Logo
        </div>
      </Link>
    </div>
  );
};

export const Layout = ({
  children,
}: React.PropsWithChildren<{ tags?: string[] }>) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="pt-12">
        <div className="container mx-auto">
          <Logo />
        </div>
      </header>
      <main className="container mx-auto flex-1 py-12">{children}</main>
      <footer>
        <div className="container pt-12 pb-24">
          <div className="font-extrabold uppercase text-md text-gray-400">
            &copy; {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
};
