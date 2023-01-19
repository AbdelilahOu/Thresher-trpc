import * as trpcExpress from "@trpc/server/adapters/express";
import { inferAsyncReturnType } from "@trpc/server";
import express, { Application } from "express";
import { appRouter, type AppRouter } from "./routes/index";
import bodyParser from "body-parser";
const app: Application = express();

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context

type Context = inferAsyncReturnType<typeof createContext>;

app.use(bodyParser.json());
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
