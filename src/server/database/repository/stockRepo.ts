import { prisma } from "..";
import { newStockMvmT } from "../models";

export const createStockMouvement = (data: newStockMvmT) => {
  return prisma.stockMouvement.create({
    data: {
      quantity: data.quantity,
      model: data.model,
      product: {
        connect: {
          id: data.productId,
        },
      },
    },
  });
};

export const getStockMouvement = (id: number) => {
  return prisma.stockMouvement.findUnique({
    where: { id },
    select: {
      commandItem: {
        select: {
          quantity: true,
        },
      },
    },
  });
};
