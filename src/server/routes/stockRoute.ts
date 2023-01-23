import {
  createClient,
  getAllClients,
  getClient,
  updateClient,
} from "../database/repository/clientRepo";
import { router, procedure } from "../trpc/index";
import { z } from "zod";

export const clientRoute = router({
  getAll: procedure.query(() => {
    return getAllClients();
  }),
  findById: procedure.input(z.number()).query(({ input }) => {
    return getClient(input);
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
    .mutation(({ input }) => {
      return createClient(input);
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
    .mutation(({ input }) => {
      const { id, name, email, phone, addresse } = input;
      return updateClient({
        id: id,
        data: {
          name,
          email,
          phone,
          addresse,
        },
      });
    }),
});
