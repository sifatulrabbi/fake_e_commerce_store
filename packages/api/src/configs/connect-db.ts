import mongoose from "mongoose";
import {config} from "./config";

export async function connectDb(dbUri: string) {
  try {
    const conn = await mongoose.connect(dbUri);
    if (!config.PROD) {
      console.log("Connected to mongodb");
      console.log(`Mongodb host: ${conn.connection.host}`);
      console.log(`Database name: ${conn.connection.name}`);
    }
  } catch (err) {
    console.error(new Error("Unable to connect to the db"));
    process.exit(1);
  }
}
