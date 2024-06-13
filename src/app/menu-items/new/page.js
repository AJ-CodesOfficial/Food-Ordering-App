"use client";
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {
  const { loading: profileLoading, data: profileData } = useProfile();

  const [redirectToItems, setRedirectToItems] = useState(false);

  if (profileLoading) return "Loading user info...";
  if (!profileData.admin || !profileData) return redirect("/profile");

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) return resolve();
      else return reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving this tasty item.....",
      success: "Successfully created this item 😋",
      error: "Some error occured. Please try again later",
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) return redirect("/menu-items");

  return (
    <section className="mt-8 max-w-xl mx-auto">
      <UserTabs isAdmin={profileData.admin} />

      <div className="mt-8">
        <Link href={"/menu-items"} className="button justify-center gap-1">
          <Left />
          <span>See all items on the Menu</span>
        </Link>
      </div>

      <MenuItemForm onSubmit={handleFormSubmit} menuItem={null} />
    </section>
  );
}
