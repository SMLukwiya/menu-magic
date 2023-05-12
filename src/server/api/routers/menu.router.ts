import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { validationSchemaInput } from "@/server/api/validation-schemas/menu.schema";
import MenuEntity from "@/server/business-logic/menu.entity";
import { z } from "zod";

export const menuRouter = createTRPCRouter({
  show: privateProcedure
    .input(z.object({ userId: z.string(), menuId: z.string() }))
    .query(async ({ input }) => {
      const { userId, menuId } = input;
      return new MenuEntity().find(userId, menuId);
    }),
  create: privateProcedure
    .input(validationSchemaInput)
    .mutation(async ({ ctx, input }) => {
      return new MenuEntity().createMenuFromPlainWithGpt(
        ctx.userId,
        input.menu
      );
    }),
  list: privateProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return new MenuEntity().list(input.userId);
    }),
  delete: privateProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return new MenuEntity().delete(ctx.userId, input);
    }),
});
