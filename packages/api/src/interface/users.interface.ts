export interface IUser {
  _id?: string;
  email: string;
  password: string;
  profile: {
    full_name: string;
    address: string;
  };
  created_at: Date;
  updated_at: Date;
}
