import {NextFunction, Request, Response} from "express";
import {CustomResponse} from "../libs/custom-responses";
import passport from "passport";

class AuthController {
  login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      "local",
      {
        session: true,
      },
      function (
        err: any,
        user: {_id: string; email: string},
        info: {message: string},
      ) {
        if (err) {
          CustomResponse.unauthorized(res, false, err);
          return;
        }

        if (!user) {
          CustomResponse.unauthorized(res, info.message);
          return;
        }

        req.logIn(user, function (err) {
          if (err) {
            CustomResponse.unauthorized(res, false, err);
            return;
          } else {
            CustomResponse.ok(res, "Login successful");
          }
        });
      },
    )(req, res, next);
  }

  logout(req: Request, res: Response) {
    req.logOut();
    CustomResponse.ok(res, "Logout successful");
  }
}

export const authController = new AuthController();
