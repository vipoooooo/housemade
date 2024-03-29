// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { authRouter } from "./auth";
import { categoryRouter } from "./category";
import { subcategoryRouter } from "./subcategory";
import { workerRouter } from "./worker";
import { reviewRouter } from "./review";
import { projectRouter } from "./project";
import { reportRouter } from "./report";
import { scheduleRouter } from "./schedule";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("category.", categoryRouter)
  .merge("subcategory.", subcategoryRouter)
  .merge("worker.", workerRouter)
  .merge("review.", reviewRouter)
  .merge("project.", projectRouter)
  .merge("report.", reportRouter)
  .merge("schedule.", scheduleRouter)
  .merge("user.", userRouter)
  .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
