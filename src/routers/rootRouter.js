import express from "express";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
} from "../Controllers/userControllers";
import { home, search } from "../Controllers/videoControllers";
import { publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
