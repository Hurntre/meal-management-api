import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { AddonCategoryModel } from '../database/models/addon-category.model';

@Injectable()
export class BrandAddonCategoriesService {
  constructor(
    @Inject('AddonCategoryModel')
    private addonCategoryModel: ModelClass<AddonCategoryModel>,
  ) {}

  async create(props) {
    return await this.addonCategoryModel.query().insert(props).returning('*');
  }
}
