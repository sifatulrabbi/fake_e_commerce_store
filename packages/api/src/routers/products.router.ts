import * as express from "express";
import {productsController} from "../controllers/products.controller";
import {createProductValidator} from "../validators/create-product.validator";

export const productsRouter = express.Router();

productsRouter.get("/", productsController.getAll);

productsRouter.get("/:id", productsController.getOneWithId);

productsRouter.get("/categories/:cat_name");

productsRouter.post("/", createProductValidator, productsController.create);

productsRouter.put("/:id", productsController.update);

productsRouter.delete("/");

productsRouter.delete("/:id");
