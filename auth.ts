import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// Add allowed admin emails here
const ADMIN_EMAILS = [
  "ritikravi7724@gmail.com",
  "ritik.raushan20251@lpu.in",
  // Add more admin emails as needed
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Only allow whitelisted emails
      return ADMIN_EMAILS.includes(user.email ?? "");
    },
    async session({ session, token }) {
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
});
