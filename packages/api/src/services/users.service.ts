import {config} from "../configs/config";
import {usersModel} from "../models/users.model";

class UsersService {
  async getAll() {
    try {
      const users = await usersModel.find(
        {},
        "_id email profile created_at updated_at",
      );

      return users;
    } catch (err) {
      if (!config.PROD) console.error(err);
      throw new Error(String(err));
    }
  }

  async getOne(id: string) {
    try {
      const user = await usersModel.findById(id);

      if (!user || !user._id) {
        return null;
      }

      return user;
    } catch (err) {
      if (!config.PROD) console.error(err);
      throw new Error(err);
    }
  }

  async getOneByEmail(email: string) {
    try {
      const user = await usersModel.findOne({email});

      return user;
    } catch (err) {
      if (!config.PROD) console.error(err);
      throw new Error(err);
    }
  }

  async create(data: {
    email: string;
    password: string;
    confirm_password: string;
    address: string;
    full_name: string;
  }) {
    try {
      if (data.password !== data.confirm_password) {
        throw new Error("Password and Confirm password don't match");
      }

      const userDoc = new usersModel({
        email: data.email,
        password: data.password,
        profile: {full_name: data.full_name, address: data.address},
        created_at: Date.now(),
        updated_at: Date.now(),
      });
      const user = await userDoc.save();

      return {
        _id: user._id,
        email: user.email,
        profile: user.profile,
        created_at: user.created_at,
      };
    } catch (err) {
      if (!config.PROD) console.error(err);
      throw new Error(err);
    }
  }

  async update(
    id: string,
    data: {
      email?: string;
      password?: string;
      full_name?: string;
      address?: string;
    },
  ) {
    try {
      const userDoc = await this.getOne(id);

      if (!userDoc) {
        throw new Error("User not found");
      }

      const user = await usersModel.findByIdAndUpdate(
        id,
        {
          email: data.email ? data.email : userDoc.email,
          password: data.password ? data.password : userDoc.password,
          profile: {
            full_name: data.full_name
              ? data.full_name
              : userDoc.profile.full_name,
            address: data.address ? data.address : userDoc.profile.address,
          },
          updated_at: Date.now(),
        },
        {new: true},
      );

      return user;
    } catch (err) {
      if (!config.PROD) console.error(err);
      throw new Error(err);
    }
  }

  async remove(id: string) {
    try {
      const user = await usersModel.findByIdAndRemove(id);

      return user;
    } catch (err) {
      if (!config.PROD) console.error(err);
      throw new Error(err);
    }
  }
}

export const usersService = new UsersService();
