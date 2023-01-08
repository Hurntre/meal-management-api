import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { AddonCategoryModel } from '../database/models/addon-category.model';
import { AddonCategory } from './interface/addon-category.interface';

@Injectable()
export class BrandAddonCategoriesService {
  constructor(
    @Inject('AddonCategoryModel')
    private addonCategoryModel: ModelClass<AddonCategoryModel>,
  ) {}

  async create(props: AddonCategory): Promise<AddonCategory> {
    return await this.addonCategoryModel.query().insert(props).returning('*');
  }
}
