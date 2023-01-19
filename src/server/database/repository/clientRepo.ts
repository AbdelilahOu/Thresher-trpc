import { newClientT, updateClientT, updateData } from "../models";
import { prisma } from "..";

export const createClient = (data: newClientT) => {
  return prisma.client.create({ data });
};

export const updateClient = (client: updateData<updateClientT>) => {
  return prisma.client.update({
    where: { id: client.id },
    data: client.data,
  });
};

export const getClient = (id: number) => {
  return prisma.client.findUnique({ where: { id } });
};

export const getAllClients = () => {
  return prisma.client.findMany();
};

export const deleteClient = (id: number) => {
  return prisma.client.delete({ where: { id } });
};
