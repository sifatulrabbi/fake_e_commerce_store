import {Document} from "mongoose";

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  profile: {
    full_name: string;
    address: string;
  };
  created_at: number;
  updated_at: number;
}

export type IUserDoc = IUser & Document;
