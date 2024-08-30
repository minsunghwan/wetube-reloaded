import express from "express";
import { join, login } from "../Controllers/userControllers";
import { trending, search } from "../Controllers/videoControllers";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("join", join);
globalRouter.get("/login", login);
globalRouter.get("search", search);

export default globalRouter;
