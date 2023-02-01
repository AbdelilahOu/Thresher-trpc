import { router, procedure } from "../trpc/index";
import { z } from "zod";
import { prisma } from "../database/index";

export const stockRoute = router({
  findById: procedure.query(async () => {
    return prisma.stockMouvement.findMany({});
  }),
  createOne: procedure
    .input(
      z.object({
        quantity: z.number(),
        model: z.string(),
        productId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.stockMouvement.create({
        data: input,
      });
    }),
});
