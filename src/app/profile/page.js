"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import UserForm from "@/components/layout/UserForm";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setProfileFetched(false);

          setUser(data);
          setIsAdmin(data.admin);

          setProfileFetched(true);
        });
      });
    }
    if (status === "unauthenticated") redirect("/login");
  }, [status]);

  if (status === "loading" || !profileFetched) return "Loading......";

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving....",
      success: "Profile saved successfully!",
      error: "Some error occured. Please try again later",
    });
  }

  return (
    <section className="mt-8 max-w-xl mx-auto">
      <UserTabs isAdmin={isAdmin} />

      <UserForm user={user} onSave={handleProfileInfoUpdate} />
    </section>
  );
}
