import { router, procedure } from "../trpc/index";
import { z } from "zod";
import {
  createStockMouvement,
  getStockMouvement,
} from "../database/repository/stockRepo";

export const stockRoute = router({
  findById: procedure.input(z.number()).query(({ input }) => {
    return getStockMouvement(input);
  }),
  createOne: procedure
    .input(
      z.object({
        quantity: z.number(),
        model: z.string(),
        product: z.number(),
      })
    )
    .mutation(({ input }) => {
      return createStockMouvement(input);
    }),
});
