import * as mongoose from "mongoose";
import {IUser, IUserDoc} from "../interface";
import * as bcrypt from "bcrypt";

const usersSchema = new mongoose.Schema<IUser>({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  profile: {
    full_name: {type: String, required: true},
    address: {type: String, required: true},
  },
  created_at: {type: Number, required: true, default: Date.now()},
  updated_at: {type: Number, required: true, default: Date.now()},
});

usersSchema.pre("save", async function (this: IUserDoc, next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

export const usersModel = mongoose.model("users", usersSchema);
