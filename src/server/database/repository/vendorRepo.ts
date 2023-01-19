import { prisma } from "..";
import { newVendorT, updateData, updateVendorT } from "../models";

export const createVendor = (data: newVendorT) => {
  return prisma.vendor.create({ data });
};

export const updateVendor = (vendor: updateData<updateVendorT>) => {
  return prisma.vendor.update({
    where: { id: vendor.id },
    data: vendor.data,
  });
};

export const getVendor = (id: number) => {
  return prisma.vendor.findUnique({ where: { id } });
};

export const getAllVendors = () => {
  return prisma.vendor.findMany();
};

export const deleteVendor = (id: number) => {
  return prisma.vendor.delete({ where: { id } });
};
