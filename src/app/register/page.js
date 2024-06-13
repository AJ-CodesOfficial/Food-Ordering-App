"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(true);

  const session = useSession();
  const { status } = session;

  if (status === "loading") return "Loading......";
  if (status === "authenticated") return redirect("/");

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);

    const userCreatePromise = fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.ok) {
        return true;
      }

      throw new Error("Some error occured. Please try again later");
    });

    toast.promise(userCreatePromise, {
      loading: "Creating user....",
      success: "User created successfully. You can now login",
      error: "Some error occured. Please try again later",
    });

    setCreatingUser(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>

      <form className="block max-w-xs mx-auto mt-5" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          disabled={creatingUser}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          disabled={creatingUser}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>

        <div className="my-4 text-center text-gray-500">
          Or register with...
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center items-center"
        >
          <Image
            src={"/google.png"}
            className="h-auto w-auto"
            height={24}
            width={24}
            alt={""}
          />
          Register with Google
        </button>

        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{" "}
          <Link className="underline" href={"/login"}>
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
