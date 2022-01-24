import {Strategy} from "passport-local";
import {usersService} from "../services/users.service";
import {config} from "../configs/config";
import bcrypt from "bcrypt";

export async function verifyUser(
  email: string,
  password: string,
  done: (
    error: any,
    user?: {_id: string; email: string} | false,
    options?: {message: string},
  ) => void,
) {
  try {
    const user = await usersService.getOneByEmail(email);

    if (!user) {
      done(null, false, {message: "User not found"});
      return;
    }

    if (await bcrypt.compare(password, user.password)) {
      if (!user._id) {
        done(new Error("User not found"), false);
        return;
      }

      done(null, {
        _id: user._id,
        email: user.email,
      });
    } else {
      done(null, false, {message: "Password incorrect"});
    }
  } catch (err) {
    if (!config.PROD) console.error(err);
    done(err, false, {message: err.message});
  }
}

export const localStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  verifyUser,
);
