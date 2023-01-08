import { Model } from 'objection';

export class AddonModel extends Model {
  static tableName = 'addons';

  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  brandId: number;
}
