'use client'
import SideBar from "@/components/dashboard/sidebar";
import { useSession } from "next-auth/react";
import React from "react";

type Props = { children: React.ReactNode };

function DashboardLayout({ children }: Props) {
  const { data, status } = useSession()
  if (status === 'loading') return <p>Loading....</p>
  return (
    <div className="flex gap-2 min-h-screen">
      <SideBar />
      {children}
    </div>
  );
}

export default DashboardLayout;
