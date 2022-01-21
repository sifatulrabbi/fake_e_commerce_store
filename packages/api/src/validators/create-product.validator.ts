import {Request, Response, NextFunction} from "express";
import {CustomResponse} from "../utils/custom-responses";

export function createProductValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const {name, description, price, tags} = req.body;

  if (!name || !description || !price || !tags) {
    CustomResponse.badRequest(
      res,
      "name, description, price and tags is necessary",
    );
  } else {
    next();
  }
}
