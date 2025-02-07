import { unstable_noStore as noStore } from "next/cache";
import { PAGE_SIZE } from "@/constants/query";
import prisma from "@/lib/pirsma";
import { z } from "zod";
import { Prisma, Role } from "@prisma/client";
import { auth } from "@/auth";

export async function getSession() {
  return await auth();
}

export const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        image: true,
        role: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
    };
  } catch (error: any) {
    return null;
  }
};

export type CurrentUser = NonNullable<ReturnType<typeof getCurrentUser>>;

type InputsUsersPageCount = z.infer<typeof OffsetUsersPageCountSchema>;

const OffsetUsersPageCountSchema = z.object({
  query: z.string(),
});

export const getUsersPageCount = async ({ query }: InputsUsersPageCount) => {
  noStore();
  try {
    const whereClause = {
      OR: [
        {
          firstName: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    } as any;

    const count = await prisma.user.count({
      where: whereClause,
    });

    return Math.ceil(count / PAGE_SIZE);
  } catch (error: any) {
    console.error("Database Error:", error);
    throw new Error(error.message);
  }
};

type InputsUsers = z.infer<typeof OffsetUsersSchema>;

const OffsetUsersSchema = z.object({
  query: z.string(),
  page: z.number(),
});

export const accountComplete = async (data: { phone: string; role: Role }) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not found");
  }

  try {
    const updatedAccount = await prisma.user.update({
      where: {
        id: user.id,
      },
      data,
    });

    return updatedAccount;
  } catch (error: any) {
    throw new Error(error);
  }
};

// admin users page

export const getUsers = async ({ query, page = 0 }: InputsUsers) => {
  noStore();

  try {
    const whereClause = {
      OR: [
        {
          firstName: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    } satisfies Prisma.UserWhereInput;

    const users = await prisma.user.findMany({
      where: whereClause,
      skip: page - 1 < 0 ? 0 : (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,

      orderBy: {
        createdAt: "desc",
      },
    });

    const count = await prisma.user.count({
      where: whereClause,
    });

    return {
      users: users,
      totalPages: Math.floor(count / PAGE_SIZE),
    };
  } catch (error: any) {
    console.error("Database Error:", error);
    throw new Error(error.message);
  }
};
