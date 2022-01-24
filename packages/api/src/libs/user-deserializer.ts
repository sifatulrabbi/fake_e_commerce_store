import {config} from "../configs/config";
import {usersService} from "../services/users.service";

export function userDeserializer(
  id: string,
  done: (err: any, user?: {_id: string; email: string} | false) => void,
) {
  try {
    usersService.getOne(id).then((user) => {
      if (user && user._id) {
        done(null, {
          _id: user._id,
          email: user.email,
        });
      } else {
        done(new Error("User not found"), false);
      }
    });
  } catch (err) {
    if (!config.PROD) console.error(err);
    done(err, false);
  }
}
