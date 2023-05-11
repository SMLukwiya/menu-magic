import ClerkUserEntity from "@/server/business-logic/clerk-user.entity";
import { prisma } from "@/server/db";
import { type ValidationSchemaForCreateMenu } from "@/server/api/validation-schemas/menu.schema";
import { type Menu } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type AsyncReturnType } from "type-fest";

export default class ExamplePostEntity {
  async create(userId: string, input: ValidationSchemaForCreateMenu) {
    const menu = await prisma.menu.create({
      data: {
        userId,
        items: {
          createMany: {
            data: input.items,
          },
        },
      },
    });

    return menu;
  }

  async list(userId: string) {
    const menu = await prisma.menu.findFirst({
      where: {
        userId,
      },
      include: {
        items: true,
      },
    });

    return menu?.items;
  }

  async delete(userId: string, menuId: string) {
    const menu = await prisma.menu.findUnique({
      where: {
        id: menuId,
      },
    });

    this.validateAccess(menu, userId);

    await prisma.menu.delete({
      where: {
        id: userId,
      },
    });

    return true;
  }

  async find(menuId: string) {
    const menu = await prisma.menu.findUnique({
      where: {
        id: menuId,
      },
      include: {
        items: true,
      },
    });

    if (!menu) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Menu not found",
      });
    }

    const user = await new ClerkUserEntity().findUserForClient(menu.userId);

    return {
      menu,
      user,
    };
  }

  private map(
    menu: Menu,
    users: AsyncReturnType<typeof ClerkUserEntity.prototype.listUsersForClient>
  ) {
    const user = users.find((user) => user.id === menu.userId);

    if (!user) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "User not found",
      });
    }

    return {
      menu,
      user,
    };
  }

  private validateAccess(menu: Menu | null, userId: string) {
    if (!menu) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Menu not found",
      });
    }

    if (menu.userId !== userId) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "This menu doesn't belong to you",
      });
    }
  }
}
