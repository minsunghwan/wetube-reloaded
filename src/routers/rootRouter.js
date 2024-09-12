import express from "express";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
} from "../Controllers/userControllers";
import { home, search } from "../Controllers/videoControllers";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
