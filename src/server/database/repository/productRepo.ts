import { newProductT, updateData, updateProductT } from "../models";
import { prisma } from "..";

export const createProduct = (data: newProductT) => {
  return prisma.product.create({ data });
};

export const updateProduct = (update: updateData<updateProductT>) => {
  return prisma.product.update({
    where: { id: update.id },
    data: update.data,
  });
};

export const getProduct = (id: number) => {
  return prisma.product.findUnique({ where: { id } });
};

export const getAllProducts = () => {
  return prisma.product.findMany();
};

export const deleteProduct = (id: number) => {
  return prisma.product.delete({ where: { id } });
};
