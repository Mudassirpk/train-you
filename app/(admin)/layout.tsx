import SideBar from "@/components/dashboard/sidebar";
import React from "react";

type Props = { children: React.ReactNode };

function DashboardLayout({ children }: Props) {
  return (
    <body className="flex gap-2 min-h-screen">
      <SideBar />
      {children}
    </body>
  );
}

export default DashboardLayout;
