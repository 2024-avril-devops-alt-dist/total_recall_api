import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: "USER" | "ADMIN";
  }

  interface Session {
    user?: {
      role?: "USER" | "ADMIN";
    } & DefaultSession["user"];
  }

  interface JWT {
    role?: "USER" | "ADMIN";
  }
}
