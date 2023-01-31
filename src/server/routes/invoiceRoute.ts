import { router, procedure } from "../trpc/index";
import { prisma } from "../database/index";
import { z } from "zod";
import { InvoiceItem } from "@prisma/client";

export const invoiceRoute = router({
  getAll: procedure.query(async () => {
    return await prisma.invoice.findMany({
      include: {
        invoiceItems: true,
      },

      orderBy: {
        id: "desc",
      },
    });
  }),
  findById: procedure.input(z.number()).query(async ({ input }) => {
    return await prisma.invoice.findUnique({
      where: { id: input },
      include: {
        invoiceItems: {
          include: {
            product: {
              select: {
                price: true,
                name: true,
              },
            },
          },
        },
        vendor: {
          select: {
            name: true,
          },
        },
      },
    });
  }),
  createOne: procedure
    .input(
      z.object({
        total: z.number(),
        vendorId: z.number(),
        InvoiceItems: z.array(
          z.object({
            productId: z.number(),
            quantity: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const invoiceItems: InvoiceItem[] = [];
      const invoice = await prisma.invoice.create({
        data: {
          total: input.total ?? 0,
          vendor: { connect: { id: input.vendorId } },
        },
      });
      for await (const item of input.InvoiceItems) {
        const invoiceItem = await prisma.invoiceItem.create({
          data: {
            product: {
              connect: {
                id: item.productId,
              },
            },
            invoice: {
              connect: {
                id: invoice.id,
              },
            },
            quantity: item.quantity,
            stock: {
              create: {
                product: {
                  connect: {
                    id: item.productId,
                  },
                },
                quantity: item.quantity,
                model: "IN",
              },
            },
          },
        });
        invoiceItems.push(invoiceItem);
      }
    }),
});
