"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import useProfile from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import AddressInputs from "@/components/layout/AddressInputs";
import CartProduct from "@/components/layout/CartProduct";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartProducts, removeFromCart } = useContext(CartContext);
  const { data: ProfileData } = useProfile();

  const [address, setAddress] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed 😔");
      }
    }
  }, []);

  useEffect(() => {
    if (ProfileData) {
      const { phone, streetAddress, city, postalCode, country } = ProfileData;

      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };

      setAddress(addressFromProfile);
    }
  }, [ProfileData]);

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  let subTotal = 0;
  for (const p of cartProducts) {
    subTotal += cartProductPrice(p);
  }

  async function proceedToCheckout(event) {
    event.preventDefault();

    const { phone, streetAddress, city, postalCode, country } = address;

    if (!phone || !streetAddress || !city || !postalCode || !country) {
      toast.error("Please fill in all address fields");
      return;
    }

    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, cartProducts }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: "Preparing your order.....",
      success: "Redirecting to Payment",
      error: "Some error occurred. Please try again later",
    });
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={"Cart"} />
      </div>

      {cartProducts.length === 0 ? (
        <div className="grid items-center justify-center text-center mt-8 gap-4 bg-gray-100 max-w-md mx-auto rounded-lg p-4">
          <span className="font-semibold">
            Oops, it seems there are <br /> no Products in your Shopping Cart
          </span>
          <Link
            href={"/menu"}
            className="flex gap-1 items-center justify-center text-gray-500"
          >
            Select your items here
            <Right />
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 grid-cols-1 lg:grid-cols-2">
          <div className="">
            {cartProducts.length > 0 &&
              cartProducts.map((product, index) => (
                <CartProduct
                  key={index}
                  index={index}
                  product={product}
                  onRemove={removeFromCart}
                />
              ))}

            <div className=" py-2 pr-16 flex justify-end items-center">
              <div className="text-gray-500 text-right">
                Subtotal: <br /> Delivery: <br /> Total:
              </div>
              <div className=" font-semibold pl-2 text-right">
                ${subTotal} <br /> $5 <br /> ${subTotal + 5}
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Checkout</h2>

              <form onSubmit={proceedToCheckout}>
                <AddressInputs
                  addressProps={address}
                  setAddressProps={handleAddressChange}
                />

                <button type="submit">Pay ${subTotal + 5}</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
