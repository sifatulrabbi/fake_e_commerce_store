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
      start_at: Date;
      end_at: Date;
    };
    free_delivery: {
      active: boolean;
      start_at: Date;
      end_at: Date;
    };
  };
  rating: number;
}

export type IProductDoc = IProduct & Document;
