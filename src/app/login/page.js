"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(true);

  const session = useSession();
  const { status } = session;

  if (status === "loading") return "Loading......";
  if (status === "authenticated") return redirect("/");

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    await signIn("credentials", { email, password, callbackUrl: "/" });

    setLoginInProgress(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>

      <form className="max-w-xs mx-auto mt-5" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          disabled={loginInProgress}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          disabled={loginInProgress}
        />
        <button type="submit" disabled={loginInProgress}>
          Login
        </button>

        <div className="my-4 text-center text-gray-500">Or login with...</div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center items-center"
        >
          <Image
            className="h-auto w-auto"
            src={"/google.png"}
            height={20}
            width={20}
            alt={""}
          />
          Login with Google
        </button>

        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Don&apos;t have an account?{" "}
          <Link className="underline" href={"/register"}>
            Create one &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
