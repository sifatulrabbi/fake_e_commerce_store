import Session from "express-session";
import MongoStore from "connect-mongo";
import {config} from "../configs";

export const session = Session({
  secret: config.SESSION_SECRET,
  saveUninitialized: false,
  cookie: {
    maxAge: config.SESSION_AGE,
    secure: false,
    httpOnly: true,
  },
  resave: true,
  store: new MongoStore({
    collectionName: "users-sessions",
    autoRemove: "native",
    mongoUrl: config.MONGODB_URI,
    ttl: config.SESSION_AGE,
  }),
});
