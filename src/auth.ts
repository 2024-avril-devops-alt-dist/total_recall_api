import NextAuth from "next-auth";
import { compare } from "bcryptjs";
import prisma from "@/lib/pirsma";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      role?: "ADMIN" | "USER";
      image?: string | "/default-avatar.png";
    } & DefaultSession["user"];
  }
}

const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials ?? {};

          if (!email || !password) {
            throw new Error("Email et mot de passe requis");
          }

          const user = await prisma.user.findUnique({
            where: { email: email as string },
          });

          if (!user) {
            throw new Error("Utilisateur non trouvé");
          }

          if (!user.hashedPassword) {
            throw new Error("Compte créé avec un fournisseur externe");
          }

          const isPasswordValid = await compare(
            password as string,
            user.hashedPassword
          );

          if (!isPasswordValid) {
            throw new Error("Mot de passe incorrect");
          }

          return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            role: user.role as "ADMIN" | "USER" | undefined,
          };
        } catch (error: any) {
          console.error("Erreur d'authentification:", error);
          throw error;
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV !== "production",
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/sign-in",
    signOut: "/",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const user = await prisma.user.findUnique({
          where: {
            email: profile?.email as string | undefined,
          },
        });

        if (!user && profile && profile?.email) {
          await prisma.user.create({
            data: {
              email: profile?.email,
              provider: account.provider,
              firstName: profile?.given_name,
              lastName: profile?.family_name,
              image: profile.image as string | null,
            },
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      const dbUser = token.email
        ? await prisma.user.findUnique({
            where: { email: token.email },
          })
        : null;

      if (!dbUser) {
        if (user) {
          token.id = user.id;
        }
        return token;
      }

      return {
        ...token,
        id: dbUser.id,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        email: dbUser.email,
        image: dbUser.image,
        role: dbUser.role as "ADMIN" | "USER" | undefined,
      } as JWT;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.image = token.image as string | undefined;
        session.user.role = token.role as "ADMIN" | "USER" | undefined;
      }

      return session;
    },
  },
});

export { auth, handlers, signIn, signOut };
