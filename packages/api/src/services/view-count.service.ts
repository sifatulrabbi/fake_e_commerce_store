import {viewCountModel} from "../models/view-count.model";
import {IViewCountDoc} from "../interface";

class ViewCountService {
  async createView(product_id: string): Promise<IViewCountDoc> {
    const viewDoc = new viewCountModel({product_id, view_count: 0});
    await viewDoc.save();

    return viewDoc;
  }

  async getViews(product_id: string): Promise<number | null> {
    try {
      const views: IViewCountDoc | null = await viewCountModel.findOne({
        product_id,
      });

      if (!views) {
        return null;
      }

      return views.view_count;
    } catch (err) {
      throw new Error(String(err));
    }
  }

  async addView(product_id: string): Promise<void> {
    try {
      const view = await viewCountModel.findOne({product_id});

      if (!view) {
        const newView = await this.createView(product_id);
        const currentViews = newView.view_count + 1;

        await newView.updateOne({view_count: currentViews});
      } else {
        const currentViews = view.view_count + 1;

        await view.updateOne({view_count: currentViews});
      }
    } catch (err) {
      throw new Error(String(err));
    }
  }

  async removeViews(product_id: string) {
    try {
      await viewCountModel.findOneAndRemove({product_id});
    } catch (err) {
      throw new Error(String(err));
    }
  }

  async getMostViewedList() {
    try {
      const viewCounts = await viewCountModel.find({});
      // return viewCounts;
      if (viewCounts.length < 2) {
        return viewCounts;
      }

      const sortedViewCounts = viewCounts.sort(
        (a: IViewCountDoc, b: IViewCountDoc) => {
          if (a.view_count > b.view_count) {
            return -1;
          } else {
            return 1;
          }
        },
      );

      return sortedViewCounts;
    } catch (err) {
      throw new Error(String(err));
    }
  }
}

export const viewCountService = new ViewCountService();
