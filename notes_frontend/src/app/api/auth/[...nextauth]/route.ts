import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // TODO: Replace with backend API call for sign in
        if (
          credentials?.email === "demo@demo.com" &&
          credentials?.password === "password"
        ) {
          return { id: "1", email: "demo@demo.com", name: "Demo User" };
        }
        // Reject unauthorized users
        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // Extend the user object to include id in a type-safe way
        (session.user as { id?: string | undefined }).id = token.sub;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login"
  }
});

export { handler as GET, handler as POST };
