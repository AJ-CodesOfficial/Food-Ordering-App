"use client";
import Left from "@/components/icons/Left";
import Trash from "@/components/icons/Trash";
import DeleteButton from "@/components/layout/DeleteButton";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditMenuItemPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const { id } = useParams();

  const [redirectToItems, setRedirectToItems] = useState(false);
  const [menuItem, setMenuItem] = useState(null);

  useEffect(() => {
    fetch("/api/menu-items").then((response) => {
      response.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (profileLoading || !menuItem) return "Loading user info...";
  if (!profileData.admin || !profileData) return redirect("/profile");

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) return resolve();
      else return reject();
    });

    await toast.promise(savingPromise, {
      loading: "Updating this tasty item.....",
      success: "Successfully updated this item 😋",
      error: "Some error occured. Please try again later",
    });

    setRedirectToItems(true);
  }

  async function handleMenuDelete() {
    const deletingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });

      if (response.ok) return resolve();
      else return reject();
    });

    await toast.promise(deletingPromise, {
      loading: "Deleting....",
      success: "Successfully deleted the Menu Item",
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

      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />

      <div
        className="mt-2 ml-4 grid"
        style={{ gridTemplateColumns: ".2fr .8fr" }}
      >
        <div></div>
        <DeleteButton label={"Delete this item"} onDelete={handleMenuDelete} />
      </div>
    </section>
  );
}
