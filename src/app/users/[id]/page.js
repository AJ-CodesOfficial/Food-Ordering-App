"use client";
import useProfile from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });

      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving....",
      success: "User saved successfully!",
      error: "Some error occured. Please try again later",
    });
  }

  if (profileLoading) return "Loading user info...";
  if (!profileData.admin || !profileData) return redirect("/profile");

  return (
    <section className="mt-8 mx-auto max-w-xl">
      <UserTabs isAdmin={profileData.admin} />

      <div>
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}
