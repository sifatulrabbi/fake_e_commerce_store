import {productsModel} from "../models/products.model";
import {IProduct, IProductDoc, IViewCount, IViewCountDoc} from "../interface";
import {viewCountService} from "./view-count.service";
import {config} from "../configs/config";

class ProductsService {
  async getAll() {
    try {
      const products = await productsModel.find({});

      return products;
    } catch (err) {
      if (!config.PROD) console.log(err);
      throw new Error(String(err));
    }
  }

  async getOne(id: string, admin?: boolean): Promise<IProductDoc | null> {
    try {
      const product = await productsModel.findById(id);

      if (!admin) {
        await viewCountService.addView(id);
      }

      return product;
    } catch (err) {
      if (!config.PROD) console.log(err);
      throw new Error(String(err));
    }
  }

  async create(
    name: string,
    description: string,
    price: number,
    tags: string[],
    offers: {
      active: boolean;
      discount?: {
        amount: number;
        start_at: number;
        end_at: number;
      };
      free_delivery?: {
        active: boolean;
        start_at: number;
        end_at: number;
      };
    },
  ): Promise<IProductDoc> {
    const discount = offers.discount
      ? offers.discount
      : {amount: 0, start_at: Date.now(), end_at: Date.now()};

    const free_delivery = offers.free_delivery
      ? offers.free_delivery
      : {active: false, start_at: Date.now(), end_at: Date.now()};

    const productData: IProduct = {
      name,
      description,
      price,
      tags,
      offers: {
        active: offers.active,
        discount,
        free_delivery,
      },
      created_at: Date.now(),
      updated_at: Date.now(),
      rating: 0,
    };

    try {
      const productDoc = new productsModel(productData);
      const product = await productDoc.save();

      if (product._id) await viewCountService.createView(product._id);

      return product;
    } catch (err: unknown) {
      if (!config.PROD) console.log(err);
      throw new Error(String(err));
    }
  }

  async update(
    id: string,
    name?: string,
    description?: string,
    price?: number,
    tags?: string[],
    offers?: {
      active: boolean;
      discount?: {
        amount: number;
        start_at: number;
        end_at: number;
      };
      free_delivery?: {
        active: boolean;
        start_at: number;
        end_at: number;
      };
    },
  ): Promise<IProductDoc | null> {
    try {
      const updatedProduct = productsModel.findByIdAndUpdate(
        id,
        {
          name,
          description,
          price,
          tags,
          offers,
          updated_at: Date.now(),
        },
        {new: true},
      );

      return updatedProduct;
    } catch (err: unknown) {
      if (!config.PROD) console.log(err);
      throw new Error(String(err));
    }
  }

  async removeOne(id: string) {
    try {
      const product = await this.getOne(id);

      if (!product) {
        throw new Error("Product not found");
      }

      await viewCountService.removeViews(product._id);
      await product.remove();

      return product;
    } catch (err) {
      if (!config.PROD) console.error(err);
      throw new Error(String(err));
    }
  }

  private async mostViewedProducts() {
    try {
      const products: IProduct[] = [];
      const viewsCount: IViewCount[] =
        await viewCountService.getMostViewedList();

      for (let i = 0; i < viewsCount.length; i++) {
        const id = viewsCount[i].product_id;
        const product = await this.getOne(id);

        if (product) {
          products.push(product);
        }
      }

      return products;
    } catch (err) {
      if (!config.PROD) console.error(err);
      throw new Error(String(err));
    }
  }

  async getProductsByCategory(catName: string) {
    let products: IProduct[] = [];

    try {
      switch (catName) {
        case "most-viewed":
          products = await this.mostViewedProducts();
          break;

        case "offers":
          products = await productsModel
            .find()
            .$where(function (this: IProductDoc) {
              return this.offers.active === true;
            });
          break;

        default:
          const allProducts = await productsModel.find();

          for (let i = 0; i < allProducts.length; i++) {
            if (allProducts[i].tags.includes(catName)) {
              products.push(allProducts[i]);
            }
          }
          break;
      }

      return products;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export const productsService = new ProductsService();
