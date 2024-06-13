"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import SignOut from "../icons/SignOut";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import Cart from "../icons/ShoppingCart";
import Bars2 from "../icons/Bars2";

function AuthLinks({ status, userName }) {
  if (status === "authenticated")
    return (
      <>
        <Link className="whitespace-nowrap" href={"/profile"}>
          Hello, {userName}
        </Link>

        <button
          onClick={() => signOut()}
          className="bg-primary text-white rounded-full px-4 py-2 gap-1 max-w-40 mx-auto"
        >
          <span className="sm:hidden">Logout</span>
          <SignOut />
        </button>
      </>
    );

  if (status === "loading") return <Link href={""}>Loading...</Link>;

  if (status === "unauthenticated")
    return (
      <>
        <Link href={"/login"}>Login</Link>
        <Link
          href={"/register"}
          className="bg-primary text-white rounded-full px-8 py-2"
        >
          Register
        </Link>
      </>
    );
}

export default function Header() {
  const session = useSession();
  const status = session.status;

  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <header className="">
      <div className="sm:hidden">
        <div className="flex items-center justify-between">
          <Link className="text-primary font-semibold text-2xl" href={"/"}>
            PIZZARITA
          </Link>

          <div className="flex gap-8 items-center">
            <Link className="relative" href={"/cart"}>
              <Cart />

              {cartProducts.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-gray-200 text-gray-900 text-xs py-1 px-2 leading-3 rounded-full">
                  {cartProducts.length}
                </span>
              )}
            </Link>

            <button
              className="p-1"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <Bars2 />
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          <div
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-4 bg-gray-100 rounded-lg mt-2 text-gray-500"
          >
            <div className="gap-2 flex flex-col text-center">
              <Link href={"/"}>Home</Link>
              <Link href={"/menu"}>Menu</Link>
              <Link href={"/#about-us"}>About</Link>
              <Link href={"/#contact-us"}>Contact</Link>

              <AuthLinks status={status} userName={userName} />
            </div>
          </div>
        )}
      </div>

      <div className="hidden sm:flex items-center gap-4 justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href={"/"}>
            PIZZARITA
          </Link>
          <div className="flex gap-4">
            <Link href={"/"}>Home</Link>
            <Link href={"/menu"}>Menu</Link>
            <Link href={"/#about-us"}>About</Link>
            <Link href={"/#contact-us"}>Contact</Link>
          </div>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} userName={userName} />

          <Link className="relative" href={"/cart"}>
            <Cart />

            {cartProducts.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-gray-200 text-gray-900 text-xs py-1 px-2 leading-3 rounded-full">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
