import { router } from "../trpc/index";
import { commandRoute } from "./commandRoute";
import { invoiceRoute } from "./invoiceRoute";
import { productRoute } from "./productRoute";
import { clientRoute } from "./clientRoute";
import { sellerRoute } from "./sellerRoute";
import { stockRoute } from "./stockRoute";

export const appRouter = router({
  command: commandRoute,
  invoice: invoiceRoute,
  product: productRoute,
  client: clientRoute,
  seller: sellerRoute,
  stock: stockRoute,
});

export type AppRouter = typeof appRouter;
