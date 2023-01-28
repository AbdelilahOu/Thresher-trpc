import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../src/server/routes/index";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

(async () => {
  const allClients = await trpc.client.getAll.query();
  const allVendors = await trpc.vendor.getAll.query();
})();
