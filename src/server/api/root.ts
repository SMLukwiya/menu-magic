import { createTRPCRouter } from "@/server/api/trpc";
import { menuRouter } from "@/server/api/routers/menu.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  menu: menuRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const config = {
  runtime: "edge",
};
