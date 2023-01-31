import { router, procedure } from "../trpc/index";
import { z } from "zod";
import { CommandItem, Invoice } from "@prisma/client";
import { prisma } from "../database/index";

export const commandRoute = router({
  getAll: procedure.query(() => {
    return prisma.command.findMany({
      include: {
        commandItems: true,
      },
      orderBy: {
        id: "desc",
      },
    });
  }),
  findById: procedure.input(z.number()).query(({ input }) => {
    return prisma.command.findUnique({
      where: { id: input },
      include: {
        commandItems: {
          include: {
            product: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
        client: true,
      },
    });
  }),
  createOne: procedure
    .input(
      z.object({
        status: z.string(),
        clientId: z.number(),
        commandItems: z.array(
          z.object({
            productId: z.number(),
            quantity: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const { status, clientId, commandItems } = input;
      const command = await prisma.command.create({
        data: {
          status: status,
          client: {
            connect: {
              id: clientId,
            },
          },
        },
      });

      let commandItemsArray: CommandItem[] = [];
      for await (const item of commandItems) {
        const newItem = await prisma.commandItem.create({
          data: {
            product: {
              connect: {
                id: item.productId,
              },
            },
            command: {
              connect: {
                id: command.id,
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
                quantity: -item.quantity,
                model: "OUT",
              },
            },
          },
        });
        commandItemsArray.push(newItem);
      }

      return {
        ...command,
        commandItems: commandItemsArray,
      };
    }),
  updateOne: procedure
    .input(
      z.object({
        id: z.number(),
        status: z.string().optional(),
        commandItems: z.array(
          z.object({
            id: z.number(),
            commandId: z.number(),
            productId: z.number(),
            quantity: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const { status, commandItems, id } = input;

      const updatedCommand = await prisma.command.update({
        where: {
          id,
        },
        data: {
          status: status,
        },
      });

      let updatedCommandItem: any[] = [];
      for await (const item of commandItems) {
        const updatedItem = await prisma.commandItem.upsert({
          where: {
            id: item.id ? item.id : 0,
          },
          update: {
            quantity: item.quantity,
            product: {
              connect: {
                id: item.productId,
              },
            },
            stock: {
              update: {
                quantity: -item.quantity,
              },
            },
          },
          create: {
            product: {
              connect: {
                id: item.productId,
              },
            },
            command: {
              connect: {
                id: item.commandId,
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
                quantity: -item.quantity,
                model: "OUT",
              },
            },
          },
        });
        updatedCommandItem.push(updatedItem);
      }

      return {
        ...updatedCommand,
        commandItems: updatedCommandItem,
      };
    }),
});
