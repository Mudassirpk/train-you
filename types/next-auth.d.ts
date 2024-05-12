import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      role: "teacher" | "student";
      name: string;
      email: string;
    };
  }

  interface User {
    name: string;
    role: "teacher" | "student";
    email: string;
    _id: string;
  }

}
