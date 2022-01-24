import express from "express";
import cors from "cors";
import {config, connectDb, configurePassport} from "./configs";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import {productsRouter, usersRouter, authRouter} from "./routers";
import {session} from "./libs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser()); /*config.COOKIE_SECRET*/
app.use(session);
configurePassport(app);

if (!config.PROD) {
  app.use(morgan("dev"));
}

app.use("/api/v1/products", productsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);

app.listen(config.PORT, () => {
  if (!config.PROD) {
    console.log(`🚀 Server is running on port: ${config.PORT} 🚀`);
  }

  connectDb(config.MONGODB_URI);
});
