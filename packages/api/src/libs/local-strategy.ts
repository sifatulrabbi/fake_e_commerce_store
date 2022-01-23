import {Strategy} from "passport-local";
import {verifyUser} from "./verify-user";

export const localStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  verifyUser,
);
