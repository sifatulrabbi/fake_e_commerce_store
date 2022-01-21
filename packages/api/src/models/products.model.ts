import * as mongoose from "mongoose";
import {IProduct} from "../interface";

const productsSchema = new mongoose.Schema<IProduct>({
  name: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
  tags: {type: [String], required: true},
  offers: {
    active: {type: Boolean, default: false},
    discount: {
      amount: {type: Number, default: 0},
      start_at: {type: Number, default: Date.now()},
      end_at: {type: Number, default: Date.now()},
    },
    free_delivery: {
      active: {type: Boolean, default: false},
      start_at: {type: Number, default: Date.now()},
      end_at: {type: Number, default: Date.now()},
    },
  },
  created_at: {type: Number, required: true, default: Date.now()},
  updated_at: {type: Number, require: true, default: Date.now()},
  rating: {type: Number, required: true, default: 0},
});

export const productsModel = mongoose.model<IProduct>(
  "products",
  productsSchema,
);
