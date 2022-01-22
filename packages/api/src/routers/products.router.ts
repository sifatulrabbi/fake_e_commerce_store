import * as express from "express";
import {productsController} from "../controllers/products.controller";
import {createProductValidator} from "../validators/create-product.validator";

export const productsRouter = express.Router();

productsRouter.get("/all", productsController.getAll);

productsRouter.get("/search", productsController.search);

productsRouter.get("/single/:id", productsController.getOneWithId);

productsRouter.get(
  "/categories/:cat_name",
  productsController.getProductByCategory,
);

productsRouter.post("/", createProductValidator, productsController.create);

productsRouter.put("/:id", productsController.update);

productsRouter.delete("/:id", productsController.removeOne);
