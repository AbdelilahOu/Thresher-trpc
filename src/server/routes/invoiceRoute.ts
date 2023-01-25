import {
  createInvoice,
  getAllInvoices,
  getInvoice,
  updateInvoice,
} from "../database/repository/invoiceRepo";
import { router, procedure } from "../trpc/index";
import { z } from "zod";

export const invoiceRoute = router({
  getAll: procedure.query(() => {
    return getAllInvoices();
  }),
  findById: procedure.input(z.number()).query(({ input }) => {
    return getInvoice(input);
  }),
  createOne: procedure
    .input(
      z.object({
        status: z.string(),
        clientId: z.number(),
        InvoiceItems: z.array(
          z.object({
            productId: z.number(),
            quantity: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {}),
});
