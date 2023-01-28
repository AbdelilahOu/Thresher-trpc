import {
  createCommand,
  createCommandItem,
  getAllCommands,
  getCommand,
  updateCommand,
  updateCommandItem,
} from "../database/repository/commandRepo";
import { router, procedure } from "../trpc/index";
import { z } from "zod";
import { CommandItem, Invoice } from "@prisma/client";

export const commandRoute = router({
  getAll: procedure.query(() => {
    return getAllCommands();
  }),
  findById: procedure.input(z.number()).query(({ input }) => {
    return getCommand(input);
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
      const command = await createCommand({ status, clientId });
      let commandItemsArray: CommandItem[] = [];
      for await (const item of commandItems) {
        const newItem = await createCommandItem({
          commandId: command.id,
          ...item,
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

      const updatedCommand = await updateCommand({
        id: Number(id),
        data: {
          status,
        },
      });

      let updatedCommandItem: any[] = [];
      for await (const item of commandItems) {
        const updatedItem = await updateCommandItem({
          ...item,
          commandId: updatedCommand.id,
        });
        updatedCommandItem.push(updatedItem);
      }
    }),
});
