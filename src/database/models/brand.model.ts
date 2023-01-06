import { Model } from 'objection';
import { AddonModel } from './addon.model';
import { AddonCategoryModel } from './addon-category.model';

export class BrandModel extends Model {
  static tableName = 'brands';

  id: number;
  name: string;

  addons: AddonModel[];
  addonCategories: AddonCategoryModel[];

  static relationMappings = {
    addons: {
      modelClass: `${__dirname}/addon.model`,
      relation: Model.HasManyRelation,
      join: {
        from: 'addons.brandId',
        to: 'brands.id',
      },
    },
    addonCategories: {
      modelClass: `${__dirname}/addon-category.model`,
      relation: Model.HasManyRelation,
      join: {
        from: 'addonCategories.brandId',
        to: 'brands.id',
      },
    },
  };
}
