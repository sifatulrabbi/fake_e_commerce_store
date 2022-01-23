import express from "express";
import cors from "cors";
import {config} from "./configs/config";
import {connectDb} from "./configs/connect-db";
import {productsRouter, usersRouter, authRouter} from "./routers";
import morgan from "morgan";
import sessions from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import MongoStore from "connect-mongo";
import {localStrategy} from "./libs/local-strategy";
import {userSerializer} from "./libs/user-serializer";
import {userDeserializer} from "./libs/user-deserializer";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

if (!config.PROD) {
  app.use(morgan("dev"));
}

app.use(cookieParser(config.COOKIE_SECRET));
app.use(
  sessions({
    secret: config.SESSION_SECRET,
    saveUninitialized: false,
    cookie: {maxAge: config.SESSION_AGE},
    resave: true,
    store: new MongoStore({
      collectionName: "users-sessions",
      autoRemove: "native",
      mongoUrl: config.MONGODB_URI,
      ttl: config.SESSION_AGE,
    }),
  }),
);

passport.serializeUser<string>(userSerializer);
passport.deserializeUser<string>(userDeserializer);
passport.use(localStrategy);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/products", productsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);

app.listen(config.PORT, () => {
  if (!config.PROD) {
    console.log(`🚀 Server is running on port: ${config.PORT} 🚀`);
  }

  connectDb(config.MONGODB_URI);
});
