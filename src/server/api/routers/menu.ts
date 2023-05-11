import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import {
  JSONSchema,
  type ValidationSchemaForCreateMenu,
  validationSchemaInput,
} from "@/server/api/validation-schemas/menu.schema";
import MenuEntity from "@/server/business-logic/menu.entity";
import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";
import { env } from "@/env.mjs";

const configuration = new Configuration({
  organization: "org-jGwCTgBd7LlDlhS1hi6UwrDD",
  apiKey: env.OPEN_AI_API_KEY,
});

export const menuRouter = createTRPCRouter({
  show: privateProcedure.input(z.string()).query(async ({ input }) => {
    return new MenuEntity().find(input);
  }),
  create: privateProcedure
    .input(validationSchemaInput)
    .mutation(async ({ ctx, input }) => {
      let promptCount = 0;
      const openai = new OpenAIApi(configuration);

      const prompt = `${input.menu}. 
      Can you please return a JSON representation of the provided data?
      Use this JSON schema as the structure ${JSON.stringify(JSONSchema)}`;
      const JSONResult = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 1.0,
      });

      let data = JSONResult.data.choices[0]?.text;

      if (!data) return new Error("No response returned from request!");

      const menu = transformData(data);
      promptCount++;

      if (!menu && promptCount < 2) {
        const prompt = `${input.menu}. 
        Can you please proceed with the JSON response where you stopped?`;
        const JSONResult = await openai.createCompletion({
          model: "text-davinci-003",
          prompt,
          max_tokens: 1000,
          temperature: 0.7,
          top_p: 1.0,
        });
        data += JSONResult.data.choices[0]?.text;
      }

      if (!menu) {
        throw new Error("Could not parse the menu");
      }

      return new MenuEntity().create(ctx.userId, menu);
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

function transformData(data?: string) {
  if (!data) return;

  try {
    const menu = JSON.parse(data) as ValidationSchemaForCreateMenu;
    return menu;
  } catch (e) {
    return false;
  }
}
