import { z } from "zod";

export const validationSchemaForCreateMenuItem = z.object({
  title: z.string(),
  price: z.string(),
  description: z.string(),
});

export const validationSchemaInput = z.object({
  menu: z.string(),
});

export const validationSchemaForCreateMenu = z.object({
  items: z.array(validationSchemaForCreateMenuItem),
});

export type ValidationSchemaForCreateMenu = z.TypeOf<
  typeof validationSchemaForCreateMenu
>;

export const validationSchemaForUpdateMenu =
  validationSchemaForCreateMenu.extend({
    id: z.string(),
  });

export type ValidationSchemaForUpdateMenu = z.TypeOf<
  typeof validationSchemaForUpdateMenu
>;

export const validationSchemaForMenuItem =
  validationSchemaForCreateMenuItem.extend({
    id: z.string(),
    menuId: z.string(),
    createdAt: z.string().or(z.date()),
  });

export type ValidationSchemaForMenuItem = z.TypeOf<
  typeof validationSchemaForMenuItem
>;

export const JSONSchema = {
  items: [
    {
      title: z.string(),
      price: z.string(),
      description: z.string(),
    },
  ],
};
