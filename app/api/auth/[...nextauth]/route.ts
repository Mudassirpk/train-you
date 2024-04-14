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
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session.user && token) {
        (session.user as any).email = token.email;
        (session.user as any).name = token.name;
        (session.user as any).role = token.role;
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
