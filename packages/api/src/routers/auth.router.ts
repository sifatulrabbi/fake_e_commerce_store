import express from "express";
import {authController} from "../controllers";

export const authRouter = express.Router();

authRouter.post("/login", authController.login);

authRouter.post("/logout", authController.logout);
