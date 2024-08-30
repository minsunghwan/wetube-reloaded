import express from "express";
import { edit, remove, logout, see } from "../Controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get(":id", see);
userRouter.get("/logout", logout);

export default userRouter;
