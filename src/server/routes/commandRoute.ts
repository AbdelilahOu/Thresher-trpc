import {
  createCommand,
  createCommandItem,
  getAllCommands,
  getCommand,
  updateCommand,
} from "../database/repository/commandRepo";
import { router, procedure } from "../trpc/index";
import { z } from "zod";

export const CommandRoute = router({
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
      let commandItemsArray = commandItems.map(async (item) => {
        return await createCommandItem({ commandId: command.id, ...item });
      });

      return {
        ...command,
        commandItems: commandItemsArray,
      };
    }),
});
