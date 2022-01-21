import * as dotenv from "dotenv";
import * as fs from "fs";

if (fs.existsSync(".env")) {
  dotenv.config({path: ".env"});
} else if (fs.existsSync(".env.example")) {
  dotenv.config({path: ".env.example"});
} else {
  console.error(new Error("ENV file not found"));
  process.exit(1);
}

export const config = {
  PROD: process.env.NODE_ENV === "production",
  PORT: parseInt(process.env.PORT || "5000"),
};
