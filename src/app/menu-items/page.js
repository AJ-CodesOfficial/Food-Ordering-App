"use client";
import { PlusCircle } from "@/components/icons/Plus";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
  const { loading: profileLoading, data: profileData } = useProfile();

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((response) => {
      response.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (profileLoading) return "Loading user info...";
  if (!profileData.admin || !profileData) return redirect("/profile");

  return (
    <section className="mt-8 max-w-xl mx-auto">
      <UserTabs isAdmin={profileData.admin} />

      <div className="mt-8">
        <Link className="button justify-center gap-1" href={"/menu-items/new"}>
          <PlusCircle />
          <span>Create new item on the menu</span>
        </Link>
      </div>

      <div>
        <h2 className="text-sm text-gray-500 mt-8 mb-2">
          Edit items on the menu:
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                key={item._id}
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4 justify-around items-center flex flex-col gap-2"
              >
                <div className="relative">
                  <Image
                    className="max-h-[100px] max-w-[100px] h-full w-full rounded-md"
                    width={250}
                    height={250}
                    src={item.image}
                    alt={item.name}
                  />
                </div>

                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
