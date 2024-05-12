import connect_db from "@/db/connection";
import { User } from "@/db/models";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "example@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*********",
        },
      },
      async authorize(credentials) {
        try {
          connect_db();
          const user = await User.findOne({ email: credentials?.email });
          if (!(credentials?.password && credentials.email)) return null;
          if (!user) return null;
          const password_matched = await bcryptjs.compare(
            credentials?.password!,
            user.password
          );
          if (!password_matched) return null;
          if (!user.details.verified)
            return { error: "User email is not verified" };
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if ((user as any).error) throw new Error((user as any).error as string);
      return true;
    },
    async jwt({ token, user, session }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token._id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        if (token.email && token.name && token.role && token._id) {
          session.user.email = token.email;
          session.user.name = token.name;
          session.user.role = token.role as "teacher" | "student";
          session.user._id = token._id as string;
        }
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
