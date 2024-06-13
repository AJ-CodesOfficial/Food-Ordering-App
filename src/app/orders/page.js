"use client";
import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { dbTimeForHuman } from "@/libs/datetime";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const { loading: profileLoading, data: profileData } = useProfile();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoading(true);
    fetch("/api/orders").then((res) => {
      res.json().then((orders) => {
        setOrders(orders.reverse());
        setLoading(false);
      });
    });
  }

  if (profileLoading) return <div>Loading user info...</div>;
  if (!profileData) return redirect("/login");

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profileData.admin} />

      <div className="mt-8">
        {loading && (
          <div className="mt-8 text-center text-xl font-bold">
            Loading your orders...
          </div>
        )}
        {orders?.length > 0 &&
          orders.map((order) => (
            <Link
              href={"/orders/" + order._id}
              key={order._id}
              className="bg-gray-100 mb-2 p-4 gap-4 md:gap-6 rounded-lg flex items-center justify-around"
            >
              <div className="min-w-14 sm:min-w-24 text-center">
                <div
                  className={
                    (order.paid ? "bg-green-400" : "bg-red-400") +
                    " p-2 rounded-md text-center sm:whitespace-nowrap w-full"
                  }
                >
                  {order.paid ? "Paid" : "Not Paid"}
                </div>
              </div>

              <div className="grow">
                <div className="">{order.userEmail}</div>

                <div className="text-gray-500 line-clamp-2">
                  {order.cartProducts.map((product) => product.name).join(", ")}
                </div>
              </div>

              <div className="text-right min-w-20 sm:min-w-40 text-gray-500">
                {dbTimeForHuman(order.createdAt)}
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
