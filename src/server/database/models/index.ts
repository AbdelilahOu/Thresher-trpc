import { z } from "zod";

export const ClientZ = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  adresse: z.string().optional(),
});
export const NewClientZ = ClientZ.omit({ id: true });
export const UpdateClientZ = ClientZ.partial();

export const VendorZ = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  adresse: z.string().optional(),
});
export const NewVendorZ = VendorZ.omit({ id: true });
export const UpdateVendorZ = VendorZ.partial();

export type ClientT = z.infer<typeof ClientZ>;
export type NewClientT = z.infer<typeof NewClientZ>;
export type UpdateClientZ = z.infer<typeof UpdateClientZ>;

export type VendorT = z.infer<typeof VendorZ>;
export type NewVendorT = z.infer<typeof NewVendorZ>;
export type UpdateVendorZ = z.infer<typeof UpdateVendorZ>;
