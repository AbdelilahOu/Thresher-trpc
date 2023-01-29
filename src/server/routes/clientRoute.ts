import { router, procedure } from "../trpc/index";
import { z } from "zod";
import { prisma } from "../database/index";

export const clientRoute = router({
  getAll: procedure.query(async () => {
    return await prisma.client.findMany();
  }),
  findById: procedure.input(z.number()).query(async ({ input }) => {
    return await prisma.client.findUnique({
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
      return await prisma.client.create({
        data: input,
      });
    }),
  updateOne: procedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().nullish(),
        email: z.string().nullish(),
        phone: z.string().nullish(),
        addresse: z.string().nullish(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, name, email, phone, addresse } = input;
      return await prisma.client.update({
        where: {
          id,
        },
        data: {
          name: name ? name : undefined,
          email: email ? email : undefined,
          phone: phone ? phone : undefined,
          addresse: addresse ? addresse : undefined,
        },
      });
    }),
});
