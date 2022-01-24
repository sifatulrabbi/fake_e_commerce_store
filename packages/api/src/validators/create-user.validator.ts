import {Request, Response, NextFunction} from "express";
import {CustomResponse} from "../libs";

export function createUserValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const body = req.body;

  if (
    !body.email ||
    !body.password ||
    !body.confirm_password ||
    !body.full_name ||
    !body.address
  ) {
    CustomResponse.badRequest(
      res,
      "email, password, confirm_password, full_name, address must be provided",
    );
  } else {
    next();
  }
}
