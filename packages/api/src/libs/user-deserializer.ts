import {config} from "../configs/config";
import {usersService} from "../services/users.service";

export async function userDeserializer(
  id: string,
  done: (err: any, user?: any) => void,
): Promise<void> {
  try {
    const user = await usersService.getOne(id);

    if (user) {
      done(null, {
        _id: user._id,
        email: user.email,
      });
    } else {
      done(new Error("User not found"), false);
    }
  } catch (err) {
    if (!config.PROD) console.error(err);
    done(err, false);
  }
}
