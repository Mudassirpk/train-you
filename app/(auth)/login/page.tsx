"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Loading from "@/components/loading";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function login(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    const res = await signIn("credentials", { ...creds, redirect: false });
    if (res?.status === 200) {
        setError(null);
      setIsLoading(false);
      if (res.error) {
        setError(res.error as string);
      } else {
        setSuccess("Login successfull redirecting to your dashboard");
        router.push("/dashboard");
      }
    } else {
      setIsLoading(false);
      setError("Invalid email or password");
    }
  }

  return (
    <main className="flex-1 flex min-h-full flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 w-[400px]">
        <form onSubmit={login} className="space-y-6">
          <h1 className={"text-indigo-600 text-center text-3xl font-bold"}>
            Login
          </h1>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                value={creds.email}
                onChange={(e) => setCreds({ ...creds, email: e.target.value })}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                value={creds.password}
                onChange={(e) =>
                  setCreds({ ...creds, password: e.target.value })
                }
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            {success ? (
              <div className="w-full flex gap-2 items-center text-green-800 bg-green-100 p-2 rounded-lg ">
                <div className="w-20">
                  <Loading />
                </div>
                <p className="text-center flex-1">{success}</p>
              </div>
            ) : (
              <button
                disabled={isLoading}
                type="submit"
                className={`${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed text-white"
                    : "bg-indigo-600 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                } flex w-full justify-center rounded-md px-3 py-1.5 font-semibold`}
              >
                {isLoading ? "Please wait ...." : "Sign in"}
              </button>
            )}
          </div>
          {error ? (
            <p
              className={
                "bg-red-100 rounded-lg text-red-700 font-semibold py-2 px-4 text-xl text-center"
              }
            >
              {error}
            </p>
          ) : null}
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
