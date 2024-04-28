"use client";
import { SessionProvider } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Session } from "next-auth";
import { Toaster } from "@/components/ui/toaster";

export default function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <SessionProvider session={session}>
      {isMounted ? <Toaster /> : null}
      {children}
    </SessionProvider>
  );
}
