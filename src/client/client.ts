import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../server/routes/index";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

const main = () => {
  const allClients = trpc.client.getAll.query();
};

main();
