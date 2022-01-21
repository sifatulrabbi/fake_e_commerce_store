import {productsModel} from "../models/products.model";
import {IProduct, IProductDoc} from "../interface";

class ProductsService {
  async getAll() {
    try {
      const products = await productsModel.find({});

      return products;
    } catch (err) {
      throw new Error(String(err));
    }
  }

  async getOne(id: string): Promise<IProductDoc | null> {
    try {
      const product = await productsModel.findById(id);

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

      return product;
    } catch (err: unknown) {
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
      throw new Error(String(err));
    }
  }
}

export const productsService = new ProductsService();
