import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const p_cred = {
  id: "1",
  email: "ms@gmail.com",
  password: "123",
};

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
      authorize(credentials) {
        if (
          credentials?.email !== p_cred.email ||
          credentials?.password !== p_cred.password
        ) {
          return null;
        }
        return p_cred;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
