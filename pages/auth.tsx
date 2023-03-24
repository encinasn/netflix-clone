import Input from "@/components/ui/Input";
import axios from "axios";
import React, { useCallback, useState } from "react";
import Head from "next/head";

import { signIn } from "next-auth/react";

export default function Auth() {
  const [variant, setVariant] = useState("login");
  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
  });

  const toggleVariant = useCallback(() => {
    setVariant((current) => (current === "login" ? "register" : "login"));
  }, []);
  const isLogin = variant === "login";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/profiles",
      });
    } catch (err) {
      console.log(err);
    }
  }, [values]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", values);

      login();
    } catch (err) {
      console.log(err);
    }
  }, [values, login]);

  return (
    <>
      <Head>
        <title>Netflix</title>
      </Head>

      <main className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
        <section className="h-full w-full bg-black lg:bg-opacity-50">
          <nav className="px-12 py-5">
            <img src="/images/logo.png" alt="logo" className="h-12" />
          </nav>

          <div className="flex justify-center">
            <div className="mt-2 w-full self-center rounded-md bg-black bg-opacity-70 p-16 lg:w-2/5 lg:max-w-md">
              <h2 className="mb-8 text-4xl font-semibold text-white">
                {isLogin ? "Sign In" : "Register"}
              </h2>
              <div className="flex flex-col gap-4">
                {!isLogin && (
                  <Input
                    label="Username"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                  />
                )}

                <Input
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={values.email}
                />
                <Input
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                />
              </div>

              <button
                className="mt-10 w-full rounded-md bg-red-600 py-3 text-white transition hover:bg-red-700"
                onClick={isLogin ? login : register}
              >
                {isLogin ? "Login" : "Register"}
              </button>

              <p className="mt-4 text-neutral-500">
                {isLogin
                  ? "First time using Netflix?"
                  : "Already have an account?"}

                <span
                  className="ml-1 cursor-pointer text-white hover:underline"
                  onClick={toggleVariant}
                >
                  {isLogin ? "Create an account" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
