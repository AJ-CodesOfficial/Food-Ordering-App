"use client";
import Edit from "@/components/icons/Edit";
import DeleteButton from "@/components/layout/DeleteButton";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  }

  if (profileLoading) return "Loading user info...";
  if (!profileData.admin || !profileData) return redirect("/profile");

  return (
    <section className="mt-8 max-w-xl mx-auto">
      <UserTabs isAdmin={profileData.admin} />

      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 text-center rounded-lg mb-2 p-1 flex px-4 items-center justify-between gap-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <div className="text-gray-900">
                  {user.name ? (
                    <span>{user.name}</span>
                  ) : (
                    <span className=" italic">No Name</span>
                  )}
                </div>

                <span className="text-gray-500">{user.email}</span>
              </div>
              <div className=" ml-4 pl-8">
                <Link href={"/users/" + user._id} className="button p-2">
                  <Edit />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
