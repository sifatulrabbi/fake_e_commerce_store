import {Request, Response, NextFunction} from "express";
import {CustomResponse} from "../libs";

export function authGuard(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    next();
  } else {
    CustomResponse.forbidden(res, "Forbidden content. Please Login");
  }
}
