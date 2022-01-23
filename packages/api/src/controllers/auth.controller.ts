import {NextFunction, Request, Response} from "express";
import {CustomResponse} from "../libs/custom-responses";
import {IUser} from "../interfaces";
import passport from "passport";

class AuthController {
  login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      "local",
      function (err: any, user: IUser, info: {message: string}) {
        if (err) {
          return CustomResponse.badRequest(res, false, err);
        }

        if (!user) {
          return CustomResponse.badRequest(res, info.message);
        }

        req.logIn(user, function (err) {
          if (err) {
            return CustomResponse.badRequest(res, false, err);
          }

          return res.redirect(`/api/v1/users/profile/${user._id}`);
        });
      },
    )(req, res, next);
  }
}

export const authController = new AuthController();
