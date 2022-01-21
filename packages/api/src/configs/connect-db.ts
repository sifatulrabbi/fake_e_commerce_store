import * as mongoose from "mongoose";

export async function connectDb(dbUri: string) {
  try {
    const conn = await mongoose.connect(dbUri);
    console.log("Connected to mongodb");
    console.log(`Mongodb host: ${conn.connection.host}`);
    console.log(`Database name: ${conn.connection.name}`);
  } catch (err) {
    console.error(new Error("Unable to connect to the db"));
    process.exit(1);
  }
}
