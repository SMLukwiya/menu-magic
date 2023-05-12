import { prisma } from "@/server/db";
import { type ValidationSchemaForCreateMenu } from "@/server/api/validation-schemas/menu.schema";
import { type Menu } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Configuration, OpenAIApi } from "openai";
import { env } from "@/env.mjs";
import {
  JSONSchema,
  validationSchemaForCreateMenu,
} from "@/server/api/validation-schemas/menu.schema";

const configuration = new Configuration({
  organization: "org-jGwCTgBd7LlDlhS1hi6UwrDD",
  apiKey: env.OPEN_AI_API_KEY,
});

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

  async find(userId: string, menuId: string) {
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

    return menu.userId === userId ? menu : [];
  }

  async createMenuFromPlainWithGpt(userId: string, menu: string) {
    const openai = new OpenAIApi(configuration);

    const prompt = `${menu}. 
    Can you please return a JSON representation of the provided data?
    Use this JSON schema as the structure ${JSON.stringify(
      JSONSchema
    )}, ignore any extra fields. Add empty strings for any missing field.`;
    const JSONResult = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 1000,
      temperature: 0.7,
      top_p: 1.0,
    });

    const responseData = JSONResult.data.choices[0]?.text;

    if (!responseData) throw new Error("No response returned from request!");

    const parsedMenu = this.transformData(responseData);

    if (!parsedMenu) {
      throw new Error("Could not parse the menu");
    }

    return await this.create(userId, parsedMenu);
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

  private transformData(data?: string) {
    if (!data) return;

    try {
      const menu = validationSchemaForCreateMenu.parse(JSON.parse(data));
      return menu;
    } catch (e) {
      console.error("Create Menu: ChatGpt Parsing Error");
      return false;
    }
  }
}
