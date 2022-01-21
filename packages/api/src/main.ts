import * as express from "express";
import * as cors from "cors";
import {config} from "./configs/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.listen(config.PORT, () => {
  if (!config.PROD) {
    console.log(`🚀 Server is running on port: ${config.PORT} 🚀`);
  }
});
