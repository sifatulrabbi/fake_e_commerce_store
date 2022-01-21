import * as express from "express";
import * as cors from "cors";
import {config} from "./configs/config";
import {connectDb} from "./configs/connect-db";
import {productsRouter} from "./routers/products.router";
import * as morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

if (!config.PROD) {
  app.use(morgan("dev"));
}

app.use("/api/v1/products", productsRouter);

app.listen(config.PORT, () => {
  if (!config.PROD) {
    console.log(`🚀 Server is running on port: ${config.PORT} 🚀`);
  }

  connectDb(config.MONGODB_URI);
});
