import express from "express";
import {usersController} from "../controllers/users.controller";
import {authGuard} from "../middlewares";

export const usersRouter = express.Router();

usersRouter.get("/all", usersController.getAll);

usersRouter.get("/profile", authGuard, usersController.getProfile);

usersRouter.post("/", usersController.create);

usersRouter.put("/profile/:id", authGuard, usersController.update);

usersRouter.delete("/profile/:id", authGuard, usersController.remove);
