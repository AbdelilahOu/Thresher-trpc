import { router } from "../trpc/index";
import { commandRoute } from "./commandRoute";
import { invoiceRoute } from "./invoiceRoute";
import { productRoute } from "./productRoute";
import { clientRoute } from "./clientRoute";
import { vendorRoute } from "./vendorRoute";
import { stockRoute } from "./stockRoute";

export const appRouter = router({
  command: commandRoute,
  invoice: invoiceRoute,
  product: productRoute,
  client: clientRoute,
  vendor: vendorRoute,
  stock: stockRoute,
});

export type AppRouter = typeof appRouter;
