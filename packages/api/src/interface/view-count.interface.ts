import {Document} from "mongoose";

export interface IViewCount {
  _id?: string;
  product_id: string;
  view_count: number;
}

export type IViewCountDoc = IViewCount & Document;
