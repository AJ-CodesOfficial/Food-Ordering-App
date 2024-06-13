"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import CartProduct from "@/components/layout/CartProduct";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function OrdersPage() {
  const { clearCart } = useContext(CartContext);
  const { id } = useParams();

  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }

    if (id) {
      fetchOrderDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchOrderDetails() {
    setLoading(true);
    fetch("/api/orders?_id=" + id).then((res) => {
      res.json().then((orderData) => {
        setOrder(orderData);
        setLoading(false);
      });
    });
  }

  let subTotal = 0;
  if (order?.cartProducts) {
    for (const p of order.cartProducts) {
      subTotal += cartProductPrice(p);
    }
  }

  return (
    <section className="lg:max-w-2xl max-w-lg mx-auto mt-8">
      <div className=" text-center">
        <SectionHeaders mainHeader={"Your Order"} />

        <div className="my-4">
          <p>Thanks for your order</p>
          <p>We will call you when it will be on the way.</p>
        </div>
      </div>

      {loading && (
        <div className="mt-8 text-center text-2xl font-bold">
          Loading your order details...
        </div>
      )}
      {order && (
        <div className="grid lg:grid-cols-2 gap- mt-4">
          <div className="mb-8">
            {order.cartProducts.map((product) => (
              <CartProduct key={product._id} product={product} />
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
              <AddressInputs disabled={true} addressProps={order} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
