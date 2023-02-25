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

export const sellerZ = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  adresse: z.string().optional(),
});
export const NewsellerZ = sellerZ.omit({ id: true });
export const UpdatesellerZ = sellerZ.partial();

export type ClientT = z.infer<typeof ClientZ>;
export type NewClientT = z.infer<typeof NewClientZ>;
export type UpdateClientZ = z.infer<typeof UpdateClientZ>;

export type sellerT = z.infer<typeof sellerZ>;
export type NewsellerT = z.infer<typeof NewsellerZ>;
export type UpdatesellerZ = z.infer<typeof UpdatesellerZ>;
