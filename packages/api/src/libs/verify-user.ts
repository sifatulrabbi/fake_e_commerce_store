import {usersService} from "../services/users.service";
import {config} from "../configs/config";
import bcrypt from "bcrypt";

export async function verifyUser(
  email: string,
  password: string,
  done: (error: any, user?: any | false, options?: {message: string}) => void,
) {
  try {
    const user = await usersService.getOneByEmail(email);

    if (!user) {
      done(null, false, {message: "User not found"});
      return;
    }

    if (await bcrypt.compare(password, user.password)) {
      done(null, {
        _id: user._id,
        email: user.email,
        profile: user.profile,
        created_at: user.created_at,
        updated_at: user.updated_at,
      });
      return;
    } else {
      done(null, false, {message: "Password incorrect"});
    }
  } catch (err) {
    if (!config.PROD) console.error(err);
    done(err, false, {message: err.message});
  }
}
