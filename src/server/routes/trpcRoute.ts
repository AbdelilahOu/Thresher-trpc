import { router } from "../trpc/index";
import { clientRoute } from "./clientRoute";

export const appRouter = router({
  client: clientRoute,
});

export type AppRouter = typeof appRouter;
