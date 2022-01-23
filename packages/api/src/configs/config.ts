import dotenv from "dotenv";
import fs from "fs";

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
  PORT: parseInt(process.env.PORT || "5000", 10),
  MONGODB_URI: process.env.MONGODB_URI || "none",
  SESSION_SECRET: process.env.SESSION_SECRET || "session secret",
  COOKIE_SECRET: process.env.COOKIE_SECRET || "cookie secret",
  SESSION_AGE: parseInt(process.env.SESSION_AGE || "3600", 10),
};
