// Routes
import userRouter from "./user/userRoute.js";
import priceRouter from "./price/priceRoute.js"

const RootPath = async (app) => {
  /* --------------------------------- Routes --------------------------------- */

  app.use("/user", userRouter);
  app.use("/price", priceRouter);

  return app;
};

export default RootPath;
