import { router, procedure } from "../trpc/index";
import { z } from "zod";
import { prisma } from "../database/index";

export const productRoute = router({
  getAll: procedure.query(async () => {
    return await prisma.product.findMany({});
  }),
  findById: procedure.input(z.number()).query(async ({ input }) => {
    return await prisma.product.findUnique({
      where: {
        id: input,
      },
    });
  }),
  createOne: procedure
    .input(
      z.object({
        name: z
          .string({
            required_error: "name is required",
          })
          .min(1),
        price: z.number(),
        stock: z.number(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, price, stock, description } = input;

      return await prisma.product.create({
        data: {
          name,
          price,
          description,
          stockMouvements: {
            create: {
              quantity: stock,
              model: "IN",
            },
          },
        },
      });
    }),
  updateOne: procedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        price: z.number().optional(),
        stock: z.number().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, name, price, stock, description } = input;
      return await prisma.product.update({
        where: {
          id,
        },
        data: {
          name,
          price,
          description,
        },
      });
    }),
});
