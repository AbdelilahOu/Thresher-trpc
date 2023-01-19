import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

const { router, procedure } = t;

export { router, procedure };
