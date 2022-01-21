import * as express from "express";

export const productsRouter = express.Router();

productsRouter.get("/");

productsRouter.get("/:id");

productsRouter.get("/categories/:cat_name");

productsRouter.post("/");

productsRouter.put("/:id");

productsRouter.delete("/");

productsRouter.delete("/:id");
