import {
  createVendor,
  getAllVendors,
  getVendor,
  updateVendor,
} from "../database/repository/VendorRepo";
import { router, procedure } from "../trpc/index";
import { z } from "zod";

export const vendorRoute = router({
  getAll: procedure.query(() => {
    return getAllVendors();
  }),
  findById: procedure.input(z.number()).query(({ input }) => {
    return getVendor(input);
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
      return await createVendor(input);
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
      return await updateVendor({
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
