"use client";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ValidationError from "@/components/validation-error";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {};

function SignUp({}: Props) {
  const [userValidationErrors, setUserValidationErrors] = useState<any>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: searchParams.get("role") ? searchParams.get("role") : "",
    phone: "",
  });

  const { mutate, status } = useMutation({
    mutationFn: createUser,
    onSuccess(data) {
      if (data.data.success) {
        if (user.role === "teacher") {
          router.push(`/education?userId=${data?.data.userId}`);
        } else {
          router.push(`/login`);
        }
      } else {
        setUserValidationErrors({
          serverError: { message: data.data.message },
        });
      }
    },
  });

  async function createUser() {
    if (user.password !== user.confirmPassword) {
      setUserValidationErrors({
        ...userValidationErrors,
        confirmPassword: {
          message: "Passwords does not match",
        },
      });
    } else {
      userValidationErrors.confirmPassword = null;
    }

    if (user.role?.trim().length === 0) {
      setUserValidationErrors({
        ...userValidationErrors,
        role: {
          message: "Please select role",
        },
      });
    } else {
      userValidationErrors.role = null;
    }

    return axios.post("/api/auth/signup", user);
  }

  return (
    <main className="py-6">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            Train You
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form
                onSubmit={(e: FormEvent) => {
                  e.preventDefault();
                  mutate();
                }}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={user.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="e.g. Ahmed"
                    required={true}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required={true}
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0123-34567890"
                    required={true}
                    value={user.phone}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    value={user.password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    value={user.confirmPassword}
                    type="confirm-password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                    onChange={(e) =>
                      setUser({ ...user, confirmPassword: e.target.value })
                    }
                  />
                  {userValidationErrors.confirmPassword ? (
                    <ValidationError
                      message={userValidationErrors.confirmPassword.message}
                    />
                  ) : null}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Sign up as
                  </label>
                  <div className="flex gap-2 items-center">
                    <label className="flex gap-2 items-center px-4 py-1 rounded-lg border-2 border-indigo-600">
                      <Input
                        onChange={(e) =>
                          setUser({
                            ...user,
                            role: e.target.checked ? e.target.value : "",
                          })
                        }
                        checked={
                          searchParams.get("role") &&
                          searchParams.get("role") === "teacher"
                            ? true
                            : undefined
                        }
                        type="radio"
                        name="role"
                        value={"teacher"}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <span>Teacher</span>
                    </label>
                    <label className="flex gap-2 items-center px-4 py-1 rounded-lg border-2 border-indigo-600">
                      <Input
                        onChange={(e) =>
                          setUser({
                            ...user,
                            role: e.target.checked ? e.target.value : "",
                          })
                        }
                        type="radio"
                        name="role"
                        value={"student"}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <span>Student</span>
                    </label>
                  </div>
                </div>
                <Button
                  type="submit"
                  className={`${
                    status === "pending"
                      ? "bg-gray-800"
                      : "bg-indigo-800 w-full hover:bg-indigo-600"
                  } `}
                >
                  {status === "pending" ? <Loading /> : "Create an account"}
                </Button>
                {userValidationErrors.serverError ? (
                  <ValidationError
                    message={userValidationErrors.serverError.message}
                  />
                ) : null}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignUp;
