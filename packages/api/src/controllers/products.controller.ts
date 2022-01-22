import {Request, Response} from "express";
import {productsService} from "../services/products.service";
import {CustomResponse} from "../utils/custom-responses";

class ProductsController {
  async getAll(req: Request, res: Response) {
    try {
      const products = await productsService.getAll();

      CustomResponse.ok(res, "Success", products);
    } catch (err) {
      CustomResponse.badRequest(res, false, err.message);
    }
  }

  async getOneWithId(req: Request, res: Response) {
    try {
      const product = await productsService.getOne(req.params.id);

      if (!product) {
        CustomResponse.notFound(res, false);
        return;
      }

      CustomResponse.ok(res, "Success", [product]);
    } catch (err) {
      CustomResponse.badRequest(res, false, err.message);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {name, description, price, tags, offers} = req.body;
      const product = await productsService.create(
        name,
        description,
        price,
        tags,
        offers,
      );

      CustomResponse.created(res, "Product created", [product]);
    } catch (err) {
      CustomResponse.badRequest(res, false, err.message);
    }
  }

  async update(req: Request, res: Response) {
    const {name, description, price, tags, offers} = req.body;

    try {
      const product = await productsService.update(
        req.params.id,
        name,
        description,
        price,
        tags,
        offers,
      );

      if (!product) {
        res.status(404).json({error: "product not found"});
        CustomResponse.notFound(res, "Product not found");
      }

      CustomResponse.ok(res, "Success", [product]);
    } catch (err) {
      CustomResponse.badRequest(res, false, err.message);
    }
  }

  async removeOne(req: Request, res: Response) {
    try {
      const product = await productsService.removeOne(req.params.id);

      CustomResponse.ok(res, "Product removed", [{product_name: product.name}]);
    } catch (err) {
      CustomResponse.badRequest(res, false, err.message);
    }
  }

  async getProductByCategory(req: Request, res: Response) {
    const catName = req.params.cat_name;

    try {
      const products = await productsService.getProductsByCategory(catName);

      CustomResponse.ok(res, false, products);
    } catch (err) {
      CustomResponse.badRequest(res, false, err.message);
    }
  }
}

export const productsController = new ProductsController();
