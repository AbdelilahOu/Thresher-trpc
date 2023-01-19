import { prisma } from "..";
import {
  newCommandItemT,
  newCommandT,
  updateCommmandT,
  updateData,
} from "../models";

export const getCommand = (id: number) => {
  return prisma.command.findUnique({ where: { id } });
};

export const getAllCommands = () => {
  return prisma.command.findMany({
    include: {
      CommandItem: true,
    },
  });
};

export const createCommand = (data: newCommandT) => {
  return prisma.command.create({
    data: {
      status: data.status,
      Client: {
        connect: {
          id: data.clientId,
        },
      },
    },
  });
};

export const createCommandItem = (data: newCommandItemT) => {
  return prisma.commandItem.create({
    data: {
      Product: {
        connect: {
          id: data.productId,
        },
      },
      Command: {
        connect: {
          id: data.commandId,
        },
      },
      quantity: data.quantity,
      Stock: {
        create: {
          Product: {
            connect: {
              id: data.productId,
            },
          },
          quantity: -data.quantity,
          model: "OUT",
        },
      },
    },
  });
};

export const updateCommand = (command: updateData<updateCommmandT>) => {
  return prisma.command.update({
    where: {
      id: command.id,
    },
    data: {
      status: command.data.status,
      Client: command.data.clientId
        ? { connect: { id: command.data.clientId } }
        : undefined,
    },
  });
};

export const deleteCommand = (id: number) => {
  return prisma.command.delete({
    where: {
      id,
    },
  });
};
