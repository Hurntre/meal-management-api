import { Model } from 'objection';

export class AddonCategoryModel extends Model {
  static tableName = 'addon_categories';

  id: number;
  name: string;
  brandId: number;
}
