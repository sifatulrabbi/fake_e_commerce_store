import * as express from "express";
import {usersController} from "../controllers/users.controller";

export const usersRouter = express.Router();

usersRouter.get("/all", usersController.getAll);

usersRouter.get("/profile/:id", usersController.getOne);

usersRouter.post("/", usersController.create);

usersRouter.put("/profile/:id", usersController.update);

usersRouter.delete("/profile/:id", usersController.remove);
