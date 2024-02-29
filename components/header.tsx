"use client";
import React from "react";
import Account from "./Account";
import { usePathname } from "next/navigation";
import { is_opted_path, paths_opted_out_of_main_layout } from "@/lib/utils";
import Link from "next/link";

type Props = {};

function Header({}: Props) {
  const pathname = usePathname();
  return (
    <header
      className={`${
        is_opted_path(pathname) ? "hidden" : "flex"
      } w-full items-center px-12 py-4 bg-indigo-600 justify-between`}
    >
      <Link href={"/"}>
        <h1 className={"font-bold text-white text-4xl"}>Train-You</h1>
      </Link>
      <Account />
    </header>
  );
}

export default Header;
