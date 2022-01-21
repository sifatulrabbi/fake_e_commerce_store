import {Document} from "mongoose";

export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  offers: {
    active: boolean;
    discount: {
      amount: number;
      start_at: number;
      end_at: number;
    };
    free_delivery: {
      active: boolean;
      start_at: number;
      end_at: number;
    };
  };
  created_at: number;
  updated_at: number;
  rating: number;
}

export type IProductDoc = IProduct & Document;
