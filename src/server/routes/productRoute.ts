import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../database/repository/productRepo";
import { router, procedure } from "../trpc/index";
import { z } from "zod";

export const productRoute = router({
  getAll: procedure.query(() => {
    return getAllProducts();
  }),
  findById: procedure.input(z.number()).query(({ input }) => {
    return getProduct(input);
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
    .mutation(({ input }) => {
      return createProduct(input);
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
    .mutation(({ input }) => {
      const { id, name, price, stock, description } = input;
      return updateProduct({
        id: id,
        data: {
          name,
          price,
          stock,
          description,
        },
      });
    }),
});
