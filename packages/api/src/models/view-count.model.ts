import * as mongoose from "mongoose";
import {IViewCount} from "../interface";

const viewCountSchema = new mongoose.Schema<IViewCount>({
  product_id: {type: String, required: true},
  view_count: {type: Number, required: true},
});

export const viewCountModel = mongoose.model<IViewCount>(
  "most-viewed",
  viewCountSchema,
);
