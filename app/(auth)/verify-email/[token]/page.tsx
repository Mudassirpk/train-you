"use client";
import Loading from "@/components/loading";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export default function VerifyEmail() {
  const { token } = useParams();
  const router = useRouter();
  const { email, code }: any = jwtDecode(token as string);
  const { status, data, mutate } = useMutation({
    mutationKey: ["verify-email"],
    mutationFn: async () =>
      axios.post("/api/auth/verify-email", {
        token: code,
        email,
      }),
    onSuccess() {
      if (data?.data.success) {
        router.push("/login");
      }
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  return (
    <section className="flex-1 w-full flex items-center justify-center">
      {status == "pending" ? (
        <Loading message="Pleas wait your email is being verified" />
      ) : null}
      {status === "success" ? (
        <div
          className={`${
            data?.data.success
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          } px-4 py-2 rounded-xl`}
        >
          {data?.data.message}
          {data?.data.success ? " Now you login and use your account" : null}
        </div>
      ) : null}
    </section>
  );
}
