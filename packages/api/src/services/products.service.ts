import {productsModel} from "../models/products.model";
import {IProduct, IProductDoc} from "../interface";

class ProductsService {
  productsModel = productsModel;

  async getOne(id: string): Promise<IProductDoc | null> {
    try {
      const product = await this.productsModel.findById(id);

      return product;
    } catch (err) {
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
        start_at: Date;
        end_at: Date;
      };
      free_delivery?: {
        active: boolean;
        start_at: Date;
        end_at: Date;
      };
    },
  ): Promise<IProductDoc> {
    const discount = offers.discount
      ? offers.discount
      : {amount: 0, start_at: new Date(), end_at: new Date()};

    const free_delivery = offers.free_delivery
      ? offers.free_delivery
      : {active: false, start_at: new Date(), end_at: new Date()};

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
      rating: 0,
    };

    try {
      const productDoc = new this.productsModel(productData);
      const product = await productDoc.save();

      return product;
    } catch (err: unknown) {
      throw new Error(String(err));
    }
  }
}

export const productsService = new ProductsService();
