import { router, procedure } from "../trpc/index";
import { z } from "zod";
import { prisma } from "../database/index";

export const sellerRoute = router({
  getAll: procedure.query(async () => {
    return await prisma.seller.findMany({});
  }),
  findById: procedure.input(z.number()).query(async ({ input }) => {
    return await prisma.seller.findUnique({
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
        email: z.string().optional(),
        phone: z.string().optional(),
        addresse: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.seller.create({
        data: input,
      });
    }),
  updateOne: procedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        addresse: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, name, email, phone, addresse } = input;
      return await prisma.seller.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          phone,
          addresse,
        },
      });
    }),
});
