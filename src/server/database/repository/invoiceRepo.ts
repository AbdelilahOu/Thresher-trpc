import { newInvoiceT, updateInvoiceT, updateData } from "../models";
import { prisma } from "..";

export const createInvoice = (data: newInvoiceT) => {
  return prisma.invoice.create({
    data: {
      total: data.total,
      vendor: { connect: { id: data.vendorId } },
    },
  });
};

export const updateInvoice = (invoice: updateData<updateInvoiceT>) => {
  return prisma.invoice.update({
    where: { id: invoice.id },
    data: {
      total: invoice.data.total ? invoice.data.total : undefined,
      vendor: invoice.data.vendorId
        ? { connect: { id: invoice.data.vendorId } }
        : undefined,
    },
  });
};

export const getInvoice = (id: number) => {
  return prisma.invoice.findUnique({ where: { id } });
};

export const getAllInvoices = () => {
  return prisma.invoice.findMany();
};

export const deleteInvoice = (id: number) => {
  return prisma.invoice.delete({ where: { id } });
};
